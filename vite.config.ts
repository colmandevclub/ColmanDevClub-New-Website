import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { API_CONFIG } from './src/constants/api.ts'
import { DEVELOPMENT } from './src/constants/development.ts'
import { LOCALE } from './src/constants/locale.ts'
import { SITE } from './src/constants/site.ts'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'site-html-constants',
      transformIndexHtml: {
        order: 'pre',
        handler(html) {
          return html
            .replaceAll('%SITE_LANGUAGE%', LOCALE.LANGUAGE)
            .replaceAll('%SITE_DIRECTION%', LOCALE.DIRECTION)
            .replaceAll('%SITE_FAVICON%', SITE.FAVICON_PATH)
            .replaceAll('%SITE_TITLE%', SITE.TITLE)
            .replaceAll('%SITE_ROOT_ID%', SITE.ROOT_ELEMENT_ID)
        },
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      [API_CONFIG.PROXY_PREFIX]: {
        target: DEVELOPMENT.API_TARGET,
        changeOrigin: true,
      },
    },
  },
})
