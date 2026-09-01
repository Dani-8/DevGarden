import React, { useState, useEffect } from 'react';
import {
    X,
    ExternalLink,
    Heart,
    Plus,
    Users,
    HelpCircle,
    Lightbulb,
    Code2,
    Tag,
    Search,
    CheckCircle2,
    Sparkles,
    Layers,
    MessageSquare
} from 'lucide-react';

export interface CollabItem {
    id: string;
    title: string;
    category: 'Collab' | 'Help Wanted' | 'Brainstorm' | 'Code Review';
    author: string;
    authorAvatar?: string;
    description: string;
    repoUrl: string;
    tags: string[];
    seeking: string;
    likes: number;
    createdAt: string;
}

const DEFAULT_COLLABS: CollabItem[] = [
    {
        id: 'collab-1',
        title: 'Real-time Pixel Weather Engine',
        category: 'Collab',
        author: 'AriaDev',
        description:
            'Building dynamic rain, sakura petal wind, and day-night lighting shaders for Phaser/Canvas games. Looking for someone with WebGL/shader experience!',
        repoUrl: 'https://github.com/topics/phaser3-weather',
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
        repoUrl: 'https://github.com/topics/multiplayer-game',
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
        repoUrl: 'https://github.com/topics/github-bot',
        tags: ['Gemini API', 'GitHub API', 'Webhooks'],
        seeking: 'Ideas & open feedback',
        likes: 19,
        createdAt: 'Yesterday',
    },
];

interface CafeCollabModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentUsername?: string;
}

export default function CafeCollabModal({
    isOpen,
    onClose,
    currentUsername = 'You',
}: CafeCollabModalProps) {
    const [collabs, setCollabs] = useState<CollabItem[]>(() => {
        try {
            const saved = localStorage.getItem('cafe_collabs_list');
            if (saved) return JSON.parse(saved);
        } catch (e) {
            console.error(e);
        }
        return DEFAULT_COLLABS;
    });

    const [activeTab, setActiveTab] = useState<'All' | 'Collab' | 'Help Wanted' | 'Brainstorm' | 'Code Review'>('All');
    const [isPosting, setIsPosting] = useState(false);

    // Form State
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<'Collab' | 'Help Wanted' | 'Brainstorm' | 'Code Review'>('Collab');
    const [repoUrl, setRepoUrl] = useState('');
    const [description, setDescription] = useState('');
    const [seeking, setSeeking] = useState('');
    const [tagsInput, setTagsInput] = useState('');

    // Liked IDs State with local storage persistence
    const [likedIds, setLikedIds] = useState<Set<string>>(() => {
        try {
            const savedLikes = localStorage.getItem('cafe_collabs_liked_ids');
            if (savedLikes) {
                return new Set(JSON.parse(savedLikes));
            }
        } catch (e) {
            console.error(e);
        }
        return new Set();
    });

    if (!isOpen) return null;

    const handleToggleLike = (id: string) => {
        const isCurrentlyLiked = likedIds.has(id);
        const updatedLikedIds = new Set(likedIds);

        if (isCurrentlyLiked) {
            updatedLikedIds.delete(id);
        } else {
            updatedLikedIds.add(id);
        }

        setLikedIds(updatedLikedIds);
        try {
            localStorage.setItem('cafe_collabs_liked_ids', JSON.stringify(Array.from(updatedLikedIds)));
        } catch (e) {
            console.error(e);
        }

        setCollabs((prev) => {
            const updated = prev.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        likes: Math.max(0, item.likes + (isCurrentlyLiked ? -1 : 1)),
                    };
                }
                return item;
            });
            try {
                localStorage.setItem('cafe_collabs_list', JSON.stringify(updated));
            } catch (e) {
                console.error(e);
            }
            return updated;
        });
    };

    const handleCreatePost = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;

        const tags = tagsInput
            .split(',')
            .map((t) => t.trim())
            .filter((t) => t.length > 0);

        const newCollab: CollabItem = {
            id: 'collab-' + Date.now(),
            title: title.trim(),
            category: category,
            author: currentUsername,
            description: description.trim(),
            repoUrl: repoUrl.trim() || 'https://github.com',
            tags: tags.length > 0 ? tags : ['General Dev'],
            seeking: seeking.trim() || 'Collaborators & Feedback',
            likes: 1,
            createdAt: 'Just now',
        };

        const updated = [newCollab, ...collabs];
        setCollabs(updated);
        try {
            localStorage.setItem('cafe_collabs_list', JSON.stringify(updated));
        } catch (e) {
            console.error(e);
        }

        // Auto-like the user's own new post
        const updatedLikes = new Set(likedIds);
        updatedLikes.add(newCollab.id);
        setLikedIds(updatedLikes);
        try {
            localStorage.setItem('cafe_collabs_liked_ids', JSON.stringify(Array.from(updatedLikes)));
        } catch (e) {
            console.error(e);
        }

        // Reset Form
        setTitle('');
        setDescription('');
        setRepoUrl('');
        setSeeking('');
        setTagsInput('');
        setIsPosting(false);
    };

    const filteredCollabs = collabs.filter((item) => {
        if (activeTab === 'All') return true;
        return item.category === activeTab;
    });

    const getCategoryBadge = (cat: CollabItem['category']) => {
        switch (cat) {
            case 'Collab':
                return {
                    icon: <Users className="w-3 h-3" />,
                    style: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
                    label: 'Looking for Collab',
                };
            case 'Help Wanted':
                return {
                    icon: <HelpCircle className="w-3 h-3" />,
                    style: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
                    label: 'Need Help',
                };
            case 'Brainstorm':
                return {
                    icon: <Lightbulb className="w-3 h-3" />,
                    style: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
                    label: 'Brainstorm',
                };
            case 'Code Review':
                return {
                    icon: <Code2 className="w-3 h-3" />,
                    style: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
                    label: 'Code Review',
                };
        }
    };

    return (
        <div
            id="cafe-collab-modal"
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-slate-100 max-h-[90vh] flex flex-col font-sans"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
                            <Users className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                                Dev Collab & Help Whiteboard
                                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30">
                                    Room 3
                                </span>
                            </h2>
                            <p className="text-xs text-slate-400">
                                Find project partners, ask for debugging assistance, or brainstorm new features.
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Action & Tab Navigation Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 bg-slate-900 border-b border-slate-800">
                    <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
                        <button
                            onClick={() => setActiveTab('All')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${activeTab === 'All'
                                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                                }`}
                        >
                            <Layers className="w-3.5 h-3.5" />
                            <span>All Requests</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('Collab')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${activeTab === 'Collab'
                                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/20'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                                }`}
                        >
                            <Users className="w-3.5 h-3.5" />
                            <span>Find Partners</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('Help Wanted')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${activeTab === 'Help Wanted'
                                    ? 'bg-rose-600 text-white shadow-sm shadow-rose-500/20'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                                }`}
                        >
                            <HelpCircle className="w-3.5 h-3.5" />
                            <span>Need Help</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('Brainstorm')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${activeTab === 'Brainstorm'
                                    ? 'bg-amber-600 text-white shadow-sm shadow-amber-500/20'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                                }`}
                        >
                            <Lightbulb className="w-3.5 h-3.5" />
                            <span>Brainstorm</span>
                        </button>
                    </div>

                    <button
                        onClick={() => setIsPosting(!isPosting)}
                        className="px-4 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-all flex items-center gap-1.5"
                    >
                        {isPosting ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        <span>{isPosting ? 'Cancel' : 'Post Request'}</span>
                    </button>
                </div>

                {/* Post Creation Form */}
                {isPosting && (
                    <form
                        onSubmit={handleCreatePost}
                        className="p-6 bg-slate-950/70 border-b border-slate-800 space-y-4 animate-in slide-in-from-top-2 duration-200"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                    Project Title / Topic *
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g., Multiplayer Combat Engine"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                    Goal / Category *
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value as any)}
                                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-blue-500"
                                >
                                    <option value="Collab">Looking for Collaborators</option>
                                    <option value="Help Wanted">Need Help / Debugging</option>
                                    <option value="Brainstorm">Idea & Architecture Brainstorm</option>
                                    <option value="Code Review">Code Review & Optimization</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                    GitHub / Repository Link
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://github.com/username/project"
                                    value={repoUrl}
                                    onChange={(e) => setRepoUrl(e.target.value)}
                                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                    What kind of help or teammate are you seeking?
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., Frontend developer, Game balance feedback"
                                    value={seeking}
                                    onChange={(e) => setSeeking(e.target.value)}
                                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                                Details & Description *
                            </label>
                            <textarea
                                required
                                rows={3}
                                placeholder="Describe your project, current hurdle, or what features you plan to build next..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                                Tech Stack / Tags (Comma separated)
                            </label>
                            <input
                                type="text"
                                placeholder="React, TypeScript, Tailwind, Socket.io"
                                value={tagsInput}
                                onChange={(e) => setTagsInput(e.target.value)}
                                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex justify-end gap-2 pt-1">
                            <button
                                type="button"
                                onClick={() => setIsPosting(false)}
                                className="px-4 py-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-1.5 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-md flex items-center gap-1.5 transition-colors"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Pin to Whiteboard</span>
                            </button>
                        </div>
                    </form>
                )}

                {/* Requests List */}
                <div className="p-6 overflow-y-auto space-y-4 flex-1">
                    {filteredCollabs.length === 0 ? (
                        <div className="text-center py-12 text-slate-500 text-sm flex flex-col items-center gap-2">
                            <Sparkles className="w-6 h-6 text-slate-600" />
                            <span>No collaboration requests in this category yet. Be the first to post one!</span>
                        </div>
                    ) : (
                        filteredCollabs.map((item) => {
                            const badge = getCategoryBadge(item.category);
                            const isLiked = likedIds.has(item.id);

                            return (
                                <div
                                    key={item.id}
                                    className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-slate-700/80 transition-all flex flex-col gap-3"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${badge.style}`}
                                                >
                                                    {badge.icon}
                                                    {badge.label}
                                                </span>
                                                <span className="text-[11px] text-slate-400">
                                                    Posted by <strong className="text-slate-300">@{item.author}</strong> • {item.createdAt}
                                                </span>
                                            </div>
                                            <h3 className="text-sm font-bold text-slate-100">{item.title}</h3>
                                        </div>

                                        <button
                                            onClick={() => handleToggleLike(item.id)}
                                            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${isLiked
                                                    ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 shadow-sm shadow-rose-500/10'
                                                    : 'bg-slate-900 border-slate-700/80 text-slate-400 hover:text-rose-300 hover:border-rose-500/30'
                                                }`}
                                            title={isLiked ? 'Unlike' : 'Like'}
                                        >
                                            <Heart
                                                className={`w-3.5 h-3.5 transition-transform duration-150 active:scale-125 ${isLiked ? 'fill-rose-400 text-rose-400' : 'text-slate-400'
                                                    }`}
                                            />
                                            <span>{item.likes}</span>
                                        </button>
                                    </div>

                                    <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>

                                    {item.seeking && (
                                        <div className="text-xs px-3 py-2 rounded-lg bg-blue-950/30 border border-blue-900/40 text-blue-200 flex items-center gap-2">
                                            <Search className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                                            <span className="font-semibold text-blue-300">Seeking:</span>
                                            <span>{item.seeking}</span>
                                        </div>
                                    )}

                                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
                                        <div className="flex flex-wrap gap-1.5">
                                            {item.tags.map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700/60 text-slate-400"
                                                >
                                                    <Tag className="w-2.5 h-2.5 opacity-60" />
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {item.repoUrl && (
                                            <a
                                                href={item.repoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 transition-colors hover:underline"
                                            >
                                                <ExternalLink className="w-3.5 h-3.5" />
                                                <span>View Repository</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}

