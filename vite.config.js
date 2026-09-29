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
        bio: resolve(__dirname, 'bio.html'),
        game: resolve(__dirname, 'game.html'),
        speaking: resolve(__dirname, 'speaking.html'),
        network: resolve(__dirname, 'network.html'),
        community: resolve(__dirname, 'community.html'),
        speakingThanks: resolve(__dirname, 'speaking-thanks.html'),
        '404': resolve(__dirname, '404.html'),
      },
    },
  },
});
