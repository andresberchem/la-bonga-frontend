import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        pos: resolve(__dirname, 'pos.html'),
        meseros: resolve(__dirname, 'meseros.html'),
      },
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});