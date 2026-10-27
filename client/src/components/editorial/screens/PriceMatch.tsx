import { useApp } from '@/hooks/usePlateful';
import { ADS, BOOK, FLYER_WEEK, PM_POLICY, STORE, money, pmItems, pmPlan, unitPrice } from '@/lib/editorial';
import { BackBtn, Pad, Sec, Spacer, Title, Topbar } from '../Bits';
import { I } from '../Icons';

export function PriceMatch() {
  const { s, act } = useApp();
  const rows = s.list.filter((i) => ADS[i.key]);
  const pm = pmItems(s.list);
  const save = pm.reduce((a, x) => a + x.save, 0);
  const plans = pmPlan(s.list);
  return (
    <>
      <Topbar left={<><BackBtn /><Title title="Price match" meta={`Competitor ads for items on your list · ${FLYER_WEEK}`} /></>} />
      <Pad>
        {pm.length > 0 && (
          <button className="banner" onClick={() => act.go('till')}>
            <div>
              <div className="b1">{pm.length} items can be matched · save {money(save)}</div>
              <div className="b2">Open the cashier view with every ad ready</div>
            </div>
            <I.chevR />
          </button>
        )}
        <Sec eyebrow="Where to price match" title="Stores ranked by what they’ll match" dek="Your whole list, with every valid ad applied, at each store that honours competitor flyers." thin>
          {plans.map((p, i) => (
            <div key={p.s.id} className="hrow">
              <div className="l">
                <div className="n"><span style={{ color: 'var(--acc)', fontWeight: 700, marginRight: 8 }}>{i + 1}</span>{p.s.name} · <span className="price">{money(p.total)}</span></div>
                <div className="s">{p.matches.length} of {s.list.length} items matched · save {money(p.saved)} · {p.s.km} km</div>
                <div className="s" style={{ fontSize: 12, marginTop: 2 }}>{p.rule.short}</div>
              </div>
            </div>
          ))}
          <div className="meta" style={{ padding: '10px 0 2px', fontSize: 12 }}>Safeway, Co-op and No Frills do not price match; their ads are what you show elsewhere.</div>
        </Sec>
        {rows.map((i) => {
          const b = BOOK[i.key];
          const st = STORE(i.sid);
          if (!b || !st) return null;
          const here = unitPrice(i.key, i.sid);
          const ads = ADS[i.key].slice().sort((a, c) => a.price - c.price);
          return (
            <Sec key={i.key + i.sid} eyebrow={b.n} thin>
              <div className="meta" style={{ marginTop: 8 }}>You’re buying at <b>{st.name}</b> · {money(here)}{b.u || ''}{st.pm ? '' : ' · this store does not price match'}</div>
              {ads.map((a, idx) => {
                const as = STORE(a.sid);
                if (!as) return null;
                const cheaper = a.price < here;
                return (
                  <div key={a.sid} className="hrow">
                    <div className="l">
                      <div className="n">{as.name} · <span className="price">{money(a.price)}{b.u || ''}</span></div>
                      <div className="s">Flyer {FLYER_WEEK} · {as.km}&nbsp;km · <a className="textlink" href={as.flyer} target="_blank" rel="noopener noreferrer">{'See\u00A0the\u00A0flyer\u00A0↗'}</a></div>
                    </div>
                    <div className="r">{cheaper ? <span className="acc">{idx === 0 ? 'Lowest · ' : ''}Save {money((here - a.price) * i.n)}</span> : <span className="mut">Not lower</span>}</div>
                  </div>
                );
              })}
              <div className="meta" style={{ padding: '10px 0 2px', fontSize: 12 }}>{PM_POLICY[i.sid]}</div>
            </Sec>
          );
        })}
        <div style={{ display: 'grid', gap: 10, marginTop: 26 }}>
          <button className="btn primary" onClick={() => act.go('till')}><I.flyer /> Show all at the till</button>
          <button className="btn secondary" onClick={() => act.go('camera')}><I.camera /> Check a shelf tag with the camera</button>
        </div>
      </Pad>
      <Spacer />
    </>
  );
}
