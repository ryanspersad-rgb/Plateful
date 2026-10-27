/* ---------- catalogue (constants.ts, 430 recipes across 28 cuisines) ---------- */

export interface Ingredient {
  name: string;
  amount: string;
  inPantry: boolean;
  onSale?: boolean;
  salePrice?: string;
  retailer?: string;
}

export interface Recipe {
  id: string;
  name: string;
  image: string;
  prepTime: string;
  calories: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Confident';
  servings: number;
  tags: string[];
  matchScore: number;
  matchText: string;
  ingredients: Ingredient[];
  instructions: string[];
  savings?: string;
  totalCost?: string;
  teaches?: string[];
  hook?: string;
  dek?: string;
}

export interface Deal {
  id: string;
  item: string;
  price: string;
  originalPrice: string;
  retailer: string;
  category: string;
  expiry: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface MealPlanDay {
  day: string;
  recipes: Recipe[];
}

/* ---------- editorial market system (2026-10-26) ---------- */

export type StoreId = 'sw' | 'co' | 'nf' | 'wm' | 'ss' | 'tt' | 'cc';
export type Difficulty = 'Easy' | 'Medium' | 'Confident';

/** One item in this week's price book. `was` set = on sale this week at store `sid`. */
export interface BookItem {
  n: string;
  p: number;
  u?: string;
  was?: number;
  r: string;
  sid: StoreId;
  cat?: string;
  size?: string;
  ca?: boolean;
  promo?: Promotion;
}

export interface Promotion {
  placement: 'near_you' | 'featured' | 'deal_of_day' | 'sponsored_recipe';
  radiusKm: number;
  tags: string[];
  recipe: number;
}

export interface Store {
  id: StoreId;
  retailer: string;
  name: string;
  area: string;
  km: number;
  pm: boolean;
  ang: number;
  deals: number;
}

export interface Ad {
  sid: StoreId;
  price: number;
}

export interface PMRule {
  tier: 1 | 2;
  short: string;
  long: string;
}

/** A recipe in the editorial model: ingredient keys point into the price book. */
export interface EditorialRecipe {
  id: number;
  name: string;
  img: string;
  lead?: boolean;
  cuisine: string;
  meal: string;
  time: number;
  serv: number;
  diff: Difficulty;
  tags: string[];
  total: number;
  save: number;
  hook?: string;
  dek?: string;
  src?: string;
  /** External recipes: the original page. */
  url?: string;
  rating?: number;
  count?: number;
  /** Protein, carbs, fat, fibre in grams (photographed set only so far). */
  macros?: [number, number, number, number];
  ing: [string, string][];
  steps: string[];
  teaches: string[];
}

export interface TrendingRecipe {
  name: string;
  img: string;
  url: string;
  source: string;
  why: string;
  ing: string[];
}

export interface ListItem {
  key: string;
  name?: string;
  qty: string;
  n: number;
  sid: StoreId | 'any';
  done: boolean;
}

export interface Clip {
  src: string;
  name: string;
}

export interface UserProfile {
  name: string;
  householdSize: number;
  diets: string[];
  cuisines: string[];
  pantry: string[];
  favorites: number[];
  postalPrefix: string;
  radiusKm: number;
  alerts: boolean;
  imported: number[];
  cooked?: number[];
  history?: number[];
  /** Use-by dates per fridge key, ISO day. Staples carry none. */
  expiry?: Record<string, string>;
  /** Weekly grocery budget in dollars; unset until the shopper enters one. */
  weeklyBudget?: number;
  /** Loyalty cards kept on this phone: the number is drawn as a barcode at the till, never sent anywhere. */
  cards?: LoyaltyCard[];
  /** What the cook thought of a recipe after making it, by recipe id. */
  notes?: Record<number, RecipeNote>;
  /** Recipes the shopper linked from other sites, kept on this phone. */
  importedRecipes?: ImportedRecipe[];
}

export interface ImportedRecipe {
  id: number;
  name: string;
  url: string;
  /** "cooking.nytimes.com", "TikTok" … */
  source: string;
  img?: string;
  /** Price-book keys (x: when unpriced) and the amount as typed. */
  ing: [string, string][];
  steps: string[];
  serv: number;
  time?: number;
  added: string;
}

export interface RecipeNote {
  /** 0 = not rated. */
  stars: number;
  /** "I'd make it again" — lifts the recipe in recommendations. */
  again: boolean;
  note: string;
  at: string;
}

export type ProgramId = 'pco' | 'scene' | 'coop' | 'airmiles' | 'costco' | 'other';

export interface LoyaltyCard {
  id: string;
  program: ProgramId;
  /** Digits only. */
  number: string;
  /** Store name for an "other" card. */
  label?: string;
  added: string;
}

export interface LoyaltyProgram {
  id: ProgramId;
  name: string;
  /** Stores in the price book that take this card. */
  stores: StoreId[];
  /** Where else it is used, for the picker. */
  also: string;
  hint: string;
  /** Expected digit counts; empty = any length from 6 to 20. */
  digits: number[];
}

/** This week's dinners, recipe ids per day (Monday first). Persisted as plateful_mealplan. */
export type WeekPlan = Record<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday', number[]>;

export interface RecipeStatus {
  missing: string[];
  saleHits: number;
  fridgeHits: number;
  cost: number;
  have: number;
  of: number;
}

export interface CookLevel {
  name: 'Beginner' | 'Home cook' | 'Confident';
  pts: number;
  next: string | null;
  need: number;
  pct: number;
  cooked: number;
}

export interface TillMatch {
  item: ListItem;
  here: number;
  ad: Ad;
  save: number;
}

export interface TillPlan {
  s: Store;
  total: number;
  saved: number;
  matches: TillMatch[];
  rule: PMRule;
}

export type Screen =
  | 'splash'
  | 'onboarding'
  | 'home'
  | 'detail'
  | 'onsale'
  | 'list'
  | 'pricematch'
  | 'till'
  | 'camera'
  | 'stores'
  | 'fridge'
  | 'favourites'
  | 'history'
  | 'profile'
  | 'import'
  | 'plan'
  | 'wallet'
  | 'card'
  | 'cook'
  // legacy screens (HomeLegacy.tsx)
  | 'deals'
  | 'pantry'
  | 'mealplan';
