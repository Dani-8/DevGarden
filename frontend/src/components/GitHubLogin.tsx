import { useState } from 'react';
import { Shield, Key, Github, Sparkles, HelpCircle } from 'lucide-react';

interface GitHubLoginProps {
  onSuccess: () => void;
}

export default function GitHubLogin({ onSuccess }: GitHubLoginProps) {
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showGuide, setShowGuide] = useState(false);

  // Get active preview URLs dynamically from the browser window's origin
  const currentOrigin = window.location.origin;
  const isDev = currentOrigin.includes('ais-dev-');
  const devUrl = isDev ? currentOrigin : currentOrigin.replace('ais-pre-', 'ais-dev-');
  const preUrl = !isDev ? currentOrigin : currentOrigin.replace('ais-dev-', 'ais-pre-');

  const handleGuestLogin = async () => {
    setGuestLoading(true);
    setError(null);
    try {
      const apiBase = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiBase}/api/auth/guest`, { method: 'POST', credentials: 'include' });
      if (!response.ok) {
        throw new Error('Failed to log in as Guest.');
      }
      onSuccess();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Guest Login Failed');
    } finally {
      setGuestLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

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
            onSuccess();
          }
        }
      };

      window.addEventListener('message', handleAuthMessage);

      // Open Popup directly on the GitHub OAuth Page
      const popup = window.open(
        url,
        'devgarden_github_auth',
        'width=600,height=750,resizable=yes,scrollbars=yes'
      );

      if (!popup) {
        throw new Error('OAuth popup was blocked by browser. Please enable popups for this site.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'OAuth Connection Failed');
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
              disabled={loading || guestLoading}
              id="login-btn"
              className="w-full py-3 px-5 bg-[var(--color-natural-accent)] hover:bg-[var(--color-natural-accent)]/80 active:scale-[0.98] transition-all text-[var(--color-natural-ink)] border-2 border-[var(--color-natural-ink)] font-bold text-sm rounded-xl flex items-center justify-center gap-2 natural-shadow-sm cursor-pointer disabled:opacity-50"
            >
              <Github className="w-4 h-4 fill-[var(--color-natural-ink)]" />
              {loading ? 'Opening Security Popup...' : 'Login with GitHub'}
            </button>

            <button
              onClick={handleGuestLogin}
              disabled={loading || guestLoading}
              id="guest-login-btn"
              className="w-full py-3 px-5 bg-white hover:bg-slate-50 active:scale-[0.98] transition-all text-slate-700 border-2 border-slate-300 font-bold text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
              {guestLoading ? 'Entering Guest Room...' : 'Enter as Guest (Quick Demo Bypass)'}
            </button>
          </div>

          <button
            onClick={() => setShowGuide(!showGuide)}
            className="mt-4 text-xs font-mono text-slate-500 hover:text-[var(--color-natural-foliage)] flex items-center justify-center gap-1.5 mx-auto transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            {showGuide ? 'Hide Setup Tutorial' : 'How to set up GitHub OAuth Keys?'}
          </button>
        </div>

        {/* Dynamic setup instructions deck */}
        {showGuide && (
          <div className="mt-8 pt-6 border-t-2 border-[var(--color-natural-border)]/40 font-sans text-xs text-slate-600 space-y-4 relative z-10 animate-fade-in">
            <div className="flex items-center gap-2 text-[var(--color-natural-ink)] font-bold text-sm mb-2 font-serif">
              <Shield className="w-4 h-4 text-[var(--color-natural-foliage)]" />
              <span>OAuth Credentials Installation Guide</span>
            </div>

            <p className="leading-relaxed">
              To wire up user logins in your personal workspace, you need to create a **GitHub OAuth Application** and save its variables inside the AI Studio Secrets panel.
            </p>

            <div className="space-y-3">
              <div className="flex gap-2 text-left">
                <span className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-natural-foliage)] font-bold text-[10px] text-white">1</span>
                <div>
                  <p className="text-[var(--color-natural-ink)] font-semibold font-serif">Open Developer Settings</p>
                  <p>Go to your Github Profile Settings → <a href="https://github.com/settings/developers" target="_blank" rel="noreferrer" className="text-[var(--color-natural-foliage)] font-bold hover:underline">OAuth Apps</a> and click <strong>New OAuth App</strong>.</p>
                </div>
              </div>

              <div className="flex gap-2 text-left">
                <span className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-natural-foliage)] font-bold text-[10px] text-white">2</span>
                <div>
                  <p className="text-[var(--color-natural-ink)] font-semibold font-serif">Install Callback URLs</p>
                  <p className="mb-1">Copy and paste these exact values into your GitHub App configuration:</p>
                  <div className="p-3 rounded-lg bg-[var(--color-natural-bg)] border-2 border-[var(--color-natural-border)]/50 font-mono text-[10px] space-y-2 select-all text-[var(--color-natural-ink)]">
                    <div>
                      <span className="text-[var(--color-natural-foliage)] font-semibold block">Homepage URL:</span>
                      <span>{devUrl}</span>
                    </div>
                    <div>
                      <span className="text-[var(--color-natural-foliage)] font-semibold block">Authorization Callback URL:</span>
                      <span>{devUrl}/auth/callback</span>
                    </div>
                  </div>
                  <p className="mt-1 text-[10px] text-slate-500 italic">
                    Note: If deploying/sharing, also register <strong>{preUrl}/auth/callback</strong>.
                  </p>
                </div>
              </div>

              <div className="flex gap-2 text-left">
                <span className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-natural-foliage)] font-bold text-[10px] text-white">3</span>
                <div>
                  <p className="text-[var(--color-natural-ink)] font-semibold font-serif">Declare Environment Secrets</p>
                  <p className="mb-2">Click <strong>Generate Client Secret</strong> on GitHub, copy the values, and click the <strong>Secrets/Settings</strong> gear inside the AI Studio top bar to add:</p>
                  <div className="p-3 rounded-lg bg-[var(--color-natural-bg)] border-2 border-[var(--color-natural-border)]/50 font-mono text-[10px] space-y-1 text-slate-700">
                    <div><span className="text-[var(--color-natural-foliage)] font-bold">CLIENT_ID</span>=“your_client_id_here”</div>
                    <div><span className="text-[var(--color-natural-foliage)] font-bold">CLIENT_SECRET</span>=“your_client_secret_here”</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
