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
  visual_tier: string; // "green" | "blue" | "purple" | "crimson" | "cosmic"
  last_seen: number;
  updated_at: number;
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
}

export interface ChatBubbleState {
  text: string;
  isEmote: boolean;
  timestamp: number;
}
