import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        professional: resolve(__dirname, 'professional.html'),
        personal: resolve(__dirname, 'personal.html'),
        press_kit: resolve(__dirname, 'press_kit.html'),
        '404': resolve(__dirname, '404.html'),
      },
    },
  },
});
