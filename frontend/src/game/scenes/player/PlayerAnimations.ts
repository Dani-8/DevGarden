import Phaser from 'phaser';

export function createAllPlayerAnimations(scene: Phaser.Scene) {
    const tiers = ['green', 'blue', 'purple', 'crimson', 'cosmic'];

    tiers.forEach(tier => {
        // Walk Down (Row 0)
        if (!scene.anims.exists(`walk_down_${tier}`)) {
            scene.anims.create({
                key: `walk_down_${tier}`,
                frames: scene.anims.generateFrameNumbers(`player_${tier}`, { start: 0, end: 2 }),
                frameRate: 8,
                repeat: -1,
            });
            scene.anims.create({
                key: `idle_down_${tier}`,
                frames: [{ key: `player_${tier}`, frame: 1 }],
                frameRate: 1,
            });

            // Walk Left
            scene.anims.create({
                key: `walk_left_${tier}`,
                frames: scene.anims.generateFrameNumbers(`player_${tier}`, { start: 6, end: 8 }),
                frameRate: 8,
                repeat: -1,
            });
            scene.anims.create({
                key: `idle_left_${tier}`,
                frames: [{ key: `player_${tier}`, frame: 7 }],
                frameRate: 1,
            });

            // Walk Right
            scene.anims.create({
                key: `walk_right_${tier}`,
                frames: scene.anims.generateFrameNumbers(`player_${tier}`, { start: 3, end: 5 }),
                frameRate: 8,
                repeat: -1,
            });
            scene.anims.create({
                key: `idle_right_${tier}`,
                frames: [{ key: `player_${tier}`, frame: 4 }],
                frameRate: 1,
            });

            // Walk Up
            scene.anims.create({
                key: `walk_up_${tier}`,
                frames: scene.anims.generateFrameNumbers(`player_${tier}`, { start: 9, end: 11 }),
                frameRate: 8,
                repeat: -1,
            });
            scene.anims.create({
                key: `idle_up_${tier}`,
                frames: [{ key: `player_${tier}`, frame: 10 }],
                frameRate: 1,
            });
        }
    });
}
