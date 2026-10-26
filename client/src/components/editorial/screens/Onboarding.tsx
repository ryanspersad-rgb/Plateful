import { useEffect, useRef } from 'react';
import { useApp } from '@/hooks/usePlateful';
import { BOOK, CUISINES, DEFAULT_FRIDGE, DIETS } from '@/lib/editorial';

const STEPS = ['Your name', 'Household', 'Diets', 'Cuisines', 'Your fridge'];
const FRIDGE_PICKS = DEFAULT_FRIDGE.concat(['cheddar', 'diced-tomatoes', 'chicken-thighs', 'ground-beef', 'potatoes']);

export function Onboarding() {
  const { s, act } = useApp();
  const o = s.ob;
  const nameRef = useRef<HTMLInputElement>(null);
  useEffect(() => { if (o.step === 0) nameRef.current?.focus(); }, [o.step]);
  const w = (((o.step + 1) / STEPS.length) * 100).toFixed(0);

  const chip = (label: string, on: boolean, onClick: () => void) => (
    <button key={label} className={`chip${on ? ' sel' : ''}`} onClick={onClick} aria-pressed={on}>{label}</button>
  );

  let title = '';
  let dek = '';
  let body = null;
  if (o.step === 0) {
    title = 'What should we call you?';
    dek = 'Plateful reads this week’s Calgary flyers and tells you what to cook. First, a name.';
    body = (
      <input
        ref={nameRef}
        className="tinput"
        type="text"
        placeholder="Your first name"
        value={o.name}
        autoComplete="given-name"
        onChange={(e) => act.obPatch({ name: e.target.value })}
        onKeyDown={(e) => { if (e.key === 'Enter') act.obNext(); }}
      />
    );
  }
  if (o.step === 1) {
    title = 'How many are you cooking for?';
    dek = 'We size every recipe and shopping list to your household.';
    body = <div className="hh">{[1, 2, 3, 4, 5, 6].map((n) => chip(`${n}${n === 6 ? '+' : ''}`, o.household === n, () => act.obPatch({ household: n })))}</div>;
  }
  if (o.step === 2) {
    title = 'Any diets we should cook around?';
    dek = 'Choose as many as apply. You can add allergen profiles for each person later.';
    body = <div className="chips">{DIETS.map((d) => chip(d, o.diets.includes(d), () => act.obToggle('diets', d)))}</div>;
  }
  if (o.step === 3) {
    title = 'What do you like to eat?';
    dek = 'Recipes from these cuisines rank higher when they match a deal.';
    body = <div className="chips">{CUISINES.map((c) => chip(c, o.cuisines.includes(c), () => act.obToggle('cuisines', c)))}</div>;
  }
  if (o.step === 4) {
    title = 'What’s in your fridge already?';
    dek = 'Tap what you have. Anything you own counts toward “you have everything”.';
    body = <div className="chips">{FRIDGE_PICKS.map((k) => chip(BOOK[k].n, o.pantry.includes(k), () => act.obToggle('pantry', k)))}</div>;
  }

  return (
    <div className="ob">
      <div className="prog"><i style={{ width: `${w}%` }} /></div>
      <div className="step">Step {o.step + 1} of {STEPS.length} · {STEPS[o.step]}</div>
      <h1>{title}</h1>
      <p className="dek">{dek}</p>
      <div className="body">{body}</div>
      <div className="actions">
        <button className="btn primary" onClick={act.obNext}>{o.step === 4 ? 'See this week’s deals' : 'Continue'}</button>
        {o.step > 0 ? (
          <button className="back" onClick={act.obBack}>Back</button>
        ) : (
          <button className="back" onClick={act.skipSplash}>Skip for now</button>
        )}
      </div>
    </div>
  );
}
