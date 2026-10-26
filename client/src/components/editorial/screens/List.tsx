import { useApp } from '@/hooks/usePlateful';
import type { ListItem } from '@/lib/types';
import { BOOK, SALE_KEYS, STORE, budgetFor, cheapestFor, listTotal, money, oneStop, plannedCount, plural, pmItems, unitPrice } from '@/lib/editorial';
import { Foot, Pad, Sec, Spacer, Title, Topbar } from '../Bits';
import { I } from '../Icons';

/** List · Plan switch at the top of both screens. */
export function ListPlanTabs({ current }: { current: 'list' | 'plan' }) {
  const { s, act } = useApp();
  const n = plannedCount(s.plan);
  return (
    <nav className="ttabs" aria-label="List or plan" style={{ marginBottom: 10 }}>
      <button className={`ttab${current === 'list' ? ' on' : ''}`} onClick={() => current !== 'list' && act.go('list')}>Your list</button>
      <button className={`ttab${current === 'plan' ? ' on' : ''}`} onClick={() => current !== 'plan' && act.go('plan')}>This week’s plan{n ? ` · ${n}` : ''}</button>
    </nav>
  );
}

/** Weekly budget against the list: planned total, bought so far, what is left. */
export function BudgetLine() {
  const { s, user, act } = useApp();
  const b = budgetFor(user, s.list);
  if (!b) {
    return (
      <div className="budget">
        <div className="row">
          <span className="s">No weekly budget yet</span>
          <button className="set" onClick={() => act.go('profile')}>Set one</button>
        </div>
      </div>
    );
  }
  return (
    <div className={`budget${b.over ? ' over' : ''}`}>
      <div className="row">
        <span className="n">{money(b.planned)} <span className="s">of {money(b.budget)}</span></span>
        <span className="s">{b.over ? <b>{money(-b.left)} over</b> : <>{money(b.left)} left</>}</span>
      </div>
      <div className="bar"><i style={{ width: `${b.pct}%` }} /></div>
      <div className="s">{money(b.bought)} bought so far · {money(b.planned - b.bought)} still to buy{b.over ? ' · try the cheapest one-stop below' : ''}</div>
    </div>
  );
}

const SEND = [
  { name: 'PC Express', url: 'https://www.pcexpress.ca' },
  { name: 'Voilà', url: 'https://voila.ca' },
  { name: 'Walmart', url: 'https://www.walmart.ca/grocery' },
  { name: 'Instacart', url: 'https://www.instacart.ca' },
];

export function List() {
  const { s, user, act } = useApp();
  const groups: Record<string, ListItem[]> = {};
  s.list.forEach((i) => { (groups[i.sid] = groups[i.sid] || []).push(i); });
  const pm = pmItems(s.list);
  const pmSave = pm.reduce((a, x) => a + x.save, 0);
  const os = oneStop(s.list, user);
  const items = s.list.length;
  const lq = s.lq.trim().toLowerCase();
  const sugg = lq
    ? Object.keys(BOOK)
        .filter((k) => BOOK[k].n.toLowerCase().includes(lq) && !s.list.some((i) => i.key === k))
        .slice(0, 5)
        .map((k) => ({ k, best: cheapestFor(k, user) }))
    : [];
  const storeIds = Object.keys(groups).sort((a, b) => (STORE(a)?.km ?? 99) - (STORE(b)?.km ?? 99));

  return (
    <>
      <Topbar
        left={<Title title="Your list" meta={`${items} items · ${money(listTotal(s.list))} across ${plural(storeIds.length, 'store')}`} />}
        right={
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {items > 0 && <button className="textlink" onClick={act.clearList} style={{ color: 'var(--mute)' }}>Clear</button>}
            <button className="iconbtn" onClick={() => act.go('camera')} aria-label="Camera check"><I.camera /></button>
          </div>
        }
      />
      <Pad>
        <ListPlanTabs current="list" />
        <div className="search" style={{ marginTop: 0 }}>
          <I.plus />
          <input type="search" placeholder="Add to your list" value={s.lq} autoComplete="off" aria-label="Add to your list" onChange={(e) => act.patch({ lq: e.target.value })} />
        </div>
        {lq && (
          <div className="sresults">
            {sugg.map(({ k, best }) => (
              <button key={k} className="srow" onClick={() => act.addListKey(k, best?.x.id)}>
                <div style={{ flex: 1 }}>
                  <div className="t">{BOOK[k].n}</div>
                  {best && (
                    <div className="m">
                      Cheapest near you: <b>{money(best.p)}{BOOK[k].u || ''}</b> · {best.x.name}{BOOK[k].was !== undefined && BOOK[k].sid === best.x.id ? ' · on sale' : ''}
                    </div>
                  )}
                </div>
                <I.plus />
              </button>
            ))}
            {!sugg.length && (
              <>
                <div className="srow meta">Nothing in this week’s price book matches “{s.lq}”. Add it anyway?</div>
                <button className="srow add" onClick={() => act.addFree(s.lq.trim())}><I.plus /> Add “{s.lq.trim()}” without a price</button>
              </>
            )}
          </div>
        )}
        {!items && <p className="dek" style={{ marginTop: 14 }}>Your list is empty. Add items above, or open a recipe and tap “Add to list”.</p>}
        {items > 0 && <BudgetLine />}
        {pm.length > 0 && (
          <>
            <button className="banner" onClick={() => act.go('till')}>
              <div>
                <div className="b1">Price match {plural(pm.length, 'item')} · save {money(pmSave)}</div>
                <div className="b2">Ads are ready to show at the till · tap to open</div>
              </div>
              <I.chevR />
            </button>
            <div style={{ display: 'flex', gap: 10, margin: '4px 0 2px' }}>
              <button className="textlink" onClick={() => act.go('pricematch')}>Compare every ad</button>
              <span className="meta">·</span>
              <button className="textlink" onClick={() => act.go('camera')}>Scan a shelf tag</button>
            </div>
          </>
        )}
        {os.one && items > 0 && (
          <Sec eyebrow="Cheapest one-stop" link="Stores" to="stores" thin>
            <div className="hrow">
              <div className="l">
                <div className="n" style={{ font: '600 17px var(--serif)' }}>{os.one.s.name} · {money(os.one.t)}</div>
                <div className="s">{os.one.s.km} km · everything on your list in one trip{os.current > os.one.t ? `, ${money(os.current - os.one.t)} less than your current split` : ''}</div>
              </div>
            </div>
            <div style={{ padding: '8px 0 4px' }}>
              <button className="btn secondary sm" onClick={() => act.moveAll(os.one!.s.id)}>Move list to {os.one.s.name}</button>
            </div>
          </Sec>
        )}
        {storeIds.map((sid) => {
          const st = STORE(sid);
          const sub = groups[sid].reduce((a, i) => a + (BOOK[i.key] ? unitPrice(i.key, sid as ListItem['sid']) * i.n : 0), 0);
          return (
            <div key={sid}>
              <div className="storehead">
                <div>
                  <span className="sn">{st ? st.name : 'Anywhere'}</span>
                  <span className="sk">{st ? `${st.km} km` : ''}{st && st.pm ? ' · price matches' : ''}</span>
                </div>
                <span className="st">{money(sub)}</span>
              </div>
              {groups[sid].map((i) => {
                const b = BOOK[i.key];
                const m = b && pm.find((x) => x.item === i);
                const mStore = m ? STORE(m.best.sid) : undefined;
                return (
                  <div key={i.key + i.sid} className={`hrow${i.done ? ' done' : ''}`}>
                    <button className="ckb" onClick={() => act.toggleDone(i.key, i.sid)} aria-label="Done" aria-pressed={i.done}><I.check /></button>
                    <div className="l">
                      <div className="n">{b ? b.n : i.name || i.key}</div>
                      <div className="s">
                        {m && mStore ? (
                          <button className="textlink" onClick={() => act.go('till')}>Price match · {money(m.best.price)} at {mStore.name}</button>
                        ) : b && SALE_KEYS.includes(i.key) && b.sid === sid ? (
                          <span style={{ color: 'var(--acc)', fontWeight: 600 }}>On sale</span>
                        ) : b ? (b.size || '') : 'no price yet'}
                      </div>
                    </div>
                    <button className="qty" onClick={() => act.qtyUp(i.key, i.sid)} aria-label="Increase quantity">{i.n} ×</button>
                    <div className="r"><span className="price">{b ? money(unitPrice(i.key, i.sid) * i.n) : '—'}</span></div>
                    <button className="iconbtn" onClick={() => act.removeItem(i.key, i.sid)} aria-label="Remove" style={{ width: 32, height: 32, color: 'var(--faint)', marginRight: -8 }}><I.x /></button>
                  </div>
                );
              })}
            </div>
          );
        })}
        <Sec eyebrow="Send your list to" thin>
          <div className="sendgrid">
            {SEND.map((x) => <a key={x.name} className="btn ghost" href={x.url} target="_blank" rel="noopener noreferrer">{x.name}</a>)}
          </div>
        </Sec>
        <div style={{ display: 'grid', gap: 10, marginTop: 18 }}>
          <button className="btn secondary" onClick={() => act.toast('Shared household lists arrive with Plateful Plus')}><I.share /> Share with household</button>
        </div>
      </Pad>
      <Foot>Prices are this week’s flyer prices or the store’s regular shelf price where no ad exists.</Foot>
      <Spacer />
    </>
  );
}
