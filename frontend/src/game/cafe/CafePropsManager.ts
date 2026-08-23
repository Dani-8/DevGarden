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

        // 4. Right Side: Lush Hanging Ivy Vines along back wall
        const ivyVine1 = scene.add.image(1005, 88, 'cafe_ivy_vine');
        ivyVine1.setOrigin(0.5, 0.5);
        ivyVine1.setDepth(25);

        const ivyVine2 = scene.add.image(1105, 88, 'cafe_ivy_vine');
        ivyVine2.setOrigin(0.5, 0.5);
        ivyVine2.setDepth(25);

        // 5. Centerpiece Grand Garden Planter Island (Centered at true center x=480, y=370)
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
        spawnLamp(430, 230); // Lamp 1
        spawnPot(427, 275);  // Pot 1
        spawnLamp(430, 320); // Lamp 2
        spawnPot(427, 365);  // Pot 2
        spawnLamp(430, 410); // Lamp 3
        spawnPot(427, 455);  // Pot 3
        spawnLamp(430, 500); // Lamp 4

        // Right Side of Center Garden Planter: Alternating Lamps & Pots snug against planter (x=530)
        spawnLamp(530, 230); // Lamp 1
        spawnPot(533, 275);  // Pot 1
        spawnLamp(530, 320); // Lamp 2
        spawnPot(533, 365);  // Pot 2
        spawnLamp(530, 410); // Lamp 3
        spawnPot(533, 455);  // Pot 3
        spawnLamp(530, 500); // Lamp 4

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

        // Left Seating Column (Wood Floor - Centered at x=240)
        createTable4Chairs(240, 230, 'cafe_interior_table_laptop');
        createTable4Chairs(240, 370, 'cafe_interior_table_coffee');
        createTable4Chairs(240, 510, 'cafe_interior_table_plant');

        // Right Seating Column (Wood Floor - Centered at x=720, exact symmetrical counterpart)
        createTable4Chairs(720, 230, 'cafe_interior_table_coffee');
        createTable4Chairs(720, 370, 'cafe_interior_table_plant');
        createTable4Chairs(720, 510, 'cafe_interior_table_laptop');

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
        createSofaSet(450);

        // 6. Right Side: 3-Section Community & Social Wing
        const communityWing = CafeCommunityWing.create(scene, obstaclesGroup, chairs);

        // 7. Grand Entrance Area & Gateway (Centered at true center x=480)
        // Welcome Entrance Step Portal Mat at (480, 664) - Exit interaction point (Realistic Woven Coir Rug)
        const exitMat = scene.add.image(480, 664, 'cafe_entrance_gateway');
        exitMat.setDisplaySize(128, 74);
        exitMat.setOrigin(0.5, 0.5);
        exitMat.setDepth(10);

        // Thin Wooden Boundaries (Flanking the entrance mat symmetrically, reaching left & right edges, top at mat height)
        const railingLeft = scene.add.image(414, 736, 'cafe_entrance_railing_left');
        railingLeft.setDisplaySize(414, 110);
        railingLeft.setOrigin(1.0, 1.0);
        railingLeft.setDepth(695);

        const railingRight = scene.add.image(546, 736, 'cafe_entrance_railing_right');
        railingRight.setDisplaySize(414, 110);
        railingRight.setOrigin(0.0, 1.0);
        railingRight.setDepth(695);

        // Colliders for Thin Wooden Boundaries
        const addObstacleZone = (x: number, y: number, w: number, h: number) => {
            const zone = scene.add.zone(x, y, w, h);
            scene.physics.add.existing(zone, true);
            obstaclesGroup.add(zone);
        };

        // Left Boundary Colliders (Vertical rail starting at mat height & horizontal rail across left screen)
        addObstacleZone(408, 680, 12, 108);
        addObstacleZone(207, 730, 414, 12);

        // Right Boundary Colliders (Vertical rail starting at mat height & horizontal rail to wing divider at 960)
        addObstacleZone(552, 680, 12, 108);
        addObstacleZone(753, 730, 414, 12);

        // --- Left Entrance Zone: Big L-Shaped High Table, 7 Stools & Lush Corner Palm (From Reference Photo) ---
        // Big L-Shaped High Wooden Table Counter (Snapped flush against left wall & bottom rail)
        const bigLTable = scene.add.image(0, 724, 'cafe_big_l_table');
        bigLTable.setDisplaySize(172, 108);
        bigLTable.setOrigin(0.0, 1.0);
        bigLTable.setDepth(665);

        // Accurate L-Shape Obstacles (Thin vertical & horizontal lines instead of one solid square block)
        // 1. Vertical left bar arm: width 28px along left wall (x: 0..28, y: 616..724)
        addObstacleZone(14, 670, 28, 108);
        // 2. Horizontal bottom bar arm: height 26px along bottom rail (x: 0..172, y: 698..724)
        addObstacleZone(86, 711, 172, 26);

        // Helper: Spawn High Bar Stool with interactive seat
        const spawnHighStool = (x: number, y: number, dir: 'left' | 'right' | 'up' | 'down') => {
            const stool = scene.add.image(x, y, 'cafe_high_stool');
            stool.setOrigin(0.5, 0.85);
            stool.setDepth(y + 2);
            // Small base collider (12x12) so player can walk freely inside the nook and reach every seat
            const stoolZone = scene.add.zone(x, y - 2, 12, 12);
            scene.physics.add.existing(stoolZone, true);
            obstaclesGroup.add(stoolZone);

            const seatSprite = scene.add.image(x, y - 6, 'cafe_interior_chair');
            seatSprite.setVisible(false);
            chairs.push({ x: x, y: y - 6, sprite: seatSprite, dir: dir });
        };

        // 7 High Bar Stools (3 along vertical wing facing left, 4 along horizontal wing facing down)
        // Stools along vertical wing
        spawnHighStool(44, 638, 'left');
        spawnHighStool(44, 662, 'left');
        spawnHighStool(44, 686, 'left');

        // Stools along horizontal wing
        spawnHighStool(76, 680, 'down');
        spawnHighStool(104, 680, 'down');
        spawnHighStool(132, 680, 'down');
        spawnHighStool(160, 680, 'down');

        // Lush Corner Broad-Leaf Palm Tree in Modern Square Planter (Anchoring the outer end-cap of the L-table against bottom rail)
        const cornerPalm = scene.add.image(190, 716, 'cafe_square_palm_pot');
        cornerPalm.setOrigin(0.5, 0.85);
        cornerPalm.setDepth(720);
        scene.physics.add.existing(cornerPalm, true);
        const cpBody = cornerPalm.body as Phaser.Physics.Arcade.StaticBody;
        cpBody.setSize(26, 22);
        cpBody.setOffset(9, 32);
        obstaclesGroup.add(cornerPalm);

        // Additional accent plant snug against left entrance divider
        const plantLeftInner = scene.add.image(394, 716, 'cafe_luxury_plant_pot');
        plantLeftInner.setOrigin(0.5, 0.85);
        plantLeftInner.setDepth(718);
        scene.physics.add.existing(plantLeftInner, true);
        obstaclesGroup.add(plantLeftInner);

        // --- Right Entrance Zone: Dual L-Shaped Leather Sofas Covering Both Right Corners ---
        // 1. Sofa 1: Snapped flush into the Far Bottom-Right Corner by the terrace divider (x=960) & bottom rail
        const lSofaRight1 = scene.add.image(958, 722, 'cafe_l_sofa_right');
        lSofaRight1.setDisplaySize(92, 68);
        lSofaRight1.setOrigin(1.0, 1.0);
        lSofaRight1.setDepth(675);
        scene.physics.add.existing(lSofaRight1, true);
        const lsr1Body = lSofaRight1.body as Phaser.Physics.Arcade.StaticBody;
        lsr1Body.setSize(84, 46);
        lsr1Body.setOffset(4, 18);
        obstaclesGroup.add(lSofaRight1);

        // Interactive seating on Sofa 1
        const r1Seat1 = scene.add.image(906, 696, 'cafe_interior_chair');
        r1Seat1.setVisible(false);
        chairs.push({ x: 906, y: 696, sprite: r1Seat1, dir: 'sofa' });

        const r1Seat2 = scene.add.image(936, 668, 'cafe_interior_chair');
        r1Seat2.setVisible(false);
        chairs.push({ x: 936, y: 668, sprite: r1Seat2, dir: 'sofa' });

        // Low Walnut Coffee Table for Sofa 1
        const lTableRight1 = scene.add.image(896, 668, 'cafe_lounge_coffee_table');
        lTableRight1.setOrigin(0.5, 0.85);
        lTableRight1.setDepth(672);
        scene.physics.add.existing(lTableRight1, true);
        const ltr1Body = lTableRight1.body as Phaser.Physics.Arcade.StaticBody;
        ltr1Body.setSize(26, 18);
        ltr1Body.setOffset(5, 14);
        obstaclesGroup.add(lTableRight1);

        // 2. Sofa 2: Snapped flush into the Inner Bottom-Right Corner by the entrance divider (x=546) & bottom rail
        const lSofaRight2 = scene.add.image(548, 722, 'cafe_l_sofa_left');
        lSofaRight2.setDisplaySize(92, 68);
        lSofaRight2.setOrigin(0.0, 1.0);
        lSofaRight2.setDepth(675);
        scene.physics.add.existing(lSofaRight2, true);
        const lsr2Body = lSofaRight2.body as Phaser.Physics.Arcade.StaticBody;
        lsr2Body.setSize(84, 46);
        lsr2Body.setOffset(4, 18);
        obstaclesGroup.add(lSofaRight2);

        // Interactive seating on Sofa 2
        const r2Seat1 = scene.add.image(570, 668, 'cafe_interior_chair');
        r2Seat1.setVisible(false);
        chairs.push({ x: 570, y: 668, sprite: r2Seat1, dir: 'sofa' });

        const r2Seat2 = scene.add.image(600, 696, 'cafe_interior_chair');
        r2Seat2.setVisible(false);
        chairs.push({ x: 600, y: 696, sprite: r2Seat2, dir: 'sofa' });

        // Low Walnut Coffee Table for Sofa 2
        const lTableRight2 = scene.add.image(610, 668, 'cafe_lounge_coffee_table');
        lTableRight2.setOrigin(0.5, 0.85);
        lTableRight2.setDepth(672);
        scene.physics.add.existing(lTableRight2, true);
        const ltr2Body = lTableRight2.body as Phaser.Physics.Arcade.StaticBody;
        ltr2Body.setSize(26, 18);
        ltr2Body.setOffset(5, 14);
        obstaclesGroup.add(lTableRight2);

        // Tall Lush Monstera Deliciosa Plant in corner nook by terrace divider
        const plantRightTerrace = scene.add.image(940, 622, 'cafe_plant_monstera');
        plantRightTerrace.setOrigin(0.5, 0.85);
        plantRightTerrace.setDepth(630);
        scene.physics.add.existing(plantRightTerrace, true);
        const prtBody = plantRightTerrace.body as Phaser.Physics.Arcade.StaticBody;
        prtBody.setSize(24, 20);
        prtBody.setOffset(8, 32);
        obstaclesGroup.add(plantRightTerrace);

        // Additional accent plant by the inner walkway
        const plantRightInner = scene.add.image(564, 622, 'cafe_luxury_plant_pot');
        plantRightInner.setOrigin(0.5, 0.85);
        plantRightInner.setDepth(630);
        scene.physics.add.existing(plantRightInner, true);
        obstaclesGroup.add(plantRightInner);

        // 8. Canvas Outer Boundaries Colliders
        const addWallCollider = (x: number, y: number, w: number, h: number) => {
            const wall = scene.add.zone(x, y, w, h);
            scene.physics.add.existing(wall, true);
            obstaclesGroup.add(wall);
        };

        addWallCollider(672, 50, 1344, 100);  // Top brick wall
        addWallCollider(6, 368, 12, 736);     // Left canvas edge
        addWallCollider(1338, 368, 12, 736);  // Far right canvas edge
        addWallCollider(672, 730, 1344, 20);  // Bottom room boundary collider

        return {
            baristaSprite,
            exitMat,
            chairs,
            showcasePos: { x: communityWing.showcaseX, y: communityWing.showcaseY },
        };
    }
}

