import Phaser from 'phaser';
import { CafeChair } from '../CafePropsManager';
import { CafeCommunityTextures } from './CafeCommunityTextures';

export class CafeCommunityWing {
    /**
     * Dedicated 3-Section Community & Social Extension horizontally expanded to the right (x: 960..1344):
     *
     * 1. SECTION 1 (Top: y = 100..300) -> "CHILL & LOUNGE NOOK"
     *    - Gate entrance at x = 960, y = 200
     * 2. SECTION 2 (Middle: y = 300..500) -> "PROJECT SHOWCASE HUB"
     *    - Gate entrance at x = 960, y = 400
     * 3. SECTION 3 (Bottom: y = 500..708) -> "COLLAB & MEETING ROOM"
     *    - Gate entrance at x = 960, y = 590
     */
    public static create(
        scene: Phaser.Scene,
        obstaclesGroup: Phaser.Physics.Arcade.StaticGroup,
        chairs: CafeChair[]
    ): { showcaseX: number; showcaseY: number } {
        CafeCommunityTextures.createAll(scene);

        const addWallCollider = (x: number, y: number, w: number, h: number) => {
            const zone = scene.add.zone(x, y, w, h);
            scene.physics.add.existing(zone, true);
            obstaclesGroup.add(zone);
        };

        const addWallPost = (x: number, y: number, height: number) => {
            const wall = scene.add.image(x, y, 'cafe_wing_div_wall_v');
            wall.setDisplaySize(20, height);
            wall.setOrigin(0.5, 0.5);
            wall.setDepth(y + height / 2);
            addWallCollider(x, y, 18, height);
        };

        const addLantern = (x: number, y: number) => {
            const lantern = scene.add.image(x, y, 'cafe_wing_wall_lantern');
            lantern.setOrigin(0.5, 0.5);
            lantern.setDepth(y + 30);
        };

        const addGateEntrance = (gateY: number) => {
            // Warm Woven Coir Threshold Door Mat (matching main entrance mat style, no text)
            const mat = scene.add.image(960, gateY, 'cafe_wing_gate_mat');
            mat.setDisplaySize(34, 56);
            mat.setOrigin(0.5, 0.5);
            mat.setDepth(2);

            // Flanking Wall Lanterns on gate posts
            addLantern(960, gateY - 34);
            addLantern(960, gateY + 34);
        };

        const addHorizontalWall = (y: number) => {
            const wall = scene.add.image(1152, y, 'cafe_wing_div_wall_h');
            wall.setDisplaySize(384, 26);
            wall.setOrigin(0.5, 0.5);
            wall.setDepth(y + 10);
            addWallCollider(1152, y, 384, 20);
        };

        const addPot = (x: number, y: number) => {
            const pot = scene.add.image(x, y, 'cafe_luxury_plant_pot');
            pot.setDisplaySize(28, 48);
            pot.setOrigin(0.5, 0.85);
            pot.setDepth(y);
            scene.physics.add.existing(pot, true);
            const pBody = pot.body as Phaser.Physics.Arcade.StaticBody;
            pBody.setSize(18, 16);
            pBody.setOffset(5, 26);
            obstaclesGroup.add(pot);
        };

        // =========================================================================
        // 1. VERTICAL DIVIDING WALL & ENTRANCE GATES (x = 960)
        // =========================================================================
        // Clean, continuous vertical wall with NO gold stripes or drawer marks
        // Room 1 Vertical Wall Segments & Gate at y = 200
        addWallPost(960, 134, 68); // y: 100..168
        addGateEntrance(200);      // Gate opening: y = 168..232 (64px wide clear walk-through)

        // Room 2 Vertical Wall Segments & Gate at y = 400
        addWallPost(960, 300, 136); // y: 232..368
        addGateEntrance(400);       // Gate opening: y = 368..432 (64px wide clear walk-through)

        // Room 3 Vertical Wall Segments & Gate at y = 590
        addWallPost(960, 495, 126); // y: 432..558
        addGateEntrance(590);       // Gate opening: y = 558..622 (64px wide clear walk-through)
        addWallPost(960, 665, 86);  // y: 622..708

        // Right Edge and Top Outer Boundaries for Wing
        addWallCollider(1344, 418, 16, 636); // Far right wall collider
        addWallCollider(1152, 96, 384, 12);  // Top wall collider

        // =========================================================================
        // 2. HORIZONTAL SEPARATION WALLS
        // =========================================================================
        // Separation between Room 1 & Room 2
        addHorizontalWall(300);

        // Separation between Room 2 & Room 3
        addHorizontalWall(500);

        // Bottom Wall Enclosure for Room 3
        addHorizontalWall(708);

        // =========================================================================
        // 3. ROOM 1: COZY SOFA LOUNGE (y = 100..300) [Concept 1 - Restored Full Scale]
        // =========================================================================
        // Sized Area Rug (208x124, centered at x=1152, y=190, leaving room margins)
        const loungeRug = scene.add.image(1152, 190, 'cafe_lounge_emerald_gold_rug');
        loungeRug.setDisplaySize(208, 124);
        loungeRug.setOrigin(0.5, 0.5);
        loungeRug.setDepth(5);

        // Back Wall Mounted Mountain Landscape Artwork (Mounted ON the back wall at y=48)
        const wallArt = scene.add.image(1152, 48, 'cafe_lounge_wall_landscape');
        wallArt.setDisplaySize(84, 26);
        wallArt.setOrigin(0.5, 0.5);
        wallArt.setDepth(2);

        // Wall Draped Botanical Vines along Top Wall Beam
        const wallVines = scene.add.image(1152, 14, 'cafe_concept1_wall_vines');
        wallVines.setDisplaySize(180, 28);
        wallVines.setOrigin(0.5, 0.5);
        wallVines.setDepth(3);

        // Flanking Warm Amber Wall Lanterns on the Back Wall (y=48)
        addLantern(1074, 48);
        addLantern(1230, 48);

        // Grand Plush Cream & Honey-Oak Lounge Sofa (132x46, brought forward to y=140 away from wall)
        const loungeSofa = scene.add.image(1152, 140, 'cafe_concept1_cream_sofa');
        loungeSofa.setDisplaySize(132, 46);
        loungeSofa.setOrigin(0.5, 0.85);
        loungeSofa.setDepth(140);
        scene.physics.add.existing(loungeSofa, true);
        const sofaBody = loungeSofa.body as Phaser.Physics.Arcade.StaticBody;
        sofaBody.setSize(124, 22);
        sofaBody.setOffset(4, 16);
        obstaclesGroup.add(loungeSofa);

        // Interactive Sofa Seats (3 plush seating spots with forward egress)
        const sSeat1 = scene.add.image(1114, 136, 'cafe_interior_chair');
        sSeat1.setVisible(false);
        chairs.push({ x: 1114, y: 136, sprite: sSeat1, dir: 'down', standPos: { x: 1114, y: 164 } });

        const sSeat2 = scene.add.image(1152, 136, 'cafe_interior_chair');
        sSeat2.setVisible(false);
        chairs.push({ x: 1152, y: 136, sprite: sSeat2, dir: 'down', standPos: { x: 1152, y: 164 } });

        const sSeat3 = scene.add.image(1190, 136, 'cafe_interior_chair');
        sSeat3.setVisible(false);
        chairs.push({ x: 1190, y: 136, sprite: sSeat3, dir: 'down', standPos: { x: 1190, y: 164 } });

        // Left Mushroom Floor Lamp (Beside sofa at x=1068, y=142)
        const lampL = scene.add.image(1068, 142, 'cafe_concept1_mushroom_lamp');
        lampL.setDisplaySize(18, 46);
        lampL.setOrigin(0.5, 0.92);
        lampL.setDepth(142);
        scene.physics.add.existing(lampL, true);
        const llBody = lampL.body as Phaser.Physics.Arcade.StaticBody;
        llBody.setSize(12, 10);
        llBody.setOffset(3, 34);
        obstaclesGroup.add(lampL);

        // Right Mushroom Floor Lamp (Beside sofa at x=1236, y=142)
        const lampR = scene.add.image(1236, 142, 'cafe_concept1_mushroom_lamp');
        lampR.setDisplaySize(18, 46);
        lampR.setOrigin(0.5, 0.92);
        lampR.setDepth(142);
        scene.physics.add.existing(lampR, true);
        const lrBody = lampR.body as Phaser.Physics.Arcade.StaticBody;
        lrBody.setSize(12, 10);
        lrBody.setOffset(3, 34);
        obstaclesGroup.add(lampR);

        // Generous Honey-Oak Coffee Table with Succulent & Book (74x36, at x=1152, y=186)
        const coffeeTable = scene.add.image(1152, 186, 'cafe_concept1_coffee_table');
        coffeeTable.setDisplaySize(74, 36);
        coffeeTable.setOrigin(0.5, 0.85);
        coffeeTable.setDepth(186);
        scene.physics.add.existing(coffeeTable, true);
        const ctBody = coffeeTable.body as Phaser.Physics.Arcade.StaticBody;
        ctBody.setSize(70, 20);
        ctBody.setOffset(2, 8);
        obstaclesGroup.add(coffeeTable);

        // Left Emerald Club Armchair (at x=1108, y=232, facing UP towards coffee table)
        const armChairL = scene.add.image(1108, 232, 'cafe_concept1_emerald_armchair');
        armChairL.setDisplaySize(34, 34);
        armChairL.setOrigin(0.5, 0.85);
        armChairL.setDepth(232);
        scene.physics.add.existing(armChairL, true);
        const acBodyL = armChairL.body as Phaser.Physics.Arcade.StaticBody;
        acBodyL.setSize(28, 20);
        acBodyL.setOffset(3, 10);
        obstaclesGroup.add(armChairL);
        chairs.push({ x: 1108, y: 232, sprite: armChairL, dir: 'up', standPos: { x: 1108, y: 256 } });

        // Right Emerald Club Armchair (at x=1196, y=232, facing UP towards coffee table)
        const armChairR = scene.add.image(1196, 232, 'cafe_concept1_emerald_armchair');
        armChairR.setDisplaySize(34, 34);
        armChairR.setOrigin(0.5, 0.85);
        armChairR.setDepth(232);
        scene.physics.add.existing(armChairR, true);
        const acBodyR = armChairR.body as Phaser.Physics.Arcade.StaticBody;
        acBodyR.setSize(28, 20);
        acBodyR.setOffset(3, 10);
        obstaclesGroup.add(armChairR);
        chairs.push({ x: 1196, y: 232, sprite: armChairR, dir: 'up', standPos: { x: 1196, y: 256 } });

        // Small Round Wooden Side Table with Lit Candle (Between club chairs at x=1152, y=232)
        const centerSideTable = scene.add.image(1152, 232, 'cafe_lounge_side_table_candle');
        centerSideTable.setDisplaySize(18, 22);
        centerSideTable.setOrigin(0.5, 0.85);
        centerSideTable.setDepth(232);
        scene.physics.add.existing(centerSideTable, true);
        const cstBody = centerSideTable.body as Phaser.Physics.Arcade.StaticBody;
        cstBody.setSize(14, 12);
        cstBody.setOffset(2, 8);
        obstaclesGroup.add(centerSideTable);

        // Top Corner Plants in Room (at x=1030 and x=1274, y=124)
        addPot(1030, 124);
        addPot(1274, 124);

        // Flanking doorway entrance plants
        addPot(1005, 170);
        addPot(1005, 238);

        // =========================================================================
        // 4. ROOM 2: PROJECT SHOWCASE HUB (y = 300..500)
        // =========================================================================
        // Freestanding Deluxe Project Showcase Display Easel (Standing on floor at x=1152, y=360)
        const showcaseBoard = scene.add.image(1152, 360, 'cafe_showcase_wall_board');
        showcaseBoard.setDisplaySize(92, 68);
        showcaseBoard.setOrigin(0.5, 0.92);
        showcaseBoard.setDepth(360);
        scene.physics.add.existing(showcaseBoard, true);
        const sbBody = showcaseBoard.body as Phaser.Physics.Arcade.StaticBody;
        sbBody.setSize(80, 16);
        sbBody.setOffset(6, 46);
        obstaclesGroup.add(showcaseBoard);


        // Long Project Showcase Presentation Table with blueprints & notebooks (x=1152, y=440)
        const showcaseTable = scene.add.image(1152, 440, 'cafe_showcase_long_table');
        showcaseTable.setDisplaySize(120, 38);
        showcaseTable.setOrigin(0.5, 0.85);
        showcaseTable.setDepth(440);
        scene.physics.add.existing(showcaseTable, true);
        const stBody = showcaseTable.body as Phaser.Physics.Arcade.StaticBody;
        stBody.setSize(112, 24);
        stBody.setOffset(4, 8);
        obstaclesGroup.add(showcaseTable);

        // 4 Top Presentation Chairs (Facing DOWN towards table)
        const addTopShowcaseChair = (x: number) => {
            const ch = scene.add.image(x, 412, 'cafe_chair_down');
            ch.setOrigin(0.5, 0.85);
            ch.setDepth(412);
            scene.physics.add.existing(ch, true);
            obstaclesGroup.add(ch);
            chairs.push({ x, y: 412, sprite: ch, dir: 'down', standPos: { x, y: 382 } });
        };
        addTopShowcaseChair(1105);
        addTopShowcaseChair(1136);
        addTopShowcaseChair(1168);
        addTopShowcaseChair(1199);

        // 4 Bottom Presentation Chairs (Facing UP towards table)
        const addBtmShowcaseChair = (x: number) => {
            const ch = scene.add.image(x, 468, 'cafe_chair_up');
            ch.setOrigin(0.5, 0.85);
            ch.setDepth(468);
            scene.physics.add.existing(ch, true);
            obstaclesGroup.add(ch);
            chairs.push({ x, y: 468, sprite: ch, dir: 'up', standPos: { x, y: 494 } });
        };
        addBtmShowcaseChair(1105);
        addBtmShowcaseChair(1136);
        addBtmShowcaseChair(1168);
        addBtmShowcaseChair(1199);

        // Flanking plants
        addPot(1005, 340);
        addPot(1005, 465);
        addPot(1295, 465);

    // =========================================================================
    // 5. ROOM 3: COLLAB & MEETING ROOM (y = 500..708)
    // =========================================================================
    // Freestanding Mobile Rolling Whiteboard (Standing on floor at x=1152, y=546)
    const whiteboard = scene.add.image(1152, 546, 'cafe_collab_whiteboard');
    whiteboard.setDisplaySize(96, 66);
    whiteboard.setOrigin(0.5, 0.92);
    whiteboard.setDepth(546);
    scene.physics.add.existing(whiteboard, true);
    const wbBody = whiteboard.body as Phaser.Physics.Arcade.StaticBody;
    wbBody.setSize(82, 16);
    wbBody.setOffset(7, 46);
    obstaclesGroup.add(whiteboard);

    // Discussion & Meeting Table with Laptops & Diagram
    const collabTable = scene.add.image(1152, 622, 'cafe_collab_group_table');
    collabTable.setDisplaySize(86, 42);
    collabTable.setOrigin(0.5, 0.85);
    collabTable.setDepth(622);
    scene.physics.add.existing(collabTable, true);
    const ctBody3 = collabTable.body as Phaser.Physics.Arcade.StaticBody;
    ctBody3.setSize(78, 26);
    ctBody3.setOffset(4, 8);
    obstaclesGroup.add(collabTable);

    // Top Meeting Chairs (Facing DOWN towards table)
    const addTopMeetChair = (x: number) => {
      const ch = scene.add.image(x, 592, 'cafe_chair_down');
      ch.setOrigin(0.5, 0.85);
      ch.setDepth(592);
      scene.physics.add.existing(ch, true);
      obstaclesGroup.add(ch);
      chairs.push({ x, y: 592, sprite: ch, dir: 'down', standPos: { x, y: 562 } });
    };
    addTopMeetChair(1130);
    addTopMeetChair(1174);

    // Bottom Meeting Chairs (Facing UP towards table)
    const addBtmMeetChair = (x: number) => {
      const ch = scene.add.image(x, 652, 'cafe_chair_up');
      ch.setOrigin(0.5, 0.85);
      ch.setDepth(652);
      scene.physics.add.existing(ch, true);
      obstaclesGroup.add(ch);
      chairs.push({ x, y: 652, sprite: ch, dir: 'up', standPos: { x, y: 680 } });
    };
    addBtmMeetChair(1130);
    addBtmMeetChair(1174);
