import { useEffect } from 'react';
import { useApp } from '@/hooks/usePlateful';
import { CartMark } from '../Icons';

export function Splash() {
  const { s, act } = useApp();
  useEffect(() => {
    const t = window.setTimeout(() => act.go(s.user ? 'home' : 'onboarding'), 2200);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="splash">
      <button className="skip" onClick={act.skipSplash}>Skip</button>
      <div className="mark"><CartMark size={76} /></div>
      <div>
        <h1 className="wm">Plateful</h1>
        <div className="tag">From cart to cuisine</div>
      </div>
      <div className="prog"><i /></div>
      <div className="ld">Loading this week’s Calgary flyers</div>
    </div>
  );
}
