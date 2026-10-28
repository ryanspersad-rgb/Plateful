import { Capacitor } from '@capacitor/core';
import { readCaption, readRecipe } from '@shared/recipe-reader';

// The Plateful API (server/). In the standalone HTML build there is no server: every call fails fast and the app carries on.
export interface ImportResult {
  ok: true; url: string; source: string; name: string; image?: string; ingredients: string[]; steps: string[]; servings?: number; minutes?: number; description?: string; via: 'jsonld' | 'html' | 'og' | 'none';
}
export interface ApiFail { ok: false; code: string; message: string; url?: string }

const base = (): string => (import.meta.env.VITE_API_BASE as string | undefined) || '';
const hasServer = (): boolean => typeof window !== 'undefined' && window.location.protocol !== 'file:';

const sourceOf = (url: string): string => {
  const h = new URL(url).hostname.replace(/^www\./, '');
  if (/tiktok\.com$/.test(h)) return 'TikTok';
  if (/instagram\.com$/.test(h)) return 'Instagram';
  if (/youtube\.com$|youtu\.be$/.test(h)) return 'YouTube';
  return h;
};

/**
 * In the phone apps, fetch() is native (CapacitorHttp): the page is read on the phone, from the shopper's own connection,
 * so sites that block servers (Allrecipes answers the server 403) still answer. Same reader as the server.
 */
async function readOnPhone(url: string): Promise<ImportResult | null> {
  try {
    const res = await fetch(url, { headers: { accept: 'text/html,application/xhtml+xml', 'accept-language': 'en-CA,en;q=0.9' } });
    if (!res.ok) return null;
    const html = await res.text();
    const final = res.url || url;
    let r = readRecipe(html);
    if (!r.ingredients.length && /tiktok\.com|youtube\.com|youtu\.be/i.test(final)) {
      const ep = /tiktok/i.test(final) ? `https://www.tiktok.com/oembed?url=${encodeURIComponent(final)}` : `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(final)}`;
      const oe = await fetch(ep).then((x) => (x.ok ? (x.json() as Promise<{ title?: string; thumbnail_url?: string }>) : null)).catch(() => null);
      if (oe?.title) { const cap = readCaption(oe.title); r = { ...r, name: r.name || oe.title.split('\n')[0].slice(0, 80), image: r.image || oe.thumbnail_url, ingredients: cap.ingredients, steps: cap.steps }; }
    }
    if (!r.ingredients.length && !r.steps.length) return null;
    return { ...r, ok: true, url: final, source: sourceOf(final) };
  } catch {
    return null;
  }
}

export async function readRecipePage(url: string): Promise<ImportResult | ApiFail> {
  if (Capacitor.isNativePlatform()) { const r = await readOnPhone(url); if (r) return r; }
  if (!hasServer()) return { ok: false, code: 'no_server', message: 'The page reader needs the Plateful server' };
  try {
    const r = await fetch(`${base()}/api/import?url=${encodeURIComponent(url)}`, { headers: { accept: 'application/json' } });
    const j = (await r.json()) as ImportResult | ApiFail;
    return j;
  } catch {
    return { ok: false, code: 'no_server', message: 'The page reader needs the Plateful server' };
  }
}

export async function instacartList(title: string, items: { name: string; quantity?: number; unit?: string; display?: string }[]): Promise<{ ok: boolean; url?: string; code?: string; message?: string }> {
  if (!hasServer()) return { ok: false, code: 'no_server' };
  try {
    const r = await fetch(`${base()}/api/instacart/list`, { method: 'POST', headers: { 'content-type': 'application/json', accept: 'application/json' }, body: JSON.stringify({ title, items, linkback: window.location.origin }) });
    return (await r.json()) as { ok: boolean; url?: string; code?: string; message?: string };
  } catch {
    return { ok: false, code: 'no_server' };
  }
}

/** The free API host sleeps when idle; a ping on app load wakes it before the shopper needs "Read the page". */
export function wakeApi(): void {
  if (!hasServer() || !base()) return;
  fetch(`${base()}/api/health`).catch(() => undefined);
}
