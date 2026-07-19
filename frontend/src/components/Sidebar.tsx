import { useState, useEffect } from 'react';
import { Trophy, LogOut, ChevronLeft, ChevronRight, Sparkles, Share2, Star } from 'lucide-react';
import { UserProfile } from '../types.js';
import ShareModal from './ShareModal.js';

interface SidebarProps {
  user: UserProfile;
  showLeaderboardPanel: boolean;
  setShowLeaderboardPanel: (show: boolean) => void;
  isNearLeaderboard: boolean;
  onLogout: () => void;
  onUnlockCosmetics?: (cosmetics: string[]) => void;
}

export default function Sidebar({
  user,
  showLeaderboardPanel,
  setShowLeaderboardPanel,
  isNearLeaderboard,
  onLogout,
  onUnlockCosmetics,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [goldenWater, setGoldenWater] = useState(false);

  useEffect(() => {
    setGoldenWater(localStorage.getItem('devgarden_golden_water') === 'unlocked');
  }, []);

  const handleUnlockGoldenWater = () => {
    window.open('https://github.com/Dani-8/DevGarden', '_blank', 'noopener,noreferrer');
    localStorage.setItem('devgarden_golden_water', 'unlocked');
    setGoldenWater(true);

    // Custom event to let Phaser know immediately
    const event = new CustomEvent('golden_water_unlocked');
    window.dispatchEvent(event);
  };

  return (
    <>
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

        {/* Spread the Seeds viral button */}
        <button
          onClick={() => setIsShareOpen(true)}
          className={`w-full py-2 px-2.5 rounded-lg border-2 transition-all flex items-center gap-2 font-serif text-[11px] font-bold cursor-pointer select-none bg-emerald-600/80 border-emerald-500 hover:bg-emerald-600 hover:border-emerald-400 text-white shadow-sm hover:scale-[1.01] ${
            collapsed ? 'justify-center' : ''
          }`}
          title="Spread the Seeds (Get Rare Cosmetics)"
        >
          <Share2 className="w-3.5 h-3.5 flex-shrink-0" />
          {!collapsed && <span className="animate-fadeIn">Spread Seeds 📢</span>}
        </button>

        {/* Star to Grow Golden Water Widget */}
        {collapsed ? (
          <button
            onClick={handleUnlockGoldenWater}
            className={`w-full py-2 px-2.5 rounded-lg border-2 transition-all flex items-center justify-center cursor-pointer select-none ${
              goldenWater
                ? 'bg-amber-400 border-amber-300 text-slate-900 shadow-[0_0_10px_rgba(251,191,36,0.5)] animate-pulse'
                : 'bg-slate-950/40 border-amber-500/30 text-amber-300 hover:bg-slate-950/60'
            }`}
            title={goldenWater ? "Golden Water Active! (10x growth)" : "Star Repo to Unlock Golden Water (+10x)"}
          >
            <Star className="w-3.5 h-3.5 flex-shrink-0 fill-current text-amber-300" />
          </button>
        ) : (
          <div className={`mt-2 p-3 rounded-xl border-2 flex flex-col gap-2 transition-all relative overflow-hidden ${
            goldenWater
              ? 'bg-gradient-to-br from-amber-500/25 to-yellow-600/10 border-amber-400/80 shadow-[0_0_12px_rgba(251,191,36,0.15)]'
              : 'bg-slate-950/40 border-dashed border-amber-500/30'
          }`}>
            {/* Subtle background glow effect if unlocked */}
            {goldenWater && (
              <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />
            )}
            
            <div className="flex items-center gap-1.5">
              <Star className={`w-4 h-4 flex-shrink-0 text-amber-400 ${goldenWater ? 'fill-current animate-spin' : 'animate-pulse'}`} style={{ animationDuration: goldenWater ? '12s' : '2s' }} />
              <span className="font-serif font-bold text-[11px] text-amber-200 tracking-wide uppercase">
                Golden Water
              </span>
            </div>
            
            <p className="text-[9px] text-slate-300 leading-normal font-sans">
              Nurture the Sprout Tree with **10x growth points** and unlock a spectacular golden trail!
            </p>
            
            <button
              onClick={handleUnlockGoldenWater}
              className={`w-full py-1.5 px-2 rounded-lg text-[10px] font-mono font-bold transition-all border-2 cursor-pointer ${
                goldenWater
                  ? 'bg-amber-400 border-amber-300 text-slate-950 hover:brightness-105 active:scale-98 shadow-sm'
                  : 'bg-slate-950 border-amber-500/50 hover:border-amber-400 text-amber-300 hover:text-white hover:bg-amber-500/10'
              }`}
            >
              {goldenWater ? '✨ Active • 10x Grow ✨' : '⭐ Unlock Golden Water'}
            </button>
          </div>
        )}

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

    {onUnlockCosmetics && (
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        user={user}
        onUnlock={onUnlockCosmetics}
      />
    )}
    </>
  );
}
