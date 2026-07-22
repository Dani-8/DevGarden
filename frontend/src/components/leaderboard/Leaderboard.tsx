import { useState, useEffect } from 'react';
import { Award, Trophy, Crown, RefreshCw, X } from 'lucide-react';
import { UserProfile } from '../../types/index.js';

interface LeaderboardProps {
    onClose?: () => void;
}

export default function Leaderboard({ onClose }: LeaderboardProps) {
    const [list, setList] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchLeaderboard = async () => {
        setLoading(true);
        setError(null);
        try {
            const apiBase = import.meta.env.VITE_API_URL || '';
            const response = await fetch(`${apiBase}/api/leaderboard`, { credentials: 'include' });
            if (!response.ok) {
                throw new Error('Failed to retrieve rankings from server.');
            }
            const data = await response.json();
            setList(data);
        } catch (err: any) {
            setError(err.message || 'Failed to sync scoreboard');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-white border-3 border-[var(--color-natural-border)] rounded-2xl shadow-2xl p-6 flex flex-col max-h-[80vh] overflow-hidden animate-zoom-in backdrop-blur-md text-[var(--color-natural-ink)] natural-shadow-lg">
            <div className="flex items-center justify-between pb-4 border-b-2 border-[var(--color-natural-border)]/50 mb-4">
                <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-[var(--color-natural-foliage)]" />
                    <div>
                        <h2 className="text-base font-bold text-[var(--color-natural-ink)] font-serif">Garden Hall of Fame</h2>
                        <p className="text-[10px] text-slate-500 font-sans">Legendary developers registered in-world</p>
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    <button
                        onClick={fetchLeaderboard}
                        disabled={loading}
                        className="p-1.5 rounded-lg hover:bg-[var(--color-natural-bg)] text-[var(--color-natural-ink)]/70 hover:text-[var(--color-natural-ink)] transition-colors disabled:opacity-50 cursor-pointer border border-[var(--color-natural-border)]/30"
                        title="Refresh leaderboard"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded-lg hover:bg-[var(--color-natural-bg)] text-[var(--color-natural-ink)]/70 hover:text-[var(--color-natural-ink)] transition-colors cursor-pointer border border-[var(--color-natural-border)]/30"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 space-y-2 font-sans natural-scroll">
                {loading && list.length === 0 ? (
                    <div className="text-center py-10 text-xs text-slate-500">
                        <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[var(--color-natural-border)]" />
                        Reading board records...
                    </div>
                ) : error ? (
                    <div className="text-center py-10 text-xs text-red-600">{error}</div>
                ) : list.length === 0 ? (
                    <div className="text-center py-10 text-xs text-slate-500 font-sans">
                        No developers have planted seeds in the garden yet!
                    </div>
                ) : (
                    list.map((u, i) => {
                        const isTop3 = i < 3;
                        const medals = [
                            <Crown className="w-4 h-4 text-amber-500" />,
                            <Award className="w-4 h-4 text-slate-400" />,
                            <Award className="w-4 h-4 text-amber-700" />,
                        ];

                        return (
                            <div
                                key={u.github_id}
                                className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${isTop3
                                        ? 'bg-[var(--color-natural-accent)]/30 border-[var(--color-natural-foliage)]/40'
                                        : 'bg-[var(--color-natural-bg)]/60 border-[var(--color-natural-border)]/30'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-6 flex items-center justify-center text-xs font-bold text-[var(--color-natural-ink)]/80">
                                        {isTop3 ? medals[i] : `${i + 1}`}
                                    </div>

                                    <img
                                        src={u.avatar_url || 'https://github.com/identicons/guest.png'}
                                        alt={u.username}
                                        className="w-8 h-8 rounded-lg border border-[var(--color-natural-border)] object-cover grayscale sepia hue-rotate-[70deg] saturate-[2.5] brightness-[0.9] contrast-[1.1] opacity-85 hover:filter-none hover:opacity-100 transition-all duration-300 cursor-pointer"
                                        referrerPolicy="no-referrer"
                                    />

                                    <div>
                                        <span className="text-xs font-bold text-[var(--color-natural-ink)] flex items-center gap-1 font-serif">
                                            {u.username}
                                            {u.level >= 40 && (
                                                <span className="text-[8px] uppercase tracking-wider text-amber-800 font-bold px-1.5 py-0.2 bg-[var(--color-natural-accent)] border border-amber-600/30 rounded">
                                                    Lvl {u.level}
                                                </span>
                                            )}
                                        </span>
                                        <span className="text-[9px] text-slate-500 block leading-none mt-0.5 font-sans">
                                            {u.title} • {u.commits} commits
                                        </span>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <span className="text-xs font-bold text-[var(--color-natural-foliage)] block">{u.score} pts</span>
                                    <span className="text-[9px] text-slate-400 uppercase block font-sans">Lvl {u.level}</span>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <div className="text-center pt-4 border-t-2 border-[var(--color-natural-border)]/30 mt-4">
                <p className="text-[9px] font-sans text-slate-500">
                    Gain points on GitHub to rise in rank automatically. Updates on fresh logins!
                </p>
            </div>
        </div>
    );
}
