import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: 'esnext',
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
        pipeline: 'pipeline.html',
        campus: 'campus.html',
        events: 'events.html',
        partners: 'partners.html',
        join: 'join.html',
      },
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },
  },
})
