// Servings scaling: amounts are free text ("500g", "2 tbsp", "1½ cups", "3 cloves", "2 x 300g", "handful"),
// so scaling parses the leading quantity, multiplies it, and writes it back in the form a cook expects —
// quarter and third fractions for spoons and cups, halves for whole items, sensible rounding for grams and millilitres.

const VULGAR: Record<string, number> = { '½': 0.5, '¼': 0.25, '¾': 0.75, '⅓': 1 / 3, '⅔': 2 / 3, '⅛': 0.125 };
const VULGAR_OUT: [number, string][] = [[0.125, '⅛'], [0.25, '¼'], [1 / 3, '⅓'], [0.5, '½'], [2 / 3, '⅔'], [0.75, '¾']];

export interface ParsedAmount {
  /** The leading quantity, or null when the text has none ("to serve", "handful"). */
  q: number | null;
  /** The upper end of a range ("2–3 tbsp"). */
  q2?: number;
  /** Everything after the quantity, trimmed ("g", "tbsp", "large", "x 300g"). */
  rest: string;
}

// mixed fractions first so "1 1/2" is not read as "1" followed by "1/2 cups"
const NUM = String.raw`(\d+\s+\d+/\d+|\d+/\d+|\d+(?:\.\d+)?(?:\s*[½¼¾⅓⅔⅛])?|[½¼¾⅓⅔⅛])`;
const LEAD = new RegExp(String.raw`^\s*${NUM}(?:\s*[–-]\s*${NUM})?\s*(.*)$`, 'u');

function toNumber(t: string): number {
  t = t.trim();
  if (t in VULGAR) return VULGAR[t];
  const m = t.match(/^(\d+)\s*([½¼¾⅓⅔⅛])$/);
  if (m) return Number(m[1]) + VULGAR[m[2]];
  const mixed = t.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (mixed) return Number(mixed[1]) + Number(mixed[2]) / Number(mixed[3]);
  const frac = t.match(/^(\d+)\/(\d+)$/);
  if (frac) return Number(frac[1]) / Number(frac[2]);
  return Number(t);
}

export function parseAmount(a: string): ParsedAmount {
  const m = a.match(LEAD);
  if (!m) return { q: null, rest: a.trim() };
  const q = toNumber(m[1]);
  if (!Number.isFinite(q)) return { q: null, rest: a.trim() };
  const out: ParsedAmount = { q, rest: (m[3] || '').trim() };
  if (m[2]) out.q2 = toNumber(m[2]);
  return out;
}

const SPOON = /^(tsp|tbsp|teaspoons?|tablespoons?|cups?|lb|lbs|pounds?|oz)\b/i;
const METRIC = /^(g|kg|ml|l)\b/i;

/** Round a scaled quantity the way a recipe would print it. */
export function roundQty(q: number, unit: string): number {
  if (METRIC.test(unit)) {
    const u = unit.toLowerCase();
    if (u.startsWith('kg') || u === 'l') return Math.round(q * 20) / 20; // 0.05 kg / L
    if (q >= 500) return Math.round(q / 25) * 25;
    if (q >= 100) return Math.round(q / 10) * 10;
    if (q >= 20) return Math.round(q / 5) * 5;
    return Math.round(q);
  }
  if (SPOON.test(unit)) return Math.round(q * 8) / 8; // eighths, shown as fractions
  return Math.round(q * 2) / 2; // whole items in halves
}

/** "1.5" → "1½", "0.33" → "⅓", "2" → "2". */
export function formatQty(q: number): string {
  const whole = Math.floor(q + 1e-9);
  const frac = q - whole;
  if (frac < 0.0625) return String(whole);
  const v = VULGAR_OUT.reduce((best, cur) => (Math.abs(cur[0] - frac) < Math.abs(best[0] - frac) ? cur : best));
  if (Math.abs(v[0] - frac) > 0.07) return String(Math.round(q * 100) / 100);
  return whole ? `${whole}${v[1]}` : v[1];
}

/** Scale an amount string by a factor; text without a quantity comes back unchanged. */
export function scaleAmount(a: string, f: number): string {
  if (f === 1) return a;
  const p = parseAmount(a);
  if (p.q === null) return a;
  const unit = p.rest.split(/\s+/)[0] || '';
  const one = (q: number) => {
    const r = roundQty(q * f, unit);
    return formatQty(r <= 0 ? roundQty(Math.max(q * f, 0.125), unit) || 0.125 : r);
  };
  const qty = p.q2 !== undefined ? `${one(p.q)}–${one(p.q2)}` : one(p.q);
  // keep the spacing the original used between the number and the unit ("500g" vs "2 tbsp")
  const glued = /^\s*[\d½¼¾⅓⅔⅛./ ]+[a-zA-Z]/.test(a) && !/\d\s+[a-zA-Z]/.test(a) && !/[½¼¾⅓⅔⅛]\s+[a-zA-Z]/.test(a);
  const rest = p.q2 === undefined ? agreeUnit(p.rest, roundQty(p.q * f, unit)) : p.rest;
  return rest ? `${qty}${glued ? '' : ' '}${rest}` : qty;
}

// Countable unit words agree with the scaled quantity: "2 cloves" halved is "1 clove", "1 can" doubled is "2 cans".
const COUNT_UNITS: Record<string, string> = {
  clove: 'cloves', sprig: 'sprigs', stalk: 'stalks', can: 'cans', tin: 'tins', slice: 'slices', head: 'heads', piece: 'pieces',
  fillet: 'fillets', wedge: 'wedges', bunch: 'bunches', cup: 'cups', stick: 'sticks', leaf: 'leaves', strip: 'strips', sheet: 'sheets', egg: 'eggs',
};
const SINGULAR = Object.fromEntries(Object.entries(COUNT_UNITS).map(([s, pl]) => [pl, s]));
function agreeUnit(rest: string, q: number): string {
  const m = rest.match(/^(\S+)(.*)$/);
  if (!m) return rest;
  const w = m[1].toLowerCase();
  const want = q <= 1 ? SINGULAR[w] : COUNT_UNITS[w];
  return want ? want + m[2] : rest;
}

/** Scaled ingredient list for a recipe at `servings`. */
export function scaleIngredients(ing: [string, string][], from: number, servings: number): [string, string][] {
  const f = from > 0 ? servings / from : 1;
  return ing.map(([k, a]) => [k, scaleAmount(a, f)]);
}
