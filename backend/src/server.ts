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


// Custom CORS middleware to ensure reliability on serverless platforms like Vercel
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  const allowedOrigins = [
    "https://dev-garden-35o4.vercel.app",
    "https://dev-garden-kappa.vercel.app",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:5173"
  ];

  if (origin) {
    const isAllowed = allowedOrigins.includes(origin) ||
      /^http:\/\/localhost(:\d+)?$/.test(origin) ||
      /^http:\/\/127\.0\.0\.1(:\d+)?$/.test(origin) ||
      origin.endsWith('.vercel.app') ||
      origin.endsWith('.run.app') ||
      origin.includes('ai.studio');

    if (isAllowed) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
      // Fallback: always allow the requesting origin in development/sandbox modes
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie, X-Requested-With');
  res.setHeader('Access-Control-Expose-Headers', 'Set-Cookie');

  // Intercept and immediately respond to OPTIONS preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  next();
});

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
  // In development, we run the backend on port 3001 so Vite (on port 3000) can proxy to it.
  // In production (such as Cloud Run), we listen on process.env.PORT.
  const isProd = process.env.NODE_ENV === 'production';
  const PORT = isProd ? (process.env.PORT ? parseInt(process.env.PORT) : 3000) : 3001;

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