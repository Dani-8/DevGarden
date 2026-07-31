import { useState, useEffect } from 'react'

const DEV_GARDEN_LOADING_PHRASES = [
  "🌱 Sprouting DevGarden world...",
  "☕ Preparing Code Cafe...",
  "🌳 Connecting to open yard...",
  "✨ Syncing player state..."
];

export function DevGardenLoadingMessage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % DEV_GARDEN_LOADING_PHRASES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return <span className="animate-fadeIn">{DEV_GARDEN_LOADING_PHRASES[index]}</span>;
}

export function RefreshCwSpinner({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  );
}

export default function LoadingScreen({ withSpinner = false }: { withSpinner?: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 font-mono text-emerald-400 text-xs">
      {withSpinner && <RefreshCwSpinner className="w-6 h-6 animate-spin mb-3 text-emerald-400" />}
      <div className="animate-pulse flex items-center gap-2 bg-slate-900/80 px-4 py-2.5 rounded-xl border border-emerald-500/20 shadow-lg">
        <DevGardenLoadingMessage />
      </div>
    </div>
  );
}
