import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

function inventoryAdminPlugin(env) {
  return {
    name: 'inventory-admin',
    configureServer(server) {

      // Dev proxy for Faraday — mirrors /api/enrich.js serverless function in production.
      // Key stays server-side (env vars) and is never bundled into client JS.
      server.middlewares.use('/api/enrich', async (req, res) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end(); return; }
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
          try {
            const API_KEY    = env.FARADAY_API_KEY;
            const PROJECT_ID = env.FARADAY_PROJECT_ID;
            const upstream = await fetch(
              `https://api.buy.faraday.ai/v1/projects/${PROJECT_ID}/append`,
              {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${API_KEY}`,
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                },
                body,
              }
            );
            const data = await upstream.json();
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = upstream.status;
            res.end(JSON.stringify(data));
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });

      server.middlewares.use('/api/save-shopper', (req, res) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end(); return; }
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
          try {
            const shopper = JSON.parse(body);
            const shoppersPath = path.resolve(__dirname, 'src/data/shoppers.js');
            let content = fs.readFileSync(shoppersPath, 'utf-8');
            const entry = `  ${JSON.stringify(shopper)},\n`;
            const closingIdx = content.lastIndexOf('];');
            content = content.slice(0, closingIdx) + entry + content.slice(closingIdx);
            fs.writeFileSync(shoppersPath, content, 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });

      server.middlewares.use('/api/add-vehicle', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method not allowed');
          return;
        }

        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
          try {
            const { importLine, entryCode } = JSON.parse(body);
            const inventoryPath = path.resolve(__dirname, 'src/data/inventory.js');
            let content = fs.readFileSync(inventoryPath, 'utf-8');

            // Insert new import after the last existing import line
            const lines = content.split('\n');
            let lastImportIdx = -1;
            for (let i = 0; i < lines.length; i++) {
              if (lines[i].startsWith('import ')) lastImportIdx = i;
            }
            if (lastImportIdx >= 0) {
              lines.splice(lastImportIdx + 1, 0, importLine);
            } else {
              lines.unshift(importLine);
            }
            content = lines.join('\n');

            // Insert new entry before the closing ];
            const closingIdx = content.lastIndexOf('];');
            content = content.slice(0, closingIdx) + entryCode + '\n' + content.slice(closingIdx);

            fs.writeFileSync(inventoryPath, content, 'utf-8');

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
          } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // Load ALL env vars (not just VITE_*) so the dev middleware can use FARADAY_API_KEY server-side
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), tailwindcss(), inventoryAdminPlugin(env)],
  };
})
