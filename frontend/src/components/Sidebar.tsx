import { useState, useEffect } from 'react';
import { Trophy, LogOut, ChevronLeft, ChevronRight, Sparkles, Share2, Star, Loader2, Check, AlertCircle, ExternalLink } from 'lucide-react';
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
  const [verifying, setVerifying] = useState<'idle' | 'opened' | 'checking' | 'failed'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const isUnlocked = localStorage.getItem('devgarden_golden_water') === 'unlocked';
    setGoldenWater(isUnlocked);

    if (isUnlocked) {
      const verifyStillStarred = async () => {
        const isGuest = user.username.toLowerCase().startsWith('guest');
        if (isGuest) return;

        try {
          const stillStarred = await checkGitHubStar(user.username);
          if (!stillStarred) {
            localStorage.removeItem('devgarden_golden_water');
            setGoldenWater(false);
            
            // Dispatch golden_water_locked custom event
            const event = new CustomEvent('golden_water_locked');
            window.dispatchEvent(event);
          }
        } catch (err) {
          console.warn('Could not verify still starred status:', err);
        }
      };

      const timer = setTimeout(verifyStillStarred, 3000);
      return () => clearTimeout(timer);
    }
  }, [user.username]);

  const checkGitHubStar = async (username: string): Promise<boolean> => {
    try {
      // Attempt 1: Fetch stargazers list of the repo
      const stargazersRes = await fetch('https://api.github.com/repos/Dani-8/DevGarden/stargazers?per_page=100');
      if (stargazersRes.ok) {
        const stargazers = await stargazersRes.json() as Array<{ login: string }>;
        const hasStarred = stargazers.some(s => s.login?.toLowerCase() === username.toLowerCase());
        if (hasStarred) return true;
      }
    } catch (err) {
      console.warn('Error checking stargazers:', err);
    }

    try {
      // Attempt 2: Fetch user's starred repos list
      const starredRes = await fetch(`https://api.github.com/users/${username}/starred?per_page=100`);
      if (starredRes.ok) {
        const starred = await starredRes.json() as Array<{ full_name: string }>;
        const hasStarred = starred.some(r => r.full_name?.toLowerCase() === 'dani-8/devgarden');
        if (hasStarred) return true;
      }
    } catch (err) {
      console.warn('Error checking user starred:', err);
    }

    return false;
  };

  const handleUnlockGoldenWater = () => {
    window.open('https://github.com/Dani-8/DevGarden', '_blank', 'noopener,noreferrer');
    setVerifying('opened');
    setErrorMessage(null);
  };

  const handleVerifyStar = async () => {
    setVerifying('checking');
    setErrorMessage(null);

    // Check if user is a guest
    const isGuest = user.username.toLowerCase().startsWith('guest');
    if (isGuest) {
      setTimeout(() => {
        unlockGoldenWaterSuccess();
      }, 800);
      return;
    }

    try {
      const hasStarred = await checkGitHubStar(user.username);
      if (hasStarred) {
        unlockGoldenWaterSuccess();
      } else {
        setVerifying('failed');
        setErrorMessage("Star not found. Click 'Star' on GitHub, wait a moment, then retry!");
      }
    } catch (err) {
      console.error(err);
      setVerifying('failed');
      setErrorMessage("Network issue checking star. Try again, or use manual bypass below!");
    }
  };

  const handleBypassVerify = () => {
    unlockGoldenWaterSuccess();
  };

  const unlockGoldenWaterSuccess = () => {
    localStorage.setItem('devgarden_golden_water', 'unlocked');
    setGoldenWater(true);
    setVerifying('idle');
    setErrorMessage(null);

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
            onClick={goldenWater ? undefined : handleUnlockGoldenWater}
            className={`w-full py-2 px-2.5 rounded-lg border-2 transition-all flex items-center justify-center cursor-pointer select-none ${
              goldenWater
                ? 'bg-amber-400 border-amber-300 text-slate-900 shadow-[0_0_10px_rgba(251,191,36,0.5)] animate-pulse'
                : verifying !== 'idle'
                ? 'bg-amber-500/80 border-amber-400 text-slate-900 animate-bounce'
                : 'bg-slate-950/40 border-amber-500/30 text-amber-300 hover:bg-slate-950/60'
            }`}
            title={
              goldenWater 
                ? "Golden Water Active! (10x growth)" 
                : verifying !== 'idle'
                ? "Verify Star (Expand sidebar!)"
                : "Star Repo to Unlock Golden Water (+10x)"
            }
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
              {verifying !== 'idle' && (
                <button 
                  onClick={() => { setVerifying('idle'); setErrorMessage(null); }}
                  className="text-[9px] text-slate-400 hover:text-white font-mono"
                  title="Cancel verification"
                >
                  Cancel
                </button>
              )}
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
            ) : verifying === 'idle' ? (
              <>
                <p className="text-[9px] text-slate-300 leading-normal font-sans">
                  Nurture the Sprout Tree with **10x growth points** and unlock a spectacular golden trail!
                </p>
                <button
                  onClick={handleUnlockGoldenWater}
                  className="w-full py-1.5 px-2 rounded-lg text-[10px] font-mono font-bold transition-all border-2 cursor-pointer bg-slate-950 border-amber-500/50 hover:border-amber-400 text-amber-300 hover:text-white hover:bg-amber-500/10 flex items-center justify-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  ⭐ Star Repo to Unlock
                </button>
              </>
            ) : verifying === 'opened' ? (
              <>
                <p className="text-[9px] text-amber-200 leading-normal font-sans">
                  1. GitHub repo opened in new tab.
                  <br />
                  2. Click **Star** ⭐ on GitHub.
                  <br />
                  3. Click below to verify!
                </p>
                <button
                  onClick={handleVerifyStar}
                  className="w-full py-1.5 px-2 rounded-lg text-[10px] font-mono font-bold transition-all border-2 cursor-pointer bg-amber-400 border-amber-300 text-slate-950 hover:brightness-105 active:scale-98 flex items-center justify-center gap-1"
                >
                  🔍 Verify My Star
                </button>
              </>
            ) : verifying === 'checking' ? (
              <>
                <p className="text-[9px] text-slate-300 leading-normal font-sans text-center">
                  Connecting to GitHub API to check star status...
                </p>
                <div className="flex items-center justify-center py-1">
                  <Loader2 className="w-5 h-5 text-amber-400 animate-spin" />
                </div>
              </>
            ) : (
              <>
                {errorMessage && (
                  <p className="text-[8px] text-red-400 leading-tight font-sans">
                    {errorMessage}
                  </p>
                )}
                <div className="flex flex-col gap-1 mt-1">
                  <button
                    onClick={handleVerifyStar}
                    className="w-full py-1.5 px-2 rounded-lg text-[10px] font-mono font-bold transition-all border-2 cursor-pointer bg-amber-500/20 border-amber-500/40 text-amber-300 hover:bg-amber-500/30 flex items-center justify-center gap-1"
                  >
                    🔄 Retry Check
                  </button>
                  <button
                    onClick={handleBypassVerify}
                    className="w-full py-1 bg-transparent hover:bg-white/5 text-slate-400 hover:text-slate-300 text-[8px] font-mono rounded"
                  >
                    I starred it! (Direct Bypass)
                  </button>
                </div>
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
