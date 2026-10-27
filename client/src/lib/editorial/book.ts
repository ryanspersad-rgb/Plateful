// Generated from the editorial prototype (Plateful_editorial.html, 2026-10-26).
// Prices, distances and policy wording are placeholders until the grocer portal feeds live deals.
import type { Ad, BookItem, PMRule, Store, StoreId } from '@/lib/types';

export const IMG_BASE = "https://d8j0ntlcm91z4.cloudfront.net/user_3LDaESd5mDEyKNm6i2LUmBhLIqh/";
export const FLYER_WEEK = "Oct\u00A023\u00A0–\u2060\u00A029"; // non-breaking spaces plus a word joiner after the dash: the range never splits across lines

/** Product photos (Higgsfield, 1:1 transparent PNG; the CDN publishes a _min.webp beside each). */
export const PRODUCT_IMG: Record<string, string> = {
  "chicken-thighs": "hf_20261026_053520_1d17a507-411b-4b5d-aa5d-a960de473850.png",
  "broccoli": "hf_20261026_053520_de0c07e9-82c8-4525-b67b-a8b20244dfb5.png",
  "salmon": "hf_20261026_053520_53178457-9434-40ed-8512-890fd75a8e6a.png",
  "potatoes": "hf_20261026_053519_2bab9f36-0c0e-413b-9650-24cbe70b33da.png",
  "cheddar": "hf_20261026_053520_5c5534ba-dfdc-42a4-8717-b3f678090b31.png",
  "diced-tomatoes": "hf_20261026_053519_efac8bdd-9922-4c9f-99e3-7d09c68dccb7.png",
  "rice": "hf_20261026_053519_0b9b9aef-8fd1-4682-a12d-85cab30d3619.png",
  "eggs": "hf_20261026_053520_3a81567a-c9c0-45f6-9069-601ec4438ce4.png",
  "avocado": "hf_20261026_053523_66eeb4a6-918b-4ffe-bffe-e4b2225530a3.png",
  "ground-beef": "hf_20261026_053523_4e266640-01fb-4e1c-87b1-aac348f5e7d8.png",
  "sourdough": "hf_20261026_053522_5aafc6b6-09e7-4570-a947-a4da143aa8b7.png",
  "peppers": "hf_20261026_053522_5c688956-dd3a-4b0b-8281-73fa2eedbe97.png",
  "whole-chicken": "hf_20261026_061040_8d6bdb09-1fa1-4b59-927b-f3a5a67dc4a2.png",
  "carrots": "hf_20261026_061041_96c37fec-0f1c-49e6-b3b5-37de99800f86.png",
  "lemon": "hf_20261026_061042_038d3021-d3ce-4fd6-b6d9-7939a2808c30.png",
  "onion": "hf_20261026_061040_b5a5caca-762b-4d8a-9e27-d7aa54baac6a.png",
  "shrimp": "hf_20261026_061040_b7b0f64d-f82c-4604-be06-54130ac31120.png",
  "naan": "hf_20261026_061040_9602774f-57fd-4b65-8fca-d108ae266623.png",
  "tortillas": "hf_20261026_061041_58bf5303-e010-4fde-81d5-d0f9d5c72ecb.png",
  "mozzarella": "hf_20261026_061041_cec8da5f-d638-4f1b-bb0c-dc008bd64f23.png",
  "pasta": "hf_20261026_061042_abdb798b-2371-477d-afa6-a12a902191ad.png",
  "parmesan": "hf_20261026_061042_541e7c1b-59b3-4ac3-b100-100fd4cf3eec.png",
  "feta": "hf_20261026_061039_8b74dc85-05ab-455e-85fc-1fea014b6c1e.png",
  "pork-tenderloin": "hf_20261026_061041_5a7c7f18-6480-4986-9469-37dd60b3ad74.png",
  "romaine": "hf_20261026_061054_2db45af4-d8f8-41f9-b2cb-d80599f40df8.png",
  "flank-steak": "hf_20261026_061053_9b8bceb9-bd05-40bd-b3b8-d9f10f3ee2eb.png",
  "mushrooms": "hf_20261026_061055_a46a9ec8-eab8-4561-b7a7-a1fd6b16c110.png",
  "tomatoes": "hf_20261026_061055_fa0c90f4-61f9-418b-bf30-70a4bf0847ff.png",
  "cucumber": "hf_20261026_061055_9f319c05-062b-4a31-9de0-3da9381a25aa.png",
  "apples": "hf_20261026_061054_fc081a75-cb63-4bbf-9298-5aba6c83b0e3.png",
  "green-beans": "hf_20261026_061054_0a86c674-997d-429d-908b-1d2726e3a2ce.png",
  "cream": "hf_20261026_061054_38cf2ad7-d4dc-4de4-ba89-142785e70175.png",
  "chicken-broth": "hf_20261026_061055_e0f7d59f-39c4-4e3c-b564-e03659142997.png",
  "white-beans": "hf_20261026_061054_d31982f2-743f-4d6f-89f4-202310dbb61f.png",
  "peas": "hf_20261026_061055_c91da31d-6a6b-489a-9960-34e84ebc0a4b.png",
  "coconut-milk": "hf_20261026_061056_ca09d96d-a425-4acc-98aa-9844e69f4c9e.png",
  "bananas": "hf_20261026_061102_9d49558e-8619-4cfe-9866-f929954f8f4f.png",
  "olive-oil": "hf_20261026_061059_9bdda794-2c60-4931-8a3e-de4bd97b7c2f.png",
  "rice-noodles": "hf_20261026_061059_2c544f8e-2e63-4524-b48d-f32d9e246cb3.png",
  "butter": "hf_20261026_061100_842b79c8-cb19-4e6a-9a7c-13ffa8f6801b.png",
  "milk": "hf_20261026_061100_a39c225e-c00c-4708-854a-bb6af2468ddd.png"
};
export const productImg = (key: string): string | undefined => {
  const f = PRODUCT_IMG[key];
  return f ? IMG_BASE + f.replace(/\.png$/, '_min.webp') : undefined;
};

export const BOOK: Record<string, BookItem> = {
  "chicken-thighs": {
    "n": "Chicken thighs, boneless skinless",
    "p": 2.99,
    "u": "/lb",
    "was": 4.49,
    "r": "Superstore",
    "sid": "ss",
    "cat": "Meat",
    "size": "per lb",
    "ca": true
  },
  "broccoli": {
    "n": "Broccoli crowns",
    "p": 1.49,
    "u": " ea",
    "was": 2.49,
    "r": "No Frills",
    "sid": "nf",
    "cat": "Produce",
    "size": "each"
  },
  "salmon": {
    "n": "Atlantic salmon fillet",
    "p": 9.99,
    "u": "/lb",
    "was": 14.99,
    "r": "Safeway",
    "sid": "sw",
    "cat": "Meat",
    "size": "per lb",
    "ca": true,
    "promo": {
      "placement": "near_you",
      "radiusKm": 3,
      "tags": [
        "Weeknight",
        "Pescatarian"
      ],
      "recipe": 4
    }
  },
  "potatoes": {
    "n": "Russet potatoes",
    "p": 3.99,
    "u": "",
    "was": 6.99,
    "r": "Superstore",
    "sid": "ss",
    "cat": "Produce",
    "size": "10 lb bag",
    "ca": true
  },
  "cheddar": {
    "n": "Aged cheddar",
    "p": 4.99,
    "u": "",
    "was": 7.49,
    "r": "Co-op",
    "sid": "co",
    "cat": "Dairy",
    "size": "400 g",
    "ca": true,
    "promo": {
      "placement": "featured",
      "radiusKm": 5,
      "tags": [
        "Kids",
        "Family"
      ],
      "recipe": 19
    }
  },
  "diced-tomatoes": {
    "n": "Diced tomatoes",
    "p": 0.99,
    "u": "",
    "was": 1.69,
    "r": "No Frills",
    "sid": "nf",
    "cat": "Pantry",
    "size": "796 mL"
  },
  "rice": {
    "n": "Basmati rice",
    "p": 8.99,
    "u": "",
    "was": 12.97,
    "r": "Walmart",
    "sid": "wm",
    "cat": "Pantry",
    "size": "4 kg"
  },
  "eggs": {
    "n": "Large brown eggs",
    "p": 3.49,
    "u": "",
    "was": 4.69,
    "r": "Superstore",
    "sid": "ss",
    "cat": "Dairy",
    "size": "dozen",
    "ca": true
  },
  "avocado": {
    "n": "Hass avocados",
    "p": 0.99,
    "u": " ea",
    "was": 1.49,
    "r": "Co-op",
    "sid": "co",
    "cat": "Produce",
    "size": "each"
  },
  "ground-beef": {
    "n": "Lean ground beef",
    "p": 3.99,
    "u": "/lb",
    "was": 5.99,
    "r": "Safeway",
    "sid": "sw",
    "cat": "Meat",
    "size": "per lb",
    "ca": true
  },
  "sourdough": {
    "n": "Sourdough loaf",
    "p": 3.49,
    "u": "",
    "was": 4.99,
    "r": "Co-op",
    "sid": "co",
    "cat": "Bakery",
    "size": "680 g",
    "ca": true
  },
  "peppers": {
    "n": "Sweet bell peppers",
    "p": 2.99,
    "u": "",
    "was": 4.47,
    "r": "Walmart",
    "sid": "wm",
    "cat": "Produce",
    "size": "3 pack"
  },
  "carrots": {
    "n": "Carrots",
    "p": 1.29,
    "r": "Superstore",
    "sid": "ss",
    "u": "",
    "was": 1.99,
    "cat": "Produce",
    "size": "2 lb bag",
    "ca": true
  },
  "onion": {
    "n": "Onions",
    "p": 1.99,
    "r": "Superstore",
    "sid": "ss",
    "u": "",
    "was": 2.99,
    "cat": "Produce",
    "size": "3 lb bag",
    "ca": true
  },
  "garlic": {
    "n": "Garlic",
    "p": 0.79,
    "r": "Superstore",
    "sid": "ss"
  },
  "olive-oil": {
    "n": "Olive oil",
    "p": 6.97,
    "r": "Walmart",
    "sid": "wm",
    "u": "",
    "was": 9.99,
    "cat": "Pantry",
    "size": "1 L"
  },
  "thyme": {
    "n": "Fresh thyme",
    "p": 2.49,
    "r": "Safeway",
    "sid": "sw"
  },
  "lemon": {
    "n": "Lemons",
    "p": 0.49,
    "r": "Superstore",
    "sid": "ss",
    "u": " ea",
    "was": 0.69,
    "cat": "Produce",
    "size": "each"
  },
  "flank-steak": {
    "n": "Flank steak",
    "p": 7.99,
    "r": "Safeway",
    "sid": "sw",
    "u": "/lb",
    "was": 9.99,
    "cat": "Meat",
    "size": "per lb",
    "ca": true
  },
  "soy-sauce": {
    "n": "Soy sauce",
    "p": 2.99,
    "r": "Walmart",
    "sid": "wm"
  },
  "ginger": {
    "n": "Ginger",
    "p": 1.19,
    "r": "Co-op",
    "sid": "co"
  },
  "cornstarch": {
    "n": "Cornstarch",
    "p": 2.29,
    "r": "Walmart",
    "sid": "wm"
  },
  "sesame-oil": {
    "n": "Sesame oil",
    "p": 4.49,
    "r": "Walmart",
    "sid": "wm"
  },
  "white-beans": {
    "n": "White beans",
    "p": 0.79,
    "r": "No Frills",
    "sid": "nf",
    "u": "",
    "was": 1.29,
    "cat": "Pantry",
    "size": "540 mL"
  },
  "basil": {
    "n": "Fresh basil",
    "p": 2.99,
    "r": "Safeway",
    "sid": "sw"
  },
  "veg-broth": {
    "n": "Vegetable broth",
    "p": 2.49,
    "r": "No Frills",
    "sid": "nf"
  },
  "green-beans": {
    "n": "Green beans",
    "p": 1.99,
    "r": "Co-op",
    "sid": "co",
    "u": "/lb",
    "was": 2.99,
    "cat": "Produce",
    "size": "per lb"
  },
  "dill": {
    "n": "Fresh dill",
    "p": 2.49,
    "r": "Safeway",
    "sid": "sw"
  },
  "butter": {
    "n": "Butter",
    "p": 3.97,
    "r": "Walmart",
    "sid": "wm",
    "u": "",
    "was": 4.99,
    "cat": "Dairy",
    "size": "454 g",
    "ca": true
  },
  "peas": {
    "n": "Frozen peas",
    "p": 1.77,
    "r": "No Frills",
    "sid": "nf",
    "u": "",
    "was": 2.49,
    "cat": "Pantry",
    "size": "750 g frozen"
  },
  "chicken-broth": {
    "n": "Chicken broth",
    "p": 1.49,
    "r": "No Frills",
    "sid": "nf",
    "u": "",
    "was": 2.49,
    "cat": "Pantry",
    "size": "900 mL"
  },
  "parsley": {
    "n": "Parsley",
    "p": 1.49,
    "r": "Co-op",
    "sid": "co"
  },
  "pasta": {
    "n": "Pasta",
    "p": 1.49,
    "r": "Safeway",
    "sid": "sw",
    "u": "",
    "was": 2.49,
    "cat": "Pantry",
    "size": "450 g"
  },
  "parmesan": {
    "n": "Parmesan",
    "p": 4.99,
    "r": "Safeway",
    "sid": "sw",
    "u": "",
    "was": 6.99,
    "cat": "Dairy",
    "size": "200 g"
  },
  "cream": {
    "n": "Whipping cream",
    "p": 2.49,
    "r": "Co-op",
    "sid": "co",
    "u": "",
    "was": 3.29,
    "cat": "Dairy",
    "size": "473 mL",
    "ca": true
  },
  "garam-masala": {
    "n": "Garam masala",
    "p": 3.49,
    "r": "Walmart",
    "sid": "wm"
  },
  "naan": {
    "n": "Naan",
    "p": 2.49,
    "r": "Superstore",
    "sid": "ss",
    "u": "",
    "was": 3.49,
    "cat": "Bakery",
    "size": "5 pack"
  },
  "pork-tenderloin": {
    "n": "Pork tenderloin",
    "p": 4.99,
    "r": "Safeway",
    "sid": "sw",
    "u": "/lb",
    "was": 7.99,
    "cat": "Meat",
    "size": "per lb",
    "ca": true
  },
  "apples": {
    "n": "Apples",
    "p": 2.49,
    "r": "Co-op",
    "sid": "co",
    "u": "",
    "was": 3.99,
    "cat": "Produce",
    "size": "3 lb bag",
    "ca": true
  },
  "sage": {
    "n": "Fresh sage",
    "p": 1.99,
    "r": "Safeway",
    "sid": "sw"
  },
  "cumin": {
    "n": "Cumin",
    "p": 2.99,
    "r": "Walmart",
    "sid": "wm"
  },
  "feta": {
    "n": "Feta",
    "p": 3.49,
    "r": "Safeway",
    "sid": "sw",
    "u": "",
    "was": 4.99,
    "cat": "Dairy",
    "size": "200 g",
    "ca": true
  },
  "coconut-milk": {
    "n": "Coconut milk",
    "p": 1.27,
    "r": "No Frills",
    "sid": "nf",
    "u": "",
    "was": 1.99,
    "cat": "Pantry",
    "size": "400 mL"
  },
  "curry-paste": {
    "n": "Green curry paste",
    "p": 3.49,
    "r": "Walmart",
    "sid": "wm"
  },
  "lime": {
    "n": "Limes",
    "p": 0.5,
    "r": "Superstore",
    "sid": "ss"
  },
  "tortillas": {
    "n": "Tortillas",
    "p": 2.49,
    "r": "Superstore",
    "sid": "ss",
    "u": "",
    "was": 3.29,
    "cat": "Bakery",
    "size": "10 pack"
  },
  "tomatoes": {
    "n": "Tomatoes",
    "p": 1.99,
    "r": "Co-op",
    "sid": "co",
    "u": "/lb",
    "was": 2.99,
    "cat": "Produce",
    "size": "on the vine, per lb",
    "ca": true
  },
  "cilantro": {
    "n": "Cilantro",
    "p": 1.49,
    "r": "Superstore",
    "sid": "ss"
  },
  "shrimp": {
    "n": "Shrimp",
    "p": 8.99,
    "r": "Superstore",
    "sid": "ss",
    "u": "",
    "was": 11.99,
    "cat": "Meat",
    "size": "340 g"
  },
  "chili-flakes": {
    "n": "Chili flakes",
    "p": 1.99,
    "r": "Walmart",
    "sid": "wm"
  },
  "romaine": {
    "n": "Romaine",
    "p": 1.99,
    "r": "Safeway",
    "sid": "sw",
    "u": " ea",
    "was": 2.99,
    "cat": "Produce",
    "size": "each"
  },
  "croutons": {
    "n": "Croutons",
    "p": 2.49,
    "r": "Safeway",
    "sid": "sw"
  },
  "caesar-dressing": {
    "n": "Caesar dressing",
    "p": 3.99,
    "r": "Safeway",
    "sid": "sw"
  },
  "green-onion": {
    "n": "Green onions",
    "p": 1.29,
    "r": "Superstore",
    "sid": "ss"
  },
  "kidney-beans": {
    "n": "Kidney beans",
    "p": 1.29,
    "r": "No Frills",
    "sid": "nf"
  },
  "chili-powder": {
    "n": "Chili powder",
    "p": 2.49,
    "r": "Walmart",
    "sid": "wm"
  },
  "sour-cream": {
    "n": "Sour cream",
    "p": 2.99,
    "r": "Co-op",
    "sid": "co"
  },
  "pizza-dough": {
    "n": "Pizza dough",
    "p": 3.49,
    "r": "Safeway",
    "sid": "sw"
  },
  "mozzarella": {
    "n": "Mozzarella",
    "p": 3.99,
    "r": "Superstore",
    "sid": "ss",
    "u": "",
    "was": 5.49,
    "cat": "Dairy",
    "size": "340 g",
    "ca": true
  },
  "cucumber": {
    "n": "Cucumber",
    "p": 0.79,
    "r": "Co-op",
    "sid": "co",
    "u": " ea",
    "was": 1.29,
    "cat": "Produce",
    "size": "each",
    "ca": true
  },
  "kimchi": {
    "n": "Kimchi",
    "p": 6.99,
    "r": "Superstore",
    "sid": "ss"
  },
  "brown-sugar": {
    "n": "Brown sugar",
    "p": 2.99,
    "r": "Walmart",
    "sid": "wm"
  },
  "arborio": {
    "n": "Arborio rice",
    "p": 4.49,
    "r": "Safeway",
    "sid": "sw"
  },
  "mushrooms": {
    "n": "Mushrooms",
    "p": 2.49,
    "r": "Co-op",
    "sid": "co",
    "u": "",
    "was": 3.99,
    "cat": "Produce",
    "size": "227 g",
    "ca": true
  },
  "milk": {
    "n": "Milk",
    "p": 2.47,
    "r": "Walmart",
    "sid": "wm",
    "u": "",
    "was": 2.97,
    "cat": "Dairy",
    "size": "2 L",
    "ca": true
  },
  "flour": {
    "n": "Flour",
    "p": 4.49,
    "r": "Walmart",
    "sid": "wm"
  },
  "breadcrumbs": {
    "n": "Breadcrumbs",
    "p": 2.29,
    "r": "No Frills",
    "sid": "nf"
  },
  "whole-chicken": {
    "n": "Whole chicken",
    "p": 7.99,
    "r": "Superstore",
    "sid": "ss",
    "u": "",
    "was": 11.99,
    "cat": "Meat",
    "size": "each · about 1.6 kg",
    "ca": true
  },
  "rosemary": {
    "n": "Rosemary",
    "p": 1.99,
    "r": "Safeway",
    "sid": "sw"
  },
  "beef-broth": {
    "n": "Beef broth",
    "p": 2.49,
    "r": "No Frills",
    "sid": "nf"
  },
  "tomato-paste": {
    "n": "Tomato paste",
    "p": 0.99,
    "r": "No Frills",
    "sid": "nf"
  },
  "rice-noodles": {
    "n": "Rice noodles",
    "p": 1.97,
    "r": "Walmart",
    "sid": "wm",
    "u": "",
    "was": 2.99,
    "cat": "Pantry",
    "size": "400 g"
  },
  "bean-sprouts": {
    "n": "Bean sprouts",
    "p": 1.49,
    "r": "Co-op",
    "sid": "co"
  },
  "peanuts": {
    "n": "Peanuts",
    "p": 3.49,
    "r": "Walmart",
    "sid": "wm"
  },
  "fish-sauce": {
    "n": "Fish sauce",
    "p": 3.29,
    "r": "Walmart",
    "sid": "wm"
  },
  "olives": {
    "n": "Kalamata olives",
    "p": 3.49,
    "r": "Safeway",
    "sid": "sw"
  },
  "tzatziki": {
    "n": "Tzatziki",
    "p": 3.99,
    "r": "Co-op",
    "sid": "co"
  },
  "oregano": {
    "n": "Oregano",
    "p": 1.99,
    "r": "Walmart",
    "sid": "wm"
  },
  "bananas": {
    "n": "Bananas",
    "p": 0.57,
    "r": "No Frills",
    "sid": "nf",
    "u": "/lb",
    "was": 0.79,
    "cat": "Produce",
    "size": "per lb"
  },
  "maple-syrup": {
    "n": "Maple syrup",
    "p": 8.99,
    "r": "Co-op",
    "sid": "co",
    "ca": true
  },
  "baking-powder": {
    "n": "Baking powder",
    "p": 2.49,
    "r": "Walmart",
    "sid": "wm"
  },
  "star-anise": {
    "n": "Star anise",
    "p": 2.99,
    "r": "Walmart",
    "sid": "wm"
  },
  "chili": {
    "n": "Fresh chili",
    "p": 0.79,
    "r": "Co-op",
    "sid": "co"
  },
  "salsa": {
    "n": "Salsa",
    "p": 3.49,
    "r": "Superstore",
    "sid": "ss"
  },
  "chickpeas": {
    "n": "Chickpeas",
    "p": 1.29,
    "r": "No Frills",
    "sid": "nf"
  },
  "paneer": {
    "n": "Paneer",
    "p": 6.99,
    "r": "Superstore",
    "sid": "ss",
    "ca": true
  },
  "lentils": {
    "n": "Yellow lentils",
    "p": 2.49,
    "r": "Walmart",
    "sid": "wm"
  },
  "cauliflower": {
    "n": "Cauliflower",
    "p": 3.49,
    "r": "Co-op",
    "sid": "co"
  },
  "spinach": {
    "n": "Spinach",
    "p": 2.99,
    "r": "Co-op",
    "sid": "co"
  },
  "sausages": {
    "n": "Italian sausages",
    "p": 5.99,
    "r": "Superstore",
    "sid": "ss",
    "ca": true
  },
  "honey": {
    "n": "Honey",
    "p": 5.99,
    "r": "Co-op",
    "sid": "co",
    "ca": true
  },
  "black-beans": {
    "n": "Black beans",
    "p": 1.29,
    "r": "No Frills",
    "sid": "nf"
  },
  "ricotta": {
    "n": "Ricotta",
    "p": 4.49,
    "r": "Safeway",
    "sid": "sw"
  },
  "pesto": {
    "n": "Basil pesto",
    "p": 3.99,
    "r": "Safeway",
    "sid": "sw"
  },
  "burger-buns": {
    "n": "Burger buns",
    "p": 2.99,
    "r": "Superstore",
    "sid": "ss"
  },
  "zucchini": {
    "n": "Zucchini",
    "p": 1.49,
    "r": "Co-op",
    "sid": "co"
  },
  "yogurt": {
    "n": "Plain yogurt",
    "p": 3.49,
    "r": "Superstore",
    "sid": "ss",
    "ca": true
  },
  "peanut-butter": {
    "n": "Peanut butter",
    "p": 4.49,
    "r": "Walmart",
    "sid": "wm"
  },
  "lemongrass": {
    "n": "Lemongrass",
    "p": 1.99,
    "r": "Co-op",
    "sid": "co"
  },
  "mint": {
    "n": "Fresh mint",
    "p": 1.99,
    "r": "Safeway",
    "sid": "sw"
  },
  "chicken-breast": {
    "n": "Chicken breast",
    "p": 5.99,
    "u": "/lb",
    "r": "Superstore",
    "sid": "ss",
    "ca": true
  },
  "pork-shoulder": {
    "n": "Pork shoulder",
    "p": 3.49,
    "u": "/lb",
    "r": "Superstore",
    "sid": "ss",
    "ca": true
  },
  "enchilada-sauce": {
    "n": "Enchilada sauce",
    "p": 2.49,
    "r": "Walmart",
    "sid": "wm"
  },
  "steak": {
    "n": "Sirloin steak",
    "p": 11.99,
    "u": "/lb",
    "r": "Safeway",
    "sid": "sw",
    "ca": true
  },
  "chives": {
    "n": "Chives",
    "p": 1.49,
    "r": "Co-op",
    "sid": "co"
  },
  "sesame-seeds": {
    "n": "Sesame seeds",
    "p": 2.29,
    "r": "Walmart",
    "sid": "wm"
  },
  "beef-chuck": {
    "n": "Beef chuck roast",
    "p": 6.99,
    "u": "/lb",
    "r": "Superstore",
    "sid": "ss",
    "ca": true
  },
  "pumpkin-puree": {
    "n": "Pumpkin purée",
    "p": 2.49,
    "r": "No Frills",
    "sid": "nf"
  }
};

/** Keys with a sale price this week. */
export const SALE_KEYS: string[] = Object.keys(BOOK).filter((k) => BOOK[k].was !== undefined);

export const STORES: Store[] = [
  {
    "id": "sw",
    "retailer": "Safeway",
    "name": "Safeway Beltline",
    "area": "11 Ave SW",
    "km": 1.1,
    "pm": false,
    "ang": 215,
    "deals": 3,
    "flyer": "https://www.safeway.ca/flyer/"
  },
  {
    "id": "co",
    "retailer": "Calgary Co-op",
    "name": "Co-op Midtown",
    "area": "11 Ave SW",
    "km": 1.4,
    "pm": false,
    "ang": 268,
    "deals": 4,
    "flyer": "https://flyers.calgarycoop.com/flyers/calgarycoop-weekly"
  },
  {
    "id": "nf",
    "retailer": "No Frills",
    "name": "No Frills",
    "area": "17 Ave SE",
    "km": 2.3,
    "pm": false,
    "ang": 125,
    "deals": 3,
    "flyer": "https://www.nofrills.ca/flyer"
  },
  {
    "id": "wm",
    "retailer": "Walmart",
    "name": "Walmart Supercentre",
    "area": "Macleod Trail",
    "km": 4.6,
    "pm": true,
    "ang": 165,
    "deals": 3,
    "flyer": "https://www.walmart.ca/flyer"
  },
  {
    "id": "ss",
    "retailer": "Real Canadian Superstore",
    "name": "Superstore",
    "area": "Shaganappi",
    "km": 4.8,
    "pm": true,
    "ang": 310,
    "deals": 5,
    "flyer": "https://www.realcanadiansuperstore.ca/flyer"
  },
  {
    "id": "tt",
    "retailer": "T&T",
    "name": "T&T Supermarket",
    "area": "Pacific Place",
    "km": 6.1,
    "pm": false,
    "ang": 72,
    "deals": 2,
    "flyer": "https://www.tntsupermarket.com/eng/flyers.html"
  },
  {
    "id": "cc",
    "retailer": "Costco",
    "name": "Costco",
    "area": "Beacon Hill",
    "km": 9.4,
    "pm": false,
    "ang": 20,
    "deals": 1,
    "flyer": "https://www.costco.ca/warehouse-savings.html"
  }
];
export const STORE = (id: string): Store | undefined => STORES.find((s) => s.id === id);
export const dealsAt = (sid: StoreId): number => SALE_KEYS.filter((k) => BOOK[k].sid === sid).length;

export const PM_POLICY: Record<string, string> = {
  "ss": "Superstore matches identical items advertised in current local flyers. Show the ad at the till.",
  "wm": "Walmart matches identical items in current local competitor flyers at checkout.",
  "sw": "Safeway does not price match.",
  "co": "Co-op does not price match.",
  "nf": "No Frills does not price match."
};

/** Placeholder shelf prices per store (per unit). */
export const STORE_PRICE: Record<string, Partial<Record<StoreId, number>>> = {
  "chicken-thighs": {
    "ss": 2.99,
    "sw": 4.49,
    "co": 4.29,
    "nf": 2.77,
    "wm": 2.97
  },
  "potatoes": {
    "ss": 3.99,
    "sw": 5.99,
    "co": 5.49,
    "nf": 2.97,
    "wm": 3.47
  },
  "eggs": {
    "ss": 3.49,
    "sw": 4.49,
    "co": 2.99,
    "nf": 3.69,
    "wm": 3.27
  },
  "carrots": {
    "ss": 1.99,
    "sw": 2.49,
    "co": 1.49,
    "nf": 1.77,
    "wm": 1.97
  },
  "ground-beef": {
    "ss": 4.99,
    "sw": 3.99,
    "co": 5.49,
    "nf": 4.47,
    "wm": 4.27
  },
  "pasta": {
    "ss": 2.29,
    "sw": 2.49,
    "co": 2.69,
    "nf": 1.97,
    "wm": 1.97
  },
  "diced-tomatoes": {
    "ss": 1.49,
    "sw": 1.69,
    "co": 1.79,
    "nf": 0.99,
    "wm": 1.27
  },
  "parmesan": {
    "ss": 7.49,
    "sw": 6.99,
    "co": 7.99,
    "nf": 6.47,
    "wm": 6.97
  },
  "cheddar": {
    "ss": 7.49,
    "sw": 7.99,
    "co": 4.99,
    "nf": 5.97,
    "wm": 5.47
  },
  "broccoli": {
    "ss": 2.49,
    "sw": 2.99,
    "co": 2.29,
    "nf": 1.49,
    "wm": 1.97
  },
  "salmon": {
    "ss": 12.99,
    "sw": 9.99,
    "co": 13.49,
    "nf": 11.97,
    "wm": 10.97
  },
  "rice": {
    "ss": 11.49,
    "sw": 12.99,
    "co": 12.49,
    "nf": 9.97,
    "wm": 8.99
  },
  "onion": {
    "ss": 1.29,
    "sw": 1.49,
    "co": 1.39,
    "nf": 0.97,
    "wm": 1.17
  },
  "garlic": {
    "ss": 0.79,
    "sw": 0.99,
    "co": 0.89,
    "nf": 0.67,
    "wm": 0.77
  },
  "lemon": {
    "ss": 0.69,
    "sw": 0.89,
    "co": 0.79,
    "nf": 0.57,
    "wm": 0.67
  },
  "peas": {
    "ss": 2.69,
    "sw": 2.99,
    "co": 2.79,
    "nf": 2.49,
    "wm": 2.47
  },
  "sourdough": {
    "ss": 4.49,
    "sw": 4.99,
    "co": 3.49,
    "nf": 3.97,
    "wm": 3.67
  },
  "avocado": {
    "ss": 1.29,
    "sw": 1.49,
    "co": 0.99,
    "nf": 1.17,
    "wm": 1.07
  },
  "peppers": {
    "ss": 3.99,
    "sw": 4.49,
    "co": 4.29,
    "nf": 3.47,
    "wm": 2.99
  },
  "butter": {
    "ss": 4.99,
    "sw": 5.49,
    "co": 5.29,
    "nf": 4.47,
    "wm": 4.67
  }
};

/** Price-match policies, strongest first; tier 1 ranks above tier 2 at the till. */
export const PM_RULES: Partial<Record<StoreId, PMRule>> = {
  "ss": {
    "tier": 1,
    "short": "Identical item · any current local flyer · at the till",
    "long": "Matches the advertised price of an identical item (brand, size, variety) from any current local competitor flyer. Show the ad at checkout."
  },
  "wm": {
    "tier": 2,
    "short": "Identical item · local competitor flyers · at checkout",
    "long": "Matches identical items in current local competitor flyers at checkout. One match per item; no online-only prices."
  }
};

/** Competitor flyer ads for list items. */
export const ADS: Record<string, Ad[]> = {
  "chicken-thighs": [
    {
      "sid": "nf",
      "price": 2.77
    },
    {
      "sid": "wm",
      "price": 2.97
    }
  ],
  "potatoes": [
    {
      "sid": "nf",
      "price": 2.97
    },
    {
      "sid": "wm",
      "price": 3.47
    }
  ],
  "eggs": [
    {
      "sid": "co",
      "price": 2.99
    },
    {
      "sid": "wm",
      "price": 3.27
    }
  ],
  "carrots": [
    {
      "sid": "co",
      "price": 1.49
    },
    {
      "sid": "nf",
      "price": 1.77
    }
  ],
  "cheddar": [
    {
      "sid": "co",
      "price": 4.99
    },
    {
      "sid": "wm",
      "price": 5.47
    }
  ],
  "broccoli": [
    {
      "sid": "nf",
      "price": 1.49
    },
    {
      "sid": "wm",
      "price": 1.97
    }
  ],
  "rice": [
    {
      "sid": "wm",
      "price": 8.99
    }
  ],
  "peppers": [
    {
      "sid": "wm",
      "price": 2.99
    }
  ]
};

export const DEFAULT_FRIDGE: string[] = [
  "eggs",
  "garlic",
  "onion",
  "butter",
  "olive-oil",
  "rice",
  "pasta",
  "parmesan",
  "soy-sauce",
  "lemon",
  "carrots",
  "flour",
  "milk"
];
export const FRIDGE_CATS: Record<string, string[]> = {
  "Dairy & eggs": [
    "eggs",
    "butter",
    "milk",
    "parmesan",
    "cheddar",
    "cream",
    "mozzarella",
    "feta",
    "sour-cream",
    "paneer",
    "ricotta",
    "yogurt"
  ],
  "Produce": [
    "garlic",
    "onion",
    "lemon",
    "lime",
    "carrots",
    "broccoli",
    "potatoes",
    "avocado",
    "peppers",
    "tomatoes",
    "apples",
    "bananas",
    "cucumber",
    "green-beans",
    "mushrooms",
    "romaine",
    "cauliflower",
    "spinach",
    "zucchini",
    "lemongrass",
    "mint",
    "chives"
  ],
  "Meat & fish": [
    "chicken-thighs",
    "whole-chicken",
    "ground-beef",
    "salmon",
    "flank-steak",
    "shrimp",
    "pork-tenderloin",
    "sausages",
    "chicken-breast",
    "pork-shoulder",
    "steak"
  ],
  "Pantry & frozen": [
    "rice",
    "pasta",
    "olive-oil",
    "soy-sauce",
    "flour",
    "diced-tomatoes",
    "white-beans",
    "kidney-beans",
    "rice-noodles",
    "arborio",
    "chicken-broth",
    "coconut-milk",
    "peas",
    "chickpeas",
    "lentils",
    "black-beans",
    "honey",
    "pesto",
    "peanut-butter",
    "enchilada-sauce",
    "sesame-seeds"
  ],
  "Bakery": [
    "sourdough",
    "naan",
    "tortillas",
    "pizza-dough",
    "burger-buns"
  ]
};
export const DIETS: string[] = [
  "Vegetarian",
  "Vegan",
  "Gluten-free",
  "Halal",
  "Dairy-free",
  "Nut-free",
  "Low-carb"
];
export const CUISINES: string[] = [
  "Italian",
  "Indian",
  "Thai",
  "Chinese",
  "Mexican",
  "Greek",
  "Korean",
  "Vietnamese",
  "Canadian",
  "British"
];
export const FILTERS: string[] = [
  "All",
  "Weeknight",
  "Italian",
  "Indian",
  "Thai",
  "Mexican",
  "Kids",
  "Vegetarian"
];
export const KIDS: number[] = [
  19,
  21,
  20,
  27,
  11,
  14,
  46,
  43,
  57,
  58,
  53,
  47
];
export const FAMILY: number[] = [
  23,
  24,
  22,
  6,
  15,
  1,
  50,
  42,
  30,
  41,
  55,
  38
];
export const LEADS: number[] = [
  1,
  2,
  3,
  4
];
