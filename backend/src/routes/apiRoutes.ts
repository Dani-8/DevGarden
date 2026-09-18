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
  getShowcaseProjects,
  createShowcaseProject,
  toggleShowcaseStar,
  getCollabItems,
  createCollabItem,
  toggleCollabLike,
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
