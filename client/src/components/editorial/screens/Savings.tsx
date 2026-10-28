// What a shopper has actually saved with Plateful: only things they did (matches applied at the till, a list moved to one
// store, sale items bought), never the projection. The projection sits at the foot, clearly labelled as an estimate.
import { useApp } from '@/hooks/usePlateful';
import { about, defaultUsual, firstSaving, money, plural, projectSavings, savedAllTime, savedByKind, savedByMonth, savedThisMonth } from '@/lib/editorial';
import type { SavingEntry } from '@/lib/types';
import { BackBtn, Chev, Foot, Pad, Sec, Spacer, Title, Topbar } from '../Bits';

const PLUS = 4.99;
const KIND: Record<SavingEntry['kind'], { t: string; how: string }> = {
  match: { t: 'Price matches at the till', how: 'Competitor flyer ads shown at checkout' },
  route: { t: 'Shopping the cheapest store', how: 'Your list moved to one store, against the store nearest you' },
  deal: { t: 'Sale items bought', how: 'This week’s flyer price against the regular price' },
};
const day = (at: string) => new Date(at + 'T12:00').toLocaleDateString('en-CA', { weekday: 'short', month: 'short', day: 'numeric' });

export function Savings() {
  const { user, act } = useApp();
  const all = savedAllTime(user);
  const month = savedThisMonth(user);
  const months = savedByMonth(user, 6).reverse();
  const top = Math.max(...months.map((m) => m.amt), 1);
  const kinds = savedByKind(user);
  const since = firstSaving(user);
  const entries = user.savings || [];
  const pr = projectSavings(user.usual || defaultUsual(user.householdSize), user);
  const covers = month / PLUS;

  return (
    <>
      <Topbar left={<><BackBtn /><Title title="Your savings" meta="What you’ve actually saved with Plateful" /></>} />
      <Pad>
        <div className="sv-hero">
          <div className="lab">Saved since {since ? new Date(since + 'T12:00').toLocaleDateString('en-CA', { month: 'long', year: 'numeric' }) : 'you started'}</div>
          <div className="big">{money(all)}</div>
          <div className="sub">
            {money(month)} this month
            {month > 0 ? ` · ${covers >= 1 ? `pays for Plus ${covers >= 2 ? `${Math.floor(covers)} times over` : 'and then some'}` : `${money(PLUS - month)} more covers Plus this month`}` : ''}
          </div>
        </div>

        {all > 0 ? (
          <>
            <Sec eyebrow="By month" thin>
              <div className="sv-bars" role="img" aria-label={months.map((m) => `${m.label} ${money(m.amt)}`).join(', ')}>
                {months.map((m) => (
                  <div key={m.month} className="col">
                    <span className="v">{m.amt > 0 ? money(m.amt) : ''}</span>
                    <i style={{ height: `${Math.max(2, (m.amt / top) * 100)}%` }} className={m.amt > 0 ? '' : 'none'} />
                    <span className="m">{m.label}</span>
                  </div>
                ))}
              </div>
            </Sec>

            <Sec eyebrow="How you saved" thin>
              {(Object.keys(KIND) as SavingEntry['kind'][]).filter((k) => kinds[k].n > 0).map((k) => (
                <div key={k} className="hrow">
                  <div className="l"><div className="n">{KIND[k].t}</div><div className="s">{plural(kinds[k].n, 'time')} · {KIND[k].how}</div></div>
                  <span className="price acc">{money(kinds[k].amt)}</span>
                </div>
              ))}
            </Sec>

            <Sec eyebrow={`Every saving · ${entries.length}`} thin>
              {entries.map((e) => (
                <div key={e.id} className="hrow">
                  <div className="l"><div className="n">{e.what}</div><div className="s">{day(e.at)}</div></div>
                  <span className="price acc">{money(e.amt)}</span>
                </div>
              ))}
            </Sec>
          </>
        ) : (
          <Sec eyebrow="Nothing saved yet" thin>
            <p className="dek" style={{ marginTop: 8 }}>This page counts only what you actually save. Three ways it adds up:</p>
            {(Object.keys(KIND) as SavingEntry['kind'][]).map((k) => (
              <div key={k} className="hrow"><div className="l"><div className="n">{KIND[k].t}</div><div className="s">{KIND[k].how}</div></div></div>
            ))}
            <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
              <button className="btn primary" onClick={() => act.go('list')}>Open your list</button>
            </div>
          </Sec>
        )}

        {pr && (
          <Sec eyebrow="Estimate · your usual shop" thin>
            <p className="meta" style={{ margin: '8px 0 4px' }}>
              Not counted above. The {plural(pr.items, 'item')} you buy most weeks cost {money(pr.usual)} at {pr.nearest.name} and {money(pr.withPlateful)} {pr.route === 'match' ? `at ${pr.to} with price matches` : `at ${pr.to}`} — about {about(pr.monthly)} a month if you shop that way every week.
            </p>
            <button className="hrow" onClick={act.editUsual}>
              <div className="l"><div className="n">Edit your usual shop</div></div>
              <Chev />
            </button>
          </Sec>
        )}
      </Pad>
      <Foot>Savings are kept on this phone. Each one is measured against the price you would otherwise have paid at the time.</Foot>
      <Spacer />
    </>
  );
}
