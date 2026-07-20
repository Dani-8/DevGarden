import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import { initDB, getTopUsers, cleanExpiredSessions } from './db.js';
import { setupAuthRoutes } from './auth.js';
import { generateChallenge, verifyChallenge } from './challenge.js';

dotenv.config();

const app = express();

// Initialize backend services
let initialized = false;
async function initializeServer() {
  if (initialized) return;
  await initDB();
  await cleanExpiredSessions();
  initialized = true;
}

// 1. Run Initialization FIRST for Vercel serverless
app.use(async (req, res, next) => {
  try {
    await initializeServer();
    next();
  } catch (error) {
    console.error('Server initialization failed:', error);
    res.status(500).json({ error: 'Server initialization failed' });
  }
});

  // 2. Dynamic CORS middleware
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    
    let isAllowed = false;
    if (origin) {
      if (
        origin.startsWith('http://localhost:') ||
        origin.startsWith('http://127.0.0.1:') ||
        origin.endsWith('.run.app') ||
        origin.endsWith('.vercel.app') ||
        origin === 'https://dev-garden-35o4.vercel.app' ||
        origin === 'https://dev-garden-kappa.vercel.app'
      ) {
        isAllowed = true;
      }
    }

    if (isAllowed && origin) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie, X-Requested-With, X-Session-ID, x-session-id');
  res.setHeader('Access-Control-Expose-Headers', 'Set-Cookie');

  // Intercept and immediately respond to OPTIONS preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end(); 
  }

  next();
});

app.use(express.json());

// Shared community watering score state
let communityWaterScore = 25;

// 3. API routes
setupAuthRoutes(app);

app.get('/api/challenge/generate', async (req, res) => {
  try {
    const field = String(req.query.field || 'general');
    const challenge = await generateChallenge(field);
    res.json(challenge);
  } catch (error: any) {
    console.error('Challenge generation error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate challenge' });
  }
});

app.post('/api/challenge/verify', async (req, res) => {
  try {
    const { field, question, answer } = req.body;
    if (!field || !question || !answer) {
      return res.status(400).json({ error: 'Missing field, question, or answer' });
    }
    const result = await verifyChallenge(field, question, answer);
    res.json(result);
  } catch (error: any) {
    console.error('Challenge verification error:', error);
    res.status(500).json({ error: error.message || 'Failed to verify challenge' });
  }
});

app.get('/api/star-tree', (req, res) => {
  res.json({ waterScore: communityWaterScore });
});

app.post('/api/star-tree/water', (req, res) => {
  const { increment } = req.body;
  const inc = Math.min(Math.max(Number(increment || 1), 1), 10);
  communityWaterScore += inc;
  res.json({ waterScore: communityWaterScore });
});

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
  currentDirname = typeof __dirname !== 'undefined' ? __dirname : '';
}

// Serve static assets from frontend/dist in production
const frontendDistPath = path.resolve(currentDirname, '../../frontend/dist');
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
}

// SPA fallback
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