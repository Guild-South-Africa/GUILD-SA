import { defineConfig, loadEnv } from 'vite'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

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
              // Dynamically import the netlify function for local dev
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

        if (req.url.startsWith('/join/') && !req.url.includes('.')) {
          req.url = '/join.html'
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
          about: 'about.html',
          pipeline: 'pipeline.html',
          campus: 'campus.html',
          events: 'events.html',
          partners: 'partners.html',
          join: 'join.html',
          privacy: 'privacy.html',
        },
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'esnext',
      },
    },
    plugins: [rewriteMiddleware()],
  }
})
