// POST /api/instacart/list  { title, items: [{ name, quantity?, unit? }] }  → { ok, url }
// Instacart Developer Platform "Create shopping list page": the shopper's list becomes a shoppable Instacart page.
// The API key lives on the server (INSTACART_API_KEY); without one the route returns a search link so the app still works.
import { Router } from 'express';
import { z } from 'zod';

const Body = z.object({
  title: z.string().min(1).max(120),
  items: z.array(z.object({ name: z.string().min(1).max(80), quantity: z.number().positive().max(99).optional(), unit: z.string().max(20).optional(), display: z.string().max(120).optional() })).min(1).max(100),
  linkback: z.string().url().optional(),
});

// Units Instacart accepts for a line item; anything else is dropped and the item is "each".
const UNITS = new Set(['each', 'bunch', 'can', 'cup', 'cups', 'fl oz', 'g', 'gallon', 'kg', 'lb', 'lbs', 'oz', 'package', 'pint', 'quart', 'tablespoon', 'teaspoon', 'ml', 'l', 'large', 'medium', 'small']);

export const instacartRouter = Router();

instacartRouter.post('/instacart/list', async (req, res) => {
  const parsed = Body.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ ok: false, code: 'bad_body', message: 'A title and at least one item are needed' }); return; }
  const { title, items, linkback } = parsed.data;
  const key = process.env.INSTACART_API_KEY;
  if (!key) {
    // no key yet: a search for the first item keeps the button useful
    res.json({ ok: false, code: 'no_key', url: `https://www.instacart.ca/store/s?k=${encodeURIComponent(items[0].name)}`, message: 'Instacart is not connected on this server yet' });
    return;
  }
  const host = process.env.INSTACART_ENV === 'production' ? 'https://connect.instacart.com' : 'https://connect.dev.instacart.tools';
  const line_items = items.map((i) => ({
    name: i.name,
    display_text: i.display || i.name,
    line_item_measurements: [{ quantity: i.quantity ?? 1, unit: i.unit && UNITS.has(i.unit.toLowerCase()) ? i.unit.toLowerCase() : 'each' }],
  }));
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), 10000);
  try {
    const r = await fetch(`${host}/idp/v1/products/products_link`, {
      method: 'POST', signal: ctl.signal,
      headers: { authorization: `Bearer ${key}`, accept: 'application/json', 'content-type': 'application/json' },
      body: JSON.stringify({ title, link_type: 'shopping_list', line_items, landing_page_configuration: linkback ? { partner_linkback_url: linkback } : undefined }),
    });
    const j = (await r.json().catch(() => ({}))) as { products_link_url?: string; error?: unknown };
    if (!r.ok || !j.products_link_url) { res.status(502).json({ ok: false, code: 'instacart', message: `Instacart answered ${r.status}` }); return; }
    res.json({ ok: true, url: j.products_link_url });
  } catch {
    res.status(502).json({ ok: false, code: 'network', message: 'Instacart could not be reached' });
  } finally { clearTimeout(t); }
});
