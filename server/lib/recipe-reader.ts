// Reads a recipe out of a web page. Most recipe sites publish schema.org/Recipe as JSON-LD; this pulls the name,
// photo, ingredient lines, steps, yield and time from it, and falls back to Open Graph tags when there is none.
// Pure functions over HTML text, so they are unit-tested without the network.

export interface ReadRecipe {
  name: string;
  image?: string;
  ingredients: string[];
  steps: string[];
  servings?: number;
  minutes?: number;
  description?: string;
  /** Where the data came from: 'jsonld', 'og' or 'none'. */
  via: 'jsonld' | 'og' | 'none';
}

type J = Record<string, unknown>;
const isObj = (x: unknown): x is J => !!x && typeof x === 'object' && !Array.isArray(x);
const str = (x: unknown): string => (typeof x === 'string' ? x : typeof x === 'number' ? String(x) : '');

/** Every <script type="application/ld+json"> block, parsed; broken blocks are skipped. */
export function jsonLdBlocks(html: string): unknown[] {
  const out: unknown[] = [];
  const re = /<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const m of html.matchAll(re)) {
    const raw = m[1].trim().replace(/^<!--/, '').replace(/-->$/, '').trim();
    try { out.push(JSON.parse(raw)); } catch { /* some sites ship invalid JSON; try a loose repair for trailing commas */
      try { out.push(JSON.parse(raw.replace(/,\s*([}\]])/g, '$1'))); } catch { /* skip */ }
    }
  }
  return out;
}

const typeOf = (n: J): string[] => { const t = n['@type']; return Array.isArray(t) ? t.map(str) : [str(t)]; };

/** Depth-first search for a node whose @type is Recipe, through @graph, arrays and nested objects. */
export function findRecipeNode(root: unknown, depth = 0): J | null {
  if (depth > 6) return null;
  if (Array.isArray(root)) { for (const x of root) { const r = findRecipeNode(x, depth + 1); if (r) return r; } return null; }
  if (!isObj(root)) return null;
  if (typeOf(root).includes('Recipe')) return root;
  for (const k of ['@graph', 'mainEntity', 'mainEntityOfPage', 'itemListElement', 'hasPart']) {
    if (root[k] !== undefined) { const r = findRecipeNode(root[k], depth + 1); if (r) return r; }
  }
  return null;
}

/** "PT1H30M" → 90; "PT45M" → 45; "1 hour 15 mins" → 75. */
export function isoMinutes(x: unknown): number | undefined {
  const s = str(x).trim();
  if (!s) return undefined;
  const iso = s.match(/^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/i);
  if (iso) {
    const m = (Number(iso[1] || 0) * 24 * 60) + Number(iso[2] || 0) * 60 + Number(iso[3] || 0) + Math.round(Number(iso[4] || 0) / 60);
    return m > 0 ? m : undefined;
  }
  let m = 0;
  for (const h of s.matchAll(/(\d+(?:\.\d+)?)\s*(hours?|hrs?|h)\b/gi)) m += Number(h[1]) * 60;
  for (const n of s.matchAll(/(\d+)\s*(minutes?|mins?|m)\b/gi)) m += Number(n[1]);
  return m > 0 ? Math.round(m) : undefined;
}

/** "4 servings", ["6", "6 servings"], 8 → the first number. */
export function yieldCount(x: unknown): number | undefined {
  const list = Array.isArray(x) ? x : [x];
  for (const v of list) {
    const m = str(v).match(/\d+/);
    if (m) { const n = Number(m[0]); if (n > 0 && n <= 100) return n; }
  }
  return undefined;
}

/** A string, an ImageObject, or an array of either → one URL. */
export function imageUrl(x: unknown): string | undefined {
  const list = Array.isArray(x) ? x : [x];
  for (const v of list) {
    if (typeof v === 'string' && /^https?:\/\//.test(v)) return v;
    if (isObj(v)) { const u = str(v.url) || str(v.contentUrl); if (/^https?:\/\//.test(u)) return u; }
  }
  return undefined;
}

const clean = (s: string): string => decode(s).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

/** Strings, HowToStep objects, HowToSection objects with itemListElement, or one block of text split into sentences/lines. */
export function stepsOf(x: unknown): string[] {
  const out: string[] = [];
  const walk = (v: unknown) => {
    if (typeof v === 'string') { out.push(...splitSteps(v)); return; }
    if (Array.isArray(v)) { v.forEach(walk); return; }
    if (isObj(v)) {
      if (v.itemListElement !== undefined) { walk(v.itemListElement); return; }
      const t = str(v.text) || str(v.name) || str(v.description);
      if (t) out.push(clean(t));
    }
  };
  walk(x);
  return out.map((s) => s.replace(/^\s*(?:step\s*)?\d+\s*[.):-]\s*/i, '').trim()).filter((s) => s.length > 1);
}

function splitSteps(text: string): string[] {
  const t = clean(text);
  const byLine = text.split(/\r?\n+/).map(clean).filter(Boolean);
  if (byLine.length > 1) return byLine;
  // one paragraph: split on sentence ends only when it is long
  if (t.length > 220) return t.split(/(?<=[.!?])\s+(?=[A-Z])/).map((s) => s.trim()).filter((s) => s.length > 12);
  return t ? [t] : [];
}

export function ingredientsOf(x: unknown): string[] {
  const list = Array.isArray(x) ? x : typeof x === 'string' ? x.split(/\r?\n+/) : [];
  return list.map((v) => clean(str(v))).filter(Boolean);
}

const ENT: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', frac12: '½', frac14: '¼', frac34: '¾', deg: '°', ndash: '–', mdash: '—', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', hellip: '…' };
export const decode = (s: string): string =>
  s.replace(/&(#x[0-9a-f]+|#\d+|[a-z0-9]+);/gi, (m, e: string) => {
    if (e[0] === '#') { const code = e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10); return Number.isFinite(code) ? String.fromCodePoint(code) : m; }
    return ENT[e.toLowerCase()] ?? m;
  });

function meta(html: string, prop: string): string | undefined {
  const re = new RegExp(`<meta[^>]+(?:property|name)\\s*=\\s*["']${prop}["'][^>]*content\\s*=\\s*["']([^"']*)["']`, 'i');
  const re2 = new RegExp(`<meta[^>]+content\\s*=\\s*["']([^"']*)["'][^>]*(?:property|name)\\s*=\\s*["']${prop}["']`, 'i');
  const m = html.match(re) || html.match(re2);
  return m ? decode(m[1]).trim() : undefined;
}

/** The recipe on a page, from JSON-LD when there is one, else what Open Graph gives (name and photo only). */
export function readRecipe(html: string): ReadRecipe {
  for (const block of jsonLdBlocks(html)) {
    const node = findRecipeNode(block);
    if (!node) continue;
    const ingredients = ingredientsOf(node.recipeIngredient ?? node.ingredients);
    const steps = stepsOf(node.recipeInstructions);
    if (!ingredients.length && !steps.length) continue;
    return {
      name: clean(str(node.name) || str(node.headline)),
      image: imageUrl(node.image),
      ingredients,
      steps,
      servings: yieldCount(node.recipeYield),
      minutes: isoMinutes(node.totalTime) ?? ((isoMinutes(node.prepTime) || 0) + (isoMinutes(node.cookTime) || 0) || undefined),
      description: clean(str(node.description)).slice(0, 240) || undefined,
      via: 'jsonld',
    };
  }
  const name = meta(html, 'og:title') || meta(html, 'twitter:title') || clean((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '');
  const image = meta(html, 'og:image') || meta(html, 'twitter:image');
  const description = meta(html, 'og:description') || meta(html, 'description');
  return { name: name.replace(/\s*[|\-–—]\s*[^|\-–—]{0,40}$/, '').trim(), image, ingredients: [], steps: [], description, via: name ? 'og' : 'none' };
}

/** A video caption ("TikTok" / YouTube description): the lines that look like ingredients, then the rest as steps. */
export function readCaption(caption: string): { ingredients: string[]; steps: string[] } {
  const lines = caption.split(/\r?\n+/).map((l) => l.replace(/^[\s\-•*·▢☐]+/, '').trim()).filter((l) => l && !/^#|^@/.test(l) && l.length < 160);
  const ing = lines.filter((l) => /^(\d|½|¼|¾|⅓|⅔|a (pinch|handful|splash|knob)|pinch|handful|salt|pepper)/i.test(l) && l.split(' ').length <= 12);
  const rest = lines.filter((l) => !ing.includes(l) && /\b(add|mix|stir|cook|bake|fry|heat|simmer|whisk|chop|season|serve|boil|roast|grill|blend|pour|fold|rest)\b/i.test(l));
  return { ingredients: ing, steps: rest };
}
