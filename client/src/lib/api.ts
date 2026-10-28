// The Plateful API (server/). In the standalone HTML build there is no server: every call fails fast and the app carries on.
export interface ImportResult {
  ok: true; url: string; source: string; name: string; image?: string; ingredients: string[]; steps: string[]; servings?: number; minutes?: number; description?: string; via: 'jsonld' | 'og' | 'none';
}
export interface ApiFail { ok: false; code: string; message: string; url?: string }

const base = (): string => (import.meta.env.VITE_API_BASE as string | undefined) || '';
const hasServer = (): boolean => typeof window !== 'undefined' && window.location.protocol !== 'file:';

export async function readRecipePage(url: string): Promise<ImportResult | ApiFail> {
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
