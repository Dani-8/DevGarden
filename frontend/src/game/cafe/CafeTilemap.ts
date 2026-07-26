import Phaser from 'phaser';

export class CafeTilemap {
    /**
     * Renders the interior tilemap floor and wall boundary for Code Cafe.
     * Canvas Room size: 960 x 600 pixels (30 x 18.75 tiles of 32x32px).
     */
    static draw(scene: Phaser.Scene) {
        const width = 960
        const height = 600
        const wallHeight = 100

        // 1. Back Brick Wall along the entire top (y: 0 to 96)
        // Wall Base Color: #4a2c20, Brick Pattern Color: #5c3829
        for (let x = 0; x < width; x += 32) {
            for (let y = 0; y < wallHeight; y += 32) {
                scene.add.image(x, y, 'cafe_wall_brick').setOrigin(0, 0).setDepth(0)
            }
        }

        // Skirting Baseboard (#261610) at bottom of wall (y: 94 to 100)
        const wallSkirting = scene.add.graphics()
        wallSkirting.fillStyle(0x261610, 1)
        wallSkirting.fillRect(0, 94, width, 6)
        wallSkirting.setDepth(1)
        
        // 2. Main Cafe Wood Checkerboard Floor (x: 0 to 704, y: 100 to 600)
        // Alternates between cafe_floor_wood_1 (#3a2e2b) and cafe_floor_wood_2 (#332724)
        for (let x = 0; x < 704; x += 32) {
            for (let y = wallHeight; y < height; y += 32) {
                const tileX = Math.floor(x / 32);
                const tileY = Math.floor(y / 32);
                const textureKey = ((tileX + tileY) % 2 === 0) ? 'cafe_floor_wood_1' : 'cafe_floor_wood_2';
                scene.add.image(x, y, textureKey).setOrigin(0, 0).setDepth(0);
            }
        }

        // 3. Right Open Terrace Stone Patio Floor (x: 704 to 960, y: 100 to 600)
        for (let x = 704; x < width; x += 32) {
            for (let y = wallHeight; y < height; y += 32) {
                scene.add.image(x, y, 'cafe_floor_terrace_stone').setOrigin(0, 0).setDepth(0);
            }
        }

        // 4. Subtle Floor Transition Seam between Wood and Terrace Stone
        const floorSeam = scene.add.graphics();
        floorSeam.fillStyle(0x261610, 0.9);
        floorSeam.fillRect(702, wallHeight, 3, height - wallHeight);
        floorSeam.setDepth(1);
    }
}


