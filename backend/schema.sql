-- DevGarden SQL Migration Schema for Supabase PostgreSQL
-- Copy and run this script in your Supabase SQL Editor to create the required tables.

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  github_id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  avatar_url TEXT,
  commits INTEGER DEFAULT 0,
  stars INTEGER DEFAULT 0,
  followers INTEGER DEFAULT 0,
  repos INTEGER DEFAULT 0,
  account_age NUMERIC DEFAULT 0,
  level INTEGER DEFAULT 1,
  score INTEGER DEFAULT 0,
  title TEXT DEFAULT 'Sprout',
  visual_tier TEXT DEFAULT 'green',
  last_seen BIGINT DEFAULT 0,
  updated_at BIGINT DEFAULT 0
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  session_id TEXT PRIMARY KEY,
  github_id TEXT NOT NULL REFERENCES users(github_id) ON DELETE CASCADE,
  expires_at BIGINT NOT NULL
);

-- Enable Row Level Security (RLS) or add standard policies if needed
-- For ease of setup, you can disable RLS for these tables or create bypass policies,
-- as the backend functions use the Service Role key which bypasses RLS.
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Service Role has full access automatically.
-- If you want your clients to subscribe to Realtime via Anon key,
-- make sure you enable Replication for Realtime on these tables:
-- 1. Go to Database -> Replication -> Source -> Publications (supabase_realtime)
-- 2. Toggle on "users" and "sessions" tables or run:
alter publication supabase_realtime add table users;
