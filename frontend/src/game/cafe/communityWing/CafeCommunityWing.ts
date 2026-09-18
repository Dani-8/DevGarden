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