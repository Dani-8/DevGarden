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
