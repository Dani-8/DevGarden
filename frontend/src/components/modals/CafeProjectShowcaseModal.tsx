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
    currentUsername?: string;
}

export default function CafeProjectShowcaseModal({
    isOpen,
    onClose,
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

    const handleUpvote = (id: string) => {
        if (upvotedIds.includes(id)) {
            // Remove upvote
            setUpvotedIds(upvotedIds.filter((pId) => pId !== id));
            setProjects((prev) =>
                prev.map((p) => (p.id === id ? { ...p, stars: Math.max(0, p.stars - 1) } : p))
            );
        } else {
            // Add upvote
            setUpvotedIds([...upvotedIds, id]);
            setProjects((prev) =>
                prev.map((p) => (p.id === id ? { ...p, stars: p.stars + 1 } : p))
            );
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.description.trim()) return;

        const parsedTags = formData.tags
            .split(',')
            .map((t) => t.trim())
            .filter((t) => t.length > 0);

        const newProject: ShowcaseProject = {
            id: `proj-${Date.now()}`,
            title: formData.title.trim(),
            author: currentUsername,
            authorRole: 'Cafe Creator',
            description: formData.description.trim(),
            tags: parsedTags.length > 0 ? parsedTags : ['Project', 'DevGarden'],
            link: formData.link.trim() || undefined,
            stars: 1,
            featured: false,
            createdAt: Date.now(),
        };

        setUpvotedIds((prev) => [...prev, newProject.id]);
        setProjects([newProject, ...projects]);
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

                {/* Action / Filter Bar */}
                <div className="px-6 py-3 bg-stone-900/90 border-b border-stone-800 flex items-center justify-between gap-3">
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => {
                                setActiveTab('all');
                                setIsSubmitting(false);
                            }}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${activeTab === 'all' && !isSubmitting
                                ? 'bg-amber-600 text-stone-950 font-bold'
                                : 'text-stone-400 hover:text-stone-200 bg-stone-800/60'
                                }`}
                        >
                            All Projects ({projects.length})
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('featured');
                                setIsSubmitting(false);
                            }}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center space-x-1 transition-colors ${activeTab === 'featured' && !isSubmitting
                                ? 'bg-amber-600 text-stone-950 font-bold'
                                : 'text-stone-400 hover:text-stone-200 bg-stone-800/60'
                                }`}
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Top Featured</span>
                        </button>
                    </div>

                    <button
                        onClick={() => setIsSubmitting(!isSubmitting)}
                        className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-all shadow-md ${isSubmitting
                            ? 'bg-stone-700 text-stone-200'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/30'
                            }`}
                    >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{isSubmitting ? 'Cancel' : 'Share Your Project'}</span>
                    </button>
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {isSubmitting ? (
                        /* Submission Form */
                        <form onSubmit={handleSubmit} className="p-5 rounded-xl bg-stone-950/70 border border-stone-800 space-y-4">
                            <div className="flex items-center space-x-2 text-amber-300 text-sm font-semibold">
                                <Sparkles className="w-4 h-4" />
                                <span>Showcase Your Project to CodeCafe</span>
                            </div>

                            <div>
                                <label className="block text-xs text-stone-400 mb-1 font-medium">Project Name *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g., Pixel Quest Multiplayer or AI Prompt Studio"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-3 py-2 text-sm rounded-lg bg-stone-900 border border-stone-700 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-stone-400 mb-1 font-medium">Description / What are you building? *</label>
                                <textarea
                                    required
                                    rows={3}
                                    placeholder="Describe what your project does, what tech stack you used, or what feedback you are looking for..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-3 py-2 text-sm rounded-lg bg-stone-900 border border-stone-700 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs text-stone-400 mb-1 font-medium">Tech Tags (comma separated)</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., React, TypeScript, Python"
                                        value={formData.tags}
                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                        className="w-full px-3 py-2 text-sm rounded-lg bg-stone-900 border border-stone-700 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-stone-400 mb-1 font-medium">Demo / GitHub Link (optional)</label>
                                    <input
                                        type="url"
                                        placeholder="https://github.com/..."
                                        value={formData.link}
                                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                        className="w-full px-3 py-2 text-sm rounded-lg bg-stone-900 border border-stone-700 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsSubmitting(false)}
                                    className="px-4 py-2 text-xs font-medium rounded-lg text-stone-400 hover:text-stone-200 bg-stone-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 transition-colors shadow-lg"
                                >
                                    Post to Showcase Board
                                </button>
                            </div>
                        </form>
                    ) : (
                        /* Projects List */
                        <div className="grid grid-cols-1 gap-3.5">
                            {filteredProjects.map((project) => {
                                const isUpvoted = upvotedIds.includes(project.id);
                                return (
                                    <div
                                        key={project.id}
                                        className={`p-4 rounded-xl border transition-all ${project.featured
                                            ? 'bg-stone-950/80 border-amber-500/40 shadow-lg shadow-amber-950/20'
                                            : 'bg-stone-950/50 border-stone-800/80 hover:border-stone-700'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                                                    <h3 className="text-sm font-bold text-stone-100 truncate">{project.title}</h3>
                                                    {project.featured && (
                                                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center space-x-1">
                                                            <Sparkles className="w-2.5 h-2.5" />
                                                            <span>Featured</span>
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-stone-400 mt-0.5">
                                                    by <span className="text-amber-300/90 font-medium">{project.author}</span> • {project.authorRole}
                                                </p>
                                            </div>

                                            {/* Upvote Star Button */}
                                            <button
                                                onClick={() => handleUpvote(project.id)}
                                                className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 text-xs font-bold transition-all ${isUpvoted
                                                    ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                                                    : 'bg-stone-800/80 hover:bg-stone-800 text-stone-300 border border-stone-700'
                                                    }`}
                                            >
                                                <Star className={`w-3.5 h-3.5 ${isUpvoted ? 'fill-stone-950' : 'text-amber-400'}`} />
                                                <span>{project.stars}</span>
                                            </button>
                                        </div>

                                        {/* Description */}
                                        <p className="text-xs text-stone-300 mt-2.5 leading-relaxed">
                                            {project.description}
                                        </p>

                                        {/* Tags & Action Link */}
                                        <div className="mt-3.5 pt-2.5 border-t border-stone-800/60 flex items-center justify-between flex-wrap gap-2">
                                            <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                                                {project.tags.map((tag, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-stone-800 text-stone-300 border border-stone-700/60"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {project.link && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 flex items-center space-x-1 transition-colors"
                                                >
                                                    <span>Explore Project</span>
                                                    <ExternalLink className="w-3 h-3" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Modal Footer Note */}
                <div className="px-6 py-3 bg-stone-950/90 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
                    <div className="flex items-center space-x-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                        <span>Chat live with builders in the Discussion & Collab Wing!</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="px-3.5 py-1 text-xs font-semibold rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
