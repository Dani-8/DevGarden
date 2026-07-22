import { useState, useEffect } from 'react';
import { SupabaseSocket } from './SupabaseSocket.js';
import { Github, Trophy, LogOut, Sparkles, User, HelpCircle } from 'lucide-react';
import LOGO from "../assets/LOGO.png"

import { PlayerState, UserProfile } from './types/index.js';
import GitHubLogin from './components/auth/GitHubLogin.js';
import GameContainer from './game/GameContainer.js';
import EmoteWheel from './components/social/EmoteWheel.js';
import ProfileCard from './components/profile/ProfileCard.js';
import Leaderboard from './components/leaderboard/Leaderboard.js';
import Sidebar from './components/layout/Sidebar.js';

export default function App() {
  const [session, setSession] = useState<{ loggedIn: boolean; user?: UserProfile; supabaseUrl?: string; supabaseAnonKey?: string } | null>(null);
  const [socket, setSocket] = useState<any | null>(null);
  const [socketConnected, setSocketConnected] = useState(false);

  // Multiplayer Game State synced from server
  const [selfPlayer, setSelfPlayer] = useState<PlayerState | null>(null);
  const [playersList, setPlayersList] = useState<PlayerState[]>([]);
  const [npcsList, setNpcsList] = useState<PlayerState[]>([]);

  // UI States
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerState | null>(null);
  const [isNearLeaderboard, setIsNearLeaderboard] = useState(false);
  const [showLeaderboardPanel, setShowLeaderboardPanel] = useState(false);
  const [serverStatusMessage, setServerStatusMessage] = useState<string | null>(null);

  // 1. Fetch Session Status on boot
  const checkAuth = async () => {
    try {
      const apiBase = import.meta.env.VITE_API_URL || '';
      const token = localStorage.getItem('devgarden_token');
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        headers['X-Session-ID'] = token;
      }
      const res = await fetch(`${apiBase}/api/auth/me`, { headers, credentials: 'include' });
      if (!res.ok) {
        setSession({ loggedIn: false });
        return;
      }
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        setSession(data);
      } else {
        setSession({ loggedIn: false });
      }
    } catch (e) {
      console.error('Session verification error:', e);
      setSession({ loggedIn: false });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // 2. Manage Sockets Connection when Session is active
  useEffect(() => {
    if (!session?.loggedIn || !session.user || !session.supabaseUrl || !session.supabaseAnonKey) {
      // Cleanup socket if logging out
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

    // Instantiate and connect SupabaseSocket
    const s = new SupabaseSocket((session.supabaseUrl || '').trim(), (session.supabaseAnonKey || '').trim(), self);

    s.on('connect', () => {
      console.log('Socket stream established successfully!');
      setSocketConnected(true);
    });

    s.on('disconnect', () => {
      console.log('Socket stream disconnected.');
      setSocketConnected(false);
    });

    s.on('force_disconnect', (data: { message: string }) => {
      setServerStatusMessage(data.message);
      setTimeout(() => s.disconnect(), 100);
    });

    s.on('auth_error', (data: { message: string }) => {
      setServerStatusMessage(data.message);
    });

    // Handle initial map load state from server
    s.on('world_init', (data: { self: PlayerState; players: PlayerState[]; sleepingNPCs: PlayerState[] }) => {
      setSelfPlayer(data.self);
      setPlayersList(data.players);
      setNpcsList(data.sleepingNPCs);
    });

    // Listen for incoming dynamic additions or departures to sync lists
    s.on('player_joined', (p: PlayerState) => {
      setPlayersList(prev => {
        if (prev.some(pl => pl.id === p.id)) return prev; // idempotent guard
        return [...prev, p];
      });
    });

    s.on('player_left', (data: { id: string }) => {
      setPlayersList(prev => prev.filter(pl => pl.id !== data.id));
      if (selectedPlayer && selectedPlayer.id === data.id) {
        setSelectedPlayer(null);
      }
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

  const handleUnlockCosmetics = (cosmetics: string[]) => {
    if (selfPlayer) {
      const updated = { ...selfPlayer, cosmetics };
      setSelfPlayer(updated);
      if (socket) {
        socket.updateCosmetics(cosmetics);
      }
    }
  };

  const handleLogout = async () => {
    try {
      const apiBase = import.meta.env.VITE_API_URL || '';
      const token = localStorage.getItem('devgarden_token');
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        headers['X-Session-ID'] = token;
      }
      await fetch(`${apiBase}/api/auth/logout`, { method: 'POST', headers, credentials: 'include' });
      localStorage.removeItem('devgarden_token');
      setSession({ loggedIn: false });
      setSelfPlayer(null);
      setPlayersList([]);
      setNpcsList([]);
      setSelectedPlayer(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleBypassLogin = async () => {
    try {
      const apiBase = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiBase}/api/auth/guest`, { method: 'POST', credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        if (data.token) {
          localStorage.setItem('devgarden_token', data.token);
          await checkAuth();
        }
      }
    } catch (e) {
      console.error('Error bypassing login:', e);
    }
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 font-mono text-slate-500 text-xs">
        <div className="animate-pulse">Locating seed archives...</div>
      </div>
    );
  }

  if (!session.loggedIn) {
    return (
      <div className="h-screen w-screen bg-[var(--color-natural-bg)] text-[var(--color-natural-ink)] flex flex-col antialiased selection:bg-[var(--color-natural-accent)] selection:text-[var(--color-natural-ink)] font-serif overflow-hidden relative">
        {/* Transparent floating logo in top-left corner */}
        <div className="absolute top-6 left-6 z-20 pointer-events-none select-none">
          <img src={LOGO} alt="DevGarden Logo" className="w-[220px] drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)]" />
        </div>

        {/* Discreet Bypass Button in top-right corner */}
        <button
          onClick={handleBypassLogin}
          className="absolute top-4 right-4 z-50 text-[10px] text-amber-950/10 hover:text-amber-950/40 font-mono transition-colors border border-transparent hover:border-amber-950/10 px-2.5 py-1 rounded cursor-pointer select-none"
          title="Bypass Authentication"
        >
          🔑 Bypass
        </button>

        <main className="flex-1 flex flex-col items-center justify-center relative bg-[var(--color-natural-bg)] overflow-hidden">
          <GitHubLogin onSuccess={checkAuth} />
        </main>
      </div>
    );
  }

  // Logged-in full screen game view layout
  return (
    <div className="fixed inset-0 w-screen h-screen bg-slate-950 text-white flex overflow-hidden antialiased font-sans">

      {/* COLLAPSIBLE SIDEBAR */}
      {session.user && (
        <Sidebar
          user={session.user}
          showLeaderboardPanel={showLeaderboardPanel}
          setShowLeaderboardPanel={setShowLeaderboardPanel}
          isNearLeaderboard={isNearLeaderboard}
          onLogout={handleLogout}
          onUnlockCosmetics={handleUnlockCosmetics}
        />
      )}

      {/* FULL VIEWPORT MAIN PORTAL */}
      <main className="relative flex-1 h-full overflow-hidden">
        {serverStatusMessage ? (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/90 z-40 p-4">
            <div className="max-w-md w-full bg-white border-3 border-[var(--color-natural-border)] rounded-2xl p-6 text-center natural-shadow-lg text-[var(--color-natural-ink)]">
              <h2 className="text-lg font-bold text-red-700 mb-2 font-serif">Gardener Connection Interrupted</h2>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">{serverStatusMessage}</p>
              <button
                onClick={() => {
                  setServerStatusMessage(null);
                  checkAuth();
                }}
                className="py-2 px-5 bg-[var(--color-natural-foliage)] hover:bg-[var(--color-natural-foliage)]/90 text-white font-bold text-xs rounded-lg font-mono active:scale-95 transition-all cursor-pointer border-2 border-black/10 shadow-sm"
              >
                Retry Reconnect
              </button>
            </div>
          </div>
        ) : socket && selfPlayer ? (
          <>
            {/* Phaser Game Container (takes absolute inset-0) */}
            <GameContainer
              socket={socket}
              selfPlayer={selfPlayer}
              initialPlayers={playersList}
              initialNPCs={npcsList}
              onSelectPlayer={setSelectedPlayer}
              onNearLeaderboard={setIsNearLeaderboard}
            />

            {/* FLOATING CHAT & EMOTE BAR (Centered at the bottom) */}
            <div className="fixed bottom-4 left-1/2 -translate-x-1/3 z-20 w-[calc(100%-2rem)] max-w-[600px] md:max-w-[650px] pointer-events-auto">
              <EmoteWheel socket={socket} />
            </div>

            {/* LEADERBOARD TREE INTERACTION NOTIFICATION */}
            {isNearLeaderboard && !showLeaderboardPanel && (
              <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-20 bg-[var(--color-natural-accent)] border-2 border-[var(--color-natural-ink)] text-[var(--color-natural-ink)] font-sans font-semibold text-[11px] px-3.5 py-2 rounded-xl shadow-xl animate-bounce backdrop-blur-md flex items-center gap-2">
                <span>🌳</span>
                <span>Stand close to the Leaderboard Tree or click Scoreboard to view!</span>
              </div>
            )}

            {/* OVERLAYS: Scoreboard / Leaderboard Tree Details */}
            {(showLeaderboardPanel || isNearLeaderboard) && (
              <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <Leaderboard onClose={() => setShowLeaderboardPanel(false)} />
              </div>
            )}

            {/* OVERLAYS: Selected Player Profile Panel */}
            {selectedPlayer && (
              <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                <ProfileCard player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 text-slate-400 font-mono text-xs">
            <RefreshCwSpinner className="w-6 h-6 animate-spin mb-3 text-emerald-400" />
            <span>Syncing yard coordinates...</span>
          </div>
        )}
      </main>
    </div>
  );
}

// Inline helper loader icon
function RefreshCwSpinner({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  );
}
