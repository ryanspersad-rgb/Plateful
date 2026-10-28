// The full recipe pool: the 58 photographed editorial recipes first, then the 430-recipe
// catalogue from constants.ts adapted into the editorial model so every cuisine tab has results
// and every recipe can be priced, scored and added to the list the same way.
import type { EditorialRecipe, Recipe } from '@/lib/types';
import { CATEGORIES, RECIPES as CATALOGUE } from '@/lib/constants';
import { BOOK } from './book';
import { EDITORIAL_RECIPES } from './recipes';

export const LEGACY_ID_BASE = 1000;

/** Catalogue ingredient names that map onto a price-book key. Anything else is "unpriced". */
const ALIASES: Record<string, string> = {
  'chicken thighs': 'chicken-thighs', 'chicken thigh': 'chicken-thighs', 'chicken pieces': 'chicken-thighs',
  'chicken breast': 'chicken-breast', 'chicken breasts': 'chicken-breast', 'whole chicken': 'whole-chicken',
  'ground beef': 'ground-beef', 'beef mince': 'ground-beef', 'flank steak': 'flank-steak', 'beef chuck': 'beef-chuck',
  'salmon': 'salmon', 'salmon fillets': 'salmon', 'salmon fillet': 'salmon', 'shrimp': 'shrimp', 'prawns': 'shrimp',
  'pork tenderloin': 'pork-tenderloin', 'pork shoulder': 'pork-shoulder', 'pork belly': 'pork-belly', 'ground pork': 'ground-pork',
  'bacon': 'bacon', 'sausages': 'sausages', 'sausage': 'sausages',
  'eggs': 'eggs', 'egg': 'eggs', 'egg yolks': 'eggs', 'butter': 'butter', 'milk': 'milk', 'whole milk': 'milk',
  'heavy cream': 'cream', 'cream': 'cream', 'sour cream': 'sour-cream', 'yogurt': 'yogurt', 'greek yogurt': 'yogurt',
  'parmesan': 'parmesan', 'parmesan cheese': 'parmesan', 'cheddar': 'cheddar', 'cheddar cheese': 'cheddar', 'aged cheddar': 'cheddar',
  'mozzarella': 'mozzarella', 'fresh mozzarella': 'mozzarella', 'feta': 'feta', 'feta cheese': 'feta',
  'garlic': 'garlic', 'onion': 'onion', 'onions': 'onion', 'red onion': 'onion', 'yellow onion': 'onion',
  'lemon': 'lemon', 'lemon juice': 'lemon', 'lime': 'lime', 'lime juice': 'lime', 'limes': 'lime',
  'carrots': 'carrots', 'carrot': 'carrots', 'broccoli': 'broccoli', 'potatoes': 'potatoes', 'potato': 'potatoes', 'russet potatoes': 'potatoes',
  'sweet potatoes': 'sweet-potatoes', 'avocados': 'avocado', 'avocado': 'avocado', 'bell peppers': 'peppers', 'bell pepper': 'peppers', 'red bell pepper': 'peppers',
  'tomatoes': 'tomatoes', 'cherry tomatoes': 'tomatoes', 'tomato': 'tomatoes', 'canned tomatoes': 'diced-tomatoes', 'diced tomatoes': 'diced-tomatoes', 'crushed tomatoes': 'diced-tomatoes',
  'apples': 'apples', 'bananas': 'bananas', 'cucumber': 'cucumber', 'green beans': 'green-beans', 'mushrooms': 'mushrooms',
  'romaine': 'romaine', 'romaine lettuce': 'romaine', 'spinach': 'spinach', 'cabbage': 'cabbage', 'celery': 'celery',
  'ginger': 'ginger', 'spring onions': 'green-onions', 'green onions': 'green-onions', 'scallions': 'green-onions',
  'cilantro': 'cilantro', 'coriander': 'cilantro', 'parsley': 'parsley', 'fresh parsley': 'parsley', 'basil': 'basil', 'fresh basil': 'basil',
  'thyme': 'thyme', 'rosemary': 'rosemary',
  'rice': 'rice', 'basmati rice': 'rice', 'long-grain rice': 'rice', 'jasmine rice': 'rice', 'arborio rice': 'arborio', 'short-grain rice': 'rice',
  'pasta': 'pasta', 'spaghetti': 'pasta', 'penne': 'pasta', 'rice noodles': 'rice-noodles', 'olive oil': 'olive-oil',
  'soy sauce': 'soy-sauce', 'flour': 'flour', 'all-purpose flour': 'flour', 'bread flour': 'flour',
  'white beans': 'white-beans', 'cannellini beans': 'white-beans', 'kidney beans': 'kidney-beans', 'black beans': 'black-beans', 'chickpeas': 'chickpeas',
  'chicken stock': 'chicken-broth', 'chicken broth': 'chicken-broth', 'coconut milk': 'coconut-milk', 'peas': 'peas', 'frozen peas': 'peas',
  'sourdough': 'sourdough', 'naan': 'naan', 'tortillas': 'tortillas', 'corn tortillas': 'tortillas', 'flour tortillas': 'tortillas', 'pizza dough': 'pizza-dough',
  'honey': 'honey', 'brown sugar': 'brown-sugar', 'pumpkin puree': 'pumpkin-puree', 'pumpkin purée': 'pumpkin-puree',
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Map a catalogue ingredient name to a price-book key, or an `x:` key when Plateful cannot price it yet. */
export function keyFor(name: string): string {
  const n = name.trim().toLowerCase();
  if (ALIASES[n] && BOOK[ALIASES[n]]) return ALIASES[n];
  const s = slug(n);
  if (BOOK[s]) return s;
  const hit = Object.keys(BOOK).find((k) => BOOK[k].n.toLowerCase() === n || BOOK[k].n.toLowerCase().startsWith(n + ','));
  return hit || 'x:' + s;
}

/** Display name for any ingredient key, priced or not. */
export function nameFor(key: string): string {
  if (BOOK[key]) return BOOK[key].n;
  const raw = key.replace(/^x:/, '').replace(/-/g, ' ');
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

const minutes = (s: string): number => {
  const h = /(\d+(?:\.\d+)?)\s*h/.exec(s);
  const m = /(\d+)\s*m/.exec(s);
  return Math.round((h ? parseFloat(h[1]) * 60 : 0) + (m ? parseInt(m[1], 10) : 0)) || 30;
};
const dollars = (s?: string): number => (s ? parseFloat(s.replace(/[^0-9.]/g, '')) || 0 : 0);
const MEALS = ['Breakfast', 'Lunch', 'Dinner'];

export function fromCatalogue(r: Recipe, idx: number): EditorialRecipe {
  const diff = r.difficulty === 'Hard' ? 'Confident' : r.difficulty;
  const ing = r.ingredients.map((i) => [keyFor(i.name), i.amount] as [string, string]);
  const cuisine = r.tags[0] || 'Weeknight';
  const meal = r.tags.find((t) => MEALS.includes(t)) || 'Dinner';
  const time = minutes(r.prepTime);
  const tags = r.tags.filter((t) => t !== cuisine && !MEALS.includes(t));
  if (time <= 30 && !tags.includes('Weeknight')) tags.push('Weeknight');
  return {
    id: LEGACY_ID_BASE + idx,
    name: r.name,
    img: r.image,
    cuisine,
    meal,
    time,
    serv: r.servings,
    diff,
    tags,
    total: dollars(r.totalCost),
    save: dollars(r.savings),
    hook: r.hook,
    dek: r.dek,
    ing,
    steps: r.instructions,
    teaches: r.teaches || [],
  };
}

/**
 * Catalogue recipes that are the same dish as another recipe (2026-10-28: Ryan saw pairs in the cuisine tabs).
 * Key: the catalogue slug to hide. Value: the recipe to keep — an editorial id (it has priced ingredients, macros and
 * the write-up) or another catalogue slug (the specific cuisine's copy over the Mediterranean one; the Thai name
 * over the English one). Hidden recipes stay in constants.ts; `R()` redirects their ids to the kept recipe so old
 * favourites, history, notes and plans still resolve, and the store migrates those ids on load.
 */
export const DUPLICATE_OF: Record<string, number | string> = {
  // the same dish as an editorial recipe
  'italian-spaghetti-bolognese': 6,
  'indian-butter-chicken-rice': 7,
  'mediterranean-shakshuka': 9,
  'thai-green-curry': 10,
  'chinese-fried-rice': 14,
  'italian-classic-margherita-pizza': 16,
  'mexican-chicken-quesadillas': 20,
  'greek-souvlaki': 26,
  'vietnamese-pho-bo': 28,
  'indian-chana-masala': 29,
  'indian-tikka-masala': 30,
  'indian-palak-paneer': 31,
  'indian-dal-tadka': 32,
  'indian-aloo-gobi': 33,
  'indian-keema-matar': 34,
  'thai-pad-see-ew': 35,
  'thai-tom-yum-soup': 36,
  'thai-thai-basil-chicken': 37,
  'thai-massaman-curry': 38,
  'mexican-carnitas': 42,
  'italian-minestrone-soup': 49,
  'italian-lasagna-bolognese': 50,
  // the same dish listed twice in the catalogue
  'mediterranean-moussaka': 'greek-moussaka',
  'mediterranean-baklava': 'greek-baklava',
  'mediterranean-tabbouleh': 'lebanese-tabbouleh',
  'mediterranean-baba-ganoush': 'lebanese-baba-ganoush',
  'mediterranean-fattoush': 'lebanese-fattoush',
  'mediterranean-kibbeh': 'lebanese-kibbeh',
  'thai-thai-coconut-soup': 'thai-tom-kha-gai',
};

const CATALOGUE_ID = new Map<string, number>(CATALOGUE.map((r, i) => [r.id, LEGACY_ID_BASE + i]));
const EDITORIAL_IDS = new Set(EDITORIAL_RECIPES.map((r) => r.id));

/** Hidden catalogue id → the id of the recipe shown in its place. */
export const CANONICAL = new Map<number, number>();
for (const [hide, keep] of Object.entries(DUPLICATE_OF)) {
  const from = CATALOGUE_ID.get(hide);
  const to = typeof keep === 'number' ? (EDITORIAL_IDS.has(keep) ? keep : undefined) : CATALOGUE_ID.get(keep);
  if (from === undefined || to === undefined || CANONICAL.has(to)) {
    if (import.meta.env.DEV) console.warn('DUPLICATE_OF: cannot resolve', hide, '→', keep);
    continue;
  }
  CANONICAL.set(from, to);
}

/** The id a recipe is shown under: a hidden duplicate's id maps to the kept recipe, every other id is its own. */
export const canonical = (id: number): number => CANONICAL.get(id) ?? id;
/** A saved id list (favourites, history, a plan day) with hidden duplicates redirected and repeats dropped, order kept. */
export const canonicalIds = (ids: number[]): number[] => Array.from(new Set(ids.map(canonical)));

/** The catalogue with its duplicates of editorial or other catalogue recipes left out. */
export const CATALOGUE_RECIPES: EditorialRecipe[] = CATALOGUE.map(fromCatalogue).filter((r) => !CANONICAL.has(r.id));

/** Every recipe Plateful can show: photographed editorial set first, then the catalogue. */
export const ALL_RECIPES: EditorialRecipe[] = [...EDITORIAL_RECIPES, ...CATALOGUE_RECIPES];

const byId = new Map<number, EditorialRecipe>(ALL_RECIPES.map((r) => [r.id, r]));

/** Recipes the shopper linked (ids from 5000), registered by the store whenever they change. */
const EXTRA = new Map<number, EditorialRecipe>();
export function registerLinked(list: EditorialRecipe[]): void {
  EXTRA.clear();
  list.forEach((r) => EXTRA.set(r.id, r));
}
export const linkedRecipes = (): EditorialRecipe[] => Array.from(EXTRA.values());
/** Every recipe the app can show: the editorial set, the catalogue and the shopper's linked recipes. */
export const allRecipes = (): EditorialRecipe[] => (EXTRA.size ? [...ALL_RECIPES, ...EXTRA.values()] : ALL_RECIPES);
export const R = (id: number): EditorialRecipe | undefined => byId.get(canonical(id)) ?? EXTRA.get(id);

/** Every cuisine/collection with at least one recipe, in catalogue order. */
export const CUISINE_TABS: string[] = Array.from(
  new Set(ALL_RECIPES.map((r) => r.cuisine).filter((c) => c !== 'Weeknight')),
);

/** The catalogue's cuisine categories (constants.ts CATEGORIES minus the generic ones), for the Home tab row after the editorial filters. */
const GENERIC = ['all', 'vegetarian', 'quick', 'meat', 'healthy', 'comfort', 'seafood'];
export const CATEGORIES_CUISINES: string[] = CATEGORIES
  .filter((c) => !GENERIC.includes(c.id))
  .map((c) => c.name)
  .concat(['Seafood', 'Healthy', 'Comfort']);
