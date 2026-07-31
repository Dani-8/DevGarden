interface ConnectionErrorModalProps {
    message: string;
    onRetry: () => void;
}

export default function ConnectionErrorModal({ message, onRetry }: ConnectionErrorModalProps) {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/90 z-40 p-4">
            <div className="max-w-md w-full bg-white border-3 border-[var(--color-natural-border)] rounded-2xl p-6 text-center natural-shadow-lg text-[var(--color-natural-ink)]">
                <h2 className="text-lg font-bold text-red-700 mb-2 font-serif">Gardener Connection Interrupted</h2>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">{message}</p>
               
                <button
                    onClick={onRetry}
                    className="py-2 px-5 bg-[var(--color-natural-foliage)] hover:bg-[var(--color-natural-foliage)]/90 text-white font-bold text-xs rounded-lg font-mono active:scale-95 transition-all cursor-pointer border-2 border-black/10 shadow-sm"
                >
                    Retry Reconnect
                </button>
            </div>
        </div>
    );
}
