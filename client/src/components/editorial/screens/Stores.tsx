import { useApp } from '@/hooks/usePlateful';
import type { Store } from '@/lib/types';
import { STORES, dealsAt, money, oneStop } from '@/lib/editorial';
import { Chev, Foot, Pad, Sec, Spacer, Title, Topbar } from '../Bits';
import { I } from '../Icons';

/** Schematic map: home at the centre, stores placed by bearing and distance, dashed home radius. A real map arrives with live store data. */
function MapSVG({ radiusKm, postal }: { radiusKm: number; postal: string }) {
  const W = 346, H = 220, cx = 173, cy = 118, scale = 16;
  const pin = (s: Store) => {
    const a = (s.ang * Math.PI) / 180;
    const d = Math.min(s.km, 6.2) * scale;
    const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d;
    return (
      <g key={s.id} transform={`translate(${x.toFixed(1)},${y.toFixed(1)})`} opacity={s.km <= radiusKm ? 1 : 0.45}>
        <path d="M0 0c-4-5-6-8-6-11a6 6 0 0 1 12 0c0 3-2 6-6 11z" fill="#1A1511" />
        <circle cx="0" cy="-11" r="2" fill="#fff" />
        <text x="9" y="-8" fill="#1A1511">{s.name}</text>
      </g>
    );
  };
  return (
    <svg className="map" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Map of stores within your radius">
      <rect width={W} height={H} fill="#FAF8F5" />
      {[40, 80, 120, 160, 200].map((y) => <path key={'h' + y} d={`M0 ${y}H${W}`} stroke="#E8E2DA" strokeWidth={1} />)}
      {[60, 120, 180, 240, 300].map((x) => <path key={'v' + x} d={`M${x} 0V${H}`} stroke="#E8E2DA" strokeWidth={1} />)}
      <circle cx={cx} cy={cy} r={radiusKm * scale} fill="none" stroke="#B4552E" strokeWidth={1} strokeDasharray="3 3" />
      {STORES.map(pin)}
      <circle cx={cx} cy={cy} r={5} fill="#B4552E" />
      <text x={cx + 9} y={cy + 4} fill="#B4552E">Home · {postal}</text>
    </svg>
  );
}

export function Stores() {
  const { s, user, act } = useApp();
  const os = oneStop(s.list, user);
  const near = STORES.filter((st) => st.km <= user.radiusKm).length;
  return (
    <>
      <Topbar left={<Title title="Where to shop" meta={`${near} stores within ${user.radiusKm} km of ${user.postalPrefix}`} />} />
      <Pad>
        <Sec eyebrow="For your list" title="Cheapest trip this week">
          {os.one && (
            <div className="hrow">
              <div className="l">
                <div className="eyebrow mut" style={{ fontSize: 10 }}>One stop</div>
                <div className="n" style={{ font: '600 17px var(--serif)' }}>{os.one.s.name} · {money(os.one.t)}</div>
                <div className="s">{os.one.s.km} km · all {s.list.length} items</div>
              </div>
              <Chev />
            </div>
          )}
          {os.pair && (
            <div className="hrow">
              <div className="l">
                <div className="eyebrow mut" style={{ fontSize: 10 }}>Two stops</div>
                <div className="n" style={{ font: '600 17px var(--serif)' }}>{os.pair.a.name} + {os.pair.b.name} · {money(os.pair.t)}</div>
                <div className="s">{os.pair.a.km} km + {os.pair.b.km} km{os.one && os.one.t > os.pair.t ? ` · saves ${money(os.one.t - os.pair.t)} vs one stop` : ''}</div>
              </div>
              <Chev />
            </div>
          )}
          <MapSVG radiusKm={user.radiusKm} postal={user.postalPrefix} />
        </Sec>
        <Sec eyebrow="Stores near you" thin>
          {STORES.map((st) => (
            <div key={st.id} className="hrow">
              <div className="l">
                <div className="n">{st.name} <span className="s">· {st.area}</span></div>
                <div className="s">
                  {st.km} km · {st.km <= user.radiusKm ? `${dealsAt(st.id)} deals this week` : 'outside your radius'} · {st.pm ? <span style={{ color: 'var(--acc)', fontWeight: 600 }}>Price matches flyers</span> : 'No price match'}
                </div>
              </div>
              <a className="iconbtn" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(st.retailer + ' ' + st.area + ' Calgary')}`} target="_blank" rel="noopener noreferrer" aria-label="Open in Maps"><I.map /></a>
              <button className="iconbtn" onClick={() => act.go('onsale', { store: st.retailer })} aria-label="Flyer"><I.flyer /></button>
            </div>
          ))}
        </Sec>
      </Pad>
      <Foot>Distances are from your postal prefix, never an address.</Foot>
      <Spacer />
    </>
  );
}
