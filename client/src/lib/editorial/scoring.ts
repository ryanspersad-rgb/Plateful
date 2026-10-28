// Recipe status and ranking, and the Cook level. Scoring from demo 15, kept:
// score = saleHits*3 + fridgeHits*4 + (fav ? 6 : 0) + (cuisine match ? 2 : 0); a saved deal counts as a fridge hit.
import type { CookLevel, Difficulty, EditorialRecipe, RecipeStatus, UserProfile } from '@/lib/types';
import { BOOK, SALE_KEYS } from './book';
import { allRecipes, isStaple, R } from './catalogue';
import { money } from './pricing';

export const LEVEL: Record<Difficulty, number> = { Easy: 1, Medium: 2, Confident: 3 };
export const COOK_LEVELS: { name: CookLevel['name']; at: number; next: CookLevel['name'] | null }[] = [
  { name: 'Beginner', at: 0, next: 'Home cook' },
  { name: 'Home cook', at: 5, next: 'Confident' },
  { name: 'Confident', at: 14, next: null },
];

export interface Ctx {
  user: UserProfile;
  saleSel: string[];
}

export const inFridge = (k: string, c: Ctx): boolean => c.user.pantry.includes(k) || c.saleSel.includes(k);
export const isFav = (id: number, c: Ctx): boolean => c.user.favorites.includes(id);

export function status(r: EditorialRecipe, c: Ctx): RecipeStatus {
  const missing = r.ing.map((i) => i[0]).filter((k) => !isStaple(k) && !inFridge(k, c));
  const saleHits = r.ing.filter((i) => SALE_KEYS.includes(i[0])).length;
  const fridgeHits = r.ing.filter((i) => inFridge(i[0], c)).length;
  const cost = missing.reduce((a, k) => a + (BOOK[k] ? BOOK[k].p : 0), 0);
  return { missing, saleHits, fridgeHits, cost, have: fridgeHits, of: r.ing.length };
}

/** What the cook said after making it: "make again" lifts a recipe like a favourite; one or two stars sinks it. */
export function noteBoost(id: number, c: Ctx): number {
  const n = c.user.notes?.[id];
  if (!n) return 0;
  return (n.again ? 5 : 0) + (n.stars >= 4 ? 2 : n.stars > 0 && n.stars <= 2 ? -6 : 0);
}

export function score(r: EditorialRecipe, c: Ctx): number {
  const st = status(r, c);
  return st.saleHits * 3 + st.fridgeHits * 4 + (isFav(r.id, c) ? 6 : 0) + (c.user.cuisines.includes(r.cuisine) ? 2 : 0) + noteBoost(r.id, c);
}

/**
 * The one-line answer to "can I make this?": "You have everything", or how many ingredients to buy and what they cost.
 * `long` spells out "ingredients" where there is room (Detail, rows); cards use the short form ("You need 3 more · $8.40").
 */
export const statusText = (r: EditorialRecipe, c: Ctx, long = false): string => {
  const st = status(r, c);
  if (st.missing.length === 0) return 'You have everything';
  const n = st.missing.length;
  const what = long ? `You need ${plural(n, 'more ingredient')}` : `You need ${n}${NB}more`;
  // Ingredients Plateful cannot price yet still count as needed; the cost covers only what it can price, and says so.
  const unpriced = st.missing.filter((k) => !BOOK[k]).length;
  if (unpriced === n) return `${what} · not priced yet`;
  return st.cost > 0 ? `${what} · ${money(st.cost)}${unpriced ? `${long ? ` + ${unpriced} not priced yet` : '+'}` : ''}` : what;
};
export const perServ = (r: EditorialRecipe): string =>
  r.total > 0 ? money(r.total / r.serv) + ' a serving' : `Serves ${r.serv}`;
// Non-breaking spaces keep a number with its unit ("45 min", "9 ingredients") so a wrap never strands "min" on its own line.
const NB = '\u00A0';
export const timeText = (m: number): string =>
  m >= 60 ? ((m / 60) % 1 === 0 ? `${m / 60}${NB}hour${m > 60 ? 's' : ''}` : `${Math.floor(m / 60)}½${NB}hours`) : `${m}${NB}min`;
export const plural = (n: number, w: string): string => `${n}${NB}${w}${n === 1 ? '' : 's'}`;

/** Recipes for a Home filter tab, ranked by score then savings. */
export function recommended(filter: string, c: Ctx): EditorialRecipe[] {
  const list = allRecipes().filter((r) => filter === 'All' || r.cuisine === filter || r.tags.includes(filter));
  return list.sort((a, b) => score(b, c) - score(a, c) || b.save - a.save);
}

// Ingredients that nearly every recipe shares say nothing about what the dish looks like.
const STAPLES = new Set(['olive-oil', 'garlic', 'onion', 'onions', 'butter', 'salt', 'pepper', 'flour', 'water', 'veg-broth', 'chicken-broth', 'beef-broth', 'eggs', 'milk', 'brown-sugar', 'soy-sauce', 'lemons', 'limes']);
const signature = (r: EditorialRecipe): Set<string> => new Set(r.ing.map((i) => i[0]).filter((k) => !STAPLES.has(k) && !k.startsWith('x:')));
const FAMILY = ['lasagn', 'pastitsio', 'moussaka', 'ziti', 'bolognese', 'rigatoni', 'spaghetti', 'penne', 'mac and cheese', 'curry', 'tikka', 'masala', 'taco', 'burrito', 'enchilada', 'quesadilla', 'pizza', 'burger', 'risotto', 'stir', 'fried rice', 'pho', 'ramen', 'soup', 'chili', 'stew', 'roast chicken', 'salad', 'pancake', 'omelette', 'shakshuka', 'pad thai', 'noodle'];
const family = (r: EditorialRecipe): string | null => { const n = r.name.toLowerCase(); return FAMILY.find((f) => n.includes(f)) ?? null; };

/** Two recipes that would look the same on a card: same dish family, or most of the same ingredients. */
export function lookalike(a: EditorialRecipe, b: EditorialRecipe): boolean {
  const fa = family(a), fb = family(b);
  if (fa && fb && fa === fb) return true;
  const sa = signature(a), sb = signature(b);
  if (!sa.size || !sb.size) return false;
  let both = 0;
  sa.forEach((k) => { if (sb.has(k)) both++; });
  return both / Math.min(sa.size, sb.size) >= 0.6;
}

/**
 * The first n of a ranked list, spread so a row reads as different dinners: no lookalikes, and at most
 * `perCuisine` from one cuisine. Falls back to the plain ranking when there is not enough variety.
 */
export function spread(ranked: EditorialRecipe[], n: number, perCuisine = 2): EditorialRecipe[] {
  const out: EditorialRecipe[] = [];
  const byCuisine: Record<string, number> = {};
  for (const r of ranked) {
    if (out.length >= n) break;
    if ((byCuisine[r.cuisine] || 0) >= perCuisine) continue;
    if (out.some((o) => lookalike(o, r))) continue;
    out.push(r);
    byCuisine[r.cuisine] = (byCuisine[r.cuisine] || 0) + 1;
  }
  for (const r of ranked) { if (out.length >= n) break; if (!out.includes(r)) out.push(r); }
  return out;
}

export function searchRecipes(q: string, limit = 4): EditorialRecipe[] {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  return allRecipes().filter(
    (r) => r.name.toLowerCase().includes(s) || r.ing.some((i) => BOOK[i[0]] && BOOK[i[0]].n.toLowerCase().includes(s)),
  ).slice(0, limit);
}

export const cookPts = (user: UserProfile): number =>
  (user.cooked || []).reduce((a, id) => a + (LEVEL[(R(id) || { diff: 'Easy' as Difficulty }).diff] || 1), 0);

export function cookLevel(user: UserProfile): CookLevel {
  const pts = cookPts(user);
  let lvl = COOK_LEVELS[0];
  COOK_LEVELS.forEach((l) => {
    if (pts >= l.at) lvl = l;
  });
  const nxt = COOK_LEVELS[COOK_LEVELS.indexOf(lvl) + 1];
  return {
    name: lvl.name,
    pts,
    next: nxt ? nxt.name : null,
    need: nxt ? nxt.at - pts : 0,
    pct: nxt ? Math.round(((pts - lvl.at) / (nxt.at - lvl.at)) * 100) : 100,
    cooked: (user.cooked || []).length,
  };
}

/** The Home row that meets the cook where they are. */
export function stepRow(user: UserProfile) {
  const lv = cookLevel(user);
  if (lv.name === 'Beginner')
    return {
      eyebrow: 'Start here',
      title: 'Five ingredients, half an hour',
      dek: 'Short lists and forgiving methods. Cook three and your level moves up.',
      list: allRecipes().filter((r) => r.diff === 'Easy' && r.ing.length <= 7 && r.time <= 30),
    };
  if (lv.name === 'Home cook')
    return {
      eyebrow: 'Your next step',
      title: 'One new technique each',
      dek: 'Medium recipes that teach a skill you have not used yet.',
      list: allRecipes().filter((r) => r.diff === 'Medium'),
    };
  return {
    eyebrow: 'Weekend projects',
    title: 'Worth the afternoon',
    dek: 'Braises and bakes for a confident cook.',
    list: allRecipes().filter((r) => r.diff === 'Confident'),
  };
}
