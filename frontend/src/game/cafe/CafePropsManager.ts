import Phaser from 'phaser';

export interface CafeChair {
    x: number;
    y: number;
    sprite: Phaser.GameObjects.Image;
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
        // Dark Wooden Brick Backwall Structure behind counter & sign (Centered at x=352)
        const backwall = scene.add.image(352, 72, 'cafe_counter_backwall');
        backwall.setDisplaySize(280, 68);
        backwall.setOrigin(0.5, 0.5);
        backwall.setDepth(15);

        // Classic Open Terrace Carved Oak Wooden Sign Plaque "CODE CAFE"
        const neonSign = scene.add.image(352, 48, 'cafe_neon_sign');
        neonSign.setDisplaySize(130, 35);
        neonSign.setOrigin(0.5, 0.5);
        neonSign.setDepth(20);

        // Wall Poster: "COFFEE FOCUS FLOW"
        const poster = scene.add.image(590, 52, 'cafe_wall_poster');
        poster.setDisplaySize(100, 65);
        poster.setOrigin(0.5, 0.5);
        poster.setDepth(20);

        // Detailed Chalkboard Wall Menu
        const wallMenu = scene.add.image(110, 52, 'cafe_wall_menu');
        wallMenu.setDisplaySize(140, 70);
        wallMenu.setOrigin(0.5, 0.5);
        wallMenu.setDepth(20);

        // 2. Center Open-Terrace Style Grand Counter & Barista Station (Centered at x=352)
        // Main Cashier Front Counter
        const counter = scene.add.image(352, 135, 'cafe_counter');
        counter.setDisplaySize(280, 48);
        counter.setOrigin(0.5, 0.5);
        counter.setDepth(140);
        scene.physics.add.existing(counter, true);
        obstaclesGroup.add(counter);

        // Left Side Return Counter Wing
        const counterSideL = scene.add.image(204, 115, 'cafe_counter_side');
        counterSideL.setDisplaySize(18, 48);
        counterSideL.setOrigin(0.5, 0.5);
        counterSideL.setDepth(138);
        scene.physics.add.existing(counterSideL, true);
        obstaclesGroup.add(counterSideL);

        // Right Side Return Counter Wing
        const counterSideR = scene.add.image(500, 115, 'cafe_counter_side');
        counterSideR.setDisplaySize(18, 48);
        counterSideR.setOrigin(0.5, 0.5);
        counterSideR.setDepth(138);
        scene.physics.add.existing(counterSideR, true);
        obstaclesGroup.add(counterSideR);

        // Barista NPC behind counter
        const baristaSprite = scene.add.image(332, 108, 'cafe_barista');
        baristaSprite.setOrigin(0.5, 0.85);
        baristaSprite.setDepth(130);

        // POS Cash Register Terminal on Counter
        const posTerminal = scene.add.image(367, 126, 'cafe_pos_terminal');
        posTerminal.setOrigin(0.5, 0.85);
        posTerminal.setDepth(145);

        // Pastry Display Case on right side of counter
        const pastryDisplay = scene.add.image(427, 126, 'cafe_pastry_display');
        pastryDisplay.setOrigin(0.5, 0.85);
        pastryDisplay.setDepth(145);

        // Commercial Dual-Grouphead Espresso Machine on left side of counter
        const espressoMachine = scene.add.image(257, 126, 'cafe_espresso_machine');
        espressoMachine.setOrigin(0.5, 0.85);
        espressoMachine.setDepth(145);

        // Animated Rising Steam / Smoke Particle Emitter from Coffee Machine
        if (scene.add.particles) {
            const steam = scene.add.particles(257, 100, 'cafe_steam_particle', {
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
        const bookshelf = scene.add.image(40, 125, 'cafe_bookshelf');
        bookshelf.setOrigin(0.5, 0.85);
        bookshelf.setDepth(120);
        scene.physics.add.existing(bookshelf, true);
        obstaclesGroup.add(bookshelf);

        // 4. Right Side: Open Terrace Glass Window Wall & Lush Ivy Vines
        const terraceWindow = scene.add.image(880, 52, 'cafe_terrace_window');
        terraceWindow.setOrigin(0.5, 0.5);
        terraceWindow.setDepth(20);

        const ivyVine1 = scene.add.image(835, 88, 'cafe_ivy_vine');
        ivyVine1.setOrigin(0.5, 0.5);
        ivyVine1.setDepth(25);

        const ivyVine2 = scene.add.image(925, 88, 'cafe_ivy_vine');
        ivyVine2.setOrigin(0.5, 0.5);
        ivyVine2.setDepth(25);

        // 5. Centerpiece Grand Garden Planter Island (Centered at x=352, y=335)
        const centerPlanter = scene.add.image(352, 335, 'cafe_center_garden_planter');
        centerPlanter.setDisplaySize(80, 210);
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
        spawnPot(180, 135);
        spawnPot(522, 135);
        spawnPot(90, 125); // Next to bookshelf

        // Left Side of Center Garden Planter: Alternating Lamps & Pots snug against planter (x: 298)
        spawnLamp(298, 235); // Lamp 1
        spawnPot(298, 275);  // Pot 1
        spawnLamp(298, 315); // Lamp 2
        spawnPot(298, 355);  // Pot 2
        spawnLamp(298, 395); // Lamp 3
        spawnPot(298, 435);  // Pot 3

        // Right Side of Center Garden Planter: Alternating Lamps & Pots snug against planter (x: 406)
        spawnLamp(406, 235); // Lamp 1
        spawnPot(406, 275);  // Pot 1
        spawnLamp(406, 315); // Lamp 2
        spawnPot(406, 355);  // Pot 2
        spawnLamp(406, 395); // Lamp 3
        spawnPot(406, 435);  // Pot 3

        // Terrace Seam Divider Plant Line (x: 704)
        spawnPot(704, 180);
        spawnPot(704, 335);
        spawnPot(704, 480);

        // 6. Round Dining Table Sets with 4 Red Cushion Armchairs each
        const createTable4Chairs = (x: number, y: number, textureKey: string = 'cafe_interior_table') => {
            const table = scene.add.image(x, y, textureKey);
            table.setOrigin(0.5, 0.85);
            table.setDepth(y);
            scene.physics.add.existing(table, true);
            obstaclesGroup.add(table);

            // Top Chair
            const chairTop = scene.add.image(x, y - 26, 'cafe_interior_chair');
            chairTop.setOrigin(0.5, 0.85);
            chairTop.setDepth(y - 10);
            chairs.push({ x: x, y: y - 26, sprite: chairTop });

            // Bottom Chair
            const chairBottom = scene.add.image(x, y + 20, 'cafe_interior_chair');
            chairBottom.setOrigin(0.5, 0.85);
            chairBottom.setDepth(y + 10);
            chairs.push({ x: x, y: y + 20, sprite: chairBottom });

            // Left Chair
            const chairL = scene.add.image(x - 26, y - 3, 'cafe_interior_chair');
            chairL.setOrigin(0.5, 0.85);
            chairL.setDepth(y - 2);
            chairs.push({ x: x - 26, y: y - 3, sprite: chairL });

            // Right Chair
            const chairR = scene.add.image(x + 26, y - 3, 'cafe_interior_chair');
            chairR.setOrigin(0.5, 0.85);
            chairR.setDepth(y - 2);
            chairs.push({ x: x + 26, y: y - 3, sprite: chairR });
        };

        // Left Seating Column (Wood Floor)
        createTable4Chairs(160, 240, 'cafe_interior_table_laptop');
        createTable4Chairs(160, 335, 'cafe_interior_table_coffee');
        createTable4Chairs(160, 430, 'cafe_interior_table_plant');

        // Right Seating Column (Wood Floor)
        createTable4Chairs(544, 240, 'cafe_interior_table_coffee');
        createTable4Chairs(544, 335, 'cafe_interior_table_plant');
        createTable4Chairs(544, 430, 'cafe_interior_table_laptop');

        // Far Left Wall Leather Lounge Booth Sofas
        const createSofaSet = (y: number) => {
            const sofa = scene.add.image(0, y, 'cafe_sofa_side');
            sofa.setOrigin(0, 0.5);
            sofa.setDepth(y);
            scene.physics.add.existing(sofa, true);
            obstaclesGroup.add(sofa);

            const seatTop = scene.add.image(22, y - 12, 'cafe_interior_chair');
            seatTop.setVisible(false);
            chairs.push({ x: 22, y: y - 12, sprite: seatTop });

            const seatBottom = scene.add.image(22, y + 12, 'cafe_interior_chair');
            seatBottom.setVisible(false);
            chairs.push({ x: 22, y: y + 12, sprite: seatBottom });
        };

        createSofaSet(270);
        createSofaSet(390);

        // Terrace Outdoor Patio Sets (2 Chairs: Left & Right)
        const createPatioSet2Chairs = (x: number, y: number) => {
            const table = scene.add.image(x, y, 'cafe_interior_table_plant');
            table.setOrigin(0.5, 0.85);
            table.setDepth(y);
            scene.physics.add.existing(table, true);
            obstaclesGroup.add(table);

            const chairL = scene.add.image(x - 26, y - 3, 'cafe_interior_chair');
            chairL.setOrigin(0.5, 0.85);
            chairL.setDepth(y - 2);
            chairs.push({ x: x - 26, y: y - 3, sprite: chairL });

            const chairR = scene.add.image(x + 26, y - 3, 'cafe_interior_chair');
            chairR.setOrigin(0.5, 0.85);
            chairR.setDepth(y - 2);
            chairs.push({ x: x + 26, y: y - 3, sprite: chairR });
        };

        createPatioSet2Chairs(832, 240);
        createPatioSet2Chairs(832, 335);
        createPatioSet2Chairs(832, 430);

        // 7. Grand Entrance Area & Gateway (Centered at x=352)
        // Welcome Entrance Step Portal Mat at (352, 580)
        const exitMat = scene.add.image(352, 580, 'cafe_entrance_gateway');
        exitMat.setDisplaySize(100, 40);
        exitMat.setOrigin(0.5, 0.5);
        exitMat.setDepth(10);

        // Left Entrance Pillar Post with Lantern
        const pillarLeft = scene.add.image(287, 568, 'cafe_entrance_pillar');
        pillarLeft.setDisplaySize(32, 56);
        pillarLeft.setOrigin(0.5, 0.85);
        pillarLeft.setDepth(580);
        scene.physics.add.existing(pillarLeft, true);
        obstaclesGroup.add(pillarLeft);

        // Right Entrance Pillar Post with Lantern
        const pillarRight = scene.add.image(417, 568, 'cafe_entrance_pillar');
        pillarRight.setDisplaySize(32, 56);
        pillarRight.setOrigin(0.5, 0.85);
        pillarRight.setDepth(580);
        scene.physics.add.existing(pillarRight, true);
        obstaclesGroup.add(pillarRight);

        // Potted plants beside entrance pillars
        spawnPot(247, 572);
        spawnPot(457, 572);

        // Left Bottom Continuous Wall with Green Boxwood Planter (x: 0 to 280)
        const planterWallLeft = scene.add.image(140, 584, 'cafe_entrance_planter_wall');
        planterWallLeft.setDisplaySize(280, 32);
        planterWallLeft.setOrigin(0.5, 0.5);
        planterWallLeft.setDepth(575);

        // Right Bottom Continuous Wall with Green Boxwood Planter (x: 424 to 960)
        const planterWallRight = scene.add.image(692, 584, 'cafe_entrance_planter_wall');
        planterWallRight.setDisplaySize(536, 32);
        planterWallRight.setOrigin(0.5, 0.5);
        planterWallRight.setDepth(575);

        // 8. Canvas Outer Wall Colliders
        const addWallCollider = (x: number, y: number, w: number, h: number) => {
            const wall = scene.add.zone(x, y, w, h);
            scene.physics.add.existing(wall, true);
            obstaclesGroup.add(wall);
        };

        addWallCollider(480, 50, 960, 100);  // Top brick wall
        addWallCollider(6, 300, 12, 600);    // Left canvas edge
        addWallCollider(954, 300, 12, 600);  // Right canvas edge
        addWallCollider(140, 588, 280, 24);  // Bottom left wall collider
        addWallCollider(692, 588, 536, 24);  // Bottom right wall collider

        return {
            baristaSprite,
            exitMat,
            chairs,
        };
    }
}

