import { useState, useEffect } from 'react';
import { Trophy, Sparkles, Share2, Hammer, BookOpen } from 'lucide-react';

import { UserProfile } from '../../types/index.js';
import ShareModal from '../modals/ShareModal.js';
import ChallengeModal from '../modals/ChallengeModal.js';
import GuideModal from '../modals/GuideModal.js';

import SidebarHeader from './sidebar/SidebarHeader.js';
import UserProfileCard from './sidebar/UserProfileCard.js';
import SidebarNav, { NavItem } from './sidebar/SidebarNav.js';
import GoldenWaterCard from './sidebar/GoldenWaterCard.js';
import SidebarFooter from './sidebar/SidebarFooter.js';

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
      btnChallenge: 'bg-amber-600 border-amber-700 hover:bg-amber-500 text-white',
      borderDivider: 'border-[#3a2f28]/10',
    },
    sunset: {
      asideBg: 'bg-[#f6ebd6] border-[#4a3a2e] text-[#3a2f28]',
      cardBg: 'bg-[#ebd8bd]/60 border-[#4a3a2e]/20 text-[#3a2f28]',
      textPrimary: 'text-[#3a2f28]',
      textSecondary: 'text-[#514339]',
      textAccent: 'text-amber-800',
      btnSecondary: 'bg-[#ebd8bd]/70 border-[#4a3a2e]/20 hover:bg-[#e4cfb2] text-[#3a2f28]',
      btnChallenge: 'bg-orange-700 border-orange-800 hover:bg-orange-600 text-white',
      borderDivider: 'border-[#4a3a2e]/15',
    },
    night: {
      asideBg: 'bg-[#e8edf5] border-[#2c3e50]/20 text-[#2c3e50]',
      cardBg: 'bg-[#d5e0ea]/50 border-[#2c3e50]/15 text-[#2c3e50]',
      textPrimary: 'text-[#2c3e50]',
      textSecondary: 'text-[#4a607a]',
      textAccent: 'text-indigo-900',
      btnSecondary: 'bg-[#d5e0ea]/60 border-[#2c3e50]/15 hover:bg-[#c6d7e6] text-[#2c3e50]',
      btnChallenge: 'bg-sky-700 border-sky-800 hover:bg-sky-600 text-white',
      borderDivider: 'border-[#2c3e50]/15',
    },
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

  const navItems: NavItem[] = [
    {
      id: 'guide',
      icon: BookOpen,
      label: 'Guide & Controls',
      title: 'Visitor Guide & Controls',
      onClick: () => setIsGuideOpen(true),
      className:
        'bg-[#ffae34] border-[#a96d00] text-[#3a2f28] shadow-sm hover:scale-[1.01] hover:border-[#8a5400] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c47a00]/60',
    },
    {
      id: 'garden-kit',
      icon: Hammer,
      label: 'Garden Kit',
      title: 'Garden Cozy Decoration Kit [K]',
      onClick: handleToggleGardenKit,
      shortcut: '[K]',
      className: isGardenKitOpen
        ? 'bg-[#e29624] border-[#3a2f28] text-slate-950 scale-[1.01] shadow-md'
        : theme.btnSecondary,
    },
    {
      id: 'scoreboard',
      icon: Trophy,
      label: 'Scoreboard',
      title: 'Hall of Fame Scoreboard',
      onClick: () => setShowLeaderboardPanel(!showLeaderboardPanel),
      className:
        showLeaderboardPanel || isNearLeaderboard
          ? 'bg-[#ffae34] border-[#3a2f28] text-[#3a2f28] scale-[1.01] shadow-md'
          : theme.btnSecondary,
    },
    {
      id: 'spread-seeds',
      icon: Share2,
      label: 'Spread Seeds 📢',
      title: 'Spread the Seeds (Get Rare Cosmetics)',
      onClick: () => setIsShareOpen(true),
      className:
        'bg-emerald-700/90 border-emerald-900/80 hover:bg-emerald-800 hover:border-emerald-950 text-white shadow-sm hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60',
    },
  ];

  return (
    <>
      <aside
        className={`h-full z-30 flex flex-col ${theme.asideBg} border-r-4 transition-all duration-500 select-none flex-shrink-0 ${collapsed ? 'w-[65px]' : 'w-[200px]'
          }`}
      >
        <SidebarHeader collapsed={collapsed} borderDivider={theme.borderDivider} timeOfDay={timeOfDay} />

        <UserProfileCard user={user} collapsed={collapsed} theme={theme} />

        <nav className="flex-1 px-2.5 py-3 flex flex-col gap-1.5">
          <SidebarNav items={navItems} collapsed={collapsed} />

          <GoldenWaterCard
            collapsed={collapsed}
            goldenWater={goldenWater}
            onOpenChallenge={() => setIsChallengeOpen(true)}
            theme={theme}
          />

          {isNearLeaderboard && !collapsed && (
            <div className="mx-1 bg-[#ffae34]/20 border border-[#ffae34]/40 rounded-lg p-1.5 flex items-center gap-1.5 animate-pulse">
              <Sparkles className="w-3 text-amber-500 flex-shrink-0" />
              <span className={`text-[8px] font-mono ${theme.textPrimary} leading-tight`}>
                Near Leaderboard Tree!
              </span>
            </div>
          )}
        </nav>

        <SidebarFooter
          collapsed={collapsed}
          onLogout={onLogout}
          onToggleCollapse={() => setCollapsed(!collapsed)}
          theme={theme}
        />
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

      {isGuideOpen && <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />}
    </>
  );
}
