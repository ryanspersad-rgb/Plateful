# Plateful — CLAUDE.md

**Project:** Plateful, a Calgary meal-planning app that turns this week's grocery flyers and what's in your fridge into ranked recipes, a store-grouped shopping list, and the cheapest place to shop close to home.
**Owner:** Ryan — Plateful Inc., Calgary AB
**Tagline:** From Cart to Cuisine
**Website:** plateful.ca
**Last updated:** 2026-10-27 — loyalty card wallet (Profile → Loyalty cards; shown on At the till and the store rows); earlier the same day a layout pass with real fonts: the skill dots no longer overlap the level word, units never wrap away from their number, map labels avoid each other. 2026-10-26: three comparator gaps closed: a weekly grocery budget (Profile → List, Plan), use-by dates on fridge items with a "Use it up" row on Home, and the weekly plan ported from the old app as a Plan tab beside the List. Earlier: every recipe got its own verified Higgsfield photo (58 editorial + 402 catalogue, 396 distinct dishes); the 71 shared stock photos are gone. Earlier still: the editorial system was ported into the React codebase (`ryanspersad-rgb/Plateful`, main): 15 screens as components, the price book and price-match logic, Cook level, Trending, History and Favourites. `design/Plateful_editorial.html` stays the visual reference; colour directions A/B/C still pending (`.theme-a/b/c` on the shell). Next decisions: the comparator gaps listed under Competitive positioning

---

## Business context

### Company
Plateful Inc. is a Calgary-based startup; Ryan is CEO and proprietor. The app is at prototype/MVP stage, built on a lean budget.

### Problem
Calgary shoppers don't know what to cook based on what's on sale *this week*. They buy ingredients without checking flyers and waste what sits in the fridge. Plateful closes the loop: flyer deals in, fridge in, ranked recipes out, cheapest store out.

### Target users
- Primary: Calgary households, 25–45, value-conscious shoppers
- Secondary: meal preppers, families on a weekly food budget
- Calgary first; Edmonton or Winnipeg next

### Core value proposition (from the original build, restored 2026-10-26)
1. **Save money** — surface this week's flyer deals before you shop, and price match them at the till
2. **Reduce waste** — use what you already have first
3. **Save time** — no recipe searching; ranked suggestions come to you
4. **Discover cuisine** — 28 cuisines, 460 recipes (58 editorial + 402 catalogue), every one photographed
5. **Build confidence** — skill levels, ingredient counts and a Cook level that grows with every recipe cooked (added 2026-10-26; none of the benchmarked apps do this)

### Competitive positioning
Plateful is not a recipe app (not AllRecipes/Yummly/NYT Cooking) and not a delivery app (not Instacart). It sits in the gap — **flyer intelligence + pantry awareness + recipe discovery** — unoccupied in Canada at consumer scale. Benchmarks and what was taken from each (critique of 2026-10-14, re-checked 2026-10-26): **Flipp** (list matched to flyers, clippings for price matching, watch list, loyalty wallet, shared list) → Plateful matches the list to flyers, clips ads from several stores at the till, and carries the wallet and shared list on the roadmap; **Cooklist / Samsung Food** (pantry from receipts and loyalty accounts, expiry tracking, missing-only lists) → missing-only lists are in; receipt import and a "use it up" row are later; **Flashfood / Too Good To Go** (urgency cues) → flyers show "ends Thursday"; **Mealime / Mob** (few chips plus a filter sheet, colour blocks) → text tabs and the tinted bands in direction A; **NYT Cooking** → the whole page structure. Still open from the critique: store logos on every deal (needs retailer assets through the portal).

**Gaps against the comparators (reviewed 2026-10-26 against the built app, not the prototype), ranked by value for the value-conscious Calgary household versus effort; Ryan to pick the next ones:**
1. **Servings scaling + cook mode** (Mealime, Samsung Food) — household size is captured at onboarding but recipes never scale; no step-by-step full-screen mode with timers and screen-stays-on. Low effort, uses data already held.
2. **Watch list / price alerts on an item** (Flipp) — "tell me when chicken thighs drop under $3/lb"; the Deal alerts toggle exists but has nothing behind it. The natural Plus hook; needs the live deal feed (roadmap 8).
3. **Whole-flyer browsing and item search across every flyer** (Flipp) — Plateful shows a curated 41-item price book; a flyer app without the flyer is a gap shoppers notice. Needs the feed.
4. **Receipt capture → pantry, spend tracking and cashback** (Checkout 51, Caddle, Cooklist) — one photo of a receipt fills the fridge, records what was paid, and opens a brand-funded cashback line for the supplier plan. Medium effort; OCR on device.
5. ~~**Weekly grocery budget**~~ — **built 2026-10-26**: set in Profile; the List shows planned vs budget, bought so far and what is left (ink bar when over); the Plan shows the week against it.
6. **Item-level cart handoff** (PC Express, Voilà, Instacart) — "Send your list to" opens retailer homepages; Instacart's developer platform and Walmart's affiliate links can carry the items. Medium effort; also the affiliate revenue line.
7. ~~**Expiry tracking and a "use it up" row**~~ (Cooklist, Samsung Food) — **built 2026-10-26**: perishables get a default use-by date from a shelf-life table when they enter the fridge (editable per item); Home shows "Use it up · Before it turns" with the items and the recipes that use the most of them, soonest first.
8. ~~**Weekly meal calendar**~~ — **built 2026-10-26** as the Plan tab beside the List: seven days, a picker per day, "Fill empty days" from the ranked recommendations (one cuisine per day), the week's cost and savings, and "Add N items to list" for every missing ingredient; Detail has "Add to this week's plan" with day chips.
9. **Weekly "what to cook" digest** on flyer day (NYT Cooking newsletter, Flipp flyer notification) — push or email; retention.
10. **Ratings, notes and "I'd make it again"** on recipes (NYT Cooking) — local first, community with Supabase.
11. **Clearance / near-expiry stock near you** (Flashfood, Too Good To Go) — partnership; Flashfood is in Loblaw banners already.
12. ~~**Loyalty wallet**~~ — **built 2026-10-27** as a card wallet (the Flipp model): the number is typed once, kept in `plateful_onboarded` on the phone and drawn as a Code 128 barcode for the cashier; no account is linked, no points or purchases are read (none of PC Optimum, Scene+, Co-op or Air Miles publish a third-party API, and scraping with the shopper's login is off the table). Points offers come later through the grocer portal, attached to deals. **Shared household list** — still roadmap 7.
Not gaps: delivery (Instacart's job), video recipes (TikTok's), social feed (Samsung Food's) — Plateful stays the decision layer.

### Revenue model (decided 2026-10-14, to validate with 3–5 grocers)
- **Grocers and suppliers pay to be seen inside the meal decision.** Store plan $149/month per location; Chain from $999/month; Supplier (brand) from $499/month.
- **Placements by the week:** Promoted near you $45/week per item (radius + preference matched); Featured deal $75/week (6 per week city-wide); Deal of the day $120/day; Sponsored recipe $150/week (3 per week).
- **Plateful Plus** $4.99/month: price alerts, unlimited camera price checks and imports, shared household list, allergen profiles.
- **Affiliate:** deep links to PC Express (Loblaws / Superstore), Voilà (Sobeys / Safeway), Walmart grocery and Instacart from "Send your list to"; Walmart pickup, DoorDash and Skip are roadmap item 6.
- Full plan with architecture and data model: Claude doc "Plateful for Grocers — supplier platform and pricing plan".

---

## Tech stack

| Layer | Choice |
| --- | --- |
| Frontend | React 19, TypeScript 5.6, Vite 7 |
| Styling | Tailwind CSS v4, shadcn/ui, custom tokens in `client/src/index.css` |
| Animation | Framer Motion |
| Charts / toasts / icons / barcodes | Recharts, sonner, lucide-react, jsbarcode (Code 128 for loyalty cards) |
| Routing | wouter (screens are state-driven inside `Home.tsx`, not routes) |
| Backend | Express (scaffolded); Postgres via Supabase planned (auth, storage, RLS) |
| Package manager | pnpm — `pnpm dev`, `pnpm check`, `pnpm build` |

## Project structure (after the 2026-10-26 port)

```
Plateful/                                # GitHub ryanspersad-rgb/Plateful (main)
  client/src/pages/Home.tsx              # thin shell: PlatefulProvider + Shell — screens no longer live here
  client/src/pages/HomeLegacy.tsx        # pre-redesign single-file app (meal plan, retailer modal, daily deal); not mounted
  client/src/hooks/usePlateful.tsx       # one store + every action (go/back, fav, saveDeal, addMissing, tillTick…); localStorage
  client/src/components/editorial/
    Shell.tsx                            # screen switch, five-tab bar, ink bar, in-app toast
    Bits.tsx                             # Sec (section head), RecipeCard, Tile (deal), TrendingCard, Topbar, Bookmark
    Icons.tsx                            # the stroke icon set + CartMark
    screens/*.tsx                        # Splash, Onboarding, Home, OnSale, Detail, List (+ BudgetLine, ListPlanTabs), Plan, PriceMatch,
                                         # Till, Camera, Stores, Fridge, Profile, Wallet (+ Card, Barcode), Library (Favourites, History, Import)
  client/src/lib/editorial/
    book.ts                              # BOOK (108 items, 41 on sale), STORES, STORE_PRICE, ADS, PM_RULES, PM_POLICY, FRIDGE_CATS
    recipes.ts                           # EDITORIAL_RECIPES (58, Higgsfield photos) + NOTES
    trending.ts                          # TRENDING (8 external recipes)
    catalogue.ts                         # fromCatalogue(): adapts constants.ts RECIPES (402) into EditorialRecipe; ALL_RECIPES, R(id)
    pricing.ts                           # unitPrice, listTotal, pmPlan, pmItems, oneStop, cheapestFor, money, pct
    scoring.ts                           # status, score, recommended, searchRecipes, cookLevel, stepRow, timeText
    fridge.ts                            # shelf-life table, defaultExpiry, expiringSoon, useItUp, whenText
    plan.ts                              # DAYS, weekStart, planStats, autoPlan, budgetFor
    wallet.ts                            # PROGRAMS (PC Optimum, Scene+, Co-op, Costco, Air Miles, other), programFor, cardFor, number checks
  client/src/lib/types.ts                # Recipe (catalogue) + EditorialRecipe, BookItem, Store, Ad, PMRule, ListItem, TillPlan, UserProfile, Screen
  client/src/lib/constants.ts            # the 402-recipe catalogue and CATEGORIES; image fields now point at Higgsfield photos
  client/src/editorial.css               # the design system; class names match Plateful_editorial.html
  client/src/index.css                   # Tailwind + shadcn tokens recoloured to the editorial palette; imports editorial.css
  design/Plateful_editorial.html         # the standalone reference build; design/higgsfield.json = photo manifest (heroes, recipes, products, catalogue)
  vite.config.ts, tsconfig.json, .env.example
  server/                                # not yet created; the build script no longer references it
  portal/                                # (planned) grocer/supplier web app, shares lib/types.ts
```

Catalogue recipes get numeric ids from 1000 (`LEGACY_ID_BASE`); their ingredient names map onto price-book keys through `keyFor()` (aliases in catalogue.ts), and anything Plateful cannot price yet gets an `x:` key — it shows "No price yet" and is added to the list as a free-text item. About 55% of catalogue ingredient lines are priced today; the price book grows with the portal.

---

## Screens (2026-10-26 structure)

Bottom nav, five tabs: **Home · On sale · List · Stores · Profile**. Fridge and Favourites live under Home and Profile. Import is reached from Profile ("Imported recipes") and the Home search. The two in-store features, **At the till** and **Scan**, are reachable from Home ("At the store" block and the camera button in the search field), from the List (banner, links, camera icon) and from Price match.

| Screen | What it does |
| --- | --- |
| Splash | White screen, ink cart mark, Lora wordmark, terracotta tagline, hairline progress, "Loading this week's Calgary flyers", Skip link |
| Onboarding | Name → household → diets → cuisines → fridge setup; serif question, serif dek, chip answers, hairline progress with terracotta fill; household allergen profiles (roadmap) |
| Home | NYT Cooking structure, top to bottom: wordmark + location chip "Near T2P · 5 stores in 5 km" → full-width bordered search "What's in your fridge?" with instant matches (recipes + "Add X to my fridge") and a terracotta **camera button** at its right edge (Scan) → text-tab filters (All · Weeknight · Italian · Indian · Thai · Mexican · Kids · Vegetarian) → **lead** "TONIGHT'S DEAL DINNER": full-bleed 3:2 photo with bookmark circle and dots, Lora title, hook line ("Chicken thighs are $2.99/lb at Superstore"), serif dek, meta ("$2.80 a serving · 45 min · You have 5 of 8"), crossfading through 4 leads every ~4 s → **On sale this week** ("41 deals in this week's flyers … Save a deal and the recipes that use it move up"; row of the 14 biggest % off, then "All 41 deals ›") → **Promoted near you** (Sponsored; product + store + distance + "Pairs with [recipe] ›") → **Quick picks** ("Dinners built on this week's prices", ranked by sale hits) → **At the store** (two rows: "Price match at the till — N items on your list have a lower ad · save $X at [store]" and "Scan a product or shelf tag — lowest nearby price, who will match it, and recipes that use it") → **From your fridge** chips (on-sale items marked) → **For you** ("We think you'll cook", 2-col grid of square-photo cards) → (when something in the fridge is within five days of its date) **Use it up** ("Before it turns": "Milk by tomorrow, carrots by Friday.", a chip per item, then recipes ranked by how many of those items they use) sits right after the lead → **Trending** ("What everyone is cooking": eight real external recipes from Google Trends and TikTok, each with its source, a "why it's trending" eyebrow, "Open recipe ↗" and how many ingredients are on sale or in the fridge; the card is a link that opens the original site) → **This week** (article-style rows: serif title, "2 MIN READ", thumbnail right; deal notes) → **Kids** → **Family**. Also on Home: tapping a **cuisine tab** (Indian, Thai…) opens a results section right under the tabs ("7 Indian recipes", Clear) before the lead; **Recently viewed** and **My favourites** rows appear under the lead once they have content; the **adaptive skill row** ("Start here · five ingredients, half an hour" for Beginners, "Your next step" for Home cooks, "Weekend projects" for Confident) sits after them |
| On sale | Lora title + "41 deals · Oct 23 – 29 · 5 stores near T2P · N saved"; category text tabs + store text tabs (active = tint block); 2-column grid of square supplier-photo tiles sorted by % off, with store, name, size, sale price (Lora 600), "was" struck, % off in terracotta; **bookmark circle on the tile = save the deal** (saved = 2 px terracotta border, filled terracotta bookmark, "SAVED" label); floating ink bar "See N recipes with your saved deals · N saved" |
| Recipe detail | 320 px photo hero with back and bookmark circles; status line ("YOU HAVE EVERYTHING · ITALIAN · DINNER", status in terracotta); Lora title; serif byline ("From the Plateful kitchen · priced against this week's flyers", or source + stars for web recipes); serif dek; meta; two-column cost / savings; macros row; hairline ingredient list with amount, name and "In your fridge" / "$2.99/lb · Superstore" (terracotta when on sale); "Add N items to list · $X"; **"Add to this week's plan"** (ghost button → Mon–Sun chips; days that already have a dinner are outlined in ink; once planned it reads "Planned for Friday · Open the plan"); numbered Preparation (terracotta numerals); Similar recipes grid |
| List | **List · This week's plan** text tabs at the top; **budget line** ("$34.16 of $120 · $85.84 left", 3 px bar, "$1.29 bought so far · $32.87 still to buy"; ink bar and "$X over" when over; "Set one" link to Profile when unset); **Add bar** ("Add to your list": price-book suggestions showing "Cheapest near you: $0.99 ea · Co-op Midtown · on sale"; unknown items can be added without a price); Clear; grouped by store (nearest first) with Lora store heads and subtotals; check circles; **quantity chip** ("2 ×", tap to step); **Price match** link on matchable items; solid terracotta banner "Price match 4 items · save $X · Ads are ready to show at the till" → **At the till**; text links "Compare every ad" and "Scan a shelf tag"; "Cheapest one-stop" with "Move list to [store]"; **Send your list to** PC Express · Voilà · Walmart · Instacart; Share with household (roadmap toast); camera icon in the top bar |
| **Plan** | This week's dinners, Monday to Sunday with dates and a Today marker; "Fill empty days" (ranked recommendations, one cuisine per day) and "Add N items to list" (every missing ingredient across the week, de-duplicated); two-column week cost / savings with "26 ingredients · 13 in your fridge · 18 on sale"; per day the planned recipe rows (thumb, name, per-serving, status, remove) and "Add a dinner" which opens an inline picker (search box; without a query, the top six recommendations not yet planned); the budget line at the bottom when a budget is set. Persisted as `plateful_mealplan` `{ days: { Monday: [ids] … } }` |
| Price match | The comparison view: banner → At the till; **"Stores ranked by what they'll match"** — every price-matching store with the whole list priced there with every valid ad applied, items matched, saving, distance and its policy in one line (ranked by policy strength, then list cost); then every list item with its competitor ads (store, price, flyer dates, distance, "Lowest · Save $X") and the current store's policy sentence; "Show all at the till"; camera button |
| **At the till** | The cashier view: "You're at" store tabs (price-matching stores only) with that store's full policy wording; a **card row** for that store's program ("Scan your PC Optimum card · •••• 5678 · tap for the barcode" → full-screen card, or "Add your PC Optimum card" → wallet; nothing at Walmart); two columns "You save here" / "List total with every match applied"; the same policy-ranked store list; then, per item, a **row of flyer clippings** — one auto-clipped ad card per competitor store whose ad beats this store's price (ink header "NO FRILLS · AUTO-CLIPPED", product photo, name, size, price large in Lora, "Flyer valid Oct 23 – 29 · No Frills, 2.3 km"), plus any **screenshots the shopper attached** ("Attach a flyer screenshot", stored with the item, labelled "Your screenshot · filename") — with a check circle the shopper ticks as each match is applied; "Done · saved $X" marks those items bought; "Scan something else on the shelf". Auto-clipping becomes real crops of the flyer image once the portal / Flipp Publisher API feed exists |
| Scan (camera check) | Ink screen, viewfinder brackets, "Point at a product or shelf tag"; shutter → scan line → white result card: product tile, "$7.49 here · Superstore", LOWEST NEARBY "$4.99 · Co-op Midtown · 1.4 km · flyer", one line saying whether this store will match it, "Price match here" (adds the item to the list at this store with the ad attached and opens At the till) / "Add to list", then **"Recipes that use it"** (three rows with fridge status); free-check quota line |
| Stores | "Where to shop": cheapest one-stop and two-stop split for the current list with distances and the saving; map with home radius (ink pins, terracotta home dot, dashed radius; labels placed to avoid each other); store rows with area, this week's deal count, price-match note, Maps and Flyer icon buttons, and a barcode button when the shopper holds that store's card |
| My fridge | Add field; items by category, soonest first, each with a **use-by date** ("Use by Thursday · 3 days" — terracotta at ≤ 2 days, "Past its date", "Use today"; staples read "Keeps" with no date) and a date input to change it; "On sale · $3.49 at Superstore" markers; quick-add chips from this week's sales. Dates default from a shelf-life table (`lib/editorial/fridge.ts`: per-key overrides, then category — dairy 10 d, produce 7, meat & fish 3, bakery 4, pantry/frozen none) |
| Profile | Greeting + household/postal/radius line; Plus card (ink block, terracotta-tint price); **Budget** row with a dollar input (weekly grocery budget; shows what is on the list and what is left); **Your cook level** (Beginner / Home cook / Confident, progress bar, "3 recipes cooked · 4 points · 1 more to Home cook"); Your kitchen rows (My fridge, Favourites, **History**, **This week's plan**, Imported recipes, Diets and cuisines); Location with radius slider; Household allergens (Soon); **Loyalty cards** ("2 cards on this phone · PC Optimum, Scene+" → wallet); Deal alerts toggle |
| **Loyalty cards** | "Your cards" rows (program, •••• last four, which stores scan it; tap → full-screen card) and "Add a card": PC Optimum (Superstore, No Frills), Scene+ (Safeway), Calgary Co-op, Costco membership, Air Miles, or another store card with its own name; inline form with the number in groups of four, a live barcode preview, a soft digit-count warning (16 for PC Optimum and Scene+, 12 Costco, 11 Air Miles) and "Save card". Plain-language note that the number stays on the phone and nothing is linked |
| **Card** (full screen, no tab bar) | White sheet: program eyebrow, Code 128 barcode across the phone (jsbarcode), the number in groups of four, "Scan at Real Canadian Superstore, No Frills", "Done", two-tap "Remove this card" |
| Favourites | 2-col grid of saved recipes; also a row on Home |
| History | Cooked (grid) and Recently viewed (rows, last 12); also a "Recently viewed" row on Home |
| Import | Paste a TikTok / Instagram / YouTube / web link → parsed recipe card with "4 of 10 in your fridge · 2 on sale" → Save to imported recipes |

Navigation is `act.go('target')` from `useApp()`; `act.back()` pops the history. New screens: add to the `Screen` union in `types.ts`, write `components/editorial/screens/X.tsx`, register it in `SCREENS` in `Shell.tsx` (and in `PARENT` if it belongs under a tab).

---

## Key data structures

```typescript
interface Recipe { id; name; image; prepTime; calories; difficulty: 'Easy' | 'Medium' | 'Confident'; servings; tags; matchScore; matchText; ingredients: Ingredient[]; instructions; teaches: string[]; savings?; totalCost?; macros?: { protein; carbs; fat; fibre }; hook?; dek?; source?; rating?; ratingCount? }
interface TrendingRecipe { name; image; url; source; why; ingredientKeys: string[] }   // external; the card is a link
interface CookLevel { name: 'Beginner' | 'Home cook' | 'Confident'; points; next?; need; pct }  // Easy 1 pt, Medium 2, Confident 3; Home cook at 5, Confident at 14
interface Ingredient { name; amount; inPantry; onSale?; salePrice?; retailer?; storeId?; distanceKm? }
interface Deal { id; item; price; originalPrice; retailer; storeId; category; size; unit?; expiry; imageUrl?; canadian?; promoted?: Promotion }
interface Store { id; retailer; name; area; lat; lng; priceMatch: boolean; flyerUrl; distanceKm? }
interface Promotion { placement: 'near_you' | 'featured' | 'deal_of_day' | 'sponsored_recipe'; radiusKm; tags: string[]; weekStart; weekEnd }
interface PriceMatch { itemId; hereStoreId; herePrice; ads: { storeId; price; flyerFrom; flyerTo; distanceKm }[] }
interface PriceMatchPolicy { storeId; tier: 1 | 2; short: string; long: string }   // tier 1 = strongest (any current local flyer, at the till)
interface TillPlan { storeId; total; saved; matches: { item; herePrice; ad; save }[] }  // the list priced at one matching store with every valid ad applied
type Screen = 'splash' | 'onboarding' | 'home' | 'detail' | 'onsale' | 'list' | 'pricematch' | 'till' | 'camera' | 'stores' | 'fridge' | 'favourites' | 'history' | 'profile' | 'import';
```

`hook` is the one-line deal reason shown under a lead title ("Salmon is $9.99/lb at Safeway Beltline, 1.1 km away"); `dek` is the serif one-sentence description. Web recipes carry `source`, `rating`, `ratingCount` and show stars + count instead of cost in Trending.

Scoring (from demo 15, keep): `score = saleHits*3 + fridgeHits*4 + (isFav ? 6 : 0) + (cuisineMatch ? 2 : 0)`; a **saved deal** counts as a fridge hit. Promoted items get no score boost — they are a separate row, never mixed into Recommended. Quick picks sort by `saleHits` only.

Price-match ranking: for each store with a policy, price the whole list there, swap in the lowest competitor ad wherever it beats that store's price, and sort stores by policy tier, then total. The top store is the default "You're at" on At the till. A store's own sale price always wins over the placeholder shelf-price matrix.

## State and persistence

`localStorage`: `plateful_onboarded` { name, householdSize, diets, cuisines, pantry, favorites, postalPrefix, radiusKm, alerts, imported, cooked, history, expiry { key: ISO day }, weeklyBudget, cards [{ id, program, number, label?, added }] — card numbers never leave the device }, `plateful_mealplan` `{ days: { Monday: [recipe ids] … Sunday } }` (the pre-redesign array shape is ignored), `plateful_daily_deal`, `plateful_sale_selected` (saved deals), `plateful_shoplist` (items with key, qty, n, storeId, done; free-text items have a `free-` key and a name), `plateful_theme` (prototype colour switcher). Ticks and attached clippings on At the till are session state until "Done" marks the items bought (clippings move to the item record in the app).

---

## Brand and design system (editorial market; NYT Cooking pass 2026-10-26)

North star: **NYT Cooking** (page structure, type hierarchy, card anatomy) and **Kitchen Stories**. White ground, ink type, one terracotta accent, real food photography. The photographs carry the colour; the interface stays quiet so a price reads as news. This replaced the warm brand tokens, the B + C blend and every brown surface — Ryan read those as generic and unprofessional.

What was taken from cooking.nytimes.com (screenshots reviewed 2026-10-25): a search-first header with a full-width bordered field and a question placeholder; a lead block with a terracotta eyebrow, light serif title, byline, serif dek and a meta line; every section opened by a 2 px ink rule plus a small-caps eyebrow and a "View all ›" link; square-cornered photos with a white bookmark circle in the bottom-right corner; bold sans card titles with author/source and stars + count below; plain-text filter tabs with the active one on a soft tint block; article-style rows with a serif title, "N MIN READ" and a thumbnail at right; horizontal rows that scroll. NYT's red became terracotta, its yellow chip tint became a pale terracotta tint, and its serif became Lora. The bookmark is the one save gesture in the app: recipes and deals alike.

### Colour
```
ground      #FFFFFF   app background, tab bar, sheets
paper       #FAF8F5   supplier-photo tiles, inputs, placeholder surfaces (1px #E8E2DA)
ink         #1A1511   titles, prices, dark surfaces (camera, Plus block, selected chips, flyer-ad headers), section rules
text        #2B2521   body
muted       #6B625B   labels, meta, inactive tabs (4.5:1 on white)
faint       #9A9087   placeholders, disabled
hairline    #E8E2DA   every divider, tile and tab-bar border
input       #D9D2C9   input and outline-chip border
terracotta  #B4552E   the ONLY accent: primary buttons, active tab, links, savings and % off,
                      saved tiles (2 px border + filled bookmark), status labels, lead eyebrow, step numerals, camera button;
                      hover #9A4525; tint #E8A07A for accent text on ink; chip tint #F7ECE5 for the active filter tab
stage       #F1EDE7   web only: the ground behind the 390 px artboard
```
**Colour directions under review (2026-10-26, Ryan asked for more colour; switcher at the bottom of the prototype page):**
- **A · Market tints** — section bands behind At the store (terracotta tint #F7ECE5), the skill row (butter #F6EDD5) and Kids (pistachio #E8EFE2); buttons and text unchanged. NYT's tinted collection blocks.
- **B · Saffron second accent** — saffron #D99A2B for skill dots, the Kids and skill-row eyebrows, the Cook level bar and the active filter tab (#F8EFD8); terracotta keeps money, saves and status.
- **C · Both.** Until Ryan picks, the system stays at "Current" (white, ink, terracotta).

Do not use: green, blue, yellow/lemon, sale red, grape, browns, gradients, shadows, frosted or translucent surfaces, coloured badges. A discount is terracotta text, never a pill. Dark screens use ink, not brown. Hero scrim is `rgba(26,21,17,.55) → 0` (only where text sits on a photo; the current lead keeps text below the photo).

### Typography
- **Lora 500** for the lead title and screen titles (28 px, letter-spacing −0.01em) and section headings (24 px) — the NYT light-serif weight. Lora 700 is now reserved for the wordmark. Lora 600 stays for prices, store heads and cost figures; the flyer-ad price on At the till is Lora 700 at 30 px.
- **DM Sans 700** 16 px for card and row titles (NYT's bold sans under a photo). DM Sans 400 body (14–15 px), 500 meta and inactive tabs, 600 buttons, labels and active tabs.
- Serif body where the page is read, not scanned: deks and bylines are Lora 400 14–15 px; preparation steps are Lora 400 15 px with terracotta numerals.
- Eyebrows and status lines: 11 px, 700, uppercase, tracked 0.1em; ink for section eyebrows, muted for meta, terracotta when it is a status or the lead eyebrow ("Tonight's deal dinner", "You have everything", "Lowest nearby", "Saved").
- Floor 10 px (the "N MIN READ" label only). **No emoji anywhere.** Google Fonts: `Lora:wght@500;600;700` + `DM+Sans:wght@400;500;600;700`.

### Components
- Bottom nav: solid white, 84 px, 1 px hairline top, five text+icon tabs Home · On sale · List · Stores · Profile; active = terracotta 600 (`aria-current="page"`), inactive = muted 500; stroke icons 22 px. No pill, no blur.
- Section head: 2 px ink rule, eyebrow left, "View all ›" or "Sponsored" right, then Lora 500 heading and serif dek. Thin variant (1 px hairline) inside Detail, List, Stores, Price match, At the till and Profile.
- Search field: 50 px, 1 px input border, 4 px radius, magnifier, placeholder as a question, terracotta camera button at the right edge behind a hairline. Results drop in a hairline box with 52 px thumbnails.
- Filter tabs: plain text, DM Sans 600, active = chip-tint block, 4 px radius (replaces the 2 px underline). Chips: 1 px input outline, 16 px radius; selected = ink fill, white text; on-sale chips take a terracotta outline.
- Photos: 2 px radius (square-cornered, as on NYT); bookmark = 36 px white circle, bottom-right of the photo, terracotta when saved. Buttons 10 px radius, 50 px tall; primary = terracotta fill, white text; secondary = 1 px ink outline.
- Cards: 3:2 photo (square in the For you grid), DM Sans 700 title, then **skill line** "● EASY · 8 ingredients · 45 min" (one to three dots for Easy / Medium / Confident), then "$2.80 a serving" (or "Source · ★★★★★ 1,208"), then the status line in tracked caps (terracotta when "You have everything"). Rows scroll horizontally with proximity snapping and a trailing spacer (mandatory snapping jammed desktop trackpads); the For you section is a 2-column grid.
- Trending cards: 3:2 photo, terracotta "why" eyebrow ("Google Trends · 550,000 searches a month"), serif title, "Source · Open recipe ↗", and a status line counting ingredients on sale and in the fridge. The whole card is an external link.
- Cook level: Lora 500 level name, 3 px progress bar (terracotta; saffron in directions B/C), one meta line. Detail pages end with "I cooked this" (secondary button) and "Teaches: pan-searing · deglazing" under the meta line.
- Supplier-photo tiles: square, 2 px radius, paper fill with hairline; 30 px white bookmark circle bottom-right; saved = 2 px terracotta border, filled terracotta bookmark, "SAVED" label under the price; maple-leaf stroke icon top-left for Canadian-made. Store (tracked caps, muted), name, size, sale price (Lora 600), "was" (muted, struck) and % off (terracotta 600) sit under the tile. No verb on the tile.
- Flyer-ad card (At the till): 1 px ink border, ink header bar with the competitor's name in tracked caps, product photo + name + size, price large at right, hairline footer "Flyer valid … · store, km". Ticked items fade the card to 45%.
- Notes rows ("This week"): serif 17 px title, "N MIN READ" label, 96 px 3:2 thumbnail at right, hairlines between.
- Promoted rows: 84 px product tile, store + distance eyebrow, name + price, "Pairs with [recipe] ›" in terracotta, "Sponsored" in the section head.
- Lists are hairline rows, never cards; the one solid terracotta block in the app is the List's price-match banner. Toasts are ink blocks, 10 px radius.
- Icons: one stroke set (1.8–2 px, round caps). Logo: cart with steam (mark A), ink stroke, no tile in the app; wordmark Lora 700; tagline DM Sans 600 tracked caps in terracotta.

### Photography
Every recipe shows an accurate photo of the finished dish — "we want to entice people to cook". The Home lead is a full-bleed 3:2 photo that crossfades every ~4.2 s between four deal dinners while the title, hook and dek fade with it; Detail uses a 320 px hero.

**Photo pool (Higgsfield, 2026-10-26):** 505 images generated with `gpt_image_2_5` (high, 1k, 1.5 credits each): 4 lead dishes at 3:2, 54 editorial recipes at 4:3, 8 trending dishes at 4:3, 41 grocery products at 1:1 as transparent PNGs, and 396 catalogue dishes at 4:3 (one per distinct dish name; Baklava, Moussaka, Tabbouleh, Kibbeh, Fattoush and Baba Ganoush appear in two cuisines and share a photo). About 770 credits in all. Manifest: `design/higgsfield.json` (CDN base + file names under `heroes`, `recipes`, `products`, `catalogue`). Higgsfield publishes a full-resolution `_min.webp` beside every PNG at about a tenth of the bytes; the app loads the WebP. They are hotlinked from Higgsfield's CloudFront CDN until Plateful hosts its own.

**Verification (2026-10-26):** the earlier mismatch problem was the catalogue — 402 recipes shared 71 Unsplash stock photos (one photo stood in for 31 Greek and Lebanese dishes, another for Poutine, Butter Tarts and Nanaimo Bars). Every photo in the app was then checked two ways: the generation prompt on Higgsfield's record was matched to the recipe it is assigned to, and every image was viewed on a labelled contact sheet against its dish name. Two catalogue results drifted from the dish (Injera rendered as a full platter, Kategna as a meat stew) and were regenerated with tighter prompts; everything else matched. Re-run the check after any photo change: `HomeLegacy.tsx` still carries 48 Unsplash URLs for its own header images but is not mounted.

Prompt treatment, to keep every future shot consistent: "<dish>, a <cuisine> dish made with <four key ingredients>, finished and plated as it would be served. Editorial food photography for a cooking magazine, 3/4 overhead angle, warm natural window light from above, soft shadows, white linen or pale oak surface, simple matte stoneware, shallow depth of field, realistic and appetizing, finished dish only, no text, no hands, no logos, uncluttered." For a dish the model tends to over-garnish, say what must not appear ("no stews on top"). Products: "studio product photograph, centered, isolated on a transparent background, soft even lighting, faint shadow beneath, generic packaging with no brand names or text." Supplier product photos will come from the grocer portal (1:1, background removed) and show as paper tiles until uploaded. For production, copy the pool to Plateful's own storage (Supabase Storage or S3), resize each to 2–3 widths and serve with `srcset`.

### Layout
390 × 844 artboards; 22 px gutters; 54 px top safe area (status strip); 84 px tab bar plus 16 px clearance at the bottom; max width 430 px on web; the floating ink bar sits 100 px from the bottom.

---

## Location and promotions (decided 2026-10-14)

- The app stores a postal prefix and a home radius (default 5 km), never an address or history. Every distance, the best-store pick, Promoted near you and price-match ads use it.
- Promoted items come from the grocer portal: a store picks an item on sale, a placement, a radius and preference tags; the app shows it only to households inside the radius with a matching diet or cuisine, paired with recipes that use it. Label it "Sponsored".
- Price match pulls competitor ads for list items from current local flyers, ranks the stores that honour them by policy strength (Superstore tier 1: identical item, any current local flyer, at the till; Walmart tier 2: identical item, local competitor flyers, at checkout; Safeway, Co-op and No Frills none), and prepares a flyer-ad card per item for the cashier. Scan: on-device OCR → product lookup → lowest nearby price, whether this store will match it, and recipes that use the item (daily limit on free; unlimited on Plus).

## Supplier portal (`portal/`, planned)

Claim store → upload deals (CSV, flyer PDF, form) → product photos (1:1, background removed) → store page → Promote (placement, radius, preference tags, weeks, price incl. 5% GST) → analytics (impressions, saves, list adds, cart sends) → Stripe billing. Build order: `server/db/schema.ts` → `server/routes/deals.ts` from DB → `portal/` Vite app → `server/routes/portal/*` + Stripe webhooks. Keep `Home.tsx` untouched until the API returns photographed deals.

---

## Calgary retailers

No Frills, Real Canadian Superstore / PC Express, Safeway / Sobeys / Voilà, Walmart, Calgary Co-op, Costco, T&T. Price match: Superstore, Walmart (identical items in current local flyers). Deal data is static (`CALGARY_DEALS`) until Phase 1 of the portal ships. The prototype's flyer has 41 items (Superstore 11, Co-op 9, Safeway 8, No Frills 7, Walmart 6); its store distances (Safeway Beltline 1.1 km, Co-op Midtown 1.4 km, No Frills 2.3 km, Walmart 4.6 km, Superstore 4.8 km, T&T 6.1 km, Costco 9.4 km from T2P), prices and policy wording are placeholders to confirm against the retailers' current terms.

## Development conventions

- Screens are components under `components/editorial/screens/`; state and actions live in `hooks/usePlateful.tsx` (`const { s, user, ctx, act } = useApp()`). Add actions there, not in screens. Pure logic goes in `lib/editorial/`.
- Styling: the editorial classes in `editorial.css` (`.sec`, `.card`, `.tile`, `.hrow`, `.btn primary`, `.ttab`, `.chip`…) first; Tailwind utilities for one-offs; shadcn primitives from `components/ui/` where a real control is needed. Editorial CSS variables are `--ink --text --mute --faint --hair --line --acc --tint --paper --ground` (not `--muted`/`--input`, which are shadcn's).
- Keep `editorial.css` class names in step with `design/Plateful_editorial.html` so the prototype remains a usable reference.
- Strict TypeScript, no `any`; `pnpm check` after each feature; `pnpm build` before pushing. Imports use `@/`.
- Text that must not wrap mid-unit uses non-breaking spaces: `plural()` and `timeText()` emit "9 ingredients" and "45 min" with U+00A0, `FLYER_WEEK` carries U+00A0 plus a word joiner after the dash (an en dash is a break-after character even between non-breaking spaces), and "N km" in JSX text uses `&nbsp;` (a `\u00A0` escape inside JSX text renders literally). The skill dots (`.lvl::before`) are box-shadows, so the gap before the word is set on the pseudo-element (15 px for two dots, 24 px for three), never on the span. The Stores map places labels with a small collision check (right, left, below, above) after every pin is registered.
- Layout check with real type: Google Fonts are blocked in Claude's workspace, but Lora and DM Sans install locally from the `@fontsource` npm packages (woff2 → ttf via fonttools into `~/.fonts`), after which headless Chromium screenshots match a real browser. `scripts/layout-audit.py` (Playwright, against `dist/public`) walks every screen and reports overlapping or overflowing text (2026-10-27: clean).
- Tell Cursor: "Screens are in components/editorial/screens, state in hooks/usePlateful.tsx, data and logic in lib/editorial. Add to the pattern; do not reintroduce a single-file Home.tsx."

## Known gotchas

- Static `matchScore`/`matchText`/`inPantry` values in `constants.ts` are ignored; status is computed from the fridge, saved deals and the price book.
- Catalogue recipes have no macros yet (the macros row is hidden when absent) and `total`/`save` come from their `totalCost`/`savings` strings.
- Import is simulated (any link resolves to a sample recipe); the camera scan is simulated; the Stores map is a schematic SVG; Plus has no checkout.
- HomeLegacy.tsx still compiles but is not mounted; its meal plan is now the Plan screen; its retailer modal and daily deal are not in the new screens (roadmap 6). It also still references Unsplash header images; everything mounted uses the Higgsfield pool.
- Photos and Google Fonts are blocked in Claude's cloud workspace, so screenshots from there show fallback fonts and empty photo frames; the app is fine in a real browser.
- No test suite yet (vitest installed).
- Claude's cloud workspace cannot download from Higgsfield's CDN or other image hosts, and published artifacts block hotlinked images: prototypes that need photos are delivered as standalone HTML files to open in a browser.

## Roadmap

1. Macros on recipes → 2. allergen profiles → 3. ~~7-day calendar~~ (built: the Plan tab, 2026-10-26) → 4. ~~loyalty wallet~~ (built 2026-10-27; points offers via the portal later) → 5. deal alerts (sonner first, push later) → 6. delivery links (Walmart pickup, DoorDash, Skip; PC Express / Voilà / Walmart / Instacart links are in) → 7. shared household list (base64 share first, Supabase later) → 8. live deals via the portal and feeds, which also makes At the till's auto-clippings real crops of the flyer → 9. price match + At the till + Scan (prototyped) → 10. location-targeted promotions → 11. Trending feed refreshed weekly from Google Trends and TikTok (hand-curated eight in the prototype, 2026-10-26: seafood boil, slow cooker chicken thighs, espagueti verde, burger bowls, baked feta pasta, crispy smashed potatoes, pumpkin loaf, birria tacos) → 12. Cook level: badges, "teaches" tags on all 402 recipes, receipt/loyalty pantry import (the "use it up" row is built, 2026-10-26).

## Design files

- **`design/Plateful_editorial.html` (2026-10-26): the reference build**, now ported into the React app — every screen in the editorial system with the NYT Cooking structure and the Higgsfield photo pool. Single file, vanilla JS, same localStorage keys, scoring and class names as the app. Use it to check display, layout, copy and photo treatment; the app is the source of truth for behaviour.
- Canvas "Plateful Redesign" (Claude Design): Logo directions and Style guide boards; screen boards from the 2026-10-14 pass (pre-NYT structure; photos do not render there).
- Reference builds, features only: `Plateful_v5_1.html` (photo hero and transitions), `plateful_demo_15.html` (display and features the app follows). Neither is a colour or layout reference any more.
- Design history, for context only: brand tokens → warm mustard/brick → B + C blend → editorial market (2026-10-14) → NYT Cooking structure pass (2026-10-26, current).
