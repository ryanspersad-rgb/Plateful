// Welcome flow for first-time shoppers: the landing photo, then four hero pages before onboarding.
// Photos are Higgsfield renders (2026-10-27; _min.webp siblings confirmed in the generation history), hotlinked like the rest of the pool until Plateful hosts its own.
const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/';

export const LANDING_IMG = CDN + 'hf_20261027_205938_849b7901-bdb7-4efd-b5f8-765ca923664b_min.webp'; // eight friends at the table, 2:3
/** The landing photo animated (Seedance 2.5, 2026-10-27): its first three seconds played forward then back, a 6 s seamless loop, 720 × 960, silent, 948 KB. Plays behind the wordmark; the still is the poster and the reduced-motion fallback. */
export const LANDING_VIDEO = 'https://d2ol7oe51mr4n9.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/627b552f-3fa6-4e95-b639-84550eb44bf9.mp4';
export const LANDING_WIDE_IMG = CDN + 'hf_20261027_205939_989e7e13-402d-449d-8cb4-5611f94bfa9c_min.webp'; // 16:9 for the web hero

export interface WelcomePage {
  img: string;
  title: string;
  dek: string;
}

export const WELCOME_PAGES: WelcomePage[] = [
  {
    img: CDN + 'hf_20261027_205111_40497d46-2712-4768-909c-ff21751a4cc8_min.webp',
    title: 'Dinner starts with this week’s flyers.',
    dek: 'Plateful reads every Calgary flyer on Thursday and tells you what’s worth cooking.',
  },
  {
    img: CDN + 'hf_20261027_205938_5f648190-ad03-47b1-b192-844c30887475_min.webp',
    title: 'Start with what you already have.',
    dek: 'Tell us what’s in the fridge. Recipes that use it up move to the top, before it turns.',
  },
  {
    img: CDN + 'hf_20261027_205938_ea572a12-532c-41e0-9725-20de21d2efaa_min.webp',
    title: 'Cook it. We’ll walk you through.',
    dek: 'One step at a time, timers set from the recipe, and a cook level that grows every time you do.',
  },
  {
    img: CDN + 'hf_20261027_205939_5e84150f-e06d-4b49-bd9d-031c439d79b2_min.webp',
    title: 'Shop where it’s cheapest. Match where you can.',
    dek: 'A list grouped by store, the cheapest one-stop near you, and at stores that price match, the competitor ads ready to show at the till.',
  },
];
