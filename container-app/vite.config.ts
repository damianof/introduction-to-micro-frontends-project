import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// This is the host app (container):

const port = 4173

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: port,
    open: `http://localhost:${port}`,
  },
  plugins: [vue()],
  build: {
    cssCodeSplit: false,
    sourcemap: false,
    minify: false,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
})
