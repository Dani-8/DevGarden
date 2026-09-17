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
