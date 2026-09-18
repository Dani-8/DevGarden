import Phaser from 'phaser';
import { CafeCommunityWing } from './communityWing/CafeCommunityWing';

export interface CafeChair {
    x: number;
    y: number;
    sprite: Phaser.GameObjects.Image;
    dir?: 'up' | 'down' | 'left' | 'right' | 'sofa';
}

export interface CafePropsResult {
    baristaSprite: Phaser.GameObjects.Image;
    exitMat: Phaser.GameObjects.Image;
    chairs: CafeChair[];
    showcasePos?: { x: number; y: number };
}

export class CafePropsManager {
    static createProps(
        scene: Phaser.Scene,
        obstaclesGroup: Phaser.Physics.Arcade.StaticGroup
    ): CafePropsResult {
        const chairs: CafeChair[] = [];

        // 1. Top Wall Deco & Signage
        // Dark Wooden Brick Backwall Structure behind counter & sign (Centered at true center x=480)
        const backwall = scene.add.image(480, 72, 'cafe_counter_backwall');
        backwall.setDisplaySize(280, 68);
        backwall.setOrigin(0.5, 0.5);
        backwall.setDepth(15);

        // Classic Open Terrace Carved Oak Wooden Sign Plaque "CODE CAFE"
        const neonSign = scene.add.image(480, 48, 'cafe_neon_sign');
        neonSign.setDisplaySize(130, 35);
        neonSign.setOrigin(0.5, 0.5);
        neonSign.setDepth(20);

        // Wall Poster: "TEA, SLEEP, CODE, REPEAT" (Right side wall: x=720)
        const poster = scene.add.image(720, 52, 'cafe_wall_poster');
        poster.setDisplaySize(85, 75);
        poster.setOrigin(0.5, 0.5);
        poster.setDepth(20);

        // Detailed Chalkboard Wall Menu (Left side wall: x=240)
        const wallMenu = scene.add.image(240, 52, 'cafe_wall_menu');
        wallMenu.setDisplaySize(140, 70);
        wallMenu.setOrigin(0.5, 0.5);
        wallMenu.setDepth(20);

        // 2. Center Open-Terrace Style Grand Counter & Barista Station (Centered at x=480)
        // Main Cashier Front Counter
        const counter = scene.add.image(480, 135, 'cafe_counter');
        counter.setDisplaySize(280, 48);
        counter.setOrigin(0.5, 0.5);
        counter.setDepth(140);
        scene.physics.add.existing(counter, true);
        obstaclesGroup.add(counter);

        // Left Side Return Counter Wing
        const counterSideL = scene.add.image(332, 115, 'cafe_counter_side');
        counterSideL.setDisplaySize(18, 48);
        counterSideL.setOrigin(0.5, 0.5);
        counterSideL.setDepth(138);
        scene.physics.add.existing(counterSideL, true);
        obstaclesGroup.add(counterSideL);

        // Right Side Return Counter Wing
        const counterSideR = scene.add.image(628, 115, 'cafe_counter_side');
        counterSideR.setDisplaySize(18, 48);
        counterSideR.setOrigin(0.5, 0.5);
        counterSideR.setDepth(138);
        scene.physics.add.existing(counterSideR, true);
        obstaclesGroup.add(counterSideR);

        // Barista NPC behind counter
        const baristaSprite = scene.add.image(460, 108, 'cafe_barista');
        baristaSprite.setOrigin(0.5, 0.85);
        baristaSprite.setDepth(130);

        // POS Cash Register Terminal on Counter
        const posTerminal = scene.add.image(495, 126, 'cafe_pos_terminal');
        posTerminal.setOrigin(0.5, 0.85);
        posTerminal.setDepth(145);

        // Pastry Display Case on right side of counter
        const pastryDisplay = scene.add.image(555, 126, 'cafe_pastry_display');
        pastryDisplay.setOrigin(0.5, 0.85);
        pastryDisplay.setDepth(145);

        // Commercial Dual-Grouphead Espresso Machine on left side of counter
        const espressoMachine = scene.add.image(385, 126, 'cafe_espresso_machine');
        espressoMachine.setOrigin(0.5, 0.85);
        espressoMachine.setDepth(145);

        // Animated Rising Steam / Smoke Particle Emitter from Coffee Machine
        if (scene.add.particles) {
            const steam = scene.add.particles(385, 100, 'cafe_steam_particle', {
                speedY: { min: -12, max: -26 },
                speedX: { min: -3, max: 3 },
                scale: { start: 0.6, end: 1.8 },
                alpha: { start: 0.7, end: 0 },
                lifespan: 1300,
                frequency: 240,
            });
            steam.setDepth(150);
        }

        // 3. Left Side: Grand Library Bookshelf
        const bookshelf = scene.add.image(50, 120, 'cafe_bookshelf');
        bookshelf.setOrigin(0.5, 0.85);
        bookshelf.setDepth(120);
        scene.physics.add.existing(bookshelf, true);
        const bsBody = bookshelf.body as Phaser.Physics.Arcade.StaticBody;
        bsBody.setSize(50, 32);
        bsBody.setOffset(3, 52);
        obstaclesGroup.add(bookshelf);

        // 4. Centerpiece Grand Garden Planter Island (Centered at true center x=480, y=370)
        const centerPlanter = scene.add.image(480, 370, 'cafe_center_garden_planter');
        centerPlanter.setDisplaySize(88, 320);
        centerPlanter.setOrigin(0.5, 0.5);
        centerPlanter.setDepth(200);
        scene.physics.add.existing(centerPlanter, true);
        obstaclesGroup.add(centerPlanter);

        // Helper: Spawn Tall Luxury Ceramic & Brass Plant Pots
        const spawnPot = (x: number, y: number) => {
            const pot = scene.add.image(x, y, 'cafe_luxury_plant_pot');
            pot.setOrigin(0.5, 0.85);
            pot.setDepth(y);
            scene.physics.add.existing(pot, true);
            obstaclesGroup.add(pot);
        };

        // Helper: Spawn Standalone Garden Lamp Posts
        const spawnLamp = (x: number, y: number) => {
            const lamp = scene.add.image(x, y, 'cafe_garden_lamp_post');
            lamp.setOrigin(0.5, 0.92);
            lamp.setDepth(y);
            scene.physics.add.existing(lamp, true);
            const lBody = lamp.body as Phaser.Physics.Arcade.StaticBody;
            lBody.setSize(12, 10);
            lBody.setOffset(6, 44);
            obstaclesGroup.add(lamp);
        };

        // Counter Flanking Plant Pots
        spawnPot(310, 110);
        spawnPot(650, 110);
        spawnPot(100, 125); // Next to bookshelf
        spawnPot(20, 600);

        // Left Side of Center Garden Planter: Alternating Lamps & Pots snug against planter (x=430)
        spawnLamp(430, 240); // Lamp 1
        spawnPot(427, 285);  // Pot 1
        spawnLamp(430, 330); // Lamp 2
        spawnPot(427, 375);  // Pot 2
        spawnLamp(430, 420); // Lamp 3
        spawnPot(427, 465);  // Pot 3
        spawnLamp(430, 510); // Lamp 4

        // Right Side of Center Garden Planter: Alternating Lamps & Pots snug against planter (x=530)
        spawnLamp(530, 240); // Lamp 1
        spawnPot(533, 285);  // Pot 1
        spawnLamp(530, 330); // Lamp 2
        spawnPot(533, 375);  // Pot 2
        spawnLamp(530, 420); // Lamp 3
        spawnPot(533, 465);  // Pot 3
        spawnLamp(530, 510); // Lamp 4

        // 6. Round Dining Table Sets with 4 Red Cushion Armchairs each
        const createTable4Chairs = (x: number, y: number, textureKey: string = 'cafe_interior_table') => {
            const table = scene.add.image(x, y, textureKey);
            table.setOrigin(0.5, 0.85);
            table.setDepth(y);
            scene.physics.add.existing(table, true);
            const tableBody = table.body as Phaser.Physics.Arcade.StaticBody;
            tableBody.setSize(30, 24);
            tableBody.setOffset(9, 18);
            obstaclesGroup.add(table);

            // Top Chair (Facing DOWN towards table)
            const chairTop = scene.add.image(x, y - 26, 'cafe_chair_down');
            chairTop.setOrigin(0.5, 0.85);
            chairTop.setDepth(y - 10);
            scene.physics.add.existing(chairTop, true);
            const topBody = chairTop.body as Phaser.Physics.Arcade.StaticBody;
            topBody.setSize(16, 16);
            topBody.setOffset(3, 8);
            obstaclesGroup.add(chairTop);
            chairs.push({ x: x, y: y - 26, sprite: chairTop, dir: 'up' });

            // Bottom Chair (Facing UP towards table)
            const chairBottom = scene.add.image(x, y + 20, 'cafe_chair_up');
            chairBottom.setOrigin(0.5, 0.85);
            chairBottom.setDepth(y + 10);
            scene.physics.add.existing(chairBottom, true);
            const bottomBody = chairBottom.body as Phaser.Physics.Arcade.StaticBody;
            bottomBody.setSize(16, 16);
            bottomBody.setOffset(3, 8);
            obstaclesGroup.add(chairBottom);
            chairs.push({ x: x, y: y + 20, sprite: chairBottom, dir: 'down' });

            // Left Chair (Facing RIGHT towards table)
            const chairL = scene.add.image(x - 26, y - 3, 'cafe_chair_right');
            chairL.setOrigin(0.5, 0.85);
            chairL.setDepth(y - 2);
            scene.physics.add.existing(chairL, true);
            const lBody = chairL.body as Phaser.Physics.Arcade.StaticBody;
            lBody.setSize(16, 16);
            lBody.setOffset(3, 8);
            obstaclesGroup.add(chairL);
            chairs.push({ x: x - 26, y: y - 3, sprite: chairL, dir: 'left' });

            // Right Chair (Facing LEFT towards table)
            const chairR = scene.add.image(x + 26, y - 3, 'cafe_chair_left');
            chairR.setOrigin(0.5, 0.85);
            chairR.setDepth(y - 2);
            scene.physics.add.existing(chairR, true);
            const rBody = chairR.body as Phaser.Physics.Arcade.StaticBody;
            rBody.setSize(16, 16);
            rBody.setOffset(3, 8);
            obstaclesGroup.add(chairR);
            chairs.push({ x: x + 26, y: y - 3, sprite: chairR, dir: 'right' });
        };
