"""Walk every screen of the built app with the real fonts and report overlapping or overflowing text."""
import asyncio, http.server, os, threading, functools, datetime, json, sys
from playwright.async_api import async_playwright

ROOT = '/home/claude/plateful/dist/public'
OUT = '/home/claude/plateful_proto/shots/audit'
os.makedirs(OUT, exist_ok=True)

class H(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
threading.Thread(target=lambda: http.server.ThreadingHTTPServer(('127.0.0.1', 4181), functools.partial(H, directory=ROOT)).serve_forever(), daemon=True).start()

DETECT = r"""
() => {
  const app = document.querySelector('.app'); const A = app.getBoundingClientRect();
  const skipIn = (el) => el.closest('.ph, .lead-ph, .hero, .pph, .toast, .inkbar, .splash, .cam, .map, .vf, .results-box, .sresults');
  const scrollers = ['.row-scroll', '.chips.row', '.ttabs', '.clips', '.tilerow'];
  const inScroller = (el) => scrollers.some((s) => el.closest(s));
  const vis = (el) => { const cs = getComputedStyle(el); return cs.visibility !== 'hidden' && cs.display !== 'none' && +cs.opacity > 0.05; };
  const tb = app.querySelector('.topbar'); const bar = app.querySelector('.tabbar');
  const topY = tb ? tb.getBoundingClientRect().bottom : A.top; const botY = bar ? bar.getBoundingClientRect().top : A.bottom;
  const inBar = (el) => !!el.closest('.topbar, .tabbar');
  const textEls = [];
  const walker = document.createTreeWalker(app, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = walker.nextNode())) {
    if (!n.textContent.trim()) continue;
    const el = n.parentElement; if (!el || skipIn(el) || !vis(el)) continue;
    if (el.closest('.iconbtn, svg')) continue;
    const range = document.createRange(); range.selectNodeContents(n);
    const rs = Array.from(range.getClientRects()).filter((r) => r.width > 1 && r.height > 1);
    for (const r of rs) { if (!inBar(el) && (r.top < topY - 1 || r.bottom > botY + 1)) continue; textEls.push({ el, r, text: n.textContent.trim().slice(0, 40) }); }
  }
  const out = { overlaps: [], overflow: [], clipped: [] };
  const label = (t) => { const c = t.el.className && typeof t.el.className === 'string' ? '.' + t.el.className.split(' ').filter(Boolean).slice(0, 2).join('.') : ''; return t.el.tagName.toLowerCase() + c + ' "' + t.text + '"'; };
  for (let i = 0; i < textEls.length; i++) for (let j = i + 1; j < textEls.length; j++) {
    const a = textEls[i], b = textEls[j];
    if (a.el === b.el || a.el.contains(b.el) || b.el.contains(a.el) || inBar(a.el) !== inBar(b.el)) continue;
    const x = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left);
    const y = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top);
    if (x > 2 && y > 3) out.overlaps.push({ a: label(a), b: label(b), x: Math.round(x), y: Math.round(y), top: Math.round(a.r.top) });
  }
  // text wider than the app or wider than its box
  for (const t of textEls) {
    if (inScroller(t.el)) continue;
    if (t.r.right > A.right + 1 || t.r.left < A.left - 1) out.overflow.push({ el: label(t), left: Math.round(t.r.left - A.left), right: Math.round(t.r.right - A.left), top: Math.round(t.r.top) });
  }
  for (const el of app.querySelectorAll('*')) {
    if (skipIn(el) || inScroller(el) || !vis(el)) continue;
    const cs = getComputedStyle(el);
    if (cs.overflowX === 'hidden' || cs.overflow === 'hidden' || cs.whiteSpace === 'nowrap') {
      if (el.scrollWidth > el.clientWidth + 2 && el.clientWidth > 0) out.clipped.push({ el: el.tagName.toLowerCase() + '.' + (el.className || '').toString().split(' ').slice(0, 2).join('.'), text: (el.textContent || '').trim().slice(0, 50), sw: el.scrollWidth, cw: el.clientWidth, top: Math.round(el.getBoundingClientRect().top) });
    }
  }
  return out;
}
"""

async def scan(pg, name, shot=True):
    """Scroll the screen to the bottom in steps, running the detector at each stop; collect unique findings."""
    found = { 'overlaps': {}, 'overflow': {}, 'clipped': {} }
    sc = await pg.query_selector('.screen') or await pg.query_selector('.app')
    h = await sc.evaluate('e => e.scrollHeight'); ch = await sc.evaluate('e => e.clientHeight')
    y = 0; i = 0
    while True:
        await sc.evaluate('(e, y) => e.scrollTop = y', y)
        await pg.wait_for_timeout(120)
        res = await pg.evaluate(DETECT)
        for k in found:
            for item in res[k]:
                key = json.dumps({kk: vv for kk, vv in item.items() if kk != 'top'})
                found[k].setdefault(key, item)
        if shot: await pg.screenshot(path=f'{OUT}/{name}-{i:02d}.png')
        i += 1
        if y + ch >= h - 2 or i > 14: break
        y += ch - 60
    print(f'## {name}: overlaps {len(found["overlaps"])} · overflow {len(found["overflow"])} · clipped {len(found["clipped"])}')
    for k in found:
        for item in found[k].values(): print('  ', k, item)

async def main():
    errors = []
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width': 390, 'height': 844}, device_scale_factor=2)
        pg.on('pageerror', lambda e: errors.append(f'pageerror: {e}'))
        await pg.goto('http://127.0.0.1:4181/')
        await pg.wait_for_selector('.splash')
        await pg.wait_for_selector('.ob', timeout=6000)
        for step in range(5):
            await scan(pg, f'onboarding-{step}', shot=(step in (0, 4)))
            nxt = await pg.query_selector('.ob .btn.primary')
            if nxt: await nxt.click(); await pg.wait_for_timeout(200)
            if await pg.query_selector('.lead'): break
        await pg.wait_for_selector('.lead')
        # seed: budget, favourite, milk expiring, a saved deal, plan filled
        await pg.evaluate("""() => {
          const u = JSON.parse(localStorage.plateful_onboarded || '{}');
          u.weeklyBudget = 120; u.favorites = [1, 2, 3, 4]; u.expiry = u.expiry || {}; u.expiry['milk'] = new Date(Date.now() + 864e5).toISOString().slice(0, 10);
          u.cooked = [1, 2]; u.history = [1, 2, 3, 5, 8];
          localStorage.plateful_onboarded = JSON.stringify(u);
        }""")
        await pg.reload(); await pg.wait_for_selector('.lead', timeout=8000)
        await scan(pg, 'home')
        await pg.click('.ttab:has-text("Indian")'); await pg.wait_for_timeout(200)
        await scan(pg, 'home-indian', shot=False)
        await pg.click('.results .link'); await pg.wait_for_timeout(200)
        await pg.fill('.search input', 'chick'); await pg.wait_for_timeout(300)
        await scan(pg, 'home-search', shot=True)
        await pg.fill('.search input', '')
        # detail: a Confident recipe from the For you grid (Lasagna if present)
        las = await pg.query_selector('.grid2 .card:has-text("Lasagna")')
        if las: await las.scroll_into_view_if_needed(); await pg.wait_for_timeout(100); await pg.screenshot(path=f'{OUT}/foryou-lasagna.png')
        await (las or await pg.query_selector('.grid2 .card')).click()
        await pg.wait_for_selector('.hero'); await pg.wait_for_timeout(200)
        await pg.click('button:has-text("Add to this week")'); await pg.wait_for_timeout(150)
        await scan(pg, 'detail')
        addb = await pg.query_selector('button:has-text("to list")')
        if addb: await addb.click(); await pg.wait_for_timeout(200)
        # a web (trending) recipe detail is external; an imported one:
        await pg.click('.tab:has-text("List")'); await pg.wait_for_selector('.ttabs')
        await pg.click('.ttab:has-text("This week")'); await pg.wait_for_selector('.dayhead')
        await pg.click('button:has-text("Fill empty days")'); await pg.wait_for_timeout(300)
        await pg.click('.addrow >> nth=0'); await pg.wait_for_selector('.picker'); await pg.wait_for_timeout(150)
        await scan(pg, 'plan')
        await pg.click('button:has-text("to list")'); await pg.wait_for_selector('.storehead'); await pg.wait_for_timeout(200)
        await pg.click('.search input'); await pg.fill('.search input', 'egg'); await pg.wait_for_timeout(300)
        await scan(pg, 'list')
        await pg.fill('.search input', '')
        await pg.click('.banner'); await pg.wait_for_selector('.tillitem'); await pg.wait_for_timeout(200)
        await scan(pg, 'till')
        await pg.click('.iconbtn[aria-label="Back"]'); await pg.wait_for_timeout(200)
        await pg.click('button:has-text("Compare every ad")'); await pg.wait_for_timeout(300)
        await scan(pg, 'pricematch')
        await pg.click('button:has-text("Check a shelf tag"), button:has-text("Scan a shelf tag")'); await pg.wait_for_selector('.cam')
        await pg.click('.shutter'); await pg.wait_for_selector('.result', timeout=5000); await pg.wait_for_timeout(200)
        await scan(pg, 'camera')
        await pg.click('.iconbtn[aria-label="Close"]'); await pg.wait_for_timeout(200)
        if not await pg.query_selector('.tab'): await pg.click('.iconbtn[aria-label="Back"]'); await pg.wait_for_timeout(200)
        await pg.click('.tab:has-text("On sale")'); await pg.wait_for_selector('.tilegrid'); await pg.wait_for_timeout(200)
        await pg.click('.tilegrid .bm >> nth=0'); await pg.wait_for_timeout(150)
        await scan(pg, 'onsale')
        await pg.click('.tab:has-text("Stores")'); await pg.wait_for_selector('.map'); await pg.wait_for_timeout(200)
        await scan(pg, 'stores')
        await pg.click('.tab:has-text("Profile")'); await pg.wait_for_selector('.plus'); await pg.wait_for_timeout(200)
        await scan(pg, 'profile')
        for row, nm in [('My fridge', 'fridge'), ('History', 'history'), ('Favourites', 'favourites'), ('Imported recipes', 'import'), ("This week", 'plan2')]:
            await pg.click(f'.hrow:has-text("{row}")'); await pg.wait_for_timeout(300)
            if nm == 'import':
                await pg.fill('input[type="url"], .search input', 'https://www.tiktok.com/@x/video/1'); await pg.wait_for_timeout(100)
                btn = await pg.query_selector('button:has-text("Import")');
                if btn: await btn.click(); await pg.wait_for_timeout(400)
            await scan(pg, nm, shot=(nm != 'plan2'))
            await pg.click('.iconbtn[aria-label="Back"]'); await pg.wait_for_timeout(200)
        await b.close()
    print('errors:', errors[:5] or 'none')

asyncio.run(main())
