import express from 'express';
import http from 'http';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import custom server modules
import { initDB, getTopUsers, cleanExpiredSessions } from './db.js';
import { setupAuthRoutes } from './auth.js';

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

// Parse JSON bodies
app.use(express.json());

// Setup REST API routes
setupAuthRoutes(app);

// Leaderboard REST endpoint
app.get('/api/leaderboard', async (req, res) => {
  try {
    const top = await getTopUsers(20);
    res.json(top);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch leaderboard' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: Date.now() });
});

async function startServer() {
  // Initialize DB and cleanup
  await initDB();
  await cleanExpiredSessions();

  // Vite middleware for asset bundling / frontend serving
  if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    console.log('Running in DEVELOPMENT mode. Mounting Vite middleware...');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
      root: path.resolve(__dirname, '../frontend'),
    });
    app.use(vite.middlewares);
  } else {
    console.log('Running in PRODUCTION mode or Vercel. Serving static assets...');
    const distPath = path.resolve(__dirname, '../frontend/dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Only start listening if NOT running under Vercel Serverless
  if (!process.env.VERCEL) {
    const server = http.createServer(app);
    server.listen(PORT, HOST, () => {
      console.log(`===================================================`);
      console.log(`DevGarden full-stack server running successfully!`);
      console.log(`URL: http://localhost:${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`===================================================`);
    });
  }
}

// Start the server (handles local development / container runtime)
if (!process.env.VERCEL) {
  startServer().catch(err => {
    console.error('Error in startServer:', err);
  });
}

export default app;
