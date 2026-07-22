import { getSupabase, isSupabaseConfigured } from './client.js';

export interface DecorationRow {
  id: string;
  item_type: string;
  x: number;
  y: number;
  placed_by: string;
  placed_by_username: string;
  created_at: number;
}

export async function getDecorations(): Promise<DecorationRow[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.from('decorations').select('*');
    if (error) {
      throw error;
    }
    return (data || []) as DecorationRow[];
  } catch (err) {
    console.error('Error in getDecorations:', err);
    throw err;
  }
}

export async function saveDecoration(decor: DecorationRow) {
  if (!isSupabaseConfigured()) {
    return;
  }

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from('decorations').upsert(decor);
    if (error) {
      throw error;
    }
  } catch (err) {
    console.error('Error in saveDecoration:', err);
    throw err;
  }
}

export async function deleteDecoration(id: string) {
  if (!isSupabaseConfigured()) {
    return;
  }

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from('decorations').delete().eq('id', id);
    if (error) {
      throw error;
    }
  } catch (err) {
    console.error('Error in deleteDecoration:', err);
    throw err;
  }
}
