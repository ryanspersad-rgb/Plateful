import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

// the build stamp shown at the foot of Profile: short commit + build date, so a tester can say which build they are on
function buildStamp(): string {
  let sha = "dev";
  try { sha = execSync("git rev-parse --short HEAD", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim(); } catch { /* no git */ }
  const d = new Date();
  const day = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
  return `${sha} · ${day}`;
}

const here = path.dirname(fileURLToPath(import.meta.url));

// Vite serves the client from client/ and builds to dist/public (the Express server
// in server/, when it exists, serves that folder in production).
export default defineConfig({
  root: path.resolve(here, "client"),
  // relative asset paths: the same build runs at the site root (pnpm start) and under /Plateful/ on GitHub Pages
  base: "./",
  plugins: [react(), tailwindcss()],
  define: { __BUILD__: JSON.stringify(buildStamp()) },
  resolve: {
    alias: {
      "@": path.resolve(here, "client", "src"),
      "@shared": path.resolve(here, "shared"),
    },
  },
  build: {
    outDir: path.resolve(here, "dist", "public"),
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    // the API (server/index.ts, `pnpm dev:server`) answers on :3001 during development
    proxy: { '/api': 'http://localhost:3001' },
  },
});
