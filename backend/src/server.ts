import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';

import { initDB, getTopUsers, cleanExpiredSessions } from './db.js';
import { setupAuthRoutes } from './auth.js';

dotenv.config();

const app = express();


app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-frontend-vercel-domain.vercel.app"
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

// Local development only
if (!process.env.VERCEL) {
  const PORT = 3000;

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