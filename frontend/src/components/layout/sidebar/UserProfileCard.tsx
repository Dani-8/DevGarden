import { UserProfile } from '../../../types/index.js';

interface UserProfileCardProps {
  user: UserProfile;
  collapsed: boolean;
  theme: {
    borderDivider: string;
    textPrimary: string;
    textSecondary: string;
    textAccent: string;
    cardBg: string;
  };
}

export default function UserProfileCard({ user, collapsed, theme }: UserProfileCardProps) {
  return (
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
  );
}
