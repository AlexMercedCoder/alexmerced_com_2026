import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        professional: resolve(__dirname, 'professional.html'),
        personal: resolve(__dirname, 'personal.html'),
      },
    },
  },
});
