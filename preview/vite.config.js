import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Resolve 'clsx' (and any other Alloy source deps) from the preview's
      // own node_modules so imports in ../../src don't fail.
      'clsx': path.resolve(__dirname, 'node_modules/clsx/dist/clsx.mjs'),
    },
  },
  server: {
    port: 5180,
    fs: {
      allow: ['..'],
    },
  },
});
