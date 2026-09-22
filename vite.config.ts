import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { siteFiles } from './scripts/site-files.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))

const VENDOR_CHUNKS: Record<string, string[]> = {
  react: ['/node_modules/react/', '/node_modules/react-dom/', '/node_modules/scheduler/'],
  mui: ['/node_modules/@mui/', '/node_modules/@emotion/', '/node_modules/stylis'],
  motion: ['/node_modules/framer-motion/', '/node_modules/motion-dom/', '/node_modules/motion-utils/'],
  i18n: ['/node_modules/i18next', '/node_modules/react-i18next/'],
}

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = env.VITE_SITE_URL ?? 'http://localhost:5173/'

  return {
    // GitHub Pages project sites serve from /<repo>/; org sites and custom
    // domains serve from the root. Set BASE_PATH accordingly.
    base: command === 'build' ? (env.BASE_PATH ?? '/') : '/',
    plugins: [react(), siteFiles({ siteUrl, languages: ['en', 'ar'], paths: ['', 'life/'] })],
    build: {
      rollupOptions: {
        // Two pages: the portfolio at / and the Life timeline at /life/.
        input: {
          main: resolve(__dirname, 'index.html'),
          life: resolve(__dirname, 'life/index.html'),
        },
        output: {
          manualChunks(id) {
            const path = id.split('?')[0].replace(/\\/g, '/')
            for (const [chunk, matchers] of Object.entries(VENDOR_CHUNKS)) {
              if (matchers.some((m) => path.includes(m))) return chunk
            }
            return undefined
          },
        },
      },
    },
  }
})
