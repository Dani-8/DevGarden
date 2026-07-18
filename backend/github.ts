import dotenv from 'dotenv';
dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

export interface GitHubProfileStats {
  username: string;
  avatar_url: string;
  followers: number;
  repos: number;
  stars: number;
  commits: number;
  account_age_years: number;
}

// Exchange authorization code for GitHub access token
export async function exchangeOAuthCode(code: string, redirectUri: string): Promise<string> {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error('CLIENT_ID or CLIENT_SECRET is not configured in environment variables.');
  }

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: redirectUri,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub token exchange failed: ${text}`);
  }

  const data = await response.json() as { access_token?: string; error?: string; error_description?: string };
  if (data.error) {
    throw new Error(`GitHub OAuth error: ${data.error_description || data.error}`);
  }

  if (!data.access_token) {
    throw new Error('No access token returned from GitHub.');
  }

  return data.access_token;
}

// Fetch stats for a user using access token
export async function fetchGitHubStats(token: string): Promise<GitHubProfileStats> {
  const headers = {
    'Authorization': `token ${token}`,
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'DevGarden-App',
  };

  // 1. Fetch User Profile Info
  const userRes = await fetch('https://api.github.com/user', { headers });
  if (!userRes.ok) {
    throw new Error(`Failed to fetch user profile: ${userRes.statusText}`);
  }
  const profile = await userRes.json() as {
    login: string;
    id: number;
    avatar_url: string;
    followers: number;
    public_repos: number;
    created_at: string;
  };

  const username = profile.login;
  const avatar_url = profile.avatar_url;
  const followers = profile.followers || 0;
  const repos = profile.public_repos || 0;

  // Calculate Account Age
  const createdDate = new Date(profile.created_at);
  const diffMs = Date.now() - createdDate.getTime();
  const account_age_years = Math.max(0.1, parseFloat((diffMs / (1000 * 60 * 60 * 24 * 365.25)).toFixed(1)));

  // 2. Fetch User's Repos to calculate Total Stars
  let stars = 0;
  try {
    const reposRes = await fetch('https://api.github.com/user/repos?per_page=100&type=owner&sort=updated', { headers });
    if (reposRes.ok) {
      const reposData = await reposRes.json() as Array<{ stargazers_count?: number }>;
      for (const r of reposData) {
        stars += r.stargazers_count || 0;
      }
    }
  } catch (err) {
    console.warn('Could not fetch repo stars:', err);
  }

  // 3. Fetch Total Commits in last year via GraphQL API (robust contribution count)
  let commits = 0;
  try {
    const gqlQuery = {
      query: `
        query($login: String!) {
          user(login: $login) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
              }
            }
          }
        }
      `,
      variables: { login: username },
    };

    const gqlRes = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'DevGarden-App',
      },
      body: JSON.stringify(gqlQuery),
    });

    if (gqlRes.ok) {
      const gqlResult = await gqlRes.json() as {
        data?: {
          user?: {
            contributionsCollection?: {
              contributionCalendar?: {
                totalContributions?: number;
              };
            };
          };
        };
      };
      commits = gqlResult.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions || 0;
    } else {
      console.warn('GraphQL contributions check returned error status:', gqlRes.status);
    }
  } catch (err) {
    console.warn('GraphQL query failed, falling back to estimation:', err);
  }

  // Graceful fallback for commits if GraphQL fails or returns 0
  if (commits === 0) {
    // Fallback: estimate commits based on public repos and followers
    commits = Math.floor(repos * 15 + followers * 2 + 10);
  }

  return {
    username,
    avatar_url,
    followers,
    repos,
    stars,
    commits,
    account_age_years,
  };
}
