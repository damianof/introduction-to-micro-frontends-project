import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// This is a module app (to be consumed by the host app)
// This microfrontend uses the Vue framework

const port = 5003

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: port
  },
  plugins: [
    vue()
  ],
  build: {
    outDir: './microfrontend3',
    cssCodeSplit: false,
    sourcemap: false,
    minify: false,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
})
