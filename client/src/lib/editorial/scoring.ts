// Recipe status and ranking, and the Cook level. Scoring from demo 15, kept:
// score = saleHits*3 + fridgeHits*4 + (fav ? 6 : 0) + (cuisine match ? 2 : 0); a saved deal counts as a fridge hit.
import type { CookLevel, Difficulty, EditorialRecipe, RecipeStatus, UserProfile } from '@/lib/types';
import { BOOK, SALE_KEYS } from './book';
import { ALL_RECIPES, R } from './catalogue';
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
  const missing = r.ing.map((i) => i[0]).filter((k) => !inFridge(k, c));
  const saleHits = r.ing.filter((i) => SALE_KEYS.includes(i[0])).length;
  const fridgeHits = r.ing.filter((i) => inFridge(i[0], c)).length;
  const cost = missing.reduce((a, k) => a + (BOOK[k] ? BOOK[k].p : 0), 0);
  return { missing, saleHits, fridgeHits, cost, have: fridgeHits, of: r.ing.length };
}

export function score(r: EditorialRecipe, c: Ctx): number {
  const st = status(r, c);
  return st.saleHits * 3 + st.fridgeHits * 4 + (isFav(r.id, c) ? 6 : 0) + (c.user.cuisines.includes(r.cuisine) ? 2 : 0);
}

export const statusText = (r: EditorialRecipe, c: Ctx): string => {
  const st = status(r, c);
  return st.missing.length === 0 ? 'You have everything' : `Missing ${st.missing.length} · ${money(st.cost)}`;
};
export const perServ = (r: EditorialRecipe): string =>
  r.total > 0 ? money(r.total / r.serv) + ' a serving' : `Serves ${r.serv}`;
export const timeText = (m: number): string =>
  m >= 60 ? ((m / 60) % 1 === 0 ? `${m / 60} hour${m > 60 ? 's' : ''}` : `${Math.floor(m / 60)}½ hours`) : `${m} min`;
export const plural = (n: number, w: string): string => `${n} ${w}${n === 1 ? '' : 's'}`;

/** Recipes for a Home filter tab, ranked by score then savings. */
export function recommended(filter: string, c: Ctx): EditorialRecipe[] {
  const list = ALL_RECIPES.filter((r) => filter === 'All' || r.cuisine === filter || r.tags.includes(filter));
  return list.sort((a, b) => score(b, c) - score(a, c) || b.save - a.save);
}

export function searchRecipes(q: string, limit = 4): EditorialRecipe[] {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  return ALL_RECIPES.filter(
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
      list: ALL_RECIPES.filter((r) => r.diff === 'Easy' && r.ing.length <= 7 && r.time <= 30),
    };
  if (lv.name === 'Home cook')
    return {
      eyebrow: 'Your next step',
      title: 'One new technique each',
      dek: 'Medium recipes that teach a skill you have not used yet.',
      list: ALL_RECIPES.filter((r) => r.diff === 'Medium'),
    };
  return {
    eyebrow: 'Weekend projects',
    title: 'Worth the afternoon',
    dek: 'Braises and bakes for a confident cook.',
    list: ALL_RECIPES.filter((r) => r.diff === 'Confident'),
  };
}
