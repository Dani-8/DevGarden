import Phaser from 'phaser';
import { MAP_COLS, MAP_ROWS, TILE_SIZE, isRiverTile, isBridgeTile, BRIDGES } from './MapConfig.js';

export class TilemapRenderer {
    private scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    renderTilemap() {
        for (let tx = 0; tx < MAP_COLS; tx++) {
            for (let ty = 0; ty < MAP_ROWS; ty++) {
                const px = tx * TILE_SIZE;
                const py = ty * TILE_SIZE;

                // 1. South Zone (Town Boulevard & Roads): rows 24 to 47
                if (ty >= 24) {
                    this.renderSouthTownTile(tx, ty, px, py);
                    continue;
                }

                // 2. Central River & Bridges (cols 30 to 34, x=960 to 1120)
                if (tx >= 30 && tx <= 34) {
                    this.renderRiverOrBridgeTile(tx, ty, px, py);
                    continue;
                }

                // 3. West Garden (cols 0 to 29)
                if (tx < 30) {
                    this.renderWestGardenTile(tx, ty, px, py);
                    continue;
                }

                // 4. East Zen Sanctuary (cols 35 to 63)
                this.renderEastZenTile(tx, ty, px, py);
            }
        }
    }

    private renderWestGardenTile(tx: number, ty: number, px: number, py: number) {
        const isPathX = (tx >= 6 && tx <= 28) && (ty === 7 || ty === 17);
        const isPathY = (ty >= 7 && ty <= 17) && (tx === 6 || tx === 28);
        const isCenterAisle = (tx === 16 && ty >= 7 && ty <= 17) || (ty === 12 && tx >= 6 && tx <= 28);
        // Path connecting to South Gate
        const isSouthGateConnector = (tx >= 14 && tx <= 18) && (ty >= 18 && ty <= 23);

        if (isPathX || isPathY || isCenterAisle || isSouthGateConnector) {
            this.scene.add.image(px + 16, py + 16, 'dirt_tile').setDepth(-10);
        } else {
            const rng = (tx * 17 + ty * 31) % 100;
            if (rng < 8) {
                this.scene.add.image(px + 16, py + 16, 'grass_tile_yellow').setDepth(-10);
            } else if (rng < 15) {
                this.scene.add.image(px + 16, py + 16, 'grass_tile_pink').setDepth(-10);
            } else {
                this.scene.add.image(px + 16, py + 16, 'grass_tile').setDepth(-10);
            }
        }
    }

    private renderRiverOrBridgeTile(tx: number, ty: number, px: number, py: number) {
        if (isBridgeTile(tx, ty)) {
            // Find bridge type
            const bridge = BRIDGES.find(b => px >= b.xMin && px < b.xMax && py >= b.yMin && py < b.yMax);
            const tileKey = bridge?.type === 'stone' ? 'bridge_stone_tile' : 'bridge_wood_tile';
            this.scene.add.image(px + 16, py + 16, tileKey).setDepth(-10);
            return;
        }

        if (tx === 30) {
            this.scene.add.image(px + 16, py + 16, 'river_bank_west').setDepth(-10);
        } else if (tx === 34) {
            this.scene.add.image(px + 16, py + 16, 'river_bank_east').setDepth(-10);
        } else {
            const isWater2 = (tx + ty) % 2 === 0;
            const tileKey = isWater2 ? 'water_tile_2' : 'water_tile_1';
            this.scene.add.image(px + 16, py + 16, tileKey).setDepth(-10);

            // Random lily pad
            if ((tx * 13 + ty * 29) % 23 === 0) {
                this.scene.add.image(px + 16, py + 16, 'lily_pad_tile').setDepth(-9);
            }
        }
    }

    private renderEastZenTile(tx: number, ty: number, px: number, py: number) {
        const isZenPath = (tx >= 38 && tx <= 60 && ty === 12) || (tx === 48 && ty >= 4 && ty <= 20);
        const isPebblePatio = (tx >= 44 && tx <= 52) && (ty >= 8 && ty <= 16);

        if (isPebblePatio) {
            this.scene.add.image(px + 16, py + 16, 'zen_pebble_tile').setDepth(-10);
        } else if (isZenPath) {
            this.scene.add.image(px + 16, py + 16, 'dirt_tile').setDepth(-10);
        } else {
            const rng = (tx * 19 + ty * 37) % 100;
            if (rng < 25) {
                this.scene.add.image(px + 16, py + 16, 'sakura_grass_tile').setDepth(-10);
            } else {
                this.scene.add.image(px + 16, py + 16, 'grass_tile').setDepth(-10);
            }
        }
    }

    private renderSouthTownTile(tx: number, ty: number, px: number, py: number) {
        // Rows 24..26: Cobblestone Sidewalk / Garden Entrance
        if (ty >= 24 && ty <= 26) {
            this.scene.add.image(px + 16, py + 16, 'cobblestone_tile').setDepth(-10);
            return;
        }

        // Rows 27..36: Main Asphalt Road & Crosswalks
        if (ty >= 27 && ty <= 36) {
            // Crosswalks aligned with garden gates
            const isCrosswalk = (tx >= 14 && tx <= 18) || (tx >= 46 && tx <= 50);
            if (isCrosswalk && (ty === 27 || ty === 36)) {
                this.scene.add.image(px + 16, py + 16, 'crosswalk_tile').setDepth(-10);
                return;
            }

            // Yellow dividing line on row 31
            if (ty === 31) {
                this.scene.add.image(px + 16, py + 16, 'road_stripe_h').setDepth(-10);
                return;
            }

            this.scene.add.image(px + 16, py + 16, 'asphalt_road_tile').setDepth(-10);
            return;
        }

        // Rows 37..47: South Cobblestone Plaza & Cafe Promenade
        const isPlazaPath = (tx >= 20 && tx <= 44) && (ty >= 38 && ty <= 45);
        if (isPlazaPath) {
            this.scene.add.image(px + 16, py + 16, 'dirt_tile').setDepth(-10);
        } else {
            this.scene.add.image(px + 16, py + 16, 'cobblestone_tile').setDepth(-10);
        }
    }
}
