import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// This is a module app (to be consumed by the host app)
// This microfrontend uses the React framework

const port = 5001

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: port
  },
  plugins: [react()],
  build: {
    outDir: './reactApp',
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
