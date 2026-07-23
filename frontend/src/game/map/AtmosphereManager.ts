import Phaser from 'phaser';
import { WORLD_WIDTH, WORLD_HEIGHT } from './MapConfig.js';

export class AtmosphereManager {
    private scene: Phaser.Scene;
    private atmosphereOverlay: Phaser.GameObjects.Rectangle | null = null;
    private fireflies: Phaser.GameObjects.Arc[] = [];

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    initAtmosphere() {
        // 1. Full world ambient lighting overlay
        this.atmosphereOverlay = this.scene.add.rectangle(
            WORLD_WIDTH / 2,
            WORLD_HEIGHT / 2,
            WORLD_WIDTH,
            WORLD_HEIGHT,
            0x020617,
            0.08
        );
        this.atmosphereOverlay.setDepth(2500);

        // 2. Sakura petals floating in East Zen Garden
        this.scene.add.particles(1580, 200, 'sakura_petal', {
            scale: { start: 0.8, end: 0.1 },
            alpha: { start: 0.8, end: 0 },
            speedX: { min: -20, max: -50 },
            speedY: { min: 10, max: 30 },
            lifespan: 3000,
            frequency: 200,
            emitZone: {
                type: 'random',
                source: new Phaser.Geom.Rectangle(1120, 0, 928, 768) as any,
            }
        }).setDepth(2400);

        // 3. Glowing Fireflies over the river
        for (let i = 0; i < 20; i++) {
            const x = 960 + Math.random() * 160;
            const y = Math.random() * WORLD_HEIGHT;
            const fly = this.scene.add.circle(x, y, 2, 0xfde047, 0.8);
            fly.setDepth(2400);
            this.fireflies.push(fly);

            this.scene.tweens.add({
                targets: fly,
                x: x + (Math.random() * 40 - 20),
                y: y + (Math.random() * 40 - 20),
                alpha: { min: 0.2, max: 0.9 },
                duration: 2000 + Math.random() * 2000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut',
            });
        }
    }
}
