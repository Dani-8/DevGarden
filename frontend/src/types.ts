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

export interface PlayerState {
  id: string; // github_id
  username: string;
  avatar_url: string;
  level: number;
  score: number;
  title: string;
  visual_tier: string;
  x: number;
  y: number;
  anim: string;
  isNPC?: boolean;
  isSleeping?: boolean;
  commits?: number;
  stars?: number;
  followers?: number;
  repos?: number;
  cosmetics?: string[];
}

export interface ChatBubbleState {
  text: string;
  isEmote: boolean;
  timestamp: number;
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

export interface ChallengeQuestion {
  field: string;
  question: string;
  options: string[];
}

export interface VerificationResult {
  correct: boolean;
  explanation: string;
}
