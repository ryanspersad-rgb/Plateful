# Plateful

**From Cart to Cuisine.** A Calgary meal-planning app that turns this week's grocery flyers and what's in your fridge into ranked recipes, a store-grouped shopping list, and the cheapest place to shop close to home — with price matching at the till.

Plateful Inc. · Calgary, AB · plateful.ca

## Run it

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm check      # TypeScript
pnpm build      # production build → dist/public
```

Copy `.env.example` to `.env` when Supabase and Stripe keys arrive. Never commit `.env`.

## What's in the box (2026-10-26)

React 19 · TypeScript · Vite 7 · Tailwind v4 · shadcn/ui, built as a mobile app (full viewport on phones, a centred 430 px column on the web).

```
client/src/
  pages/Home.tsx                     # thin shell: PlatefulProvider + Shell
  pages/HomeLegacy.tsx               # the pre-redesign single-file app (meal plan, retailer modal) — not mounted
  hooks/usePlateful.tsx              # app state + every action; persists to localStorage
  components/editorial/
    Shell.tsx                        # screen switch, five-tab bar, ink bar, toast
    Bits.tsx                         # section heads, recipe cards, deal tiles, top bars
    Icons.tsx                        # one stroke icon set + the cart mark
    screens/                         # Splash, Onboarding, Home, OnSale, Detail, List, PriceMatch, Till, Camera,
                                     # Stores, Fridge, Profile, Library (Favourites · History · Import)
  lib/editorial/
    book.ts                          # this week's price book (108 items, 41 on sale), stores, shelf-price matrix,
                                     # competitor ads, price-match policies
    recipes.ts                       # 58 photographed recipes (Higgsfield) with hook, dek, teaches, macros
    trending.ts                      # 8 external recipes from Google Trends / TikTok
    catalogue.ts                     # adapts the 430-recipe catalogue (constants.ts) into the same model
    pricing.ts                       # unitPrice, list totals, pmPlan (ranked by policy, then cost), one-stop
    scoring.ts                       # status, score, recommended, search, cook level, step row
  lib/types.ts                       # Recipe, EditorialRecipe, BookItem, Store, ListItem, TillPlan, Screen…
  lib/constants.ts                   # the recipe catalogue and categories
  editorial.css                      # the design system (white ground, ink, terracotta; Lora + DM Sans)
  index.css                          # Tailwind + shadcn tokens, recoloured to the editorial palette
```

Design reference: `Plateful_editorial.html` (standalone prototype) and the project CLAUDE.md. Class names in `editorial.css` match the prototype so the two stay in step.

## Status

Everything renders from static data: the flyer, prices, distances, policy wording, the camera scan and recipe import are placeholders until the grocer portal and feeds ship (Phase 1). Photos are hotlinked from Higgsfield's CDN until Plateful hosts its own.

Roadmap and business context: project CLAUDE.md and the "Plateful for Grocers" plan.
