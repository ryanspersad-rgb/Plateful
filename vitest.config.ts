import { defineConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

// Tests live beside the code in client/src and server; the Vite root (client/) would hide the server ones.
export default defineConfig({
  resolve: { alias: { '@': path.resolve(here, 'client', 'src'), '@shared': path.resolve(here, 'shared') } },
  test: { include: ['client/src/**/*.test.ts', 'server/**/*.test.ts'], environment: 'node' },
});
