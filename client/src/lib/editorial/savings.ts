// What Plateful saves a shopper: a projection from their usual weekly shop, and a ledger of what they actually saved.
// The projection compares the usual shop at the store nearest home (its own prices, sale or not) with where Plateful
// would send them — the cheapest single store in the radius, or a price-matching store with the flyer ads applied.
// The ledger records only things the shopper did: matches applied at the till, a list moved to a cheaper store,
// and sale items ticked off as bought.
import type { ListItem, SavingEntry, StoreId, UserProfile } from '@/lib/types';
import { BOOK, STORES } from './book';
import { listTotal, shopPlan, unitPrice } from './pricing';

/** Items most Calgary households buy most weeks: the chips on the "usual shop" onboarding step. */
export const USUAL_PICKS: string[] = [
  'milk', 'eggs', 'butter', 'cheddar', 'yogurt', 'chicken-thighs', 'chicken-breast', 'ground-beef', 'salmon', 'pork-tenderloin',
  'bacon', 'sausages', 'bananas', 'apples', 'potatoes', 'carrots', 'onion', 'broccoli', 'peppers', 'tomatoes', 'romaine',
  'cucumber', 'avocado', 'spinach', 'mushrooms', 'sourdough', 'rice', 'pasta', 'diced-tomatoes', 'olive-oil', 'coffee',
].filter((k) => BOOK[k]);

/** A sensible starting basket: the staples every household buys, with more proteins for bigger households. */
export function defaultUsual(household: number): string[] {
  const base = ['milk', 'eggs', 'butter', 'cheddar', 'chicken-thighs', 'ground-beef', 'bananas', 'apples', 'potatoes', 'carrots', 'onion', 'broccoli', 'peppers', 'sourdough', 'pasta', 'rice'];
  const more = household >= 3 ? ['yogurt', 'chicken-breast', 'tomatoes', 'diced-tomatoes'] : [];
  return base.concat(more).filter((k) => BOOK[k]);
}

const PERISHABLE = ['Meat', 'Produce', 'Dairy', 'Bakery'];
/** Packs of an item a household buys in a week: perishables scale with the household, pantry items do not. */
const packs = (key: string, household: number): number => (PERISHABLE.includes(BOOK[key]?.cat || '') ? Math.max(1, Math.round(household / 2)) : 1);

/** The usual shop as a list priced at the store nearest home. */
export function usualList(keys: string[], household: number, sid: StoreId): ListItem[] {
  return keys.filter((k) => BOOK[k]).map((k) => ({ key: k, qty: BOOK[k].size || '1', n: packs(k, household), sid, done: false }));
}

export interface Projection {
  /** The store the usual shop is compared against: the nearest one inside the radius. */
  nearest: { name: string; km: number };
  usual: number;
  withPlateful: number;
  route: 'cheapest' | 'match';
  /** Where Plateful sends them. */
  to: string;
  weekly: number;
  monthly: number;
  items: number;
}

/** The usual weekly shop at the nearest store versus where Plateful sends them. Null when nothing is picked or nothing is cheaper. */
export function projectSavings(keys: string[], user: Pick<UserProfile, 'householdSize' | 'radiusKm'> & Partial<UserProfile>): Projection | null {
  const near = STORES.filter((s) => s.km <= user.radiusKm).sort((a, b) => a.km - b.km)[0] || STORES.slice().sort((a, b) => a.km - b.km)[0];
  const list = usualList(keys, user.householdSize, near.id);
  if (!list.length) return null;
  const usual = listTotal(list);
  const p = shopPlan(list, user as UserProfile);
  const opts: { t: number; route: 'cheapest' | 'match'; to: string }[] = [];
  if (p.cheapest) opts.push({ t: p.cheapest.t, route: 'cheapest', to: p.cheapest.s.name });
  if (p.match) opts.push({ t: p.match.total, route: 'match', to: p.match.s.name });
  const best = opts.sort((a, b) => a.t - b.t)[0];
  if (!best || best.t >= usual - 0.005) return null;
  const weekly = usual - best.t;
  return { nearest: { name: near.name, km: near.km }, usual, withPlateful: best.t, route: best.route, to: best.to, weekly, monthly: (weekly * 52) / 12, items: list.length };
}

/** "About $160": the projection rounded to $5 so it reads as an estimate, not a promise. */
export const about = (n: number): string => '$' + Math.max(5, Math.round(n / 5) * 5);

/** The list priced at the store nearest home: the baseline every saving is measured against. */
export function nearestTotal(list: ListItem[], radiusKm: number): number {
  const near = STORES.filter((s) => s.km <= radiusKm).sort((a, b) => a.km - b.km)[0] || STORES.slice().sort((a, b) => a.km - b.km)[0];
  return listTotal(list.map((i) => ({ ...i, sid: near.id })));
}

// ---- the ledger ----

const month = (d = new Date()): string => d.toISOString().slice(0, 7);
const today = (): string => new Date().toISOString().slice(0, 10);
/** Monday of the current week (ISO date), so a list moved twice in a week counts once. */
const weekOf = (d = new Date()): string => {
  const x = new Date(d);
  x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
  return x.toISOString().slice(0, 10);
};

export const savedThisMonth = (user: UserProfile): number =>
  (user.savings || []).filter((e) => e.at.startsWith(month())).reduce((a, e) => a + e.amt, 0);
export const savedAllTime = (user: UserProfile): number => (user.savings || []).reduce((a, e) => a + e.amt, 0);

/** Add a price-match entry from At the till. */
export function logMatch(user: UserProfile, amt: number, store: string): UserProfile {
  if (amt <= 0.004) return user;
  const e: SavingEntry = { id: `match:${Date.now()}`, at: today(), amt: +amt.toFixed(2), kind: 'match', what: `Price matched at ${store}` };
  return { ...user, savings: [e, ...(user.savings || [])].slice(0, 200) };
}

/** Record the saving from moving the list to a cheaper store; one entry per week, the latest move replaces it. */
export function logRoute(user: UserProfile, before: number, after: number, store: string): UserProfile {
  const id = `route:${weekOf()}`;
  const rest = (user.savings || []).filter((e) => e.id !== id);
  const amt = before - after;
  if (amt <= 0.004) return { ...user, savings: rest };
  const e: SavingEntry = { id, at: today(), amt: +amt.toFixed(2), kind: 'route', what: `List moved to ${store}, against the store nearest you` };
  return { ...user, savings: [e, ...rest].slice(0, 200) };
}

/** Ticking a sale item off the list records what it saved against the regular price; unticking takes it back. */
export function logDeal(user: UserProfile, item: ListItem, done: boolean): UserProfile {
  const id = `deal:${item.key}:${item.sid}:${weekOf()}`;
  const rest = (user.savings || []).filter((e) => e.id !== id);
  const b = BOOK[item.key];
  if (!done || !b || !b.was || b.sid !== item.sid) return { ...user, savings: rest };
  const amt = (b.was - unitPrice(item.key, item.sid)) * item.n;
  if (amt <= 0.004) return { ...user, savings: rest };
  const e: SavingEntry = { id, at: today(), amt: +amt.toFixed(2), kind: 'deal', what: `${b.n} on sale at ${b.r}` };
  return { ...user, savings: [e, ...rest].slice(0, 200) };
}

/** Real savings by month, newest first, for the last `n` months (months with nothing show as 0). */
export function savedByMonth(user: UserProfile, n = 6): { month: string; label: string; amt: number }[] {
  const out: { month: string; label: string; amt: number }[] = [];
  const d = new Date();
  d.setDate(1);
  for (let i = 0; i < n; i++) {
    const m = d.toISOString().slice(0, 7);
    const amt = (user.savings || []).filter((e) => e.at.startsWith(m)).reduce((a, e) => a + e.amt, 0);
    out.push({ month: m, label: d.toLocaleDateString('en-CA', { month: 'short' }), amt });
    d.setMonth(d.getMonth() - 1);
  }
  return out;
}

/** All-time savings split by how they were made. */
export function savedByKind(user: UserProfile): Record<SavingEntry['kind'], { amt: number; n: number }> {
  const r = { match: { amt: 0, n: 0 }, route: { amt: 0, n: 0 }, deal: { amt: 0, n: 0 } };
  for (const e of user.savings || []) { r[e.kind].amt += e.amt; r[e.kind].n += 1; }
  return r;
}

/** The month the shopper first saved something, for "since October". */
export const firstSaving = (user: UserProfile): string | undefined => (user.savings || []).map((e) => e.at).sort()[0];
