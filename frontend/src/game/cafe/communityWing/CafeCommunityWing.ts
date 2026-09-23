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
