// First run: the landing photo (page 0), then four full-bleed hero pages, then onboarding.
// Tap the right half or swipe left to advance, left half or swipe right to go back; Skip on every page.
import { useRef, useState } from 'react';
import { useApp } from '@/hooks/usePlateful';
import { LANDING_IMG, WELCOME_PAGES } from '@/lib/editorial/welcome';

export function Welcome() {
  const { act } = useApp();
  const [page, setPage] = useState(0); // 0 = landing, 1..4 = hero pages
  const x0 = useRef<number | null>(null);
  const last = WELCOME_PAGES.length;
  const next = () => (page >= last ? act.go('onboarding') : setPage(page + 1));
  const prev = () => setPage(Math.max(0, page - 1));

  const onTouchStart = (e: React.TouchEvent) => { x0.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (x0.current === null) return;
    const dx = e.changedTouches[0].clientX - x0.current;
    x0.current = null;
    if (dx < -40) next();
    else if (dx > 40) prev();
  };

  const p = page > 0 ? WELCOME_PAGES[page - 1] : null;

  return (
    <div className="welcome" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <img src={LANDING_IMG} alt="" className={page === 0 ? 'show' : ''} />
      {WELCOME_PAGES.map((w, i) => <img key={w.img} src={w.img} alt="" className={page === i + 1 ? 'show' : ''} loading={i === 0 ? 'eager' : 'lazy'} />)}
      <div className="scrim" />
      {page > 0 && <button className="skip" onClick={() => act.go('onboarding')}>Skip</button>}
      {page > 0 && (
        <>
          <button className="tapzone l" aria-label="Back" onClick={prev} />
          <button className="tapzone r" aria-label="Next" onClick={next} />
        </>
      )}

      {page === 0 ? (
        <div className="body">
          <div className="wm">Plateful</div>
          <div className="tag">From cart to cuisine</div>
          <p className="dek">This week’s Calgary flyers, your fridge, and a table worth sitting down to.</p>
          <button className="btn primary" onClick={() => setPage(1)}>Get started</button>
          <button className="back" onClick={act.skipSplash}>I already have an account</button>
        </div>
      ) : p && (
        <div className="body" key={page}>
          <div className="eyebrow">{page === 1 ? 'Before we start · ' : ''}{page} of {last}</div>
          <h1>{p.title}</h1>
          <p className="dek">{p.dek}</p>
          {page < last ? (
            <div className="pips" aria-hidden="true">{WELCOME_PAGES.map((w, i) => <i key={w.img} className={i + 1 === page ? 'on' : ''} />)}</div>
          ) : (
            <button className="btn primary" onClick={() => act.go('onboarding')}>Set up my kitchen</button>
          )}
        </div>
      )}
    </div>
  );
}
