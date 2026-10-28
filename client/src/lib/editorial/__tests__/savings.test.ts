import { describe, expect, it } from 'vitest';
import { defaultUsual, logDeal, logMatch, logRoute, projectSavings, savedThisMonth } from '../savings';
import { BOOK } from '../book';
import type { UserProfile } from '@/lib/types';

const u: UserProfile = { name: '', householdSize: 2, diets: [], cuisines: [], pantry: [], favorites: [], postalPrefix: 'T2P', radiusKm: 5, alerts: false, imported: [] };

describe('savings projection', () => {
  it('prices the usual shop at the nearest store against where Plateful sends you', () => {
    const p = projectSavings(defaultUsual(2), u);
    expect(p).not.toBeNull();
    expect(p!.withPlateful).toBeLessThan(p!.usual);
    expect(p!.monthly).toBeCloseTo((p!.weekly * 52) / 12, 5);
  });
  it('grows with the household and is null for an empty basket', () => {
    expect(projectSavings(defaultUsual(4), { ...u, householdSize: 4 })!.usual).toBeGreaterThan(projectSavings(defaultUsual(2), u)!.usual);
    expect(projectSavings([], u)).toBeNull();
  });
});

describe('savings ledger', () => {
  it('records matches, keeps one route entry a week, and takes back an unticked deal', () => {
    let x = logMatch(u, 2.5, 'Superstore');
    x = logRoute(x, 40, 35, 'No Frills');
    x = logRoute(x, 40, 33, 'No Frills');
    expect(x.savings!.filter((e) => e.kind === 'route')).toHaveLength(1);
    expect(savedThisMonth(x)).toBeCloseTo(9.5, 2);
    const k = Object.keys(BOOK).find((key) => BOOK[key].was)!;
    const item = { key: k, qty: '1', n: 1, sid: BOOK[k].sid, done: false };
    const withDeal = logDeal(x, item, true);
    expect(savedThisMonth(withDeal)).toBeGreaterThan(savedThisMonth(x));
    expect(savedThisMonth(logDeal(withDeal, item, false))).toBeCloseTo(savedThisMonth(x), 5);
  });
});

describe('savings summaries', () => {
  it('groups by month and by kind', async () => {
    const { savedByMonth, savedByKind } = await import('../savings');
    const x = logMatch(logMatch(u, 3, 'Superstore'), 2, 'Walmart');
    expect(savedByMonth(x, 3)[0].amt).toBeCloseTo(5, 5);
    expect(savedByMonth(x, 3)[1].amt).toBe(0);
    expect(savedByKind(x).match).toEqual({ amt: 5, n: 2 });
  });
});
