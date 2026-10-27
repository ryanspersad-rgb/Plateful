import { useApp } from '@/hooks/usePlateful';
import type { Store } from '@/lib/types';
import { STORES, dealsAt, money, oneStop } from '@/lib/editorial';
import { Chev, Foot, Pad, Sec, Spacer, Title, Topbar } from '../Bits';
import { I } from '../Icons';

/** Schematic map: home at the centre, stores placed by bearing and distance, dashed home radius. A real map arrives with live store data. */
type Box = { l: number; t: number; r: number; b: number };
const hits = (a: Box, b: Box) => a.l < b.r && b.l < a.r && a.t < b.b && b.t < a.b;

function MapSVG({ radiusKm, postal }: { radiusKm: number; postal: string }) {
  const W = 346, H = 220, cx = 173, cy = 118, scale = 16;
  const CH = 5.6, LH = 10; // approximate glyph width and line height of the 10 px label
  type Opt = { tx: number; ty: number; anchor: 'start' | 'end'; box: Box };
  const slots = (x: number, y: number, w: number): Opt[] => [
    { tx: 9, ty: -8, anchor: 'start', box: { l: x + 9, t: y - 8 - LH, r: x + 9 + w, b: y - 8 } }, // right of the pin
    { tx: -9, ty: -8, anchor: 'end', box: { l: x - 9 - w, t: y - 8 - LH, r: x - 9, b: y - 8 } }, // left
    { tx: 9, ty: 12, anchor: 'start', box: { l: x + 9, t: y + 2, r: x + 9 + w, b: y + 12 } }, // below right
    { tx: -9, ty: 12, anchor: 'end', box: { l: x - 9 - w, t: y + 2, r: x - 9, b: y + 12 } }, // below left
    { tx: 9, ty: -20, anchor: 'start', box: { l: x + 9, t: y - 20 - LH, r: x + 9 + w, b: y - 20 } }, // above right
  ];
  const free = (o: Opt, taken: Box[]) => o.box.l >= 2 && o.box.r <= W - 2 && o.box.t >= 2 && o.box.b <= H - 2 && !taken.some((t) => hits(o.box, t));
  // Every pin and the home dot are registered first, so no label lands on one; nearest stores choose their slot first.
  const spots = STORES.map((s) => {
    const a = (s.ang * Math.PI) / 180, d = Math.min(s.km, 6.2) * scale;
    return { s, x: cx + Math.cos(a) * d, y: cy + Math.sin(a) * d };
  });
  const taken: Box[] = [{ l: cx - 6, t: cy - 6, r: cx + 6, b: cy + 6 }, ...spots.map(({ x, y }) => ({ l: x - 6, t: y - 17, r: x + 6, b: y }))];
  const placed = [...spots].sort((a, b) => a.s.km - b.s.km).map(({ s, x, y }) => {
    const options = slots(x, y, s.name.length * CH);
    const pick = options.find((o) => free(o, taken)) || options[0];
    taken.push(pick.box);
    return { s, x, y, pick };
  });
  const homeOpts = slots(cx, cy + 12, `Home · ${postal}`.length * CH);
  const home = homeOpts.find((o) => free(o, taken)) || homeOpts[0];
  const pin = ({ s, x, y, pick }: (typeof placed)[number]) => (
    <g key={s.id} transform={`translate(${x.toFixed(1)},${y.toFixed(1)})`} opacity={s.km <= radiusKm ? 1 : 0.45}>
      <path d="M0 0c-4-5-6-8-6-11a6 6 0 0 1 12 0c0 3-2 6-6 11z" fill="#1A1511" />
      <circle cx="0" cy="-11" r="2" fill="#fff" />
      <text x={pick.tx} y={pick.ty} textAnchor={pick.anchor} fill="#1A1511">{s.name}</text>
    </g>
  );
  return (
    <svg className="map" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Map of stores within your radius">
      <rect width={W} height={H} fill="#FAF8F5" />
      {[40, 80, 120, 160, 200].map((y) => <path key={'h' + y} d={`M0 ${y}H${W}`} stroke="#E8E2DA" strokeWidth={1} />)}
      {[60, 120, 180, 240, 300].map((x) => <path key={'v' + x} d={`M${x} 0V${H}`} stroke="#E8E2DA" strokeWidth={1} />)}
      <circle cx={cx} cy={cy} r={radiusKm * scale} fill="none" stroke="#B4552E" strokeWidth={1} strokeDasharray="3 3" />
      {placed.map(pin)}
      <circle cx={cx} cy={cy} r={5} fill="#B4552E" />
      <text x={cx + home.tx} y={cy + 12 + home.ty} textAnchor={home.anchor} fill="#B4552E">Home · {postal}</text>
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
