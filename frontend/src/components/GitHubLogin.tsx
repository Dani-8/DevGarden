import { useState } from 'react';
import { Github, Sparkles } from 'lucide-react';

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
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 py-8">
      <div className="w-full max-w-lg bg-white border-3 border-[var(--color-natural-border)] rounded-2xl natural-shadow-lg overflow-hidden p-8 relative">
        {/* Decorative natural green soft light */}
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-[var(--color-natural-grass)]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-[var(--color-natural-accent)]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center relative z-10">
          {/* Logo Header */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-natural-foliage)] border-2 border-white text-[var(--color-natural-accent)] mb-4 animate-pulse">
            <Sparkles className="w-8 h-8" />
          </div>

          <h1 className="text-3xl font-bold font-serif tracking-tight text-[var(--color-natural-ink)] mb-2">
            DevGarden <span className="text-[var(--color-natural-grass)]">.</span>
          </h1>
          <p className="text-slate-600 text-sm max-w-md mx-auto mb-8 font-sans">
            Sprout as a pixel avatar, synchronize in real-time, chat with other builders, and level up your gear powered by your real-world GitHub contribution history.
          </p>

          {/* Error notice */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border-2 border-red-200 text-red-800 text-xs font-mono text-left">
              <p className="font-bold mb-1">OAuth Configuration Error:</p>
              <p>{error}</p>
            </div>
          )}

          {/* Big Action Button */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleLogin}
              disabled={loading}
              id="login-btn"
              className="w-full py-3 px-5 bg-[var(--color-natural-accent)] hover:bg-[var(--color-natural-accent)]/80 active:scale-[0.98] transition-all text-[var(--color-natural-ink)] border-2 border-[var(--color-natural-ink)] font-bold text-sm rounded-xl flex items-center justify-center gap-2 natural-shadow-sm cursor-pointer disabled:opacity-50"
            >
              <Github className="w-4 h-4 fill-[var(--color-natural-ink)]" />
              {loading ? 'Opening Security Popup...' : 'Login with GitHub'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
