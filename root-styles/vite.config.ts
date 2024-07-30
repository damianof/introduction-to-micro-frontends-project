// file: ntroduction-to-micro-frontends-project/root-styles/vite.config.ts
import { defineConfig } from 'vite'
import path from 'path'

// This is the project that will serve the shared CSS style across all other microfrontends
const port = 5004

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: port,
  },
  plugins: [],
  build: {
    cssCodeSplit: false,
    sourcemap: false,
    minify: false,
    rollupOptions: {
      input: path.resolve(__dirname, `src/index.ts`),
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
})
