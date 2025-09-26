import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  // …other config…
  server: {
    // Serve ./models as /models
    fs: {
      // Allow serving files from one level up if needed
      //allow: ['..'],
    },
    // Optional: custom middleware to set correct MIME types
    //middlewareMode: false,
  },
  resolve: {
    alias: {
      //'@models': path.resolve(__dirname, 'src/models'), // optional alias
    },
  },
});