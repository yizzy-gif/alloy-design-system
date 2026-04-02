import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: '/alloy-design-system/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Resolve shared deps from preview's own node_modules so imports in
      // ../../src and ../../specimens don't fail when built from here.
      'clsx': path.resolve(__dirname, 'node_modules/clsx/dist/clsx.mjs'),
      'react/jsx-runtime': path.resolve(__dirname, 'node_modules/react/jsx-runtime.js'),
      'react/jsx-dev-runtime': path.resolve(__dirname, 'node_modules/react/jsx-dev-runtime.js'),
      'react': path.resolve(__dirname, 'node_modules/react/index.js'),
    },
  },
  server: {
    port: 5180,
    fs: {
      allow: ['..'],
    },
  },
});
