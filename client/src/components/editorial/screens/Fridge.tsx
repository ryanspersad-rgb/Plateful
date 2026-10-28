import { useState } from 'react';
import { useApp } from '@/hooks/usePlateful';
import { BOOK, FRIDGE_CATS, SALE_KEYS, daysLeft, expiringSoon, money, plural, shelfDays, whenText } from '@/lib/editorial';
import { BackBtn, Maple, Pad, Sec, Spacer, Title, Topbar } from '../Bits';
import { I } from '../Icons';

export function Fridge() {
  const { user, act } = useApp();
  const [q, setQ] = useState('');
  const onSale = user.pantry.filter((k) => SALE_KEYS.includes(k)).length;
  const soon = expiringSoon(user, 4);
  const ex = user.expiry || {};
  const quick = SALE_KEYS.filter((k) => !user.pantry.includes(k));
  const uncategorised = user.pantry.filter((k) => BOOK[k] && !Object.values(FRIDGE_CATS).some((keys) => keys.includes(k)));
  const byDate = (a: string, b: string) => (ex[a] ? daysLeft(ex[a]) : 999) - (ex[b] ? daysLeft(ex[b]) : 999);
  const groups: [string, string[]][] = Object.keys(FRIDGE_CATS).map((c) => [c, user.pantry.filter((k) => FRIDGE_CATS[c].includes(k)).sort(byDate)]);
  if (uncategorised.length) groups.push(['Other', uncategorised]);
  const add = () => {
    const v = q.trim().toLowerCase();
    if (!v) return;
    const k = Object.keys(BOOK).find((x) => BOOK[x].n.toLowerCase().startsWith(v));
    if (k) { act.addFridge(k); setQ(''); } else act.toast('Not in this week’s price book yet');
  };
  return (
    <>
      <Topbar left={<><BackBtn /><Title title="My fridge" meta={`${user.pantry.length} items · ${onSale} on sale this week${soon.length ? ` · ${plural(soon.length, 'item')} to use soon` : ''}`} /></>} />
      <Pad>
        <div className="search">
          <I.plus />
          <input type="text" placeholder="Add something you have" value={q} autoComplete="off" aria-label="Add to fridge" onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') add(); }} />
        </div>
        {groups.map(([c, keys]) =>
          keys.length ? (
            <Sec key={c} eyebrow={c} thin>
              {keys.map((k) => {
                const b = BOOK[k];
                const date = ex[k];
                const left = date ? daysLeft(date) : null;
                const keeps = shelfDays(k) !== null;
                return (
                  <div key={k} className="hrow">
                    <div className="l">
                      <div className="n">{b.n}<Maple k={k} /></div>
                      {date && left !== null ? (
                        <div className={`s${left < 0 ? ' late' : left <= 2 ? ' soon' : ''}`}>
                          {left < 0 ? `Past its date · ${whenText(date)}` : left === 0 ? 'Use today' : `Use by ${whenText(date)}${left >= 7 ? '' : ` · ${plural(left, 'day')}`}`}
                        </div>
                      ) : keeps ? (
                        <div className="s">No date yet</div>
                      ) : (
                        <div className="s">Keeps</div>
                      )}
                      {b.was !== undefined && <div className="s" style={{ color: 'var(--acc)', fontWeight: 600 }}>On sale · {money(b.p)}{b.u || ''} at {b.r}</div>}
                    </div>
                    {keeps && (
                      <input
                        className="datein"
                        type="date"
                        value={date || ''}
                        aria-label={`Use-by date for ${b.n}`}
                        onChange={(e) => act.setExpiry(k, e.target.value || null)}
                      />
                    )}
                    <button className="iconbtn" onClick={() => act.removeFridge(k)} aria-label="Remove" style={{ width: 32, height: 32, color: 'var(--faint)', marginRight: -8 }}><I.x /></button>
                  </div>
                );
              })}
            </Sec>
          ) : null,
        )}
        <Sec eyebrow="Quick add from this week’s sales" thin>
          <div className="chips" style={{ marginTop: 12 }}>
            {quick.map((k) => <button key={k} className="chip sale" onClick={() => act.addFridge(k)}><I.plus /> {BOOK[k].n}</button>)}
          </div>
        </Sec>
      </Pad>
      <Spacer />
    </>
  );
}
