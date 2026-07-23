import { X, Github, Award, Star, Flame, Users, FolderGit } from 'lucide-react';
import { PlayerState } from '../../types/index';

interface ProfileCardProps {
  player: PlayerState;
  onClose: () => void;
}

export default function ProfileCard({ player, onClose }: ProfileCardProps) {
  const themes: Record<string, {
    border: string;
    text: string;
    badge: string;
  }> = {
    green: {
      border: 'border-[var(--color-natural-border)]',
      text: 'text-[var(--color-natural-foliage)]',
      badge: 'bg-[var(--color-natural-grass)]/20 border-[var(--color-natural-border)]/40 text-[var(--color-natural-foliage)]',
    },
    blue: {
      border: 'border-blue-300',
      text: 'text-blue-700',
      badge: 'bg-blue-50 border-blue-200 text-blue-700',
    },
    purple: {
      border: 'border-purple-300',
      text: 'text-purple-700',
      badge: 'bg-purple-50 border-purple-200 text-purple-700',
    },
    crimson: {
      border: 'border-rose-300',
      text: 'text-rose-700',
      badge: 'bg-rose-50 border-rose-200 text-rose-700',
    },
    cosmic: {
      border: 'border-[var(--color-natural-ink)]',
      text: 'text-[var(--color-natural-ink)]',
      badge: 'bg-[var(--color-natural-accent)] border-[var(--color-natural-ink)] text-[var(--color-natural-ink)] font-bold animate-pulse',
    },
  };

  const theme = themes[player.visual_tier] || themes.green;

  const currentLevelMinScore = Math.floor(5 * Math.pow(player.level - 1, 2));
  const nextLevelMinScore = Math.floor(5 * Math.pow(player.level, 2));
  const scoreInLevel = player.score - currentLevelMinScore;
  const totalScoreNeededInLevel = nextLevelMinScore - currentLevelMinScore;
  const progressPercent = player.level >= 50 ? 100 : Math.max(0, Math.min(100, (scoreInLevel / (totalScoreNeededInLevel || 1)) * 100));

  return (
    <div className="absolute bottom-4 right-4 z-50 w-80 rounded-2xl border-3 border-[var(--color-natural-border)] bg-white flex flex-col overflow-hidden animate-slide-up text-[var(--color-natural-ink)] font-sans natural-shadow-lg">
      <div className="flex items-center justify-between p-4 border-b-2 border-[var(--color-natural-border)]/45 bg-[var(--color-natural-bg)]">
        <div className="flex items-center gap-1.5">
          <Award className={`w-4 h-4 text-[var(--color-natural-foliage)]`} />
          <span className="text-xs font-serif text-[var(--color-natural-ink)] font-bold uppercase tracking-wider">Developer Badge</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-[var(--color-natural-border)]/20 text-slate-500 hover:text-[var(--color-natural-ink)] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5 flex flex-col items-center text-center">
        <div className="relative mb-3.5 p-1 rounded-2xl border-2 border-[var(--color-natural-border)] bg-[var(--color-natural-bg)]">
          <img
            src={player.avatar_url || 'https://github.com/identicons/guest.png'}
            alt={player.username}
            className="w-16 h-16 rounded-xl object-cover grayscale sepia hue-rotate-[70deg] saturate-[2.5] brightness-[0.9] contrast-[1.1] opacity-85 hover:filter-none hover:opacity-100 transition-all duration-300 cursor-pointer"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-2 -right-2 bg-[var(--color-natural-accent)] border-2 border-[var(--color-natural-ink)] px-1.5 py-0.5 rounded-md text-[9px] font-mono font-bold text-[var(--color-natural-ink)] shadow-sm">
            Lvl {player.level}
          </div>
        </div>

        <h3 className="text-lg font-bold text-[var(--color-natural-ink)] leading-tight font-serif">
          {player.username}
        </h3>
        <p className={`text-[10px] font-sans font-semibold mt-1 px-2.5 py-0.5 rounded-full border ${theme.badge}`}>
          {player.title}
        </p>

        <div className="w-full mt-5">
          <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 mb-1">
            <span>Score: {player.score}</span>
            <span>{player.level >= 50 ? 'Max Level' : `Lvl ${player.level + 1} (${nextLevelMinScore} pts)`}</span>
          </div>
          <div className="w-full h-2.5 bg-[var(--color-natural-bg)] border-2 border-[var(--color-natural-border)]/60 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--color-natural-grass)] to-[var(--color-natural-foliage)] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 w-full mt-5 text-left font-mono text-xs">
          <div className="p-2.5 rounded-xl bg-[var(--color-natural-bg)] border-2 border-[var(--color-natural-border)]/40 flex flex-col gap-0.5">
            <span className="text-[10px] text-slate-500 uppercase flex items-center gap-1 font-mono">
              <Flame className="w-3 h-3 text-orange-600" /> Commits
            </span>
            <span className="text-sm font-bold text-[var(--color-natural-ink)] font-mono">
              {player.commits !== undefined ? player.commits : 0}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-[var(--color-natural-bg)] border-2 border-[var(--color-natural-border)]/40 flex flex-col gap-0.5">
            <span className="text-[10px] text-slate-500 uppercase flex items-center gap-1 font-mono">
              <Star className="w-3 h-3 text-amber-500" /> Stars Recv
            </span>
            <span className="text-sm font-bold text-[var(--color-natural-ink)] font-mono">
              {player.stars !== undefined ? player.stars : 0}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-[var(--color-natural-bg)] border-2 border-[var(--color-natural-border)]/40 flex flex-col gap-0.5">
            <span className="text-[10px] text-slate-500 uppercase flex items-center gap-1 font-mono">
              <Users className="w-3 h-3 text-blue-600" /> Followers
            </span>
            <span className="text-sm font-bold text-[var(--color-natural-ink)] font-mono">
              {player.followers !== undefined ? player.followers : 0}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-[var(--color-natural-bg)] border-2 border-[var(--color-natural-border)]/40 flex flex-col gap-0.5">
            <span className="text-[10px] text-slate-500 uppercase flex items-center gap-1 font-mono">
              <FolderGit className="w-3 h-3 text-emerald-700" /> Repositories
            </span>
            <span className="text-sm font-bold text-[var(--color-natural-ink)] font-mono">
              {player.repos !== undefined ? player.repos : 0}
            </span>
          </div>
        </div>

        <a
          href={`https://github.com/` + player.username}
          target="_blank"
          rel="noreferrer"
          className="w-full mt-4 py-2 px-4 bg-[var(--color-natural-accent)] border-2 border-[var(--color-natural-ink)] hover:bg-[var(--color-natural-accent)]/85 active:scale-[0.98] transition-all text-xs text-[var(--color-natural-ink)] font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer font-serif natural-shadow-sm"
        >
          <Github className="w-3.5 h-3.5 fill-[var(--color-natural-ink)]" />
          Visit GitHub Profile
        </a>
      </div>
    </div>
  );
}
