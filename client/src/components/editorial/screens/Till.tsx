import { useApp } from '@/hooks/usePlateful';
import type { TillMatch, TillPlan } from '@/lib/types';
import { ADS, BOOK, FLYER_WEEK, STORE, cardFor, maskNumber, money, pmPlan, productImg, programFor } from '@/lib/editorial';
import { BackBtn, Chev, Pad, Sec, Spacer, Title, Topbar } from '../Bits';
import { I } from '../Icons';

function AdCard({ m, plan }: { m: TillMatch; plan: TillPlan }) {
  const { s, act } = useApp();
  const b = BOOK[m.item.key];
  const on = !!s.matched[m.item.key];
  const ads = (ADS[m.item.key] || []).filter((a) => a.sid !== plan.s.id && a.price < m.here).sort((a, c) => a.price - c.price);
  const img = productImg(m.item.key);
  const onFile = (file: File | undefined) => {
    if (!file) return;
    const rd = new FileReader();
    rd.onload = () => act.attachClip(m.item.key, { src: String(rd.result), name: file.name.replace(/\.[a-z]+$/i, '') });
    rd.readAsDataURL(file);
  };
  return (
    <div className={`tillitem${on ? ' on' : ''}`}>
      <div className="ti-head">
        <div>
          <div className="n">{b.n}</div>
          <div className="s">
            {m.item.n} × {b.size || 'item'} · here <b>{money(m.here)}{b.u || ''}</b> · lowest ad <b style={{ color: 'var(--acc)' }}>{money(m.ad.price)}{b.u || ''}</b> · save {money(m.save)}
          </div>
        </div>
        <button className={`ckb${on ? ' on' : ''}`} onClick={() => act.tillTick(m.item.key)} aria-label="Matched" aria-pressed={on}><I.check /></button>
      </div>
      <div className="clips">
        {ads.map((a) => {
          const st = STORE(a.sid);
          if (!st) return null;
          return (
            <div key={a.sid} className="ad">
              <div className="ad-store">{st.retailer} · auto-clipped</div>
              <div className="ad-body">
                {img && <img src={img} alt="" />}
                <div><div className="ad-name">{b.n}</div><div className="ad-size">{b.size || ''}</div></div>
                <div className="ad-price">{money(a.price)}<span>{b.u || ''}</span></div>
              </div>
              <div className="ad-foot">Flyer valid {FLYER_WEEK} · {st.name}, {st.km}&nbsp;km</div>
            </div>
          );
        })}
        {(s.clips[m.item.key] || []).map((c, ci) => (
          <div key={ci} className="shot">
            <img src={c.src} alt="Your flyer screenshot" />
            <div className="ad-foot">Your screenshot · {c.name}</div>
          </div>
        ))}
      </div>
      <label className="attach">
        <I.camera /> Attach a flyer screenshot
        <input type="file" accept="image/*" onChange={(e) => { onFile(e.target.files?.[0]); e.target.value = ''; }} />
      </label>
    </div>
  );
}

export function Till() {
  const { s, user, act } = useApp();
  const plans = pmPlan(s.list);
  const plan = plans.find((p) => p.s.id === s.tillStore) || plans[0];
  if (!plan) {
    return (
      <>
        <Topbar left={<><BackBtn /><h1 className="screen-title">At the till</h1></>} />
        <Pad><p className="dek" style={{ marginTop: 20 }}>Add items to your list first.</p></Pad>
      </>
    );
  }
  const done = plan.matches.filter((m) => s.matched[m.item.key]).length;
  const prog = programFor(plan.s.id);
  const card = cardFor(user, plan.s.id);
  const adStores = new Set(plan.matches.flatMap((m) => (ADS[m.item.key] || []).filter((a) => a.sid !== plan.s.id && a.price < m.here).map((a) => a.sid)));
  return (
    <>
      <Topbar left={<><BackBtn /><Title title="At the till" meta={`Show these to the cashier · ${plan.matches.length} items · ads from ${adStores.size} stores`} /></>} />
      <Pad>
        <div className="eyebrow mut" style={{ marginTop: 4 }}>You’re at</div>
        <nav className="ttabs" aria-label="Store">
          {plans.map((p) => <button key={p.s.id} className={`ttab${p.s.id === plan.s.id ? ' on' : ''}`} onClick={() => act.tillStore(p.s.id)}>{p.s.name}</button>)}
        </nav>
        <div className="meta" style={{ marginTop: 2 }}>{plan.rule.long}</div>
        {prog && (card ? (
          <button className="hrow" onClick={() => act.cardShow(card.id)}>
            <div className="l"><div className="n"><I.barcode /> Scan your {prog.name} card</div><div className="s">{maskNumber(card.number)} · tap for the barcode</div></div>
            <Chev />
          </button>
        ) : (
          <button className="hrow" onClick={() => act.go('wallet')}>
            <div className="l"><div className="n"><I.barcode /> Add your {prog.name} card</div><div className="s">Show it here at the till, stored on this phone only</div></div>
            <Chev />
          </button>
        ))}
        <div className="twocol">
          <div><div className="lab">You save here</div><div className="big acc">{money(plan.saved)}</div><div className="sub">{plan.matches.length} items matched · {done} applied</div></div>
          <div><div className="lab">List total</div><div className="big">{money(plan.total)}</div><div className="sub">with every match applied</div></div>
        </div>
        {plans.length > 1 && (
          <Sec eyebrow="Ranked by what they’ll match" thin>
            {plans.map((p, i) => (
              <div key={p.s.id} className="hrow">
                <div className="l">
                  <div className="n"><span style={{ color: 'var(--acc)', fontWeight: 700, marginRight: 8 }}>{i + 1}</span>{p.s.name} · {money(p.total)}</div>
                  <div className="s">{p.matches.length} items · save {money(p.saved)} · {p.rule.short}</div>
                </div>
              </div>
            ))}
          </Sec>
        )}
        <Sec eyebrow={`Ads to show · ${plan.matches.length}`} thin>
          {plan.matches.length ? plan.matches.map((m) => <AdCard key={m.item.key} m={m} plan={plan} />) : <p className="dek" style={{ marginTop: 12 }}>No competitor ad beats this store’s prices on your list this week.</p>}
        </Sec>
        <div style={{ display: 'grid', gap: 10, marginTop: 24 }}>
          <button className="btn primary" onClick={() => act.tillDone(plan.saved)}><I.check /> Done · saved {money(plan.saved)}</button>
          <button className="btn secondary" onClick={() => act.go('camera')}><I.camera /> Scan something else on the shelf</button>
        </div>
        <div className="meta" style={{ marginTop: 14, fontSize: 12, textAlign: 'center' }}>The screen stays on while this page is open.</div>
      </Pad>
      <Spacer />
    </>
  );
}
