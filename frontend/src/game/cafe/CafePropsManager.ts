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
        // Dark Wooden Brick Backwall Structure behind counter & sign
        const backwall = scene.add.image(360, 72, 'cafe_counter_backwall');
        backwall.setDisplaySize(220, 68);
        backwall.setOrigin(0.5, 0.5);
        backwall.setDepth(15);

        // Classic Open Terrace Carved Oak Wooden Sign Plaque "CODE CAFE" (260x70 2x canvas -> 130x35 display)
        const neonSign = scene.add.image(360, 48, 'cafe_neon_sign');
        neonSign.setDisplaySize(130, 35);
        neonSign.setOrigin(0.5, 0.5);
        neonSign.setDepth(20);

        // Wall Poster: "COFFEE FOCUS FLOW" (200x130 2x canvas -> 100x65 display)
        const poster = scene.add.image(550, 48, 'cafe_wall_poster');
        poster.setDisplaySize(100, 65);
        poster.setOrigin(0.5, 0.5);
        poster.setDepth(20);

        // Detailed Chalkboard Wall Menu (280x140 2x canvas -> 140x70 display)
        const wallMenu = scene.add.image(170, 48, 'cafe_wall_menu');
        wallMenu.setDisplaySize(140, 70);
        wallMenu.setOrigin(0.5, 0.5);
        wallMenu.setDepth(20);

        // 2. Center Open-Terrace Style Grand Counter & Barista Station
        // Main Cashier Front Counter
        const counter = scene.add.image(360, 140, 'cafe_counter');
        counter.setOrigin(0.5, 0.5);
        counter.setDepth(140);
        scene.physics.add.existing(counter, true);
        obstaclesGroup.add(counter);

        // Left Side Return Counter Wing (Enclosing Left Side of Cashier Desk)
        const counterSideL = scene.add.image(262, 120, 'cafe_counter_side');
        counterSideL.setDisplaySize(18, 48);
        counterSideL.setOrigin(0.5, 0.5);
        counterSideL.setDepth(138);
        scene.physics.add.existing(counterSideL, true);
        obstaclesGroup.add(counterSideL);

        // Right Side Return Counter Wing (Enclosing Right Side of Cashier Desk)
        const counterSideR = scene.add.image(458, 120, 'cafe_counter_side');
        counterSideR.setDisplaySize(18, 48);
        counterSideR.setOrigin(0.5, 0.5);
        counterSideR.setDepth(138);
        scene.physics.add.existing(counterSideR, true);
        obstaclesGroup.add(counterSideR);

        // Barista NPC behind counter
        const baristaSprite = scene.add.image(360, 114, 'cafe_barista');
        baristaSprite.setOrigin(0.5, 0.5);
        baristaSprite.setDepth(130);

        // Pastry Display Case on right side of counter
        const pastryDisplay = scene.add.image(425, 132, 'cafe_pastry_display');
        pastryDisplay.setOrigin(0.5, 0.85);
        pastryDisplay.setDepth(145);

        // Commercial Dual-Grouphead Espresso Machine on left side of counter
        const espressoMachine = scene.add.image(295, 132, 'cafe_espresso_machine');
        espressoMachine.setOrigin(0.5, 0.85);
        espressoMachine.setDepth(145);

        // Animated Rising Steam / Smoke Particle Emitter from Coffee Machine
        if (scene.add.particles) {
            const steam = scene.add.particles(295, 110, 'cafe_steam_particle', {
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
        const bookshelf = scene.add.image(30, 130, 'cafe_bookshelf');
        bookshelf.setOrigin(0.5, 0.85);
        bookshelf.setDepth(120);
        scene.physics.add.existing(bookshelf, true);
        obstaclesGroup.add(bookshelf);

        // 4. Right Side: Open Terrace Glass Window Wall & Lush Ivy Vines
        const terraceWindow = scene.add.image(832, 50, 'cafe_terrace_window');
        terraceWindow.setOrigin(0.5, 0.5);
        terraceWindow.setDepth(20);

        const ivyVine1 = scene.add.image(810, 88, 'cafe_ivy_vine');
        ivyVine1.setOrigin(0.5, 0.5);
        ivyVine1.setDepth(25);

        const ivyVine2 = scene.add.image(860, 88, 'cafe_ivy_vine');
        ivyVine2.setOrigin(0.5, 0.5);
        ivyVine2.setDepth(25);

        // 5. Seating Sets (Main Wood Area & Terrace Stone Area)
        const createTableSet = (x: number, y: number) => {
            const table = scene.add.image(x, y, 'cafe_interior_table');
            table.setOrigin(0.5, 0.85);
            table.setDepth(y);
            scene.physics.add.existing(table, true);
            obstaclesGroup.add(table);

            // Left chair
            const chairL = scene.add.image(x - 22, y - 4, 'cafe_interior_chair');
            chairL.setOrigin(0.5, 0.85);
            chairL.setDepth(y - 2);
            chairs.push({ x: x - 22, y: y - 4, sprite: chairL });

            // Right chair
            const chairR = scene.add.image(x + 22, y - 4, 'cafe_interior_chair');
            chairR.setOrigin(0.5, 0.85);
            chairR.setDepth(y - 2);
            chairs.push({ x: x + 22, y: y - 4, sprite: chairR });
        };

        // Main Wood Seating
        createTableSet(200, 260);
        createTableSet(360, 260);
        createTableSet(520, 260);
        createTableSet(280, 420);
        createTableSet(440, 420);

        // 2 Large Leather Lounge Sofas aligned flush against the left wall (x=0)
        const createSofaSet = (y: number) => {
            const sofa = scene.add.image(0, y, 'cafe_sofa_side');
            sofa.setOrigin(0, 0.5);
            sofa.setDepth(y);
            scene.physics.add.existing(sofa, true);
            obstaclesGroup.add(sofa);

            // 2 sitting cushion positions per sofa facing into the room
            const seatTop = scene.add.image(22, y - 12, 'cafe_interior_chair');
            seatTop.setVisible(false);
            chairs.push({ x: 22, y: y - 12, sprite: seatTop });

            const seatBottom = scene.add.image(22, y + 12, 'cafe_interior_chair');
            seatBottom.setVisible(false);
            chairs.push({ x: 22, y: y + 12, sprite: seatBottom });
        };

        createSofaSet(260);
        createSofaSet(420);

        // Terrace Stone Seating
        createTableSet(800, 240);
        createTableSet(800, 400);

        // 6. Flower Pots / Greenery
        const spawnPot = (x: number, y: number) => {
            const pot = scene.add.image(x, y, 'flower_pot');
            pot.setOrigin(0.5, 0.85);
            pot.setDepth(y);
            scene.physics.add.existing(pot, true);
            obstaclesGroup.add(pot);
        };

        spawnPot(680, 140);
        spawnPot(936, 140);
        spawnPot(936, 540);

        // 7. Grand Entrance Area & Gateway (Pillars, Gateway Portal, and Planter Wall)
        // Blue & Gold Entrance Step Portal Mat at (480, 580)
        const exitMat = scene.add.image(480, 580, 'cafe_entrance_gateway');
        exitMat.setDisplaySize(96, 40);
        exitMat.setOrigin(0.5, 0.5);
        exitMat.setDepth(10);

        // Left Entrance Pillar Post with Lantern
        const pillarLeft = scene.add.image(420, 568, 'cafe_entrance_pillar');
        pillarLeft.setDisplaySize(32, 56);
        pillarLeft.setOrigin(0.5, 0.85);
        pillarLeft.setDepth(580);
        scene.physics.add.existing(pillarLeft, true);
        obstaclesGroup.add(pillarLeft);

        // Right Entrance Pillar Post with Lantern
        const pillarRight = scene.add.image(540, 568, 'cafe_entrance_pillar');
        pillarRight.setDisplaySize(32, 56);
        pillarRight.setOrigin(0.5, 0.85);
        pillarRight.setDepth(580);
        scene.physics.add.existing(pillarRight, true);
        obstaclesGroup.add(pillarRight);

        // Left Bottom Continuous Wall with Green Boxwood Planter (x: 0 to 410)
        const planterWallLeft = scene.add.image(208, 584, 'cafe_entrance_planter_wall');
        planterWallLeft.setDisplaySize(416, 32);
        planterWallLeft.setOrigin(0.5, 0.5);
        planterWallLeft.setDepth(575);

        // Right Bottom Continuous Wall with Green Boxwood Planter (x: 550 to 960)
        const planterWallRight = scene.add.image(752, 584, 'cafe_entrance_planter_wall');
        planterWallRight.setDisplaySize(416, 32);
        planterWallRight.setOrigin(0.5, 0.5);
        planterWallRight.setDepth(575);

        // 8. Canvas Outer Wall Colliders (Left, Right, Top, Bottom with Door gap)
        const addWallCollider = (x: number, y: number, w: number, h: number) => {
            const wall = scene.add.zone(x, y, w, h);
            scene.physics.add.existing(wall, true);
            obstaclesGroup.add(wall);
        };

        // Top wall blocks y = 0 to y = 100 so player cannot walk on top brick wall
        addWallCollider(480, 50, 960, 100);  // Top brick wall
        addWallCollider(6, 300, 12, 600);    // Left canvas edge
        addWallCollider(954, 300, 12, 600);  // Right canvas edge
        addWallCollider(208, 588, 416, 24);  // Bottom left wall collider
        addWallCollider(752, 588, 416, 24);  // Bottom right wall collider

        return {
            baristaSprite,
            exitMat,
            chairs,
        };
    }
}

