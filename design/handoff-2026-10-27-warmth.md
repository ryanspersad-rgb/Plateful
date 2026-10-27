# Plateful · warmth pass handoff (2026-10-27)

Approved on the review board: **1a** photo-led Home, **1c** lived-in-counter photography, **1d/2b** four setup hero pages, **2a** landing with the dinner table. Logo parked. Apply in `ryanspersad-rgb/Plateful` on `main`; `pnpm check && pnpm build` after.

Files in this folder mirror repo paths. Three are drop-in replacements or new files; the rest are small edits listed below.

## Drop in

- `client/src/lib/editorial/welcome.ts` — **new.** Landing + hero-page photos and copy.
- `client/src/components/editorial/screens/Welcome.tsx` — **new.** Landing (page 0) + 4 hero pages; tap halves or swipe; Skip; "Set up my kitchen" → onboarding. "I already have an account" calls `act.skipSplash` for now (no auth yet).
- `client/src/components/editorial/screens/Splash.tsx` — **replace.** Routes first-run to `welcome`, returning users to `home`.
- `client/src/editorial.additions.css` — **append** its contents to the end of `client/src/editorial.css` (then delete the file).

## Edits

### `client/src/lib/types.ts`
Add `'welcome'` to the `Screen` union, after `'splash'`.

### `client/src/components/editorial/Shell.tsx`
```ts
import { Welcome } from './screens/Welcome';
const NO_TABS: Screen[] = ['splash', 'welcome', 'onboarding', 'camera', 'card', 'cook'];
// in SCREENS:
  welcome: () => <Welcome />,
```

### `client/src/hooks/usePlateful.tsx`
```ts
const NO_HISTORY: Screen[] = ['splash', 'welcome', 'onboarding'];
```

### `client/src/components/editorial/Bits.tsx` — RecipeCard
Add a `label` prop that renders the terracotta label on the photo (used by Quick picks only):
```tsx
export function RecipeCard({ r, cls = '', sq, serif, showStatus = true, label }: {
  r: EditorialRecipe; cls?: string; sq?: boolean; serif?: boolean; showStatus?: boolean; label?: string;
}) {
  …
      <div className={`ph${sq ? ' sq' : ''}`}>
        {r.img ? <img … /> : <div className="noimg">…</div>}
        {label && <span className="ph-label">{label}</span>}
        <Bookmark id={r.id} />
      </div>
```

### `client/src/components/editorial/screens/Home.tsx`

**Lead()** — replace the returned JSX. Title, hook and meta move onto the photo; the eyebrow becomes a label; `lead-body` goes away.
```tsx
  return (
    <section className="lead">
      <div className="lead-ph tall" role="button" tabIndex={0} onClick={() => act.detail(lead.id)} onKeyDown={(e) => { if (e.key === 'Enter') act.detail(lead.id); }}>
        {LEADS.map((id, i) => { const r = R(id); return r ? <img key={id} className={i === idx ? 'show' : ''} src={r.img} alt={i === idx ? r.name : ''} /> : null; })}
        <div className="scrim" />
        <span className="ph-label">Tonight’s dinner deal</span>
        <Bookmark id={lead.id} />
        <div className={`over${fade ? ' fade' : ''}`}>
          <h1 className="lead-title">{lead.name}</h1>
          {lead.hook && <div className="hook">{lead.hook}</div>}
          <div className="meta"><b>{perServ(lead)}</b> · {timeText(lead.time)} · You have {st.have} of {st.of}</div>
          <div className="dots">{LEADS.map((id, i) => <i key={id} className={i === idx ? 'on' : ''} />)}</div>
        </div>
      </div>
    </section>
  );
```
The dek is dropped from the lead (it reads on Detail). If you want it back, add `<p className="dek" style={{ color: 'rgba(255,255,255,.9)' }}>{lead.dek}</p>` under the hook.

**Quick picks** — one full-width card per recipe, with a sale-count label:
```tsx
      <Pad>
        <Sec eyebrow="Quick picks" title="Dinners built on this week’s prices" dek="Ranked by how many sale items each one uses.">
          <div className="stack">
            {quick.slice(0, 4).map((r) => {
              const n = status(r, ctx).saleHits;
              return <RecipeCard key={r.id} r={r} label={n ? `${plural(n, 'ingredient')} on sale` : undefined} />;
            })}
          </div>
        </Sec>
      </Pad>
```

## Photography (1c) — `CLAUDE.md` prompt treatment
Replace the surface clause in the recipe prompt with the lived-in counter, and keep it per cuisine so props stay coherent:

> "<dish>, a <cuisine> dish made with <four key ingredients>, finished and plated as it would be served. Editorial food photography for a cooking magazine, 3/4 overhead angle, warm late-afternoon window light, set on a lived-in home kitchen counter: a cutting board, <one or two props natural to the cuisine, e.g. torn bread and a grater for Italian; a mortar, lime halves and herbs for Thai>, a tea towel, the edge of a pan softly out of focus behind, shallow depth of field, realistic and appetizing, no text, no hands, no logos."

Re-run the 58 editorial recipes and 4 leads first (about 93 credits at the previous rate); the 402 catalogue shots after you've seen those. Keep the contact-sheet check from 2026-10-26.

## Photos used
Higgsfield CDN PNGs (`welcome.ts`). Check whether `_min.webp` siblings exist for the 2026-10-27 files before switching to them; the earlier pool had them, these have not been verified.

## Not in this handoff
Logo (parked), the "Tuesday night" video (shot list approved for a test render of shot 4 first), web landing hero (16:9 render is in `welcome.ts` as `LANDING_WIDE_IMG`, no page built yet).
