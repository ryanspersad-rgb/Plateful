// Loyalty card wallet. A card is a number the shopper types once; the app draws it as a barcode at the till.
// Nothing is linked: no balance, no history, no retailer account — the cashier scans the barcode exactly as they would the plastic card.
import type { LoyaltyCard, LoyaltyProgram, ProgramId, StoreId, UserProfile } from '@/lib/types';

export const PROGRAMS: LoyaltyProgram[] = [
  { id: 'pco', name: 'PC Optimum', stores: ['ss', 'nf'], also: 'Superstore, No Frills, Shoppers, Esso', hint: 'The 16-digit number on the back of the card or in the PC Optimum app', digits: [16] },
  { id: 'scene', name: 'Scene+', stores: ['sw'], also: 'Safeway, Sobeys, Cineplex', hint: 'The 16-digit Scene+ number from the card or app', digits: [16] },
  { id: 'coop', name: 'Calgary Co-op', stores: ['co'], also: 'Co-op food stores, gas bars, liquor', hint: 'Your Co-op membership number', digits: [] },
  { id: 'costco', name: 'Costco membership', stores: ['cc'], also: 'Shown at the door and the till', hint: 'The 12-digit number on the front of the card', digits: [12] },
  { id: 'airmiles', name: 'Air Miles', stores: [], also: 'Shell, Rexall and other partners', hint: 'Your 11-digit collector number', digits: [11] },
  { id: 'other', name: 'Another store card', stores: [], also: 'Any card with a number or barcode', hint: 'The number printed under the barcode', digits: [] },
];

export const PROGRAM = (id: ProgramId): LoyaltyProgram => PROGRAMS.find((p) => p.id === id) || PROGRAMS[PROGRAMS.length - 1];

/** The program a store scans at its till, if any. */
export const programFor = (sid: StoreId): LoyaltyProgram | undefined => PROGRAMS.find((p) => p.stores.includes(sid));

/** The shopper's card for a store, if they have added one. */
export const cardFor = (u: UserProfile, sid: StoreId): LoyaltyCard | undefined => {
  const p = programFor(sid);
  return p ? (u.cards || []).find((c) => c.program === p.id) : undefined;
};

export const cardName = (c: LoyaltyCard): string => (c.program === 'other' && c.label ? c.label : PROGRAM(c.program).name);

export const cleanNumber = (raw: string): string => raw.replace(/\D+/g, '');

/** Groups of four, as printed on most cards. */
export const groupNumber = (n: string): string => n.replace(/(.{4})(?=.)/g, '$1 ');

export const maskNumber = (n: string): string => (n.length > 4 ? `•••• ${n.slice(-4)}` : n);

/** Blocks saving. */
export const numberError = (n: string): string | null =>
  !n ? 'Type the number on the card.' : n.length < 6 || n.length > 20 ? 'Card numbers are 6 to 20 digits.' : null;

/** A soft warning: the number can still be saved. */
export function numberWarning(program: ProgramId, n: string): string | null {
  const p = PROGRAM(program);
  if (!n || !p.digits.length || p.digits.includes(n.length)) return null;
  return `${p.name} numbers are usually ${p.digits.join(' or ')} digits; this one is ${n.length}. Save it if it matches the card.`;
}

export const newCard = (program: ProgramId, number: string, label?: string): LoyaltyCard => ({
  id: `${program}-${Date.now().toString(36)}`,
  program,
  number,
  label: label?.trim() || undefined,
  added: new Date().toISOString().slice(0, 10),
});
