import { defineConfig, loadEnv } from 'vite'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import react from '@vitejs/plugin-react'

const rewriteMiddleware = () => {
  return {
    name: 'rewrite-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/join' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk.toString(); });
          req.on('end', async () => {
            try {
              const functionPath = path.resolve(process.cwd(), './netlify/functions/join.js');
              const { handler } = await import(pathToFileURL(functionPath).href + '?t=' + Date.now());
              const event = { httpMethod: req.method, body: body, headers: req.headers };
              const result = await handler(event, {});
              
              res.statusCode = result.statusCode || 200;
              if (result.headers) {
                for (const [key, value] of Object.entries(result.headers)) {
                  res.setHeader(key, value);
                }
              }
              res.setHeader('Content-Type', 'application/json');
              res.end(result.body || '{}');
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        const url = req.url?.split('?')[0] || ''

        if (
          url.includes('.')
          || url.startsWith('/@')
          || url.startsWith('/src/')
          || url.startsWith('/node_modules/')
          || url === '/index.html'
        ) {
          return next()
        }

        if (!url.startsWith('/api/')) {
          req.url = '/index.html'
        }

        next()
      })
    }
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  for (const [key, value] of Object.entries(env)) {
    if (process.env[key] === undefined) process.env[key] = value
  }

  return {
    build: {
      target: 'esnext',
      rollupOptions: {
        input: {
          main: 'index.html',
        },
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'esnext',
      },
    },
    plugins: [react(), rewriteMiddleware()],
  }
})
