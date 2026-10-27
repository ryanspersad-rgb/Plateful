// App state for the editorial screens. One store, persisted to localStorage under the same keys
// the prototype and the legacy app use: plateful_onboarded, plateful_sale_selected, plateful_shoplist.
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { Clip, ListItem, ProgramId, RecipeNote, Screen, StoreId, UserProfile, WeekPlan } from '@/lib/types';
import { instacartList, readRecipePage } from '@/lib/api';
import {
  BOOK, DEFAULT_FRIDGE, R, STORE, cookLevel, money, status, type Ctx,
  DAYS, type Day, autoPlan, defaultExpiry, emptyPlan, planStats, withDefaultExpiry,
  cardName, cleanNumber, newCard, numberError, scaleIngredients,
  cleanStep, isUrl, nameFromUrl, newImported, parseIngredients, registerLinked, splitPaste, toRecipe,
} from '@/lib/editorial';

export const DEFAULT_USER: UserProfile = {
  name: '', householdSize: 2, diets: [], cuisines: ['Italian', 'Thai'], pantry: DEFAULT_FRIDGE.slice(),
  favorites: [6, 10], postalPrefix: 'T2P', radiusKm: 5, alerts: true, imported: [],
};

const DEFAULT_LIST: ListItem[] = [
  { key: 'chicken-thighs', qty: '3 lb', n: 3, sid: 'ss', done: false },
  { key: 'potatoes', qty: '10 lb bag', n: 1, sid: 'ss', done: false },
  { key: 'eggs', qty: '1 dozen', n: 1, sid: 'ss', done: false },
  { key: 'carrots', qty: '1 bunch', n: 1, sid: 'ss', done: true },
  { key: 'ground-beef', qty: '1 lb', n: 1, sid: 'sw', done: false },
  { key: 'pasta', qty: '400 g', n: 1, sid: 'sw', done: false },
  { key: 'parmesan', qty: '200 g', n: 1, sid: 'sw', done: false },
  { key: 'diced-tomatoes', qty: '3 cans', n: 3, sid: 'nf', done: false },
  { key: 'broccoli', qty: '2 crowns', n: 2, sid: 'nf', done: false },
];

const LS = {
  get<T>(k: string, d: T): T {
    try {
      const v = localStorage.getItem(k);
      return v ? (JSON.parse(v) as T) : d;
    } catch {
      return d;
    }
  },
  set(k: string, v: unknown) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch {
      /* storage unavailable */
    }
  },
};

export interface Onboarding {
  step: number; name: string; household: number; diets: string[]; cuisines: string[]; pantry: string[];
}

export interface State {
  screen: Screen;
  hist: Screen[];
  detail: number | null;
  user: UserProfile | null;
  saleSel: string[];
  list: ListItem[];
  ob: Onboarding;
  q: string;
  lq: string;
  onsaleCat: string;
  onsaleStore: string;
  homeFilter: string;
  /** The "Link a recipe" form; kept while the shopper moves between screens. */
  imp: { url: string; name: string; ing: string; steps: string; serv: number; time: string; img: string; saved: number | null; reading: boolean; read: string | null };
  cam: 0 | 1 | 2;
  tillStore: StoreId;
  matched: Record<string, boolean>;
  clips: Record<string, Clip[]>;
  toast: { msg: string; id: number } | null;
  plan: WeekPlan;
  planPick: Day | null;   // the day whose "Add a dinner" picker is open
  planQ: string;          // search text in that picker
  dayPick: boolean;       // the day chips under "Add to this week's plan" on Detail
  cardId: string | null;  // the loyalty card open full-screen
  walletAdd: ProgramId | null; // the program whose add form is open on the wallet
  walletNum: string;      // the number being typed there
  walletLabel: string;    // store name for an "other" card
  servPick: Record<number, number>; // servings chosen per recipe this session (default: the household)
  cookId: number | null;  // the recipe open in cook mode
  cookStep: number;       // 0-based step
  timer: { end: number; secs: number; label: string; recipe: number } | null; // one running timer, survives leaving the screen
}

const NO_HISTORY: Screen[] = ['splash', 'onboarding'];

/** plateful_mealplan: { days: { Monday: [ids] … } }. The pre-redesign shape (an array of day objects with string ids) is dropped. */
function loadPlan(): WeekPlan {
  const raw = LS.get<unknown>('plateful_mealplan', null);
  const base = emptyPlan();
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return base;
  const days = (raw as { days?: Partial<Record<Day, unknown>> }).days;
  if (!days) return base;
  DAYS.forEach((d) => {
    const v = days[d];
    if (Array.isArray(v)) base[d] = v.filter((x): x is number => typeof x === 'number' && !!R(x));
  });
  return base;
}

const EMPTY_IMP: State['imp'] = { url: '', name: '', ing: '', steps: '', serv: 4, time: '', img: '', saved: null, reading: false, read: null };

function initial(): State {
  const saved = LS.get<UserProfile | null>('plateful_onboarded', null);
  registerLinked((saved?.importedRecipes || []).map(toRecipe));
  return {
    screen: 'splash', hist: [], detail: null,
    user: saved ? withDefaultExpiry(saved) : null,
    saleSel: LS.get<string[]>('plateful_sale_selected', []),
    list: LS.get<ListItem[] | null>('plateful_shoplist', null) ?? DEFAULT_LIST,
    ob: { step: 0, name: '', household: 2, diets: [], cuisines: ['Italian', 'Thai'], pantry: DEFAULT_FRIDGE.slice() },
    q: '', lq: '', onsaleCat: 'All', onsaleStore: 'All', homeFilter: 'All', imp: { ...EMPTY_IMP },
    cam: 0, tillStore: 'ss', matched: {}, clips: {}, toast: null,
    plan: loadPlan(), planPick: null, planQ: '', dayPick: false,
    cardId: null, walletAdd: null, walletNum: '', walletLabel: '',
    servPick: {}, cookId: null, cookStep: 0, timer: null,
  };
}

function useStore() {
  const [s, setS] = useState<State>(initial);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollPos = useRef<Partial<Record<Screen, number>>>({});
  const toastTimer = useRef<number | undefined>(undefined);

  // persist
  useEffect(() => { if (s.user) LS.set('plateful_onboarded', s.user); }, [s.user]);
  useEffect(() => { LS.set('plateful_sale_selected', s.saleSel); }, [s.saleSel]);
  useEffect(() => { LS.set('plateful_shoplist', s.list); }, [s.list]);
  useEffect(() => { LS.set('plateful_mealplan', { days: s.plan }); }, [s.plan]);

  const user = s.user ?? DEFAULT_USER;
  const ctx: Ctx = useMemo(() => ({ user, saleSel: s.saleSel }), [user, s.saleSel]);

  const patch = useCallback((p: Partial<State> | ((prev: State) => Partial<State>)) => {
    setS((prev) => ({ ...prev, ...(typeof p === 'function' ? p(prev) : p) }));
  }, []);
  const patchUser = useCallback((fn: (u: UserProfile) => UserProfile) => {
    setS((prev) => ({ ...prev, user: fn(prev.user ?? DEFAULT_USER) }));
  }, []);

  const toast = useCallback((msg: string) => {
    const id = Date.now();
    setS((prev) => ({ ...prev, toast: { msg, id } }));
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setS((prev) => (prev.toast?.id === id ? { ...prev, toast: null } : prev)), 2200);
  }, []);

  const go = useCallback((screen: Screen, opts: { store?: string; keepScroll?: boolean } = {}) => {
    setS((prev) => {
      if (prev.screen !== screen && scrollRef.current) scrollPos.current[prev.screen] = scrollRef.current.scrollTop;
      const hist = prev.screen !== screen && !NO_HISTORY.includes(prev.screen) ? [...prev.hist, prev.screen] : prev.hist;
      const next: Partial<State> = { screen, hist };
      if (opts.store) { next.onsaleStore = opts.store; next.onsaleCat = 'All'; }
      if (screen === 'camera') next.cam = 0;
      if (!opts.keepScroll) scrollPos.current[screen] = 0;
      return { ...prev, ...next };
    });
  }, []);

  const back = useCallback(() => {
    setS((prev) => {
      const hist = prev.hist.slice();
      const screen = hist.pop() || 'home';
      return { ...prev, screen, hist };
    });
  }, []);

  // restore each screen's scroll position when it comes back
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = scrollPos.current[s.screen] || 0;
  }, [s.screen]);

  const addToList = (list: ListItem[], key: string, qty: string | null, n: number, sid?: StoreId | 'any'): ListItem[] => {
    const b = BOOK[key];
    const ex = list.find((i) => i.key === key);
    if (ex) return list.map((i) => (i === ex ? { ...i, n: i.n + (n || 1), sid: sid ?? i.sid } : i));
    return [...list, { key, qty: qty || (b && b.size) || '1', n: n || 1, sid: sid ?? (b ? b.sid : 'any'), done: false }];
  };

/** Ask the server to read the page; whatever it finds prefills the form, the shopper can still edit everything. */
const readPage = async (target: string) => {
    if (!isUrl(target)) { toast('Paste the recipe’s link first'); return; }
    patch((p) => ({ imp: { ...p.imp, reading: true, read: null } }));
    const r = await readRecipePage(target);
    if (!r.ok) {
      patch((p) => ({ imp: { ...p.imp, reading: false, read: r.code === 'no_server' ? 'Paste the ingredient list below — reading the page needs the Plateful server.' : `${r.message}. Paste the list instead.` } }));
      return;
    }
    patch((p) => ({
      imp: {
        ...p.imp, reading: false, url: r.url,
        name: r.name || p.imp.name,
        ing: r.ingredients.length ? r.ingredients.join('\n') : p.imp.ing,
        steps: r.steps.length ? r.steps.join('\n') : p.imp.steps,
        serv: r.servings || p.imp.serv, time: r.minutes ? String(r.minutes) : p.imp.time, img: r.image || p.imp.img,
        read: r.ingredients.length ? `Read from ${r.source}: ${r.ingredients.length} ingredients${r.steps.length ? `, ${r.steps.length} steps` : ''}. Check the list, then save.`
          : r.name ? `${r.source} gave a name and photo but no recipe data — paste the ingredient list.` : 'No recipe found on that page — paste the ingredient list.',
      },
    }));
  };

  const act = {
    go, back, toast, patch, patchUser,
    skipSplash: () => { setS((prev) => (prev.user ? prev : { ...prev, user: withDefaultExpiry({ ...DEFAULT_USER }) })); go('home'); },
    detail: (id: number) => {
      patchUser((u) => ({ ...u, history: [id, ...(u.history || []).filter((x) => x !== id)].slice(0, 12) }));
      patch({ detail: id });
      go('detail');
    },
    fav: (id: number) => {
      const was = user.favorites.includes(id);
      patchUser((u) => ({ ...u, favorites: was ? u.favorites.filter((x) => x !== id) : [...u.favorites, id] }));
      toast(was ? 'Removed from favourites' : 'Saved to favourites');
    },
    saveDeal: (k: string) => patch((p) => ({ saleSel: p.saleSel.includes(k) ? p.saleSel.filter((x) => x !== k) : [...p.saleSel, k] })),
    seeSale: () => {
      patch({ homeFilter: 'All' });
      go('home');
      window.setTimeout(() => document.getElementById('recommended')?.scrollIntoView({ block: 'start', behavior: 'smooth' }), 50);
    },
    cooked: (id: number) => {
      const u2: UserProfile = { ...user, cooked: (user.cooked || []).includes(id) ? user.cooked : [...(user.cooked || []), id] };
      patch({ user: u2 });
      const lv = cookLevel(u2);
      toast(`Nice work. ${lv.next ? `${lv.need} point${lv.need === 1 ? '' : 's'} to ${lv.next}` : 'You’re at the top level'}`);
    },
    addFridge: (k: string) => {
      patchUser((u) => {
        const d = defaultExpiry(k);
        const expiry = d && !u.expiry?.[k] ? { ...(u.expiry || {}), [k]: d } : u.expiry;
        return { ...u, pantry: u.pantry.includes(k) ? u.pantry : [...u.pantry, k], expiry };
      });
      patch({ q: '' });
      toast(`${BOOK[k] ? BOOK[k].n : k} added to your fridge`);
    },
    removeFridge: (k: string) => patchUser((u) => {
      const expiry = { ...(u.expiry || {}) };
      delete expiry[k];
      return { ...u, pantry: u.pantry.filter((x) => x !== k), expiry };
    }),
    setExpiry: (k: string, iso: string | null) => patchUser((u) => {
      const expiry = { ...(u.expiry || {}) };
      if (iso) expiry[k] = iso; else delete expiry[k];
      return { ...u, expiry };
    }),
    setBudget: (dollars: number | null) => patchUser((u) => ({ ...u, weeklyBudget: dollars && dollars > 0 ? Math.round(dollars) : undefined })),
    // weekly plan
    planAdd: (day: Day, id: number) => {
      patch((p) => ({ plan: { ...p.plan, [day]: p.plan[day].includes(id) ? p.plan[day] : [...p.plan[day], id] }, planPick: null, planQ: '', dayPick: false }));
      toast(`Planned for ${day}`);
    },
    planRemove: (day: Day, id: number) => patch((p) => ({ plan: { ...p.plan, [day]: p.plan[day].filter((x) => x !== id) } })),
    planClear: () => { patch({ plan: emptyPlan(), planPick: null }); toast('Plan cleared'); },
    planAuto: () => {
      patch((p) => ({ plan: autoPlan(p.plan, ctx) }));
      toast('Empty days filled from this week’s deals');
    },
    planToList: () => {
      const st = planStats(s.plan, ctx);
      if (!st.missing.length) { toast('Everything for the week is already in your fridge or on the list'); return; }
      patch((p) => {
        let list = p.list;
        st.missing.forEach(({ key, amt }) => {
          if (BOOK[key]) list = addToList(list, key, amt, 1);
          else if (!list.some((i) => i.key === key)) list = [...list, { key, name: key.replace(/^x:/, '').replace(/-/g, ' '), qty: amt || '1', n: 1, sid: 'any', done: false }];
        });
        return { list };
      });
      go('list');
      toast(`Added ${st.missing.length} items for ${st.dinners} dinner${st.dinners === 1 ? '' : 's'}`);
    },
    addMissing: (id: number, servings?: number) => {
      const r = R(id);
      if (!r) return;
      const st = status(r, ctx);
      const ing = servings && servings !== r.serv ? scaleIngredients(r.ing, r.serv, servings) : r.ing;
      patch((p) => {
        let list = p.list;
        st.missing.forEach((k) => {
          const amt = ing.find((i) => i[0] === k)?.[1] ?? null;
          if (BOOK[k]) list = addToList(list, k, amt, 1);
          else if (!list.some((i) => i.key === k)) list = [...list, { key: k, name: k.replace(/^x:/, '').replace(/-/g, ' '), qty: amt || '1', n: 1, sid: 'any', done: false }];
        });
        return { list };
      });
      go('list');
      toast(`Added ${st.missing.length} items for ${r.name}`);
    },
    addListKey: (k: string, sid?: StoreId) => {
      patch((p) => ({ list: addToList(p.list, k, null, 1, sid), lq: '' }));
      const s2 = sid ? STORE(sid) : undefined;
      toast(`${BOOK[k].n} added${s2 ? ' · ' + s2.name : ''}`);
    },
    addFree: (name: string) => patch((p) => ({ list: [...p.list, { key: 'free-' + Date.now(), name, qty: '1', n: 1, sid: 'any', done: false }], lq: '' })),
    qtyUp: (key: string, sid: ListItem['sid']) =>
      patch((p) => ({ list: p.list.map((i) => (i.key === key && i.sid === sid ? { ...i, n: i.n >= 6 ? 1 : i.n + 1 } : i)) })),
    toggleDone: (key: string, sid: ListItem['sid']) =>
      patch((p) => ({ list: p.list.map((i) => (i.key === key && i.sid === sid ? { ...i, done: !i.done } : i)) })),
    removeItem: (key: string, sid: ListItem['sid']) => patch((p) => ({ list: p.list.filter((i) => !(i.key === key && i.sid === sid)) })),
    clearList: () => { patch({ list: [], matched: {} }); toast('List cleared'); },
    moveAll: (sid: StoreId) => { patch((p) => ({ list: p.list.map((i) => ({ ...i, sid })) })); toast(`List moved to ${STORE(sid)?.name}`); },
    shutter: () => {
      patch({ cam: 1 });
      window.setTimeout(() => setS((prev) => (prev.screen === 'camera' ? { ...prev, cam: 2 } : prev)), 1400);
    },
    camReset: () => patch({ cam: 0 }),
    camAdd: () => { patch((p) => ({ list: addToList(p.list, 'cheddar', '400 g', 1) })); toast('Aged cheddar added to your list at Co-op'); },
    pmHere: () => {
      patch((p) => ({ list: addToList(p.list, 'cheddar', '400 g', 1, 'ss'), tillStore: 'ss' }));
      go('till');
      toast('Added to your Superstore list with the Co-op ad attached');
    },
    tillStore: (sid: StoreId) => patch({ tillStore: sid }),
    // loyalty wallet — numbers stay in plateful_onboarded on this device
    walletOpen: (program: ProgramId | null) => patch({ walletAdd: program, walletNum: '', walletLabel: '' }),
    cardSave: () => {
      const program = s.walletAdd;
      const n = cleanNumber(s.walletNum);
      if (!program || numberError(n)) return;
      const card = newCard(program, n, program === 'other' ? s.walletLabel : undefined);
      patchUser((u) => ({ ...u, cards: [...(u.cards || []).filter((c) => c.program !== program || program === 'other'), card] }));
      patch({ walletAdd: null, walletNum: '', walletLabel: '' });
      toast(`${cardName(card)} card saved on this phone`);
    },
    cardRemove: (id: string) => {
      patchUser((u) => ({ ...u, cards: (u.cards || []).filter((c) => c.id !== id) }));
      patch({ cardId: null });
      back();
      toast('Card removed');
    },
    cardShow: (id: string) => { patch({ cardId: id }); go('card'); },
    // servings and cook mode
    setServings: (id: number, n: number) => patch((p) => ({ servPick: { ...p.servPick, [id]: Math.min(24, Math.max(1, n)) } })),
    cookStart: (id: number) => { patch((p) => ({ cookId: id, cookStep: p.cookId === id ? p.cookStep : 0 })); go('cook'); }, // reopening the same recipe resumes where you were
    cookStep: (i: number) => patch({ cookStep: i }),
    timerStart: (secs: number, label: string, recipe: number) => patch({ timer: { end: Date.now() + secs * 1000, secs, label, recipe } }),
    timerStop: () => patch({ timer: null }),
    cookFinish: (id: number) => {
      const r = R(id);
      const u2: UserProfile = { ...user, cooked: (user.cooked || []).includes(id) ? user.cooked : [...(user.cooked || []), id] };
      patch({ user: u2, timer: null, cookId: null, cookStep: 0 });
      const lv = cookLevel(u2);
      go('detail');
      toast(`${r ? r.name + ' cooked. ' : ''}${lv.next ? `${lv.need} point${lv.need === 1 ? '' : 's'} to ${lv.next}` : 'You’re at the top level'}`);
    },
    // what the cook thought
    setNote: (id: number, n: Partial<RecipeNote>) =>
      patchUser((u) => {
        const prev = u.notes?.[id] || { stars: 0, again: false, note: '', at: '' };
        return { ...u, notes: { ...(u.notes || {}), [id]: { ...prev, ...n, at: new Date().toISOString().slice(0, 10) } } };
      }),
    tillTick: (key: string) => patch((p) => ({ matched: { ...p.matched, [key]: !p.matched[key] } })),
    tillDone: (save: number) => {
      patch((p) => ({ list: p.list.map((i) => (p.matched[i.key] ? { ...i, done: true } : i)), matched: {} }));
      go('list');
      toast(`Price matched · saved ${money(save)}`);
    },
    attachClip: (key: string, clip: Clip) => {
      patch((p) => ({ clips: { ...p.clips, [key]: [...(p.clips[key] || []), clip] } }));
      toast('Screenshot attached to the item');
    },
    toggleAlerts: () => patchUser((u) => ({ ...u, alerts: !u.alerts })),
    setRadius: (km: number) => patchUser((u) => ({ ...u, radiusKm: km })),
    // link a recipe from another site: the form, then the saved list
    impPatch: (f: Partial<State['imp']>) =>
      patch((p) => {
        const imp = { ...p.imp, ...f };
        // a name guessed from the link, until the shopper types one
        if (f.url !== undefined && (!p.imp.name || p.imp.name === nameFromUrl(p.imp.url))) imp.name = nameFromUrl(f.url);
        // a pasted block with a "Method" heading splits into ingredients and steps
        if (f.ing !== undefined) {
          const sp = splitPaste(f.ing);
          if (sp.steps.length && !p.imp.steps) { imp.ing = sp.ing.join('\n'); imp.steps = sp.steps.join('\n'); }
        }
        return { imp };
      }),
    impStart: (url = '') => { patch({ imp: { ...EMPTY_IMP, url, name: nameFromUrl(url), serv: user.householdSize || 4 } }); go('import'); if (url) void readPage(url); },
    impRead: (url?: string) => readPage((url ?? s.imp.url).trim()),
    /** Send the list to Instacart as a shoppable page; a search link when the server has no key, the storefront when there is no server. */
    sendInstacart: async () => {
      const open = s.list.filter((i) => !i.done);
      const items = open.map((i) => ({ name: (BOOK[i.key]?.n || i.name || i.key.replace(/^(x:|free-)/, '').replace(/-/g, ' ')).split(',')[0], quantity: i.n || 1, display: `${i.n > 1 ? i.n + ' × ' : ''}${BOOK[i.key]?.n || i.name || ''}`.trim() }));
      if (!items.length) { toast('Your list is empty'); return; }
      toast('Opening Instacart…');
      const r = await instacartList(`Plateful list · ${new Date().toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}`, items);
      const url = r.url || 'https://www.instacart.ca';
      if (r.ok) toast(`${items.length} items sent to Instacart`);
      else if (r.code === 'no_key') toast('Instacart isn’t connected yet — opening a search');
      else toast('Opening Instacart');
      window.open(url, '_blank', 'noopener');
    },
    impSave: () => {
      const f = s.imp;
      const lines = parseIngredients(f.ing);
      if (!f.url.trim() || !isUrl(f.url)) { toast('Paste the recipe’s link first'); return; }
      if (!f.name.trim()) { toast('Give the recipe a name'); return; }
      if (!lines.length) { toast('Paste at least one ingredient'); return; }
      const existing = user.importedRecipes || [];
      const rec = newImported({
        url: f.url, name: f.name, ing: lines.map((l) => [l.key, l.amount] as [string, string]), steps: f.steps.split(/\r?\n/).map(cleanStep).filter(Boolean),
        serv: f.serv, time: f.time ? Number(f.time) || undefined : undefined, img: f.img,
      }, existing);
      const list = [...existing, rec];
      registerLinked(list.map(toRecipe));
      patchUser((u) => ({ ...u, importedRecipes: list }));
      patch({ imp: { ...EMPTY_IMP, serv: user.householdSize || 4, saved: rec.id } });
      toast(`${rec.name} linked from ${rec.source}`);
    },
    impRemove: (id: number) => {
      const list = (user.importedRecipes || []).filter((r) => r.id !== id);
      registerLinked(list.map(toRecipe));
      patchUser((u) => ({
        ...u, importedRecipes: list,
        favorites: u.favorites.filter((x) => x !== id), cooked: (u.cooked || []).filter((x) => x !== id), history: (u.history || []).filter((x) => x !== id),
      }));
      patch((p) => ({ plan: Object.fromEntries(DAYS.map((d) => [d, p.plan[d].filter((x) => x !== id)])) as typeof p.plan, imp: { ...p.imp, saved: null } }));
      toast('Recipe removed');
    },
    // onboarding
    obPatch: (p: Partial<Onboarding>) => patch((prev) => ({ ob: { ...prev.ob, ...p } })),
    obToggle: (field: 'diets' | 'cuisines' | 'pantry', v: string) =>
      patch((prev) => {
        const a = prev.ob[field];
        return { ob: { ...prev.ob, [field]: a.includes(v) ? a.filter((x) => x !== v) : [...a, v] } };
      }),
    obNext: () => {
      if (s.ob.step < 4) { patch({ ob: { ...s.ob, step: s.ob.step + 1 } }); return; }
      const o = s.ob;
      patch({
        user: withDefaultExpiry({ ...(s.user ?? DEFAULT_USER), name: o.name, householdSize: o.household, diets: o.diets.slice(), cuisines: o.cuisines.length ? o.cuisines.slice() : ['Italian'], pantry: o.pantry.slice() }),
      });
      go('home');
    },
    obBack: () => patch((prev) => ({ ob: { ...prev.ob, step: Math.max(0, prev.ob.step - 1) } })),
    editPrefs: () => {
      patch({ ob: { step: 2, name: user.name, household: user.householdSize, diets: user.diets.slice(), cuisines: user.cuisines.slice(), pantry: user.pantry.slice() } });
      go('onboarding');
    },
  };

  return { s, user, ctx, act, scrollRef };
}

type Store = ReturnType<typeof useStore>;
const AppContext = createContext<Store | null>(null);

export function PlatefulProvider({ children }: { children: ReactNode }) {
  const store = useStore();
  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
}

export function useApp(): Store {
  const v = useContext(AppContext);
  if (!v) throw new Error('useApp must be used inside PlatefulProvider');
  return v;
}
