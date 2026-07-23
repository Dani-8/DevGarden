export const WORLD_WIDTH = 2048;
export const WORLD_HEIGHT = 1536;
export const TILE_SIZE = 32;
export const MAP_COLS = WORLD_WIDTH / TILE_SIZE; // 64
export const MAP_ROWS = WORLD_HEIGHT / TILE_SIZE; // 48

export interface BridgeBounds {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  type: 'wooden' | 'arch' | 'stone';
}

export const BRIDGES: BridgeBounds[] = [
  { xMin: 960, xMax: 1120, yMin: 220, yMax: 300, type: 'wooden' },
  { xMin: 960, xMax: 1120, yMin: 480, yMax: 560, type: 'arch' },
  { xMin: 960, xMax: 1120, yMin: 960, yMax: 1040, type: 'stone' },
];

export interface GateBounds {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

export const GATES: GateBounds[] = [
  { xMin: 460, xMax: 560, yMin: 736, yMax: 768 },
  { xMin: 1480, xMax: 1580, yMin: 736, yMax: 768 },
];

export const RIVER_X_MIN = 960;
export const RIVER_X_MAX = 1120;

export function isRiverTile(tx: number, ty: number): boolean {
  const px = tx * TILE_SIZE;
  const py = ty * TILE_SIZE;
  if (px < RIVER_X_MIN || px >= RIVER_X_MAX) return false;

  // If on a bridge, it's walkable bridge ground, not open water
  for (const b of BRIDGES) {
    if (px >= b.xMin && px < b.xMax && py >= b.yMin && py < b.yMax) {
      return false;
    }
  }
  return true;
}

export function isBridgeTile(tx: number, ty: number): boolean {
  const px = tx * TILE_SIZE;
  const py = ty * TILE_SIZE;
  for (const b of BRIDGES) {
    if (px >= b.xMin && px < b.xMax && py >= b.yMin && py < b.yMax) {
      return true;
    }
  }
  return false;
}
