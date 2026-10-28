// Plateful API + static host. `pnpm dev:server` runs it with tsx on :3001 (Vite proxies /api there);
// `pnpm start` serves dist/public and the API from one port in production.
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { importRouter } from './routes/import';
import { instacartRouter } from './routes/instacart';

const here = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '64kb' }));

// The beta site on GitHub Pages calls this API from another origin, so allow it (and local dev) by name.
// More origins: ALLOWED_ORIGINS="https://plateful.ca,https://www.plateful.ca".
const ORIGINS = new Set(['https://ryanspersad-rgb.github.io', 'http://localhost:5173', 'http://localhost:4173', ...(process.env.ALLOWED_ORIGINS || '').split(',').map((o) => o.trim()).filter(Boolean)]);
app.use('/api', (req, res, next) => {
  const o = req.headers.origin;
  if (o && ORIGINS.has(o)) {
    res.setHeader('Access-Control-Allow-Origin', o);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'content-type, accept');
    res.setHeader('Access-Control-Max-Age', '86400');
  }
  if (req.method === 'OPTIONS') { res.sendStatus(o && ORIGINS.has(o) ? 204 : 403); return; }
  next();
});

app.get('/api/health', (_req, res) => { res.json({ ok: true, instacart: !!process.env.INSTACART_API_KEY, at: new Date().toISOString() }); });
app.use('/api', importRouter);
app.use('/api', instacartRouter);

if (process.env.NODE_ENV === 'production') {
  const pub = path.resolve(here, '..', 'dist', 'public');
  app.use(express.static(pub, { maxAge: '1h' }));
  app.get('*', (_req, res) => { res.sendFile(path.join(pub, 'index.html')); });
}

const port = Number(process.env.PORT || 3001);
app.listen(port, () => { console.log(`Plateful API on :${port}${process.env.INSTACART_API_KEY ? ' · Instacart connected' : ' · Instacart: no key (search links)'}`); });
