import Phaser from 'phaser';

export class MapManager {
    private scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    drawTilemap() {
        for (let tx = 0; tx < 32; tx++) {
            for (let ty = 0; ty < 24; ty++) {
                const px = tx * 32;
                const py = ty * 32;

                const isPathX = (tx >= 6 && tx <= 26) && (ty === 7 || ty === 17);
                const isPathY = (ty >= 7 && ty <= 17) && (tx === 6 || tx === 26);
                const isCenterAisle = (tx === 16 && ty >= 7 && ty <= 17) || (ty === 12 && tx >= 6 && tx <= 26);

                if (isPathX || isPathY || isCenterAisle) {
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
        }
    }
}
