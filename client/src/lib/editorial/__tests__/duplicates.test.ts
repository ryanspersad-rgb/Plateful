import { describe, expect, it } from 'vitest';
import { ALL_RECIPES, CANONICAL, DUPLICATE_OF, R, canonical, canonicalIds } from '../catalogue';
import { EDITORIAL_RECIPES } from '../recipes';

const norm = (s: string) => s.toLowerCase().replace(/\(.*?\)/g, '').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();

describe('duplicate recipes', () => {
  it('resolves every entry of DUPLICATE_OF to a shown recipe', () => {
    expect(CANONICAL.size).toBe(Object.keys(DUPLICATE_OF).length);
    for (const [hidden, kept] of CANONICAL) {
      expect(ALL_RECIPES.some((r) => r.id === hidden)).toBe(false);
      expect(R(kept)?.id).toBe(kept);
    }
  });

  it('shows no two recipes with the same name', () => {
    const seen = new Map<string, string>();
    for (const r of ALL_RECIPES) {
      const k = norm(r.name);
      expect(seen.get(k), `${r.name} (${r.id}) duplicates ${seen.get(k)}`).toBeUndefined();
      seen.set(k, `${r.name} (${r.id})`);
    }
  });

  it('keeps the editorial copy and the specific cuisine', () => {
    const palak = ALL_RECIPES.filter((r) => norm(r.name) === 'palak paneer');
    expect(palak).toHaveLength(1);
    expect(EDITORIAL_RECIPES.some((r) => r.id === palak[0].id)).toBe(true);
    const moussaka = ALL_RECIPES.filter((r) => norm(r.name) === 'moussaka');
    expect(moussaka.map((r) => r.cuisine)).toEqual(['Greek']);
    expect(ALL_RECIPES.some((r) => norm(r.name) === 'thai coconut soup')).toBe(false);
    expect(ALL_RECIPES.some((r) => norm(r.name) === 'tom kha gai')).toBe(true);
  });

  it('redirects a hidden id to the kept recipe and de-duplicates saved id lists', () => {
    const [hidden, kept] = Array.from(CANONICAL.entries())[0];
    expect(R(hidden)?.id).toBe(kept);
    expect(canonical(hidden)).toBe(kept);
    expect(canonical(kept)).toBe(kept);
    expect(canonicalIds([kept, hidden, 1, hidden])).toEqual([kept, 1]);
  });
});

describe('unpriced recipes stay in', async () => {
  const { CATALOGUE_RECIPES, unpricedOf, isStaple } = await import('../catalogue');
  it('keeps recipes with unpriced ingredients and treats staples as pantry', () => {
    expect(CATALOGUE_RECIPES.some((r) => unpricedOf(r).length > 2)).toBe(true);
    expect(isStaple('x:salt')).toBe(true);
  });
});
