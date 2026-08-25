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

        const addHorizontalWall = (y: number, title: string) => {
            const wall = scene.add.image(1152, y, 'cafe_wing_div_wall_h');
            wall.setDisplaySize(384, 26);
            wall.setOrigin(0.5, 0.5);
            wall.setDepth(y + 10);
            addWallCollider(1152, y, 384, 20);

            // Clean Section Title Plaque Text
            const titleText = scene.add.text(1152, y - 2, title, {
                fontSize: '9px',
                fontFamily: 'monospace',
                fontStyle: 'bold',
                color: '#fef3c7',
                align: 'center',
            });
            titleText.setOrigin(0.5, 0.5);
            titleText.setDepth(y + 15);
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
        addHorizontalWall(300, 'CHILL & LOUNGE NOOK');

        // Separation between Room 2 & Room 3
        addHorizontalWall(500, 'PROJECT SHOWCASE HUB');

        // Bottom Wall Enclosure for Room 3
        addHorizontalWall(708, 'COLLAB & MEETING ROOM');

        // =========================================================================
        // 3. ROOM 1: CHILL & LOUNGE NOOK (y = 100..300)
        // =========================================================================
        // Cozy Area Rug
        const loungeRug = scene.add.image(1152, 200, 'cafe_zone_persian_rug');
        loungeRug.setDisplaySize(170, 110);
        loungeRug.setOrigin(0.5, 0.5);
        loungeRug.setDepth(5);

        // Hanging Ivy on top wall
        const loungeIvy = scene.add.image(1152, 88, 'cafe_ivy_vine');
        loungeIvy.setOrigin(0.5, 0.5);
        loungeIvy.setDepth(20);

        // Plush Velvet Lounge Sofa (Centered at x=1152, y=142)
        const sofaMain = scene.add.image(1152, 142, 'cafe_lounge_plush_sofa');
        sofaMain.setDisplaySize(100, 48);
        sofaMain.setOrigin(0.5, 0.85);
        sofaMain.setDepth(140);
        scene.physics.add.existing(sofaMain, true);
        const sofaBody = sofaMain.body as Phaser.Physics.Arcade.StaticBody;
        sofaBody.setSize(92, 28);
        sofaBody.setOffset(4, 10);
        obstaclesGroup.add(sofaMain);

        // Interactive Sofa Seats
        const sSeat1 = scene.add.image(1126, 138, 'cafe_interior_chair');
        sSeat1.setVisible(false);
        chairs.push({ x: 1126, y: 138, sprite: sSeat1, dir: 'up' });

        const sSeat2 = scene.add.image(1152, 138, 'cafe_interior_chair');
        sSeat2.setVisible(false);
        chairs.push({ x: 1152, y: 138, sprite: sSeat2, dir: 'up' });

        const sSeat3 = scene.add.image(1178, 138, 'cafe_interior_chair');
        sSeat3.setVisible(false);
        chairs.push({ x: 1178, y: 138, sprite: sSeat3, dir: 'up' });

        // Coffee Table with Laptop & Drinks
        const coffeeTable = scene.add.image(1152, 195, 'cafe_lounge_coffee_table_deluxe');
        coffeeTable.setDisplaySize(72, 36);
        coffeeTable.setOrigin(0.5, 0.85);
        coffeeTable.setDepth(195);
        scene.physics.add.existing(coffeeTable, true);
        const ctBody = coffeeTable.body as Phaser.Physics.Arcade.StaticBody;
        ctBody.setSize(64, 24);
        ctBody.setOffset(4, 8);
        obstaclesGroup.add(coffeeTable);

        // Armchair (Left)
        const armChairL = scene.add.image(1075, 195, 'cafe_chair_right');
        armChairL.setOrigin(0.5, 0.85);
        armChairL.setDepth(194);
        scene.physics.add.existing(armChairL, true);
        obstaclesGroup.add(armChairL);
        chairs.push({ x: 1075, y: 195, sprite: armChairL, dir: 'left' });

        // Armchair (Right)
        const armChairR = scene.add.image(1229, 195, 'cafe_chair_left');
        armChairR.setOrigin(0.5, 0.85);
        armChairR.setDepth(194);
        scene.physics.add.existing(armChairR, true);
        obstaclesGroup.add(armChairR);
        chairs.push({ x: 1229, y: 195, sprite: armChairR, dir: 'right' });

        // Bookshelf in top right corner of Room 1
        const room1Shelf = scene.add.image(1290, 140, 'cafe_bookshelf');
        room1Shelf.setDisplaySize(38, 54);
        room1Shelf.setOrigin(0.5, 0.85);
        room1Shelf.setDepth(140);
        scene.physics.add.existing(room1Shelf, true);
        obstaclesGroup.add(room1Shelf);

        // Side table with lamp on right wall
        const sideTable = scene.add.image(1290, 240, 'cafe_lounge_side_table');
        sideTable.setOrigin(0.5, 0.85);
        sideTable.setDepth(240);
        scene.physics.add.existing(sideTable, true);
        obstaclesGroup.add(sideTable);

        // Flanking plants
        addPot(1005, 135);
        addPot(1005, 265);

        // =========================================================================
        // 4. ROOM 2: PROJECT SHOWCASE HUB (y = 300..500)
        // =========================================================================
        // Interactive Project Showcase Board (Mounted on back wall at x=1152, y=345)
        const showcaseBoard = scene.add.image(1152, 345, 'cafe_showcase_wall_board');
        showcaseBoard.setDisplaySize(110, 56);
        showcaseBoard.setOrigin(0.5, 0.5);
        showcaseBoard.setDepth(345);
        scene.physics.add.existing(showcaseBoard, true);
        const sbBody = showcaseBoard.body as Phaser.Physics.Arcade.StaticBody;
        sbBody.setSize(102, 32);
        sbBody.setOffset(4, 12);
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

        // 4 Top Presentation Chairs (Facing DOWN)
        const addTopShowcaseChair = (x: number) => {
            const ch = scene.add.image(x, 412, 'cafe_chair_down');
            ch.setOrigin(0.5, 0.85);
            ch.setDepth(412);
            scene.physics.add.existing(ch, true);
            obstaclesGroup.add(ch);
            chairs.push({ x, y: 412, sprite: ch, dir: 'down' });
        };
        addTopShowcaseChair(1105);
        addTopShowcaseChair(1136);
        addTopShowcaseChair(1168);
        addTopShowcaseChair(1199);

        // 4 Bottom Presentation Chairs (Facing UP)
        const addBtmShowcaseChair = (x: number) => {
            const ch = scene.add.image(x, 468, 'cafe_chair_up');
            ch.setOrigin(0.5, 0.85);
            ch.setDepth(468);
            scene.physics.add.existing(ch, true);
            obstaclesGroup.add(ch);
            chairs.push({ x, y: 468, sprite: ch, dir: 'up' });
        };
        addBtmShowcaseChair(1105);
        addBtmShowcaseChair(1136);
        addBtmShowcaseChair(1168);
        addBtmShowcaseChair(1199);

        // Trophy / Awards Showcase Cabinet on right wall
        const trophyCabinet = scene.add.image(1290, 360, 'cafe_trophy_cabinet');
        trophyCabinet.setDisplaySize(32, 56);
        trophyCabinet.setOrigin(0.5, 0.85);
        trophyCabinet.setDepth(360);
        scene.physics.add.existing(trophyCabinet, true);
        obstaclesGroup.add(trophyCabinet);

        // Flanking plants
        addPot(1005, 340);
        addPot(1005, 465);
        addPot(1295, 465);

        // =========================================================================
        // 5. ROOM 3: COLLAB & MEETING ROOM (y = 500..708)
        // =========================================================================
        // Architecture Flowchart Whiteboard
        const whiteboard = scene.add.image(1152, 535, 'cafe_collab_whiteboard');
        whiteboard.setDisplaySize(96, 46);
        whiteboard.setOrigin(0.5, 0.5);
        whiteboard.setDepth(530);

        // Cork Bulletin Board on right wall
        const bulletinBoard = scene.add.image(1285, 545, 'cafe_cork_bulletin_board');
        bulletinBoard.setDisplaySize(38, 32);
        bulletinBoard.setOrigin(0.5, 0.5);
        bulletinBoard.setDepth(545);

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

        // Top Meeting Chairs
        const addTopMeetChair = (x: number) => {
            const ch = scene.add.image(x, 592, 'cafe_chair_down');
            ch.setOrigin(0.5, 0.85);
            ch.setDepth(592);
            scene.physics.add.existing(ch, true);
            obstaclesGroup.add(ch);
            chairs.push({ x, y: 592, sprite: ch, dir: 'down' });
        };
        addTopMeetChair(1130);
        addTopMeetChair(1174);

        // Bottom Meeting Chairs
        const addBtmMeetChair = (x: number) => {
            const ch = scene.add.image(x, 652, 'cafe_chair_up');
            ch.setOrigin(0.5, 0.85);
            ch.setDepth(652);
            scene.physics.add.existing(ch, true);
            obstaclesGroup.add(ch);
            chairs.push({ x, y: 652, sprite: ch, dir: 'up' });
        };
        addBtmMeetChair(1130);
        addBtmMeetChair(1174);

        // Left Meeting Chair
        const leftChair = scene.add.image(1088, 622, 'cafe_chair_right');
        leftChair.setOrigin(0.5, 0.85);
        leftChair.setDepth(622);
        scene.physics.add.existing(leftChair, true);
        obstaclesGroup.add(leftChair);
        chairs.push({ x: 1088, y: 622, sprite: leftChair, dir: 'left' });

        // Right Meeting Chair
        const rightChair = scene.add.image(1216, 622, 'cafe_chair_left');
        rightChair.setOrigin(0.5, 0.85);
        rightChair.setDepth(622);
        scene.physics.add.existing(rightChair, true);
        obstaclesGroup.add(rightChair);
        chairs.push({ x: 1216, y: 622, sprite: rightChair, dir: 'right' });

        // Flanking plants
        addPot(1005, 540);
        addPot(1005, 665);
        addPot(1295, 665);

        return {
            showcaseX: 1152,
            showcaseY: 360,
        };
    }
}
