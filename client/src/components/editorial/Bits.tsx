// Shared pieces of the editorial system: section heads, recipe cards, deal tiles, top bars.
import type { CSSProperties, ReactNode } from 'react';
import type { EditorialRecipe, Screen, TrendingRecipe } from '@/lib/types';
import { BOOK, SALE_KEYS, inFridge, isFav, money, pct, perServ, plural, productImg, status, statusText, timeText, LEVEL } from '@/lib/editorial';
import { useApp } from '@/hooks/usePlateful';
import { CartMark, I } from './Icons';

export const Pad = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <div className="pad" style={style}>{children}</div>
);

export function Sec({ eyebrow, title, dek, link, to, thin, sponsored, band, className, children, id }: {
  eyebrow: string; title?: string; dek?: string; link?: string; to?: Screen; thin?: boolean; sponsored?: boolean;
  band?: string; className?: string; children?: ReactNode; id?: string;
}) {
  const { act } = useApp();
  return (
    <section id={id} className={`sec${thin ? ' thin' : ''}${band ? ` band ${band}` : ''}${className ? ' ' + className : ''}`}>
      <div className="sec-head">
        <span className="eyebrow">{eyebrow}</span>
        {link && to && (
          <button className="link" onClick={() => act.go(to)}>
            {link} <I.chevR />
          </button>
        )}
        {sponsored && <span className="sponsored">Sponsored</span>}
      </div>
      {title && <h2 className="h-serif">{title}</h2>}
      {dek && <p className="dek">{dek}</p>}
      {children}
    </section>
  );
}

export const Lvl = ({ r }: { r: EditorialRecipe }) => <span className={`lvl l${LEVEL[r.diff] || 1}`}>{r.diff}</span>;

export const Stars = ({ n, c }: { n: number; c: number }) => (
  <>
    <span className="stars" aria-label={`${n} stars`}>{'★'.repeat(Math.round(n))}</span> <span className="meta">{c.toLocaleString()}</span>
  </>
);

/** Save bookmark on a photo. Stops the card's own click. */
export function Bookmark({ id, small, hero }: { id: number; small?: boolean; hero?: boolean }) {
  const { ctx, act } = useApp();
  const on = isFav(id, ctx);
  return (
    <button
      className={hero ? `iconbtn onphoto fav${on ? ' on' : ''}` : `iconbtn onphoto${on ? ' fav' : ''}`}
      style={small ? { width: 30, height: 30 } : undefined}
      onClick={(e) => { e.stopPropagation(); act.fav(id); }}
      aria-label={on ? 'Saved' : 'Save'}
      aria-pressed={on}
    >
      {on ? <I.bookmarkFill /> : <I.bookmark />}
    </button>
  );
}

export function RecipeCard({ r, cls = '', sq, serif, showStatus = true, label }: {
  r: EditorialRecipe; cls?: string; sq?: boolean; serif?: boolean; showStatus?: boolean; label?: string;
}) {
  const { ctx, act } = useApp();
  const st = status(r, ctx);
  const ok = st.missing.length === 0;
  return (
    <div
      className={`card ${cls}`}
      role="button"
      tabIndex={0}
      onClick={() => act.detail(r.id)}
      onKeyDown={(e) => { if (e.key === 'Enter') act.detail(r.id); }}
    >
      <div className={`ph${sq ? ' sq' : ''}`}>
        {r.img ? <img src={r.img} alt={r.name} loading="lazy" /> : <div className="noimg"><I.link />{r.src || 'Linked'}</div>}
        {label && <span className="ph-label">{label}</span>}
        <Bookmark id={r.id} />
      </div>
      {serif ? <h3 className="title-serif">{r.name}</h3> : <h3 className="card-title">{r.name}</h3>}
      <div className="meta"><Lvl r={r} /> · {plural(r.ing.length, 'ingredient')} · {timeText(r.time)}</div>
      {r.src ? (
        <div className="src"><b>{r.src}</b> · <Stars n={r.rating || 0} c={r.count || 0} /></div>
      ) : (
        <div className="meta">{perServ(r)}</div>
      )}
      {showStatus && <div className={`statusline${ok ? ' ok' : ''}`}>{statusText(r, ctx)}</div>}
      <NoteMark id={r.id} />
    </div>
  );
}

/** What the cook said after making it: "★★★★ · Make again". Nothing until they have. */
export function NoteMark({ id }: { id: number }) {
  const { user } = useApp();
  const n = user.notes?.[id];
  if (!n || (!n.stars && !n.again)) return null;
  return (
    <div className="notemark">
      {n.stars > 0 && <span className="stars" aria-label={`You gave it ${n.stars} stars`}>{'★'.repeat(n.stars)}</span>}
      {n.stars > 0 && n.again && ' · '}
      {n.again && <b>Make again</b>}
    </div>
  );
}

/** Supplier-photo deal tile. The bookmark circle saves the deal. */
export function Tile({ k, grid }: { k: string; grid?: boolean }) {
  const { s, act } = useApp();
  const b = BOOK[k];
  const sel = s.saleSel.includes(k);
  const img = productImg(k);
  return (
    <div
      className={`tile${sel ? ' sel' : ''}`}
      role="button"
      tabIndex={0}
      aria-pressed={sel}
      aria-label={`${sel ? 'Saved deal' : 'Save deal'}: ${b.n}`}
      onClick={() => act.saveDeal(k)}
      onKeyDown={(e) => { if (e.key === 'Enter') act.saveDeal(k); }}
    >
      <div className="pph">
        {img ? <img src={img} alt={b.n} loading="lazy" /> : null}
        <span className="bm">{sel ? <I.bookmarkFill /> : <I.bookmark />}</span>
      </div>
      <div className="store">{b.r}</div>
      <div className="nm">{b.n}<Maple k={k} /></div>
      <div className="sz">{b.size}</div>
      <div className="pr">
        <span className="price">{money(b.p)}{b.u || ''}</span>
        {b.was !== undefined && <span className="was">{money(b.was)}</span>}
        {b.was !== undefined && <span className="off">{pct(k)}% off</span>}
      </div>
      {grid && sel && <div className="saved">Saved</div>}
    </div>
  );
}

export function TrendingCard({ t }: { t: TrendingRecipe }) {
  const { ctx } = useApp();
  const sale = t.ing.filter((k) => SALE_KEYS.includes(k)).length;
  const have = t.ing.filter((k) => inFridge(k, ctx)).length;
  return (
    <a className="card tcard" href={t.url} target="_blank" rel="noopener noreferrer">
      <div className="ph"><img src={t.img} alt={t.name} loading="lazy" /></div>
      <div className="eyebrow acc" style={{ fontSize: 10 }}>{t.why}</div>
      <h3 className="title-serif">{t.name}</h3>
      <div className="src"><b>{t.source}</b> · Open recipe ↗</div>
      <div className={`statusline${sale ? ' ok' : ''}`}>
        {sale ? `${plural(sale, 'ingredient')} on sale` : 'Priced locally'} · {have} of {t.ing.length} in your fridge
      </div>
    </a>
  );
}

export const Topbar = ({ left, right, lined }: { left: ReactNode; right?: ReactNode; lined?: boolean }) => (
  <div className={`topbar${lined ? ' lined' : ''}`}>{left}{right ?? null}</div>
);

export const Wordmark = () => (
  <div className="wordmark"><CartMark size={26} />Plateful</div>
);

export function BackBtn({ label = 'Back', onPhoto, light }: { label?: string; onPhoto?: boolean; light?: boolean }) {
  const { act } = useApp();
  return (
    <button
      className={`iconbtn${onPhoto ? ' onphoto back' : ''}`}
      onClick={act.back}
      aria-label={label}
      style={onPhoto ? undefined : { marginLeft: -10, color: light ? '#fff' : undefined }}
    >
      {light ? <I.x /> : <I.chevL />}
    </button>
  );
}

/** Title + meta pair used in most top bars. */
export const Title = ({ title, meta }: { title: ReactNode; meta?: ReactNode }) => (
  <div>
    <h1 className="screen-title">{title}</h1>
    {meta && <div className="meta">{meta}</div>}
  </div>
);

export const Spacer = () => <div className="spacer" />;
export const Foot = ({ children }: { children: ReactNode }) => <div className="foot">{children}</div>;

/** Search-result style row with a thumbnail. */
export function SRow({ img, t, m, onClick, style }: { img?: string; t: ReactNode; m?: ReactNode; onClick: () => void; style?: CSSProperties }) {
  return (
    <button className="srow" onClick={onClick} style={style}>
      {img && <img src={img} alt="" />}
      <div><div className="t">{t}</div>{m && <div className="m">{m}</div>}</div>
    </button>
  );
}

export const Chev = () => <I.chevR className="chev" />;

/** "Product of Canada": a small maple leaf after the name of any price-book item flagged Canadian (BOOK[k].ca). */
export const Maple = ({ k }: { k: string }) =>
  BOOK[k]?.ca ? <span className="maple" title="Product of Canada" aria-label="Product of Canada" role="img"><I.leaf /></span> : null;

