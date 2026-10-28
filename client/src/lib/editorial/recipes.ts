// 58 photographed recipes. Steps rewritten 2026-10-28 (five to seven per recipe: prep and seasoning cues, a time in digits
// for every cooking action so cook mode can set its timers, and a doneness check; Ryan found the three-line versions too thin).
// Photos re-shot 2026-10-27 in the reference-guided serving-kit treatment (Higgsfield gpt_image_2_5,
// a real photo as the plating reference per cuisine, every dish in its own vessel and setting); the 2026-10-26 oak-table pool is kept
// in design/higgsfield.json under "pool_2026_10_26" for rollback. Leads also carry a 4:5 render (leadImg) for the Home lead.
// Ingredient keys point into the price book (BOOK) so every recipe can be priced against this week's flyers.
import type { EditorialRecipe } from '@/lib/types';

export const EDITORIAL_RECIPES: EditorialRecipe[] = [
  {
    "id": 1,
    "name": "Sheet-Pan Chicken Thighs With Roasted Roots",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012254_e5ddaa7c-09d0-4c32-bc93-5359f4acc45c_min.webp",
    "lead": true,
    "leadImg": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012256_1115bf2d-e6c9-4809-85dc-5d70a48a62dc_min.webp",
    "cuisine": "Weeknight",
    "meal": "Dinner",
    "time": 45,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Family",
      "Weeknight"
    ],
    "total": 11.2,
    "save": 4.1,
    "hook": "Chicken thighs are $2.99/lb at Superstore",
    "dek": "One pan, forty-five minutes, and the roots go sweet at the edges while the skin crisps.",
    "macros": [
      38,
      42,
      16,
      6
    ],
    "ing": [
      [
        "chicken-thighs",
        "1½ lb"
      ],
      [
        "carrots",
        "4"
      ],
      [
        "potatoes",
        "4 medium"
      ],
      [
        "onion",
        "1 red"
      ],
      [
        "olive-oil",
        "2 tbsp"
      ],
      [
        "garlic",
        "3 cloves"
      ],
      [
        "thyme",
        "6 sprigs"
      ],
      [
        "lemon",
        "1"
      ]
    ],
    "steps": [
      "Heat the oven to 425°F (220°C) with a rack in the middle. Cut the potatoes and carrots into chunks about the size of a walnut and the red onion into thick wedges, keeping everything roughly the same size so it cooks evenly.",
      "Tip the vegetables onto a large sheet pan with the olive oil, the garlic cloves smashed with the flat of a knife, the thyme sprigs and a good pinch of salt and pepper. Toss with your hands and spread them in a single layer.",
      "Pat the chicken thighs dry with paper towel and season both sides generously with salt and pepper. Nestle them skin side up among the vegetables so the skin sits clear of the pan and can crisp.",
      "Roast for 35 to 40 minutes until the skin is deep gold and crackling, the potatoes give easily to a knife and the juices run clear when you pierce the thickest thigh. If the vegetables need more colour, lift the chicken onto a plate and give the pan 5 minutes more.",
      "Rest the pan for 5 minutes so the juices settle back into the meat.",
      "Squeeze the lemon over everything, pull out the thyme stems and serve straight from the pan with the juices spooned over."
    ],
    "teaches": [
      "roasting a sheet pan",
      "crisping chicken skin"
    ]
  },
  {
    "id": 2,
    "name": "Beef and Broccoli Over Rice",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012256_a0e129e5-3ef9-410d-9e98-02baf1969e3a_min.webp",
    "lead": true,
    "leadImg": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012255_8ae08686-5614-4275-8b87-0287ad8634af_min.webp",
    "cuisine": "Chinese",
    "meal": "Dinner",
    "time": 30,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Weeknight"
    ],
    "total": 16.4,
    "save": 2,
    "hook": "Broccoli crowns are $1.49 at No Frills",
    "dek": "Thin-sliced steak, a glossy soy-ginger sauce and broccoli that still has some bite.",
    "macros": [
      34,
      58,
      14,
      5
    ],
    "ing": [
      [
        "flank-steak",
        "1 lb"
      ],
      [
        "broccoli",
        "2 crowns"
      ],
      [
        "rice",
        "2 cups"
      ],
      [
        "soy-sauce",
        "3 tbsp"
      ],
      [
        "garlic",
        "3 cloves"
      ],
      [
        "ginger",
        "1 tbsp"
      ],
      [
        "cornstarch",
        "1 tbsp"
      ],
      [
        "sesame-oil",
        "1 tsp"
      ]
    ],
    "steps": [
      "Rinse the rice until the water runs nearly clear, then bring it to a boil with 3 cups water and a pinch of salt, cover and cook on the lowest heat for 15 minutes; rest it off the heat with the lid on while you cook the rest.",
      "Slice the flank steak thinly across the grain (find the lines running along the meat and cut across them) and toss with the cornstarch, 1 tbsp of the soy sauce and a pinch of salt and pepper. Cut the broccoli into small florets, chop the garlic, grate the ginger, and stir the remaining soy sauce, the sesame oil and ¼ cup water together in a small bowl.",
      "Heat 1 tbsp oil in a large skillet or wok over high heat until it shimmers. Sear half the beef in a single layer for 1 to 2 minutes a side until browned at the edges, lift it out, and repeat with the second half; crowding the pan steams the meat instead of searing it.",
      "Add a splash more oil, then the broccoli with 2 tbsp water, and stir-fry for 3 minutes until bright green and just tender. Add the garlic and ginger and stir for 30 seconds until fragrant.",
      "Return the beef and pour in the sauce. Toss over high heat for 1 minute until it thickens and clings to everything.",
      "Taste for salt, fluff the rice and serve the beef and broccoli over it with the sauce spooned on top."
    ],
    "teaches": [
      "slicing against the grain",
      "velveting with cornstarch"
    ]
  },
  {
    "id": 3,
    "name": "Tomato and White Bean Soup",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012255_2592289a-48c1-4c7b-8489-850071df9249_min.webp",
    "lead": true,
    "leadImg": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012254_5e9860fd-a949-449a-a5e5-7a6d16958725_min.webp",
    "cuisine": "Italian",
    "meal": "Dinner",
    "time": 35,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Vegetarian",
      "Weeknight",
      "Kids"
    ],
    "total": 8.6,
    "save": 2.9,
    "hook": "Diced tomatoes are 99¢ a can at No Frills",
    "dek": "A pantry soup that tastes like it simmered all afternoon. Sourdough on the side is not optional.",
    "macros": [
      14,
      48,
      9,
      11
    ],
    "ing": [
      [
        "diced-tomatoes",
        "2 cans"
      ],
      [
        "white-beans",
        "1 can"
      ],
      [
        "onion",
        "1"
      ],
      [
        "garlic",
        "3 cloves"
      ],
      [
        "olive-oil",
        "2 tbsp"
      ],
      [
        "basil",
        "handful"
      ],
      [
        "veg-broth",
        "3 cups"
      ],
      [
        "sourdough",
        "4 slices"
      ]
    ],
    "steps": [
      "Finely chop the onion and garlic, and drain and rinse the white beans.",
      "Warm the olive oil in a large pot over medium heat. Add the onion with a pinch of salt and cook, stirring now and then, for 8 minutes until soft and sweet with no colour, then add the garlic for the last 1 minute.",
      "Pour in the diced tomatoes, the beans and the vegetable broth. Bring to a boil, then lower to a steady simmer and cook uncovered for 20 minutes until the flavour deepens and the soup has thickened a little.",
      "Ladle about half the soup into a blender and blend smooth with the lid held down under a towel (hot soup expands), or give the pot a few pulses with an immersion blender. Stir it back in so the soup has body but still holds whole beans.",
      "Season with salt and plenty of black pepper, tasting as you go, and tear in most of the basil.",
      "Toast the sourdough until golden. Serve the soup with the rest of the basil, a drizzle of olive oil and the toast on the side."
    ],
    "teaches": [
      "building a soup base",
      "blending for body"
    ]
  },
  {
    "id": 4,
    "name": "Salmon With Lemon, Dill and New Potatoes",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012254_c9039341-87cd-4ee0-9efa-b10ebbfec82e_min.webp",
    "lead": true,
    "leadImg": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012255_e487343d-9912-42f5-a003-340e874af122_min.webp",
    "cuisine": "Weeknight",
    "meal": "Dinner",
    "time": 30,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Weeknight",
      "Pescatarian"
    ],
    "total": 17.3,
    "save": 5,
    "hook": "Salmon is $9.99/lb at Safeway Beltline, 1.1 km away",
    "dek": "Crisp skin, soft butter-tossed potatoes and a handful of dill. The whole thing takes half an hour.",
    "macros": [
      36,
      28,
      22,
      4
    ],
    "ing": [
      [
        "salmon",
        "1 lb"
      ],
      [
        "potatoes",
        "1 lb small"
      ],
      [
        "green-beans",
        "200 g"
      ],
      [
        "lemon",
        "1"
      ],
      [
        "dill",
        "small bunch"
      ],
      [
        "butter",
        "2 tbsp"
      ],
      [
        "garlic",
        "2 cloves"
      ]
    ],
    "steps": [
      "Halve any larger potatoes so they are all about the same size, cover with cold water in a pot, add a big pinch of salt and bring to a boil. Simmer for 15 to 18 minutes until a knife slides in with no resistance.",
      "Trim the green beans and drop them into the potato pot for the last 3 minutes, until bright green and still a little crisp.",
      "Meanwhile pat the salmon dry with paper towel, especially the skin, and season both sides with salt and pepper. Zest the lemon, chop the dill and finely chop the garlic.",
      "Heat 1 tbsp oil in a non-stick or well-seasoned skillet over medium-high until it shimmers. Lay the salmon in skin side down, press each piece flat with a spatula for 10 seconds, and cook without moving it for 5 to 6 minutes until the skin is crisp and the flesh has turned opaque two thirds of the way up; flip for 1 minute more and take it off the heat.",
      "Drain the potatoes and beans and return them to the warm pot with the butter, garlic, lemon zest, half the dill and a pinch of salt. Toss until the butter melts and coats everything.",
      "Plate the potatoes and beans, set the salmon on top skin side up, squeeze the lemon over the fish and scatter the rest of the dill. Serve at once."
    ],
    "teaches": [
      "searing skin-side down"
    ]
  },
  {
    "id": 5,
    "name": "One-Pot Chicken and Rice",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012254_2e0434c0-56da-41fa-8025-1c9b1761c07a_min.webp",
    "cuisine": "Weeknight",
    "meal": "Dinner",
    "time": 40,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Family",
      "Kids",
      "Weeknight"
    ],
    "total": 9.8,
    "save": 1.5,
    "macros": [
      32,
      52,
      12,
      3
    ],
    "ing": [
      [
        "chicken-thighs",
        "1 lb"
      ],
      [
        "rice",
        "1½ cups"
      ],
      [
        "peas",
        "1 cup"
      ],
      [
        "onion",
        "1"
      ],
      [
        "garlic",
        "2 cloves"
      ],
      [
        "chicken-broth",
        "3 cups"
      ],
      [
        "lemon",
        "1"
      ],
      [
        "parsley",
        "handful"
      ]
    ],
    "steps": [
      "Pat the chicken thighs dry and season well with salt and pepper. Dice the onion and finely chop the garlic.",
      "Heat 1 tbsp oil in a lidded pot over medium-high until it shimmers. Brown the thighs skin side down for 5 to 6 minutes until deep gold, then 2 minutes on the other side, and move them to a plate; they will not be cooked through yet.",
      "Lower the heat to medium, add the onion to the fat with a pinch of salt and cook for 4 to 5 minutes until soft, then stir in the garlic for 30 seconds.",
      "Stir in the rice and cook for 1 minute so every grain is coated. Pour in the chicken broth, scrape up the browned bits from the bottom, and set the chicken skin side up on top.",
      "Bring to a boil, cover, and drop to the lowest heat for 18 minutes. Keep the lid on; the rice is cooking in the steam.",
      "Scatter the peas over, cover again and rest off the heat for 5 minutes until the peas are hot and the last of the broth is absorbed. Fluff the rice with a fork, squeeze the lemon over, scatter the parsley and serve from the pot."
    ],
    "teaches": [
      "one-pot rice",
      "resting a dish"
    ]
  },
  {
    "id": 6,
    "name": "Spaghetti Bolognese",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012256_0bbc48d3-e633-46b2-8471-08bc7d6445b1_min.webp",
    "cuisine": "Italian",
    "meal": "Dinner",
    "time": 50,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Family",
      "Kids"
    ],
    "total": 11.4,
    "save": 2.7,
    "macros": [
      30,
      62,
      15,
      5
    ],
    "ing": [
      [
        "ground-beef",
        "1 lb"
      ],
      [
        "pasta",
        "400 g"
      ],
      [
        "diced-tomatoes",
        "1 can"
      ],
      [
        "onion",
        "1"
      ],
      [
        "garlic",
        "2 cloves"
      ],
      [
        "carrots",
        "1"
      ],
      [
        "parmesan",
        "to serve"
      ],
      [
        "olive-oil",
        "2 tbsp"
      ]
    ],
    "steps": [
      "Finely dice the onion and carrot and chop the garlic; the smaller they are, the more they melt into the sauce.",
      "Warm the olive oil in a wide pot over medium heat. Add the onion and carrot with a pinch of salt and cook for 8 minutes until soft and sweet, then the garlic for 1 minute.",
      "Turn the heat up to medium-high, add the beef and break it apart with a spoon. Cook for 6 to 8 minutes, letting it sit between stirs so it browns rather than steams, until no pink remains and the bottom of the pot has brown bits.",
      "Pour in the diced tomatoes with half a can of water, season with salt and pepper and bring to a simmer. Lower the heat and let it bubble gently, uncovered, for 30 minutes, stirring now and then, until thick and glossy with the fat risen to the surface.",
      "While the sauce finishes, bring a large pot of water to a boil and salt it well (it should taste like the sea). Cook the spaghetti for 8 to 9 minutes until just firm to the bite, a touch under the packet time, and save a cup of the cooking water before draining.",
      "Taste the sauce and adjust the salt. Toss the spaghetti through the sauce with a splash of pasta water until every strand is coated, and serve with parmesan grated over."
    ],
    "teaches": [
      "a soffritto",
      "a slow tomato sauce"
    ]
  },
  {
    "id": 7,
    "name": "Butter Chicken With Naan",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012255_8ecd7a8c-da05-4569-b7e0-41ab255ef33a_min.webp",
    "cuisine": "Indian",
    "meal": "Dinner",
    "time": 45,
    "serv": 4,
    "diff": "Medium",
    "tags": [
      "Family"
    ],
    "total": 15.6,
    "save": 2.2,
    "macros": [
      36,
      44,
      24,
      3
    ],
    "ing": [
      [
        "chicken-thighs",
        "1½ lb"
      ],
      [
        "diced-tomatoes",
        "1 can"
      ],
      [
        "cream",
        "1 cup"
      ],
      [
        "butter",
        "3 tbsp"
      ],
      [
        "garlic",
        "3 cloves"
      ],
      [
        "ginger",
        "1 tbsp"
      ],
      [
        "garam-masala",
        "2 tsp"
      ],
      [
        "naan",
        "4"
      ],
      [
        "rice",
        "1½ cups"
      ]
    ],
    "steps": [
      "Rinse the rice and bring it to a boil with 2¼ cups water and a pinch of salt, cover and cook on the lowest heat for 15 minutes, then rest it off the heat with the lid on.",
      "Cut the chicken thighs into bite-sized pieces, pat dry and season with salt and half the garam masala. Finely chop the garlic, grate the ginger and blend the diced tomatoes smooth.",
      "Melt 1 tbsp of the butter in a wide pan over medium-high heat. Sear the chicken in two batches for 3 to 4 minutes a batch until golden at the edges but not cooked through, and move it to a plate.",
      "Lower the heat to medium and melt the remaining butter. Fry the garlic and ginger for 1 minute until fragrant, then add the rest of the garam masala and stir for 30 seconds so the spice toasts in the butter without burning.",
      "Pour in the blended tomatoes, season with salt and simmer for 10 minutes, stirring, until the sauce thickens and darkens a shade.",
      "Return the chicken with its juices and simmer for 8 to 10 minutes until the pieces are cooked through with no pink in the centre of the largest one. Stir in the cream, warm through for 2 minutes without boiling, and taste for salt.",
      "Warm the naan in a dry pan for 1 minute a side. Fluff the rice and serve the butter chicken over it with the naan for mopping up the sauce."
    ],
    "teaches": [
      "toasting spices",
      "finishing with cream"
    ]
  },
  {
    "id": 8,
    "name": "Pork Tenderloin With Apples and Sage",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012256_2b83ff75-6bec-4256-9704-e87005d587c8_min.webp",
    "cuisine": "Weeknight",
    "meal": "Dinner",
    "time": 35,
    "serv": 4,
    "diff": "Medium",
    "tags": [
      "Weeknight"
    ],
    "total": 14.2,
    "save": 0,
    "macros": [
      34,
      22,
      14,
      3
    ],
    "ing": [
      [
        "pork-tenderloin",
        "1"
      ],
      [
        "apples",
        "2"
      ],
      [
        "sage",
        "8 leaves"
      ],
      [
        "butter",
        "2 tbsp"
      ],
      [
        "onion",
        "1"
      ],
      [
        "chicken-broth",
        "½ cup"
      ]
    ],
    "steps": [
      "Heat the oven to 400°F (200°C). Trim the silvery membrane from the tenderloin if there is one, pat it dry and season all over with salt and pepper; slice the onion and cut the apples into wedges with the core removed.",
      "Heat 1 tbsp of the butter in an ovenproof skillet over medium-high until it foams and goes quiet. Sear the pork for 2 minutes a side, turning four times, until browned all over, about 8 minutes in all.",
      "Move the skillet to the oven and roast for 12 to 15 minutes until a thermometer in the thickest part reads 145°F (63°C), or the meat feels springy with a little give. Lift it onto a board and rest for 8 minutes; it will stay pink and juicy.",
      "Put the skillet back over medium heat (the handle is hot) with the remaining butter. Add the onion and apples with a pinch of salt and cook for 5 to 6 minutes until the apples are golden at the edges but still hold their shape, adding the sage leaves for the last 1 minute until they crisp.",
      "Pour in the chicken broth and scrape the browned bits from the bottom of the pan. Let it bubble for 2 minutes until it reduces to a glossy spoonful of sauce, and season to taste.",
      "Slice the pork into thick medallions, lay them over the apples and onion and spoon the pan juices over. Serve at once."
    ],
    "teaches": [
      "pan-roasting pork",
      "deglazing"
    ]
  },
  {
    "id": 9,
    "name": "Shakshuka",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012343_cd7629d2-d880-476e-8c41-556abd4165ec_min.webp",
    "cuisine": "Middle Eastern",
    "meal": "Brunch",
    "time": 30,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Vegetarian",
      "Weeknight"
    ],
    "total": 7.9,
    "save": 2.4,
    "macros": [
      18,
      24,
      16,
      6
    ],
    "ing": [
      [
        "eggs",
        "4"
      ],
      [
        "diced-tomatoes",
        "1 can"
      ],
      [
        "peppers",
        "1"
      ],
      [
        "onion",
        "1"
      ],
      [
        "garlic",
        "2 cloves"
      ],
      [
        "cumin",
        "1 tsp"
      ],
      [
        "feta",
        "60 g"
      ],
      [
        "sourdough",
        "4 slices"
      ]
    ],
    "steps": [
      "Slice the onion and pepper thinly and chop the garlic.",
      "Warm 2 tbsp oil in a wide skillet with a lid over medium heat. Cook the onion and pepper with a pinch of salt for 8 minutes, stirring now and then, until soft and starting to colour at the edges.",
      "Stir in the garlic and cumin for 1 minute until fragrant, then pour in the diced tomatoes. Season with salt and pepper and simmer for 10 minutes until thick enough that a spoon leaves a trail.",
      "Make four wells in the sauce with the back of a spoon and crack an egg into each. Season the eggs, cover and cook over low heat for 6 to 8 minutes until the whites are set and the yolks still wobble when you nudge the pan.",
      "Meanwhile toast the sourdough until golden.",
      "Crumble the feta over the top and serve straight from the pan, with the toast for dipping into the yolks."
    ],
    "teaches": [
      "poaching eggs in sauce"
    ]
  },
  {
    "id": 10,
    "name": "Thai Green Curry",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012344_956dde2d-3e9e-45c6-b88e-42bc55711b05_min.webp",
    "cuisine": "Thai",
    "meal": "Dinner",
    "time": 30,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Weeknight"
    ],
    "total": 13.1,
    "save": 1.5,
    "macros": [
      30,
      46,
      26,
      4
    ],
    "ing": [
      [
        "chicken-thighs",
        "1 lb"
      ],
      [
        "coconut-milk",
        "1 can"
      ],
      [
        "curry-paste",
        "3 tbsp"
      ],
      [
        "green-beans",
        "150 g"
      ],
      [
        "peppers",
        "1"
      ],
      [
        "basil",
        "handful"
      ],
      [
        "rice",
        "1½ cups"
      ],
      [
        "lime",
        "1"
      ]
    ],
    "steps": [
      "Rinse the rice and bring it to a boil with 2¼ cups water and a pinch of salt, cover and cook on the lowest heat for 15 minutes, then rest it off the heat with the lid on.",
      "Cut the chicken thighs into bite-sized pieces and season lightly with salt. Trim the green beans and cut them in half, and slice the pepper into strips.",
      "Open the coconut milk without shaking it and spoon the thick cream from the top into a wide pan over medium-high heat. Add the curry paste and fry for 2 to 3 minutes, stirring, until it smells fragrant and the oil starts to separate and glisten at the edges.",
      "Add the chicken and stir for 2 minutes to coat it in the paste, then pour in the rest of the coconut milk and half a can of water. Bring to a simmer and cook for 10 minutes until the chicken is cooked through.",
      "Add the green beans and pepper and simmer for 4 to 5 minutes more until the beans are tender but still bright. Taste: it should be salty enough to carry the heat, so add salt if it needs it.",
      "Take the pan off the heat, squeeze in half the lime and tear in most of the basil. Serve over the rice with the remaining basil and the rest of the lime in wedges."
    ],
    "teaches": [
      "frying curry paste",
      "balancing a curry"
    ]
  },
  {
    "id": 11,
    "name": "Beef Tacos With Pico de Gallo",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012343_9285841c-b3e2-4c13-bbea-52371b98a35c_min.webp",
    "cuisine": "Mexican",
    "meal": "Dinner",
    "time": 25,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Family",
      "Kids",
      "Weeknight"
    ],
    "total": 14.3,
    "save": 3.6,
    "macros": [
      28,
      36,
      20,
      6
    ],
    "ing": [
      [
        "ground-beef",
        "1 lb"
      ],
      [
        "tortillas",
        "12"
      ],
      [
        "avocado",
        "2"
      ],
      [
        "tomatoes",
        "2"
      ],
      [
        "onion",
        "½"
      ],
      [
        "lime",
        "2"
      ],
      [
        "cilantro",
        "handful"
      ],
      [
        "cheddar",
        "100 g"
      ]
    ],
    "steps": [
      "Make the pico first so it has time to mellow: dice the tomatoes and the half onion small, chop most of the cilantro, and toss with the juice of 1 lime and a good pinch of salt.",
      "Grate the cheddar. Halve the avocados, slice them in the skin and scoop out with a spoon, then squeeze a little lime over so they stay green.",
      "Heat 1 tbsp oil in a skillet over medium-high until it shimmers. Add the beef, season generously with salt and pepper, and leave it for 2 minutes before breaking it up so it browns properly, then cook for 6 to 8 minutes in all until deeply browned with no pink left.",
      "Spoon off most of the fat, then stir in 2 tbsp of the juice from the pico and a splash of water and cook for 1 minute so the beef stays a little saucy rather than dry. Taste and adjust the salt.",
      "Warm the tortillas in a dry pan for 20 to 30 seconds a side until soft and spotted, stacking them in a clean tea towel to keep warm.",
      "Build the tacos at the table: beef, pico, avocado, cheddar and the rest of the cilantro, with the second lime cut into wedges for squeezing over."
    ],
    "teaches": [
      "a quick pico",
      "warming tortillas"
    ]
  },
  {
    "id": 12,
    "name": "Lemon Garlic Shrimp Linguine",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012345_79064833-d565-4d0c-ade0-e6f4f3e522e9_min.webp",
    "cuisine": "Italian",
    "meal": "Dinner",
    "time": 25,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Weeknight",
      "Pescatarian"
    ],
    "total": 17.9,
    "save": 0,
    "src": "RecipeTin Eats",
    "rating": 4.9,
    "count": 3412,
    "macros": [
      30,
      60,
      14,
      3
    ],
    "ing": [
      [
        "shrimp",
        "340 g"
      ],
      [
        "pasta",
        "340 g"
      ],
      [
        "lemon",
        "1"
      ],
      [
        "garlic",
        "4 cloves"
      ],
      [
        "butter",
        "3 tbsp"
      ],
      [
        "parsley",
        "handful"
      ],
      [
        "chili-flakes",
        "pinch"
      ],
      [
        "parmesan",
        "to serve"
      ]
    ],
    "steps": [
      "Bring a large pot of water to a boil and salt it well. Pat the shrimp dry and season with salt and pepper, slice the garlic thinly, zest and juice the lemon, and chop the parsley.",
      "Cook the pasta for 8 to 9 minutes until just firm to the bite, a touch under the packet time, and scoop out a cup of the cooking water before draining.",
      "While the pasta cooks, melt the butter in a large skillet over medium heat. Add the garlic and chili flakes and cook for 1 to 2 minutes until the garlic is soft and golden at the edges, not brown.",
      "Turn the heat to medium-high, add the shrimp in a single layer and cook for 2 minutes a side until pink and curled into a loose C; a tight O means they are overdone, so pull them as soon as they turn.",
      "Add the drained pasta to the skillet with the lemon zest, the juice and half a cup of the pasta water. Toss over the heat for 1 minute until the sauce turns glossy and coats the strands, adding more water if it looks dry.",
      "Toss through the parsley, taste for salt and lemon, and serve with parmesan grated over."
    ],
    "teaches": [
      "cooking shrimp just right",
      "using pasta water"
    ]
  },
  {
    "id": 13,
    "name": "Chicken Caesar Salad",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012346_774b7e21-b605-49c2-bbd0-5618299332d1_min.webp",
    "cuisine": "Salad",
    "meal": "Lunch",
    "time": 20,
    "serv": 2,
    "diff": "Easy",
    "tags": [
      "Weeknight"
    ],
    "total": 11.5,
    "save": 1.5,
    "macros": [
      40,
      18,
      22,
      4
    ],
    "ing": [
      [
        "chicken-thighs",
        "2"
      ],
      [
        "romaine",
        "1 head"
      ],
      [
        "parmesan",
        "40 g"
      ],
      [
        "croutons",
        "1 cup"
      ],
      [
        "caesar-dressing",
        "3 tbsp"
      ],
      [
        "lemon",
        "½"
      ]
    ],
    "steps": [
      "Pat the chicken thighs dry, press them flat and season both sides generously with salt and pepper.",
      "Heat 1 tbsp oil in a skillet over medium-high until it shimmers. Cook the thighs for 5 to 6 minutes on the first side until deeply golden, then 4 to 5 minutes on the other until the juices run clear and the thickest part is no longer pink.",
      "Rest the chicken on a board for 5 minutes, then slice it. Meanwhile separate the romaine leaves, rinse and dry them well (wet leaves shed the dressing), tear them into big pieces and shave or grate the parmesan.",
      "In a large bowl, toss the romaine with the caesar dressing, the croutons and most of the parmesan until every leaf is coated.",
      "Pile into bowls, lay the sliced chicken on top, squeeze the half lemon over and finish with the rest of the parmesan and a grind of black pepper."
    ],
    "teaches": [
      "grilling chicken",
      "dressing a salad"
    ]
  },
  {
    "id": 14,
    "name": "Vegetable Fried Rice",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012344_193a1e3c-28a8-451b-a4f5-cbcc4e14e794_min.webp",
    "cuisine": "Chinese",
    "meal": "Dinner",
    "time": 20,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Vegetarian",
      "Kids",
      "Weeknight"
    ],
    "total": 5.4,
    "save": 1.2,
    "macros": [
      12,
      54,
      10,
      4
    ],
    "ing": [
      [
        "rice",
        "3 cups cooked"
      ],
      [
        "eggs",
        "2"
      ],
      [
        "peas",
        "1 cup"
      ],
      [
        "carrots",
        "1"
      ],
      [
        "green-onion",
        "3"
      ],
      [
        "soy-sauce",
        "2 tbsp"
      ],
      [
        "sesame-oil",
        "1 tsp"
      ],
      [
        "garlic",
        "2 cloves"
      ]
    ],
    "steps": [
      "Finely dice the carrot, chop the garlic and slice the green onions, keeping the white and green parts separate. Beat the eggs with a pinch of salt and break up the cold rice with your fingers so there are no clumps.",
      "Heat 1 tbsp oil in a large wok or skillet over high heat until it smokes faintly. Pour in the eggs and scramble for 30 to 45 seconds until just set, then tip them onto a plate.",
      "Add another 1 tbsp oil, then the carrot and the white parts of the green onions, and stir-fry for 2 minutes until the carrot starts to soften. Add the garlic for 30 seconds.",
      "Add the rice and spread it across the pan. Let it sit for 1 minute to crisp on the bottom, then toss and repeat for 3 to 4 minutes until the grains are hot and some are toasted and crackling.",
      "Add the peas and pour the soy sauce around the edge of the pan so it sizzles, then toss for 1 minute until the peas are hot.",
      "Return the eggs, add the sesame oil and the green parts of the green onions, toss once and taste for salt. Serve straight away."
    ],
    "teaches": [
      "a hot wok",
      "using day-old rice"
    ]
  },
  {
    "id": 15,
    "name": "Chili con Carne",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012344_267a60cc-3806-470a-9caa-9fe3986798dc_min.webp",
    "cuisine": "Tex-Mex",
    "meal": "Dinner",
    "time": 60,
    "serv": 6,
    "diff": "Easy",
    "tags": [
      "Family"
    ],
    "total": 13.8,
    "save": 4.9,
    "macros": [
      28,
      30,
      14,
      10
    ],
    "ing": [
      [
        "ground-beef",
        "1 lb"
      ],
      [
        "diced-tomatoes",
        "2 cans"
      ],
      [
        "kidney-beans",
        "1 can"
      ],
      [
        "onion",
        "1"
      ],
      [
        "peppers",
        "1"
      ],
      [
        "garlic",
        "3 cloves"
      ],
      [
        "chili-powder",
        "2 tbsp"
      ],
      [
        "cheddar",
        "to serve"
      ],
      [
        "sour-cream",
        "to serve"
      ]
    ],
    "steps": [
      "Dice the onion and pepper and chop the garlic. Drain and rinse the kidney beans.",
      "Heat 1 tbsp oil in a large pot over medium-high until it shimmers. Add the beef, season with salt, and cook for 8 minutes, breaking it up and letting it sit between stirs, until browned with crusty bits.",
      "Add the onion and pepper and cook for 5 minutes until soft, then the garlic and chili powder for 1 minute, stirring, until the spice smells toasty.",
      "Pour in both cans of tomatoes and 1 cup of water, scrape the bottom of the pot and bring to a simmer. Season with salt and pepper.",
      "Lower the heat and simmer uncovered for 40 minutes, stirring every so often, until thick, dark and rich and a spoon stands up a little in it. Add the beans for the last 10 minutes.",
      "Taste and adjust the salt; it should taste deep rather than sharp. Serve in bowls with grated cheddar and a spoonful of sour cream."
    ],
    "teaches": [
      "browning ground beef",
      "a long simmer"
    ]
  },
  {
    "id": 16,
    "name": "Margherita Pizza",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012346_ffe1b9aa-a39a-4a2e-9af0-50be98d431be_min.webp",
    "cuisine": "Italian",
    "meal": "Dinner",
    "time": 30,
    "serv": 2,
    "diff": "Easy",
    "tags": [
      "Vegetarian",
      "Kids",
      "Family"
    ],
    "total": 9.3,
    "save": 0.7,
    "macros": [
      22,
      58,
      18,
      3
    ],
    "ing": [
      [
        "pizza-dough",
        "1"
      ],
      [
        "diced-tomatoes",
        "½ can"
      ],
      [
        "mozzarella",
        "200 g"
      ],
      [
        "basil",
        "handful"
      ],
      [
        "olive-oil",
        "1 tbsp"
      ],
      [
        "garlic",
        "1 clove"
      ]
    ],
    "steps": [
      "Heat the oven to its highest setting, 500°F (260°C) or more, with a heavy baking sheet or pizza stone on the middle rack for at least 20 minutes; a scorching surface is what makes the base crisp. Take the dough out of the fridge so it loses its chill.",
      "Drain the diced tomatoes well, then crush them with a fork with the garlic finely grated in, a pinch of salt and half the olive oil. Tear the mozzarella into pieces and pat it dry with paper towel so the pizza does not go soggy.",
      "On a lightly oiled sheet of parchment, press the dough out from the centre with your fingertips, leaving the rim a little thicker, then stretch it gently until it is about 12 inches across. If it springs back, let it rest for 5 minutes and try again.",
      "Spread the tomato thinly to within an inch of the edge and dot over the mozzarella.",
      "Slide the pizza on its parchment onto the hot sheet and bake for 8 to 10 minutes until the rim is blistered and golden and the cheese is bubbling with a few brown spots.",
      "Tear the basil over, drizzle with the rest of the olive oil, cut and serve."
    ],
    "teaches": [
      "stretching dough",
      "a very hot oven"
    ]
  },
  {
    "id": 17,
    "name": "Korean Beef Bowl",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012346_5da30094-2a17-4a03-84f4-d8ef38bc646b_min.webp",
    "cuisine": "Korean",
    "meal": "Dinner",
    "time": 30,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Weeknight"
    ],
    "total": 18.7,
    "save": 0,
    "src": "Serious Eats",
    "rating": 4.7,
    "count": 1208,
    "macros": [
      34,
      56,
      18,
      4
    ],
    "ing": [
      [
        "flank-steak",
        "1 lb"
      ],
      [
        "rice",
        "2 cups"
      ],
      [
        "soy-sauce",
        "3 tbsp"
      ],
      [
        "garlic",
        "3 cloves"
      ],
      [
        "sesame-oil",
        "1 tbsp"
      ],
      [
        "brown-sugar",
        "1 tbsp"
      ],
      [
        "eggs",
        "4"
      ],
      [
        "cucumber",
        "1"
      ],
      [
        "carrots",
        "1"
      ],
      [
        "kimchi",
        "1 cup"
      ]
    ],
    "steps": [
      "Slice the flank steak as thinly as you can across the grain (10 minutes in the freezer first makes this easier). Stir the soy sauce, brown sugar, finely chopped garlic and half the sesame oil together, add the beef and marinate for 15 minutes while you do everything else.",
      "Rinse the rice and bring it to a boil with 3 cups water and a pinch of salt, cover and cook on the lowest heat for 15 minutes, then rest it off the heat with the lid on.",
      "Slice the cucumber thinly and shave the carrot into ribbons with a peeler, and season both with a pinch of salt.",
      "Heat 1 tbsp oil in a large skillet over high heat until it smokes faintly. Sear the beef in two batches, in a single layer, for 1 to 2 minutes a side until caramelised at the edges, and move it to a plate; the marinade should bubble into a glaze, not pool.",
      "Wipe the pan, add 1 tbsp oil over medium-high and fry the eggs for 2 to 3 minutes until the whites are set and crisp at the edges while the yolks stay runny.",
      "Build the bowls: rice, then beef, cucumber, carrot and kimchi in sections, a fried egg on top, and the rest of the sesame oil drizzled over."
    ],
    "teaches": [
      "a quick marinade",
      "a fried egg"
    ]
  },
  {
    "id": 18,
    "name": "Mushroom Risotto",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012343_1066b7c0-dd0d-4d34-8edb-ae77a41fa3d2_min.webp",
    "cuisine": "Italian",
    "meal": "Dinner",
    "time": 45,
    "serv": 4,
    "diff": "Confident",
    "tags": [
      "Vegetarian"
    ],
    "total": 11.9,
    "save": 0,
    "src": "Food52",
    "rating": 4.8,
    "count": 940,
    "macros": [
      14,
      62,
      16,
      3
    ],
    "ing": [
      [
        "arborio",
        "1½ cups"
      ],
      [
        "mushrooms",
        "300 g"
      ],
      [
        "onion",
        "1"
      ],
      [
        "garlic",
        "2 cloves"
      ],
      [
        "parmesan",
        "60 g"
      ],
      [
        "butter",
        "3 tbsp"
      ],
      [
        "veg-broth",
        "5 cups"
      ],
      [
        "thyme",
        "4 sprigs"
      ]
    ],
    "steps": [
      "Bring the vegetable broth to a simmer in a saucepan and keep it there over low heat; cold broth stops the rice every time you add it. Finely dice the onion, chop the garlic, slice the mushrooms, strip the thyme leaves from their stems and grate the parmesan.",
      "Melt 1 tbsp of the butter in a wide, heavy pan over medium-high heat. Add the mushrooms in a single layer with a pinch of salt and leave them for 3 minutes before stirring, then cook for 4 to 5 minutes more until browned and the liquid they release has cooked off; tip them onto a plate.",
      "Lower the heat to medium, melt another 1 tbsp butter and cook the onion with a pinch of salt for 5 minutes until soft and translucent, then the garlic and thyme for 1 minute.",
      "Add the arborio and stir for 2 minutes until the grains turn translucent at the edges and smell faintly toasted.",
      "Add a ladle of hot broth and stir until it is almost absorbed before adding the next. Keep going, a ladle at a time with near-constant stirring, for 18 to 20 minutes until the rice is creamy and tender with the slightest bite in the centre; you may not need all the broth, or you may need a splash of hot water.",
      "Take the pan off the heat and beat in the mushrooms, the last 1 tbsp butter and the parmesan until glossy; the risotto should flow slowly when you tilt the pan, so loosen it with a little broth if it stands stiff. Season with salt and pepper to taste.",
      "Cover and rest for 2 minutes, then serve in warm bowls with more parmesan."
    ],
    "teaches": [
      "toasting rice",
      "adding stock slowly"
    ]
  },
  {
    "id": 19,
    "name": "Grilled Cheese and Tomato Soup",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012344_7c1c7104-8a37-401d-89a1-e4e363ef33f1_min.webp",
    "cuisine": "Kids",
    "meal": "Lunch",
    "time": 25,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Kids",
      "Vegetarian"
    ],
    "total": 8.7,
    "save": 4,
    "macros": [
      20,
      44,
      24,
      4
    ],
    "ing": [
      [
        "sourdough",
        "8 slices"
      ],
      [
        "cheddar",
        "200 g"
      ],
      [
        "butter",
        "3 tbsp"
      ],
      [
        "diced-tomatoes",
        "1 can"
      ],
      [
        "onion",
        "1"
      ],
      [
        "cream",
        "½ cup"
      ],
      [
        "garlic",
        "1 clove"
      ]
    ],
    "steps": [
      "Dice the onion and chop the garlic. Warm 1 tbsp of the butter in a saucepan over medium heat and cook the onion with a pinch of salt for 5 minutes until soft, then the garlic for 1 minute.",
      "Add the diced tomatoes and 1 cup of water, season with salt and pepper and simmer for 10 minutes until the onion is completely tender.",
      "Blend the soup smooth (in a blender with the lid held down under a towel, or with an immersion blender in the pot), stir in the cream and keep it warm over low heat. Taste and adjust the salt.",
      "Grate the cheddar. Spread the remaining butter on one side of each slice of sourdough, lay four slices butter side down, divide the cheese over them and top with the other slices, butter side out.",
      "Cook the sandwiches in a skillet over medium-low heat for 4 to 5 minutes a side, pressing gently with a spatula, until the bread is deeply golden and the cheese has melted all the way through; low heat gives the cheese time to melt before the bread burns.",
      "Cut on the diagonal and serve beside bowls of the soup for dunking."
    ],
    "teaches": [
      "low and slow grilled cheese"
    ]
  },
  {
    "id": 20,
    "name": "Chicken Quesadillas",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012345_88f6ea39-84e7-4eb4-b0d9-6c6e609446e4_min.webp",
    "cuisine": "Mexican",
    "meal": "Dinner",
    "time": 25,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Kids",
      "Family",
      "Weeknight"
    ],
    "total": 12.4,
    "save": 3.4,
    "macros": [
      32,
      40,
      22,
      4
    ],
    "ing": [
      [
        "chicken-thighs",
        "1 lb"
      ],
      [
        "tortillas",
        "8"
      ],
      [
        "cheddar",
        "200 g"
      ],
      [
        "peppers",
        "1"
      ],
      [
        "onion",
        "1"
      ],
      [
        "sour-cream",
        "to serve"
      ],
      [
        "salsa",
        "to serve"
      ]
    ],
    "steps": [
      "Cut the chicken thighs into small pieces and season with salt and pepper. Slice the pepper and onion thinly and grate the cheddar.",
      "Heat 1 tbsp oil in a large skillet over medium-high until it shimmers. Cook the chicken for 5 to 6 minutes, stirring now and then, until browned and cooked through with no pink inside, and move it to a bowl.",
      "Add the pepper and onion to the same pan and cook for 4 to 5 minutes until soft and charred at the edges. Chop the chicken a little smaller, stir it back in and taste for salt.",
      "Lay four tortillas out, scatter half the cheddar over them, divide the chicken mix on top, add the rest of the cheese and press the other tortillas on top.",
      "Wipe the skillet and set it over medium heat. Cook each quesadilla dry for 2 to 3 minutes a side, pressing with a spatula, until the tortilla is golden and crisp and the cheese has melted; a plate on top helps you flip it.",
      "Cut into wedges and serve with salsa and sour cream for dipping."
    ],
    "teaches": [
      "crisping a tortilla"
    ]
  },
  {
    "id": 21,
    "name": "Mac and Cheese With Peas",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012433_0717acf1-886e-4519-9248-8dfd752a5fbf_min.webp",
    "cuisine": "Kids",
    "meal": "Dinner",
    "time": 35,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Kids",
      "Family",
      "Vegetarian"
    ],
    "total": 7.6,
    "save": 2.5,
    "macros": [
      22,
      58,
      22,
      4
    ],
    "ing": [
      [
        "pasta",
        "350 g"
      ],
      [
        "cheddar",
        "250 g"
      ],
      [
        "milk",
        "2 cups"
      ],
      [
        "butter",
        "3 tbsp"
      ],
      [
        "flour",
        "3 tbsp"
      ],
      [
        "peas",
        "1 cup"
      ],
      [
        "breadcrumbs",
        "½ cup"
      ]
    ],
    "steps": [
      "Heat the oven to 400°F (200°C). Bring a large pot of water to a boil, salt it well and cook the pasta for 6 to 7 minutes, a couple of minutes short of the packet time so it stays firm, then drain it and grate the cheddar.",
      "Melt the butter in the same pot over medium heat, whisk in the flour and cook for 1 to 2 minutes, stirring, until it smells nutty and looks like wet sand; this is the roux.",
      "Add the milk a splash at a time, whisking each addition smooth before the next, then bring to a simmer and cook for 3 to 4 minutes, stirring, until it thickens enough to coat the back of a spoon.",
      "Take the pot off the heat and stir in most of the cheddar a handful at a time until melted and smooth. Season with salt and pepper; it should taste a little too strong, since the pasta will soften it.",
      "Fold in the pasta and the peas and tip into a baking dish about 9 by 13 inches. Scatter the remaining cheddar and the breadcrumbs over the top.",
      "Bake on the middle rack for 15 to 18 minutes until bubbling at the edges and golden on top. Rest for 5 minutes before serving so the sauce settles."
    ],
    "teaches": [
      "a roux",
      "a cheese sauce"
    ]
  },
  {
    "id": 22,
    "name": "Baked Ziti",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012431_e924e4aa-caf7-4862-bbcb-fc573c729450_min.webp",
    "cuisine": "Italian",
    "meal": "Dinner",
    "time": 55,
    "serv": 6,
    "diff": "Easy",
    "tags": [
      "Family"
    ],
    "total": 14.9,
    "save": 3.9,
    "macros": [
      30,
      56,
      20,
      5
    ],
    "ing": [
      [
        "pasta",
        "450 g"
      ],
      [
        "ground-beef",
        "1 lb"
      ],
      [
        "diced-tomatoes",
        "2 cans"
      ],
      [
        "mozzarella",
        "250 g"
      ],
      [
        "parmesan",
        "40 g"
      ],
      [
        "onion",
        "1"
      ],
      [
        "garlic",
        "3 cloves"
      ],
      [
        "basil",
        "handful"
      ]
    ],
    "steps": [
      "Heat the oven to 400°F (200°C). Dice the onion and chop the garlic, tear the mozzarella and grate the parmesan.",
      "Heat 1 tbsp oil in a wide pot over medium-high. Brown the beef with a good pinch of salt for 6 to 8 minutes, breaking it up, until no pink remains and there are crusty bits on the bottom, then add the onion for 4 minutes until soft and the garlic for 1 minute.",
      "Pour in both cans of tomatoes, season with salt and pepper and simmer for 15 minutes until the sauce thickens a little. Tear in half the basil.",
      "Meanwhile bring a large pot of water to a boil, salt it well and cook the ziti for 7 to 8 minutes, well short of the packet time; it finishes in the oven. Drain.",
      "Toss the pasta with the sauce and half the mozzarella in a baking dish about 9 by 13 inches. Top with the rest of the mozzarella and the parmesan.",
      "Bake on the middle rack for 25 minutes until bubbling and browned in patches. Rest for 5 minutes, scatter the remaining basil over and serve."
    ],
    "teaches": [
      "a meat sauce",
      "baking pasta"
    ]
  },
  {
    "id": 23,
    "name": "Roast Chicken Dinner",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012431_655ca63b-c980-46ae-adcf-8877eb975bbe_min.webp",
    "cuisine": "Sunday",
    "meal": "Dinner",
    "time": 90,
    "serv": 4,
    "diff": "Medium",
    "tags": [
      "Family"
    ],
    "total": 17.6,
    "save": 3,
    "macros": [
      44,
      30,
      22,
      5
    ],
    "ing": [
      [
        "whole-chicken",
        "1"
      ],
      [
        "potatoes",
        "1 kg"
      ],
      [
        "green-beans",
        "300 g"
      ],
      [
        "butter",
        "3 tbsp"
      ],
      [
        "garlic",
        "1 head"
      ],
      [
        "lemon",
        "1"
      ],
      [
        "rosemary",
        "2 sprigs"
      ]
    ],
    "steps": [
      "Heat the oven to 425°F (220°C) with a rack in the lower third. Pat the chicken dry inside and out with paper towel (dry skin is what crisps) and season the cavity with salt.",
      "Soften 2 tbsp of the butter and mix it with salt, pepper and the chopped leaves of 1 rosemary sprig, then rub it all over the skin. Halve the lemon and the head of garlic across the middle, tuck them into the cavity with the other rosemary sprig, and tie the legs together with string if you have some.",
      "Peel the potatoes and cut them into 2 inch chunks. Toss them with 1 tbsp oil and a good pinch of salt in a large roasting pan and set the chicken breast side up in the middle.",
      "Roast for 60 to 70 minutes, turning the potatoes once halfway, until the skin is deep gold, the juices run clear when you pierce the thigh and a thermometer in the thickest part of the thigh reads 165°F (74°C).",
      "Lift the chicken onto a board, tent it loosely with foil and rest for 15 minutes. Turn the potatoes through the pan juices and return them to the oven for the same 15 minutes to crisp.",
      "Trim the green beans and boil them in well-salted water for 4 to 5 minutes until bright green and just tender. Drain and toss with the last 1 tbsp butter and a pinch of salt.",
      "Carve the chicken, squeeze the roasted lemon from the cavity over the meat, and serve with the potatoes, beans and the juices from the board and the pan."
    ],
    "teaches": [
      "roasting a whole bird",
      "resting meat"
    ]
  },
  {
    "id": 24,
    "name": "Shepherd's Pie",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012431_74775577-0e0c-44b9-baec-5c44a8d6827a_min.webp",
    "cuisine": "British",
    "meal": "Dinner",
    "time": 60,
    "serv": 6,
    "diff": "Easy",
    "tags": [
      "Family",
      "Kids"
    ],
    "total": 12.1,
    "save": 5,
    "macros": [
      26,
      38,
      16,
      6
    ],
    "ing": [
      [
        "ground-beef",
        "1 lb"
      ],
      [
        "potatoes",
        "1 kg"
      ],
      [
        "carrots",
        "2"
      ],
      [
        "peas",
        "1 cup"
      ],
      [
        "onion",
        "1"
      ],
      [
        "butter",
        "3 tbsp"
      ],
      [
        "milk",
        "½ cup"
      ],
      [
        "beef-broth",
        "1 cup"
      ],
      [
        "tomato-paste",
        "2 tbsp"
      ]
    ],
    "steps": [
      "Peel the potatoes and cut them into even chunks, cover with cold salted water and bring to a boil. Simmer for 15 to 18 minutes until a knife slides through with no resistance.",
      "Meanwhile dice the onion and carrots. Heat 1 tbsp oil in a wide pan over medium-high and brown the beef with a pinch of salt for 6 to 8 minutes, breaking it up, until no pink remains, then add the onion and carrots and cook for 5 minutes until softening.",
      "Stir in the tomato paste and cook for 1 minute until it darkens, then pour in the beef broth and simmer for 10 minutes until it reduces to a thick gravy that coats the meat. Stir in the peas, season well with salt and pepper and spread into a baking dish about 9 by 13 inches.",
      "Heat the oven to 400°F (200°C). Drain the potatoes, let them steam in the colander for 1 minute, then mash with the butter and milk until smooth and season generously; underseasoned mash is the usual failure.",
      "Spoon the mash over the filling and spread it to the edges to seal, then rough up the surface with a fork so there are ridges to brown.",
      "Bake on the middle rack for 25 minutes until the top is golden at the ridges and the filling bubbles at the sides. Rest for 5 minutes and serve in big spoonfuls."
    ],
    "teaches": [
      "mashed potatoes",
      "a gravy base"
    ]
  },
  {
    "id": 25,
    "name": "Pad Thai",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012434_388cef5a-c743-45aa-bf16-737c65ccaf47_min.webp",
    "cuisine": "Thai",
    "meal": "Dinner",
    "time": 30,
    "serv": 4,
    "diff": "Medium",
    "tags": [
      "Weeknight"
    ],
    "total": 16.2,
    "save": 1.2,
    "src": "Food Network",
    "rating": 4.6,
    "count": 2957,
    "macros": [
      28,
      60,
      18,
      3
    ],
    "ing": [
      [
        "rice-noodles",
        "250 g"
      ],
      [
        "shrimp",
        "300 g"
      ],
      [
        "eggs",
        "2"
      ],
      [
        "bean-sprouts",
        "2 cups"
      ],
      [
        "peanuts",
        "¼ cup"
      ],
      [
        "lime",
        "2"
      ],
      [
        "fish-sauce",
        "3 tbsp"
      ],
      [
        "garlic",
        "3 cloves"
      ],
      [
        "green-onion",
        "3"
      ]
    ],
    "steps": [
      "Soak the rice noodles in hot tap water for 15 to 20 minutes until pliable but still a little firm (they finish in the pan), then drain.",
      "While they soak, pat the shrimp dry and season lightly with salt, chop the garlic, cut the green onions into 2 inch lengths, roughly chop the peanuts and beat the eggs. Stir the fish sauce with the juice of 1 lime and 1 tbsp water, and set everything beside the stove, because once the wok is hot there is no time to chop.",
      "Heat 2 tbsp oil in a wok or large skillet over high heat until it smokes faintly. Add the garlic and shrimp and stir-fry for 2 minutes until the shrimp turn pink, then push them to one side.",
      "Pour the eggs into the empty side and scramble for 30 seconds until just set, then add the noodles and the sauce and toss for 2 to 3 minutes until the noodles are tender and have soaked up the sauce; add a splash of water if they stick.",
      "Add the bean sprouts and green onions and toss for 1 minute so they wilt a little but keep their crunch. Taste: it should be salty and sour in balance, so add fish sauce or lime as needed.",
      "Serve with the peanuts scattered over and the second lime in wedges."
    ],
    "teaches": [
      "soaking rice noodles",
      "stir-fry timing"
    ]
  },
  {
    "id": 26,
    "name": "Greek Chicken Souvlaki Bowl",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012432_d89a7809-dc89-417a-ace3-e48b22065456_min.webp",
    "cuisine": "Greek",
    "meal": "Dinner",
    "time": 35,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Weeknight"
    ],
    "total": 15.1,
    "save": 2.2,
    "macros": [
      38,
      48,
      18,
      5
    ],
    "ing": [
      [
        "chicken-thighs",
        "1 lb"
      ],
      [
        "rice",
        "1½ cups"
      ],
      [
        "cucumber",
        "1"
      ],
      [
        "tomatoes",
        "2"
      ],
      [
        "onion",
        "½ red"
      ],
      [
        "olives",
        "½ cup"
      ],
      [
        "feta",
        "80 g"
      ],
      [
        "tzatziki",
        "½ cup"
      ],
      [
        "lemon",
        "1"
      ],
      [
        "oregano",
        "1 tsp"
      ]
    ],
    "steps": [
      "Cut the chicken thighs into 1½ inch pieces and toss with the juice of half the lemon, the oregano, 1 tbsp oil and a good pinch of salt and pepper. Marinate for 15 minutes while you cook the rice.",
      "Rinse the rice and bring it to a boil with 2¼ cups water and a pinch of salt, cover and cook on the lowest heat for 15 minutes, then rest it off the heat with the lid on.",
      "Dice the cucumber and tomatoes and slice the red onion thinly, then toss them with the olives, a squeeze of the remaining lemon, a drizzle of oil and a pinch of salt.",
      "Thread the chicken onto skewers if you have them (soak wooden ones in water first) or leave it loose, and heat a grill pan or skillet over medium-high until very hot.",
      "Cook the chicken for 4 to 5 minutes a side, turning once, until charred at the edges and cooked through with no pink in the centre of the largest piece. Rest for 3 minutes.",
      "Build the bowls with rice, the salad, the chicken, crumbled feta and a spoonful of tzatziki, with the last of the lemon squeezed over."
    ],
    "teaches": [
      "skewering and grilling"
    ]
  },
  {
    "id": 27,
    "name": "Banana Pancakes",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012431_cb4835e3-5639-46c5-adac-f3994e5a850c_min.webp",
    "cuisine": "Breakfast",
    "meal": "Breakfast",
    "time": 20,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Kids",
      "Vegetarian"
    ],
    "total": 4.8,
    "save": 1.2,
    "macros": [
      10,
      52,
      12,
      3
    ],
    "ing": [
      [
        "bananas",
        "3"
      ],
      [
        "flour",
        "1½ cups"
      ],
      [
        "eggs",
        "2"
      ],
      [
        "milk",
        "1 cup"
      ],
      [
        "butter",
        "2 tbsp"
      ],
      [
        "maple-syrup",
        "to serve"
      ],
      [
        "baking-powder",
        "2 tsp"
      ]
    ],
    "steps": [
      "Melt the butter and let it cool for a moment. Mash 2 of the bananas in a large bowl with a fork until mostly smooth, then whisk in the eggs, milk and melted butter.",
      "Whisk the flour, baking powder and a pinch of salt together, then fold into the banana mixture with a few strokes; a few lumps are fine, and overmixing makes tough pancakes. Rest the batter for 5 minutes while the pan heats.",
      "Heat a non-stick skillet or griddle over medium heat and rub it with a little butter. Slice the third banana.",
      "Pour in ¼ cup of batter per pancake, leaving room between them. Cook for 2 to 3 minutes until bubbles rise across the surface and the edges look dry, then flip and cook for 1 to 2 minutes more until golden on the second side.",
      "Keep the finished pancakes warm on a plate under a tea towel and repeat with the rest of the batter, adding a touch more butter between batches.",
      "Stack, top with the sliced banana and pour over the maple syrup."
    ],
    "teaches": [
      "pancake batter",
      "knowing when to flip"
    ]
  },
  {
    "id": 28,
    "name": "Beef Pho",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012432_5cfa9511-d479-413b-9110-e18b85292c97_min.webp",
    "cuisine": "Vietnamese",
    "meal": "Dinner",
    "time": 50,
    "serv": 4,
    "diff": "Confident",
    "tags": [
      "Weeknight"
    ],
    "total": 15.4,
    "save": 0,
    "src": "Bon Appétit",
    "rating": 4.8,
    "count": 1884,
    "macros": [
      30,
      54,
      10,
      3
    ],
    "ing": [
      [
        "rice-noodles",
        "300 g"
      ],
      [
        "flank-steak",
        "300 g"
      ],
      [
        "beef-broth",
        "6 cups"
      ],
      [
        "onion",
        "1"
      ],
      [
        "ginger",
        "2 in"
      ],
      [
        "star-anise",
        "3"
      ],
      [
        "bean-sprouts",
        "2 cups"
      ],
      [
        "basil",
        "handful"
      ],
      [
        "lime",
        "1"
      ],
      [
        "chili",
        "1"
      ]
    ],
    "steps": [
      "Put the flank steak in the freezer for 20 minutes to firm up; it makes slicing thin much easier. Halve the onion and cut the ginger in half lengthways, skin on.",
      "Set a dry heavy skillet over high heat and char the onion and ginger cut side down for 5 to 6 minutes until blackened in patches and smelling sweet, adding the star anise for the last 1 minute to toast.",
      "Pour the beef broth into a large pot with the charred onion, ginger and star anise. Bring to a boil, then lower to the gentlest simmer, skim any foam, and cook for 30 minutes so the spices infuse; a rolling boil makes it cloudy.",
      "Meanwhile soak the rice noodles in hot tap water for 15 to 20 minutes until pliable, then drain. Slice the beef against the grain as thinly as you can and lay the slices out so they are not clumped, slice the chili, cut the lime into wedges and pick the basil leaves.",
      "Strain the broth, return it to the pot and season with salt until it tastes savoury and clean; it should be slightly saltier than you think, since the noodles dilute it. Bring it back to a hard boil.",
      "Divide the noodles between four deep bowls and lay the raw beef on top in a single layer. Ladle the boiling broth over the beef; it cooks in the bowl, turning from red to pink in about 1 minute.",
      "Pile on the bean sprouts, basil and chili and serve with the lime wedges to squeeze in at the table."
    ],
    "teaches": [
      "charring aromatics",
      "a clear broth"
    ]
  },
  {
    "id": 29,
    "name": "Chana Masala",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012432_65f8a295-22a8-4262-94e7-08f91f71da98_min.webp",
    "cuisine": "Indian",
    "meal": "Dinner",
    "time": 30,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Vegetarian",
      "Weeknight"
    ],
    "total": 6.4,
    "save": 2.2,
    "macros": [
      16,
      58,
      10,
      14
    ],
    "ing": [
      [
        "chickpeas",
        "2 cans"
      ],
      [
        "diced-tomatoes",
        "1 can"
      ],
      [
        "onion",
        "1"
      ],
      [
        "garlic",
        "3 cloves"
      ],
      [
        "ginger",
        "1 tbsp"
      ],
      [
        "garam-masala",
        "2 tsp"
      ],
      [
        "cilantro",
        "handful"
      ],
      [
        "rice",
        "1½ cups"
      ]
    ],
    "steps": [
      "Rinse the rice and bring it to a boil with 2¼ cups water and a pinch of salt, cover and cook on the lowest heat for 15 minutes, then rest it off the heat with the lid on.",
      "Finely dice the onion, chop the garlic and grate the ginger. Drain and rinse the chickpeas.",
      "Heat 2 tbsp oil in a wide pan over medium heat until it shimmers. Cook the onion with a pinch of salt for 6 to 8 minutes, stirring, until soft and golden at the edges.",
      "Add the garlic, ginger and garam masala and fry for 1 minute, stirring, until the spice smells toasty and the oil takes on its colour; do not let the garlic brown.",
      "Pour in the diced tomatoes and the chickpeas with half a cup of water, season with salt, and simmer for 15 minutes, stirring now and then and crushing a few chickpeas against the side of the pan to thicken the sauce, until it is thick and the oil shows at the edges.",
      "Taste and adjust the salt, stir in most of the cilantro and serve over the rice with the rest scattered on top."
    ],
    "teaches": [
      "blooming spices"
    ]
  },
  {
    "id": 30,
    "name": "Chicken Tikka Masala",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012433_18c73792-d41b-4307-af31-2ca2d8b23609_min.webp",
    "cuisine": "Indian",
    "meal": "Dinner",
    "time": 50,
    "serv": 4,
    "diff": "Medium",
    "tags": [
      "Family"
    ],
    "total": 15.9,
    "save": 3.1,
    "macros": [
      38,
      40,
      24,
      3
    ],
    "ing": [
      [
        "chicken-thighs",
        "1½ lb"
      ],
      [
        "yogurt",
        "½ cup"
      ],
      [
        "diced-tomatoes",
        "1 can"
      ],
      [
        "cream",
        "½ cup"
      ],
      [
        "onion",
        "1"
      ],
      [
        "garlic",
        "3 cloves"
      ],
      [
        "ginger",
        "1 tbsp"
      ],
      [
        "garam-masala",
        "1 tbsp"
      ],
      [
        "naan",
        "4"
      ],
      [
        "rice",
        "1½ cups"
      ]
    ],
    "steps": [
      "Cut the chicken thighs into 1½ inch pieces. Stir the yogurt with half the garam masala, a third of the garlic finely grated, a third of the ginger and a good pinch of salt, toss the chicken in it and marinate for 20 minutes (or overnight in the fridge).",
      "Rinse the rice and bring it to a boil with 2¼ cups water and a pinch of salt, cover and cook on the lowest heat for 15 minutes, then rest it off the heat with the lid on.",
      "Set the oven to broil with a rack 4 to 6 inches from the element and line a sheet pan with foil. Spread the chicken out in a single layer and broil for 8 to 10 minutes, turning once, until charred at the edges; it does not need to be cooked through yet.",
      "Meanwhile dice the onion and chop the rest of the garlic and ginger. Heat 2 tbsp oil or butter in a wide pan over medium and cook the onion with a pinch of salt for 6 to 8 minutes until soft and golden, then the garlic, ginger and remaining garam masala for 1 minute until fragrant.",
      "Pour in the diced tomatoes and simmer for 10 minutes until thick, then blend smooth if you like a restaurant-style sauce (an immersion blender in the pan is easiest).",
      "Add the chicken with any juices from the pan and simmer for 8 to 10 minutes until cooked through with no pink in the centre. Stir in the cream, warm for 2 minutes without boiling, and taste for salt.",
      "Warm the naan in a dry pan for 1 minute a side and serve the chicken over the rice with the naan alongside."
    ],
    "teaches": [
      "a yogurt marinade",
      "broiling for char"
    ]
  },
  {
    "id": 31,
    "name": "Palak Paneer",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012433_fe9e75c6-6c85-45d1-b24e-60ac19500c18_min.webp",
    "cuisine": "Indian",
    "meal": "Dinner",
    "time": 35,
    "serv": 4,
    "diff": "Medium",
    "tags": [
      "Vegetarian"
    ],
    "total": 13.2,
    "save": 0.8,
    "macros": [
      20,
      18,
      26,
      6
    ],
    "ing": [
      [
        "spinach",
        "450 g"
      ],
      [
        "paneer",
        "300 g"
      ],
      [
        "onion",
        "1"
      ],
      [
        "garlic",
        "3 cloves"
      ],
      [
        "ginger",
        "1 tbsp"
      ],
      [
        "cream",
        "¼ cup"
      ],
      [
        "cumin",
        "1 tsp"
      ],
      [
        "naan",
        "4"
      ]
    ],
    "steps": [
      "Bring a large pot of salted water to a boil, drop in the spinach and blanch for 1 minute until wilted and bright green, then lift it into a bowl of cold water to stop the cooking. Squeeze out the water and blend to a coarse purée with a splash of water.",
      "Cut the paneer into 1 inch cubes and pat dry. Dice the onion, chop the garlic and grate the ginger.",
      "Heat 2 tbsp oil in a wide pan over medium-high until it shimmers. Fry the paneer in a single layer for 2 to 3 minutes a side until golden, then lift it onto a plate and salt it lightly.",
      "Lower the heat to medium, add the cumin to the pan and let it sizzle for 30 seconds, then cook the onion with a pinch of salt for 6 to 8 minutes until soft and golden. Add the garlic and ginger for 1 minute.",
      "Stir in the spinach purée and cream, season with salt and simmer for 5 minutes until the sauce thickens and darkens a shade. Return the paneer and simmer for 3 minutes more so it soaks up the sauce, then taste and adjust the salt.",
      "Warm the naan in a dry pan for 1 minute a side and serve the palak paneer with it."
    ],
    "teaches": [
      "blanching greens",
      "frying paneer"
    ]
  },
  {
    "id": 32,
    "name": "Dal Tadka",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012431_4fe2c988-0eda-4259-975e-7133ccfbee91_min.webp",
    "cuisine": "Indian",
    "meal": "Dinner",
    "time": 40,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Vegetarian",
      "Kids"
    ],
    "total": 4.9,
    "save": 1.1,
    "macros": [
      18,
      54,
      8,
      12
    ],
    "ing": [
      [
        "lentils",
        "1½ cups"
      ],
      [
        "onion",
        "1"
      ],
      [
        "garlic",
        "4 cloves"
      ],
      [
        "cumin",
        "1 tsp"
      ],
      [
        "chili",
        "1"
      ],
      [
        "butter",
        "2 tbsp"
      ],
      [
        "rice",
        "1½ cups"
      ],
      [
        "cilantro",
        "handful"
      ]
    ],
    "steps": [
      "Rinse the lentils in a sieve until the water runs clear. Put them in a pot with 4½ cups water, bring to a boil, skim any foam and simmer, partly covered, for 25 to 30 minutes until completely soft and falling apart, adding water if it thickens before they are done.",
      "Once the dal is simmering, rinse the rice and bring it to a boil with 2¼ cups water and a pinch of salt, cover and cook on the lowest heat for 15 minutes, then rest it off the heat with the lid on.",
      "Finely slice the onion, garlic and chili.",
      "When the lentils are soft, whisk them a few times with a spoon so they turn creamy, season with salt (dal takes more than you expect) and keep warm over low heat.",
      "For the tadka, melt the butter in a small skillet over medium heat. Add the cumin and let it crackle for 20 seconds, then the onion for 5 to 6 minutes until golden, then the garlic and chili for 1 minute until the garlic is just golden and the smell fills the kitchen.",
      "Pour the sizzling tadka over the dal, scatter the cilantro and serve with the rice."
    ],
    "teaches": [
      "a tadka (tempered spices)"
    ]
  },
  {
    "id": 33,
    "name": "Aloo Gobi",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012517_15901909-2be1-4c58-86b1-35bb5450cc18_min.webp",
    "cuisine": "Indian",
    "meal": "Dinner",
    "time": 35,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Vegetarian",
      "Weeknight"
    ],
    "total": 6.1,
    "save": 2.6,
    "macros": [
      8,
      46,
      10,
      8
    ],
    "ing": [
      [
        "cauliflower",
        "1 head"
      ],
      [
        "potatoes",
        "3"
      ],
      [
        "peas",
        "1 cup"
      ],
      [
        "onion",
        "1"
      ],
      [
        "garlic",
        "2 cloves"
      ],
      [
        "ginger",
        "1 tbsp"
      ],
      [
        "cumin",
        "1 tsp"
      ],
      [
        "cilantro",
        "handful"
      ]
    ],
    "steps": [
      "Peel the potatoes and cut them into 1 inch cubes, and cut the cauliflower into florets about the same size. Dice the onion, chop the garlic and grate the ginger.",
      "Heat 3 tbsp oil in a wide pan with a lid over medium-high until it shimmers. Add the cumin and let it sizzle for 20 seconds, then the onion with a pinch of salt for 4 to 5 minutes until golden, then the garlic and ginger for 1 minute.",
      "Add the potatoes and cook, stirring, for 5 minutes so they take on a little colour at the edges.",
      "Add the cauliflower, a good pinch of salt and ¼ cup water, stir, cover and cook over medium heat for 12 to 15 minutes, stirring a couple of times, until the potatoes and cauliflower are tender to the point of a knife and browned in places; add a splash more water if the pan dries out.",
      "Stir in the peas, cover and cook for 3 minutes until hot.",
      "Taste for salt, scatter the cilantro over and serve."
    ],
    "teaches": [
      "steam-frying vegetables"
    ]
  },
  {
    "id": 34,
    "name": "Keema Matar",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012517_baf15525-7395-40f3-9aa2-8ecb184819b7_min.webp",
    "cuisine": "Indian",
    "meal": "Dinner",
    "time": 35,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Family",
      "Weeknight"
    ],
    "total": 10.4,
    "save": 2.9,
    "macros": [
      28,
      30,
      18,
      6
    ],
    "ing": [
      [
        "ground-beef",
        "1 lb"
      ],
      [
        "peas",
        "1 cup"
      ],
      [
        "onion",
        "1"
      ],
      [
        "garlic",
        "3 cloves"
      ],
      [
        "ginger",
        "1 tbsp"
      ],
      [
        "diced-tomatoes",
        "1 cup"
      ],
      [
        "garam-masala",
        "2 tsp"
      ],
      [
        "naan",
        "4"
      ]
    ],
    "steps": [
      "Dice the onion, chop the garlic and grate the ginger.",
      "Heat 2 tbsp oil in a wide pan over medium heat and cook the onion with a pinch of salt for 6 to 8 minutes until golden, then the garlic and ginger for 1 minute.",
      "Turn the heat up to medium-high, add the beef and break it up, season with salt and cook for 6 to 8 minutes until browned and the liquid has cooked off.",
      "Stir in the garam masala for 1 minute, then the diced tomatoes with ½ cup water. Simmer for 15 minutes, stirring now and then, until thick and the oil shows at the edges.",
      "Stir in the peas and cook for 3 minutes until hot. Taste and adjust the salt.",
      "Warm the naan in a dry pan for 1 minute a side and serve the keema spooned over or alongside."
    ],
    "teaches": [
      "spicing ground meat"
    ]
  },
  {
    "id": 35,
    "name": "Pad See Ew",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012519_9dae96f7-470a-4bac-bb67-88af1c9f8cdd_min.webp",
    "cuisine": "Thai",
    "meal": "Dinner",
    "time": 25,
    "serv": 4,
    "diff": "Medium",
    "tags": [
      "Weeknight"
    ],
    "total": 11.8,
    "save": 1.4,
    "macros": [
      30,
      62,
      14,
      3
    ],
    "ing": [
      [
        "rice-noodles",
        "350 g wide"
      ],
      [
        "chicken-thighs",
        "1 lb"
      ],
      [
        "broccoli",
        "1 crown"
      ],
      [
        "eggs",
        "2"
      ],
      [
        "soy-sauce",
        "3 tbsp"
      ],
      [
        "brown-sugar",
        "1 tbsp"
      ],
      [
        "garlic",
        "3 cloves"
      ]
    ],
    "steps": [
      "Soak the noodles in hot tap water for 10 to 15 minutes until pliable (fresh ones need only a quick rinse), then drain. Slice the chicken thighs thinly and season with salt, cut the broccoli into small florets with the stem sliced thin, chop the garlic, beat the eggs, and stir the soy sauce and brown sugar together.",
      "Heat 1 tbsp oil in a wok or large skillet over high heat until it smokes faintly. Add the chicken in a single layer and cook for 3 to 4 minutes, turning once, until browned and cooked through, adding the garlic for the last 30 seconds, then tip everything onto a plate.",
      "Add another 1 tbsp oil, then the broccoli with 2 tbsp water, and stir-fry for 2 to 3 minutes until bright green and just tender.",
      "Push the broccoli aside, pour the eggs into the gap and scramble for 30 seconds until just set.",
      "Add the noodles, the chicken and the soy mixture and toss to coat, then spread everything out and leave it for 1 minute without stirring so the noodles char in spots. Toss and repeat for 3 to 4 minutes until the noodles are tender and glossy with charred edges.",
      "Taste for salt and serve straight from the wok."
    ],
    "teaches": [
      "charring noodles",
      "cooking in batches"
    ]
  },
  {
    "id": 36,
    "name": "Tom Yum Shrimp Soup",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012520_66fa5b59-dcea-4006-acd6-80d7f65c3e03_min.webp",
    "cuisine": "Thai",
    "meal": "Dinner",
    "time": 25,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Weeknight",
      "Pescatarian"
    ],
    "total": 13.6,
    "save": 2.4,
    "macros": [
      22,
      10,
      6,
      2
    ],
    "ing": [
      [
        "shrimp",
        "340 g"
      ],
      [
        "mushrooms",
        "200 g"
      ],
      [
        "lemongrass",
        "2 stalks"
      ],
      [
        "lime",
        "2"
      ],
      [
        "chili",
        "2"
      ],
      [
        "fish-sauce",
        "2 tbsp"
      ],
      [
        "chicken-broth",
        "5 cups"
      ],
      [
        "cilantro",
        "handful"
      ]
    ],
    "steps": [
      "Trim the lemongrass, peel off the tough outer layer, cut it into 2 inch lengths and bruise them with the flat of a knife so they release their scent. Slice the chilies, halve or quarter the mushrooms and pat the shrimp dry.",
      "Bring the chicken broth to a boil in a pot with the lemongrass and chilies, then simmer for 10 minutes until the broth smells of lemongrass.",
      "Add the mushrooms and simmer for 4 minutes until tender.",
      "Add the shrimp and cook for 2 to 3 minutes until they turn pink and curl into a loose C.",
      "Take the pot off the heat and season with the fish sauce and the juice of both limes; off the heat the lime stays bright. Taste: it should be hot, sour and salty in balance, so add more fish sauce or lime as needed.",
      "Fish out the lemongrass, scatter the cilantro over and serve in deep bowls."
    ],
    "teaches": [
      "infusing a broth",
      "seasoning with lime and fish sauce"
    ]
  },
  {
    "id": 37,
    "name": "Thai Basil Chicken",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012518_728c938a-0147-4b90-881f-7233cdbe3614_min.webp",
    "cuisine": "Thai",
    "meal": "Dinner",
    "time": 20,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Weeknight"
    ],
    "total": 10.2,
    "save": 2,
    "macros": [
      34,
      50,
      16,
      2
    ],
    "ing": [
      [
        "chicken-thighs",
        "1 lb"
      ],
      [
        "basil",
        "2 handfuls"
      ],
      [
        "garlic",
        "4 cloves"
      ],
      [
        "chili",
        "2"
      ],
      [
        "soy-sauce",
        "2 tbsp"
      ],
      [
        "fish-sauce",
        "1 tbsp"
      ],
      [
        "eggs",
        "4"
      ],
      [
        "rice",
        "1½ cups"
      ]
    ],
    "steps": [
      "Rinse the rice and bring it to a boil with 2¼ cups water and a pinch of salt, cover and cook on the lowest heat for 15 minutes, then rest it off the heat with the lid on.",
      "Chop the chicken thighs into small pieces, about the size of a fingernail, and season lightly with salt. Finely chop the garlic and chilies, pick the basil leaves, and stir the soy sauce and fish sauce together.",
      "Heat 2 tbsp oil in a skillet over medium-high until it shimmers. Crack in the eggs and fry for 2 to 3 minutes, spooning hot oil over the whites, until the edges are brown and crisp and the yolks still runny, then slide them onto a plate.",
      "Turn the heat to high, add a little more oil if the pan is dry, and fry the garlic and chilies for 30 seconds until fragrant.",
      "Add the chicken, spread it out and leave it for 1 minute to brown before stirring, then stir-fry for 4 to 5 minutes until cooked through and browned in spots. Pour in the sauces and toss for 1 minute until they bubble into a glaze.",
      "Take the pan off the heat and toss in the basil until it wilts. Serve over the rice with a crispy egg on each bowl."
    ],
    "teaches": [
      "a crispy fried egg",
      "high-heat stir-frying"
    ]
  },
  {
    "id": 38,
    "name": "Massaman Beef Curry",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012518_35d2a67d-0130-4d37-94f4-51f703e259f4_min.webp",
    "cuisine": "Thai",
    "meal": "Dinner",
    "time": 90,
    "serv": 6,
    "diff": "Confident",
    "tags": [
      "Family"
    ],
    "total": 19.4,
    "save": 1.5,
    "macros": [
      32,
      40,
      26,
      4
    ],
    "ing": [
      [
        "flank-steak",
        "1½ lb"
      ],
      [
        "potatoes",
        "3"
      ],
      [
        "coconut-milk",
        "2 cans"
      ],
      [
        "curry-paste",
        "3 tbsp"
      ],
      [
        "onion",
        "1"
      ],
      [
        "peanuts",
        "⅓ cup"
      ],
      [
        "fish-sauce",
        "1 tbsp"
      ],
      [
        "brown-sugar",
        "1 tbsp"
      ],
      [
        "rice",
        "2 cups"
      ]
    ],
    "steps": [
      "Cut the flank steak into 1½ inch chunks, pat dry and season lightly with salt. Cut the onion into thick wedges, and peel and quarter the potatoes.",
      "Open the cans of coconut milk without shaking them and spoon the thick cream from the top into a heavy pot over medium-high heat. Cook for 4 to 5 minutes, stirring, until it bubbles and the oil separates and glistens, then add the curry paste and fry for 2 to 3 minutes until dark and fragrant.",
      "Add the beef and stir for 3 minutes to coat it in the paste, then pour in the rest of the coconut milk and 1 cup of water and add the onion. Bring to a simmer, cover partly and cook on the lowest heat for 1 hour, stirring now and then, until the beef is tender when pressed with a spoon.",
      "Add the potatoes and simmer for 25 minutes more until they are tender to the point of a knife and the sauce has thickened.",
      "Meanwhile rinse the rice and bring it to a boil with 3 cups water and a pinch of salt, cover and cook on the lowest heat for 15 minutes, then rest it with the lid on. Toast the peanuts in a dry skillet over medium heat for 3 to 4 minutes until golden.",
      "Stir the fish sauce and brown sugar into the curry and simmer for 2 minutes. Taste: it should be rich, a little sweet and salty enough to carry the spice, so adjust with more fish sauce or sugar.",
      "Rest the curry off the heat for 5 minutes, then serve over the rice with the peanuts scattered on top."
    ],
    "teaches": [
      "splitting coconut cream",
      "a slow braise"
    ]
  },
  {
    "id": 39,
    "name": "Thai Peanut Noodle Salad",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012518_0660023a-ebec-4392-a06c-6b94cb869da1_min.webp",
    "cuisine": "Thai",
    "meal": "Lunch",
    "time": 20,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Vegetarian",
      "Weeknight"
    ],
    "total": 7.3,
    "save": 1.6,
    "macros": [
      14,
      60,
      18,
      5
    ],
    "ing": [
      [
        "rice-noodles",
        "250 g"
      ],
      [
        "peanut-butter",
        "3 tbsp"
      ],
      [
        "lime",
        "2"
      ],
      [
        "soy-sauce",
        "2 tbsp"
      ],
      [
        "carrots",
        "2"
      ],
      [
        "cucumber",
        "1"
      ],
      [
        "peppers",
        "1"
      ],
      [
        "peanuts",
        "¼ cup"
      ],
      [
        "cilantro",
        "handful"
      ]
    ],
    "steps": [
      "Put the rice noodles in a large bowl, cover with boiling water from the kettle and leave for 5 to 8 minutes until tender, then drain and rinse under cold water until cool so they do not clump.",
      "Whisk the peanut butter with the juice of both limes, the soy sauce and 3 to 4 tbsp warm water until smooth and pourable like cream, adding water a spoonful at a time if it stays thick. Taste and add a pinch of salt if it needs it.",
      "Shave the carrots and cucumber into ribbons with a peeler and slice the pepper into thin strips. Roughly chop the peanuts and the cilantro.",
      "Toss the noodles with the dressing and the vegetables in the big bowl until everything is coated.",
      "Pile into bowls and top with the peanuts and cilantro. It keeps in the fridge for a day; loosen with a squeeze of lime before eating."
    ],
    "teaches": [
      "a no-cook dressing"
    ]
  },
  {
    "id": 40,
    "name": "Chicken Larb Lettuce Wraps",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012517_feb64050-7267-4552-adb5-ee72a28ae2e7_min.webp",
    "cuisine": "Thai",
    "meal": "Dinner",
    "time": 25,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Weeknight"
    ],
    "total": 9.8,
    "save": 1.2,
    "macros": [
      30,
      12,
      10,
      3
    ],
    "ing": [
      [
        "chicken-thighs",
        "1 lb"
      ],
      [
        "romaine",
        "1 head"
      ],
      [
        "lime",
        "3"
      ],
      [
        "fish-sauce",
        "2 tbsp"
      ],
      [
        "mint",
        "handful"
      ],
      [
        "cilantro",
        "handful"
      ],
      [
        "onion",
        "½ red"
      ],
      [
        "chili",
        "1"
      ]
    ],
    "steps": [
      "Chop the chicken thighs by hand into a coarse mince about the size of peas; a knife gives a better texture than ground meat. Slice the red onion paper thin and the chili finely, pick the mint, roughly chop the cilantro, and separate and wash the romaine leaves.",
      "Heat 1 tsp oil in a wide skillet over medium-high. Add the chicken with a pinch of salt and ¼ cup water and cook for 6 to 8 minutes, stirring and breaking up clumps, until the water has cooked away and the chicken is cooked through and crumbly with no pink.",
      "Take the pan off the heat and, while the chicken is hot, add the juice of the limes, the fish sauce, the chili and the red onion. Toss well; the warm meat drinks up the dressing.",
      "Let it cool for 5 minutes, then taste: it should be sour, salty and hot in equal measure, so add lime or fish sauce as needed.",
      "Fold through the mint and cilantro at the last moment so they stay fresh.",
      "Serve the larb in a bowl with the romaine leaves alongside, and let everyone spoon it into leaves at the table."
    ],
    "teaches": [
      "hand-chopping meat",
      "dressing warm food"
    ]
  },
  {
    "id": 41,
    "name": "Chicken Enchiladas",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012520_5096be63-1026-49b1-b420-857dd9dd5d9a_min.webp",
    "cuisine": "Mexican",
    "meal": "Dinner",
    "time": 50,
    "serv": 4,
    "diff": "Medium",
    "tags": [
      "Family"
    ],
    "total": 14.6,
    "save": 3.2,
    "macros": [
      34,
      44,
      22,
      5
    ],
    "ing": [
      [
        "chicken-thighs",
        "1 lb"
      ],
      [
        "tortillas",
        "8"
      ],
      [
        "enchilada-sauce",
        "1 can"
      ],
      [
        "cheddar",
        "200 g"
      ],
      [
        "onion",
        "1"
      ],
      [
        "sour-cream",
        "to serve"
      ],
      [
        "cilantro",
        "handful"
      ]
    ],
    "steps": [
      "Put the chicken thighs in a pot with half the onion, enough water to cover and a good pinch of salt, and bring to a boil. Simmer for 15 minutes until cooked through, then lift the chicken out and shred it with two forks.",
      "Meanwhile heat the oven to 400°F (200°C). Dice the rest of the onion, grate the cheddar and chop the cilantro.",
      "Heat 1 tbsp oil in a skillet over medium and cook the diced onion for 4 to 5 minutes until soft. Stir in the shredded chicken, a third of the enchilada sauce and a pinch of salt, and warm for 2 minutes.",
      "Spread a thin layer of sauce over the bottom of a baking dish about 9 by 13 inches. Warm the tortillas in a dry pan or the microwave for 30 seconds so they roll without cracking.",
      "Fill each tortilla with a line of chicken and a little cheddar, roll it up and set it seam side down in the dish, packing them snugly.",
      "Pour the rest of the sauce over and scatter the remaining cheddar on top. Bake on the middle rack for 20 to 25 minutes until the cheese is melted and bubbling and the edges of the tortillas have browned.",
      "Rest for 5 minutes, then serve with sour cream and the cilantro scattered over."
    ],
    "teaches": [
      "rolling enchiladas"
    ]
  },
  {
    "id": 42,
    "name": "Pork Carnitas Tacos",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012518_99fc5d37-3676-4eff-a612-928a5edfe3e8_min.webp",
    "cuisine": "Mexican",
    "meal": "Dinner",
    "time": 150,
    "serv": 6,
    "diff": "Confident",
    "tags": [
      "Family"
    ],
    "total": 15.2,
    "save": 2,
    "macros": [
      30,
      28,
      20,
      3
    ],
    "ing": [
      [
        "pork-shoulder",
        "3 lb"
      ],
      [
        "tortillas",
        "18"
      ],
      [
        "onion",
        "2"
      ],
      [
        "garlic",
        "5 cloves"
      ],
      [
        "lime",
        "3"
      ],
      [
        "cilantro",
        "handful"
      ],
      [
        "cumin",
        "1 tbsp"
      ]
    ],
    "steps": [
      "Cut the pork shoulder into 2 inch chunks, trimming only the thickest fat, and season generously with salt, pepper and the cumin. Cut 1 onion into quarters and smash the garlic cloves.",
      "Put the pork in a heavy pot in a single layer with the quartered onion, the garlic, the juice of 1 lime and enough water to come halfway up the meat. Bring to a boil, then cover and drop to the lowest simmer.",
      "Cook for 2 hours, turning the pieces once or twice, until the pork falls apart when pressed with a fork. Uncover for the last 30 minutes so the liquid cooks down to a few spoonfuls of fat and juices, adding a splash of water if it dries out before the pork is done.",
      "Set the oven to broil with a rack in the upper third. Lift the pork onto a sheet pan, shred it roughly with two forks and spoon the pot juices over it.",
      "Broil for 5 to 8 minutes, turning once, until the edges are browned and crisp while the inside stays juicy. Taste and add salt.",
      "Meanwhile dice the second onion, chop the cilantro and cut the remaining limes into wedges. Warm the tortillas in a dry pan for 20 to 30 seconds a side, stacking them in a tea towel.",
      "Pile the carnitas onto the tortillas with onion, cilantro and a squeeze of lime, and serve at once while the edges are still crisp."
    ],
    "teaches": [
      "a long braise",
      "crisping shredded meat"
    ]
  },
  {
    "id": 43,
    "name": "Chicken Tortilla Soup",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012520_9ce6f5fa-9e54-4817-a538-3bda6bf312be_min.webp",
    "cuisine": "Mexican",
    "meal": "Dinner",
    "time": 40,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Weeknight",
      "Kids"
    ],
    "total": 11.1,
    "save": 2.8,
    "macros": [
      30,
      32,
      14,
      7
    ],
    "ing": [
      [
        "chicken-thighs",
        "1 lb"
      ],
      [
        "diced-tomatoes",
        "1 can"
      ],
      [
        "chicken-broth",
        "4 cups"
      ],
      [
        "black-beans",
        "1 can"
      ],
      [
        "tortillas",
        "4"
      ],
      [
        "avocado",
        "1"
      ],
      [
        "cheddar",
        "80 g"
      ],
      [
        "lime",
        "1"
      ]
    ],
    "steps": [
      "Season the chicken thighs with salt and pepper and put them in a pot with the chicken broth and the diced tomatoes. Bring to a boil, then lower to a simmer and cook for 20 minutes until the chicken is cooked through and tender.",
      "Meanwhile heat the oven to 400°F (200°C). Cut the tortillas into thin strips, toss with 1 tbsp oil and a pinch of salt, spread on a sheet pan and bake on the middle rack for 8 to 10 minutes, turning once, until golden and crisp.",
      "Lift the chicken out, shred it with two forks and return it to the pot. Drain and rinse the black beans, add them and simmer for 5 minutes until hot.",
      "Taste the broth and season with salt, pepper and a squeeze of the lime until it tastes bright.",
      "Dice the avocado, grate the cheddar and cut the rest of the lime into wedges.",
      "Ladle into bowls and top each with tortilla strips, avocado and cheddar, with a lime wedge on the side."
    ],
    "teaches": [
      "crisping tortilla strips"
    ]
  },
  {
    "id": 44,
    "name": "Huevos Rancheros",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012519_06c2e482-93a2-49ac-b2b3-25a1292d8b90_min.webp",
    "cuisine": "Mexican",
    "meal": "Breakfast",
    "time": 20,
    "serv": 2,
    "diff": "Easy",
    "tags": [
      "Vegetarian",
      "Weeknight"
    ],
    "total": 5.6,
    "save": 1.4,
    "macros": [
      20,
      36,
      20,
      8
    ],
    "ing": [
      [
        "eggs",
        "4"
      ],
      [
        "tortillas",
        "4"
      ],
      [
        "diced-tomatoes",
        "1 cup"
      ],
      [
        "black-beans",
        "1 can"
      ],
      [
        "avocado",
        "1"
      ],
      [
        "onion",
        "½"
      ],
      [
        "cilantro",
        "handful"
      ]
    ],
    "steps": [
      "Dice the onion. Heat 1 tbsp oil in a small saucepan over medium and cook the onion with a pinch of salt for 4 minutes until soft, then add the diced tomatoes and simmer for 8 minutes until thick enough to spoon; season with salt and pepper.",
      "Drain the black beans, keeping a little of the liquid, and warm them in a second small pan with a splash of that liquid and a pinch of salt for 3 to 4 minutes, mashing a few with the back of a spoon.",
      "Slice the avocado and chop the cilantro.",
      "Warm the tortillas in a dry skillet over medium-high for 20 to 30 seconds a side until soft and spotted, and keep them under a tea towel.",
      "Heat 1 tbsp oil or butter in the skillet over medium-low and crack in the eggs. Fry gently for 3 to 4 minutes until the whites are set and the yolks still runny, with no browning at the edges.",
      "Lay two tortillas on each plate, spread with beans, set an egg on each, spoon the sauce around and over, and finish with avocado and cilantro."
    ],
    "teaches": [
      "frying eggs gently"
    ]
  },
  {
    "id": 45,
    "name": "Shrimp Fajitas",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012607_27a34219-c80d-4828-956c-6d653d8adb6e_min.webp",
    "cuisine": "Mexican",
    "meal": "Dinner",
    "time": 25,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Weeknight",
      "Pescatarian"
    ],
    "total": 15.3,
    "save": 2.9,
    "macros": [
      28,
      36,
      12,
      4
    ],
    "ing": [
      [
        "shrimp",
        "450 g"
      ],
      [
        "peppers",
        "3"
      ],
      [
        "onion",
        "1"
      ],
      [
        "tortillas",
        "8"
      ],
      [
        "lime",
        "2"
      ],
      [
        "chili-powder",
        "2 tsp"
      ],
      [
        "sour-cream",
        "to serve"
      ]
    ],
    "steps": [
      "Slice the peppers and onion into strips about ½ inch wide. Pat the shrimp dry and toss with the chili powder, a good pinch of salt and the juice of half a lime.",
      "Heat 1 tbsp oil in a large cast-iron or heavy skillet over high heat until it smokes faintly. Add the peppers and onion with a pinch of salt and leave them for 2 minutes before stirring, then cook for 6 to 8 minutes in all until soft with charred edges.",
      "Push the vegetables to the sides, add a little more oil to the middle and lay the shrimp in. Cook for 2 minutes a side until pink and curled into a loose C, then toss everything together.",
      "Meanwhile warm the tortillas in a dry pan for 20 to 30 seconds a side and keep them in a tea towel.",
      "Squeeze the rest of that lime over the skillet and taste for salt.",
      "Bring the skillet to the table while it still sizzles, with the tortillas, the sour cream and the second lime in wedges, and let everyone build their own."
    ],
    "teaches": [
      "charring vegetables"
    ]
  },
  {
    "id": 46,
    "name": "Black Bean and Cheese Burritos",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012606_e554b906-3764-4e0c-8fc9-792756c8de20_min.webp",
    "cuisine": "Mexican",
    "meal": "Dinner",
    "time": 25,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Vegetarian",
      "Kids",
      "Weeknight"
    ],
    "total": 7.9,
    "save": 2.1,
    "macros": [
      20,
      62,
      16,
      12
    ],
    "ing": [
      [
        "black-beans",
        "2 cans"
      ],
      [
        "tortillas",
        "4 large"
      ],
      [
        "rice",
        "1 cup"
      ],
      [
        "cheddar",
        "200 g"
      ],
      [
        "salsa",
        "½ cup"
      ],
      [
        "sour-cream",
        "to serve"
      ]
    ],
    "steps": [
      "Rinse the rice and bring it to a boil with 1½ cups water and a pinch of salt, cover and cook on the lowest heat for 15 minutes, then rest it off the heat with the lid on.",
      "Drain the black beans, keeping a little liquid, and warm them in a saucepan over medium with half the salsa and a pinch of salt for 5 minutes, mashing about a third of them with the back of a spoon so the filling holds together.",
      "Grate the cheddar. Warm the tortillas in a dry pan or the microwave for 20 to 30 seconds so they fold without cracking.",
      "Lay a line of rice down the middle of each tortilla, leaving 2 inches bare at each end, then beans, cheddar and a spoonful of the remaining salsa. Fold the ends in, then roll tightly from the near side over the filling.",
      "Set a dry skillet over medium heat and toast the burritos seam side down for 2 to 3 minutes until golden and sealed, then 2 minutes on the other side until the cheese has melted inside.",
      "Cut in half on the diagonal and serve with sour cream and any salsa left over."
    ],
    "teaches": [
      "rolling a burrito"
    ]
  },
  {
    "id": 47,
    "name": "Chicken Parmesan",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012608_952d0f7e-348a-4c71-abb0-f6ac09cfced6_min.webp",
    "cuisine": "Italian",
    "meal": "Dinner",
    "time": 45,
    "serv": 4,
    "diff": "Medium",
    "tags": [
      "Family",
      "Kids"
    ],
    "total": 14.8,
    "save": 2.6,
    "macros": [
      42,
      50,
      20,
      4
    ],
    "ing": [
      [
        "chicken-breast",
        "4"
      ],
      [
        "breadcrumbs",
        "1 cup"
      ],
      [
        "eggs",
        "2"
      ],
      [
        "diced-tomatoes",
        "1 can"
      ],
      [
        "mozzarella",
        "200 g"
      ],
      [
        "parmesan",
        "40 g"
      ],
      [
        "pasta",
        "350 g"
      ],
      [
        "basil",
        "handful"
      ]
    ],
    "steps": [
      "Set each chicken breast between two sheets of parchment and flatten with a rolling pin or heavy pan to an even ½ inch thickness. Season both sides with salt and pepper.",
      "Beat the eggs in a shallow bowl and mix the breadcrumbs with half the parmesan and a pinch of salt in a second bowl. Dip each breast in egg, let the excess drip off, press firmly into the crumbs on both sides and set on a rack for 5 minutes so the coating sets.",
      "Bring a large pot of water to a boil and salt it well. Pour the diced tomatoes into a small saucepan with a pinch of salt and simmer for 10 minutes until slightly thickened, then tear in half the basil.",
      "Heat ¼ inch of oil in a large skillet over medium-high until a crumb dropped in sizzles at once. Fry the cutlets two at a time for 3 to 4 minutes a side until deep golden and crisp, and drain on paper towel.",
      "Set the oven to broil and lay the cutlets on a sheet pan with a little sauce over each, then the torn mozzarella and the rest of the parmesan. Broil 6 inches from the element for 2 to 3 minutes until the cheese bubbles and browns in spots, watching it closely.",
      "Cook the pasta for 8 to 9 minutes until just firm to the bite, a touch under the packet time, then drain and toss with the remaining sauce.",
      "Serve a cutlet over each plate of pasta with the rest of the basil torn over."
    ],
    "teaches": [
      "breading and shallow frying"
    ]
  },
  {
    "id": 48,
    "name": "Pesto Pasta With Green Beans and Potatoes",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012605_32f4dafc-140c-441c-af36-d399bdf4a49b_min.webp",
    "cuisine": "Italian",
    "meal": "Dinner",
    "time": 25,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Vegetarian",
      "Weeknight"
    ],
    "total": 8.2,
    "save": 1.9,
    "macros": [
      14,
      70,
      18,
      6
    ],
    "ing": [
      [
        "pasta",
        "400 g"
      ],
      [
        "pesto",
        "1 jar"
      ],
      [
        "green-beans",
        "200 g"
      ],
      [
        "potatoes",
        "2"
      ],
      [
        "parmesan",
        "40 g"
      ]
    ],
    "steps": [
      "Bring a large pot of water to a boil and salt it well. Peel the potatoes and cut them into ½ inch cubes, and trim the green beans and cut them in half.",
      "Add the potatoes to the boiling water and cook for 5 minutes, then add the pasta and cook for 6 to 7 minutes.",
      "Add the green beans and cook for 3 minutes more so they come out bright green and just tender, with the potatoes soft and the pasta firm to the bite.",
      "Scoop out a cup of the cooking water, then drain. Return everything to the warm pot with the pesto and half a cup of the water and toss off the heat until the sauce is loose and glossy and coats everything, adding more water if it looks dry.",
      "Taste for salt and pepper and serve with the parmesan grated over."
    ],
    "teaches": [
      "cooking everything in one pot"
    ]
  },
  {
    "id": 49,
    "name": "Minestrone",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012608_89ce16c1-e9cf-4f63-8610-493e6391baaa_min.webp",
    "cuisine": "Italian",
    "meal": "Dinner",
    "time": 45,
    "serv": 6,
    "diff": "Easy",
    "tags": [
      "Vegetarian",
      "Kids"
    ],
    "total": 7.6,
    "save": 2.4,
    "macros": [
      12,
      46,
      6,
      10
    ],
    "ing": [
      [
        "white-beans",
        "1 can"
      ],
      [
        "diced-tomatoes",
        "1 can"
      ],
      [
        "carrots",
        "2"
      ],
      [
        "zucchini",
        "1"
      ],
      [
        "onion",
        "1"
      ],
      [
        "garlic",
        "2 cloves"
      ],
      [
        "pasta",
        "1 cup small"
      ],
      [
        "veg-broth",
        "5 cups"
      ],
      [
        "parmesan",
        "to serve"
      ]
    ],
    "steps": [
      "Dice the onion, carrots and zucchini into pieces about the size of the pasta and chop the garlic. Drain and rinse the white beans.",
      "Warm 2 tbsp oil in a large pot over medium heat. Cook the onion and carrots with a pinch of salt for 8 minutes until soft, then the garlic for 1 minute.",
      "Pour in the vegetable broth, the diced tomatoes and the beans, bring to a boil, then simmer for 20 minutes so the flavours come together.",
      "Add the zucchini and the pasta and simmer for 10 minutes more until the pasta is just tender; it keeps softening in the hot soup, so stop a little early.",
      "Season with salt and plenty of pepper, tasting as you go.",
      "Ladle into bowls, grate the parmesan over and drizzle with oil. It thickens as it sits, so loosen leftovers with a little water."
    ],
    "teaches": [
      "a vegetable soup base"
    ]
  },
  {
    "id": 50,
    "name": "Lasagna",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012607_e67291c2-dfa7-4dea-8e84-061fc6f403ad_min.webp",
    "cuisine": "Italian",
    "meal": "Dinner",
    "time": 100,
    "serv": 8,
    "diff": "Confident",
    "tags": [
      "Family"
    ],
    "total": 19.6,
    "save": 4.8,
    "macros": [
      32,
      44,
      22,
      4
    ],
    "ing": [
      [
        "ground-beef",
        "1 lb"
      ],
      [
        "pasta",
        "12 lasagna sheets"
      ],
      [
        "diced-tomatoes",
        "2 cans"
      ],
      [
        "ricotta",
        "450 g"
      ],
      [
        "mozzarella",
        "300 g"
      ],
      [
        "parmesan",
        "60 g"
      ],
      [
        "onion",
        "1"
      ],
      [
        "garlic",
        "3 cloves"
      ],
      [
        "eggs",
        "1"
      ],
      [
        "basil",
        "handful"
      ]
    ],
    "steps": [
      "Dice the onion and chop the garlic. Heat 2 tbsp oil in a wide pot over medium-high and brown the beef with a good pinch of salt for 8 minutes, breaking it up, until no pink remains and the bottom is crusty, then add the onion for 5 minutes until soft and the garlic for 1 minute.",
      "Pour in both cans of tomatoes with half a can of water, season with salt and pepper and simmer uncovered for 30 minutes, stirring now and then, until thick and rich. Tear in half the basil and taste; it should be a touch saltier than you want, since the cheese and pasta mute it.",
      "Meanwhile heat the oven to 375°F (190°C). Stir the ricotta with the egg, half the parmesan and a pinch of salt and pepper until smooth, tear or grate the mozzarella, and if the lasagna sheets are not the no-boil kind, cook them in salted water for 4 to 5 minutes, short of the packet time, and lay them on a tea towel.",
      "In a baking dish about 9 by 13 inches, spread a thin layer of sauce, then 4 sheets, a third of the ricotta, a third of the mozzarella and a quarter of the sauce. Repeat twice more, finishing with the last of the sauce, mozzarella and parmesan on top.",
      "Cover tightly with foil, tented so it does not touch the cheese, and bake on the middle rack for 40 minutes.",
      "Remove the foil and bake for 15 minutes more until the top is bubbling and browned in patches and a knife slides through the centre with no resistance.",
      "Rest for 15 minutes before cutting; it holds its layers only once it settles. Scatter the rest of the basil over and serve."
    ],
    "teaches": [
      "layering a bake",
      "resting before cutting"
    ]
  },
  {
    "id": 51,
    "name": "Cacio e Pepe",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012607_69d2ee81-73b8-47b0-bfbf-2768eecf1b1a_min.webp",
    "cuisine": "Italian",
    "meal": "Dinner",
    "time": 15,
    "serv": 2,
    "diff": "Easy",
    "tags": [
      "Vegetarian",
      "Weeknight"
    ],
    "total": 4.6,
    "save": 1.5,
    "macros": [
      18,
      70,
      16,
      3
    ],
    "ing": [
      [
        "pasta",
        "200 g"
      ],
      [
        "parmesan",
        "80 g"
      ],
      [
        "butter",
        "2 tbsp"
      ],
      [
        "chili-flakes",
        "pinch"
      ]
    ],
    "steps": [
      "Bring a pot of water to a boil, using less water than usual (about 6 cups) so it turns starchy, and salt it lightly since the cheese is salty. Finely grate the parmesan and coarsely grind about 1 tsp of black pepper.",
      "Cook the pasta for 7 to 8 minutes until a little firmer than you would eat it; it finishes in the pan.",
      "While it cooks, melt the butter in a wide skillet over medium heat, add the pepper and chili flakes and toast for 1 minute until fragrant. Add a ladle of the starchy pasta water and take the pan off the heat.",
      "Drag the pasta straight into the skillet with tongs, keeping the pot of water. Let it cool for 30 seconds (boiling-hot pasta makes the cheese clump), then add the parmesan a handful at a time, tossing hard and adding splashes of pasta water until the sauce turns creamy and coats every strand.",
      "Serve at once in warm bowls with more pepper on top; it tightens as it sits, so loosen with another spoon of pasta water if needed."
    ],
    "teaches": [
      "emulsifying a pasta sauce"
    ]
  },
  {
    "id": 52,
    "name": "Sausage and Peppers Rigatoni",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012605_9f3efb33-e7e3-4f7f-bcfe-167cb5819fde_min.webp",
    "cuisine": "Italian",
    "meal": "Dinner",
    "time": 35,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Family",
      "Weeknight"
    ],
    "total": 12.7,
    "save": 2.4,
    "macros": [
      26,
      58,
      22,
      5
    ],
    "ing": [
      [
        "sausages",
        "4"
      ],
      [
        "peppers",
        "2"
      ],
      [
        "onion",
        "1"
      ],
      [
        "garlic",
        "3 cloves"
      ],
      [
        "diced-tomatoes",
        "1 can"
      ],
      [
        "pasta",
        "400 g"
      ],
      [
        "parmesan",
        "to serve"
      ]
    ],
    "steps": [
      "Slice the sausages into ½ inch coins (or squeeze the meat from the casings for a crumbly sauce). Slice the peppers and onion thinly and chop the garlic.",
      "Heat 1 tbsp oil in a wide pan over medium-high until it shimmers. Brown the sausage for 5 to 6 minutes, turning, until crusty and the fat has rendered, and move it to a plate.",
      "Add the peppers and onion to the fat with a pinch of salt and cook for 6 to 8 minutes until soft and golden at the edges, then the garlic for 1 minute.",
      "Return the sausage, pour in the diced tomatoes, season with salt and pepper and simmer for 15 minutes until the sauce thickens and the sausage is cooked through.",
      "Meanwhile bring a large pot of water to a boil, salt it well and cook the rigatoni for 10 to 11 minutes until just firm to the bite, a touch under the packet time. Save a cup of the water and drain.",
      "Toss the rigatoni through the sauce with a splash of pasta water until coated and glossy, taste for salt and serve with parmesan grated over."
    ],
    "teaches": [
      "rendering sausage"
    ]
  },
  {
    "id": 53,
    "name": "Sheet-Pan Sausages With Potatoes and Peppers",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012606_066e0ee4-7849-4c72-8dae-adba8c658b15_min.webp",
    "cuisine": "Weeknight",
    "meal": "Dinner",
    "time": 40,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Family",
      "Weeknight",
      "Kids"
    ],
    "total": 11.3,
    "save": 2.5,
    "macros": [
      26,
      36,
      24,
      5
    ],
    "ing": [
      [
        "sausages",
        "6"
      ],
      [
        "potatoes",
        "4"
      ],
      [
        "peppers",
        "2"
      ],
      [
        "onion",
        "1 red"
      ],
      [
        "olive-oil",
        "2 tbsp"
      ],
      [
        "rosemary",
        "2 sprigs"
      ]
    ],
    "steps": [
      "Heat the oven to 425°F (220°C) with a rack in the middle. Cut the potatoes into 1 inch chunks, the peppers into wide strips and the red onion into thick wedges.",
      "Toss the vegetables on a large sheet pan with the olive oil, the rosemary leaves stripped from their stems and a good pinch of salt and pepper. Spread them in a single layer; crowding makes them steam instead of brown.",
      "Roast for 15 minutes to give the potatoes a head start, then take the pan out, turn the vegetables and nestle the sausages among them.",
      "Roast for 20 to 25 minutes more, turning the sausages once halfway, until they are browned and cooked through (no pink in the centre when you cut one) and the potatoes are crisp-edged and tender to a knife.",
      "Rest for 3 minutes, then serve straight from the pan with the juices spooned over."
    ],
    "teaches": [
      "roasting a sheet pan"
    ]
  },
  {
    "id": 54,
    "name": "Honey Garlic Salmon With Broccoli",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012606_2a7808cc-162f-47a1-9a90-95eca1b0a5ed_min.webp",
    "cuisine": "Weeknight",
    "meal": "Dinner",
    "time": 25,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Weeknight",
      "Pescatarian",
      "Kids"
    ],
    "total": 16.4,
    "save": 5,
    "macros": [
      34,
      44,
      16,
      4
    ],
    "ing": [
      [
        "salmon",
        "1 lb"
      ],
      [
        "broccoli",
        "2 crowns"
      ],
      [
        "honey",
        "2 tbsp"
      ],
      [
        "soy-sauce",
        "2 tbsp"
      ],
      [
        "garlic",
        "3 cloves"
      ],
      [
        "rice",
        "1½ cups"
      ],
      [
        "sesame-seeds",
        "1 tsp"
      ]
    ],
    "steps": [
      "Rinse the rice and bring it to a boil with 2¼ cups water and a pinch of salt, cover and cook on the lowest heat for 15 minutes, then rest it off the heat with the lid on.",
      "Cut the broccoli into florets. Stir the honey, soy sauce and finely chopped garlic together in a small bowl, and pat the salmon dry and season with salt and pepper.",
      "Steam the broccoli over a pot of boiling water, or in a covered pan with ½ inch of water, for 4 to 5 minutes until bright green and just tender, then take it off the heat.",
      "Heat 1 tbsp oil in a non-stick skillet over medium-high until it shimmers. Lay the salmon in skin side down and cook for 4 to 5 minutes without moving it until the skin is crisp and the flesh has turned opaque halfway up, then flip and cook for 1 minute.",
      "Turn the heat to low and pour the honey garlic mixture around the fish. Let it bubble for 1 to 2 minutes, spooning it over the salmon, until it thickens to a glaze and the fish flakes at the thickest part; watch it, because honey burns fast.",
      "Serve the salmon and broccoli over the rice, spoon the glaze over and scatter the sesame seeds on top."
    ],
    "teaches": [
      "glazing fish"
    ]
  },
  {
    "id": 55,
    "name": "Burgers With Oven Fries",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012606_18b7e593-a7ad-41b2-b2f3-02ee35623b9d_min.webp",
    "cuisine": "Weeknight",
    "meal": "Dinner",
    "time": 35,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Family",
      "Kids"
    ],
    "total": 13.9,
    "save": 3.6,
    "macros": [
      34,
      48,
      26,
      4
    ],
    "ing": [
      [
        "ground-beef",
        "1 lb"
      ],
      [
        "burger-buns",
        "4"
      ],
      [
        "cheddar",
        "4 slices"
      ],
      [
        "potatoes",
        "4"
      ],
      [
        "romaine",
        "leaves"
      ],
      [
        "tomatoes",
        "1"
      ],
      [
        "onion",
        "½"
      ]
    ],
    "steps": [
      "Heat the oven to 425°F (220°C) with a rack in the upper third. Cut the potatoes into fries about ½ inch thick, pat them dry, toss with 2 tbsp oil and a good pinch of salt and spread them on a sheet pan in a single layer.",
      "Roast the fries for 25 to 30 minutes, turning once halfway, until golden and crisp at the edges and soft inside.",
      "Divide the beef into four and shape each into a patty a little wider than the bun, pressing a shallow dent into the centre with your thumb so it does not dome; keep the meat loose, since packing it tight makes a dense burger. Season the outsides generously with salt and pepper just before cooking.",
      "Slice the tomato and onion and separate the romaine leaves. Heat a heavy skillet over medium-high until very hot and cook the patties for 4 minutes without moving them until deeply browned, then flip and cook for 3 to 4 minutes more for juicy with a hint of pink, laying the cheddar on for the last 1 minute so it melts.",
      "Rest the patties on a plate for 2 minutes while you toast the buns cut side down in the same skillet for 1 minute until golden.",
      "Build the burgers with romaine, tomato and onion, and serve with the fries while everything is hot."
    ],
    "teaches": [
      "shaping a patty",
      "oven fries"
    ]
  },
  {
    "id": 56,
    "name": "Garlic Butter Steak Bites With Green Beans",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012606_95d453be-1eae-4a94-963e-749cbf134814_min.webp",
    "cuisine": "Weeknight",
    "meal": "Dinner",
    "time": 20,
    "serv": 4,
    "diff": "Medium",
    "tags": [
      "Weeknight"
    ],
    "total": 18.6,
    "save": 1.2,
    "macros": [
      38,
      12,
      24,
      4
    ],
    "ing": [
      [
        "steak",
        "1 lb"
      ],
      [
        "green-beans",
        "300 g"
      ],
      [
        "butter",
        "3 tbsp"
      ],
      [
        "garlic",
        "4 cloves"
      ],
      [
        "parsley",
        "handful"
      ]
    ],
    "steps": [
      "Cut the steak into 1 inch cubes, pat them very dry with paper towel and season generously with salt and pepper. Trim the green beans, slice the garlic and chop the parsley.",
      "Heat 1 tbsp oil in a large heavy skillet over high heat until it smokes. Add half the steak in a single layer and leave it for 1 to 2 minutes until a deep brown crust forms, then turn and cook for 1 minute more; move it to a plate and repeat with the second half, since cooking in batches keeps the pan hot enough to sear.",
      "Lower the heat to medium, add 1 tbsp of the butter and the green beans with a pinch of salt and 2 tbsp water. Cook for 4 to 5 minutes, tossing, until the beans are bright green and tender with a little bite.",
      "Add the remaining butter and the garlic and cook for 1 minute until the garlic is soft and fragrant but not brown.",
      "Return the steak and its juices and toss for 1 minute so it coats in the garlic butter and warms through without cooking further.",
      "Scatter the parsley over, taste for salt and serve straight from the pan."
    ],
    "teaches": [
      "a hard sear",
      "cooking in batches"
    ]
  },
  {
    "id": 57,
    "name": "Vegetable Omelette",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012617_3f5ed863-fbfc-46e1-8506-f3d9ac6288c3_min.webp",
    "cuisine": "Breakfast",
    "meal": "Breakfast",
    "time": 15,
    "serv": 1,
    "diff": "Easy",
    "tags": [
      "Vegetarian",
      "Kids",
      "Weeknight"
    ],
    "total": 3.2,
    "save": 0.9,
    "macros": [
      22,
      8,
      20,
      2
    ],
    "ing": [
      [
        "eggs",
        "3"
      ],
      [
        "peppers",
        "½"
      ],
      [
        "mushrooms",
        "4"
      ],
      [
        "cheddar",
        "40 g"
      ],
      [
        "butter",
        "1 tbsp"
      ]
    ],
    "steps": [
      "Slice the mushrooms and dice the pepper small, and grate the cheddar. Beat the eggs with a pinch of salt and pepper until no streaks of white remain.",
      "Melt half the butter in an 8 inch non-stick skillet over medium heat. Cook the mushrooms and pepper for 4 to 5 minutes until the mushrooms are browned and the pepper has softened, then tip them onto a plate.",
      "Add the rest of the butter and swirl it until it foams. Pour in the eggs and let them sit for 20 seconds, then pull the setting edges toward the centre with a spatula, tilting the pan so the raw egg runs into the gaps, for 1 to 2 minutes until the top is mostly set but still glossy.",
      "Scatter the vegetables and cheddar over one half and cook for 30 seconds more until the cheese starts to melt.",
      "Fold the empty half over the filling, slide the omelette onto a plate and eat it straight away."
    ],
    "teaches": [
      "folding an omelette"
    ]
  },
  {
    "id": 58,
    "name": "Loaded Baked Potatoes",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012618_b15abd41-5e60-4b64-b460-9bc0b4f432d5_min.webp",
    "cuisine": "Weeknight",
    "meal": "Dinner",
    "time": 60,
    "serv": 4,
    "diff": "Easy",
    "tags": [
      "Vegetarian",
      "Kids",
      "Family"
    ],
    "total": 7.1,
    "save": 2.8,
    "macros": [
      16,
      52,
      14,
      7
    ],
    "ing": [
      [
        "potatoes",
        "4 large"
      ],
      [
        "broccoli",
        "1 crown"
      ],
      [
        "cheddar",
        "150 g"
      ],
      [
        "sour-cream",
        "½ cup"
      ],
      [
        "chives",
        "handful"
      ],
      [
        "butter",
        "2 tbsp"
      ]
    ],
    "steps": [
      "Heat the oven to 400°F (200°C) with a rack in the middle. Scrub the potatoes, dry them, prick each a few times with a fork, rub with a little oil and salt and set them directly on the rack.",
      "Bake for 50 to 55 minutes until the skins are crisp and crackly and a skewer slides into the centre with no resistance. Leave the foil in the drawer; wrapping them steams the skin soft.",
      "While the potatoes finish, cut the broccoli into small florets and steam them in a covered pan with ½ inch of water for 4 to 5 minutes until bright green and tender. Grate the cheddar and snip the chives.",
      "Split each potato down the middle, push the ends together to open it, and fluff the inside with a fork with a piece of the butter and a pinch of salt and pepper.",
      "Pile on the broccoli and cheddar and return the potatoes to the oven for 3 to 4 minutes until the cheese melts.",
      "Finish with a spoonful of sour cream and the chives and serve hot."
    ],
    "teaches": [
      "baking a potato properly"
    ]
  }
];

export const NOTES: { t: string; m: string; img: string; r?: number; screen?: 'pricematch' | 'stores' }[] = [
  {
    "t": "Three dinners from one $9.99 tray of chicken thighs",
    "m": "2 min read",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012254_2e0434c0-56da-41fa-8025-1c9b1761c07a_min.webp",
    "r": 5
  },
  {
    "t": "Salmon drops to $9.99 a pound at Safeway, its lowest since July",
    "m": "1 min read",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012254_c9039341-87cd-4ee0-9efa-b10ebbfec82e_min.webp",
    "r": 4
  },
  {
    "t": "Walmart will price match four items already on your list",
    "m": "2 min read",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012344_267a60cc-3806-470a-9caa-9fe3986798dc_min.webp",
    "screen": "pricematch"
  },
  {
    "t": "Superstore or No Frills: where this week’s cart is cheaper",
    "m": "3 min read",
    "img": "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/hf_20261028_012431_74775577-0e0c-44b9-baec-5c44a8d6827a_min.webp",
    "screen": "stores"
  }
];
