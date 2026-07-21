import { useState } from 'react';
import { Github, Sparkles } from 'lucide-react';
import PixelBackdrop from './PixelBackdrop';
import Favicon from "../../assets/Favicon.png"
import LOGO from "../../assets/LOGO.png"

interface GitHubLoginProps {
  onSuccess: () => void;
}

export default function GitHubLogin({ onSuccess }: GitHubLoginProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    // Open Popup immediately (synchronously in response to click event) to prevent browser blocking
    const popup = window.open(
      'about:blank',
      'devgarden_github_auth',
      'width=600,height=750,resizable=yes,scrollbars=yes'
    );

    if (!popup) {
      setError('OAuth popup was blocked by your browser. Please enable popups for this site and try again.');
      setLoading(false);
      return;
    }

    // Populate the popup with a clean, themed loading state while we fetch the URL
    try {
      popup.document.write(`
        <html>
          <head>
            <title>Connecting to GitHub...</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                background: #0d1117;
                color: #c9d1d9;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
              }
              .spinner {
                border: 4px solid rgba(255,255,255,0.1);
                width: 36px;
                height: 36px;
                border-radius: 50%;
                border-left-color: #58a6ff;
                animation: spin 1s linear infinite;
                margin-bottom: 16px;
              }
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              p {
                font-size: 14px;
                color: #8b949e;
              }
            </style>
          </head>
          <body>
            <div class="spinner"></div>
            <p>Connecting to GitHub Secure Authentication...</p>
          </body>
        </html>
      `);
    } catch (e) {
      console.warn('Could not write placeholder to popup:', e);
    }

    // Setup window listener to catch the popup success callback event
    const handleAuthMessage = (event: MessageEvent) => {
      const origin = event.origin;
      const apiBase = import.meta.env.VITE_API_URL || '';
      let isAllowedOrigin = false;
      
      try {
        if (apiBase && origin === new URL(apiBase).origin) {
          isAllowedOrigin = true;
        }
      } catch (_) {}

      if (
        isAllowedOrigin ||
        origin.includes('localhost') ||
        origin.includes('127.0.0.1') ||
        origin.endsWith('.run.app') ||
        origin.endsWith('.vercel.app') ||
        origin.includes('ai.studio')
      ) {
        if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
          window.removeEventListener('message', handleAuthMessage);
          if (event.data && event.data.token) {
            localStorage.setItem('devgarden_token', event.data.token);
          }
          onSuccess();
        }
      }
    };

    window.addEventListener('message', handleAuthMessage);

    // Asynchronously fetch the authorization URL from the backend
    try {
      const apiBase = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiBase}/api/auth/url`, { credentials: 'include' });
      if (!response.ok) {
        let errMsg = 'Failed to retrieve GitHub OAuth authorization URL from server.';
        try {
          const errData = await response.json();
          if (errData && errData.error) {
            errMsg = errData.error;
          }
        } catch (_) {}
        throw new Error(errMsg);
      }

      const { url } = await response.json();
      
      // Update the popup location to the actual GitHub OAuth page
      popup.location.href = url;

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'OAuth Connection Failed');
      try {
        popup.close();
      } catch (_) {}
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full flex-1 flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      {/* 1. Scrolling Pixel/Cloud Game Backdrop */}
      <PixelBackdrop />

      {/* 2. Beautiful retro-cozy gaming card - crafted with double wood/brass styled borders & retro chunky shadow */}
      <div className="w-full max-w-md bg-[#faf6eb] border-4 border-[#3a2f28] rounded-2xl shadow-[8px_8px_0px_0px_rgba(58,47,40,0.18)] p-1 relative z-10 overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
        
        {/* Retro brass corner brackets for authentication card */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-800/60" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-800/60" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-amber-800/60" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-800/60" />

        {/* Soft atmospheric radial warm hearth glow */}
        <div className="absolute inset-0 bg-radial-gradient from-amber-100/30 to-transparent pointer-events-none select-none" />

        {/* Inner dashed guide line matching quality layout */}
        <div className="border-2 border-dashed border-[#8c6d53]/20 rounded-xl p-5 md:p-6 relative z-10">
          
          <div className="text-center">
            
            {/* Animated floating plant sprout badge */}
            <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#e3d8c1] border-2 border-[#3a2f28] text-[var(--color-natural-accent)] mb-4 shadow-[3px_3px_0px_0px_rgba(58,47,40,0.15)] animate-bounce [animation-duration:3s]">
              <img src={Favicon} alt="DevGarden" className="w-8 h-8 select-none pointer-events-none" />
              {/* Floating decorative pixel sparks */}
              <span className="absolute -top-1 -right-1 text-[8px] animate-ping opacity-35">🟡</span>
              <span className="absolute -bottom-1 -left-1 text-xs animate-pulse">🌱</span>
            </div>
   
            {/* Display Title with wooden styling */}
            <h1 className="text-lg md:text-xl font-press tracking-wider text-[#3a2f28] mb-1 select-none">
              DEVGARDEN<span className="text-[var(--color-natural-grass)]">.</span>
            </h1>
            <p className="text-[10px] text-amber-900/60 font-pixel uppercase tracking-widest mb-4">
              Multiplayer Code Greenhouse
            </p>
   
            {/* Cozy Parchment Paper scroll block */}
            <div className="bg-[#fefcf7] border-2 border-[#3a2f28]/10 p-4 mb-6 text-left rounded-xl shadow-inner relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-amber-900/5" />
              <p className="text-[#514339] text-md md:text-lg font-pixel leading-relaxed">
                🌿 "Step into a cozy greenhouse. Connect with GitHub to walk around, grow pixel plants with your commits, chat with fellow gardeners, and watch your character blossom."
              </p>
            </div>
   
            {/* Error notice */}
            {error && (
              <div className="mb-5 p-3 rounded-xl bg-rose-50 border-2 border-rose-900/20 text-rose-800 text-xs font-pixel text-left shadow-sm">
                <p className="font-bold uppercase tracking-wide flex items-center gap-1">
                  <span>⚠️ Connection Issue:</span>
                </p>
                <p className="mt-1 leading-relaxed text-rose-700/90">{error}</p>
              </div>
            )}
   
            {/* Chunky tactile retro 3D action button */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleLogin}
                disabled={loading}
                id="login-btn"
                className="w-full py-3 px-5 bg-[#ffae34] hover:bg-[#ffb94f] active:bg-[#e29624] text-[#3a2f28] border-2 border-[#3a2f28] font-pixel text-lg font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#3a2f28] hover:shadow-[5px_5px_0px_0px_#3a2f28] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#3a2f28] transition-all cursor-pointer disabled:opacity-50 select-none"
              >
                <div className="flex items-center justify-center gap-2">
                  <Github className="w-5 h-5 fill-[#3a2f28] stroke-none animate-pulse" />
                  <span>{loading ? 'Entering...' : 'Enter DevGarden'}</span>
                </div>
              </button>
            </div>
   
            {/* Footer with a cozy tip */}
            <div className="mt-5 text-center">
              <span className="text-[10px] text-amber-900/40 font-pixel uppercase tracking-widest block">
                ☕ Touch some virtual grass today
              </span>
            </div>
   
          </div>
        </div>
      </div>
    </div>
  );
}
