// This week's plan — the meal calendar from the pre-redesign app, in the editorial system.
// Seven days, Monday first; a dinner per day (more if you like); the week's groceries go to the list in one tap.
import { useApp } from '@/hooks/usePlateful';
import type { EditorialRecipe } from '@/lib/types';
import {
  DAYS, type Day, R, budgetFor, dateOfDay, money, perServ, planStats, plural, recommended, searchRecipes, statusText, timeText, todayDay, weekStart,
} from '@/lib/editorial';
import { Foot, Pad, Sec, SRow, Spacer, Title, Topbar } from '../Bits';
import { I } from '../Icons';
import { BudgetLine, ListPlanTabs } from './List';

const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const shortDate = (iso: string) => { const d = new Date(iso + 'T12:00:00'); return `${MON[d.getMonth()]} ${d.getDate()}`; };

function Picker({ day }: { day: Day }) {
  const { s, ctx, act } = useApp();
  const q = s.planQ.trim();
  const taken = new Set(DAYS.flatMap((d) => s.plan[d]));
  const hits: EditorialRecipe[] = q
    ? searchRecipes(q, 6)
    : recommended('All', ctx).filter((r) => !taken.has(r.id) && r.total > 0).slice(0, 6);
  return (
    <div className="picker">
      <div className="search">
        <I.search />
        <input type="text" placeholder={`A dinner for ${day}`} value={s.planQ} autoComplete="off" autoFocus aria-label="Find a recipe" onChange={(e) => act.patch({ planQ: e.target.value })} />
        <button className="iconbtn" onClick={() => act.patch({ planPick: null, planQ: '' })} aria-label="Close"><I.x /></button>
      </div>
      {!q && <div className="srow meta" style={{ padding: '8px 12px' }}>Ranked by your fridge and this week’s flyers</div>}
      {hits.map((r) => (
        <SRow key={r.id} img={r.img} t={r.name} m={`${perServ(r)} · ${statusText(r, ctx)} · ${timeText(r.time)}`} onClick={() => act.planAdd(day, r.id)} />
      ))}
      {q && !hits.length && <div className="srow meta">No recipe matches “{q}”.</div>}
    </div>
  );
}

export function Plan() {
  const { s, user, ctx, act } = useApp();
  const st = planStats(s.plan, ctx);
  const start = weekStart();
  const today = todayDay();
  const b = budgetFor(user, s.list);
  const meta = st.dinners
    ? `${plural(st.dinners, 'dinner')} · ${money(st.cost)} for the week${b ? ` · budget ${money(b.budget)}` : ''}`
    : `Week of ${shortDate(start)} · nothing planned yet`;
  return (
    <>
      <Topbar
        left={<Title title="This week’s plan" meta={meta} />}
        right={st.dinners ? <button className="textlink" onClick={act.planClear} style={{ color: 'var(--mute)' }}>Clear</button> : null}
      />
      <Pad>
        <ListPlanTabs current="plan" />
        <div style={{ display: 'flex', gap: 10, margin: '6px 0 4px' }}>
          <button className="btn secondary sm" onClick={act.planAuto}>Fill empty days</button>
          {st.missing.length > 0 && <button className="btn primary sm" onClick={act.planToList}>Add {plural(st.missing.length, 'item')} to list</button>}
        </div>
        {st.dinners > 0 && (
          <div className="twocol" style={{ marginTop: 12 }}>
            <div><div className="lab">The week</div><div className="big">{money(st.cost)}</div><div className="sub">{st.ingredients} ingredients · {st.inFridge} in your fridge · {st.onSale} on sale</div></div>
            <div><div className="lab">You save</div><div className="big acc">{money(st.save)}</div><div className="sub">vs regular prices this week</div></div>
          </div>
        )}
        {DAYS.map((day) => {
          const ids = s.plan[day];
          return (
            <div key={day}>
              <div className="dayhead">
                <span className={`dn${day === today ? ' today' : ''}`}>{day}</span>
                <span className="dd">{shortDate(dateOfDay(day, start))}</span>
              </div>
              {ids.map((id) => {
                const r = R(id);
                if (!r) return null;
                return (
                  <div key={id} className="hrow">
                    <SRow img={r.img} t={r.name} m={`${perServ(r)} · ${statusText(r, ctx)} · ${timeText(r.time)}`} onClick={() => act.detail(r.id)} style={{ padding: '4px 0', flex: 1, borderBottom: 0 }} />
                    <button className="iconbtn" onClick={() => act.planRemove(day, id)} aria-label={`Remove ${r.name}`} style={{ width: 32, height: 32, color: 'var(--faint)', marginRight: -8 }}><I.x /></button>
                  </div>
                );
              })}
              {s.planPick === day ? (
                <Picker day={day} />
              ) : (
                <button className="addrow" onClick={() => act.patch({ planPick: day, planQ: '' })}><I.plus /> {ids.length ? 'Add another' : 'Add a dinner'}</button>
              )}
            </div>
          );
        })}
        {b && (
          <Sec eyebrow="Budget" thin>
            <BudgetLine />
          </Sec>
        )}
      </Pad>
      <Foot>Plan a week and the groceries it needs go to your list in one tap. Dinners you cook count toward your cook level.</Foot>
      <Spacer />
    </>
  );
}
