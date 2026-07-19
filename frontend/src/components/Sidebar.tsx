import { useState } from 'react';
import { Trophy, LogOut, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { UserProfile } from '../types.js';

interface SidebarProps {
  user: UserProfile;
  showLeaderboardPanel: boolean;
  setShowLeaderboardPanel: (show: boolean) => void;
  isNearLeaderboard: boolean;
  onLogout: () => void;
}

export default function Sidebar({
  user,
  showLeaderboardPanel,
  setShowLeaderboardPanel,
  isNearLeaderboard,
  onLogout,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-full z-30 flex flex-col bg-[var(--color-natural-foliage)] border-r-4 border-black/15 transition-all duration-300 select-none text-white flex-shrink-0 ${
        collapsed ? 'w-[56px]' : 'w-[200px]'
      }`}
    >
      {/* Sidebar Header / Logo */}
      <div className="p-3 border-b-2 border-white/10 flex items-center justify-between min-h-[52px]">
        {!collapsed && (
          <div className="flex items-center gap-2 animate-fadeIn">
            <div className="w-5 h-5 bg-[var(--color-natural-grass)] border-2 border-white flex-shrink-0 rounded-sm shadow-sm" />
            <h1 className="text-sm font-bold tracking-wider text-white font-serif">
              DevGarden
            </h1>
          </div>
        )}
        {collapsed && (
          <div className="w-5 h-5 bg-[var(--color-natural-grass)] border-2 border-white flex-shrink-0 rounded-sm mx-auto shadow-sm" />
        )}
      </div>

      {/* User Information Pill */}
      <div className="p-3 border-b-2 border-white/10 flex flex-col gap-2.5">
        <div className={`flex items-center gap-2.5 ${collapsed ? 'justify-center' : ''}`}>
          <img
            src={user.avatar_url}
            alt={user.username}
            className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm hover:scale-105 transition-transform"
            referrerPolicy="no-referrer"
          />
          {!collapsed && (
            <div className="flex flex-col min-w-0 animate-fadeIn">
              <span className="text-xs font-bold text-white truncate font-sans">
                {user.username}
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="bg-[var(--color-natural-accent)] text-[var(--color-natural-ink)] px-1 py-0.5 rounded text-[7px] font-extrabold uppercase font-sans tracking-wide">
                  LVL {user.level}
                </span>
                <span className="text-[9px] text-white/70 italic capitalize font-serif truncate max-w-[100px]">
                  {user.title || 'Gardener'}
                </span>
              </div>
            </div>
          )}
        </div>
        
        {/* User Stats Mini Row */}
        {!collapsed && (
          <div className="grid grid-cols-3 gap-0.5 bg-black/15 p-1.5 rounded-lg text-center font-mono text-[8px] text-white/85 animate-fadeIn">
            <div className="flex flex-col">
              <span className="font-extrabold text-[9px] text-[var(--color-natural-accent)]">
                {user.commits}
              </span>
              <span className="text-[7px] opacity-75">Commits</span>
            </div>
            <div className="flex flex-col border-x border-white/10">
              <span className="font-extrabold text-[9px] text-[var(--color-natural-accent)]">
                {user.stars}
              </span>
              <span className="text-[7px] opacity-75">Stars</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-[9px] text-[var(--color-natural-accent)]">
                {user.followers}
              </span>
              <span className="text-[7px] opacity-75">Followers</span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons / Actions */}
      <nav className="flex-1 px-2.5 py-3 flex flex-col gap-1.5">
        {/* Scoreboard Toggle button */}
        <button
          onClick={() => setShowLeaderboardPanel(!showLeaderboardPanel)}
          className={`w-full py-2 px-2.5 rounded-lg border-2 transition-all flex items-center gap-2 font-serif text-[11px] font-bold cursor-pointer select-none ${
            collapsed ? 'justify-center' : ''
          } ${
            showLeaderboardPanel || isNearLeaderboard
              ? 'bg-[var(--color-natural-accent)] border-[var(--color-natural-ink)] text-[var(--color-natural-ink)] natural-shadow-sm scale-[1.01]'
              : 'bg-white/10 border-transparent hover:bg-white/15 text-white'
          }`}
          title="Hall of Fame Scoreboard"
        >
          <Trophy className="w-3.5 h-3.5 flex-shrink-0" />
          {!collapsed && <span className="animate-fadeIn">Scoreboard</span>}
        </button>

        {/* Dynamic proximity tag */}
        {isNearLeaderboard && !collapsed && (
          <div className="mx-1 bg-amber-400/20 border border-amber-300/40 rounded-lg p-1.5 flex items-center gap-1.5 animate-pulse">
            <Sparkles className="w-3 text-amber-300 flex-shrink-0" />
            <span className="text-[8px] font-mono text-amber-100 leading-tight">
              Near Leaderboard Tree!
            </span>
          </div>
        )}
      </nav>

      {/* Sidebar Footer / Collapse + Sign out */}
      <div className="p-2.5 border-t-2 border-white/10 flex flex-col gap-1.5">
        {/* Sign Out Button */}
        <button
          onClick={onLogout}
          className={`w-full py-1.5 px-2.5 rounded-lg flex items-center gap-2 font-sans text-[11px] font-bold transition-all border border-transparent hover:border-red-500/30 hover:bg-red-500/10 text-white/80 hover:text-red-300 cursor-pointer ${
            collapsed ? 'justify-center' : ''
          }`}
          title="Sign Out of Garden"
        >
          <LogOut className="w-3.5 h-3.5 flex-shrink-0" />
          {!collapsed && <span className="animate-fadeIn">Log Out</span>}
        </button>

        {/* Toggle Collapse control */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full mt-0.5 py-1 rounded bg-black/15 hover:bg-black/25 text-white/60 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </div>
    </aside>
  );
}
