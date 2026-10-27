import { describe, expect, it } from 'vitest';
import { clock, stepTimers } from '../cook';

describe('stepTimers', () => {
  it('finds minutes, ranges and hours', () => {
    expect(stepTimers('Simmer on low for 20–25 minutes until the sauce thickens.')).toEqual([{ secs: 1200, label: '20 min' }]);
    expect(stepTimers('Add garlic for 30 seconds, then the salmon for 3 minutes.')).toEqual([{ secs: 30, label: '30 sec' }, { secs: 180, label: '3 min' }]);
    expect(stepTimers('Bake at 180°C for 40 minutes, removing foil for the last 15 to brown the top.')).toEqual([{ secs: 2400, label: '40 min' }]);
    expect(stepTimers('Marinate for 2 hours or overnight.')).toEqual([{ secs: 7200, label: '2 hours' }]);
    expect(stepTimers('Cook 1 hour 30 min.')).toEqual([{ secs: 3600, label: '1 hour' }, { secs: 1800, label: '30 min' }]);
  });
  it('ignores temperatures and quantities', () => {
    expect(stepTimers('Heat the oven to 200°C and oil a 23 cm tin.')).toEqual([]);
  });
});

describe('clock', () => {
  it('formats a countdown', () => {
    expect(clock(1200)).toBe('20:00');
    expect(clock(65)).toBe('1:05');
    expect(clock(3661)).toBe('1:01:01');
    expect(clock(0)).toBe('0:00');
  });
});

import { stepIngredients } from '../cook';
describe('stepIngredients', () => {
  it('finds the ingredients a step talks about', () => {
    const ing: [string, string][] = [['garlic', '3 cloves'], ['x:salmon-fillets', '2'], ['broccoli', '1 head'], ['soy-sauce', '2 tbsp']];
    expect(stepIngredients('Add garlic for 30 seconds, then salmon. Toss gently for 3 minutes.', ing).map((i) => i[0])).toEqual(['garlic', 'x:salmon-fillets']);
    expect(stepIngredients('Heat the oven to 200°C.', ing)).toEqual([]);
  });
});
