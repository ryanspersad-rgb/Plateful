import { describe, expect, it } from 'vitest';
import { formatQty, parseAmount, scaleAmount } from '../scale';

describe('parseAmount', () => {
  it('reads integers, decimals, fractions and ranges', () => {
    expect(parseAmount('500g')).toEqual({ q: 500, rest: 'g' });
    expect(parseAmount('2 tbsp')).toEqual({ q: 2, rest: 'tbsp' });
    expect(parseAmount('1½ cups')).toEqual({ q: 1.5, rest: 'cups' });
    expect(parseAmount('1 1/2 cups')).toEqual({ q: 1.5, rest: 'cups' });
    expect(parseAmount('1/2 tsp')).toEqual({ q: 0.5, rest: 'tsp' });
    expect(parseAmount('½')).toEqual({ q: 0.5, rest: '' });
    expect(parseAmount('2–3 tbsp')).toEqual({ q: 2, q2: 3, rest: 'tbsp' });
    expect(parseAmount('1.5 kg')).toEqual({ q: 1.5, rest: 'kg' });
    expect(parseAmount('2 x 300g')).toEqual({ q: 2, rest: 'x 300g' });
  });
  it('leaves text without a quantity alone', () => {
    expect(parseAmount('handful')).toEqual({ q: null, rest: 'handful' });
    expect(parseAmount('to serve')).toEqual({ q: null, rest: 'to serve' });
    expect(parseAmount('pinch')).toEqual({ q: null, rest: 'pinch' });
  });
});

describe('formatQty', () => {
  it('prints cook-friendly fractions', () => {
    expect(formatQty(1.5)).toBe('1½');
    expect(formatQty(0.25)).toBe('¼');
    expect(formatQty(2 / 3)).toBe('⅔');
    expect(formatQty(3)).toBe('3');
    expect(formatQty(0.125)).toBe('⅛');
  });
});

describe('scaleAmount', () => {
  it('halves a recipe for a household of 2 from 4', () => {
    expect(scaleAmount('500g', 0.5)).toBe('250g');
    expect(scaleAmount('2 tbsp', 0.5)).toBe('1 tbsp');
    expect(scaleAmount('1 tbsp', 0.5)).toBe('½ tbsp');
    expect(scaleAmount('3 cloves', 0.5)).toBe('1½ cloves');
    expect(scaleAmount('1 large', 0.5)).toBe('½ large');
    expect(scaleAmount('400ml', 0.5)).toBe('200ml');
    expect(scaleAmount('1 lb', 0.5)).toBe('½ lb');
    expect(scaleAmount('2 cans', 0.5)).toBe('1 can');
  });
  it('scales up with sensible rounding', () => {
    expect(scaleAmount('500g', 1.5)).toBe('750g');
    expect(scaleAmount('330g', 1.5)).toBe('500g');
    expect(scaleAmount('1 tsp', 1.5)).toBe('1½ tsp');
    expect(scaleAmount('1 tsp', 1 / 3)).toBe('⅓ tsp');
    expect(scaleAmount('2–3 tbsp', 2)).toBe('4–6 tbsp');
    expect(scaleAmount('1.5 kg', 2)).toBe('3 kg');
    expect(scaleAmount('2 x 300g', 2)).toBe('4 x 300g');
    expect(scaleAmount('1 whole (800g)', 2)).toBe('2 whole (800g)');
  });
  it('never scales to nothing and keeps unquantified text', () => {
    expect(scaleAmount('1 tsp', 0.1)).toBe('⅛ tsp');
    expect(scaleAmount('1 large', 0.25)).toBe('½ large');
    expect(scaleAmount('handful', 2)).toBe('handful');
    expect(scaleAmount('to serve', 0.5)).toBe('to serve');
    expect(scaleAmount('500g', 1)).toBe('500g');
  });
});

describe('unit words agree with the scaled quantity', () => {
  it('singularises at one and pluralises above', () => {
    expect(scaleAmount('2 cloves', 0.5)).toBe('1 clove');
    expect(scaleAmount('1 can', 2)).toBe('2 cans');
    expect(scaleAmount('3 sprigs', 1 / 3)).toBe('1 sprig');
    expect(scaleAmount('1½ cups', 2)).toBe('3 cups');
    expect(scaleAmount('2 tbsp', 0.5)).toBe('1 tbsp');
    expect(scaleAmount('4 medium', 0.5)).toBe('2 medium');
  });
});
