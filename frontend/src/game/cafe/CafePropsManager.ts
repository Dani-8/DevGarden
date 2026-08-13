import Phaser from 'phaser';

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
}

export class CafePropsManager {
    static createProps(
        scene: Phaser.Scene,
        obstaclesGroup: Phaser.Physics.Arcade.StaticGroup
    ): CafePropsResult {
        const chairs: CafeChair[] = [];

        // 1. Top Wall Deco & Signage
        // Dark Wooden Brick Backwall Structure behind counter & sign (Centered at x=448)
        const backwall = scene.add.image(448, 72, 'cafe_counter_backwall');
        backwall.setDisplaySize(280, 68);
        backwall.setOrigin(0.5, 0.5);
        backwall.setDepth(15);

        // Classic Open Terrace Carved Oak Wooden Sign Plaque "CODE CAFE"
        const neonSign = scene.add.image(448, 48, 'cafe_neon_sign');
        neonSign.setDisplaySize(130, 35);
        neonSign.setOrigin(0.5, 0.5);
        neonSign.setDepth(20);

        // Wall Poster: "TEA, SLEEP, CODE, REPEAT" with Lush Grass Leaves Effect
        const poster = scene.add.image(720, 52, 'cafe_wall_poster');
        poster.setDisplaySize(85, 75);
        poster.setOrigin(0.5, 0.5);
        poster.setDepth(20);

        // Detailed Chalkboard Wall Menu
        const wallMenu = scene.add.image(130, 52, 'cafe_wall_menu');
        wallMenu.setDisplaySize(140, 70);
        wallMenu.setOrigin(0.5, 0.5);
        wallMenu.setDepth(20);

        // 2. Center Open-Terrace Style Grand Counter & Barista Station (Centered at x=448)
        // Main Cashier Front Counter
        const counter = scene.add.image(448, 135, 'cafe_counter');
        counter.setDisplaySize(280, 48);
        counter.setOrigin(0.5, 0.5);
        counter.setDepth(140);
        scene.physics.add.existing(counter, true);
        obstaclesGroup.add(counter);

        // Left Side Return Counter Wing
        const counterSideL = scene.add.image(300, 115, 'cafe_counter_side');
        counterSideL.setDisplaySize(18, 48);
        counterSideL.setOrigin(0.5, 0.5);
        counterSideL.setDepth(138);
        scene.physics.add.existing(counterSideL, true);
        obstaclesGroup.add(counterSideL);

        // Right Side Return Counter Wing
        const counterSideR = scene.add.image(596, 115, 'cafe_counter_side');
        counterSideR.setDisplaySize(18, 48);
        counterSideR.setOrigin(0.5, 0.5);
        counterSideR.setDepth(138);
        scene.physics.add.existing(counterSideR, true);
        obstaclesGroup.add(counterSideR);

        // Barista NPC behind counter
        const baristaSprite = scene.add.image(428, 108, 'cafe_barista');
        baristaSprite.setOrigin(0.5, 0.85);
        baristaSprite.setDepth(130);

        // POS Cash Register Terminal on Counter
        const posTerminal = scene.add.image(463, 126, 'cafe_pos_terminal');
        posTerminal.setOrigin(0.5, 0.85);
        posTerminal.setDepth(145);

        // Pastry Display Case on right side of counter
        const pastryDisplay = scene.add.image(523, 126, 'cafe_pastry_display');
        pastryDisplay.setOrigin(0.5, 0.85);
        pastryDisplay.setDepth(145);

        // Commercial Dual-Grouphead Espresso Machine on left side of counter
        const espressoMachine = scene.add.image(353, 126, 'cafe_espresso_machine');
        espressoMachine.setOrigin(0.5, 0.85);
        espressoMachine.setDepth(145);

        // Animated Rising Steam / Smoke Particle Emitter from Coffee Machine
        if (scene.add.particles) {
            const steam = scene.add.particles(353, 100, 'cafe_steam_particle', {
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

        // 4. Right Side: Open Terrace Glass Window Wall & Lush Ivy Vines
        const terraceWindow = scene.add.image(1024, 52, 'cafe_terrace_window');
        terraceWindow.setOrigin(0.5, 0.5);
        terraceWindow.setDepth(20);

        const ivyVine1 = scene.add.image(975, 88, 'cafe_ivy_vine');
        ivyVine1.setOrigin(0.5, 0.5);
        ivyVine1.setDepth(25);

        const ivyVine2 = scene.add.image(1073, 88, 'cafe_ivy_vine');
        ivyVine2.setOrigin(0.5, 0.5);
        ivyVine2.setDepth(25);

        // 5. Centerpiece Grand Garden Planter Island (Centered at x=448, y=335)
        const centerPlanter = scene.add.image(448, 335, 'cafe_center_garden_planter');
        centerPlanter.setDisplaySize(88, 268);
        centerPlanter.setOrigin(0.5, 0.5);
        centerPlanter.setDepth(335);
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
            lamp.setOrigin(0.5, 0.85);
            lamp.setDepth(y);
            scene.physics.add.existing(lamp, true);
            obstaclesGroup.add(lamp);
        };

        // Counter Flanking Plant Pots
        spawnPot(276, 110);
        spawnPot(618, 110);
        spawnPot(100, 125); // Next to bookshelf
        spawnPot(20, 550);

        // Left Side of Center Garden Planter: Alternating Lamps & Pots snug against planter (x: 394)
        spawnLamp(398, 230); // Lamp 1
        spawnPot(395, 265);  // Pot 1
        spawnLamp(398, 305); // Lamp 2
        spawnPot(395, 340);  // Pot 2
        spawnLamp(398, 380); // Lamp 3
        spawnPot(395, 415);  // Pot 3
        spawnLamp(398, 455); // Lamp 4

        // Right Side of Center Garden Planter: Alternating Lamps & Pots snug against planter (x: 502)
        spawnLamp(494, 230); // Lamp 1
        spawnPot(498, 265);  // Pot 1
        spawnLamp(494, 305); // Lamp 2
        spawnPot(498, 340);  // Pot 2
        spawnLamp(494, 380); // Lamp 3
        spawnPot(498, 415);  // Pot 3
        spawnLamp(494, 455); // Lamp 4

        // Terrace Seam Divider Plant Line (x: 896)
        spawnPot(896, 150);
        spawnPot(896, 270);
        spawnPot(896, 410);
        spawnPot(896, 530);

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

        // Left Seating Column (Wood Floor)
        createTable4Chairs(230, 240, 'cafe_interior_table_laptop');
        createTable4Chairs(230, 335, 'cafe_interior_table_coffee');
        createTable4Chairs(230, 430, 'cafe_interior_table_plant');

        // Right Seating Column (Wood Floor)
        createTable4Chairs(666, 240, 'cafe_interior_table_coffee');
        createTable4Chairs(666, 335, 'cafe_interior_table_plant');
        createTable4Chairs(666, 430, 'cafe_interior_table_laptop');

        // Far Left Wall Leather Lounge Booth Sofas
        const createSofaSet = (y: number) => {
            const sofa = scene.add.image(0, y, 'cafe_sofa_side');
            sofa.setOrigin(0, 0.5);
            sofa.setDepth(y);
            scene.physics.add.existing(sofa, true);
            obstaclesGroup.add(sofa);

            const seatTop = scene.add.image(22, y - 12, 'cafe_interior_chair');
            seatTop.setVisible(false);
            chairs.push({ x: 22, y: y - 12, sprite: seatTop, dir: 'sofa' });

            const seatBottom = scene.add.image(22, y + 12, 'cafe_interior_chair');
            seatBottom.setVisible(false);
            chairs.push({ x: 22, y: y + 12, sprite: seatBottom, dir: 'sofa' });
        };

        createSofaSet(270);
        createSofaSet(390);

        // Terrace Outdoor Patio Sets (2 Chairs: Left & Right)
        const createPatioSet2Chairs = (x: number, y: number) => {
            const table = scene.add.image(x, y, 'cafe_interior_table_plant');
            table.setOrigin(0.5, 0.85);
            table.setDepth(y);
            scene.physics.add.existing(table, true);
            const tableBody = table.body as Phaser.Physics.Arcade.StaticBody;
            tableBody.setSize(30, 24);
            tableBody.setOffset(9, 18);
            obstaclesGroup.add(table);

            const chairL = scene.add.image(x - 26, y - 3, 'cafe_chair_right');
            chairL.setOrigin(0.5, 0.85);
            chairL.setDepth(y - 2);
            scene.physics.add.existing(chairL, true);
            const lBody = chairL.body as Phaser.Physics.Arcade.StaticBody;
            lBody.setSize(16, 16);
            lBody.setOffset(3, 8);
            obstaclesGroup.add(chairL);
            chairs.push({ x: x - 26, y: y - 3, sprite: chairL, dir: 'left' });

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

        createPatioSet2Chairs(1024, 240);
        createPatioSet2Chairs(1024, 335);
        createPatioSet2Chairs(1024, 430);

        // 7. Grand Entrance Area & Gateway (Centered at x=448)
        // Welcome Entrance Step Portal Mat at (448, 580)
        const exitMat = scene.add.image(448, 580, 'cafe_entrance_gateway');
        exitMat.setDisplaySize(100, 40);
        exitMat.setOrigin(0.5, 0.5);
        exitMat.setDepth(10);

        // Left Entrance Pillar Post with Lantern
        const pillarLeft = scene.add.image(383, 568, 'cafe_entrance_pillar');
        pillarLeft.setDisplaySize(32, 56);
        pillarLeft.setOrigin(0.5, 0.85);
        pillarLeft.setDepth(568);
        scene.physics.add.existing(pillarLeft, true);
        obstaclesGroup.add(pillarLeft);

        // Right Entrance Pillar Post with Lantern
        const pillarRight = scene.add.image(513, 568, 'cafe_entrance_pillar');
        pillarRight.setDisplaySize(32, 56);
        pillarRight.setOrigin(0.5, 0.85);
        pillarRight.setDepth(568);
        scene.physics.add.existing(pillarRight, true);
        obstaclesGroup.add(pillarRight);

        // Potted plants beside entrance pillars
        spawnPot(343, 572);
        spawnPot(553, 572);

        // Left Bottom Continuous Wall with Green Boxwood Planter (x: 0 to 367)
        const planterWallLeft = scene.add.image(183, 584, 'cafe_entrance_planter_wall');
        planterWallLeft.setDisplaySize(367, 32);
        planterWallLeft.setOrigin(0.5, 0.5);
        planterWallLeft.setDepth(584);

        // Right Bottom Continuous Wall with Green Boxwood Planter (x: 528 to 1152)
        const planterWallRight = scene.add.image(840, 584, 'cafe_entrance_planter_wall');
        planterWallRight.setDisplaySize(624, 32);
        planterWallRight.setOrigin(0.5, 0.5);
        planterWallRight.setDepth(584);

        // 8. Canvas Outer Wall Colliders
        const addWallCollider = (x: number, y: number, w: number, h: number) => {
            const wall = scene.add.zone(x, y, w, h);
            scene.physics.add.existing(wall, true);
            obstaclesGroup.add(wall);
        };

        addWallCollider(576, 50, 1152, 100);  // Top brick wall
        addWallCollider(6, 300, 12, 600);    // Left canvas edge
        addWallCollider(1146, 300, 12, 600);  // Right canvas edge
        addWallCollider(183, 588, 367, 24);  // Bottom left wall collider
        addWallCollider(840, 588, 624, 24);  // Bottom right wall collider

        return {
            baristaSprite,
            exitMat,
            chairs,
        };
    }
}

