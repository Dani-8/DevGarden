import { getSupabase, isSupabaseConfigured } from './client.js';
import { UserRow, inMemoryUsers } from './users.js';

const inMemorySessions: Record<string, { github_id: string; expires_at: number }> = {};

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
