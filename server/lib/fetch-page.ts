// Fetches a public web page for the recipe reader, carefully: http(s) only, no private or local addresses,
// a short timeout, a size cap, and a browser-like User-Agent (recipe sites serve their JSON-LD to browsers).
import dns from 'node:dns/promises';
import net from 'node:net';

const MAX_BYTES = 3 * 1024 * 1024;
const TIMEOUT_MS = 9000;
const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1 Plateful/1.0 (+https://plateful.ca)';

export class FetchError extends Error {
  constructor(message: string, public code: 'bad_url' | 'blocked' | 'timeout' | 'http' | 'too_big' | 'network') { super(message); }
}

function isPrivate(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split('.').map(Number);
    return a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127);
  }
  const v6 = ip.toLowerCase();
  return v6 === '::1' || v6 === '::' || v6.startsWith('fc') || v6.startsWith('fd') || v6.startsWith('fe80') || v6.startsWith('::ffff:');
}

/** Rejects anything that is not a public http(s) address, unless PLATEFUL_ALLOW_LOCAL=1 (tests). */
export async function checkUrl(raw: string): Promise<URL> {
  let u: URL;
  try { u = new URL(raw.includes('://') ? raw : `https://${raw}`); } catch { throw new FetchError('That is not a web address', 'bad_url'); }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') throw new FetchError('Only http and https links', 'bad_url');
  if (u.username || u.password) throw new FetchError('Links with credentials are not read', 'bad_url');
  if (process.env.PLATEFUL_ALLOW_LOCAL === '1') return u;
  const host = u.hostname.toLowerCase();
  if (host === 'localhost' || host.endsWith('.local') || host.endsWith('.internal') || net.isIP(host) && isPrivate(host)) throw new FetchError('Local addresses are not read', 'blocked');
  try {
    const addrs = await dns.lookup(host, { all: true });
    if (!addrs.length || addrs.some((a) => isPrivate(a.address))) throw new FetchError('That address is not reachable from Plateful', 'blocked');
  } catch (e) {
    if (e instanceof FetchError) throw e;
    throw new FetchError('That site could not be found', 'network');
  }
  return u;
}

/** The page's HTML (first 3 MB), following redirects to public addresses only. */
export async function fetchPage(raw: string): Promise<{ html: string; url: string }> {
  let u = await checkUrl(raw);
  for (let hop = 0; hop < 5; hop++) {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), TIMEOUT_MS);
    let res: Response;
    try {
      res = await fetch(u, { redirect: 'manual', signal: ctl.signal, headers: { 'user-agent': UA, accept: 'text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.5', 'accept-language': 'en-CA,en;q=0.9' } });
    } catch (e) {
      clearTimeout(t);
      throw new FetchError((e as Error).name === 'AbortError' ? 'That site took too long to answer' : 'That site could not be reached', (e as Error).name === 'AbortError' ? 'timeout' : 'network');
    }
    if ([301, 302, 303, 307, 308].includes(res.status)) {
      clearTimeout(t);
      const loc = res.headers.get('location');
      if (!loc) throw new FetchError('Broken redirect', 'http');
      u = await checkUrl(new URL(loc, u).toString());
      continue;
    }
    if (!res.ok) { clearTimeout(t); throw new FetchError(`That page answered ${res.status}`, 'http'); }
    const len = Number(res.headers.get('content-length') || 0);
    if (len > MAX_BYTES) { clearTimeout(t); throw new FetchError('That page is too large to read', 'too_big'); }
    const reader = res.body?.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    if (reader) {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > MAX_BYTES) { void reader.cancel(); break; }
        chunks.push(value);
      }
    }
    clearTimeout(t);
    const html = Buffer.concat(chunks).toString('utf8');
    return { html, url: u.toString() };
  }
  throw new FetchError('Too many redirects', 'http');
}

/** oEmbed for TikTok and YouTube: the title and caption without scraping the app shell. */
export async function fetchOEmbed(pageUrl: string): Promise<{ title?: string; thumbnail?: string; author?: string } | null> {
  const u = pageUrl.toLowerCase();
  const endpoint = u.includes('tiktok.com') ? `https://www.tiktok.com/oembed?url=${encodeURIComponent(pageUrl)}`
    : /youtube\.com|youtu\.be/.test(u) ? `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(pageUrl)}` : null;
  if (!endpoint) return null;
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(endpoint, { signal: ctl.signal, headers: { 'user-agent': UA, accept: 'application/json' } });
    if (!res.ok) return null;
    const j = (await res.json()) as Record<string, unknown>;
    return { title: typeof j.title === 'string' ? j.title : undefined, thumbnail: typeof j.thumbnail_url === 'string' ? j.thumbnail_url : undefined, author: typeof j.author_name === 'string' ? j.author_name : undefined };
  } catch { return null; } finally { clearTimeout(t); }
}
