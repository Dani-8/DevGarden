import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config, isSupabaseConfigured } from '../config/env.js';

let supabaseClient: SupabaseClient | null = null;

export { isSupabaseConfigured };

export function getSupabase(): SupabaseClient {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase environment variables are missing');
  }

  if (!supabaseClient) {
    supabaseClient = createClient(
      config.supabaseUrl,
      config.supabaseServiceRoleKey
    );
  }

  return supabaseClient;
}

// Initialize / Test DB Connection
export async function initDB(): Promise<void> {
  if (!isSupabaseConfigured()) {
    console.log('========================================================================');
    console.log('Supabase env variables not found. Running in local IN-MEMORY mode.');
    console.log('To persist data to Supabase, configure SUPABASE_URL and keys.');
    console.log('========================================================================');
    return;
  }

  try {
    const supabase = getSupabase();
    // Quick test query to check connection
    const { error } = await supabase.from('users').select('github_id').limit(1);
    if (error) {
      console.warn('Supabase DB Check Warning: Could not fetch users table.', error.message);
      console.warn('Please make sure you have run the schema.sql migration inside your Supabase SQL Editor.');
    } else {
      console.log('Supabase Database connection checked and verified successfully!');
    }
  } catch (err: any) {
    console.error('Failed to initialize Supabase connection on startup:', err.message || err);
  }
}
