import Phaser from 'phaser';

export class PropBuilder {
    private scene: Phaser.Scene;
    private obstaclesGroup: Phaser.Physics.Arcade.StaticGroup;
    public leaderboardTreeObj!: Phaser.GameObjects.Image;

    constructor(scene: Phaser.Scene, obstaclesGroup: Phaser.Physics.Arcade.StaticGroup) {
        this.scene = scene;
        this.obstaclesGroup = obstaclesGroup;
    }

    buildAllProps() {
        this.buildWestGardenProps();
        this.buildRiverColliders();
        this.buildEastZenProps();
        this.buildSouthTownProps();
    }

    private buildWestGardenProps() {
        // 1. Boundary Trees
        for (let x = 32; x <= 920; x += 96) {
            this.spawnTree(x, 24, 'tree_prop');
        }
        for (let y = 120; y < 700; y += 120) {
            this.spawnTree(24, y, 'tree_prop');
        }

        // 2. Central Fountain
        const fountain = this.scene.add.image(527, 400, 'fountain_prop');
        fountain.setOrigin(0.5, 0.6);
        fountain.setDepth(400);
        this.scene.physics.add.existing(fountain, true);
        this.obstaclesGroup.add(fountain);

        // Fountain water particles
        this.scene.add.particles(527, 386, 'water_particle', {
            scale: { start: 1, end: 0 },
            alpha: { start: 0.8, end: 0.1 },
            speed: { min: 20, max: 40 },
            angle: { min: -130, max: -50 },
            gravityY: 120,
            lifespan: 600,
            frequency: 35,
        }).setDepth(401);

        // 3. West Benches
        this.spawnBench(380, 290, 'bench_horizontal');
        this.spawnBench(644, 290, 'bench_horizontal');
        this.spawnBench(380, 478, 'bench_horizontal');
        this.spawnBench(644, 478, 'bench_horizontal');

        // 4. Leaderboard Tree
        this.leaderboardTreeObj = this.scene.add.image(512, 110, 'leaderboard_tree');
        this.leaderboardTreeObj.setOrigin(0.5, 0.8);
        this.leaderboardTreeObj.setDepth(110);
        this.scene.physics.add.existing(this.leaderboardTreeObj, true);
        this.obstaclesGroup.add(this.leaderboardTreeObj);

        // Floating crown above Leaderboard Tree
        const crown = this.scene.add.image(512, 44, 'leaderboard_crown_icon');
        crown.setDepth(2000);
        this.scene.tweens.add({
            targets: crown,
            y: 35,
            duration: 1200,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    private buildRiverColliders() {
        // River runs vertically between x=960 and x=1120.
        // We add static collision blocks for the water sections EXCEPT where bridges cross!
        const riverYRanges = [
            { yMin: 0, yMax: 220 },      // Above North Bridge
            { yMin: 300, yMax: 480 },    // Between North & Center Bridge
            { yMin: 560, yMax: 960 },    // Between Center & South Bridge
            { yMin: 1040, yMax: 1536 }   // Below South Bridge
        ];

        riverYRanges.forEach(range => {
            const height = range.yMax - range.yMin;
            const centerY = range.yMin + height / 2;
            const wall = this.scene.add.zone(1040, centerY, 140, height);
            this.scene.physics.add.existing(wall, true);
            this.obstaclesGroup.add(wall);
        });
    }

    private buildEastZenProps() {
        // Sakura trees in East Garden
        const sakuraCoords = [
            { x: 1250, y: 150 }, { x: 1450, y: 100 }, { x: 1700, y: 120 }, { x: 1950, y: 150 },
            { x: 1250, y: 650 }, { x: 1500, y: 680 }, { x: 1750, y: 650 }, { x: 1980, y: 600 },
            { x: 1980, y: 350 }
        ];
        sakuraCoords.forEach(c => {
            this.spawnTree(c.x, c.y, 'sakura_tree_prop');
        });

        // Bamboo grove
        for (let y = 220; y <= 500; y += 60) {
            const bamboo = this.scene.add.image(1180, y, 'bamboo_prop');
            bamboo.setOrigin(0.5, 0.9).setDepth(y);
            this.scene.physics.add.existing(bamboo, true);
            this.obstaclesGroup.add(bamboo);
        }

        // Zen Benches
        this.spawnBench(1400, 320, 'bench_horizontal');
        this.spawnBench(1700, 320, 'bench_horizontal');
    }

    private buildSouthTownProps() {
        // 1. South Garden Gate Archways
        const gates = [
            { x: 512, y: 750 },
            { x: 1536, y: 750 }
        ];
        gates.forEach(g => {
            const gate = this.scene.add.image(g.x, g.y, 'garden_gate_arch');
            gate.setOrigin(0.5, 0.9).setDepth(g.y);
            this.scene.physics.add.existing(gate, true);
            this.obstaclesGroup.add(gate);
        });

        // 2. Street Lamps along the boulevard
        const lampXs = [200, 600, 1000, 1400, 1800];
        lampXs.forEach(lx => {
            const lamp = this.scene.add.image(lx, 830, 'street_lamp_prop');
            lamp.setOrigin(0.5, 0.9).setDepth(830);
            this.scene.physics.add.existing(lamp, true);
            this.obstaclesGroup.add(lamp);
        });

        // 3. Code Cafe Storefront
        const cafe = this.scene.add.image(1024, 1320, 'cafe_storefront_prop');
        cafe.setOrigin(0.5, 0.85).setDepth(1320);
        this.scene.physics.add.existing(cafe, true);
        this.obstaclesGroup.add(cafe);

        // 4. Bus Stop Sign
        const busStop = this.scene.add.image(400, 1250, 'bus_stop_sign');
        busStop.setOrigin(0.5, 0.9).setDepth(1250);
        this.scene.physics.add.existing(busStop, true);
        this.obstaclesGroup.add(busStop);
    }

    private spawnTree(x: number, y: number, key: string) {
        const tree = this.scene.add.image(x, y, key);
        tree.setOrigin(0.5, 0.85);
        tree.setDepth(y);
        this.scene.physics.add.existing(tree, true);
        this.obstaclesGroup.add(tree);
    }

    private spawnBench(x: number, y: number, key: string) {
        const bench = this.scene.add.image(x, y, key);
        bench.setOrigin(0.5);
        bench.setDepth(y);
        this.scene.physics.add.existing(bench, true);
        this.obstaclesGroup.add(bench);
    }
}
