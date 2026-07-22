import Phaser from 'phaser';
import { PlayerState } from '../../types/index.js';

export class PlayerManager {
    private scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    createAnimations(tier: string) {
        const keys = ['walk_down', 'walk_up', 'walk_left', 'walk_right', 'idle_down', 'idle_up', 'idle_left', 'idle_right'];

        keys.forEach(key => {
            const animKey = `${key}_${tier}`;
            if (!this.scene.anims.exists(animKey)) {
                let startFrame = 0;
                let endFrame = 3;

                if (key.includes('up')) { startFrame = 4; endFrame = 7; }
                if (key.includes('left')) { startFrame = 8; endFrame = 11; }
                if (key.includes('right')) { startFrame = 12; endFrame = 15; }

                if (key.startsWith('idle')) {
                    this.scene.anims.create({
                        key: animKey,
                        frames: [{ key: `player_${tier}`, frame: startFrame }],
                        frameRate: 1,
                        repeat: -1,
                    });
                } else {
                    this.scene.anims.create({
                        key: animKey,
                        frames: this.scene.anims.generateFrameNumbers(`player_${tier}`, { start: startFrame, end: endFrame }),
                        frameRate: 8,
                        repeat: -1,
                    });
                }
            }
        });
    }
}
