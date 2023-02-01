import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/login': {
        target: 'http://qreach.adamradvan.eu/',
        changeOrigin: true,
      },
      '/verify': {
        target: 'http://qreach.adamradvan.eu/',
        changeOrigin: true,
      },
      '/sign-up': {
        target: 'http://qreach.adamradvan.eu/',
        changeOrigin: true,
      },
      '/tenants': {
        target: 'http://qreach.adamradvan.eu/',
        changeOrigin: true,
      }
    }
  }
})
