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

// Cafe Showcase Endpoints
apiRouter.get('/api/cafe/showcase', async (_req, res) => {
  try {
    const list = await getShowcaseProjects();
    res.json(list);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch showcase projects' });
  }
});

apiRouter.post('/api/cafe/showcase', async (req, res) => {
  try {
    const { title, author, authorRole, description, tags, link, stars, featured } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }
    const project = await createShowcaseProject({
      title,
      author: author || 'Gardener',
      authorRole: authorRole || 'Developer',
      description,
      tags: Array.isArray(tags) ? tags : ['General'],
      link: link || 'https://github.com',
      stars: stars || 1,
      featured: !!featured,
    });
    res.status(201).json(project);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to create showcase project' });
  }
});

apiRouter.post('/api/cafe/showcase/:id/star', async (req, res) => {
  try {
    const { increment } = req.body;
    const project = await toggleShowcaseStar(req.params.id, increment !== false);
    res.json(project);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to update star' });
  }
});

// Cafe Collab Endpoints
apiRouter.get('/api/cafe/collabs', async (_req, res) => {
  try {
    const list = await getCollabItems();
    res.json(list);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch collab items' });
  }
});

apiRouter.post('/api/cafe/collabs', async (req, res) => {
  try {
    const { title, category, author, authorRole, description, repoUrl, tags, seeking, likes } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }
    const collab = await createCollabItem({
      title,
      category: category || 'Collab',
      author: author || 'Gardener',
      authorRole: authorRole || 'Developer',
      description,
      repoUrl: repoUrl || 'https://github.com',
      tags: Array.isArray(tags) ? tags : ['General'],
      seeking: seeking || 'Collaborators',
      likes: likes || 1,
    });
    res.status(201).json(collab);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to create collab post' });
  }
});

apiRouter.post('/api/cafe/collabs/:id/like', async (req, res) => {
  try {
    const { increment } = req.body;
    const collab = await toggleCollabLike(req.params.id, increment !== false);
    res.json(collab);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to update like' });
  }
});

// Health Endpoint
apiRouter.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    time: Date.now(),
  });
});
