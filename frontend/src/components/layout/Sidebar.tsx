import { useState, useEffect } from 'react';
import { Trophy, LogOut, ChevronLeft, ChevronRight, Sparkles, Share2, Star, Hammer, BookOpen } from 'lucide-react';

import Favicon from "../../../assets/Favicon.png";
import LOGO from "../../../assets/LOGO.png";

import { UserProfile } from '../../types/index.js';
import ShareModal from '../modals/ShareModal.js';
import ChallengeModal from '../modals/ChallengeModal.js';
import GuideModal from '../modals/GuideModal.js';

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
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'sunset' | 'night'>('day');

  useEffect(() => {
    const updateTime = () => {
      const hours = new Date().getHours();
      if (hours >= 7 && hours < 17) {
        setTimeOfDay('day');
      } else if (hours >= 17 && hours < 19.5) {
        setTimeOfDay('sunset');
      } else {
        setTimeOfDay('night');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const theme = {
    day: {
      asideBg: 'bg-[#faf6eb] border-[#3a2f28] text-[#3a2f28]',
      cardBg: 'bg-[#e3d8c1]/35 border-[#3a2f28]/10 text-[#3a2f28]',
      textPrimary: 'text-[#3a2f28]',
      textSecondary: 'text-[#514339]/80',
      textAccent: 'text-amber-900',
      btnSecondary: 'bg-[#e3d8c1]/40 border-[#3a2f28]/15 hover:bg-[#e3d8c1]/75 text-[#3a2f28]',
      borderDivider: 'border-[#3a2f28]/10'
    },
    sunset: {
      asideBg: 'bg-[#2d221a] border-[#5a4232] text-[#faede1]',
      cardBg: 'bg-[#3d2f25]/80 border-[#6b503d]/40 text-[#faede1]',
      textPrimary: 'text-[#faede1]',
      textSecondary: 'text-[#d6c4b5]',
      textAccent: 'text-amber-300',
      btnSecondary: 'bg-[#3d2f25] border-[#6b503d]/50 hover:bg-[#4d3c2f] text-[#faede1]',
      borderDivider: 'border-[#5a4232]/50'
    },
    night: {
      asideBg: 'bg-[#1c1510] border-[#382a20] text-[#eee3d5]',
      cardBg: 'bg-[#281e17]/90 border-[#4a372a]/50 text-[#eee3d5]',
      textPrimary: 'text-[#eee3d5]',
      textSecondary: 'text-[#b8a798]',
      textAccent: 'text-amber-300',
      btnSecondary: 'bg-[#281e17] border-[#4a372a]/60 hover:bg-[#382a20] text-[#eee3d5]',
      borderDivider: 'border-[#382a20]/60'
    }
  }[timeOfDay];

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

    const event = new CustomEvent('golden_water_unlocked');
    window.dispatchEvent(event);
  };

  return (
    <>
      <aside
        className={`h-full z-30 flex flex-col ${theme.asideBg} border-r-4 transition-all duration-500 select-none flex-shrink-0 ${collapsed ? 'w-[65px]' : 'w-[200px]'
          }`}
      >
        <div className={`p-3 border-b-2 ${theme.borderDivider} min-h-[52px]`}>
          {!collapsed && (
            <div className={`flex items-center ${collapsed ? 'gap-0' : 'gap-2'} animate-fadeIn`}>
              <img src={Favicon} alt="DevGarden" className="w-8 h-8 object-cover" />
              <img src={LOGO} alt="DevGarden Logo" className={`w-[120px] object-cover ${timeOfDay !== 'day' ? 'brightness-125 contrast-125' : ''}`} />
            </div>
          )}
          {collapsed && (
            <img src={Favicon} alt="DevGarden" className="flex items-center w-9 h-9 object-cover" />
          )}
        </div>

        <div className={`p-3 border-b-2 ${theme.borderDivider} flex flex-col gap-2.5`}>
          <div className={`flex items-center gap-2.5 ${collapsed ? 'justify-center' : ''}`}>
            <img
              src={user.avatar_url}
              alt={user.username}
              className="w-8 h-8 rounded-full border-2 border-[#947866] object-cover shadow-sm grayscale sepia hue-rotate-[70deg] saturate-[2.5] brightness-[0.9] contrast-[1.1] opacity-85 hover:filter-none hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer"
              referrerPolicy="no-referrer"
            />
            {!collapsed && (
              <div className="flex flex-col min-w-0 animate-fadeIn">
                <span className={`text-xs font-bold ${theme.textPrimary} truncate font-sans`}>
                  {user.username}
                </span>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="bg-[#ffae34] border border-[#3a2f28]/25 text-[#3a2f28] px-1 py-0.5 rounded text-[7px] font-extrabold uppercase font-sans tracking-wide">
                    LVL {user.level}
                  </span>
                  <span className={`text-[9px] ${theme.textSecondary} italic capitalize font-serif truncate max-w-[100px]`}>
                    {user.title || 'Gardener'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {!collapsed && (
            <div className={`grid grid-cols-3 gap-0.5 ${theme.cardBg} p-1.5 rounded-lg border text-center font-mono text-[8px] animate-fadeIn transition-colors duration-500`}>
              <div className="flex flex-col">
                <span className={`font-extrabold text-[9px] ${theme.textAccent}`}>
                  {user.commits}
                </span>
                <span className="text-[7px] opacity-75">Commits</span>
              </div>
              <div className={`flex flex-col border-x ${theme.borderDivider}`}>
                <span className={`font-extrabold text-[9px] ${theme.textAccent}`}>
                  {user.stars}
                </span>
                <span className="text-[7px] opacity-75">Stars</span>
              </div>
              <div className="flex flex-col">
                <span className={`font-extrabold text-[9px] ${theme.textAccent}`}>
                  {user.followers}
                </span>
                <span className="text-[7px] opacity-75">Followers</span>
              </div>
            </div>
          )}
        </div>

        <nav className="flex-1 px-2.5 py-3 flex flex-col gap-1.5">
          <button
            onClick={() => setIsGuideOpen(true)}
            className={`w-full py-2 px-2.5 rounded-lg border-2 transition-all flex items-center gap-2 font-serif text-[11px] font-bold cursor-pointer select-none ${collapsed ? 'justify-center' : ''
              } bg-[#ffae34] border-[#3a2f28] text-[#3a2f28] shadow-sm hover:scale-[1.01]`}
            title="Visitor Guide & Controls"
          >
            <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
            {!collapsed && <span className="animate-fadeIn">Guide & Controls</span>}
          </button>

          <button
            onClick={handleToggleGardenKit}
            className={`w-full py-2 px-2.5 rounded-lg border-2 transition-all flex items-center gap-2 font-serif text-[11px] font-bold cursor-pointer select-none ${collapsed ? 'justify-center' : ''
              } ${isGardenKitOpen
                ? 'bg-[#e29624] border-[#3a2f28] text-slate-950 scale-[1.01] shadow-md'
                : theme.btnSecondary
              }`}
            title="Garden Cozy Decoration Kit [K]"
          >
            <Hammer className="w-3.5 h-3.5 flex-shrink-0" />
            {!collapsed && (
              <div className="flex items-center justify-between flex-1">
                <span className="animate-fadeIn">Garden Kit</span>
                <span className="bg-black/10 px-1 py-0.2 rounded text-[8px] font-mono font-bold opacity-75">[K]</span>
              </div>
            )}
          </button>

          <button
            onClick={() => setShowLeaderboardPanel(!showLeaderboardPanel)}
            className={`w-full py-2 px-2.5 rounded-lg border-2 transition-all flex items-center gap-2 font-serif text-[11px] font-bold cursor-pointer select-none ${collapsed ? 'justify-center' : ''
              } ${showLeaderboardPanel || isNearLeaderboard
                ? 'bg-[#ffae34] border-[#3a2f28] text-[#3a2f28] scale-[1.01] shadow-md'
                : theme.btnSecondary
              }`}
            title="Hall of Fame Scoreboard"
          >
            <Trophy className="w-3.5 h-3.5 flex-shrink-0" />
            {!collapsed && <span className="animate-fadeIn">Scoreboard</span>}
          </button>

          <button
            onClick={() => setIsShareOpen(true)}
            className={`w-full py-2 px-2.5 rounded-lg border-2 transition-all flex items-center gap-2 font-serif text-[11px] font-bold cursor-pointer select-none bg-emerald-700/90 border-[#3a2f28] hover:bg-emerald-800 text-white shadow-sm hover:scale-[1.01] ${collapsed ? 'justify-center' : ''
              }`}
            title="Spread the Seeds (Get Rare Cosmetics)"
          >
            <Share2 className="w-3.5 h-3.5 flex-shrink-0" />
            {!collapsed && <span className="animate-fadeIn">Spread Seeds 📢</span>}
          </button>

          {collapsed ? (
            <button
              onClick={() => setIsChallengeOpen(true)}
              className={`w-full py-2 px-2.5 rounded-lg border-2 transition-all flex items-center justify-center cursor-pointer select-none ${goldenWater
                  ? 'bg-amber-400 border-[#3a2f28] text-slate-900 shadow-sm animate-pulse'
                  : theme.btnSecondary
                }`}
              title={goldenWater ? "Golden Water Active! (10x growth)" : "Take AI Challenge to Unlock Golden Water (+10x)"}
            >
              <Star className="w-3.5 h-3.5 flex-shrink-0 fill-current text-amber-500" />
            </button>
          ) : (
            <div className={`mt-2 p-3 rounded-xl border-2 flex flex-col gap-2 transition-all relative overflow-hidden ${goldenWater
                ? 'bg-gradient-to-br from-amber-500/20 to-yellow-600/10 border-amber-500/50 shadow-sm'
                : `${theme.cardBg} border-dashed`
              }`}>
              {goldenWater && (
                <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Star className={`w-4 h-4 flex-shrink-0 text-amber-500 ${goldenWater ? 'fill-current animate-spin' : 'animate-pulse'}`} style={{ animationDuration: goldenWater ? '12s' : '2s' }} />
                  <span className={`font-serif font-bold text-[11px] ${theme.textAccent} tracking-wide uppercase`}>
                    Golden Water
                  </span>
                </div>
              </div>

              {goldenWater ? (
                <>
                  <p className={`text-[9px] ${theme.textSecondary} leading-normal font-sans`}>
                    ✨ Golden Water enabled! Nurture the Sprout Tree with **10x growth points** and enjoy your custom golden water trail!
                  </p>
                  <div className="w-full py-1 bg-amber-400 text-slate-950 text-center font-mono font-bold text-[9px] border-2 border-[#3a2f28] rounded-lg shadow-sm">
                    ✨ 10X ACTIVE ✨
                  </div>
                </>
              ) : (
                <>
                  <p className={`text-[9px] ${theme.textSecondary} leading-normal font-sans`}>
                    Nurture the Sprout Tree with **10x growth points** and unlock a spectacular golden trail!
                  </p>
                  <button
                    onClick={() => setIsChallengeOpen(true)}
                    className="w-full py-1.5 px-2 rounded-lg text-[10px] font-mono font-bold transition-all border-2 cursor-pointer bg-[#3a2f28] border-[#3a2f28] hover:bg-[#514339] text-white flex items-center justify-center gap-1"
                  >
                    ⭐ Unlock via Challenge
                  </button>
                </>
              )}
            </div>
          )}

          {isNearLeaderboard && !collapsed && (
            <div className="mx-1 bg-[#ffae34]/20 border border-[#ffae34]/40 rounded-lg p-1.5 flex items-center gap-1.5 animate-pulse">
              <Sparkles className="w-3 text-amber-500 flex-shrink-0" />
              <span className={`text-[8px] font-mono ${theme.textPrimary} leading-tight`}>
                Near Leaderboard Tree!
              </span>
            </div>
          )}
        </nav>

        <div className={`p-2.5 border-t-2 ${theme.borderDivider} flex flex-col gap-1.5`}>
          <button
            onClick={onLogout}
            className={`w-full py-1.5 px-2.5 rounded-lg flex items-center gap-2 font-sans text-[11px] font-bold transition-all border border-transparent hover:border-red-600/30 hover:bg-red-500/10 ${theme.textSecondary} hover:text-red-400 cursor-pointer ${collapsed ? 'justify-center' : ''
              }`}
            title="Sign Out of Garden"
          >
            <LogOut className="w-3.5 h-3.5 flex-shrink-0" />
            {!collapsed && <span className="animate-fadeIn">Log Out</span>}
          </button>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`w-full mt-0.5 py-2 rounded ${theme.btnSecondary} flex items-center justify-center transition-colors cursor-pointer`}
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

      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </>
  );
}
