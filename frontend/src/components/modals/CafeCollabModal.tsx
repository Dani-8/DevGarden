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
    socket?: any;
    currentUsername?: string;
}

export default function CafeCollabModal({
    isOpen,
    onClose,
    socket,
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

    // Fetch from backend on modal mount
    useEffect(() => {
        fetch('/api/cafe/collabs')
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    setCollabs(data);
                    try {
                        localStorage.setItem('cafe_collabs_list', JSON.stringify(data));
                    } catch (e) { }
                }
            })
            .catch((err) => console.warn('Could not load collabs from API:', err));
    }, []);

    // Listen to live WebSocket events
    useEffect(() => {
        if (!socket) return;

        const handleCreated = (newCollab: CollabItem) => {
            setCollabs((prev) => {
                if (prev.some((c) => c.id === newCollab.id)) return prev;
                const updated = [newCollab, ...prev];
                try {
                    localStorage.setItem('cafe_collabs_list', JSON.stringify(updated));
                } catch (e) { }
                return updated;
            });
        };

        const handleUpdated = (updatedCollab: CollabItem) => {
            setCollabs((prev) => {
                const updated = prev.map((c) => (c.id === updatedCollab.id ? updatedCollab : c));
                try {
                    localStorage.setItem('cafe_collabs_list', JSON.stringify(updated));
                } catch (e) { }
                return updated;
            });
        };

        socket.on('cafe_collab_created', handleCreated);
        socket.on('cafe_collab_updated', handleUpdated);

        return () => {
            socket.off('cafe_collab_created', handleCreated);
            socket.off('cafe_collab_updated', handleUpdated);
        };
    }, [socket]);

    if (!isOpen) return null;

    const handleToggleLike = async (id: string) => {
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

        if (socket) {
            socket.emit('cafe_collab_like', { id, increment: !isCurrentlyLiked });
        } else {
            try {
                await fetch(`/api/cafe/collabs/${id}/like`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ increment: !isCurrentlyLiked }),
                });
            } catch (err) {
                console.error('Failed to sync collab like:', err);
            }
        }
    };

    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;

        const tags = tagsInput
            .split(',')
            .map((t) => t.trim())
            .filter((t) => t.length > 0);

        const payload = {
            title: title.trim(),
            category: category,
            author: currentUsername,
            description: description.trim(),
            repoUrl: repoUrl.trim() || 'https://github.com',
            tags: tags.length > 0 ? tags : ['General Dev'],
            seeking: seeking.trim() || 'Collaborators',
            likes: 1,
        };

        if (socket) {
            socket.emit('cafe_collab_create', payload);
        } else {
            try {
                const res = await fetch('/api/cafe/collabs', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                if (res.ok) {
                    const created = await res.json();
                    setCollabs((prev) => [created, ...prev]);
                }
            } catch (err) {
                console.error('Failed to post collab request:', err);
            }
        }

        // Auto-like the user's new post locally
        const tempId = 'collab-' + Date.now();
        const updatedLikes = new Set(likedIds);
        updatedLikes.add(tempId);
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
