import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' // 👈 New import
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Project root directory
  root: './',

  plugins: [
    vue(), // 👈 Add Vue plugin here
    tailwindcss(),
  ],

  build: {
    outDir: 'dist',
    // We remove rollupOptions.input because Vue Router
    // handles pages dynamically from a single index.html entry.
  },

  publicDir: 'public',
})
