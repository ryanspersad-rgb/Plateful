import { useState } from 'react';
import { useApp } from '@/hooks/usePlateful';
import { BOOK, FRIDGE_CATS, SALE_KEYS, money } from '@/lib/editorial';
import { BackBtn, Pad, Sec, Spacer, Title, Topbar } from '../Bits';
import { I } from '../Icons';

export function Fridge() {
  const { user, act } = useApp();
  const [q, setQ] = useState('');
  const onSale = user.pantry.filter((k) => SALE_KEYS.includes(k)).length;
  const quick = SALE_KEYS.filter((k) => !user.pantry.includes(k));
  const uncategorised = user.pantry.filter((k) => BOOK[k] && !Object.values(FRIDGE_CATS).some((keys) => keys.includes(k)));
  const groups: [string, string[]][] = Object.keys(FRIDGE_CATS).map((c) => [c, user.pantry.filter((k) => FRIDGE_CATS[c].includes(k))]);
  if (uncategorised.length) groups.push(['Other', uncategorised]);
  const add = () => {
    const v = q.trim().toLowerCase();
    if (!v) return;
    const k = Object.keys(BOOK).find((x) => BOOK[x].n.toLowerCase().startsWith(v));
    if (k) { act.addFridge(k); setQ(''); } else act.toast('Not in this week’s price book yet');
  };
  return (
    <>
      <Topbar left={<><BackBtn /><Title title="My fridge" meta={`${user.pantry.length} items · ${onSale} on sale this week`} /></>} />
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
                return (
                  <div key={k} className="hrow">
                    <div className="l">
                      <div className="n">{b.n}</div>
                      {b.was !== undefined && <div className="s" style={{ color: 'var(--acc)', fontWeight: 600 }}>On sale · {money(b.p)}{b.u || ''} at {b.r}</div>}
                    </div>
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
