// The app frame: scrolling screen, five-tab bar, floating ink bar for saved deals, in-app toast.
import type { ReactNode } from 'react';
import { useApp } from '@/hooks/usePlateful';
import type { Screen } from '@/lib/types';
import { recommended } from '@/lib/editorial';
import { I } from './Icons';
import { Splash } from './screens/Splash';
import { Onboarding } from './screens/Onboarding';
import { Home } from './screens/Home';
import { OnSale } from './screens/OnSale';
import { Detail } from './screens/Detail';
import { List } from './screens/List';
import { PriceMatch } from './screens/PriceMatch';
import { Till } from './screens/Till';
import { Camera } from './screens/Camera';
import { Stores } from './screens/Stores';
import { Fridge } from './screens/Fridge';
import { Profile } from './screens/Profile';
import { Favourites, History, Import } from './screens/Library';
import { Plan } from './screens/Plan';
import { Card, Wallet } from './screens/Wallet';

const TABS: { id: Screen; label: string; icon: ReactNode }[] = [
  { id: 'home', label: 'Home', icon: <I.home /> },
  { id: 'onsale', label: 'On sale', icon: <I.tag /> },
  { id: 'list', label: 'List', icon: <I.list /> },
  { id: 'stores', label: 'Stores', icon: <I.pin /> },
  { id: 'profile', label: 'Profile', icon: <I.user /> },
];
const NO_TABS: Screen[] = ['splash', 'onboarding', 'camera', 'card'];
const DARK: Screen[] = ['camera'];
const PARENT: Partial<Record<Screen, Screen>> = { plan: 'list', pricematch: 'list', till: 'list', fridge: 'profile', favourites: 'profile', history: 'profile', import: 'home', wallet: 'profile', card: 'profile' };

const SCREENS: Partial<Record<Screen, () => ReactNode>> = {
  splash: () => <Splash />,
  onboarding: () => <Onboarding />,
  home: () => <Home />,
  onsale: () => <OnSale />,
  detail: () => <Detail />,
  list: () => <List />,
  pricematch: () => <PriceMatch />,
  till: () => <Till />,
  camera: () => <Camera />,
  stores: () => <Stores />,
  fridge: () => <Fridge />,
  profile: () => <Profile />,
  favourites: () => <Favourites />,
  history: () => <History />,
  import: () => <Import />,
  plan: () => <Plan />,
  wallet: () => <Wallet />,
  card: () => <Card />,
};

function InkBar() {
  const { s, ctx, act } = useApp();
  if (!s.saleSel.length || (s.screen !== 'home' && s.screen !== 'onsale')) return null;
  const n = recommended('All', ctx).filter((r) => r.ing.some((i) => s.saleSel.includes(i[0]))).length;
  return (
    <button className="inkbar" onClick={act.seeSale}>
      See {n} recipe{n === 1 ? '' : 's'} with your saved deals <span>{s.saleSel.length} saved <I.arrowR /></span>
    </button>
  );
}

export function Shell({ theme }: { theme?: 'a' | 'b' | 'c' }) {
  const { s, scrollRef } = useApp();
  const dark = DARK.includes(s.screen);
  const active = TABS.some((t) => t.id === s.screen) ? s.screen : PARENT[s.screen];
  const render = SCREENS[s.screen] ?? SCREENS.home!;
  return (
    <div className={`app${theme ? ` theme-${theme}` : ''}`}>
      <div ref={scrollRef} className={`screen${dark ? ' dark' : ''}`}>
        {render()}
        <div className={`toast${s.toast ? ' show' : ''}${s.saleSel.length && (s.screen === 'home' || s.screen === 'onsale') ? ' hi' : ''}`} role="status" aria-live="polite">
          {s.toast?.msg}
        </div>
      </div>
      <InkBar />
      {!NO_TABS.includes(s.screen) && (
        <nav className="tabbar" aria-label="Main">
          {TABS.map((t) => (
            <TabButton key={t.id} id={t.id} label={t.label} icon={t.icon} current={active === t.id} />
          ))}
        </nav>
      )}
    </div>
  );
}

function TabButton({ id, label, icon, current }: { id: Screen; label: string; icon: ReactNode; current: boolean }) {
  const { act } = useApp();
  return (
    <button className="tab" onClick={() => act.go(id)} aria-current={current ? 'page' : undefined}>
      {icon}{label}
    </button>
  );
}
