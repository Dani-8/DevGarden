import React, { useState } from 'react';

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
        title: '🌿 Real-time Pixel Weather Engine',
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
        title: '🆘 Socket.io Latency & State Sync Bug',
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
        title: '💡 AI Code Reviewer NPC in DevGarden',
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

    const [activeTab, setActiveTab] = useState<'All' | 'Collab' | 'Help Wanted' | 'Brainstorm'>('All');
    const [isPosting, setIsPosting] = useState(false);

    // Form State
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<'Collab' | 'Help Wanted' | 'Brainstorm' | 'Code Review'>('Collab');
    const [repoUrl, setRepoUrl] = useState('');
    const [description, setDescription] = useState('');
    const [seeking, setSeeking] = useState('');
    const [tagsInput, setTagsInput] = useState('');
    const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

    if (!isOpen) return null;

    const handleLike = (id: string) => {
        if (likedIds.has(id)) return;
        setLikedIds((prev) => new Set([...prev, id]));
        setCollabs((prev) => {
            const updated = prev.map((item) =>
                item.id === id ? { ...item, likes: item.likes + 1 } : item
            );
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
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl p-2 rounded-xl bg-blue-950/80 border border-blue-800/60">
                            📊
                        </span>
                        <div>
                            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                                Collab & Meeting Whiteboard
                                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                    Room 3
                                </span>
                            </h2>
                            <p className="text-xs text-slate-400">
                                Post collaboration requests, ask for debugging help, or find project teammates.
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Action / Filter Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 bg-slate-900/90 border-b border-slate-800">
                    <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
                        {(['All', 'Collab', 'Help Wanted', 'Brainstorm'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${activeTab === tab
                                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                                    }`}
                            >
                                {tab === 'All' && '🌟 All Requests'}
                                {tab === 'Collab' && '🤝 Find Teammates'}
                                {tab === 'Help Wanted' && '🆘 Need Help'}
                                {tab === 'Brainstorm' && '💡 Brainstorm'}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setIsPosting(!isPosting)}
                        className="px-4 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-all flex items-center gap-1.5"
                    >
                        <span>{isPosting ? '✕ Cancel Post' : '➕ Post Request'}</span>
                    </button>
                </div>

        {/* Posting Form Section */}
        {isPosting && (
          <form
            onSubmit={handleCreatePost}
            className="p-6 bg-slate-950/70 border-b border-slate-800 space-y-4 animate-in slide-in-from-top-2 duration-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Project Title / Summary *
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
                  Category / Goal *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-blue-500"
                >
                  <option value="Collab">🤝 Looking for Collaborators</option>
                  <option value="Help Wanted">🆘 Need Help / Debugging</option>
                  <option value="Brainstorm">💡 Idea & Architecture Brainstorm</option>
                  <option value="Code Review">🔍 Code Review / Optimization</option>
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
                  What kind of help / teammate are you looking for?
                </label>
                <input
                  type="text"
                  placeholder="e.g. Frontend developer, Game balance feedback"
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
                className="px-4 py-1.5 text-xs text-slate-400 hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-md"
              >
                📌 Pin to Whiteboard
              </button>
            </div>
          </form>
        )}
