import { Star } from 'lucide-react';

interface GoldenWaterCardProps {
    collapsed: boolean;
    goldenWater: boolean;
    onOpenChallenge: () => void;
    theme: {
        btnSecondary: string;
        cardBg: string;
        textAccent: string;
        textSecondary: string;
        btnChallenge: string;
    };
}

export default function GoldenWaterCard({
    collapsed,
    goldenWater,
    onOpenChallenge,
    theme,
}: GoldenWaterCardProps) {
    if (collapsed) {
        return (
            <button
                onClick={onOpenChallenge}
                className={`w-full py-2 px-2.5 rounded-lg border-2 transition-all flex items-center justify-center cursor-pointer select-none ${goldenWater
                        ? 'bg-amber-400 border-[#3a2f28] text-slate-900 shadow-sm animate-pulse'
                        : theme.btnSecondary
                    }`}
                title={goldenWater ? 'Golden Water Active! (10x growth)' : 'Take AI Challenge to Unlock Golden Water (+10x)'}
            >
                <Star className="w-3.5 h-3.5 flex-shrink-0 fill-current text-amber-500" />
            </button>
        );
    }

    return (
        <div
            className={`mt-2 p-3 rounded-xl border-2 flex flex-col gap-2 transition-all relative overflow-hidden ${goldenWater
                    ? 'bg-gradient-to-br from-amber-500/20 to-yellow-600/10 border-amber-500/50 shadow-sm'
                    : `${theme.cardBg} border-dashed`
                }`}
        >
            {goldenWater && (
                <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />
            )}

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                    <Star
                        className={`w-4 h-4 flex-shrink-0 text-amber-500 ${goldenWater ? 'fill-current animate-spin' : 'animate-pulse'
                            }`}
                        style={{ animationDuration: goldenWater ? '12s' : '2s' }}
                    />
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
                        onClick={onOpenChallenge}
                        className={`w-full py-1.5 px-2 rounded-lg text-[10px] font-mono font-bold transition-all border-2 cursor-pointer flex items-center justify-center gap-1 ${theme.btnChallenge}`}
                    >
                        ⭐ Unlock via Challenge
                    </button>
                </>
            )}
        </div>
    );
}
