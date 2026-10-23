import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // JSON body parser with generous limit for images/visuals
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  const contentFilePath = path.resolve(__dirname, 'src/data/persistedContent.json');

  // API Route: Save edited content to disk
  app.post('/api/save-content', (req, res) => {
    try {
      const payload = req.body;
      if (!payload) {
        return res.status(400).json({ error: 'Payload is required' });
      }

      let currentData: Record<string, any> = {};
      if (fs.existsSync(contentFilePath)) {
        try {
          const raw = fs.readFileSync(contentFilePath, 'utf-8');
          currentData = JSON.parse(raw);
        } catch {
          currentData = {};
        }
      }

      // Merge payload
      const updatedData = {
        ...currentData,
        ...payload,
      };

      fs.writeFileSync(contentFilePath, JSON.stringify(updatedData, null, 2), 'utf-8');
      return res.json({ success: true, savedAt: new Date().toISOString() });
    } catch (err: any) {
      console.error('[API Error saving content]:', err);
      return res.status(500).json({ error: err.message || 'Failed to save content' });
    }
  });

  // API Route: Get saved content
  app.get('/api/get-content', (_req, res) => {
    try {
      if (fs.existsSync(contentFilePath)) {
        const raw = fs.readFileSync(contentFilePath, 'utf-8');
        return res.json(JSON.parse(raw));
      }
      return res.json({});
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Failed to read content' });
    }
  });

  // In development, mount Vite dev server middlewares
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    // In production mode (if run via node server.ts), serve static dist
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Drapevangelist Engine] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[Server Start Error]:', err);
  process.exit(1);
});
