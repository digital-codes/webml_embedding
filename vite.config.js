import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  // …other config…
  server: {
 mimeTypes: {
      // ensure .mjs is served correctly
      'application/javascript': ['mjs']
    },
  },
});