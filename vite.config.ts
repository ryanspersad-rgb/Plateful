import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

// Vite serves the client from client/ and builds to dist/public (the Express server
// in server/, when it exists, serves that folder in production).
export default defineConfig({
  root: path.resolve(here, "client"),
  plugins: [react(), tailwindcss()],
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
  },
});
