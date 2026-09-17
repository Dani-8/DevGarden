import React, { useState, useEffect, FormEvent } from 'react';
import { X, ExternalLink, Star, Plus, Sparkles, MessageSquare, Award } from 'lucide-react';

export interface ShowcaseProject {
    id: string;
    title: string;
    author: string;
    authorRole: string;
    description: string;
    tags: string[];
    link?: string;
    stars: number;
    featured?: boolean;
    createdAt: number;
}

const DEFAULT_PROJECTS: ShowcaseProject[] = [
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

interface CafeProjectShowcaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    socket?: any;
    currentUsername?: string;
}

export default function CafeProjectShowcaseModal({
    isOpen,
    onClose,
    socket,
    currentUsername = 'You',
}: CafeProjectShowcaseModalProps) {
    const [projects, setProjects] = useState<ShowcaseProject[]>(() => {
        try {
            const saved = localStorage.getItem('cafe_showcase_projects');
            if (saved) {
                return JSON.parse(saved);
            }
        } catch { }
        return DEFAULT_PROJECTS;
    });

    const [upvotedIds, setUpvotedIds] = useState<string[]>(() => {
        try {
            const saved = localStorage.getItem('cafe_showcase_upvotes');
            if (saved) return JSON.parse(saved);
        } catch { }
        return [];
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState<'all' | 'featured'>('all');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tags: '',
        link: '',
    });

    // Fetch initial data from backend API
    useEffect(() => {
        fetch('/api/cafe/showcase')
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    setProjects(data);
                    try {
                        localStorage.setItem('cafe_showcase_projects', JSON.stringify(data));
                    } catch { }
                }
            })
            .catch((err) => console.warn('Could not load showcase from API:', err));
    }, []);

    // Listen to live WebSocket events
    useEffect(() => {
        if (!socket) return;

        const handleCreated = (newProj: ShowcaseProject) => {
            setProjects((prev) => {
                if (prev.some((p) => p.id === newProj.id)) return prev;
                const updated = [newProj, ...prev];
                try {
                    localStorage.setItem('cafe_showcase_projects', JSON.stringify(updated));
                } catch { }
                return updated;
            });
        };

        const handleUpdated = (updatedProj: ShowcaseProject) => {
            setProjects((prev) => {
                const updated = prev.map((p) => (p.id === updatedProj.id ? updatedProj : p));
                try {
                    localStorage.setItem('cafe_showcase_projects', JSON.stringify(updated));
                } catch { }
                return updated;
            });
        };

        socket.on('cafe_showcase_created', handleCreated);
        socket.on('cafe_showcase_updated', handleUpdated);

        return () => {
            socket.off('cafe_showcase_created', handleCreated);
            socket.off('cafe_showcase_updated', handleUpdated);
        };
    }, [socket]);

    useEffect(() => {
        try {
            localStorage.setItem('cafe_showcase_projects', JSON.stringify(projects));
        } catch { }
    }, [projects]);

    useEffect(() => {
        try {
            localStorage.setItem('cafe_showcase_upvotes', JSON.stringify(upvotedIds));
        } catch { }
    }, [upvotedIds]);

    if (!isOpen) return null;

    const handleUpvote = async (id: string) => {
        const isUpvoted = upvotedIds.includes(id);
        const updatedUpvotes = isUpvoted
            ? upvotedIds.filter((pId) => pId !== id)
            : [...upvotedIds, id];

        setUpvotedIds(updatedUpvotes);
        try {
            localStorage.setItem('cafe_showcase_upvotes', JSON.stringify(updatedUpvotes));
        } catch { }

        setProjects((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, stars: Math.max(0, p.stars + (isUpvoted ? -1 : 1)) } : p
            )
        );

        // Sync via socket or API
        if (socket) {
            socket.emit('cafe_showcase_star', { id, increment: !isUpvoted });
        } else {
            try {
                await fetch(`/api/cafe/showcase/${id}/star`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ increment: !isUpvoted }),
                });
            } catch (err) {
                console.error('Failed to sync star:', err);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.description.trim()) return;

        const parsedTags = formData.tags
            .split(',')
            .map((t) => t.trim())
            .filter((t) => t.length > 0);

        const payload = {
            title: formData.title.trim(),
            author: currentUsername,
            authorRole: 'Cafe Creator',
            description: formData.description.trim(),
            tags: parsedTags.length > 0 ? parsedTags : ['Project', 'DevGarden'],
            link: formData.link.trim() || undefined,
            stars: 1,
            featured: false,
        };

        if (socket) {
            socket.emit('cafe_showcase_create', payload);
        } else {
            try {
                const res = await fetch('/api/cafe/showcase', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                if (res.ok) {
                    const created = await res.json();
                    setProjects((prev) => [created, ...prev]);
                }
            } catch (err) {
                console.error('Failed to create showcase project:', err);
            }
        }

        setFormData({ title: '', description: '', tags: '', link: '' });
        setIsSubmitting(false);
    };

    const filteredProjects = activeTab === 'featured'
        ? projects.filter((p) => p.featured || p.stars >= 30)
        : projects;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl bg-stone-900 border border-amber-900/60 shadow-2xl text-stone-100 overflow-hidden">
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-stone-800 bg-stone-950/80 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                            <Award className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="flex items-center space-x-2">
                                <h2 className="text-lg font-bold tracking-wide text-amber-200 font-mono">
                                    CodeCafe Project Showcase
                                </h2>
                                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                                    Live Hub
                                </span>
                            </div>
                            <p className="text-xs text-stone-400">
                                Share what you are building, get feedback, and explore community creations
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>