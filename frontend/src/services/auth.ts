import { fetchWithAuth } from './api.js';
import { AuthSession } from '../types/index.js';

export async function getCurrentSession(): Promise<AuthSession> {
    try {
        const res = await fetchWithAuth('/api/auth/me');
        if (!res.ok) {
            return { loggedIn: false };
        }
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await res.json();
        }
        return { loggedIn: false };
    } catch (e: any) {
        console.error('Session check error:', e);
        return { loggedIn: false, error: e.message };
    }
}

export async function logoutUser(): Promise<boolean> {
    try {
        await fetchWithAuth('/api/auth/logout', { method: 'POST' });
        localStorage.removeItem('devgarden_token');
        return true;
    } catch (e) {
        console.error('Logout error:', e);
        return false;
    }
}

export async function loginAsGuest(): Promise<string | null> {
    try {
        const res = await fetchWithAuth('/api/auth/guest', { method: 'POST' });
        if (res.ok) {
            const data = await res.json();
            if (data.token) {
                localStorage.setItem('devgarden_token', data.token);
                return data.token;
            }
        }
        return null;
    } catch (e) {
        console.error('Guest login error:', e);
        return null;
    }
}
