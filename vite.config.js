import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'

  return {
    // Project root directory
    root: './',

    plugins: [vue(), tailwindcss()],

    // Public assets folder
    publicDir: 'public',

    // Persist Vite cache between runs (good for CI caching)
    cacheDir: 'node_modules/.vite',

    server: {
      port: 5252,
      open: false,
      host: true,
    },

    build: {
      outDir: 'dist',
      sourcemap: !isProd, // dev: true, prod: false
      minify: isProd ? 'esbuild' : false,
      cssCodeSplit: true,
      brotliSize: false, // speed up builds
      assetsInlineLimit: 4096, // 4kb
      manifest: true, // helpful for simple server integrations
      emptyOutDir: true,

      rollupOptions: {
        output: {
          entryFileNames: 'assets/js/[name]-[hash].js',
          chunkFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
    },
  }
})
