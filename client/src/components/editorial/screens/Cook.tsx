// Cook mode: one step at a time in large type, the amounts that step needs, a timer read out of the wording,
// the screen kept awake, and "I cooked this" at the end so the cook level moves.
import { useEffect, useRef, useState } from 'react';
import { useApp } from '@/hooks/usePlateful';
import { LEVEL, R, clock, nameFor, plural, scaleIngredients, stepIngredients, stepTimers, timerLabel } from '@/lib/editorial';
import { Pad } from '../Bits';
import { I } from '../Icons';

/** Keeps the screen on while the component is mounted (Chrome, Edge, Safari 16.4+); silently does nothing elsewhere. */
function useWakeLock() {
  useEffect(() => {
    let lock: { release: () => Promise<void> } | null = null;
    const nav = navigator as Navigator & { wakeLock?: { request: (t: 'screen') => Promise<{ release: () => Promise<void> }> } };
    const grab = async () => { try { lock = (await nav.wakeLock?.request('screen')) ?? null; } catch { lock = null; } };
    const onVis = () => { if (document.visibilityState === 'visible') void grab(); };
    void grab();
    document.addEventListener('visibilitychange', onVis);
    return () => { document.removeEventListener('visibilitychange', onVis); void lock?.release(); };
  }, []);
}

/** A short chime without an audio file. */
function chime() {
  try {
    const Ctx = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ac = new Ctx();
    [0, 0.35, 0.7].forEach((t) => {
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = 'sine'; o.frequency.value = 880;
      g.gain.setValueAtTime(0.0001, ac.currentTime + t);
      g.gain.exponentialRampToValueAtTime(0.25, ac.currentTime + t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + t + 0.3);
      o.connect(g).connect(ac.destination); o.start(ac.currentTime + t); o.stop(ac.currentTime + t + 0.32);
    });
    navigator.vibrate?.([200, 100, 200]);
  } catch { /* no audio: the banner still shows */ }
}

function Timer({ recipe }: { recipe: number }) {
  const { s, act } = useApp();
  const t = s.timer;
  const [now, setNow] = useState(Date.now());
  const rang = useRef(false);
  useEffect(() => {
    if (!t) return;
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, [t]);
  useEffect(() => { rang.current = false; }, [t?.end]);
  if (!t || t.recipe !== recipe) return null;
  const left = Math.ceil((t.end - now) / 1000);
  const done = left <= 0;
  if (done && !rang.current) { rang.current = true; chime(); }
  const pct = Math.max(0, Math.min(100, (1 - left / t.secs) * 100));
  return (
    <div className={`timer${done ? ' done' : ''}`} role="timer" aria-live={done ? 'assertive' : 'off'}>
      <div className="t-top">
        <span className="eyebrow">{done ? 'Time’s up' : `${t.label} timer`}</span>
        <button className="textlink" onClick={act.timerStop}>{done ? 'Dismiss' : 'Cancel'}</button>
      </div>
      <div className="t-clock">{done ? '0:00' : clock(left)}</div>
      <div className="t-bar"><i style={{ width: `${pct}%` }} /></div>
    </div>
  );
}

export function Cook() {
  const { s, user, act } = useApp();
  useWakeLock();
  const r = s.cookId !== null ? R(s.cookId) : undefined;
  if (!r) return <Pad><p className="dek" style={{ marginTop: 20 }}>Pick a recipe first.</p><button className="btn secondary" onClick={act.back}>Back</button></Pad>;
  const i = Math.min(s.cookStep, r.steps.length - 1);
  const step = r.steps[i];
  const last = i === r.steps.length - 1;
  const serv = s.servPick[r.id] ?? user.householdSize ?? r.serv;
  const ing = scaleIngredients(r.ing, r.serv, serv);
  const here = stepIngredients(step, ing);
  const timers = stepTimers(step);
  const running = s.timer && s.timer.recipe === r.id;
  const pts = LEVEL[r.diff] || 1;
  return (
    <div className="cook">
      <div className="ck-top">
        <button className="iconbtn" onClick={act.back} aria-label="Close cook mode"><I.x /></button>
        <div className="ck-title">
          <div className="eyebrow">Step {i + 1} of {r.steps.length}</div>
          <div className="meta">{r.name} · serves {serv}</div>
        </div>
        <span style={{ width: 40 }} />
      </div>
      <div className="ck-prog" aria-hidden="true">{r.steps.map((_, k) => <i key={k} className={k < i ? 'done' : k === i ? 'now' : ''} />)}</div>
      <div className="ck-body">
        <p className="ck-step">{step}</p>
        {here.length > 0 && (
          <div className="ck-ing">
            <div className="eyebrow mut">In this step</div>
            {here.map(([k, a]) => <div key={k} className="row"><span className="amt">{a}</span><span className="n">{nameFor(k)}</span></div>)}
          </div>
        )}
        <Timer recipe={r.id} />
        {!running && timers.length > 0 && (
          <div className="ck-timers">
            {timers.map((t) => (
              <button key={t.secs} className="btn secondary sm" onClick={() => act.timerStart(t.secs, timerLabel(t.secs), r.id)}><I.timer /> Start {t.label} timer</button>
            ))}
          </div>
        )}
      </div>
      <div className="ck-nav">
        <button className="btn ghost" onClick={() => act.cookStep(i - 1)} disabled={i === 0}><I.chevL /> Back</button>
        {last ? (
          <button className="btn primary" onClick={() => act.cookFinish(r.id)}><I.check /> I cooked this · +{plural(pts, 'point')}</button>
        ) : (
          <button className="btn primary" onClick={() => act.cookStep(i + 1)}>Next <I.chevR /></button>
        )}
      </div>
      <div className="meta" style={{ textAlign: 'center', fontSize: 12, paddingBottom: 8 }}>The screen stays on while you cook.</div>
    </div>
  );
}
