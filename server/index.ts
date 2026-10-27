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
