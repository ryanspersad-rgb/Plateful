// Favourites, History and Import.
import { useEffect, useRef } from 'react';
import { useApp } from '@/hooks/usePlateful';
import { BOOK, R, SALE_KEYS, allRecipes, inFridge, isFav, isUrl, money, parseIngredients, plural, sourceOf, statusText, timeText, toRecipe } from '@/lib/editorial';
import { BackBtn, Chev, Foot, Maple, Pad, RecipeCard, SRow, Sec, Spacer, Title, Topbar } from '../Bits';
import { I } from '../Icons';

const present = <T,>(x: T | undefined): x is T => x !== undefined;

export function Favourites() {
  const { ctx } = useApp();
  const favs = allRecipes().filter((r) => isFav(r.id, ctx));
  return (
    <>
      <Topbar left={<><BackBtn /><Title title="Favourites" meta={`${favs.length} saved · they rank higher in recommendations`} /></>} />
      <Pad>
        {favs.length ? <div className="grid2">{favs.map((r) => <RecipeCard key={r.id} r={r} sq />)}</div> : <p className="dek" style={{ marginTop: 20 }}>Tap the bookmark on any recipe to save it here.</p>}
      </Pad>
      <Spacer />
    </>
  );
}

export function History() {
  const { user, act } = useApp();
  const hist = (user.history || []).map(R).filter(present);
  const cooked = (user.cooked || []).map(R).filter(present);
  const noted = Object.entries(user.notes || {})
    .map(([id, n]) => ({ r: R(Number(id)), n }))
    .filter((x): x is { r: NonNullable<typeof x.r>; n: typeof x.n } => !!x.r && (x.n.stars > 0 || x.n.again || !!x.n.note || !!x.n.added || !!x.n.omitted))
    .sort((a, b) => b.n.at.localeCompare(a.n.at));
  return (
    <>
      <Topbar left={<><BackBtn /><Title title="History" meta={`${hist.length} recently viewed · ${cooked.length} cooked`} /></>} />
      <Pad>
        <Sec eyebrow="Cooked" thin>
          {cooked.length ? <div className="grid2">{cooked.map((r) => <RecipeCard key={r.id} r={r} sq />)}</div> : <p className="dek" style={{ marginTop: 12 }}>Nothing cooked yet. Tap “I cooked this” under a recipe’s steps.</p>}
        </Sec>
        {noted.length > 0 && (
          <Sec eyebrow="Your notes" thin>
            {noted.map(({ r, n }) => (
              <button key={r.id} className="hrow" onClick={() => act.detail(r.id)}>
                <div className="l">
                  <div className="n">{r.name}</div>
                  <div className="notemark" style={{ marginTop: 2 }}>
                    {n.stars > 0 && <span className="stars">{'★'.repeat(n.stars)}</span>}{n.stars > 0 && n.again && ' · '}{n.again && <b>Make again</b>}{(n.stars > 0 || n.again) && n.note && ' · '}{n.note && <span style={{ fontStyle: 'italic' }}>“{n.note}”</span>}{n.added && <span className="meta"> · added {n.added}</span>}{n.omitted && <span className="meta"> · left out {n.omitted}</span>}
                  </div>
                </div>
                <Chev />
              </button>
            ))}
          </Sec>
        )}
        <Sec eyebrow="Recently viewed" thin>
          {hist.length
            ? hist.map((r) => <SRow key={r.id} img={r.img} t={r.name} m={`${r.diff} · ${plural(r.ing.length, 'ingredient')} · ${timeText(r.time)}`} onClick={() => act.detail(r.id)} style={{ padding: '10px 0' }} />)
            : <p className="dek" style={{ marginTop: 12 }}>Recipes you open show up here.</p>}
        </Sec>
      </Pad>
      <Spacer />
    </>
  );
}

/** Link a recipe from anywhere: the link opens the original; the pasted list is priced against this week's flyers. */
export function Import() {
  const { s, user, ctx, act } = useApp();
  const f = s.imp;
  const lines = parseIngredients(f.ing);
  const source = f.url.trim() ? sourceOf(f.url) : '';
  const have = lines.filter((l) => inFridge(l.key, ctx)).length;
  const sale = lines.filter((l) => SALE_KEYS.includes(l.key)).length;
  const toBuy = lines.filter((l) => !inFridge(l.key, ctx) && BOOK[l.key]).reduce((a, l) => a + BOOK[l.key].p, 0);
  const unpriced = lines.filter((l) => !l.priced).length;
  const saved = (user.importedRecipes || []).slice().reverse();
  const just = f.saved !== null ? R(f.saved) : undefined;
  const ready = isUrl(f.url) && f.name.trim() && lines.length > 0;
  // Paste a link and the page is read straight away: name, photo, ingredients and the method fill themselves.
  const lastRead = useRef(f.read || f.reading ? f.url.trim() : '');
  useEffect(() => {
    const url = f.url.trim();
    if (!isUrl(url) || url === lastRead.current || f.reading) return;
    const t = setTimeout(() => { lastRead.current = url; act.impRead(url); }, 600);
    return () => clearTimeout(t);
  }, [f.url, f.reading]); // eslint-disable-line react-hooks/exhaustive-deps -- act is rebuilt every render
  return (
    <>
      <Topbar left={<><BackBtn /><Title title="Link a recipe" meta="Any site, TikTok, Instagram or YouTube · kept on this phone" /></>} />
      <Pad>
        {just && (
          <div className="linked-ok">
            <div className="eyebrow" style={{ color: 'var(--acc)' }}>Linked</div>
            <div className="n">{just.name}</div>
            <div className="meta">{statusText(just, ctx, true)} · from {just.src}</div>
            <div className="meta" style={{ marginTop: 6 }}>It’s in the app now: under <b>Your recipes</b> on Home, in search, favourites, the plan and cook mode.</div>
            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              <button className="btn primary sm" onClick={() => act.detail(just.id)}>Open recipe</button>
              <button className="btn ghost sm" onClick={() => act.impPatch({ saved: null })}>Link another</button>
            </div>
          </div>
        )}
        <div className="search" style={{ marginTop: just ? 18 : 6 }}>
          <I.link />
          <input type="url" placeholder="Paste the recipe’s link" value={f.url} autoComplete="off" aria-label="Recipe link" inputMode="url" onChange={(e) => act.impPatch({ url: e.target.value })} />
        </div>
        {source && (
          <div className="readrow">
            <div className="meta">From <b>{source}</b></div>
            <button className="btn secondary sm" disabled={f.reading || !isUrl(f.url)} onClick={() => act.impRead()}>{f.reading ? 'Reading the page…' : 'Read the page'}</button>
          </div>
        )}
        {f.read && <div className="meta readnote">{f.read}</div>}
        {f.read && !f.reading && !f.ing && isUrl(f.url) && <a className="textlink" href={f.url} target="_blank" rel="noopener noreferrer">Open the recipe on {source} ↗</a>}
        <label className="flabel">Name<input className="field" type="text" placeholder="What is it called?" value={f.name} aria-label="Recipe name" onChange={(e) => act.impPatch({ name: e.target.value })} /></label>
        <label className="flabel">Ingredients
          <textarea className="field area" rows={6} placeholder={'Paste the ingredient list, one per line — or the whole recipe, and Plateful splits it:\n2 tbsp olive oil\n500 g chicken thighs\n1 can diced tomatoes'} value={f.ing} aria-label="Ingredients" onChange={(e) => act.impPatch({ ing: e.target.value })} />
        </label>
        {lines.length > 0 && (
          <div className="linked-prev">
            {lines.map((l, i) => {
              const b = BOOK[l.key];
              const fridge = inFridge(l.key, ctx);
              const onSale = SALE_KEYS.includes(l.key);
              return (
                <div key={i} className="hrow ingrow">
                  <div className="l"><span className="amt">{l.amount}</span><span className="n">{l.name}<Maple k={l.key} /></span></div>
                  <div className="r">
                    {fridge ? <span className="mut">In your fridge</span>
                      : !b ? <span className="mut">No price yet</span>
                      : onSale ? <span className="acc">{money(b.p)}{b.u || ''} · {b.r}</span>
                      : <span className="mut">{money(b.p)} · {b.r}</span>}
                  </div>
                </div>
              );
            })}
            <div className="meta" style={{ marginTop: 10 }}>
              <b>{have} of {lines.length}</b> in your fridge · <b>{sale}</b> on sale this week{toBuy > 0 && <> · <b>{money(toBuy)}</b> to buy</>}{unpriced > 0 && <> · {unpriced} Plateful can’t price yet</>}
            </div>
          </div>
        )}
        <label className="flabel">Method <span className="mut">optional — one step per line, for cook mode</span>
          <textarea className="field area" rows={4} placeholder="Paste the steps, or leave this and follow the original page" value={f.steps} aria-label="Method" onChange={(e) => act.impPatch({ steps: e.target.value })} />
        </label>
        <div className="frow">
          <div className="flabel">Serves
            <div className="stepper" role="group" aria-label="Servings">
              <button onClick={() => act.impPatch({ serv: Math.max(1, f.serv - 1) })} aria-label="Fewer">−</button>
              <span className="n">{f.serv}</span>
              <button onClick={() => act.impPatch({ serv: Math.min(24, f.serv + 1) })} aria-label="More">+</button>
            </div>
          </div>
          <label className="flabel">Minutes<input className="field" type="number" inputMode="numeric" min={5} max={600} placeholder="30" value={f.time} aria-label="Minutes" onChange={(e) => act.impPatch({ time: e.target.value })} style={{ width: 90 }} /></label>
        </div>
        <label className="flabel">Photo link <span className="mut">optional</span><input className="field" type="url" placeholder="https://…/photo.jpg" value={f.img} aria-label="Photo link" onChange={(e) => act.impPatch({ img: e.target.value })} /></label>
        <button className="btn primary" style={{ marginTop: 18 }} disabled={!ready} onClick={act.impSave}>Save to my recipes</button>
        <div className="meta" style={{ textAlign: 'center', marginTop: 10, fontSize: 12 }}>Linked recipes rank, price and shop like every other recipe. The page itself stays on the original site.</div>
        {saved.length > 0 && (
          <Sec eyebrow={`Your linked recipes · ${saved.length}`} thin>
            {saved.map((x) => (
              <div key={x.id} className="hrow">
                <button className="l" style={{ textAlign: 'left' }} onClick={() => act.detail(x.id)}>
                  <div className="n">{x.name}</div>
                  <div className="s">{x.source} · {plural(x.ing.length, 'ingredient')}{x.steps.length ? ` · ${plural(x.steps.length, 'step')}` : ''} · {statusText(toRecipe(x), ctx)}</div>
                </button>
                <a className="iconbtn" href={x.url} target="_blank" rel="noopener noreferrer" aria-label="Open the original"><I.link /></a>
                <button className="iconbtn" onClick={() => act.impRemove(x.id)} aria-label={`Remove ${x.name}`} style={{ color: 'var(--faint)' }}><I.x /></button>
              </div>
            ))}
          </Sec>
        )}
      </Pad>
      <Foot>Read the page fills the form from the site’s own recipe data where it publishes any; the list you save is what gets priced, so give it a glance first.</Foot>
      <Spacer />
    </>
  );
}
