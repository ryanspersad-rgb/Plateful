import { useApp } from '@/hooks/usePlateful';
import { allRecipes, FLYER_WEEK, money, productImg, statusText, timeText } from '@/lib/editorial';
import { SRow } from '../Bits';
import { I } from '../Icons';

/** Camera check. The scan is simulated until on-device OCR and the product lookup ship (roadmap 9). */
export function Camera() {
  const { s, ctx, act } = useApp();
  const stage = s.cam;
  const uses = allRecipes().filter((r) => r.ing.some((i) => i[0] === 'cheddar')).slice(0, 3);
  const img = productImg('cheddar');
  return (
    <div className="cam">
      <div className="ctitle">
        <button className="iconbtn" onClick={act.back} aria-label="Close" style={{ color: '#fff', marginLeft: -10 }}><I.x /></button>
        <span className="t">Camera check</span>
        <span style={{ width: 40 }} />
      </div>
      <div className="vf">
        <span className="corner c1" /><span className="corner c2" /><span className="corner c3" /><span className="corner c4" />
        {stage === 0 && (
          <div className="hint">
            Point at a product or shelf tag<br />
            <span style={{ fontSize: 12, opacity: 0.7 }}>Prices nearby, who will match them, and recipes that use it</span><br />
            <span style={{ fontSize: 12, opacity: 0.7 }}>You’re at Superstore · Shaganappi</span><br />
            <span className="preview">Preview · the camera reading and prices are samples until live flyers arrive</span>
          </div>
        )}
        {stage === 1 && <><div className="scan" /><div className="hint">Reading the tag…</div></>}
        {stage === 2 && (
          <div className="result">
            <div className="eyebrow" style={{ color: 'var(--mute)' }}>Preview · sample prices</div>
            <div className="top">
              <div className="pph">{img && <img src={img} alt="" />}</div>
              <div><div className="card-title">Aged cheddar · 400 g</div><div className="meta">{money(7.49)} here · Superstore</div></div>
            </div>
            <div>
              <div className="eyebrow acc">Lowest nearby</div>
              <div className="price" style={{ fontSize: 20, marginTop: 4 }}>{money(4.99)} <span className="meta">· Co-op Midtown · 1.4&nbsp;km · flyer {FLYER_WEEK}</span></div>
              <div className="meta" style={{ marginTop: 4 }}>Superstore will match it: identical item, current local flyer. Save {money(2.5)}.</div>
            </div>
            <div style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr' }}>
              <button className="btn primary sm" style={{ width: '100%' }} onClick={act.pmHere}>Price match here</button>
              <button className="btn ghost sm" style={{ width: '100%' }} onClick={act.camAdd}>Add to list</button>
            </div>
            <div>
              <div className="eyebrow mut" style={{ fontSize: 10 }}>Recipes that use it</div>
              {uses.map((r) => (
                <SRow key={r.id} img={r.img} t={r.name} m={`${statusText(r, ctx, true)} · ${timeText(r.time)}`} onClick={() => act.detail(r.id)} style={{ padding: '8px 0' }} />
              ))}
            </div>
          </div>
        )}
      </div>
      {stage === 2 ? (
        <button className="btn onink" onClick={act.camReset}>Check another item</button>
      ) : (
        <button className="shutter" onClick={act.shutter} aria-label="Take photo" disabled={stage === 1} />
      )}
      <div className="quota">2 of 3 free checks used today · <a href="#plus" onClick={(e) => { e.preventDefault(); act.go('profile'); }}>Unlimited with Plus</a></div>
    </div>
  );
}
