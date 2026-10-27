import type { ReactNode } from 'react';
import { useApp } from '@/hooks/usePlateful';
import type { Screen } from '@/lib/types';
import { budgetFor, cardName, cookLevel, money, plannedCount, plural } from '@/lib/editorial';
import { Chev, Foot, Pad, Sec, Spacer, Title, Topbar } from '../Bits';

export function Profile() {
  const { s, user, act } = useApp();
  const h = new Date().getHours();
  const greet = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
  const lv = cookLevel(user);
  const b = budgetFor(user, s.list);
  const plannedDinners = plannedCount(s.plan);
  const cards = user.cards || [];
  const Row = ({ t, s, to, onClick, extra }: { t: string; s: string; to?: Screen; onClick?: () => void; extra?: ReactNode }) => (
    <button className="hrow" onClick={onClick ?? (() => to && act.go(to))}>
      <div className="l"><div className="n">{t}</div><div className="s">{s}</div></div>
      {extra ?? <Chev />}
    </button>
  );
  const Soon = <span className="eyebrow mut" style={{ fontSize: 10 }}>Soon</span>;
  return (
    <>
      <Topbar left={<Title title={`${greet}${user.name ? ', ' + user.name : ''}`} meta={`Household of ${user.householdSize} · ${user.postalPrefix} · ${user.radiusKm} km`} />} />
      <Pad>
        <div className="plus" id="plus">
          <div className="t">Plateful Plus</div>
          <div className="p">$4.99 a month · first month free</div>
          <ul>
            <li>Price alerts for what you cook most</li>
            <li>Unlimited camera price checks and imports</li>
            <li>Shared household list</li>
            <li>Allergen profiles for everyone at the table</li>
          </ul>
          <button className="btn primary" onClick={() => act.toast('Plus checkout arrives with the pilot')}>Start your free month</button>
        </div>
        <Sec eyebrow="Your cook level" thin>
          <div className="cook">
            <div className="nm">{lv.name}</div>
            <div className="prog"><i style={{ width: `${lv.pct}%` }} /></div>
            <div className="meta">{plural(lv.cooked, 'recipe')} cooked · {plural(lv.pts, 'point')}{lv.next ? ` · ${lv.need} more to ${lv.next}` : ' · top level'}</div>
            <div className="meta" style={{ marginTop: 4 }}>Easy recipes are 1 point, Medium 2, Confident 3. Tap “I cooked this” on any recipe.</div>
          </div>
        </Sec>
        <Sec eyebrow="Your kitchen" thin>
          <Row t="My fridge" s={`${user.pantry.length} items`} to="fridge" />
          <Row t="Favourites" s={`${user.favorites.length} saved recipes`} to="favourites" />
          <Row t="History" s={`${(user.history || []).length} recently viewed · ${(user.cooked || []).length} cooked`} to="history" />
          <Row t="This week’s plan" s={`${plannedDinners} planned · groceries to the list in one tap`} to="plan" />
          <Row t="Imported recipes" s={`${(user.imported || []).length} from TikTok, Instagram, YouTube and the web`} to="import" />
          <Row t="Diets and cuisines" s={`${user.diets.length ? user.diets.join(', ') : 'No diets'} · ${user.cuisines.join(', ')}`} onClick={act.editPrefs} />
        </Sec>
        <Sec eyebrow="Budget" thin>
          <div className="hrow">
            <div className="l">
              <div className="n">Weekly grocery budget</div>
              <div className="s">{b ? `${money(b.planned)} on your list · ${b.over ? `${money(-b.left)} over` : `${money(b.left)} left`}` : 'Shows what is left as your list grows'}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="meta">$</span>
              <input
                className="numin"
                type="number"
                inputMode="numeric"
                min={0}
                step={5}
                placeholder="150"
                defaultValue={user.weeklyBudget ?? ''}
                aria-label="Weekly grocery budget in dollars"
                onBlur={(e) => act.setBudget(e.target.value === '' ? null : +e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
              />
            </div>
          </div>
        </Sec>
        <Sec eyebrow="Location" thin>
          <div className="hrow" style={{ display: 'block' }}>
            <div className="n">Home radius · <span className="price">{user.radiusKm}</span> km from {user.postalPrefix}</div>
            <input className="range" type="range" min={2} max={10} step={1} value={user.radiusKm} aria-label="Home radius in km" onChange={(e) => act.setRadius(+e.target.value)} />
            <div className="s">Every distance, the best-store pick, promoted items and price-match ads use this. We store a postal prefix, never an address.</div>
          </div>
        </Sec>
        <Sec eyebrow="Household" thin>
          <Row t="Household allergens" s="Roadmap · per-person profiles" onClick={() => act.toast('Allergen profiles are on the roadmap')} extra={Soon} />
          <Row t="Loyalty cards" s={cards.length ? `${plural(cards.length, 'card')} on this phone · ${cards.map(cardName).join(', ')}` : 'PC Optimum, Scene+, Co-op, Costco, Air Miles — shown as a barcode at the till'} to="wallet" />
          <div className="hrow">
            <div className="l"><div className="n">Deal alerts</div><div className="s">When a favourite’s ingredients go on sale nearby</div></div>
            <button className={`toggle${user.alerts ? ' on' : ''}`} onClick={act.toggleAlerts} role="switch" aria-checked={user.alerts} aria-label="Deal alerts"><i /></button>
          </div>
        </Sec>
      </Pad>
      <Foot>Plateful Inc. · Calgary · plateful.ca</Foot>
      <Spacer />
    </>
  );
}
