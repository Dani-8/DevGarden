import Phaser from 'phaser';
import { TreesManager } from './TreesManager';
import { WaterPropsManager } from './WaterPropsManager';

export interface BenchInfo {
  x: number;
  y: number;
  type: string;
  sprite: Phaser.GameObjects.Image;
}

export class WorldPropsManager {
  static createProps(
    scene: Phaser.Scene,
    obstaclesGroup: Phaser.Physics.Arcade.StaticGroup,
    benchesList: BenchInfo[]
  ): { leaderboardTreeObj: Phaser.GameObjects.Image } {
    // 1. Boundary Trees forest
    for (let x = 32; x <= 1024; x += 96) {
      if (x >= 736 && x <= 864) continue; // Skip river
      if (x >= 480 && x <= 544) continue; // Skip north stone road path to Golden Oak
      TreesManager.spawnTree(scene, obstaclesGroup, x, 24);
    }
    for (let y = 120; y < 660; y += 120) {
      TreesManager.spawnTree(scene, obstaclesGroup, 24, y);
    }
    for (let y = 120; y < 660; y += 120) {
      TreesManager.spawnTree(scene, obstaclesGroup, 1000, y);
    }

    // 1b. Cozy Garden Wooden Picket Fence Perimeter & Main Gate
    this.spawnFencePerimeter(scene, obstaclesGroup);

    // 2. Central Fountain
    WaterPropsManager.spawnFountain(scene, obstaclesGroup, 527, 400);

    // 3. Wooden Benches
    this.spawnBench(scene, obstaclesGroup, benchesList, 380, 290, 'bench_horizontal');
    this.spawnBench(scene, obstaclesGroup, benchesList, 644, 290, 'bench_horizontal');
    this.spawnBench(scene, obstaclesGroup, benchesList, 380, 478, 'bench_horizontal');
    this.spawnBench(scene, obstaclesGroup, benchesList, 644, 478, 'bench_horizontal');
    this.spawnBench(scene, obstaclesGroup, benchesList, 930, 320, 'bench_horizontal');
    this.spawnBench(scene, obstaclesGroup, benchesList, 930, 460, 'bench_horizontal');

    // 4. River Physics Colliders
    WaterPropsManager.spawnRiverColliders(scene, obstaclesGroup);

    // Ducks in Open Water Zones
    WaterPropsManager.spawnLivelyDuck(scene, 816, 110, 80, 180);   // North Pond
    WaterPropsManager.spawnLivelyDuck(scene, 816, 320, 280, 480);  // Central River
    WaterPropsManager.spawnLivelyDuck(scene, 804, 390, 300, 460);  // Second Duckling in Central River
    WaterPropsManager.spawnLivelyDuck(scene, 816, 610, 590, 650);  // South Pond

    // 5. Eastern Zen Sanctuary
    TreesManager.spawnSakuraTree(scene, obstaclesGroup, 930, 160);
    TreesManager.spawnSakuraTree(scene, obstaclesGroup, 930, 650);
    TreesManager.spawnBamboo(scene, obstaclesGroup, 985, 220);
    TreesManager.spawnBamboo(scene, obstaclesGroup, 985, 280);
    TreesManager.spawnBamboo(scene, obstaclesGroup, 985, 380);
    TreesManager.spawnBamboo(scene, obstaclesGroup, 985, 440);

    // 6. South Boulevard & Code Cafe
    const devArch = scene.add.image(526, 665, 'dev_garden_arch');
    devArch.setOrigin(0.5, 0.85);
    devArch.setDepth(680);

    const leftPillar = scene.add.zone(472, 665, 18, 24);
    scene.physics.add.existing(leftPillar, true);
    obstaclesGroup.add(leftPillar);

    const rightPillar = scene.add.zone(580, 665, 18, 24);
    scene.physics.add.existing(rightPillar, true);
    obstaclesGroup.add(rightPillar);

    TreesManager.spawnTree(scene, obstaclesGroup, 460, 670);
    TreesManager.spawnTree(scene, obstaclesGroup, 592, 670);

    this.spawnFlowerPot(scene, obstaclesGroup, 495, 672);
    this.spawnFlowerPot(scene, obstaclesGroup, 470, 672);
    this.spawnFlowerPot(scene, obstaclesGroup, 557, 672);
    this.spawnFlowerPot(scene, obstaclesGroup, 580, 672);

    this.spawnStreetLamp(scene, obstaclesGroup, 345, 672);
    this.spawnStreetLamp(scene, obstaclesGroup, 720, 672);

    const cafePatio = scene.add.image(150, 672, 'cafe_concrete_patio');
    cafePatio.setOrigin(0.5, 0.5);
    cafePatio.setDepth(640);

    const codeCafe = scene.add.image(150, 654, 'code_cafe_building');
    codeCafe.setOrigin(0.5, 0.85);
    codeCafe.setScale(1.5, 1.35);
    codeCafe.setDepth(654);
    scene.physics.add.existing(codeCafe, true);

    const cafeBody = codeCafe.body as Phaser.Physics.Arcade.StaticBody;
    const cw = 135;
    const ch = 42;
    const cox = 12;
    const coy = 60;

    cafeBody.updateFromGameObject = function (this: Phaser.Physics.Arcade.StaticBody) {
      const gameObject = this.gameObject as any;
      this.width = cw;
      this.height = ch;
      this.halfWidth = cw / 2;
      this.halfHeight = ch / 2;
      this.x = (gameObject.x - (gameObject.originX * gameObject.displayWidth)) + cox;
      this.y = (gameObject.y - (gameObject.originY * gameObject.displayHeight)) + coy;
      this.center.setTo(this.x + this.halfWidth, this.y + this.halfHeight);
      return this;
    };
    cafeBody.updateFromGameObject();
    obstaclesGroup.add(codeCafe);

    this.spawnFlowerPot(scene, obstaclesGroup, 70, 672);
    this.spawnFlowerPot(scene, obstaclesGroup, 83, 672);
    this.spawnMenuBoard(scene, obstaclesGroup, 190, 667);
    this.spawnFlowerPot(scene, obstaclesGroup, 220, 672);

    // Fireflies
    const fireflyEmitter = scene.add.particles(512, 384, 'firefly_particle', {
      scale: { start: 1, end: 0.2 },
      alpha: { start: 0.8, end: 0 },
      speedX: { min: -12, max: 12 },
      speedY: { min: -12, max: 12 },
      lifespan: 3000,
      frequency: 250,
      blendMode: 'ADD',
      emitZone: {
        type: 'random',
        source: new Phaser.Geom.Rectangle(-450, -320, 900, 640) as any
      }
    });
    fireflyEmitter.setDepth(2500);

    // Leaderboard Tree
    const leaderboardTreeObj = scene.add.image(512, 110, 'leaderboard_tree');
    leaderboardTreeObj.setOrigin(0.5, 0.8);
    leaderboardTreeObj.setDepth(110);
    scene.physics.add.existing(leaderboardTreeObj, true);

    const lbBody = leaderboardTreeObj.body as Phaser.Physics.Arcade.StaticBody;
    const lbw = 12;
    const lbh = 26;
    const lbox = 26;
    const lboy = 44;

    lbBody.updateFromGameObject = function (this: Phaser.Physics.Arcade.StaticBody) {
      const gameObject = this.gameObject as any;
      this.width = lbw;
      this.height = lbh;
      this.halfWidth = lbw / 2;
      this.halfHeight = lbh / 2;
      this.x = (gameObject.x - (gameObject.originX * gameObject.displayWidth)) + lbox;
      this.y = (gameObject.y - (gameObject.originY * gameObject.displayHeight)) + lboy;
      this.center.setTo(this.x + this.halfWidth, this.y + this.halfHeight);
      return this;
    };
    lbBody.updateFromGameObject();
    obstaclesGroup.add(leaderboardTreeObj);

    const goldenCrown = scene.add.image(512, 44, 'leaderboard_crown_icon');
    goldenCrown.setDepth(2000);
    scene.tweens.add({
      targets: goldenCrown,
      y: 35,
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    return { leaderboardTreeObj };
  }

  private static spawnBench(
    scene: Phaser.Scene,
    obstaclesGroup: Phaser.Physics.Arcade.StaticGroup,
    benchesList: BenchInfo[],
    x: number,
    y: number,
    benchType: string
  ) {
    const bench = scene.add.image(x, y, benchType);
    bench.setOrigin(0.5);
    bench.setDepth(y);
    scene.physics.add.existing(bench, true);

    const benchBody = bench.body as Phaser.Physics.Arcade.StaticBody;
    const bw = benchType === 'bench_horizontal' ? 48 : 14;
    const bh = benchType === 'bench_horizontal' ? 14 : 48;
    const box = benchType === 'bench_horizontal' ? 0 : 2;
    const boy = benchType === 'bench_horizontal' ? 2 : 0;

    benchBody.updateFromGameObject = function (this: Phaser.Physics.Arcade.StaticBody) {
      const gameObject = this.gameObject as any;
      this.width = bw;
      this.height = bh;
      this.halfWidth = bw / 2;
      this.halfHeight = bh / 2;
      this.x = (gameObject.x - (gameObject.originX * gameObject.displayWidth)) + box;
      this.y = (gameObject.y - (gameObject.originY * gameObject.displayHeight)) + boy;
      this.center.setTo(this.x + this.halfWidth, this.y + this.halfHeight);
      return this;
    };
    benchBody.updateFromGameObject();
    obstaclesGroup.add(bench);

    benchesList.push({ x, y, type: benchType, sprite: bench });
  }

  private static spawnStreetLamp(scene: Phaser.Scene, obstaclesGroup: Phaser.Physics.Arcade.StaticGroup, x: number, y: number) {
    const hours = new Date().getHours();
    const isNight = hours >= 17 || hours < 7;

    const lampTexture = isNight ? 'street_lamp_on' : 'street_lamp';
    const lamp = scene.add.image(x, y, lampTexture);
    lamp.setOrigin(0.5, 0.9);
    lamp.setScale(1.35);
    lamp.setDepth(y);
    scene.physics.add.existing(lamp, true);

    const lampBody = lamp.body as Phaser.Physics.Arcade.StaticBody;
    const lw = 12;
    const lh = 12;
    lampBody.updateFromGameObject = function (this: Phaser.Physics.Arcade.StaticBody) {
      const gameObject = this.gameObject as any;
      this.width = lw;
      this.height = lh;
      this.halfWidth = lw / 2;
      this.halfHeight = lh / 2;
      this.x = gameObject.x - 6;
      this.y = gameObject.y - 12;
      this.center.setTo(this.x + 6, this.y + 6);
      return this;
    };
    lampBody.updateFromGameObject();
    obstaclesGroup.add(lamp);

    if (isNight) {
      const lightBeam = scene.add.graphics();
      lightBeam.fillStyle(0xfff3a0, 0.18);
      lightBeam.fillTriangle(x, y - 52, x - 38, y + 16, x + 38, y + 16);
      
      lightBeam.fillStyle(0xffe066, 0.32);
      lightBeam.fillEllipse(x, y + 12, 76, 26);
      
      lightBeam.fillStyle(0xfffbeb, 0.55);
      lightBeam.fillEllipse(x, y + 12, 38, 14);
      
      lightBeam.setDepth(15);
      lightBeam.setBlendMode(Phaser.BlendModes.ADD);

      const aura = scene.add.graphics();
      aura.fillStyle(0xffa500, 0.35);
      aura.fillCircle(x, y - 56, 26);
      aura.fillStyle(0xfff3a0, 0.65);
      aura.fillCircle(x, y - 56, 12);
      aura.setDepth(y + 1);
      aura.setBlendMode(Phaser.BlendModes.ADD);

      // Gentle warm light pulse animation
      scene.tweens.add({
        targets: [lightBeam, aura],
        alpha: { from: 0.82, to: 1.0 },
        duration: 1800 + Math.random() * 800,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });

      if (scene.textures.exists('glow_particle')) {
        const glow = scene.add.particles(x, y - 56, 'glow_particle', {
          scale: { start: 1.8, end: 0.8 },
          alpha: { start: 0.7, end: 0.1 },
          tint: 0xffa500,
          speed: 6,
          lifespan: 1100,
          frequency: 180,
          blendMode: 'ADD'
        });
        glow.setDepth(y + 2);
      }
    }
  }

  private static spawnFlowerPot(scene: Phaser.Scene, obstaclesGroup: Phaser.Physics.Arcade.StaticGroup, x: number, y: number) {
    const pot = scene.add.image(x, y, 'flower_pot');
    pot.setOrigin(0.5, 0.85);
    pot.setDepth(y);
    scene.physics.add.existing(pot, true);
    obstaclesGroup.add(pot);
  }

  private static spawnMenuBoard(scene: Phaser.Scene, obstaclesGroup: Phaser.Physics.Arcade.StaticGroup, x: number, y: number) {
    const board = scene.add.image(x, y, 'cafe_menu_board');
    board.setOrigin(0.5, 0.85);
    board.setScale(1.15);
    board.setDepth(y);
    scene.physics.add.existing(board, true);
    obstaclesGroup.add(board);
  }

  private static spawnFencePerimeter(scene: Phaser.Scene, obstaclesGroup: Phaser.Physics.Arcade.StaticGroup) {
    const fenceY = 660;

    for (let x = 0; x <= 456; x += 32) {
      const fence = scene.add.image(x + 16, fenceY, 'fence_picket_horizontal');
      fence.setOrigin(0.5, 0.5);
      fence.setDepth(650);
    }

    for (let x = 576; x <= 992; x += 32) {
      const fence = scene.add.image(x + 16, fenceY, 'fence_picket_horizontal');
      fence.setOrigin(0.5, 0.5);
      fence.setDepth(650);
    }

    const southLeftBarrier = scene.add.zone(225, fenceY, 450, 24);
    scene.physics.add.existing(southLeftBarrier, true);
    obstaclesGroup.add(southLeftBarrier);

    const southRightBarrier = scene.add.zone(799, fenceY, 450, 24);
    scene.physics.add.existing(southRightBarrier, true);
    obstaclesGroup.add(southRightBarrier);

    const gatePostLeft = scene.add.zone(460, fenceY, 20, 24);
    scene.physics.add.existing(gatePostLeft, true);
    obstaclesGroup.add(gatePostLeft);

    const gatePostRight = scene.add.zone(564, fenceY, 20, 24);
    scene.physics.add.existing(gatePostRight, true);
    obstaclesGroup.add(gatePostRight);
  }
}
