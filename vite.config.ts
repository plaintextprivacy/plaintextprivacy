import { defineConfig, mergeConfig } from 'vitest/config'
import { defineConfig as defineViteConfig } from 'vite'
import react                   from '@vitejs/plugin-react-swc'
import { cloudflare }          from '@cloudflare/vite-plugin'
import { fileURLToPath, URL }  from 'node:url'
import { readFileSync }        from 'node:fs'
import { join, dirname }       from 'node:path'
import Sitemap                 from 'vite-plugin-sitemap'

// ─── Dynamic routes from index.json ──────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url))

const indexJson = JSON.parse(
    readFileSync(join(__dirname, 'src/data/index.json'), 'utf-8')
)

const guideRoutes: string[] = indexJson.categories
    .flatMap((cat: { guides: Array<{ slug: string; status: string }> }) =>
        cat.guides
            .filter((g) => g.status === 'published')
            .map((g) => `/guides/${g.slug}`)
    )

const allRoutes: string[] = [
  '/',
  '/guides',
  '/resources',
  '/risk-profile',
  '/help',
  '/about',
  '/privacy',
  ...guideRoutes,
]

// ─── Config ───────────────────────────────────────────────────────────────────

const viteConfig = defineViteConfig({
  plugins: [
    react(),
    cloudflare(),
    Sitemap({
      hostname:          'https://plaintextprivacy.org',
      dynamicRoutes:     allRoutes,
      generateRobotsTxt: false
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir:    'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react:  ['react', 'react-dom', 'react-router-dom'],
          vendor: ['lucide-react', 'fuse.js'],
        },
      },
    },
  },
})

export default mergeConfig(viteConfig, defineConfig({
  test: {
    environment: 'happy-dom',
    globals:     true,
    setupFiles:  ['./src/test/setup.ts'],
    include:     ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include:  ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/main.tsx',
        'src/test/**',
        'src/**/*.d.ts',
      ],
    },
  },
}))