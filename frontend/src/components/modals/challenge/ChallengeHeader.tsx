import { X, Sparkles } from 'lucide-react';

interface ChallengeHeaderProps {
    onClose: () => void;
}

export default function ChallengeHeader({ onClose }: ChallengeHeaderProps) {
    return (
        <header className="bg-[var(--color-natural-foliage)] text-white p-4 flex items-center justify-between border-b-4 border-[var(--color-natural-ink)]">
            <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300 animate-pulse" />
                <h2 className="text-base font-bold font-serif uppercase tracking-wide">
                    Golden Sprout Challenge
                </h2>
            </div>
            
            <button
                onClick={onClose}
                id="close-challenge-btn"
                className="p-1 text-white/80 hover:text-white hover:scale-115 transition-all cursor-pointer bg-black/20 rounded-md"
                title="Close"
            >
                <X className="w-4 h-4" />
            </button>
        </header>
    );
}
