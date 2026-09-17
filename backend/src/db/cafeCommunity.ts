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

// In-Memory Storage Fallback
let inMemoryShowcase: ShowcaseProject[] = [
  {
    id: 'proj-1',
    title: 'CodeCafe Virtual Dev Lounge',
    author: 'Alex (Lead Dev)',
    authorRole: 'Full-Stack Engineer',
    description: 'A real-time multiplayer 2D cafe with interactive seating, barista ordering, and live collaboration hubs.',
    tags: ['Phaser 3', 'React', 'TypeScript', 'WebSockets'],
    link: 'https://github.com',
    stars: 48,
    featured: true,
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'proj-2',
    title: 'PixelArt Canvas & Sprite Generator',
    author: 'Sam (Pixel Artist)',
    authorRole: 'UI/UX & Graphics',
    description: 'Procedural pixel-art generator for retro game assets with instant export and palette swapping.',
    tags: ['Canvas API', 'TypeScript', 'TailwindCSS'],
    link: 'https://github.com',
    stars: 35,
    featured: true,
    createdAt: Date.now() - 86400000 * 4,
  },
  {
    id: 'proj-3',
    title: 'Algorithm & Data Structure Visualizer',
    author: 'DevNinja',
    authorRole: 'Algorithms Researcher',
    description: 'Interactive visualizer for graph pathfinding, sorting algorithms, and binary trees with step-by-step playback.',
    tags: ['React', 'Algorithms', 'D3.js'],
    link: 'https://github.com',
    stars: 29,
    featured: false,
    createdAt: Date.now() - 86400000 * 6,
  },
  {
    id: 'proj-4',
    title: 'DevGarden Discord & Telegram Bot',
    author: 'CyberFox',
    authorRole: 'Bot Developer',
    description: 'Automated community bot with leaderboard tracking, daily coding challenges, and XP notification hooks.',
    tags: ['Node.js', 'Discord.js', 'PostgreSQL'],
    link: 'https://github.com',
    stars: 22,
    featured: false,
    createdAt: Date.now() - 86400000 * 8,
  },
];