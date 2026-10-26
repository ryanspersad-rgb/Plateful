// The weekly plan (ported from the pre-redesign meal calendar) and the weekly budget.
import type { EditorialRecipe, ListItem, UserProfile, WeekPlan } from '@/lib/types';
import { BOOK } from './book';
import { R } from './catalogue';
import { listTotal } from './pricing';
import { recommended, status, type Ctx } from './scoring';
import { addDays, isoDay } from './fridge';

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
export type Day = (typeof DAYS)[number];

export const emptyPlan = (): WeekPlan => ({
  Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [], Sunday: [],
});

/** ISO date of this week's Monday (weeks run Monday to Sunday). */
export function weekStart(from: Date = new Date()): string {
  const d = new Date(from);
  const shift = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - shift);
  return isoDay(d);
}
export const dateOfDay = (day: Day, start: string = weekStart()): string => addDays(start, DAYS.indexOf(day));
export const todayDay = (from: Date = new Date()): Day => DAYS[(from.getDay() + 6) % 7];

export const plannedRecipes = (plan: WeekPlan): EditorialRecipe[] =>
  DAYS.flatMap((d) => plan[d]).map((id) => R(id)).filter((r): r is EditorialRecipe => !!r);

export const plannedCount = (plan: WeekPlan): number => DAYS.reduce((a, d) => a + plan[d].length, 0);

export interface PlanStats {
  dinners: number;
  cost: number;
  save: number;
  ingredients: number;
  inFridge: number;
  onSale: number;
  missing: { key: string; amt: string }[];
}

/** Week totals and the de-duplicated groceries the plan still needs. */
export function planStats(plan: WeekPlan, c: Ctx): PlanStats {
  const recipes = plannedRecipes(plan);
  const seen = new Map<string, string>();
  let inFridge = 0;
  let onSale = 0;
  recipes.forEach((r) => {
    const st = status(r, c);
    r.ing.forEach(([k, amt]) => {
      if (seen.has(k)) return;
      seen.set(k, amt);
      if (!st.missing.includes(k)) inFridge++;
      if (BOOK[k]?.was !== undefined) onSale++;
    });
  });
  const missing = Array.from(seen.entries())
    .filter(([k]) => !c.user.pantry.includes(k) && !c.saleSel.includes(k))
    .map(([key, amt]) => ({ key, amt }));
  return {
    dinners: recipes.length,
    cost: recipes.reduce((a, r) => a + r.total, 0),
    save: recipes.reduce((a, r) => a + r.save, 0),
    ingredients: seen.size,
    inFridge,
    onSale,
    missing,
  };
}

/** Fill every empty day from the ranked recommendations, one cuisine per day where possible. */
export function autoPlan(plan: WeekPlan, c: Ctx): WeekPlan {
  const taken = new Set(DAYS.flatMap((d) => plan[d]));
  const usedCuisines = new Set(plannedRecipes(plan).map((r) => r.cuisine));
  const pool = recommended('All', c).filter((r) => !taken.has(r.id) && r.total > 0);
  const next: WeekPlan = { ...plan };
  DAYS.forEach((d) => {
    if (next[d].length) return;
    let pick = pool.find((r) => !taken.has(r.id) && !usedCuisines.has(r.cuisine));
    if (!pick) pick = pool.find((r) => !taken.has(r.id));
    if (!pick) return;
    next[d] = [pick.id];
    taken.add(pick.id);
    usedCuisines.add(pick.cuisine);
  });
  return next;
}

/* ---------- budget ---------- */

export interface Budget {
  budget: number;
  planned: number;   // everything on the list
  bought: number;    // items ticked off
  left: number;      // budget - planned
  pct: number;       // planned as a share of the budget, 0–100 (capped)
  over: boolean;
}

export function budgetFor(user: UserProfile, list: ListItem[]): Budget | null {
  if (!user.weeklyBudget) return null;
  const planned = listTotal(list);
  const bought = listTotal(list.filter((i) => i.done));
  const left = user.weeklyBudget - planned;
  return {
    budget: user.weeklyBudget,
    planned,
    bought,
    left,
    pct: Math.min(100, Math.round((planned / user.weeklyBudget) * 100)),
    over: left < 0,
  };
}
