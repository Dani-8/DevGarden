export interface UserProfile {
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
  visual_tier: 'green' | 'blue' | 'purple' | 'crimson' | 'cosmic' | string;
  last_seen: number;
  updated_at: number;
  cosmetics?: string[];
}

export interface AuthSession {
  loggedIn: boolean;
  user?: UserProfile;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  error?: string;
}
