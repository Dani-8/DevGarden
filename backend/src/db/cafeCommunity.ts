import { getSupabase, isSupabaseConfigured } from './client.js';

export interface ShowcaseProject {
  id: string;
  title: string;
  author: string;
  authorRole?: string;
  description: string;
  tags: string[];
  link?: string;
  stars: number;
  featured?: boolean;
  createdAt: number;
}

export interface CollabItem {
  id: string;
  title: string;
  category: 'Collab' | 'Help Wanted' | 'Brainstorm' | 'Code Review';
  author: string;
  authorRole?: string;
  description: string;
  repoUrl: string;
  tags: string[];
  seeking: string;
  likes: number;
  createdAt: string | number;
}