import { useState, useEffect } from 'react';
import { SupabaseSocket } from './SupabaseSocket.js';
import { Github, Trophy, LogOut, Sparkles, User, HelpCircle } from 'lucide-react';

import { PlayerState, UserProfile } from './types.js';
import GitHubLogin from './components/GitHubLogin.js';
import GameContainer from './game/GameContainer.js';
import EmoteWheel from './components/EmoteWheel.js';
import ProfileCard from './components/ProfileCard.js';
import Leaderboard from './components/Leaderboard.js';

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

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 font-mono text-slate-500 text-xs">
        <div className="animate-pulse">Locating seed archives...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-natural-bg)] text-[var(--color-natural-ink)] flex flex-col antialiased selection:bg-[var(--color-natural-accent)] selection:text-[var(--color-natural-ink)] font-serif">
      
      {/* HEADER HUD BAR */}
      <header className="w-full bg-[var(--color-natural-foliage)] border-b-4 border-black/10 px-6 h-[60px] flex items-center justify-between sticky top-0 z-40 select-none text-white">
        
        {/* App Title */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[var(--color-natural-grass)] border-[3px] border-white flex-shrink-0" />
          <div>
            <h1 className="text-lg font-bold tracking-wider text-white font-serif">
              DevGarden
            </h1>
          </div>
        </div>

        {/* Right Actions / Login Details */}
        <div className="flex items-center gap-4">
          {session.loggedIn && session.user && (
            <div className="flex items-center gap-3">
              {/* User Pill */}
              <div className="hidden sm:flex bg-black/20 px-3 py-1 rounded-full items-center gap-2.5 font-sans text-xs">
                <img
                  src={session.user.avatar_url}
                  alt={session.user.username}
                  className="w-5 h-5 rounded-full border border-white object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="text-white font-bold">{session.user.username}</span>
                <span className="bg-[var(--color-natural-accent)] text-[var(--color-natural-ink)] px-1.5 py-0.2 rounded font-bold text-[9px] uppercase">
                  LVL {session.user.level}
                </span>
              </div>

              <div className="h-4 w-[1px] bg-white/20 hidden sm:block" />

              {/* Hall of Fame Scoreboard Toggle */}
              <button
                onClick={() => setShowLeaderboardPanel(!showLeaderboardPanel)}
                className={`py-1.5 px-3 rounded-lg border-2 transition-all flex items-center gap-1.5 font-serif text-xs font-bold cursor-pointer ${
                  showLeaderboardPanel || isNearLeaderboard
                    ? 'bg-[var(--color-natural-accent)] border-[var(--color-natural-ink)] text-[var(--color-natural-ink)] natural-shadow-sm'
                    : 'bg-white border-[var(--color-natural-border)] hover:border-[var(--color-natural-ink)] text-[var(--color-natural-ink)] hover:bg-[var(--color-natural-bg)]'
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Scoreboard</span>
              </button>

              {/* Signout action */}
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg bg-white border-2 border-[var(--color-natural-border)] hover:border-red-700/60 hover:bg-red-50 text-[var(--color-natural-ink)] hover:text-red-600 transition-all cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* MAIN GAME VIEW */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 relative bg-[var(--color-natural-bg)]">
        {!session.loggedIn ? (
          <GitHubLogin onSuccess={checkAuth} />
        ) : serverStatusMessage ? (
          <div className="max-w-md w-full bg-white border-3 border-[var(--color-natural-border)] rounded-2xl p-6 text-center natural-shadow-lg font-sans text-[var(--color-natural-ink)]">
            <h2 className="text-lg font-bold text-red-700 mb-2 font-serif">Gardener Connection Interrupted</h2>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">{serverStatusMessage}</p>
            <button
              onClick={() => {
                setServerStatusMessage(null);
                checkAuth();
              }}
              className="py-2 px-5 bg-[var(--color-natural-foliage)] hover:bg-[var(--color-natural-foliage)]/90 text-white font-bold text-xs rounded-lg font-mono active:scale-95 transition-all cursor-pointer border-2 border-black/10"
            >
              Retry Reconnect
            </button>
          </div>
        ) : socket && selfPlayer ? (
          <div className="flex flex-col items-center w-full relative">
            {/* Phaser Game container */}
            <GameContainer
              socket={socket}
              selfPlayer={selfPlayer}
              initialPlayers={playersList}
              initialNPCs={npcsList}
              onSelectPlayer={setSelectedPlayer}
              onNearLeaderboard={setIsNearLeaderboard}
            />

            {/* Chat hotbar and Emote dock */}
            <EmoteWheel socket={socket} />

            {/* Hall of Fame scoreboard overlay (toggled or when user walks up to tree) */}
            {(showLeaderboardPanel || isNearLeaderboard) && (
              <Leaderboard onClose={() => setShowLeaderboardPanel(false)} />
            )}

            {/* Proximity notice alert */}
            {isNearLeaderboard && !showLeaderboardPanel && (
              <div className="absolute top-16 bg-[var(--color-natural-accent)] border-2 border-[var(--color-natural-ink)] text-[var(--color-natural-ink)] font-mono text-[10px] px-3 py-1.5 rounded-lg shadow-xl animate-bounce backdrop-blur-md">
                🌳 Press Scoreboard button or stand close to view Hall of Fame!
              </div>
            )}

            {/* Clicked Avatar profile stats cards */}
            {selectedPlayer && (
              <ProfileCard player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
            )}
          </div>
        ) : (
          <div className="text-center py-20 font-mono text-xs text-slate-500">
            <RefreshCwSpinner className="w-6 h-6 animate-spin mx-auto mb-2 text-slate-400" />
            Initializing lawn coordinates...
          </div>
        )}
      </main>

      {/* BOTTOM FOOTER CREDITS */}
      <footer className="w-full bg-[var(--color-natural-bg)] py-4 px-6 border-t-4 border-[var(--color-natural-border)] text-center select-none mt-auto">
        <p className="text-xs font-serif text-slate-600">
          DevGarden © 2026 • Connected to Natural Tones Oasis
        </p>
      </footer>
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
