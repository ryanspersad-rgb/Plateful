import { useApp } from '@/hooks/usePlateful';
import { BOOK, FLYER_WEEK, SALE_KEYS, STORES, pct } from '@/lib/editorial';
import { Foot, Pad, Spacer, Tile, Title, Topbar } from '../Bits';

const CATS = ['All', 'Meat', 'Produce', 'Dairy', 'Pantry', 'Bakery'];
const STORE_TABS = ['All', 'Superstore', 'Safeway', 'Co-op', 'No Frills', 'Walmart'];

export function OnSale() {
  const { s, user, act } = useApp();
  const keys = SALE_KEYS.filter(
    (k) => (s.onsaleCat === 'All' || BOOK[k].cat === s.onsaleCat) && (s.onsaleStore === 'All' || BOOK[k].r === s.onsaleStore),
  ).sort((a, b) => pct(b) - pct(a));
  const near = STORES.filter((st) => st.km <= user.radiusKm).length;
  return (
    <>
      <Topbar
        left={
          <Title
            title="On sale this week"
            meta={<>{SALE_KEYS.length} deals · {FLYER_WEEK} · <b>ends Thursday</b> · {near} stores near {user.postalPrefix}{s.saleSel.length ? <> · <b>{s.saleSel.length} saved</b></> : null}</>}
          />
        }
      />
      <Pad>
        <nav className="ttabs" aria-label="Category">
          {CATS.map((c) => <button key={c} className={`ttab${s.onsaleCat === c ? ' on' : ''}`} onClick={() => act.patch({ onsaleCat: c })}>{c}</button>)}
        </nav>
        <nav className="ttabs small" aria-label="Store">
          {STORE_TABS.map((c) => <button key={c} className={`ttab${s.onsaleStore === c ? ' on' : ''}`} onClick={() => act.patch({ onsaleStore: c })}>{c}</button>)}
        </nav>
        <div className="tilegrid">
          {keys.length ? keys.map((k) => <Tile key={k} k={k} grid />) : <div className="meta">Nothing in this category at that store this week.</div>}
        </div>
      </Pad>
      <Foot>Save a deal with the bookmark to see recipes that use it. Supplier photos come from the grocer portal; Canadian-made items carry a maple leaf.</Foot>
      <Spacer />
    </>
  );
}
