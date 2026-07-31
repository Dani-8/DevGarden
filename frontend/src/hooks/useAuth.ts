import { useState, useEffect, useCallback } from 'react';
import { AuthSession } from '../types/index';
import { getCurrentSession, logoutUser, loginAsGuest } from '../services/auth';

export function useAuth() {
  const [session, setSession] = useState<AuthSession | null>(null);

  const checkAuth = useCallback(async () => {
    const sess = await getCurrentSession();
    setSession(sess);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogout = async (onAfterLogout?: () => void) => {
    await logoutUser();
    sessionStorage.removeItem('devgarden_last_pos');
    sessionStorage.removeItem('devgarden_has_welcomed');
    setSession({ loggedIn: false });
    if (onAfterLogout) onAfterLogout();
  };

  const handleBypassLogin = async () => {
    const token = await loginAsGuest();
    if (token) {
      await checkAuth();
    }
  };

  return {
    session,
    checkAuth,
    logout: handleLogout,
    bypassLogin: handleBypassLogin,
  };
}
