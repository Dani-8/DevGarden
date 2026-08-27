import LOGO from "../../../assets/LOGO.png"
import GitHubLogin from './GitHubLogin'
// import GitHubLogin from './GitHubLoginWithScene'

interface LoginViewProps {
    onSuccess: () => void;
    onBypass: () => void;
}

export default function LoginView({ onSuccess, onBypass }: LoginViewProps) {
    return (
        <div className="h-screen w-screen bg-[var(--color-natural-bg)] text-[var(--color-natural-ink)] flex flex-col antialiased selection:bg-[var(--color-natural-accent)] selection:text-[var(--color-natural-ink)] font-serif overflow-hidden relative">
            {/* Transparent floating logo in top-left corner */}
            <div className="absolute top-6 left-6 z-20 pointer-events-none select-none">
                <img src={LOGO} alt="DevGarden Logo" className="w-[220px] drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)]" />
            </div>

            {/* Discreet Bypass Button in top-right corner */}
            <button
                onClick={onBypass}
                className="absolute top-4 right-4 z-50 text-[10px] text-amber-950/10 hover:text-amber-950/40 font-mono transition-colors border border-transparent hover:border-amber-950/10 px-2.5 py-1 rounded cursor-pointer select-none"
                title="Bypass Authentication"
            >
                🔑 Bypass
            </button>

            <main className="flex-1 flex flex-col items-center justify-center relative bg-[var(--color-natural-bg)] overflow-hidden">
                <GitHubLogin onSuccess={onSuccess} />
            </main>
        </div>
    );
}
