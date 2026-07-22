import { Router } from 'express';
import { config } from '../config/env.js';
import {
  generateSessionId,
  createSessionCookie,
  getRedirectUri,
  getSessionIdFromRequest,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_MS,
} from '../services/authService.js';
import { exchangeOAuthCode, fetchGitHubStats } from '../services/githubService.js';
import { calculateLevel } from '../services/levelingService.js';
import { saveUser, createSession, getSessionUser, deleteSession } from '../db/index.js';

export const authRouter = Router();

// 1. Get OAuth Authorization URL
authRouter.get('/api/auth/url', (req, res) => {
  const clientId = config.clientId;
  if (!clientId) {
    return res.status(500).json({
      error: 'CLIENT_ID is not configured in secrets. Please set CLIENT_ID and CLIENT_SECRET.',
    });
  }

  const redirectUri = getRedirectUri(req);

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'read:user',
  });

  res.json({ url: `https://github.com/login/oauth/authorize?${params.toString()}` });
});

// 2. OAuth Callback
authRouter.get(['/auth/callback', '/auth/callback/'], async (req, res) => {
  const code = req.query.code as string;
  if (!code) {
    return res.status(400).send('OAuth failed: missing code parameter.');
  }

  try {
    const redirectUri = getRedirectUri(req);
    const accessToken = await exchangeOAuthCode(code, redirectUri);
    const stats = await fetchGitHubStats(accessToken);

    const levelInfo = calculateLevel({
      commits: stats.commits,
      stars: stats.stars,
      followers: stats.followers,
      repos: stats.repos,
      account_age_years: stats.account_age_years,
    });

    const githubId = stats.username.toLowerCase();
    await saveUser({
      github_id: githubId,
      username: stats.username,
      avatar_url: stats.avatar_url,
      commits: stats.commits,
      stars: stats.stars,
      followers: stats.followers,
      repos: stats.repos,
      account_age: stats.account_age_years,
      level: levelInfo.level,
      score: levelInfo.score,
      title: levelInfo.title,
      visual_tier: levelInfo.visual_tier,
      last_seen: Date.now(),
      updated_at: Date.now(),
    });

    const sessionId = generateSessionId();
    await createSession(sessionId, githubId, SESSION_MAX_AGE_MS);

    res.setHeader('Set-Cookie', createSessionCookie(sessionId, SESSION_MAX_AGE_MS));

    res.send(`
      <html>
        <head>
          <title>Authentication Successful</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              background: #0d1117;
              color: #c9d1d9;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
            }
            .card {
              background: #161b22;
              border: 1px solid #30363d;
              border-radius: 8px;
              padding: 24px;
              text-align: center;
              box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            }
            h2 { color: #58a6ff; margin-top: 0; }
            p { margin-bottom: 0; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="card">
            <h2>DevGarden Joined!</h2>
            <p>Authenticating your stats. This window will close shortly...</p>
          </div>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', token: '${sessionId}' }, '*');
              window.close();
            } else {
              window.location.href = '/';
            }
          </script>
        </body>
      </html>
    `);
  } catch (error: any) {
    console.error('Callback error:', error);
    res.status(500).send(`
      <html>
        <body style="background: #0d1117; color: #ff7b72; font-family: sans-serif; padding: 24px;">
          <h2>Authentication Failed</h2>
          <p>${error.message || 'An unexpected error occurred during auth.'}</p>
          <p>Make sure CLIENT_ID and CLIENT_SECRET are correctly configured in your secrets.</p>
          <button onclick="window.close()" style="background: #21262d; color: #c9d1d9; border: 1px solid #30363d; padding: 8px 16px; border-radius: 6px; cursor: pointer;">Close Window</button>
        </body>
      </html>
    `);
  }
});

// 3. Get currently logged-in user
authRouter.get('/api/auth/me', async (req, res) => {
  try {
    const sessionId = getSessionIdFromRequest(req);
    const { supabaseUrl, supabaseAnonKey } = config;

    if (!sessionId) {
      return res.json({ loggedIn: false, supabaseUrl, supabaseAnonKey });
    }

    const user = await getSessionUser(sessionId);
    if (!user) {
      return res.json({ loggedIn: false, supabaseUrl, supabaseAnonKey });
    }

    res.json({ loggedIn: true, user, supabaseUrl, supabaseAnonKey });
  } catch (error: any) {
    console.error('Error in /api/auth/me:', error);
    const { supabaseUrl, supabaseAnonKey } = config;
    res.json({ loggedIn: false, error: error.message, supabaseUrl, supabaseAnonKey });
  }
});

// 4. Logout
authRouter.post('/api/auth/logout', async (req, res) => {
  try {
    const sessionId = getSessionIdFromRequest(req);
    if (sessionId) {
      await deleteSession(sessionId);
    }

    const isProduction = config.isProd;
    res.setHeader(
      'Set-Cookie',
      `${SESSION_COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; ${
        isProduction ? 'Secure;' : ''
      } SameSite=${isProduction ? 'None' : 'Lax'}`
    );

    res.json({ success: true });
  } catch (error: any) {
    console.error('Error in /api/auth/logout:', error);
    res.status(500).json({ error: error.message || 'Failed to logout' });
  }
});

// 5. Enter as Guest
authRouter.post('/api/auth/guest', async (req, res) => {
  try {
    const guestId = `guest_${Math.floor(1000 + Math.random() * 9000)}`;
    const stats = {
      username: `GuestGardener_${guestId.split('_')[1]}`,
      avatar_url: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80`,
      commits: 238,
      stars: 87,
      followers: 19,
      repos: 14,
    };

    const levelInfo = calculateLevel({
      commits: stats.commits,
      stars: stats.stars,
      followers: stats.followers,
      repos: stats.repos,
      account_age_years: 2,
    });

    await saveUser({
      github_id: guestId,
      username: stats.username,
      avatar_url: stats.avatar_url,
      commits: stats.commits,
      stars: stats.stars,
      followers: stats.followers,
      repos: stats.repos,
      account_age: 2,
      level: levelInfo.level,
      score: levelInfo.score,
      title: levelInfo.title,
      visual_tier: levelInfo.visual_tier,
      last_seen: Date.now(),
      updated_at: Date.now(),
    });

    const sessionId = generateSessionId();
    await createSession(sessionId, guestId, SESSION_MAX_AGE_MS);

    res.setHeader('Set-Cookie', createSessionCookie(sessionId, SESSION_MAX_AGE_MS));
    res.json({ success: true, token: sessionId });
  } catch (error: any) {
    console.error('Error in /api/auth/guest:', error);
    res.status(500).json({ error: error.message || 'Failed to enter as guest' });
  }
});

// Backward compatibility setup function
export function setupAuthRoutes(app: any) {
  app.use(authRouter);
}
