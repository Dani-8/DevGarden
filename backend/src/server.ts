import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import { initDB, getTopUsers, cleanExpiredSessions } from './db.js';
import { setupAuthRoutes } from './auth.js';

dotenv.config();

const app = express();


app.use(cors({
  origin: [
    "https://dev-garden-35o4.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true
}));

app.use(express.json());

// API routes
setupAuthRoutes(app);

app.get('/api/leaderboard', async (req, res) => {
  try {
    const top = await getTopUsers(20);
    res.json(top);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || 'Failed to fetch leaderboard'
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    time: Date.now()
  });
});

// Support both ESM and CJS path resolution
let currentDirname = '';
try {
  const filename = fileURLToPath(import.meta.url);
  currentDirname = path.dirname(filename);
} catch (e) {
  // CommonJS fallback (dist/server.cjs)
  currentDirname = typeof __dirname !== 'undefined' ? __dirname : '';
}

// Serve static assets from frontend/dist in production
const frontendDistPath = path.resolve(currentDirname, '../../frontend/dist');
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
}

// Initialize backend services
let initialized = false;

async function initializeServer() {
  if (initialized) return;

  await initDB();
  await cleanExpiredSessions();

  initialized = true;
}

// For Vercel serverless
app.use(async (req, res, next) => {
  try {
    await initializeServer();
    next();
  } catch (error) {
    console.error('Server initialization failed:', error);
    res.status(500).json({
      error: 'Server initialization failed'
    });
  }
});

// SPA fallback: only serve index.html for GET requests that accept html and aren't api routes
app.get('*', (req, res, next) => {
  if (req.method === 'GET' && req.accepts('html') && !req.path.startsWith('/api/') && !req.path.startsWith('/auth/')) {
    if (fs.existsSync(path.join(frontendDistPath, 'index.html'))) {
      res.sendFile(path.join(frontendDistPath, 'index.html'));
      return;
    }
  }
  next();
});

// Local development only
if (!process.env.VERCEL) {
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;

  initializeServer()
    .then(() => {
      app.listen(PORT, '0.0.0.0', () => {
        console.log('======================================');
        console.log(`DevGarden backend running on ${PORT}`);
        console.log('======================================');
      });
    })
    .catch((err) => {
      console.error('Startup error:', err);
      process.exit(1);
    });
}

export default app;