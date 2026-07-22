import { getSupabase, isSupabaseConfigured } from './client.js';

export interface UserRow {
  github_id: string;
  username: string;
  avatar_url: string;
  commits: number;
  stars: number;
  followers: number;
  repos: number;
  account_age: number;
  level: number;
  score: number;
  title: string;
  visual_tier: string;
  last_seen: number;
  updated_at: number;
}

// In-memory fallback DB for when Supabase is not configured yet
export const inMemoryUsers: Record<string, UserRow> = {
  'octocat': {
    github_id: 'octocat',
    username: 'Octocat_Hero',
    avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
    commits: 2500,
    stars: 890,
    followers: 412,
    repos: 45,
    account_age: 5,
    level: 32,
    score: 12500,
    title: 'Elder Tree',
    visual_tier: 'gold',
    last_seen: Date.now(),
    updated_at: Date.now()
  },
  'linus': {
    github_id: 'linus',
    username: 'KernelMaster',
    avatar_url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&h=120&q=80',
    commits: 12400,
    stars: 3400,
    followers: 23100,
    repos: 120,
    account_age: 15,
    level: 50,
    score: 45000,
    title: 'Divine Oak',
    visual_tier: 'cosmic',
    last_seen: Date.now(),
    updated_at: Date.now()
  },
  'ada': {
    github_id: 'ada',
    username: 'Ada_Lovelace',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
    commits: 850,
    stars: 420,
    followers: 125,
    repos: 15,
    account_age: 3,
    level: 18,
    score: 4200,
    title: 'Sapling',
    visual_tier: 'green',
    last_seen: Date.now(),
    updated_at: Date.now()
  },
  'grace': {
    github_id: 'grace',
    username: 'Grace_Compiler',
    avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80',
    commits: 3400,
    stars: 1200,
    followers: 890,
    repos: 60,
    account_age: 8,
    level: 40,
    score: 18500,
    title: 'Ancient Redwood',
    visual_tier: 'purple',
    last_seen: Date.now(),
    updated_at: Date.now()
  }
};

export async function getUser(githubId: string): Promise<UserRow | null> {
  const gId = githubId.toLowerCase();
  if (!isSupabaseConfigured()) {
    return inMemoryUsers[gId] || null;
  }

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('github_id', gId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }
    return data as UserRow | null;
  } catch (err) {
    console.error('Error in getUser:', err);
    return null;
  }
}

export async function getUserByUsername(username: string): Promise<UserRow | null> {
  if (!isSupabaseConfigured()) {
    return Object.values(inMemoryUsers).find(u => u.username === username) || null;
  }

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .maybeSingle();

    if (error) {
      console.error('Error fetching user by username:', error);
      return null;
    }
    return data as UserRow | null;
  } catch (err) {
    console.error('Error in getUserByUsername:', err);
    return null;
  }
}

export async function saveUser(user: Partial<UserRow> & { github_id: string; username: string }) {
  const gId = user.github_id.toLowerCase();
  if (!isSupabaseConfigured()) {
    const existing = inMemoryUsers[gId] || {};
    inMemoryUsers[gId] = {
      ...existing,
      ...user,
      github_id: gId,
    } as UserRow;
    return;
  }

  try {
    const supabase = getSupabase();
    const payload = {
      ...user,
      github_id: gId,
    };
    const { error } = await supabase.from('users').upsert(payload);
    if (error) {
      console.error('Error saving user to Supabase:', error);
      throw error;
    }
  } catch (err) {
    console.error('Error in saveUser:', err);
    throw err;
  }
}

export async function getTopUsers(limit: number = 20): Promise<UserRow[]> {
  if (!isSupabaseConfigured()) {
    return Object.values(inMemoryUsers)
      .sort((a, b) => {
        if (b.level !== a.level) {
          return b.level - a.level;
        }
        return b.score - a.score;
      })
      .slice(0, limit);
  }

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('level', { ascending: false })
      .order('score', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching top users:', error);
      return [];
    }
    return (data || []) as UserRow[];
  } catch (err) {
    console.error('Error in getTopUsers:', err);
    return [];
  }
}
