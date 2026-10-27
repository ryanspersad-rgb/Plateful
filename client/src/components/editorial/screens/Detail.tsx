import { useApp } from '@/hooks/usePlateful';
import { allRecipes, BOOK, DAYS, LEVEL, R, SALE_KEYS, inFridge, money, nameFor, plural, scaleIngredients, status, statusText, timeText } from '@/lib/editorial';
import { BackBtn, Bookmark, Lvl, Pad, RecipeCard, Sec, Spacer, Stars } from '../Bits';
import { I } from '../Icons';

/** Stars the cook taps; the fifth is as easy to hit as the first. */
export function StarPick({ value, onPick, size = 26 }: { value: number; onPick: (n: number) => void; size?: number }) {
  return (
    <div className="starpick" role="radiogroup" aria-label="Your rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} role="radio" aria-checked={value === n} aria-label={`${n} star${n > 1 ? 's' : ''}`} className={n <= value ? 'on' : ''} style={{ fontSize: size }} onClick={() => onPick(value === n ? 0 : n)}>★</button>
      ))}
    </div>
  );
}

function YourNotes({ id }: { id: number }) {
  const { user, act } = useApp();
  const n = user.notes?.[id] || { stars: 0, again: false, note: '', at: '' };
  return (
    <Sec eyebrow="Your notes" thin>
      <div className="notes">
        <div className="row">
          <StarPick value={n.stars} onPick={(stars) => act.setNote(id, { stars })} />
          <button className={`chip${n.again ? ' sel' : ''}`} aria-pressed={n.again} onClick={() => act.setNote(id, { again: !n.again })}>
            {n.again ? <I.check /> : null} Make it again
          </button>
        </div>
        <textarea
          className="notefield" rows={2} placeholder="A note for next time — less chili, double the sauce…"
          defaultValue={n.note} aria-label="Your note"
          onBlur={(e) => { if (e.target.value !== n.note) act.setNote(id, { note: e.target.value }); }}
        />
        <div className="meta">{n.again ? 'Recipes you’d make again rank higher in your recommendations.' : 'Kept on this phone with your history.'}</div>
      </div>
    </Sec>
  );
}

export function Detail() {
  const { s, user, ctx, act } = useApp();
  const r = s.detail !== null ? R(s.detail) : undefined;
  if (!r) return <Pad><p className="dek" style={{ marginTop: 20 }}>That recipe is not available.</p></Pad>;
  const st = status(r, ctx);
  const ok = st.missing.length === 0;
  const similar = allRecipes().filter((x) => x.id !== r.id && (x.cuisine === r.cuisine || x.tags.some((t) => r.tags.includes(t)))).slice(0, 2);
  const cooked = (user.cooked || []).includes(r.id);
  const plannedDays = DAYS.filter((d) => s.plan[d].includes(r.id));
  const pts = LEVEL[r.diff] || 1;
  // servings: the household by default, then whatever the cook stepped to
  const serv = s.servPick[r.id] ?? user.householdSize ?? r.serv;
  const f = r.serv > 0 ? serv / r.serv : 1;
  const ing = scaleIngredients(r.ing, r.serv, serv);
  const scaled = serv !== r.serv;
  return (
    <>
      <div className="hero">
        {r.img ? <img src={r.img} alt={r.name} /> : <div className="noimg"><I.link />From {r.src}</div>}
        <BackBtn onPhoto />
        <Bookmark id={r.id} hero />
      </div>
      <Pad>
        <div className="status-line" style={{ marginTop: 16 }}><span className="st">{statusText(r, ctx)}</span> · {r.cuisine} · {r.meal}</div>
        <h1 className="screen-title" style={{ marginTop: 8 }}>{r.name}</h1>
        <div className="byline" style={{ marginTop: 8 }}>
          {r.url ? <>From <a href={r.url} target="_blank" rel="noopener noreferrer"><u>{r.src}</u></a> · your linked recipe, priced by the pack against this week’s flyers</>
            : r.src ? <>From <u>{r.src}</u> · <Stars n={r.rating || 0} c={r.count || 0} /></> : <>From the <u>Plateful kitchen</u> · priced against this week’s flyers</>}
        </div>
        {r.dek && <p className="dek" style={{ marginTop: 10 }}>{r.dek}</p>}
        <div className="meta" style={{ marginTop: 10 }}><Lvl r={r} /> · {plural(r.ing.length, 'ingredient')} · {timeText(r.time)}</div>
        {r.teaches.length > 0 && <div className="teaches" style={{ marginTop: 6 }}><b>Teaches</b> {r.teaches.join(' · ')}</div>}
        <div className="servings">
          <div className="l">
            <div className="lab">Servings</div>
            <div className="sub">{scaled ? `Scaled from ${r.serv} · amounts and cost follow` : serv === user.householdSize ? `Your household of ${user.householdSize}` : 'As written'}</div>
          </div>
          <div className="stepper" role="group" aria-label="Servings">
            <button onClick={() => act.setServings(r.id, serv - 1)} disabled={serv <= 1} aria-label="Fewer servings">−</button>
            <span className="n">{serv}</span>
            <button onClick={() => act.setServings(r.id, serv + 1)} disabled={serv >= 24} aria-label="More servings">+</button>
          </div>
        </div>
        {r.total > 0 && (
          <div className="twocol">
            <div><div className="lab">Total cost{scaled ? ` · serves ${serv}` : ''}</div><div className="big">{money(r.total * f)}</div><div className="sub">{money(r.total / r.serv)} a serving</div></div>
            <div><div className="lab">You save</div><div className="big acc">{money(r.save * f)}</div><div className="sub">vs regular prices this week</div></div>
          </div>
        )}
        {r.macros && (
          <div className="macros">
            {(['Protein', 'Carbs', 'Fat', 'Fibre'] as const).map((m, i) => <span key={m}><b>{r.macros![i]} g</b>{m}</span>)}
          </div>
        )}
        <Sec eyebrow={`Ingredients · ${r.ing.length}${scaled ? ` · for ${serv}` : ''}`} thin>
          {ing.map(([k, a]) => {
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
        <div style={{ marginTop: 18, display: 'grid', gap: 10 }}>
          {ok ? (
            <button className="btn secondary" onClick={() => act.go('list')}>Everything’s in your fridge · Open your list</button>
          ) : (
            <button className="btn primary" onClick={() => act.addMissing(r.id, serv)}>
              Add {plural(st.missing.length, 'item')} to list{st.cost > 0 ? ` · ${money(st.cost)}` : ''}
            </button>
          )}
          {plannedDays.length ? (
            <button className="btn ghost" onClick={() => act.go('plan')}>Planned for {plannedDays.join(', ')} · Open the plan</button>
          ) : (
            <button className="btn ghost" onClick={() => act.patch({ dayPick: !s.dayPick })} aria-expanded={s.dayPick}>Add to this week’s plan</button>
          )}
          {s.dayPick && !plannedDays.length && (
            <div className="daychips" style={{ marginTop: 0 }}>
              {DAYS.map((d) => (
                <button key={d} className={`chip${s.plan[d].length ? ' has' : ''}`} onClick={() => act.planAdd(d, r.id)} title={s.plan[d].length ? 'Already has a dinner' : ''}>
                  {d.slice(0, 3)}
                </button>
              ))}
            </div>
          )}
        </div>
        <Sec eyebrow={r.steps.length ? `Preparation · ${plural(r.steps.length, 'step')}` : 'Preparation'} thin>
          {r.url && (
            <a className="btn secondary" style={{ marginTop: 12 }} href={r.url} target="_blank" rel="noopener noreferrer"><I.link /> Open the original on {r.src}</a>
          )}
          {r.steps.length > 0 && (
            <>
              <button className="btn secondary" style={{ marginTop: r.url ? 10 : 12 }} onClick={() => act.cookStart(r.id)}><I.play /> Cook step by step</button>
              <div className="meta" style={{ textAlign: 'center', marginTop: 8, marginBottom: 4 }}>One step at a time, timers from the recipe, screen stays on</div>
              <ol className="steps">{r.steps.map((step, i) => <li key={i}>{step}</li>)}</ol>
            </>
          )}
          {!r.steps.length && r.url && <p className="dek" style={{ marginTop: 12 }}>The method is on the original page. Paste it into the recipe’s link form and cook mode will walk you through it.</p>}
          <div style={{ marginTop: 16 }}>
            {cooked ? (
              <button className="btn secondary" onClick={() => act.go('profile')}><I.check /> Cooked · see your cook level</button>
            ) : (
              <button className="btn secondary" onClick={() => act.cooked(r.id)}><I.check /> I cooked this</button>
            )}
            <div className="meta" style={{ textAlign: 'center', marginTop: 8 }}>{r.diff} recipes add {plural(pts, 'point')} to your cook level</div>
          </div>
        </Sec>
        {cooked && <YourNotes id={r.id} />}
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
