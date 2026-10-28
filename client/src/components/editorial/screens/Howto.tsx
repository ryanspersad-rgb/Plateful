// How Plateful works: five numbered steps a new shopper can read in two minutes, each naming the button it refers to.
// Reached from the Welcome landing page ("How it works"), the end of the hero pages and Profile.
import { useApp } from '@/hooks/usePlateful';
import { SALE_KEYS, STORES } from '@/lib/editorial';
import { LANDING_IMG, WELCOME_PAGES } from '@/lib/editorial/welcome';
import { Foot, Pad, Sec, Spacer, Title, Topbar } from '../Bits';
import { I } from '../Icons';

interface Step { img: string; title: string; body: string; note?: string }

export function Howto() {
  const { s, user, act } = useApp();
  const near = STORES.filter((x) => x.km <= user.radiusKm).length;
  const steps: Step[] = [
    {
      img: WELCOME_PAGES[0].img,
      title: 'Thursday, the flyers come to you',
      body: `Every week Plateful reads the Calgary flyers from the ${near} stores inside ${user.radiusKm} km of home and keeps the ${SALE_KEYS.length} deals worth cooking around. They are the “On sale this week” row on Home.`,
      note: 'Tap the bookmark on a deal to save it. Recipes that use it move up your rankings.',
    },
    {
      img: WELCOME_PAGES[1].img,
      title: 'Tell us what’s in the fridge',
      body: 'Type into “What’s in your fridge?” on Home, or open My fridge from Profile. Every recipe then says “You have everything” or “You need 3 more ingredients · $8.40” — the dollars are what the missing items cost at the cheapest store near you.',
      note: 'Perishables get a use-by date. When one is close, Home shows “Use it up” with the recipes that use the most of it.',
    },
    {
      img: WELCOME_PAGES[2].img,
      title: 'Pick a dinner and cook it step by step',
      body: 'Quick picks are dinners built on this week’s prices; “We think you’ll cook” learns from what you save, rate and cook. On a recipe, set the servings, tap “Add N items to list”, then “Cook step by step” for one step at a time with timers read from the recipe.',
      note: 'Afterwards, rate it and note what you added or left out. Four or five stars and “Make it again” lift a recipe for you; one or two stars sink it.',
    },
    {
      img: WELCOME_PAGES[3].img,
      title: 'Shop where it’s cheapest — or where they’ll match',
      body: 'Your list is grouped by store. “How to shop this list” gives you two routes and marks the cheaper one: the single store near you with the lowest total, or a store that price-matches competitor flyers — Superstore and Walmart — where Plateful has already clipped every ad that beats their price.',
      note: 'At the till, open the clippings, show the cashier each ad and tick it off as the lower price is applied. Your loyalty card is a tap away as a barcode.',
    },
    {
      img: LANDING_IMG,
      title: 'In the store, tap Scan',
      body: 'Scan is the camera button at the right end of the search bar on Home. Point it at a shelf tag or a product and you get the lowest price nearby, whether the store you are standing in will match it, and the recipes that use it. Add it to the list or price-match it on the spot.',
    },
  ];
  const close = () => (s.user ? act.back() : act.go('welcome'));
  return (
    <>
      <Topbar left={<><button className="iconbtn" onClick={close} aria-label="Back" style={{ marginLeft: -10 }}><I.chevL /></button><Title title="How Plateful works" meta="Two minutes · flyers in, your fridge in, the cheapest dinner out" /></>} />
      <Pad>
        <p className="dek" style={{ marginTop: 4 }}>Plateful is here to find you the best price for the meals you want to cook: this week’s flyers, what you already have, and the store that will cost you least — or match the flyers at the till.</p>
        {steps.map((st, i) => (
          <Sec key={st.title} eyebrow={`Step ${i + 1}`} thin>
            <div className="howstep">
              <div className="ph"><img src={st.img} alt="" loading="lazy" /></div>
              <h3>{st.title}</h3>
              <p>{st.body}</p>
              {st.note && <p className="note">{st.note}</p>}
            </div>
          </Sec>
        ))}
        <div style={{ display: 'grid', gap: 10, marginTop: 18 }}>
          {s.user ? (
            <button className="btn primary" onClick={() => act.go('home')}>Open my kitchen</button>
          ) : (
            <button className="btn primary" onClick={() => act.go('welcome')}>Get started</button>
          )}
        </div>
      </Pad>
      <Foot>Prices come from this week’s flyers and are checked against the stores inside your radius.</Foot>
      <Spacer />
    </>
  );
}
