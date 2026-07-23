import Phaser from 'phaser';

export class TilemapBuilder {
  static draw(scene: Phaser.Scene) {
    // Render ground grid (32 cols x 24 rows)
    for (let tx = 0; tx < 32; tx++) {
      for (let ty = 0; ty < 24; ty++) {
        const px = tx * 32;
        const py = ty * 32;

        // 1. South Town Boulevard & Sidewalks (ty >= 21)
        if (ty >= 21) {
          scene.add.image(px + 16, py + 16, 'cobblestone_tile').setDepth(-10);
          continue;
        }

        // 2. River Stream (tx = 24..26)
        if (tx >= 24 && tx <= 26) {
          // Compact 1-tile wide Wooden Bridges at top (ty = 7) and bottom (ty = 17)
          if (ty === 7 || ty === 17) {
            scene.add.image(px + 16, py + 16, 'bridge_wood_tile').setDepth(-8);
            continue;
          }

          if (tx === 24) {
            scene.add.image(px + 16, py + 16, 'river_bank_west').setDepth(-10);
          } else if (tx === 26) {
            scene.add.image(px + 16, py + 16, 'river_bank_east').setDepth(-10);
          } else {
            const isWater2 = (tx + ty) % 2 === 0;
            scene.add.image(px + 16, py + 16, isWater2 ? 'river_water_2' : 'river_water_1').setDepth(-10);

            // Procedural lily pad
            if ((tx * 13 + ty * 29) % 7 === 0) {
              scene.add.image(px + 16, py + 16, 'lily_pad_tile').setDepth(-9);
            }
          }
          continue;
        }

        // 3. Eastern Zen Sanctuary (tx >= 27)
        if (tx >= 27) {
          const isEastBridgePath = (ty === 7 || ty === 17);
          const isZenCourtyard = tx >= 27 && tx <= 30 && ty >= 9 && ty <= 15;

          if (isEastBridgePath || isZenCourtyard) {
            scene.add.image(px + 16, py + 16, 'zen_gravel_tile').setDepth(-10);
          } else {
            const rng = (tx * 17 + ty * 31) % 100;
            if (rng < 25) {
              scene.add.image(px + 16, py + 16, 'grass_tile_pink').setDepth(-10);
            } else {
              scene.add.image(px + 16, py + 16, 'grass_tile').setDepth(-10);
            }
          }
          continue;
        }

        // 4. Western Main Garden (tx < 24) - Exact original path & grass layout
        const isPathX = (tx >= 6 && tx <= 23) && (ty === 7 || ty === 17);
        const isPathY = (ty >= 7 && ty <= 17) && (tx === 6 || tx === 23);
        const isCenterAisle = (tx === 16 && ty >= 7 && ty <= 20) || (ty === 12 && tx >= 6 && tx <= 23);

        if (isPathX || isPathY || isCenterAisle) {
          scene.add.image(px + 16, py + 16, 'dirt_tile').setDepth(-10);
        } else {
          const rng = (tx * 17 + ty * 31) % 100;
          if (rng < 8) {
            scene.add.image(px + 16, py + 16, 'grass_tile_yellow').setDepth(-10);
          } else if (rng < 15) {
            scene.add.image(px + 16, py + 16, 'grass_tile_pink').setDepth(-10);
          } else {
            scene.add.image(px + 16, py + 16, 'grass_tile').setDepth(-10);
          }
        }
      }
    }
  }
}
