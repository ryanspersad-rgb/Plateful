import { describe, expect, it } from 'vitest';
import { nameFromUrl, parseIngredientLine, parseIngredients, sourceOf, splitPaste } from '../imported';

describe('parseIngredientLine', () => {
  it('maps common lines onto the price book', () => {
    expect(parseIngredientLine('2 tablespoons olive oil, plus more for drizzling')).toMatchObject({ key: 'olive-oil', amount: '2 tbsp', priced: true });
    expect(parseIngredientLine('1 lb boneless, skinless chicken thighs')).toMatchObject({ key: 'chicken-thighs', amount: '1 lb' });
    expect(parseIngredientLine('• 3 cloves garlic, minced')).toMatchObject({ key: 'garlic', amount: '3 cloves' });
    expect(parseIngredientLine('1 (28-ounce) can crushed tomatoes')).toMatchObject({ key: 'diced-tomatoes', amount: '1 can' });
    expect(parseIngredientLine('500g pasta')).toMatchObject({ key: 'pasta', amount: '500 g' });
    expect(parseIngredientLine('1/2 cup grated Parmesan')).toMatchObject({ key: 'parmesan', amount: '1/2 cup' });
  });
  it('keeps unknown items as unpriced x: keys with a tidy name', () => {
    expect(parseIngredientLine('Kosher salt and black pepper, to taste')).toMatchObject({ key: 'x:salt-and-black-pepper', priced: false });
    expect(parseIngredientLine('2 tsp smoked paprika')).toMatchObject({ key: 'x:smoked-paprika', amount: '2 tsp', name: 'Smoked paprika' });
  });
  it('skips headings and blank lines', () => {
    expect(parseIngredientLine('Ingredients')).toBeNull();
    expect(parseIngredientLine('For the sauce:')).toBeNull();
    expect(parseIngredients('\n\n2 eggs\n\n').length).toBe(1);
  });
});

describe('splitPaste', () => {
  it('separates a pasted recipe at the Method heading', () => {
    const r = splitPaste('Ingredients\n2 eggs\n1 cup flour\nMethod\n1. Whisk the eggs.\nStep 2: Add the flour.');
    expect(r.ing).toEqual(['2 eggs', '1 cup flour']);
    expect(r.steps).toEqual(['Whisk the eggs.', 'Add the flour.']);
  });
});

describe('links', () => {
  it('names the source and guesses a title from the slug', () => {
    expect(sourceOf('https://www.tiktok.com/@x/video/1')).toBe('TikTok');
    expect(sourceOf('https://cooking.nytimes.com/recipes/1024-garlic-butter-shrimp')).toBe('cooking.nytimes.com');
    expect(nameFromUrl('https://cooking.nytimes.com/recipes/1024-garlic-butter-shrimp')).toBe('Garlic butter shrimp');
    expect(nameFromUrl('https://www.bbcgoodfood.com/recipes/chicken-tikka-masala')).toBe('Chicken tikka masala');
    expect(nameFromUrl('https://www.tiktok.com/@x/video/7291')).toBe('');
  });
});
