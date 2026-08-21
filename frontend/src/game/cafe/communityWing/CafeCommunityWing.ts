import Phaser from 'phaser';
import { CafeChair } from '../CafePropsManager';
import { CafeCommunityTextures } from './CafeCommunityTextures';

export class CafeCommunityWing {
  /**
   * Dedicated 3-Section Community & Social Wing horizontally expanded to the right (x: 960..1344):
   *
   * 1. ROOM 1 (Top: y = 100..300) -> "COZY LOUNGE (RELAX & CHILL)"
   *    - Gate entrance at x = 960, y = 200
   * 2. ROOM 2 (Middle: y = 300..500) -> "PROJECT SHOWCASE (INSPIRE & DISPLAY)"
   *    - Gate entrance at x = 960, y = 400
   * 3. ROOM 3 (Bottom: y = 500..708) -> "CONNECT & COLLABORATE"
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
      // Threshold floor runner
      const mat = scene.add.image(960, gateY, 'cafe_wing_gate_threshold');
      mat.setDisplaySize(32, 56);
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

      // Section Title Plaque Text
      const titleText = scene.add.text(1152, y - 2, title, {
        fontSize: '9px',
        fontFamily: 'monospace',
        fontStyle: 'bold',
        color: '#fbbf24',
        align: 'center',
      });
      titleText.setOrigin(0.5, 0.5);
      titleText.setDepth(y + 15);
    };

    // =========================================================================
    // 1. VERTICAL DIVIDING WALL & ENTRANCE GATES (x = 960)
    // =========================================================================
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

    // Right Edge and Top/Bottom Outer Boundaries for Wing
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
    // 3. ROOM 1 CONTENT: COZY CHILL LOUNGE (y = 100..300)
    // =========================================================================
    // Persian Rug
    const loungeRug = scene.add.image(1152, 200, 'cafe_zone_persian_rug');
    loungeRug.setDisplaySize(170, 110);
    loungeRug.setOrigin(0.5, 0.5);
    loungeRug.setDepth(5);

    // Hanging Ivy on back wall
    const loungeIvy = scene.add.image(1152, 88, 'cafe_ivy_vine');
    loungeIvy.setOrigin(0.5, 0.5);
    loungeIvy.setDepth(20);

    // Main Plush Velvet Lounge Sofa (Centered against back wall: x=1152, y=142)
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

    // =========================================================================
    // 4. ROOM 2 CONTENT: PROJECT SHOWCASE & HALL OF FAME (y = 300..500)
    // =========================================================================
    // Showcase Rug
    const showcaseRug = scene.add.image(1152, 400, 'cafe_zone_persian_rug');
    showcaseRug.setDisplaySize(180, 120);
    showcaseRug.setOrigin(0.5, 0.5);
    showcaseRug.setDepth(5);

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

    // Presentation Podium with Gooseneck Mic
    const podium = scene.add.image(1050, 415, 'cafe_showcase_podium');
    podium.setDisplaySize(28, 36);
    podium.setOrigin(0.5, 0.85);
    podium.setDepth(415);
    scene.physics.add.existing(podium, true);
    const pBody = podium.body as Phaser.Physics.Arcade.StaticBody;
    pBody.setSize(22, 16);
    pBody.setOffset(3, 14);
    obstaclesGroup.add(podium);

    // Showcase Audience / Review Chairs
    const scChair1 = scene.add.image(1125, 415, 'cafe_chair_up');
    scChair1.setOrigin(0.5, 0.85);
    scChair1.setDepth(415);
    scene.physics.add.existing(scChair1, true);
    obstaclesGroup.add(scChair1);
    chairs.push({ x: 1125, y: 415, sprite: scChair1, dir: 'up' });

    const scChair2 = scene.add.image(1185, 415, 'cafe_chair_up');
    scChair2.setOrigin(0.5, 0.85);
    scChair2.setDepth(415);
    scene.physics.add.existing(scChair2, true);
    obstaclesGroup.add(scChair2);
    chairs.push({ x: 1185, y: 415, sprite: scChair2, dir: 'up' });

    const scChair3 = scene.add.image(1125, 465, 'cafe_chair_up');
    scChair3.setOrigin(0.5, 0.85);
    scChair3.setDepth(465);
    scene.physics.add.existing(scChair3, true);
    obstaclesGroup.add(scChair3);
    chairs.push({ x: 1125, y: 465, sprite: scChair3, dir: 'up' });

    const scChair4 = scene.add.image(1185, 465, 'cafe_chair_up');
    scChair4.setOrigin(0.5, 0.85);
    scChair4.setDepth(465);
    scene.physics.add.existing(scChair4, true);
    obstaclesGroup.add(scChair4);
    chairs.push({ x: 1185, y: 465, sprite: scChair4, dir: 'up' });

    // =========================================================================
    // 5. ROOM 3 CONTENT: DISCUSSION & COLLAB SPACE (y = 500..708)
    // =========================================================================
    // Architecture Flowchart Whiteboard
    const whiteboard = scene.add.image(1152, 532, 'cafe_collab_whiteboard');
    whiteboard.setDisplaySize(96, 46);
    whiteboard.setOrigin(0.5, 0.5);
    whiteboard.setDepth(530);

    // Discussion Group Table with Laptops & Diagram
    const collabTable = scene.add.image(1152, 615, 'cafe_collab_group_table');
    collabTable.setDisplaySize(86, 42);
    collabTable.setOrigin(0.5, 0.85);
    collabTable.setDepth(615);
    scene.physics.add.existing(collabTable, true);
    const ctBody3 = collabTable.body as Phaser.Physics.Arcade.StaticBody;
    ctBody3.setSize(78, 26);
    ctBody3.setOffset(4, 8);
    obstaclesGroup.add(collabTable);

    // Top Meeting Chair
    const topChair = scene.add.image(1152, 586, 'cafe_chair_down');
    topChair.setOrigin(0.5, 0.85);
    topChair.setDepth(590);
    scene.physics.add.existing(topChair, true);
    obstaclesGroup.add(topChair);
    chairs.push({ x: 1152, y: 586, sprite: topChair, dir: 'down' });

    // Bottom Meeting Chair
    const btmChair = scene.add.image(1152, 644, 'cafe_chair_up');
    btmChair.setOrigin(0.5, 0.85);
    btmChair.setDepth(645);
    scene.physics.add.existing(btmChair, true);
    obstaclesGroup.add(btmChair);
    chairs.push({ x: 1152, y: 644, sprite: btmChair, dir: 'up' });

    // Left Meeting Chair
    const leftChair = scene.add.image(1095, 615, 'cafe_chair_right');
    leftChair.setOrigin(0.5, 0.85);
    leftChair.setDepth(615);
    scene.physics.add.existing(leftChair, true);
    obstaclesGroup.add(leftChair);
    chairs.push({ x: 1095, y: 615, sprite: leftChair, dir: 'left' });

    // Right Meeting Chair
    const rightChair = scene.add.image(1209, 615, 'cafe_chair_left');
    rightChair.setOrigin(0.5, 0.85);
    rightChair.setDepth(615);
    scene.physics.add.existing(rightChair, true);
    obstaclesGroup.add(rightChair);
    chairs.push({ x: 1209, y: 615, sprite: rightChair, dir: 'right' });

    return {
      showcaseX: 1152,
      showcaseY: 360,
    };
  }
}
