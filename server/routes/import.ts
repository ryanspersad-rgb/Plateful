// GET /api/import?url=…  → the recipe on that page, ready to prefill "Link a recipe".
// JSON-LD first; TikTok and YouTube through oEmbed (title + caption); Open Graph as the last resort.
import { Router } from 'express';
import { FetchError, fetchOEmbed, fetchPage } from '../lib/fetch-page';
import { readCaption, readRecipe, type ReadRecipe } from '../lib/recipe-reader';

export interface ImportResult extends ReadRecipe {
  ok: true;
  url: string;
  source: string;
}

const sourceOf = (url: string): string => {
  const h = new URL(url).hostname.replace(/^www\./, '');
  if (/tiktok\.com$/.test(h)) return 'TikTok';
  if (/instagram\.com$/.test(h)) return 'Instagram';
  if (/youtube\.com$|youtu\.be$/.test(h)) return 'YouTube';
  return h;
};

export const importRouter = Router();

importRouter.get('/import', async (req, res) => {
  const raw = String(req.query.url || '').trim();
  if (!raw) { res.status(400).json({ ok: false, code: 'bad_url', message: 'Pass a link as ?url=' }); return; }
  try {
    const page = await fetchPage(raw);
    let r = readRecipe(page.html);
    // video sites: the caption is the recipe
    if (!r.ingredients.length) {
      const oe = await fetchOEmbed(page.url);
      if (oe) {
        const cap = readCaption(oe.title || '');
        r = { ...r, name: r.name || oe.title?.split('\n')[0].slice(0, 80) || '', image: r.image || oe.thumbnail, ingredients: cap.ingredients, steps: cap.steps, via: cap.ingredients.length ? 'jsonld' : r.via };
      }
    }
    const out: ImportResult = { ...r, ok: true, url: page.url, source: sourceOf(page.url) };
    res.json(out);
  } catch (e) {
    if (e instanceof FetchError) { res.status(e.code === 'bad_url' || e.code === 'blocked' ? 400 : 502).json({ ok: false, code: e.code, message: e.message }); return; }
    res.status(500).json({ ok: false, code: 'error', message: 'Could not read that page' });
  }
});
