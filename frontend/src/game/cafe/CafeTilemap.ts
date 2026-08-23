import Phaser from 'phaser';
import { CafeCommunityTextures } from './communityWing/CafeCommunityTextures';

export class CafeTilemap {
  /**
   * Renders the interior tilemap floor and wall boundary for Code Cafe.
   * Total Room size: 1344 x 736 pixels (42 x 23 tiles of 32x32px).
   * - Main Cafe Area: x: 0..960 (Dark brown horizontal brick walls & classic oak parquet floor)
   * - 3-Section Community Wing: x: 960..1344 (Light warm gray/beige stone-brick walls & medium warm brown rich wood floor)
   */
  static draw(scene: Phaser.Scene) {
    const totalWidth = 1344;
    const splitX = 960;
    const height = 736;
    const wallHeight = 100;

    // Ensure all community wing textures exist
    CafeCommunityTextures.createAll(scene);

    // =========================================================================
    // 1. BACK WALLS (y: 0 to 100)
    // =========================================================================
    // 1A. Main Cafe Back Wall (x: 0 to 960) - Classic Warm Dark Brick
    for (let x = 0; x < splitX; x += 32) {
      for (let y = 0; y < wallHeight; y += 32) {
        scene.add.image(x, y, 'cafe_wall_brick').setOrigin(0, 0).setDepth(0);
      }
    }

    // 1B. 3-Section Zone Back Wall (x: 960 to 1344) - Light Warm Gray / Beige Stone-Brick
    for (let x = splitX; x < totalWidth; x += 32) {
      for (let y = 0; y < wallHeight; y += 32) {
        scene.add.image(x, y, 'cafe_wing_stone_brick_wall').setOrigin(0, 0).setDepth(0);
      }
    }

    // Skirting Baseboards at bottom of back walls (y: 94 to 100)
    const wallSkirting = scene.add.graphics();
    // Main cafe baseboard (dark walnut)
    wallSkirting.fillStyle(0x261610, 1);
    wallSkirting.fillRect(0, 94, splitX, 6);
    // 3-section wing baseboard (refined stone/limestone trim)
    wallSkirting.fillStyle(0x524b42, 1);
    wallSkirting.fillRect(splitX, 94, totalWidth - splitX, 6);
    wallSkirting.setDepth(1);

    // =========================================================================
    // 2. FLOORS (x: 0 to 1344, y: 100 to 736)
    // =========================================================================
    // 2A. Main Cafe Floor (x: 0 to 960) - Standard Parquet Oak
    for (let x = 0; x < splitX; x += 32) {
      for (let y = wallHeight; y < height; y += 32) {
        const tileX = Math.floor(x / 32);
        const tileY = Math.floor(y / 32);
        const textureKey = ((tileX + tileY) % 2 === 0) ? 'cafe_floor_wood_1' : 'cafe_floor_wood_2';
        scene.add.image(x, y, textureKey).setOrigin(0, 0).setDepth(0);
      }
    }

    // 2B. 3-Section Wing Floor (x: 960 to 1344) - Medium Warm Brown Rich Wood Floor
    for (let x = splitX; x < totalWidth; x += 32) {
      for (let y = wallHeight; y < height; y += 32) {
        const tileX = Math.floor((x - splitX) / 32);
        const tileY = Math.floor(y / 32);
        const textureKey = ((tileX + tileY) % 2 === 0) ? 'cafe_wing_floor_wood_1' : 'cafe_wing_floor_wood_2';
        scene.add.image(x, y, textureKey).setOrigin(0, 0).setDepth(0);
      }
    }
  }
}
