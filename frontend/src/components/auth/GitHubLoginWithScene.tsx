import { useState } from 'react';
import { Github } from 'lucide-react';
import PixelBackdrop from '../layout/PixelBackdrop.js';
import Favicon from "../../../assets/Favicon.png";
import LoginSceneImg from "../../../assets/LoginPageScene2.png";

interface GitHubLoginProps {
    onSuccess: () => void;
}

export default function GitHubLogin({ onSuccess }: GitHubLoginProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        setLoading(true);
        setError(null);

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

        const handleAuthMessage = (event: MessageEvent) => {
            const origin = event.origin;
            const apiBase = import.meta.env.VITE_API_URL || '';
            let isAllowedOrigin = false;

            try {
                if (apiBase && origin === new URL(apiBase).origin) {
                    isAllowedOrigin = true;
                }
            } catch (_) { }

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
                } catch (_) { }
                throw new Error(errMsg);
            }

            const { url } = await response.json();
            popup.location.href = url;

        } catch (err: any) {
            console.error(err);
            setError(err.message || 'OAuth Connection Failed');
            try {
                popup.close();
            } catch (_) { }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative w-full h-full flex-1 flex flex-col items-center justify-center overflow-hidden">
            <PixelBackdrop />

            <img src={LoginSceneImg} alt="Login Scene" className="w-full h-195 object-contain z-10" />
        </div>
    );
}
