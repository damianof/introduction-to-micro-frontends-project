/// <reference types="vite/client" />
import { defineConfig } from 'vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  envDir: './src/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'postbox',
      fileName: (format) => `postbox.${format}.js`,
    },
    rollupOptions: {
      external: [],
      output: {
        // Provide global variables to use in the UMD build // Add external deps here
        globals: {},
      },
    },
  },
})
