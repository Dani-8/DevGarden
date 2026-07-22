import { useState, useEffect } from 'react';
import { PlayerState, AuthSession } from '../types/index.js';
import { SupabaseSocket } from '../SupabaseSocket.js';

export function useGameSocket(session: AuthSession | null) {
    const [socket, setSocket] = useState<SupabaseSocket | null>(null);
    const [socketConnected, setSocketConnected] = useState(false);
    const [selfPlayer, setSelfPlayer] = useState<PlayerState | null>(null);
    const [playersList, setPlayersList] = useState<PlayerState[]>([]);
    const [npcsList, setNpcsList] = useState<PlayerState[]>([]);
    const [serverStatusMessage, setServerStatusMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!session?.loggedIn || !session.user || !session.supabaseUrl || !session.supabaseAnonKey) {
            if (socket) {
                socket.disconnect();
                setSocket(null);
            }
            return;
        }

        const self: PlayerState = {
            id: session.user.github_id,
            username: session.user.username,
            avatar_url: session.user.avatar_url,
            level: session.user.level,
            score: session.user.score,
            title: session.user.title,
            visual_tier: session.user.visual_tier,
            x: 350 + Math.random() * 100,
            y: 250 + Math.random() * 100,
            anim: 'idle_down',
            commits: session.user.commits,
            stars: session.user.stars,
            followers: session.user.followers,
            repos: session.user.repos,
            cosmetics: (() => {
                try {
                    const stored = localStorage.getItem('devgarden_unlocked_cosmetics');
                    return stored ? JSON.parse(stored) : [];
                } catch {
                    return [];
                }
            })(),
        };

        const s = new SupabaseSocket((session.supabaseUrl || '').trim(), (session.supabaseAnonKey || '').trim(), self);

        s.on('connect', () => {
            setSocketConnected(true);
        });

        s.on('disconnect', () => {
            setSocketConnected(false);
        });

        s.on('force_disconnect', (data: { message: string }) => {
            setServerStatusMessage(data.message);
            setTimeout(() => s.disconnect(), 100);
        });

        s.on('auth_error', (data: { message: string }) => {
            setServerStatusMessage(data.message);
        });

        s.on('world_init', (data: { self: PlayerState; players: PlayerState[]; sleepingNPCs: PlayerState[] }) => {
            setSelfPlayer(data.self);
            setPlayersList(data.players);
            setNpcsList(data.sleepingNPCs);
        });

        s.on('player_joined', (p: PlayerState) => {
            setPlayersList(prev => {
                if (prev.some(pl => pl.id === p.id)) return prev;
                return [...prev, p];
            });
        });

        s.on('player_left', (data: { id: string }) => {
            setPlayersList(prev => prev.filter(pl => pl.id !== data.id));
        });

        s.on('sleeping_npcs_update', (npcs: PlayerState[]) => {
            setNpcsList(npcs);
        });

        s.connect();
        setSocket(s);

        return () => {
            s.disconnect();
        };
    }, [session]);

    const unlockCosmetics = (cosmetics: string[]) => {
        if (selfPlayer) {
            const updated = { ...selfPlayer, cosmetics };
            setSelfPlayer(updated);
            if (socket) {
                socket.updateCosmetics(cosmetics);
            }
        }
    };

    return {
        socket,
        socketConnected,
        selfPlayer,
        playersList,
        npcsList,
        serverStatusMessage,
        setServerStatusMessage,
        unlockCosmetics,
    };
}
