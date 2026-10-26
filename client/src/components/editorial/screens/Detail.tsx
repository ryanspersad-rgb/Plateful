import { useApp } from '@/hooks/usePlateful';
import { ALL_RECIPES, BOOK, LEVEL, R, SALE_KEYS, inFridge, money, nameFor, perServ, plural, status, statusText, timeText } from '@/lib/editorial';
import { BackBtn, Bookmark, Lvl, Pad, RecipeCard, Sec, Spacer, Stars } from '../Bits';
import { I } from '../Icons';

export function Detail() {
  const { s, user, ctx, act } = useApp();
  const r = s.detail !== null ? R(s.detail) : undefined;
  if (!r) return <Pad><p className="dek" style={{ marginTop: 20 }}>That recipe is not available.</p></Pad>;
  const st = status(r, ctx);
  const ok = st.missing.length === 0;
  const similar = ALL_RECIPES.filter((x) => x.id !== r.id && (x.cuisine === r.cuisine || x.tags.some((t) => r.tags.includes(t)))).slice(0, 2);
  const cooked = (user.cooked || []).includes(r.id);
  const pts = LEVEL[r.diff] || 1;
  return (
    <>
      <div className="hero">
        <img src={r.img} alt={r.name} />
        <BackBtn onPhoto />
        <Bookmark id={r.id} hero />
      </div>
      <Pad>
        <div className="status-line" style={{ marginTop: 16 }}><span className="st">{statusText(r, ctx)}</span> · {r.cuisine} · {r.meal}</div>
        <h1 className="screen-title" style={{ marginTop: 8 }}>{r.name}</h1>
        <div className="byline" style={{ marginTop: 8 }}>
          {r.src ? <>From <u>{r.src}</u> · <Stars n={r.rating || 0} c={r.count || 0} /></> : <>From the <u>Plateful kitchen</u> · priced against this week’s flyers</>}
        </div>
        {r.dek && <p className="dek" style={{ marginTop: 10 }}>{r.dek}</p>}
        <div className="meta" style={{ marginTop: 10 }}><Lvl r={r} /> · {plural(r.ing.length, 'ingredient')} · Serves {r.serv} · {timeText(r.time)}</div>
        {r.teaches.length > 0 && <div className="teaches" style={{ marginTop: 6 }}><b>Teaches</b> {r.teaches.join(' · ')}</div>}
        {r.total > 0 && (
          <div className="twocol">
            <div><div className="lab">Total cost</div><div className="big">{money(r.total)}</div><div className="sub">{perServ(r)}</div></div>
            <div><div className="lab">You save</div><div className="big acc">{money(r.save)}</div><div className="sub">vs regular prices this week</div></div>
          </div>
        )}
        {r.macros && (
          <div className="macros">
            {(['Protein', 'Carbs', 'Fat', 'Fibre'] as const).map((m, i) => <span key={m}><b>{r.macros![i]} g</b>{m}</span>)}
          </div>
        )}
        <Sec eyebrow={`Ingredients · ${r.ing.length}`} thin>
          {r.ing.map(([k, a]) => {
            const b = BOOK[k];
            const have = inFridge(k, ctx);
            const sale = SALE_KEYS.includes(k);
            return (
              <div key={k + a} className="hrow ingrow">
                <div className="l"><span className="amt">{a}</span><span className="n">{nameFor(k)}</span></div>
                <div className="r">
                  {have ? <span className="mut">In your fridge</span>
                    : !b ? <span className="mut">No price yet</span>
                    : sale ? <span className="acc">{money(b.p)}{b.u || ''} · {b.r}</span>
                    : <span className="mut">{money(b.p)} · {b.r}</span>}
                </div>
              </div>
            );
          })}
        </Sec>
        <div style={{ marginTop: 18 }}>
          {ok ? (
            <button className="btn secondary" onClick={() => act.go('list')}>Everything’s in your fridge · Open your list</button>
          ) : (
            <button className="btn primary" onClick={() => act.addMissing(r.id)}>
              Add {plural(st.missing.length, 'item')} to list{st.cost > 0 ? ` · ${money(st.cost)}` : ''}
            </button>
          )}
        </div>
        <Sec eyebrow="Preparation" thin>
          <ol className="steps">{r.steps.map((step, i) => <li key={i}>{step}</li>)}</ol>
          <div style={{ marginTop: 16 }}>
            {cooked ? (
              <button className="btn secondary" onClick={() => act.go('profile')}><I.check /> Cooked · see your cook level</button>
            ) : (
              <button className="btn secondary" onClick={() => act.cooked(r.id)}><I.check /> I cooked this</button>
            )}
            <div className="meta" style={{ textAlign: 'center', marginTop: 8 }}>{r.diff} recipes add {plural(pts, 'point')} to your cook level</div>
          </div>
        </Sec>
        {similar.length > 0 && (
          <Sec eyebrow="Similar recipes" thin>
            <div className="grid2">{similar.map((x) => <RecipeCard key={x.id} r={x} sq />)}</div>
          </Sec>
        )}
      </Pad>
      <Spacer />
    </>
  );
}
