import { describe, expect, it } from 'vitest';
import { ingName } from '../catalogue';
import { statusText } from '../scoring';
import { EDITORIAL_RECIPES } from '../recipes';
import type { Ctx } from '../scoring';

describe('ingredient names agree with their amounts', () => {
  it('goes singular at one or less and plural above', () => {
    expect(ingName('lemon', '½')).toBe('Lemon');
    expect(ingName('lemon', '1')).toBe('Lemon');
    expect(ingName('lemon', '2')).toBe('Lemons');
    expect(ingName('onion', '½ red')).toBe('Onion');
    expect(ingName('eggs', '4')).toBe('Eggs');
    expect(ingName('eggs', '1')).toBe('Egg');
    expect(ingName('potatoes', '4 medium')).toBe('Potatoes');
  });
  it('keeps the price-book name when the amount carries a unit', () => {
    expect(ingName('garlic', '3 cloves')).toBe('Garlic');
    expect(ingName('garlic', '1 head')).toBe('Garlic');
    expect(ingName('potatoes', '1 lb small')).toBe('Russet potatoes');
    expect(ingName('chicken-thighs', '1½ lb')).toBe('Chicken thighs, boneless skinless');
    expect(ingName('parsley', 'handful')).toBe('Parsley');
  });
});

describe('status wording', () => {
  const r = EDITORIAL_RECIPES[0];
  const ctx = (pantry: string[]): Ctx => ({ user: { name: '', householdSize: 2, diets: [], cuisines: [], pantry, favorites: [], postalPrefix: 'T2P', radiusKm: 5, alerts: false, imported: [] }, saleSel: [] });
  it('counts what is missing', () => {
    const all = r.ing.map((i) => i[0]);
    expect(statusText(r, ctx(all))).toBe('You have everything');
    expect(statusText(r, ctx(all.slice(1)))).toMatch(/^You need 1 more · \$/);
    expect(statusText(r, ctx(all.slice(1)), true)).toMatch(/^You need 1 more ingredient · \$/);
    expect(statusText(r, ctx(all.slice(3)), true)).toMatch(/^You need 3 more ingredients · \$/);
  });
});
