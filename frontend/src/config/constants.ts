export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const GAME_CONFIG = {
    WORLD_WIDTH: 1024,
    WORLD_HEIGHT: 768,
    GRID_SIZE: 16,
    MOVE_SPEED: 120,
    NETWORK_SYNC_MS: 45,
    STAR_TREE_WATER_COOLDOWN_MS: 800,
};

export const VISUAL_TIER_COLORS = {
    green: '#81c784',
    blue: '#64b5f6',
    purple: '#ba68c8',
    crimson: '#e57373',
    cosmic: '#ffd54f',
};

export const DECORATION_EMOJIS: Record<string, string> = {
    campfire: '🔥',
    lantern: '🏮',
    picnic: '🧺',
    bench: '🪑',
    sunflower: '🌻',
    mushroom: '🍄',
    duckpool: '🦆',
};
