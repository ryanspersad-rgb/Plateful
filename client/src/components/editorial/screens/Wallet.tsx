// Loyalty cards: a number typed once, drawn as a barcode at the till. Kept on this phone; never linked to the program's account.
import { useEffect, useRef, useState } from 'react';
import JsBarcode from 'jsbarcode';
import { useApp } from '@/hooks/usePlateful';
import type { LoyaltyCard } from '@/lib/types';
import { PROGRAM, PROGRAMS, STORE, cardName, cleanNumber, groupNumber, maskNumber, numberError, numberWarning } from '@/lib/editorial';
import { BackBtn, Chev, Foot, Pad, Sec, Spacer, Title, Topbar } from '../Bits';
import { I } from '../Icons';

/** Code 128 is what grocery scanners read for loyalty cards; the number is printed under it for a cashier to key in. */
export function Barcode({ value, height = 110 }: { value: string; height?: number }) {
  const ref = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    if (!ref.current || !value) return;
    try {
      JsBarcode(ref.current, value, { format: 'CODE128', displayValue: false, margin: 0, height, width: 2, background: '#FFFFFF', lineColor: '#1A1511' });
    } catch {
      /* an unencodable value leaves the frame empty; the number below still shows */
    }
  }, [value, height]);
  return <svg ref={ref} className="barcode" role="img" aria-label={`Barcode for card ${maskNumber(value)}`} />;
}

function AddForm() {
  const { s, act } = useApp();
  const program = s.walletAdd;
  if (!program) return null;
  const p = PROGRAM(program);
  const n = cleanNumber(s.walletNum);
  const err = numberError(n);
  const warn = numberWarning(program, n);
  return (
    <div className="cardform">
      <div className="n">{p.name}</div>
      <div className="s">{p.hint}</div>
      {program === 'other' && (
        <input className="field" type="text" placeholder="Store or program name" value={s.walletLabel} autoComplete="off" aria-label="Store name" onChange={(e) => act.patch({ walletLabel: e.target.value })} />
      )}
      <input
        className="field num" type="text" inputMode="numeric" autoComplete="off" autoFocus placeholder="Card number" aria-label="Card number"
        value={groupNumber(n)} onChange={(e) => act.patch({ walletNum: cleanNumber(e.target.value) })}
        onKeyDown={(e) => { if (e.key === 'Enter' && !err) act.cardSave(); }}
      />
      {n && <div className="preview"><Barcode value={n} height={64} /></div>}
      {(warn || (n && err)) && <div className="meta" style={{ marginTop: 8 }}>{warn || err}</div>}
      <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
        <button className="btn primary sm" disabled={!!err} onClick={act.cardSave}>Save card</button>
        <button className="btn ghost sm" onClick={() => act.walletOpen(null)}>Cancel</button>
      </div>
    </div>
  );
}

function CardRow({ c }: { c: LoyaltyCard }) {
  const { act } = useApp();
  const p = PROGRAM(c.program);
  const where = p.stores.map((sid) => STORE(sid)?.retailer).filter(Boolean).join(', ') || p.also;
  return (
    <button className="hrow" onClick={() => act.cardShow(c.id)}>
      <div className="l">
        <div className="n">{cardName(c)}</div>
        <div className="s">{maskNumber(c.number)} · {where}</div>
      </div>
      <span className="meta" style={{ fontWeight: 600, color: 'var(--acc)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>Show <Chev /></span>
    </button>
  );
}

export function Wallet() {
  const { s, user, act } = useApp();
  const cards = user.cards || [];
  const have = new Set(cards.map((c) => c.program));
  const toAdd = PROGRAMS.filter((p) => p.id === 'other' || !have.has(p.id));
  return (
    <>
      <Topbar left={<><BackBtn /><Title title="Loyalty cards" meta={cards.length ? `${cards.length} on this phone · tap one to show it at the till` : 'Kept on this phone · shown as a barcode at the till'} /></>} />
      <Pad>
        {cards.length > 0 && (
          <Sec eyebrow="Your cards" thin>
            {cards.map((c) => <CardRow key={c.id} c={c} />)}
          </Sec>
        )}
        <Sec eyebrow={cards.length ? 'Add another' : 'Add a card'} thin>
          {s.walletAdd ? (
            <AddForm />
          ) : (
            toAdd.map((p) => (
              <button key={p.id} className="hrow" onClick={() => act.walletOpen(p.id)}>
                <div className="l"><div className="n">{p.name}</div><div className="s">{p.also}</div></div>
                <I.plus />
              </button>
            ))
          )}
        </Sec>
        <div className="dek" style={{ marginTop: 22 }}>
          Plateful keeps the number on this phone and draws the barcode. It never signs in to the program, so it cannot see your points or your purchases — the cashier scans the code exactly as they would the plastic card, and the points land in your account as usual.
        </div>
      </Pad>
      <Foot>Retailers that join Plateful can attach their points offers to this week’s deals; you would see the offer, scan your card and collect as normal.</Foot>
      <Spacer />
    </>
  );
}

/** Full-screen card for the cashier: white ground, the barcode as wide as the phone, the number in groups of four. */
export function Card() {
  const { s, user, act } = useApp();
  const [sure, setSure] = useState(false);
  const c = (user.cards || []).find((x) => x.id === s.cardId);
  if (!c) return <Pad><p className="dek" style={{ marginTop: 20 }}>That card is no longer on this phone.</p><button className="btn secondary" onClick={act.back}>Back</button></Pad>;
  const p = PROGRAM(c.program);
  return (
    <div className="cardsheet">
      <div className="cs-top">
        <button className="iconbtn" onClick={act.back} aria-label="Close"><I.x /></button>
        <span className="eyebrow">{cardName(c)}</span>
        <span style={{ width: 40 }} />
      </div>
      <div className="cs-body">
        <Barcode value={c.number} height={150} />
        <div className="cs-num">{groupNumber(c.number)}</div>
        <div className="meta" style={{ textAlign: 'center' }}>{p.stores.length ? `Scan at ${p.stores.map((sid) => STORE(sid)?.name).filter(Boolean).join(', ')}` : p.also}</div>
      </div>
      <div className="cs-foot">
        <div className="meta">Turn the brightness up if the scanner struggles. The cashier can also key in the number.</div>
        <button className="btn primary" onClick={act.back}>Done</button>
        {sure ? (
          <button className="btn ghost" style={{ color: 'var(--acc)' }} onClick={() => act.cardRemove(c.id)}>Tap again to remove this card from this phone</button>
        ) : (
          <button className="textlink" style={{ color: 'var(--mute)' }} onClick={() => setSure(true)}>Remove this card</button>
        )}
      </div>
    </div>
  );
}
