import Phaser from 'phaser';

export class WaterPropsManager {
    public static spawnFountain(scene: Phaser.Scene, obstaclesGroup: Phaser.Physics.Arcade.StaticGroup, fountainX: number, fountainY: number) {
        const fountain = scene.add.image(fountainX, fountainY, 'fountain_prop');
        fountain.setOrigin(0.5, 0.6);
        fountain.setDepth(fountainY);
        scene.physics.add.existing(fountain, true);

        const fountainBody = fountain.body as Phaser.Physics.Arcade.StaticBody;
        const fw = 44;
        const fh = 30;
        const fox = 10;
        const foy = 30;

        fountainBody.updateFromGameObject = function (this: Phaser.Physics.Arcade.StaticBody) {
            const gameObject = this.gameObject as any;
            this.width = fw;
            this.height = fh;
            this.halfWidth = fw / 2;
            this.halfHeight = fh / 2;
            this.x = (gameObject.x - (gameObject.originX * gameObject.displayWidth)) + fox;
            this.y = (gameObject.y - (gameObject.originY * gameObject.displayHeight)) + foy;
            this.center.setTo(this.x + this.halfWidth, this.y + this.halfHeight);
            return this;
        };
        fountainBody.updateFromGameObject();
        obstaclesGroup.add(fountain);

        const waterParticles = scene.add.particles(fountainX, fountainY - 18, 'water_particle', {
            scale: { start: 1, end: 0 },
            alpha: { start: 0.8, end: 0.1 },
            speed: { min: 20, max: 40 },
            angle: { min: -130, max: -50 },
            gravityY: 120,
            lifespan: 600,
            frequency: 35,
        });
        waterParticles.setDepth(fountainY + 1);
    }

    public static spawnRiverColliders(scene: Phaser.Scene, obstaclesGroup: Phaser.Physics.Arcade.StaticGroup) {
        const northWater = scene.add.zone(816, 112, 65, 224);
        scene.physics.add.existing(northWater, true);
        obstaclesGroup.add(northWater);

        const midWater = scene.add.zone(816, 400, 65, 288);
        scene.physics.add.existing(midWater, true);
        obstaclesGroup.add(midWater);

        const southWater = scene.add.zone(816, 624, 65, 96);
        scene.physics.add.existing(southWater, true);
        obstaclesGroup.add(southWater);

        const riverSparkles = scene.add.particles(800, 384, 'water_particle', {
            scale: { start: 0.8, end: 0.1 },
            alpha: { start: 0.7, end: 0 },
            speedY: { min: 20, max: 50 },
            speedX: { min: -10, max: 10 },
            lifespan: 1200,
            frequency: 150,
            emitZone: {
                type: 'random',
                source: new Phaser.Geom.Rectangle(-15, -350, 64, 700) as any
            }
        });
        riverSparkles.setDepth(-8);
    }

    public static spawnLivelyDuck(
        scene: Phaser.Scene,
        startX: number,
        startY: number,
        minY: number,
        maxY: number
    ) {
        const duck = scene.add.image(startX, startY, 'duck_prop');
        duck.setDepth(-9);

        const ripples = scene.add.particles(0, 0, 'water_particle', {
            scale: { start: 0.5, end: 0 },
            alpha: { start: 0.4, end: 0 },
            speedY: { min: -8, max: 8 },
            speedX: { min: -5, max: 5 },
            lifespan: 700,
            frequency: 250,
            follow: duck
        });
        ripples.setDepth(-9.5);

        const swimDuration = 7000 + Math.random() * 3000;
        scene.tweens.add({
            targets: duck,
            y: { from: minY, to: maxY },
            duration: swimDuration,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        scene.tweens.add({
            targets: duck,
            x: startX + 14,
            duration: 2200 + Math.random() * 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
            onYoyo: () => duck.setFlipX(true),
            onRepeat: () => duck.setFlipX(false)
        });

        scene.tweens.add({
            targets: duck,
            scaleY: 0.92,
            duration: 1100 + Math.random() * 400,
            yoyo: true,
            repeat: -1,
            ease: 'Quad.easeInOut'
        });
    }
}
