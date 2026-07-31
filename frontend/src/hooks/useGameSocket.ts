import { useState, useEffect } from 'react';
import { PlayerState, AuthSession } from '../types/index';
import { SupabaseSocket } from '../SupabaseSocket';

export function useGameSocket(session: AuthSession | null) {
  const [socket, setSocket] = useState<SupabaseSocket | null>(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [selfPlayer, setSelfPlayer] = useState<PlayerState | null>(null);
  const [playersList, setPlayersList] = useState<PlayerState[]>([]);
  const [npcsList, setNpcsList] = useState<PlayerState[]>([]);
  const [serverStatusMessage, setServerStatusMessage] = useState<string | null>(null);
  const [welcomeToast, setWelcomeToast] = useState<string | null>(null);
  const [hasUnreadChat, setHasUnreadChat] = useState(false);

  // Auto dismiss welcome banner after 4.5 seconds
  useEffect(() => {
    if (!welcomeToast) return;
    const timer = setTimeout(() => {
      setWelcomeToast(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [welcomeToast]);

  useEffect(() => {
    if (!session?.loggedIn || !session.user || !session.supabaseUrl || !session.supabaseAnonKey) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    let savedScene = 'GardenScene';
    let spawnX = 526 + (Math.floor(Math.random() * 30) - 15);
    let spawnY = 715 + (Math.floor(Math.random() * 20) - 10);
    try {
      const lastX = localStorage.getItem('devgarden_last_x');
      const lastY = localStorage.getItem('devgarden_last_y');
      if (lastX && lastY) {
        const px = parseFloat(lastX);
        const py = parseFloat(lastY);
        if (!isNaN(px) && !isNaN(py)) {
          spawnX = px;
          spawnY = py;
        }
      } else {
        const savedPosStr = sessionStorage.getItem('devgarden_last_pos');
        if (savedPosStr) {
          const parsed = JSON.parse(savedPosStr);
          if (typeof parsed.x === 'number' && typeof parsed.y === 'number') {
            spawnX = parsed.x;
            spawnY = parsed.y;
          }
        }
      }

      const lastScene = localStorage.getItem('devgarden_last_scene');
      if (lastScene) {
        savedScene = lastScene;
      }
    } catch {
      // fallback
    }

    const self: PlayerState = {
      id: session.user.github_id,
      username: session.user.username,
      avatar_url: session.user.avatar_url,
      level: session.user.level,
      score: session.user.score,
      title: session.user.title,
      visual_tier: session.user.visual_tier,
      x: spawnX,
      y: spawnY,
      anim: 'idle_down',
      scene: savedScene,
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

      const hasWelcomed = sessionStorage.getItem('devgarden_has_welcomed');
      if (!hasWelcomed && session.user?.username) {
        setWelcomeToast(`🌿 Welcome to DevGarden, @${session.user.username}! 🚀`);
        sessionStorage.setItem('devgarden_has_welcomed', 'true');
      }
    });

    s.on('player_chatted', (data: { id: string; text: string }) => {
      if (data.id !== session.user?.github_id) {
        setHasUnreadChat(true);
      }
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

  const clearSocketState = () => {
    setSelfPlayer(null);
    setPlayersList([]);
    setNpcsList([]);
  };

  return {
    socket,
    socketConnected,
    selfPlayer,
    playersList,
    npcsList,
    serverStatusMessage,
    setServerStatusMessage,
    welcomeToast,
    hasUnreadChat,
    setHasUnreadChat,
    unlockCosmetics,
    clearSocketState,
  };
}
