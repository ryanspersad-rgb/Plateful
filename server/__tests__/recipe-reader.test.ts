import { describe, expect, it } from 'vitest';
import { isoMinutes, readCaption, readRecipe, yieldCount } from '../lib/recipe-reader';

const NYT = `<html><head><title>Paprika Chicken - NYT Cooking</title>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Recipe","name":"Paprika Chicken With Tomatoes","image":["https://img.example/a.jpg"],
"recipeIngredient":["1 pound boneless, skinless chicken thighs","2 tablespoons olive oil","3 garlic cloves, minced"],
"recipeInstructions":[{"@type":"HowToStep","text":"Season the chicken."},{"@type":"HowToStep","text":"Brown it for 5 minutes a side."}],
"recipeYield":"4 servings","totalTime":"PT45M","description":"A weeknight braise.&nbsp;Good with rice."}</script></head><body></body></html>`;

const GRAPH = `<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"WebPage","name":"x"},{"@type":["Recipe","NewsArticle"],"name":"Lasagna",
"image":{"@type":"ImageObject","url":"https://img.example/l.jpg"},"recipeIngredient":["500g beef mince","1 onion"],
"recipeInstructions":[{"@type":"HowToSection","name":"Sauce","itemListElement":[{"@type":"HowToStep","text":"Fry the onion."},{"@type":"HowToStep","text":"Add the beef."}]},{"@type":"HowToSection","name":"Assemble","itemListElement":[{"@type":"HowToStep","text":"Layer and bake 40 minutes."}]}],
"recipeYield":["6","6 servings"],"prepTime":"PT20M","cookTime":"PT1H"}]}</script>`;

const TEXT = `<script type="application/ld+json">{"@type":"Recipe","name":"Soup","recipeIngredient":"2 carrots\\n1 onion","recipeInstructions":"1. Chop everything.\\n2. Simmer 20 minutes."}</script>`;

const OG = `<html><head><meta property="og:title" content="Best Butter Chicken | Some Blog"><meta property="og:image" content="https://img.example/b.jpg"><meta name="description" content="Rich and creamy."></head></html>`;

describe('readRecipe', () => {
  it('reads a plain Recipe block', () => {
    const r = readRecipe(NYT);
    expect(r.via).toBe('jsonld');
    expect(r.name).toBe('Paprika Chicken With Tomatoes');
    expect(r.image).toBe('https://img.example/a.jpg');
    expect(r.ingredients).toEqual(['1 pound boneless, skinless chicken thighs', '2 tablespoons olive oil', '3 garlic cloves, minced']);
    expect(r.steps).toEqual(['Season the chicken.', 'Brown it for 5 minutes a side.']);
    expect(r.servings).toBe(4); expect(r.minutes).toBe(45);
    expect(r.description).toBe('A weeknight braise. Good with rice.');
  });
  it('reads @graph, sections, ImageObject and prep + cook time', () => {
    const r = readRecipe(GRAPH);
    expect(r.name).toBe('Lasagna'); expect(r.image).toBe('https://img.example/l.jpg');
    expect(r.steps).toEqual(['Fry the onion.', 'Add the beef.', 'Layer and bake 40 minutes.']);
    expect(r.servings).toBe(6); expect(r.minutes).toBe(80);
  });
  it('splits string ingredients and numbered text steps', () => {
    const r = readRecipe(TEXT);
    expect(r.ingredients).toEqual(['2 carrots', '1 onion']);
    expect(r.steps).toEqual(['Chop everything.', 'Simmer 20 minutes.']);
  });
  it('falls back to Open Graph', () => {
    const r = readRecipe(OG);
    expect(r.via).toBe('og'); expect(r.name).toBe('Best Butter Chicken'); expect(r.image).toBe('https://img.example/b.jpg'); expect(r.ingredients).toEqual([]);
  });
  it('reports nothing on an empty page', () => {
    expect(readRecipe('<html></html>').via).toBe('none');
  });
});

describe('helpers', () => {
  it('parses durations and yields', () => {
    expect(isoMinutes('PT1H30M')).toBe(90); expect(isoMinutes('1 hour 15 mins')).toBe(75); expect(isoMinutes('')).toBeUndefined();
    expect(yieldCount('Serves 8')).toBe(8); expect(yieldCount(['4'])).toBe(4); expect(yieldCount(undefined)).toBeUndefined();
  });
  it('reads a video caption', () => {
    const c = readCaption('Easy garlic butter shrimp!\n1 lb shrimp\n3 cloves garlic\n2 tbsp butter\nMelt the butter and add the garlic.\nCook the shrimp 2 minutes a side.\n#shrimp #dinner');
    expect(c.ingredients).toEqual(['1 lb shrimp', '3 cloves garlic', '2 tbsp butter']);
    expect(c.steps).toEqual(['Melt the butter and add the garlic.', 'Cook the shrimp 2 minutes a side.']);
  });
});

describe('steps and ingredients from the HTML', () => {
  it('fills steps the JSON-LD leaves out, from plugin markup', () => {
    const html = `<script type="application/ld+json">{"@type":"Recipe","name":"Soup","recipeIngredient":["1 onion","2 cups stock"]}</script>
      <div class="wprm-recipe-instructions-container"><ul><li><div class="wprm-recipe-instruction-text">Chop the onion and cook it in butter for 5 minutes.</div></li>
      <li><div class="wprm-recipe-instruction-text">Add the stock and simmer for 20 minutes, then blend.</div></li></ul></div>`;
    const r = readRecipe(html);
    expect(r.ingredients).toEqual(['1 onion', '2 cups stock']);
    expect(r.steps).toEqual(['Chop the onion and cook it in butter for 5 minutes.', 'Add the stock and simmer for 20 minutes, then blend.']);
  });
  it('reads lists under Ingredients and Method headings when there is no structured data', () => {
    const html = `<title>Gran's stew</title><h2>Ingredients</h2><ul><li>1 lb beef</li><li>2 carrots</li></ul>
      <h2>Method</h2><ol><li>1. Brown the beef in batches for 6 minutes.</li><li>Add the carrots and cook for 90 minutes.</li></ol>`;
    const r = readRecipe(html);
    expect(r.ingredients).toEqual(['1 lb beef', '2 carrots']);
    expect(r.steps).toEqual(['Brown the beef in batches for 6 minutes.', 'Add the carrots and cook for 90 minutes.']);
    expect(r.via).toBe('html');
  });
});
