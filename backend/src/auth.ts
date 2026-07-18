import express from 'express';
import crypto from 'node:crypto';
import { exchangeOAuthCode, fetchGitHubStats } from './github.js';
import { saveUser, createSession, getSessionUser, deleteSession } from './db.js';
import { calculateLevel } from './leveling.js';

const SUPABASE_URL = (process.env.SUPABASE_URL || '').trim();
const SUPABASE_ANON_KEY = (process.env.SUPABASE_ANON_KEY || '').trim();

function generateSessionId() {
  return crypto.randomBytes(32).toString('hex');
}

export function parseCookies(cookieHeader?: string): Record<string, string> {
  const list: Record<string, string> = {};
  if (!cookieHeader) return list;
  cookieHeader.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    const name = parts.shift()?.trim();
    if (name) {
      list[name] = decodeURIComponent(parts.join('='));
    }
  });
  return list;
}

const SESSION_COOKIE_NAME = 'devgarden_session';
const SESSION_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function createSessionCookie(value: string, maxAge: number) {
  const isProduction = process.env.NODE_ENV === "production";

  return `${SESSION_COOKIE_NAME}=${value}; Path=/; Max-Age=${maxAge / 1000}; HttpOnly; ${isProduction ? "Secure;" : ""
    } SameSite=${isProduction ? "None" : "Lax"}`;
}


export function getRedirectUri(req: express.Request): string {
  const requestHost = req.get('host') || '';
  const isLocal = requestHost.includes('localhost') || requestHost.includes('127.0.0.1');
  const host = isLocal ? `${req.protocol}://${requestHost}` : (process.env.APP_URL || `${req.protocol}://${requestHost}`);
  return `${host}/auth/callback`;
}

export function setupAuthRoutes(app: express.Express) {
  // 1. Get OAuth Authorization URL
  app.get('/api/auth/url', (req, res) => {
    const clientId = process.env.CLIENT_ID;
    if (!clientId) {
      return res.status(500).json({ error: 'CLIENT_ID is not configured in secrets. Please set CLIENT_ID and CLIENT_SECRET.' });
    }

    const redirectUri = getRedirectUri(req);

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: 'read:user', // Basic user profile read
    });

    res.json({ url: `https://github.com/login/oauth/authorize?${params.toString()}` });
  });

  // 2. OAuth Callback
  app.get(['/auth/callback', '/auth/callback/'], async (req, res) => {
    const code = req.query.code as string;
    if (!code) {
      return res.status(400).send('OAuth failed: missing code parameter.');
    }

    try {
      const redirectUri = getRedirectUri(req);

      // Exchange code for token
      const accessToken = await exchangeOAuthCode(code, redirectUri);

      // Fetch GitHub User Metrics
      const stats = await fetchGitHubStats(accessToken);

      // Calculate level, score, title, visual_tier
      const levelInfo = calculateLevel({
        commits: stats.commits,
        stars: stats.stars,
        followers: stats.followers,
        repos: stats.repos,
        account_age_years: stats.account_age_years,
      });

      // Save user to SQLite
      const githubId = stats.username.toLowerCase(); // Use username as unique ID for simplicity or standard ID
      await saveUser({
        github_id: githubId,
        username: stats.username,
        avatar_url: stats.avatar_url,
        commits: stats.commits,
        stars: stats.stars,
        followers: stats.followers,
        repos: stats.repos,
        account_age: stats.account_age_years, // Fixed: use account_age mapping
        level: levelInfo.level,
        score: levelInfo.score,
        title: levelInfo.title,
        visual_tier: levelInfo.visual_tier,
        last_seen: Date.now(),
        updated_at: Date.now(),
      });

      // Create a Session
      const sessionId = generateSessionId();
      await createSession(sessionId, githubId, SESSION_MAX_AGE_MS);

      // Set cookie. CRITICAL for iframes in AI Studio:
      // sameSite: 'none' and secure: true MUST be specified.
      res.setHeader(
        'Set-Cookie',
        createSessionCookie(sessionId, SESSION_MAX_AGE_MS)
      );

      // Return popup callback script to notify main frame
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
                window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS' }, '*');
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
  app.get('/api/auth/me', async (req, res) => {
    try {
      const cookies = parseCookies(req.headers.cookie);
      const sessionId = cookies[SESSION_COOKIE_NAME];

      const supabaseUrl = SUPABASE_URL;
      const supabaseAnonKey = SUPABASE_ANON_KEY;

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
      const supabaseUrl = SUPABASE_URL;
      const supabaseAnonKey = SUPABASE_ANON_KEY;
      res.json({ loggedIn: false, error: error.message, supabaseUrl, supabaseAnonKey });
    }
  });

  // 4. Logout
  app.post('/api/auth/logout', async (req, res) => {
    try {
      const cookies = parseCookies(req.headers.cookie);
      const sessionId = cookies[SESSION_COOKIE_NAME];

      if (sessionId) {
        await deleteSession(sessionId);
      }

      const isProduction = process.env.NODE_ENV === "production";

      res.setHeader(
        'Set-Cookie',
        `${SESSION_COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; ${isProduction ? "Secure;" : ""
        } SameSite=${isProduction ? "None" : "Lax"}`
      );

      res.json({ success: true });
    } catch (error: any) {
      console.error('Error in /api/auth/logout:', error);
      res.status(500).json({ error: error.message || 'Failed to logout' });
    }
  });

  // 5. Enter as Guest (Bypass Mode)
  app.post('/api/auth/guest', async (req, res) => {
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

      res.setHeader(
        'Set-Cookie',
        createSessionCookie(sessionId, SESSION_MAX_AGE_MS)
      );

      
      res.json({ success: true });
    } catch (error: any) {
      console.error('Error in /api/auth/guest:', error);
      res.status(500).json({ error: error.message || 'Failed to enter as guest' });
    }
  });
}
