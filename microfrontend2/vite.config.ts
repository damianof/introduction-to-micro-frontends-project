import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

// This is a module app (to be consumed by the host app)
// This microfrontend uses the Svelte framework

const port = 5002

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: port,
  },
  plugins: [svelte()],
  build: {
    outDir: './microfrontend2',
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
