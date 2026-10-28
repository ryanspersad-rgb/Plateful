import { describe, expect, it } from 'vitest';
import { lookalike, spread } from '../scoring';
import type { EditorialRecipe } from '@/lib/types';

const mk = (id: number, name: string, cuisine: string, ing: string[]): EditorialRecipe => ({
  id, name, img: '', cuisine, meal: 'Dinner', time: 30, serv: 4, diff: 'Easy', tags: [], total: 10, save: 1, ing: ing.map((k) => [k, '1'] as [string, string]), steps: [], teaches: [],
});
const lasagna = mk(1, 'Lasagna', 'Italian', ['ground-beef', 'pasta', 'diced-tomatoes', 'ricotta', 'mozzarella', 'onion']);
const pastitsio = mk(2, 'Pastitsio', 'Greek', ['ground-beef', 'pasta', 'diced-tomatoes', 'parmesan', 'milk', 'onion']);
const moussaka = mk(3, 'Moussaka', 'Greek', ['ground-beef', 'eggplant', 'diced-tomatoes', 'milk', 'onion', 'garlic']);
const ziti = mk(4, 'Baked Ziti', 'Italian', ['pasta', 'ground-beef', 'diced-tomatoes', 'mozzarella', 'parmesan']);
const curry = mk(5, 'Thai Green Curry', 'Thai', ['chicken-thighs', 'coconut-milk', 'green-curry-paste', 'green-beans']);
const tacos = mk(6, 'Beef Tacos', 'Mexican', ['ground-beef', 'tortillas', 'avocados', 'tomatoes', 'limes']);
const pho = mk(7, 'Beef Pho', 'Vietnamese', ['rice-noodles', 'flank-steak', 'beef-broth', 'ginger', 'star-anise']);
const pizza = mk(8, 'Margherita Pizza', 'Italian', ['pizza-dough', 'diced-tomatoes', 'mozzarella', 'basil']);

describe('lookalike', () => {
  it('sees the baked pastas as the same card', () => {
    expect(lookalike(lasagna, pastitsio)).toBe(true);
    expect(lookalike(lasagna, ziti)).toBe(true);
    expect(lookalike(pastitsio, moussaka)).toBe(true); // ground beef, tomatoes, milk: most of the shorter list
  });
  it('keeps distinct dinners apart', () => {
    expect(lookalike(lasagna, curry)).toBe(false);
    expect(lookalike(tacos, pho)).toBe(false);
    expect(lookalike(pizza, lasagna)).toBe(false);
  });
});

describe('spread', () => {
  it('fills a row with different dinners and at most two per cuisine', () => {
    const row = spread([lasagna, pastitsio, moussaka, ziti, pizza, curry, tacos, pho], 6);
    expect(row.map((r) => r.name)).toEqual(['Lasagna', 'Margherita Pizza', 'Thai Green Curry', 'Beef Tacos', 'Beef Pho', 'Pastitsio']);
  });
  it('falls back to the ranking when variety runs out', () => {
    expect(spread([lasagna, pastitsio, ziti], 3).map((r) => r.id)).toEqual([1, 2, 4]);
  });
});
