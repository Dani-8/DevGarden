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
