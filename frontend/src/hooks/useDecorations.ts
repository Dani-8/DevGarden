import { useState, useEffect } from 'react';
import { DecorationRow } from '../types/index.js';
import { getDecorations, saveDecoration, deleteDecoration } from '../services/api.js';

export function useDecorations() {
    const [decorations, setDecorations] = useState<DecorationRow[]>([]);
    const [loading, setLoading] = useState(false);

    const loadDecorations = async () => {
        setLoading(true);
        try {
            const list = await getDecorations();
            setDecorations(list);
        } catch (e) {
            console.error('Error fetching decorations:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDecorations();
    }, []);

    const addDecoration = async (item: Omit<DecorationRow, 'created_at'>) => {
        try {
            const created = await saveDecoration(item);
            setDecorations(prev => [...prev.filter(d => d.id !== created.id), created]);
            return created;
        } catch (e) {
            console.error('Error adding decoration:', e);
            throw e;
        }
    };

    const removeDecoration = async (id: string) => {
        try {
            await deleteDecoration(id);
            setDecorations(prev => prev.filter(d => d.id !== id));
        } catch (e) {
            console.error('Error removing decoration:', e);
            throw e;
        }
    };

    return {
        decorations,
        loading,
        reload: loadDecorations,
        addDecoration,
        removeDecoration,
    };
}
