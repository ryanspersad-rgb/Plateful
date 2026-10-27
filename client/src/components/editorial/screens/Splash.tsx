import { useEffect } from 'react';
import { useApp } from '@/hooks/usePlateful';
import { CartMark } from '../Icons';

export function Splash() {
  const { s, act } = useApp();
  useEffect(() => {
    // returning shoppers go straight home; first run gets the landing photo and the four hero pages
    // the Welcome pages show once: first run, and once for shoppers whose profile predates them
    const t = window.setTimeout(() => act.go(s.user?.welcomeSeen ? 'home' : 'welcome'), 2200);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="splash">
      <button className="skip" onClick={() => (s.user?.welcomeSeen ? act.skipSplash() : act.go('welcome'))}>Skip</button>
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
