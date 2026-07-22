import { Router } from 'express';
import { generateChallenge, verifyChallenge } from '../services/aiChallenge.js';
import { getSessionIdFromRequest } from '../services/authService.js';
import {
  getTopUsers,
  getDecorations,
  saveDecoration,
  deleteDecoration,
  getSessionUser,
  getStarTreeScore,
  waterStarTreeScore,
} from '../db/index.js';

export const apiRouter = Router();

// Challenge Endpoints
apiRouter.get('/api/challenge/generate', async (req, res) => {
  try {
    const field = String(req.query.field || 'general');
    const challenge = await generateChallenge(field);
    res.json(challenge);
  } catch (error: any) {
    console.error('Challenge generation error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate challenge' });
  }
});

apiRouter.post('/api/challenge/verify', async (req, res) => {
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

// Star Tree Endpoints
apiRouter.get('/api/star-tree', (req, res) => {
  res.json({ waterScore: getStarTreeScore() });
});

apiRouter.post('/api/star-tree/water', (req, res) => {
  const { increment } = req.body;
  const score = waterStarTreeScore(increment);
  res.json({ waterScore: score });
});

// Leaderboard Endpoint
apiRouter.get('/api/leaderboard', async (req, res) => {
  try {
    const top = await getTopUsers(20);
    res.json(top);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || 'Failed to fetch leaderboard',
    });
  }
});

// Decorations Endpoints
apiRouter.get('/api/decorations', async (req, res) => {
  try {
    const list = await getDecorations();
    res.json(list);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch decorations' });
  }
});

apiRouter.post('/api/decorations', async (req, res) => {
  try {
    const sessionId = getSessionIdFromRequest(req);
    if (!sessionId) {
      return res.status(401).json({ error: 'Unauthorized: No session token provided' });
    }
    const user = await getSessionUser(sessionId);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: Invalid session' });
    }

    const { id, item_type, x, y } = req.body;
    if (!id || !item_type || typeof x !== 'number' || typeof y !== 'number') {
      return res.status(400).json({ error: 'Missing required decoration fields (id, item_type, x, y)' });
    }

    const decor = {
      id,
      item_type,
      x: Math.round(x),
      y: Math.round(y),
      placed_by: user.github_id,
      placed_by_username: user.username,
      created_at: Date.now(),
    };

    await saveDecoration(decor);
    res.json({ success: true, decoration: decor });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to save decoration' });
  }
});

apiRouter.delete('/api/decorations/:id', async (req, res) => {
  try {
    const sessionId = getSessionIdFromRequest(req);
    if (!sessionId) {
      return res.status(401).json({ error: 'Unauthorized: No session token provided' });
    }
    const user = await getSessionUser(sessionId);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: Invalid session' });
    }

    const id = req.params.id;
    const decors = await getDecorations();
    const existing = decors.find((d) => d.id === id);
    if (!existing) {
      return res.status(404).json({ error: 'Decoration not found' });
    }

    if (existing.placed_by !== user.github_id && !id.startsWith('default_')) {
      return res.status(403).json({ error: 'Forbidden: You can only remove decorations you placed!' });
    }

    await deleteDecoration(id);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to delete decoration' });
  }
});

// Health Endpoint
apiRouter.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    time: Date.now(),
  });
});
