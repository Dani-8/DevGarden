import { API_BASE_URL } from '../config/constants.js';
import { UserProfile, DecorationRow } from '../types/index.js';

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}): Promise<Response> {
    const token = localStorage.getItem('devgarden_token');
    const headers: Record<string, string> = {
        ...(options.headers as Record<string, string> || {}),
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        headers['X-Session-ID'] = token;
    }

    return fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
        credentials: 'include',
    });
}

export async function getLeaderboard(): Promise<UserProfile[]> {
    const res = await fetchWithAuth('/api/leaderboard');
    if (!res.ok) throw new Error('Failed to fetch leaderboard');
    return res.json();
}

export async function getDecorations(): Promise<DecorationRow[]> {
    const res = await fetchWithAuth('/api/decorations');
    if (!res.ok) throw new Error('Failed to fetch decorations');
    return res.json();
}

export async function saveDecoration(decoration: Omit<DecorationRow, 'created_at'>): Promise<DecorationRow> {
    const res = await fetchWithAuth('/api/decorations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(decoration),
    });
    if (!res.ok) throw new Error('Failed to save decoration');
    const data = await res.json();
    return data.decoration;
}

export async function deleteDecoration(id: string): Promise<boolean> {
    const res = await fetchWithAuth(`/api/decorations/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete decoration');
    return true;
}

export async function getStarTreeScore(): Promise<number> {
    const res = await fetchWithAuth('/api/star-tree');
    if (!res.ok) throw new Error('Failed to fetch star tree score');
    const data = await res.json();
    return data.waterScore;
}

export async function waterStarTree(increment: number): Promise<number> {
    const res = await fetchWithAuth('/api/star-tree/water', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ increment }),
    });
    if (!res.ok) throw new Error('Failed to water star tree');
    const data = await res.json();
    return data.waterScore;
}
