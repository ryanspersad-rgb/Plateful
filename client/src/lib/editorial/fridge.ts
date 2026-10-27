// Expiry dates for fridge items and the "use it up" ranking (Cooklist / Samsung Food do this; roadmap 12).
// Dates are stored per price-book key in user.expiry as ISO days ('2026-10-30'); pantry/frozen staples carry none.
import type { EditorialRecipe, UserProfile } from '@/lib/types';
import { BOOK, FRIDGE_CATS } from './book';
import { allRecipes } from './catalogue';
import { score, type Ctx } from './scoring';

/** Typical days to use by, from the day an item lands in the fridge. Category defaults, then the key overrides. */
const CAT_DAYS: Record<string, number | null> = {
  'Dairy & eggs': 10, Produce: 7, 'Meat & fish': 3, 'Pantry & frozen': null, Bakery: 4,
};
const KEY_DAYS: Record<string, number | null> = {
  eggs: 21, milk: 10, butter: 30, cream: 10, 'sour-cream': 14, yogurt: 14, parmesan: 30, cheddar: 21, mozzarella: 10, feta: 14,
  garlic: 21, onion: 21, potatoes: 21, carrots: 14, lemon: 14, lime: 14, apples: 14, cucumber: 6, romaine: 5, mushrooms: 5,
  tomatoes: 5, avocado: 3, bananas: 4, broccoli: 5, 'green-beans': 5, peppers: 7, spinach: 4, cabbage: 14, celery: 10,
  salmon: 2, shrimp: 2, 'chicken-thighs': 2, 'chicken-breast': 2, 'whole-chicken': 2, 'ground-beef': 2, 'flank-steak': 3,
  'pork-tenderloin': 3, sausages: 3, bacon: 7, sourdough: 4, naan: 5, tortillas: 10, 'pizza-dough': 3,
  peas: null, 'rice-noodles': null, 'chicken-broth': null, 'coconut-milk': null, 'diced-tomatoes': null, 'white-beans': null,
};

export const categoryOf = (key: string): string | undefined =>
  Object.keys(FRIDGE_CATS).find((c) => FRIDGE_CATS[c].includes(key));

/** Days an item keeps, or null for a staple that does not need a date. */
export function shelfDays(key: string): number | null {
  if (key in KEY_DAYS) return KEY_DAYS[key];
  const c = categoryOf(key);
  return c ? CAT_DAYS[c] : null;
}

export const isoDay = (d: Date): string => {
  const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return z.toISOString().slice(0, 10);
};
export const addDays = (iso: string, n: number): string => {
  const d = new Date(iso + 'T12:00:00');
  d.setDate(d.getDate() + n);
  return isoDay(d);
};
export const today = (): string => isoDay(new Date());

/** The default use-by date for a key added today, or undefined for staples. */
export function defaultExpiry(key: string, from: string = today()): string | undefined {
  const n = shelfDays(key);
  return n === null || n === undefined ? undefined : addDays(from, n);
}

/** Fill in dates for perishables that have none (first run, onboarding, older saves). */
export function withDefaultExpiry(user: UserProfile, from: string = today()): UserProfile {
  const expiry = { ...(user.expiry || {}) };
  let changed = false;
  user.pantry.forEach((k) => {
    if (!expiry[k]) {
      const d = defaultExpiry(k, from);
      if (d) { expiry[k] = d; changed = true; }
    }
  });
  return changed ? { ...user, expiry } : user;
}

export const daysLeft = (iso: string, from: string = today()): number =>
  Math.round((new Date(iso + 'T12:00:00').getTime() - new Date(from + 'T12:00:00').getTime()) / 86400000);

const DOW = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "today", "tomorrow", "Thursday", "Nov 3"; past dates read "2 days ago". */
export function whenText(iso: string, from: string = today()): string {
  const n = daysLeft(iso, from);
  if (n < 0) return n === -1 ? 'yesterday' : `${-n} days ago`;
  if (n === 0) return 'today';
  if (n === 1) return 'tomorrow';
  const d = new Date(iso + 'T12:00:00');
  if (n < 7) return DOW[d.getDay()];
  return `${MON[d.getMonth()]} ${d.getDate()}`;
}

export interface Expiring { key: string; name: string; date: string; days: number }

/** Fridge items with a date inside the window, soonest first (past dates included so they are not forgotten). */
export function expiringSoon(user: UserProfile, withinDays = 5, from: string = today()): Expiring[] {
  const ex = user.expiry || {};
  return user.pantry
    .filter((k) => ex[k] && BOOK[k])
    .map((k) => ({ key: k, name: BOOK[k].n, date: ex[k], days: daysLeft(ex[k], from) }))
    .filter((e) => e.days <= withinDays)
    .sort((a, b) => a.days - b.days);
}

/** Recipes that use what is about to turn: most expiring items used first, then the soonest, then the usual score. */
export function useItUp(c: Ctx, items: Expiring[], limit = 8): EditorialRecipe[] {
  if (!items.length) return [];
  const rank = new Map(items.map((e, i) => [e.key, i]));
  return allRecipes()
    .map((r) => {
      const hits = r.ing.map((i) => i[0]).filter((k) => rank.has(k));
      const soonest = hits.length ? Math.min(...hits.map((k) => rank.get(k) as number)) : 99;
      return { r, hits: hits.length, soonest };
    })
    .filter((x) => x.hits > 0)
    .sort((a, b) => b.hits - a.hits || a.soonest - b.soonest || score(b.r, c) - score(a.r, c))
    .slice(0, limit)
    .map((x) => x.r);
}
