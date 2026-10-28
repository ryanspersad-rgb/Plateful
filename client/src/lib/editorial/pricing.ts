// Pricing, the shopping list, price matching and the cheapest trip. Pure functions over state.
import type { BookItem, ListItem, Store, StoreId, TillPlan, UserProfile } from '@/lib/types';
import { ADS, BOOK, PM_RULES, STORE, STORES, STORE_PRICE } from './book';

export const money = (n: number): string => '$' + n.toFixed(2);
export const pct = (k: string): number => {
  const b = BOOK[k];
  return b && b.was ? Math.round((1 - b.p / b.was) * 100) : 0;
};
export const bookOf = (key: string): BookItem | undefined => BOOK[key];

/** What one unit of a priced item costs at a store: this week's sale price at the store running it, else the shelf matrix. */
export function unitPrice(key: string, sid: StoreId | 'any'): number {
  const b = BOOK[key];
  if (!b) return 0;
  if (b.was && b.sid === sid) return b.p;
  const sp = STORE_PRICE[key];
  if (sid !== 'any' && sp && sp[sid]) return sp[sid] as number;
  if (b.sid === sid) return b.p;
  return b.was ? b.was : +(b.p * 1.12).toFixed(2);
}

export const listTotal = (list: ListItem[]): number =>
  list.reduce((a, i) => a + (BOOK[i.key] ? unitPrice(i.key, i.sid) * i.n : 0), 0);

/** For each price-matching store: the whole list priced there with every valid competitor ad applied; ranked by policy tier, then total. */
export function pmPlan(list: ListItem[]): TillPlan[] {
  return STORES.filter((s) => s.pm)
    .map((s) => {
      let total = 0;
      let saved = 0;
      const matches: TillPlan['matches'] = [];
      list.filter((i) => BOOK[i.key]).forEach((i) => {
        const here = unitPrice(i.key, s.id);
        const ad = (ADS[i.key] || []).filter((a) => a.sid !== s.id).sort((a, b) => a.price - b.price)[0];
        if (ad && ad.price < here) {
          matches.push({ item: i, here, ad, save: (here - ad.price) * i.n });
          total += ad.price * i.n;
          saved += (here - ad.price) * i.n;
        } else total += here * i.n;
      });
      const rule = PM_RULES[s.id];
      return rule ? { s, total, saved, matches, rule } : null;
    })
    .filter((p): p is TillPlan => p !== null)
    .sort((a, b) => a.rule.tier - b.rule.tier || a.total - b.total);
}

/** List items sitting at a price-matching store that have a cheaper competitor ad. */
export function pmItems(list: ListItem[]) {
  return list
    .filter((i) => {
      const s = STORE(i.sid);
      return BOOK[i.key] && s && s.pm && ADS[i.key] && ADS[i.key].some((a) => a.price < unitPrice(i.key, i.sid));
    })
    .map((i) => {
      const best = ADS[i.key].slice().sort((a, b) => a.price - b.price)[0];
      return { item: i, best, save: (unitPrice(i.key, i.sid) - best.price) * i.n };
    });
}

export interface OneStop {
  one?: { s: Store; t: number };
  all: { s: Store; t: number }[];
  pair: { a: Store; b: Store; t: number } | null;
  current: number;
}

/** Cheapest single store and cheapest two-store split for the list, inside the home radius. */
export function oneStop(list: ListItem[], user: UserProfile): OneStop {
  const within = STORES.filter((s) => s.km <= user.radiusKm && s.id !== 'cc' && s.id !== 'tt');
  const priced = list.filter((i) => BOOK[i.key]);
  const totals = within
    .map((s) => ({ s, t: priced.reduce((a, i) => a + unitPrice(i.key, s.id) * i.n, 0) }))
    .sort((a, b) => a.t - b.t);
  let pair: OneStop['pair'] = null;
  for (let i = 0; i < within.length; i++) {
    for (let j = i + 1; j < within.length; j++) {
      const t = priced.reduce(
        (a, it) => a + Math.min(unitPrice(it.key, within[i].id), unitPrice(it.key, within[j].id)) * it.n,
        0,
      );
      if (!pair || t < pair.t) pair = { a: within[i], b: within[j], t };
    }
  }
  return { one: totals[0], all: totals, pair, current: listTotal(list) };
}

/**
 * The two ways Plateful can send a shopper out with a list: the cheapest single store inside the home radius, or a
 * price-matching store where competitor ads are shown at the till. `best` is whichever ends up cheaper.
 */
export interface ShopPlan {
  cheapest?: { s: Store; t: number };
  match?: TillPlan;
  best: 'cheapest' | 'match' | null;
  /** What the list costs at the stores it is grouped under today. */
  current: number;
}
export function shopPlan(list: ListItem[], user: UserProfile): ShopPlan {
  const os = oneStop(list, user);
  const match = pmPlan(list).filter((p) => p.matches.length > 0).sort((a, b) => a.total - b.total)[0];
  const cheapest = os.one;
  const best: ShopPlan['best'] = cheapest && match ? (match.total < cheapest.t ? 'match' : 'cheapest') : cheapest ? 'cheapest' : match ? 'match' : null;
  return { cheapest, match, best, current: os.current };
}

/** Cheapest store near the user for one price-book item (used by the List add bar). */
export function cheapestFor(key: string, user: UserProfile): { x: Store; p: number } | undefined {
  const b = BOOK[key];
  if (!b) return undefined;
  return STORES.filter((x) => x.km <= user.radiusKm || x.id === b.sid)
    .map((x) => ({ x, p: unitPrice(key, x.id) }))
    .sort((a, c) => a.p - c.p)[0];
}
