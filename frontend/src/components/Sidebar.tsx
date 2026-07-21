import { useState, useEffect } from 'react';
import { Trophy, LogOut, ChevronLeft, ChevronRight, Sparkles, Share2, Star, Hammer } from 'lucide-react';

import Favicon from "../../assets/Favicon.png"
import LOGO from "../../assets/LOGO.png"

import { UserProfile } from '../types.js';
import ShareModal from './ShareModal.js';
import ChallengeModal from './ChallengeModal.js';

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
  const [isChallengeOpen, setIsChallengeOpen] = useState(false);
  const [isGardenKitOpen, setIsGardenKitOpen] = useState(false);

  useEffect(() => {
    const handleStateChange = (e: any) => {
      setIsGardenKitOpen(!!e.detail?.isOpen);
    };
    window.addEventListener('garden-kit-state-changed', handleStateChange);
    return () => window.removeEventListener('garden-kit-state-changed', handleStateChange);
  }, []);

  const handleToggleGardenKit = () => {
    const event = new CustomEvent('toggle-garden-kit');
    window.dispatchEvent(event);
  };

  useEffect(() => {
    const isUnlocked = localStorage.getItem('devgarden_golden_water') === 'unlocked';
    setGoldenWater(isUnlocked);
  }, []);

  const unlockGoldenWaterSuccess = () => {
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
        collapsed ? 'w-[65px]' : 'w-[200px]'
      }`}
    >
      {/* Sidebar Header / Logo */}
      <div className="p-3 border-b-2 border-white/10 min-h-[52px]">
        {!collapsed && (
          <div className={`flex items-center ${collapsed ? 'gap-0' : 'gap-2'} animate-fadeIn`}>
            <img src={Favicon} alt="DevGarden" className="w-8 h-8 object-cover" />
            <img src={LOGO} alt="DevGarden Logo" className="w-[120px] object-cover" />
          </div>
        )}
        {collapsed && (
          <img src={Favicon} alt="DevGarden" className="flex items-center w-9 h-9 object-cover" />
        )}
      </div>

      {/* User Information Pill */}
      <div className="p-3 border-b-2 border-white/10 flex flex-col gap-2.5">
        <div className={`flex items-center gap-2.5 ${collapsed ? 'justify-center' : ''}`}>
          <img
            src={user.avatar_url}
            alt={user.username}
            className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm grayscale sepia hue-rotate-[70deg] saturate-[2.5] brightness-[0.9] contrast-[1.1] opacity-85 hover:filter-none hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer"
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
        {/* Garden Kit Toggle button */}
        <button
          onClick={handleToggleGardenKit}
          className={`w-full py-2 px-2.5 rounded-lg border-2 transition-all flex items-center gap-2 font-serif text-[11px] font-bold cursor-pointer select-none ${
            collapsed ? 'justify-center' : ''
          } ${
            isGardenKitOpen
              ? 'bg-[#e29624] border-[#3a2f28] text-slate-950 scale-[1.01] shadow-md'
              : 'bg-white/10 border-transparent hover:bg-white/15 text-white'
          }`}
          title="Garden Cozy Decoration Kit [K]"
        >
          <Hammer className="w-3.5 h-3.5 flex-shrink-0" />
          {!collapsed && (
            <div className="flex items-center justify-between flex-1">
              <span className="animate-fadeIn">Garden Kit</span>
              <span className="bg-black/25 px-1 py-0.2 rounded text-[8px] font-mono font-bold text-white/70">[K]</span>
            </div>
          )}
        </button>

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
            onClick={() => setIsChallengeOpen(true)}
            className={`w-full py-2 px-2.5 rounded-lg border-2 transition-all flex items-center justify-center cursor-pointer select-none ${
              goldenWater
                ? 'bg-amber-400 border-amber-300 text-slate-900 shadow-[0_0_10px_rgba(251,191,36,0.5)] animate-pulse'
                : 'bg-slate-950/40 border-amber-500/30 text-amber-300 hover:bg-slate-950/60'
            }`}
            title={goldenWater ? "Golden Water Active! (10x growth)" : "Take AI Challenge to Unlock Golden Water (+10x)"}
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
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Star className={`w-4 h-4 flex-shrink-0 text-amber-400 ${goldenWater ? 'fill-current animate-spin' : 'animate-pulse'}`} style={{ animationDuration: goldenWater ? '12s' : '2s' }} />
                <span className="font-serif font-bold text-[11px] text-amber-200 tracking-wide uppercase">
                  Golden Water
                </span>
              </div>
            </div>
            
            {goldenWater ? (
              <>
                <p className="text-[9px] text-amber-200/90 leading-normal font-sans">
                  ✨ Golden Water enabled! Nurture the Sprout Tree with **10x growth points** and enjoy your custom golden water trail!
                </p>
                <div className="w-full py-1 bg-amber-400 text-slate-950 text-center font-mono font-bold text-[9px] rounded-lg">
                  ✨ 10X ACTIVE ✨
                </div>
              </>
            ) : (
              <>
                <p className="text-[9px] text-slate-300 leading-normal font-sans">
                  Nurture the Sprout Tree with **10x growth points** and unlock a spectacular golden trail!
                </p>
                <button
                  onClick={() => setIsChallengeOpen(true)}
                  className="w-full py-1.5 px-2 rounded-lg text-[10px] font-mono font-bold transition-all border-2 cursor-pointer bg-slate-950 border-amber-500/50 hover:border-amber-400 text-amber-300 hover:text-white hover:bg-amber-500/10 flex items-center justify-center gap-1"
                >
                  ⭐ Unlock via Challenge
                </button>
              </>
            )}
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
          className="w-full mt-0.5 py-2 rounded bg-black/15 hover:bg-black/25 text-white/60 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
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

    {isChallengeOpen && (
      <ChallengeModal
        onClose={() => setIsChallengeOpen(false)}
        onSuccess={unlockGoldenWaterSuccess}
      />
    )}
    </>
  );
}
