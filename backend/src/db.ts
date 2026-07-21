import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

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
const inMemoryUsers: Record<string, UserRow> = {
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


const inMemorySessions: Record<string, { github_id: string; expires_at: number }> = {};

let supabaseClient: any = null;

export function isSupabaseConfigured(): boolean {
  return !!(
    process.env.SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export function getSupabase() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase environment variables are missing");
  }

  if (!supabaseClient) {
    supabaseClient = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }

  return supabaseClient;
}

// Initialize / Test DB Connection
export async function initDB() {
  if (!isSupabaseConfigured()) {
    console.log('========================================================================');
    console.log('Supabase env variables not found. Running in local IN-MEMORY mode.');
    console.log('To persist data to Supabase, configure SUPABASE_URL and keys.');
    console.log('========================================================================');
    return;
  }

  try {
    const supabase = getSupabase();
    if (!supabase) return;
    // Quick test query to check connection
    const { data, error } = await supabase.from('users').select('github_id').limit(1);
    if (error) {
      console.warn('Supabase DB Check Warning: Could not fetch users table.', error.message);
      console.warn('Please make sure you have run the schema.sql migration inside your Supabase SQL Editor.');
    } else {
      console.log('Supabase Database connection checked and verified successfully!');
    }
  } catch (err: any) {
    console.error('Failed to initialize Supabase connection on startup:', err.message);
  }
}

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

export async function createSession(sessionId: string, githubId: string, maxAgeMs: number) {
  const gId = githubId.toLowerCase();
  if (!isSupabaseConfigured()) {
    inMemorySessions[sessionId] = {
      github_id: gId,
      expires_at: Date.now() + maxAgeMs,
    };
    return;
  }

  try {
    const supabase = getSupabase();
    const expiresAt = Date.now() + maxAgeMs;
    const { error } = await supabase.from('sessions').insert({
      session_id: sessionId,
      github_id: gId,
      expires_at: expiresAt,
    });
    if (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  } catch (err) {
    console.error('Error in createSession:', err);
    throw err;
  }
}

export async function getSessionUser(sessionId: string): Promise<UserRow | null> {
  if (!isSupabaseConfigured()) {
    const session = inMemorySessions[sessionId];
    if (!session || session.expires_at < Date.now()) {
      return null;
    }
    return inMemoryUsers[session.github_id] || null;
  }

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('sessions')
      .select('*, users(*)')
      .eq('session_id', sessionId)
      .gt('expires_at', Date.now())
      .maybeSingle();

    if (error || !data) {
      if (error) console.error('Error fetching session:', error);
      return null;
    }

    return data.users as UserRow | null;
  } catch (err) {
    console.error('Error in getSessionUser:', err);
    return null;
  }
}

export async function deleteSession(sessionId: string) {
  if (!isSupabaseConfigured()) {
    delete inMemorySessions[sessionId];
    return;
  }

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from('sessions').delete().eq('session_id', sessionId);
    if (error) {
      console.error('Error deleting session:', error);
    }
  } catch (err) {
    console.error('Error in deleteSession:', err);
  }
}

export async function cleanExpiredSessions() {
  if (!isSupabaseConfigured()) {
    const now = Date.now();
    Object.keys(inMemorySessions).forEach(sid => {
      if (inMemorySessions[sid].expires_at < now) {
        delete inMemorySessions[sid];
      }
    });
    return;
  }

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from('sessions').delete().lt('expires_at', Date.now());
    if (error) {
      console.error('Error cleaning sessions:', error);
    }
  } catch (err) {
    console.error('Error in cleanExpiredSessions:', err);
  }
}

export interface DecorationRow {
  id: string;
  item_type: string;
  x: number;
  y: number;
  placed_by: string;
  placed_by_username: string;
  created_at: number;
}

export async function getDecorations(): Promise<DecorationRow[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.from('decorations').select('*');
    if (error) {
      throw error;
    }
    return (data || []) as DecorationRow[];
  } catch (err) {
    console.error('Error in getDecorations:', err);
    throw err;
  }
}

export async function saveDecoration(decor: DecorationRow) {
  if (!isSupabaseConfigured()) {
    return;
  }

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from('decorations').upsert(decor);
    if (error) {
      throw error;
    }
  } catch (err) {
    console.error('Error in saveDecoration:', err);
    throw err;
  }
}

export async function deleteDecoration(id: string) {
  if (!isSupabaseConfigured()) {
    return;
  }

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from('decorations').delete().eq('id', id);
    if (error) {
      throw error;
    }
  } catch (err) {
    console.error('Error in deleteDecoration:', err);
    throw err;
  }
}
