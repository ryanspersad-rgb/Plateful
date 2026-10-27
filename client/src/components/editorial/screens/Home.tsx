import { useEffect, useMemo, useState } from 'react';
import { useApp } from '@/hooks/usePlateful';
import {
  BOOK, FAMILY, FILTERS, FLYER_WEEK, KIDS, LEADS, NOTES, R, SALE_KEYS, STORE, STORES, TRENDING, CATEGORIES_CUISINES,
  inFridge, money, pct, perServ, plural, pmPlan, productImg, recommended, searchRecipes, status, statusText, stepRow, timeText,
  expiringSoon, useItUp, whenText, isUrl, sourceOf,
} from '@/lib/editorial';
import { Bookmark, Chev, Pad, RecipeCard, Sec, SRow, Tile, Topbar, TrendingCard, Wordmark, Foot, Spacer } from '../Bits';
import { I } from '../Icons';

const HOME_TABS: string[] = [...FILTERS, ...CATEGORIES_CUISINES.filter((c) => !FILTERS.includes(c))];

function Lead() {
  const { ctx, act } = useApp();
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setInterval(() => {
      setFade(true);
      window.setTimeout(() => { setIdx((i) => (i + 1) % LEADS.length); setFade(false); }, 350);
    }, 4200);
    return () => window.clearInterval(t);
  }, []);
  const lead = R(LEADS[idx]);
  if (!lead) return null;
  const st = status(lead, ctx);
  return (
    <section className="lead">
      <div className="lead-ph tall" role="button" tabIndex={0} onClick={() => act.detail(lead.id)} onKeyDown={(e) => { if (e.key === 'Enter') act.detail(lead.id); }}>
        {LEADS.map((id, i) => { const r = R(id); return r ? <img key={id} className={i === idx ? 'show' : ''} src={r.img} alt={i === idx ? r.name : ''} /> : null; })}
        <div className="scrim" />
        <span className="ph-label">Tonight’s dinner deal</span>
        <Bookmark id={lead.id} />
        <div className={`over${fade ? ' fade' : ''}`}>
          <h1 className="lead-title">{lead.name}</h1>
          {lead.hook && <div className="hook">{lead.hook}</div>}
          <div className="meta"><b>{perServ(lead)}</b> · {timeText(lead.time)} · You have {st.have} of {st.of}</div>
          <div className="dots">{LEADS.map((id, i) => <i key={id} className={i === idx ? 'on' : ''} />)}</div>
        </div>
      </div>
    </section>
  );
}

function SearchResults() {
  const { s, ctx, act } = useApp();
  const q = s.q.trim().toLowerCase();
  if (!q) return null;
  if (isUrl(s.q)) {
    return (
      <div className="sresults">
        <button className="srow add" onClick={() => { act.impStart(s.q.trim()); act.patch({ q: '' }); }}><I.link /> Link this recipe from {sourceOf(s.q)}</button>
      </div>
    );
  }
  const hits = searchRecipes(q);
  const keyHit = Object.keys(BOOK).find((k) => BOOK[k].n.toLowerCase().startsWith(q));
  return (
    <div className="sresults">
      {hits.map((r) => (
        <SRow key={r.id} img={r.img} t={r.name} m={`${statusText(r, ctx)} · ${timeText(r.time)}`} onClick={() => act.detail(r.id)} />
      ))}
      {keyHit && !inFridge(keyHit, ctx) && (
        <button className="srow add" onClick={() => act.addFridge(keyHit)}><I.plus /> Add {BOOK[keyHit].n.toLowerCase()} to my fridge</button>
      )}
      {!hits.length && !keyHit && <div className="srow meta">No recipes use “{s.q}” yet.</div>}
    </div>
  );
}

export function Home() {
  const { s, user, ctx, act } = useApp();
  const rec = useMemo(() => recommended(s.homeFilter, ctx), [s.homeFilter, ctx]);
  const quick = useMemo(
    () => recommended('All', ctx).filter((r) => r.ing.some((i) => SALE_KEYS.includes(i[0]))).sort((a, b) => status(b, ctx).saleHits - status(a, ctx).saleHits).slice(0, 6),
    [ctx],
  );
  const promos = SALE_KEYS.filter((k) => BOOK[k].promo);
  const near = STORES.filter((st) => st.km <= user.radiusKm).length;
  const hist = (user.history || []).map((id) => R(id)).filter((r): r is NonNullable<typeof r> => !!r).slice(0, 8);
  const favs = user.favorites.map((id) => R(id)).filter((r): r is NonNullable<typeof r> => !!r);
  const again = Object.entries(user.notes || {}).filter(([, n]) => n.again).map(([id]) => R(Number(id))).filter((r): r is NonNullable<typeof r> => !!r);
  const step = stepRow(user);
  const plan = pmPlan(s.list)[0];
  const soon = useMemo(() => expiringSoon(user, 5), [user]);
  const useUp = useMemo(() => useItUp(ctx, soon), [ctx, soon]);
  const topSale = SALE_KEYS.slice().sort((a, b) => pct(b) - pct(a)).slice(0, 14);

  return (
    <>
      <Topbar
        left={<Wordmark />}
        right={
          <button className="locchip" onClick={() => act.go('profile')}>
            <I.pin />Near {user.postalPrefix} · {near} stores in {user.radiusKm} km
          </button>
        }
      />
      <Pad>
        <div className="search">
          <I.search />
          <input
            type="search"
            placeholder="What’s in your fridge?"
            value={s.q}
            autoComplete="off"
            aria-label="What’s in your fridge?"
            onChange={(e) => act.patch({ q: e.target.value })}
          />
          <button className="camb" onClick={() => act.go('camera')} aria-label="Scan a product"><I.camera /></button>
        </div>
        <SearchResults />
        <nav className="ttabs" aria-label="Filter">
          {HOME_TABS.map((f) => (
            <button key={f} className={`ttab${s.homeFilter === f ? ' on' : ''}`} onClick={() => act.patch({ homeFilter: f })}>{f}</button>
          ))}
        </nav>
        {s.homeFilter !== 'All' && (
          <section className="sec results">
            <div className="sec-head">
              <span className="eyebrow">{s.homeFilter}</span>
              <button className="link" onClick={() => act.patch({ homeFilter: 'All' })}>Clear <I.x /></button>
            </div>
            <h2 className="h-serif">{plural(rec.length, `${s.homeFilter} recipe`)}</h2>
            <p className="dek">Ranked by what’s in your fridge and this week’s flyers.</p>
            <div className="grid2">{rec.slice(0, 24).map((r) => <RecipeCard key={r.id} r={r} sq />)}</div>
            {rec.length > 24 && <div className="meta" style={{ marginTop: 12 }}>Showing 24 of {rec.length}. Search above to narrow it down.</div>}
          </section>
        )}
      </Pad>

      <Lead />

      {soon.length > 0 && useUp.length > 0 && (
        <Pad>
          <Sec
            eyebrow="Use it up"
            link="My fridge"
            to="fridge"
            title="Before it turns"
            dek={soon.slice(0, 3).map((e, i) => `${i ? e.name.toLowerCase() : e.name} ${e.days < 0 ? 'is past its date' : e.days === 0 ? 'goes today' : `by ${whenText(e.date)}`}`).join(', ') + '.'}
          >
            <div className="chips row" style={{ marginTop: 12, marginBottom: 2 }}>
              {soon.map((e) => (
                <button key={e.key} className={`chip${e.days <= 2 ? ' sale' : ''}`} onClick={() => act.go('fridge')}>
                  {e.name} · {e.days < 0 ? 'past date' : e.days === 0 ? 'today' : e.days === 1 ? 'tomorrow' : `${e.days} days`}
                </button>
              ))}
            </div>
            <div className="row-scroll">{useUp.map((r) => <RecipeCard key={r.id} r={r} />)}</div>
          </Sec>
        </Pad>
      )}

      {hist.length > 0 && (
        <Pad>
          <Sec eyebrow="Recently viewed" link="History" to="history" thin>
            <div className="row-scroll">{hist.map((r) => <RecipeCard key={r.id} r={r} cls="sm" sq showStatus={false} />)}</div>
          </Sec>
        </Pad>
      )}
      {favs.length > 0 && (
        <Pad>
          <Sec eyebrow="My favourites" link="All" to="favourites" thin>
            <div className="row-scroll">{favs.slice(0, 8).map((r) => <RecipeCard key={r.id} r={r} cls="sm" sq />)}</div>
          </Sec>
        </Pad>
      )}
      {again.length > 0 && (
        <Pad>
          <Sec eyebrow="Make again" link="History" to="history" thin>
            <div className="row-scroll">{again.slice(0, 8).map((r) => <RecipeCard key={r.id} r={r} cls="sm" sq />)}</div>
          </Sec>
        </Pad>
      )}

      <Pad>
        <Sec eyebrow={step.eyebrow} title={step.title} dek={step.dek} band="band-start">
          <div className="row-scroll">{step.list.slice(0, 8).map((r) => <RecipeCard key={r.id} r={r} />)}</div>
        </Sec>
      </Pad>

      <Pad>
        <Sec
          eyebrow="On sale this week" link="View all" to="onsale" title="Cook what’s on sale"
          dek={`${SALE_KEYS.length} deals in this week’s flyers, ${FLYER_WEEK}, ending Thursday. Save a deal and the recipes that use it move up.`}
        >
          <div className="row-scroll">
            {topSale.map((k) => <Tile key={k} k={k} />)}
            <button className="card sm" onClick={() => act.go('onsale')} style={{ justifyContent: 'center', alignItems: 'center', width: 120, color: 'var(--acc)', font: '600 14px var(--sans)' }}>
              All {SALE_KEYS.length} deals <I.arrowR />
            </button>
          </div>
        </Sec>
      </Pad>

      <Pad>
        <Sec eyebrow="Promoted near you" sponsored>
          {promos.map((k) => {
            const b = BOOK[k];
            const st = STORE(b.sid);
            const r = b.promo ? R(b.promo.recipe) : undefined;
            if (!st || !r || b.was === undefined) return null;
            const img = productImg(k);
            return (
              <button key={k} className="promo" onClick={() => act.detail(r.id)}>
                <div className="pph">{img && <img src={img} alt="" />}</div>
                <div className="pt">
                  <div className="eyebrow mut" style={{ fontSize: 10 }}>{st.name} · {st.km} km</div>
                  <div className="nm">{b.n} · <span className="price">{money(b.p)}{b.u || ''}</span> <span className="was">{money(b.was)}</span></div>
                  <div className="pairs">Pairs with {r.name} <I.chevR /></div>
                </div>
              </button>
            );
          })}
        </Sec>
      </Pad>

      <Pad>
        <Sec eyebrow="Quick picks" title="Dinners built on this week’s prices" dek="Ranked by how many sale items each one uses.">
          <div className="stack">
            {quick.slice(0, 4).map((r) => {
              const n = status(r, ctx).saleHits;
              return <RecipeCard key={r.id} r={r} label={n ? `${plural(n, 'ingredient')} on sale` : undefined} />;
            })}
          </div>
        </Sec>
      </Pad>

      <Pad>
        <Sec eyebrow="At the store" band="band-store">
          <button className="hrow" onClick={() => act.go('till')}>
            <span className="iconbtn" style={{ color: 'var(--acc)', marginLeft: -8 }}><I.flyer /></span>
            <div className="l">
              <div className="n">Price match at the till</div>
              <div className="s">
                {plan && plan.matches.length
                  ? `${plan.matches.length} items on your list have a lower ad · save ${money(plan.saved)} at ${plan.s.name}`
                  : 'Competitor ads for your list, ready to show the cashier'}
              </div>
            </div>
            <Chev />
          </button>
          <button className="hrow" onClick={() => act.go('camera')}>
            <span className="iconbtn" style={{ color: 'var(--acc)', marginLeft: -8 }}><I.camera /></span>
            <div className="l">
              <div className="n">Scan a product or shelf tag</div>
              <div className="s">Lowest nearby price, who will match it, and recipes that use it</div>
            </div>
            <Chev />
          </button>
        </Sec>
      </Pad>

      <Pad>
        <Sec eyebrow="From your fridge" link="My fridge" to="fridge">
          <div className="chips row" style={{ marginTop: 12 }}>
            {user.pantry.filter((k) => BOOK[k]).map((k) => (
              <button key={k} className={`chip${SALE_KEYS.includes(k) ? ' sale' : ''}`} onClick={() => act.go('fridge')}>
                {BOOK[k].n}{SALE_KEYS.includes(k) ? ' · on sale' : ''}
              </button>
            ))}
          </div>
        </Sec>
      </Pad>

      <Pad>
        <Sec id="recommended" eyebrow="For you" title="We think you’ll cook" dek={`Ranked by what’s in your fridge and this week’s flyers${s.homeFilter !== 'All' ? ` · ${s.homeFilter}` : ''}.`}>
          <div className="grid2">{rec.slice(0, 6).map((r) => <RecipeCard key={r.id} r={r} sq />)}</div>
        </Sec>
      </Pad>

      <Pad>
        <Sec eyebrow="Trending" title="What everyone is cooking" dek="From Google Trends and TikTok this week. Each opens the original recipe; the ingredients are priced against local flyers.">
          <div className="row-scroll">{TRENDING.map((t) => <TrendingCard key={t.url} t={t} />)}</div>
        </Sec>
      </Pad>

      <Pad>
        <Sec eyebrow="This week" link="Flyers" to="stores">
          {NOTES.map((n) => (
            <button key={n.t} className="note" onClick={() => (n.r ? act.detail(n.r) : n.screen && act.go(n.screen))}>
              <div className="nt"><h4>{n.t}</h4><div className="read">{n.m}</div></div>
              <img src={n.img} alt="" loading="lazy" />
            </button>
          ))}
        </Sec>
      </Pad>

      <Pad>
        <Sec eyebrow="Kids" title="Things they’ll actually eat" band="band-kids">
          <div className="row-scroll">{KIDS.map((id) => { const r = R(id); return r ? <RecipeCard key={id} r={r} cls="kid" /> : null; })}</div>
        </Sec>
      </Pad>
      <Pad>
        <Sec eyebrow="Family" title="Feeds four, with leftovers">
          <div className="row-scroll">{FAMILY.map((id) => { const r = R(id); return r ? <RecipeCard key={id} r={r} cls="kid" /> : null; })}</div>
        </Sec>
      </Pad>
      <Foot>Plateful · Calgary flyers for the week of {FLYER_WEEK} · Prices are placeholders until live deals ship</Foot>
      <Spacer />
    </>
  );
}
