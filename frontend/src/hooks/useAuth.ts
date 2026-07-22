import { useState, useEffect, useCallback } from 'react';
import { AuthSession } from '../types/index.js';
import { getCurrentSession, logoutUser, loginAsGuest } from '../services/auth.js';

export function useAuth() {
    const [session, setSession] = useState<AuthSession | null>(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = useCallback(async () => {
        setLoading(true);
        const sess = await getCurrentSession();
        setSession(sess);
        setLoading(false);
    }, []);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const handleLogout = async () => {
        await logoutUser();
        setSession({ loggedIn: false });
    };

    const handleBypassLogin = async () => {
        const token = await loginAsGuest();
        if (token) {
            await checkAuth();
        }
    };

    return {
        session,
        loading,
        checkAuth,
        logout: handleLogout,
        bypassLogin: handleBypassLogin,
    };
}
