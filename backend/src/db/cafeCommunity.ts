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

let inMemoryCollabs: CollabItem[] = [
    {
        id: 'collab-1',
        title: 'Real-time Pixel Weather Engine',
        category: 'Collab',
        author: 'AriaDev',
        description:
            'Building dynamic rain, sakura petal wind, and day-night lighting shaders for Phaser/Canvas games. Looking for someone with WebGL/shader experience!',
        repoUrl: 'https://github.com',
        tags: ['Phaser 3', 'TypeScript', 'GLSL Shaders'],
        seeking: 'Shader programmer or 2D pixel artist',
        likes: 12,
        createdAt: '1 hour ago',
    },
    {
        id: 'collab-2',
        title: 'Socket.io Latency & State Sync Bug',
        category: 'Help Wanted',
        author: 'DevKev',
        description:
            'Experiencing slight position jitter when 8+ players move simultaneously across chunk borders. Need a pair-programmer to review interpolation buffer math.',
        repoUrl: 'https://github.com',
        tags: ['Node.js', 'Socket.io', 'Game Loop'],
        seeking: 'Backend engineer for 30m code review',
        likes: 8,
        createdAt: '3 hours ago',
    },
    {
        id: 'collab-3',
        title: 'AI Code Reviewer NPC in DevGarden',
        category: 'Brainstorm',
        author: 'SamCoder',
        description:
            'Idea to let players link a PR and an NPC barista reads the diff and comments cute tips in pixel speech bubbles. Let me know what you think!',
        repoUrl: 'https://github.com',
        tags: ['Gemini API', 'GitHub API', 'Webhooks'],
        seeking: 'Ideas & open feedback',
        likes: 19,
        createdAt: 'Yesterday',
    },
];

// --- Showcase Database Queries ---
export async function getShowcaseProjects(): Promise<ShowcaseProject[]> {
    if (isSupabaseConfigured()) {
        try {
            const supabase = getSupabase();
            const { data, error } = await supabase
                .from('cafe_showcase')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data && data.length > 0) {
                return data.map((d: any) => ({
                    id: d.id,
                    title: d.title,
                    author: d.author,
                    authorRole: d.author_role || d.authorRole || 'Developer',
                    description: d.description,
                    tags: Array.isArray(d.tags) ? d.tags : [],
                    link: d.link || d.repo_url,
                    stars: d.stars || 0,
                    featured: !!d.featured,
                    createdAt: d.created_at ? new Date(d.created_at).getTime() : Date.now(),
                }));
            }
        } catch (err) {
            console.warn('Supabase fetch error for cafe_showcase, using memory store:', err);
        }
    }
    return inMemoryShowcase;
}

export async function createShowcaseProject(project: Omit<ShowcaseProject, 'id' | 'createdAt'>): Promise<ShowcaseProject> {
    const newProject: ShowcaseProject = {
        ...project,
        id: 'proj-' + Date.now(),
        stars: project.stars || 1,
        createdAt: Date.now(),
    };

    if (isSupabaseConfigured()) {
        try {
            const supabase = getSupabase();
            const { data, error } = await supabase
                .from('cafe_showcase')
                .insert({
                    id: newProject.id,
                    title: newProject.title,
                    author: newProject.author,
                    author_role: newProject.authorRole,
                    description: newProject.description,
                    tags: newProject.tags,
                    link: newProject.link,
                    stars: newProject.stars,
                    featured: newProject.featured || false,
                })
                .select()
                .single();

            if (!error && data) {
                newProject.id = data.id;
            }
        } catch (err) {
            console.warn('Supabase insert error for cafe_showcase, saved in memory:', err);
        }
    }

    inMemoryShowcase = [newProject, ...inMemoryShowcase];
    return newProject;
}

export async function toggleShowcaseStar(id: string, increment: boolean): Promise<ShowcaseProject | null> {
    const delta = increment ? 1 : -1;
    const project = inMemoryShowcase.find((p) => p.id === id);
    if (project) {
        project.stars = Math.max(0, project.stars + delta);
    }

    if (isSupabaseConfigured() && project) {
        try {
            const supabase = getSupabase();
            await supabase.from('cafe_showcase').update({ stars: project.stars }).eq('id', id);
        } catch (err) {
            console.warn('Supabase stars update error for cafe_showcase:', err);
        }
    }

    return project || null;
}

// --- Collab Database Queries ---
export async function getCollabItems(): Promise<CollabItem[]> {
    if (isSupabaseConfigured()) {
        try {
            const supabase = getSupabase();
            const { data, error } = await supabase
                .from('cafe_collabs')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data && data.length > 0) {
                return data.map((d: any) => ({
                    id: d.id,
                    title: d.title,
                    category: d.category,
                    author: d.author,
                    authorRole: d.author_role || d.authorRole || 'Developer',
                    description: d.description,
                    repoUrl: d.repo_url || d.link || '',
                    tags: Array.isArray(d.tags) ? d.tags : [],
                    seeking: d.seeking || 'Collaborators',
                    likes: d.likes || 0,
                    createdAt: d.created_at || 'Recently',
                }));
            }
        } catch (err) {
            console.warn('Supabase fetch error for cafe_collabs, using memory store:', err);
        }
    }
    return inMemoryCollabs;
}

export async function createCollabItem(collab: Omit<CollabItem, 'id' | 'createdAt'>): Promise<CollabItem> {
    const newCollab: CollabItem = {
        ...collab,
        id: 'collab-' + Date.now(),
        likes: collab.likes || 1,
        createdAt: 'Just now',
    };

    if (isSupabaseConfigured()) {
        try {
            const supabase = getSupabase();
            const { data, error } = await supabase
                .from('cafe_collabs')
                .insert({
                    id: newCollab.id,
                    title: newCollab.title,
                    category: newCollab.category,
                    author: newCollab.author,
                    author_role: newCollab.authorRole,
                    description: newCollab.description,
                    repo_url: newCollab.repoUrl,
                    tags: newCollab.tags,
                    seeking: newCollab.seeking,
                    likes: newCollab.likes,
                })
                .select()
                .single();

            if (!error && data) {
                newCollab.id = data.id;
            }
        } catch (err) {
            console.warn('Supabase insert error for cafe_collabs, saved in memory:', err);
        }
    }

    inMemoryCollabs = [newCollab, ...inMemoryCollabs];
    return newCollab;
}