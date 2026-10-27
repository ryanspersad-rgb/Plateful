// Linked recipes: a recipe from any site, TikTok, Instagram or YouTube that the shopper keeps in Plateful.
// The link opens the original; the ingredient list the shopper pastes is matched to the price book so the recipe
// ranks, prices and shops like every other one. Everything stays on the phone (plateful_onboarded.importedRecipes).
import type { Difficulty, EditorialRecipe, ImportedRecipe } from '@/lib/types';
import { BOOK, SALE_KEYS } from './book';
import { keyFor } from './catalogue';
import { parseAmount } from './scale';

export const IMPORTED_ID_BASE = 5000;

const UNIT_WORDS: Record<string, string> = {
  tablespoons: 'tbsp', tablespoon: 'tbsp', tbsps: 'tbsp', tbsp: 'tbsp', tbs: 'tbsp',
  teaspoons: 'tsp', teaspoon: 'tsp', tsps: 'tsp', tsp: 'tsp',
  cups: 'cups', cup: 'cup', grams: 'g', gram: 'g', g: 'g', kilograms: 'kg', kilogram: 'kg', kg: 'kg',
  millilitres: 'ml', milliliters: 'ml', ml: 'ml', litres: 'L', liters: 'L', litre: 'L', liter: 'L', l: 'L',
  pounds: 'lb', pound: 'lb', lbs: 'lb', lb: 'lb', ounces: 'oz', ounce: 'oz', oz: 'oz',
  cloves: 'cloves', clove: 'clove', cans: 'cans', can: 'can', tins: 'cans', tin: 'can', jar: 'jar',
  large: 'large', medium: 'medium', small: 'small', bunch: 'bunch', bunches: 'bunches', sprigs: 'sprigs', sprig: 'sprig',
  slices: 'slices', slice: 'slice', head: 'head', heads: 'heads', stalks: 'stalks', stalk: 'stalk', sticks: 'sticks', stick: 'stick',
  pinch: 'pinch', handful: 'handful', packages: 'packs', package: 'pack', packs: 'packs', pack: 'pack', pkg: 'pack', pieces: 'pieces', piece: 'piece',
};
const PREP = new Set(['fresh', 'freshly', 'chopped', 'minced', 'diced', 'sliced', 'grated', 'shredded', 'crushed', 'peeled', 'finely', 'roughly', 'thinly', 'large', 'medium', 'small', 'ripe', 'boneless', 'skinless', 'bone-in', 'skin-on', 'cooked', 'uncooked', 'raw', 'frozen', 'canned', 'dried', 'whole', 'extra', 'virgin', 'kosher', 'flaky', 'unsalted', 'salted', 'plain', 'of', 'a', 'an', 'the', 'to', 'taste', 'for', 'serving', 'garnish', 'optional', 'about', 'approx', 'approximately', 'plus', 'more', 'divided', 'your', 'choice', 'good', 'quality']);

export interface ParsedLine {
  key: string;
  amount: string;
  name: string;
  priced: boolean;
}

/** "2 tablespoons olive oil, plus more for drizzling" → { key: 'olive-oil', amount: '2 tbsp', name: 'Olive oil' } */
export function parseIngredientLine(line: string): ParsedLine | null {
  let t = line.replace(/^\s*(?:[-•*·▢☐]|\d+[.)])\s*/, '').replace(/\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim();
  if (!t || /^(ingredients?|for the .*|method|instructions?|directions?)\s*:?$/i.test(t)) return null;
  const p = parseAmount(t);
  let rest = p.rest;
  let amount = p.q !== null ? t.slice(0, t.length - rest.length).trim() : '';
  // the unit, when the amount has one
  const words = rest.split(' ');
  if (p.q !== null && words.length && UNIT_WORDS[words[0].toLowerCase().replace(/[.,]$/, '')]) {
    amount = `${amount} ${UNIT_WORDS[words[0].toLowerCase().replace(/[.,]$/, '')]}`.trim();
    words.shift();
    if (words[0] && words[0].toLowerCase() === 'of') words.shift();
  }
  rest = words.join(' ').replace(/[.;:]+$/, '').trim();
  if (!rest) return null;
  // match against the whole line ("boneless, skinless chicken thighs" still finds chicken thighs); the shown name is the part before a comma
  const key = bestKey(rest.replace(/,/g, ' '));
  const first = rest.split(',')[0].trim();
  const shown = first.split(/\s+/).every((w) => PREP.has(w.toLowerCase())) ? rest.replace(/,/g, '') : first;
  return { key, amount, name: BOOK[key] ? BOOK[key].n : tidy(shown), priced: !!BOOK[key] };
}

/** Try the whole name, then every shorter run of words, and prefer a priced key; otherwise an x: key from the cleaned name. */
function bestKey(name: string): string {
  const toks = name.toLowerCase().replace(/[^a-z0-9 -]+/g, ' ').split(/\s+/).filter(Boolean);
  for (let len = toks.length; len >= 1; len--) {
    for (let i = 0; i + len <= toks.length; i++) {
      const k = keyFor(toks.slice(i, i + len).join(' '));
      if (BOOK[k]) return k;
    }
  }
  const clean = toks.filter((w) => !PREP.has(w));
  return keyFor((clean.length ? clean : toks).join(' '));
}

const tidy = (s: string): string => {
  const w = s.trim().split(/\s+/).filter((x) => !PREP.has(x.toLowerCase()) || x.toLowerCase() === 'ground');
  const out = (w.length ? w : s.trim().split(/\s+/)).join(' ');
  return out.charAt(0).toUpperCase() + out.slice(1);
};

/** A pasted block: optional "Ingredients" heading, the list, then "Method"/"Instructions"/"Directions" and the steps. */
export function splitPaste(text: string): { ing: string[]; steps: string[] } {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const at = lines.findIndex((l) => /^(method|instructions?|directions?|steps|preparation|to make)\b/i.test(l));
  const ing = (at >= 0 ? lines.slice(0, at) : lines).filter((l) => !/^ingredients?\s*:?$/i.test(l));
  const steps = at >= 0 ? lines.slice(at + 1) : [];
  return { ing, steps: steps.map(cleanStep).filter(Boolean) };
}

export const cleanStep = (s: string): string => s.replace(/^\s*(?:step\s*)?\d+\s*[.):-]?\s*/i, '').trim();

export function parseIngredients(text: string): ParsedLine[] {
  return text.split(/\r?\n/).map(parseIngredientLine).filter((x): x is ParsedLine => !!x);
}

const SOURCES: [RegExp, string][] = [[/tiktok\.com/i, 'TikTok'], [/instagram\.com/i, 'Instagram'], [/youtu\.?be/i, 'YouTube'], [/pinterest\./i, 'Pinterest'], [/facebook\.com|fb\.watch/i, 'Facebook']];

/** "cooking.nytimes.com" or "TikTok". */
export function sourceOf(url: string): string {
  const hit = SOURCES.find(([re]) => re.test(url));
  if (hit) return hit[1];
  try { return new URL(url.includes('://') ? url : `https://${url}`).hostname.replace(/^www\./, ''); } catch { return 'the web'; }
}

export const isUrl = (s: string): boolean => /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(:\d+)?(\/\S*)?$/i.test(s.trim()) || /^https?:\/\/(localhost|\d{1,3}(\.\d{1,3}){3})(:\d+)?(\/\S*)?$/i.test(s.trim());

export const normalizeUrl = (s: string): string => (s.includes('://') ? s.trim() : `https://${s.trim()}`);

/** A name guessed from the link's path, for sites that put the title in the slug; empty for video links. */
export function nameFromUrl(url: string): string {
  try {
    const u = new URL(normalizeUrl(url));
    if (SOURCES.slice(0, 3).some(([re]) => re.test(url))) return '';
    const seg = u.pathname.split('/').filter(Boolean).map((x) => decodeURIComponent(x)).reverse().find((x) => /[a-z]{3,}/i.test(x) && !/^\d+$/.test(x));
    if (!seg) return '';
    const words = seg.replace(/\.(html?|php|aspx?)$/i, '').replace(/^\d+[-_]/, '').split(/[-_+]+/).filter((w) => w && !/^\d+$/.test(w) && w.length < 24);
    if (words.length < 2) return '';
    const t = words.join(' ');
    return t.charAt(0).toUpperCase() + t.slice(1);
  } catch { return ''; }
}

const diffFor = (n: number): Difficulty => (n <= 7 ? 'Easy' : n <= 12 ? 'Medium' : 'Confident');

/** The linked recipe as the app sees every recipe: priced by the pack against this week's flyers. */
export function toRecipe(x: ImportedRecipe): EditorialRecipe {
  const priced = x.ing.filter(([k]) => BOOK[k]);
  const total = priced.reduce((a, [k]) => a + BOOK[k].p, 0);
  const save = priced.reduce((a, [k]) => a + (SALE_KEYS.includes(k) && BOOK[k].was ? BOOK[k].was - BOOK[k].p : 0), 0);
  return {
    id: x.id,
    name: x.name,
    img: x.img || '',
    cuisine: 'Your recipes',
    meal: 'Dinner',
    time: x.time || 30,
    serv: x.serv || 4,
    diff: diffFor(x.ing.length),
    tags: ['Linked'],
    total: Math.round(total * 100) / 100,
    save: Math.round(save * 100) / 100,
    src: x.source,
    url: x.url,
    dek: x.steps.length ? undefined : 'The method lives on the original page; Plateful keeps the list priced and shoppable.',
    ing: x.ing,
    steps: x.steps,
    teaches: [],
  };
}

export const newImported = (f: { url: string; name: string; ing: [string, string][]; steps: string[]; serv: number; time?: number; img?: string }, existing: ImportedRecipe[]): ImportedRecipe => ({
  id: IMPORTED_ID_BASE + (existing.length ? Math.max(...existing.map((r) => r.id - IMPORTED_ID_BASE)) + 1 : 0),
  name: f.name.trim(),
  url: normalizeUrl(f.url),
  source: sourceOf(f.url),
  img: f.img?.trim() || undefined,
  ing: f.ing,
  steps: f.steps,
  serv: f.serv,
  time: f.time,
  added: new Date().toISOString().slice(0, 10),
});
