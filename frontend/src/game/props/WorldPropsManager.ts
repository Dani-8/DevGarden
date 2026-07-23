import Phaser from 'phaser';

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
      if (x >= 736 && x <= 864) continue;
      this.spawnTree(scene, obstaclesGroup, x, 24);
    }
    for (let x = 32; x <= 1024; x += 96) {
      if (x >= 736 && x <= 864) continue; // Skip river
      if (x >= 96 && x <= 280) continue;  // Skip in front of Code Cafe
      if (x >= 380 && x <= 650) continue;  // Skip in front of Dev Garden Gate
      this.spawnTree(scene, obstaclesGroup, x, 744);
    }
    for (let y = 120; y < 700; y += 120) {
      this.spawnTree(scene, obstaclesGroup, 24, y);
    }
    for (let y = 120; y < 700; y += 120) {
      this.spawnTree(scene, obstaclesGroup, 1000, y);
    }

    // 2. Central Fountain
    const fountainX = 527;
    const fountainY = 400;
    const fountain = scene.add.image(fountainX, fountainY, 'fountain_prop');
    fountain.setOrigin(0.5, 0.6);
    fountain.setDepth(fountainY);
    scene.physics.add.existing(fountain, true);

    const fountainBody = fountain.body as Phaser.Physics.Arcade.StaticBody;
    const fw = 44;
    const fh = 30;
    const fox = 10;
    const foy = 30;

    fountainBody.updateFromGameObject = function (this: Phaser.Physics.Arcade.StaticBody) {
      const gameObject = this.gameObject as any;
      this.width = fw;
      this.height = fh;
      this.halfWidth = fw / 2;
      this.halfHeight = fh / 2;
      this.x = (gameObject.x - (gameObject.originX * gameObject.displayWidth)) + fox;
      this.y = (gameObject.y - (gameObject.originY * gameObject.displayHeight)) + foy;
      this.center.setTo(this.x + this.halfWidth, this.y + this.halfHeight);
      return this;
    };
    fountainBody.updateFromGameObject();
    obstaclesGroup.add(fountain);

    const waterParticles = scene.add.particles(fountainX, fountainY - 18, 'water_particle', {
      scale: { start: 1, end: 0 },
      alpha: { start: 0.8, end: 0.1 },
      speed: { min: 20, max: 40 },
      angle: { min: -130, max: -50 },
      gravityY: 120,
      lifespan: 600,
      frequency: 35,
    });
    waterParticles.setDepth(fountainY + 1);

    // 3. Wooden Benches
    this.spawnBench(scene, obstaclesGroup, benchesList, 380, 290, 'bench_horizontal');
    this.spawnBench(scene, obstaclesGroup, benchesList, 644, 290, 'bench_horizontal');
    this.spawnBench(scene, obstaclesGroup, benchesList, 380, 478, 'bench_horizontal');
    this.spawnBench(scene, obstaclesGroup, benchesList, 644, 478, 'bench_horizontal');
    this.spawnBench(scene, obstaclesGroup, benchesList, 930, 320, 'bench_horizontal');
    this.spawnBench(scene, obstaclesGroup, benchesList, 930, 460, 'bench_horizontal');

    // 4. River Physics Colliders
    const northWater = scene.add.zone(816, 96, 65, 192);
    scene.physics.add.existing(northWater, true);
    obstaclesGroup.add(northWater);

    const midWater = scene.add.zone(816, 400, 65, 224);
    scene.physics.add.existing(midWater, true);
    obstaclesGroup.add(midWater);

    const southWater = scene.add.zone(816, 640, 65, 64);
    scene.physics.add.existing(southWater, true);
    obstaclesGroup.add(southWater);

    const riverSparkles = scene.add.particles(800, 384, 'water_particle', {
      scale: { start: 0.8, end: 0.1 },
      alpha: { start: 0.7, end: 0 },
      speedY: { min: 20, max: 50 },
      speedX: { min: -10, max: 10 },
      lifespan: 1200,
      frequency: 150,
      emitZone: {
        type: 'random',
        source: new Phaser.Geom.Rectangle(-15, -350, 64, 700) as any
      }
    });
    riverSparkles.setDepth(-8);

    // Ducks in Open Water Zones (Stay safely between & away from bridges)
    this.spawnLivelyDuck(scene, 816, 110, 80, 185);   // North Pond (above top bridge at y=224)
    this.spawnLivelyDuck(scene, 816, 320, 270, 490);  // Central River (between bridges y=224 and y=544)
    this.spawnLivelyDuck(scene, 804, 390, 310, 470);  // Second Duckling in Central River
    this.spawnLivelyDuck(scene, 816, 610, 575, 660);  // South Pond (below bottom bridge at y=544)

    // 5. Eastern Zen Sanctuary
    this.spawnSakuraTree(scene, obstaclesGroup, 930, 160);
    this.spawnSakuraTree(scene, obstaclesGroup, 930, 520);
    this.spawnBamboo(scene, obstaclesGroup, 985, 220);
    this.spawnBamboo(scene, obstaclesGroup, 985, 280);
    this.spawnBamboo(scene, obstaclesGroup, 985, 380);
    this.spawnBamboo(scene, obstaclesGroup, 985, 440);

    // 6. South Boulevard
    const devArch = scene.add.image(526, 665, 'dev_garden_arch');
    devArch.setOrigin(0.5, 0.85);
    devArch.setDepth(680);

    // Gate Trees flanking the Dev Garden entrance
    this.spawnTree(scene, obstaclesGroup, 458, 665);
    this.spawnTree(scene, obstaclesGroup, 594, 665);

    this.spawnStreetLamp(scene, obstaclesGroup, 320, 672);
    this.spawnStreetLamp(scene, obstaclesGroup, 720, 672);

    const codeCafe = scene.add.image(180, 672, 'code_cafe_building');
    codeCafe.setOrigin(0.5, 0.85);
    codeCafe.setDepth(672);
    scene.physics.add.existing(codeCafe, true);
    obstaclesGroup.add(codeCafe);

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

  private static spawnTree(scene: Phaser.Scene, obstaclesGroup: Phaser.Physics.Arcade.StaticGroup, x: number, y: number) {
    const tree = scene.add.image(x, y, 'tree_prop');
    tree.setOrigin(0.5, 0.85);
    tree.setDepth(y);
    scene.physics.add.existing(tree, true);

    const treeBody = tree.body as Phaser.Physics.Arcade.StaticBody;
    const tw = 10;
    const th = 15;
    const tox = 28;
    const toy = 56;

    treeBody.updateFromGameObject = function (this: Phaser.Physics.Arcade.StaticBody) {
      const gameObject = this.gameObject as any;
      this.width = tw;
      this.height = th;
      this.halfWidth = tw / 2;
      this.halfHeight = th / 2;
      this.x = (gameObject.x - (gameObject.originX * gameObject.displayWidth)) + tox;
      this.y = (gameObject.y - (gameObject.originY * gameObject.displayHeight)) + toy;
      this.center.setTo(this.x + this.halfWidth, this.y + this.halfHeight);
      return this;
    };
    treeBody.updateFromGameObject();
    obstaclesGroup.add(tree);
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

  private static spawnSakuraTree(scene: Phaser.Scene, obstaclesGroup: Phaser.Physics.Arcade.StaticGroup, x: number, y: number) {
    const tree = scene.add.image(x, y, 'sakura_tree_prop');
    tree.setOrigin(0.5, 0.85);
    tree.setDepth(y);
    scene.physics.add.existing(tree, true);

    const treeBody = tree.body as Phaser.Physics.Arcade.StaticBody;
    const tw = 10;
    const th = 15;
    const tox = 28;
    const toy = 56;

    treeBody.updateFromGameObject = function (this: Phaser.Physics.Arcade.StaticBody) {
      const gameObject = this.gameObject as any;
      this.width = tw;
      this.height = th;
      this.halfWidth = tw / 2;
      this.halfHeight = th / 2;
      this.x = (gameObject.x - (gameObject.originX * gameObject.displayWidth)) + tox;
      this.y = (gameObject.y - (gameObject.originY * gameObject.displayHeight)) + toy;
      this.center.setTo(this.x + this.halfWidth, this.y + this.halfHeight);
      return this;
    };
    treeBody.updateFromGameObject();
    obstaclesGroup.add(tree);

    const petals = scene.add.particles(x, y - 40, 'sakura_petal', {
      scale: { start: 1, end: 0.3 },
      alpha: { start: 0.9, end: 0 },
      speedX: { min: -25, max: -5 },
      speedY: { min: 15, max: 35 },
      lifespan: 2500,
      frequency: 300,
      emitZone: {
        type: 'random',
        source: new Phaser.Geom.Rectangle(-20, -10, 40, 20) as any
      }
    });
    petals.setDepth(y + 10);
  }

  private static spawnBamboo(scene: Phaser.Scene, obstaclesGroup: Phaser.Physics.Arcade.StaticGroup, x: number, y: number) {
    const bamboo = scene.add.image(x, y, 'bamboo_prop');
    bamboo.setOrigin(0.5, 0.9);
    bamboo.setDepth(y);
    scene.physics.add.existing(bamboo, true);

    const bambooBody = bamboo.body as Phaser.Physics.Arcade.StaticBody;
    bambooBody.updateFromGameObject = function (this: Phaser.Physics.Arcade.StaticBody) {
      const gameObject = this.gameObject as any;
      this.width = 12;
      this.height = 10;
      this.halfWidth = 6;
      this.halfHeight = 5;
      this.x = gameObject.x - 6;
      this.y = gameObject.y - 10;
      this.center.setTo(this.x + 6, this.y + 5);
      return this;
    };
    bambooBody.updateFromGameObject();
    obstaclesGroup.add(bamboo);
  }

  private static spawnStreetLamp(scene: Phaser.Scene, obstaclesGroup: Phaser.Physics.Arcade.StaticGroup, x: number, y: number) {
    const lamp = scene.add.image(x, y, 'street_lamp');
    lamp.setOrigin(0.5, 0.9);
    lamp.setDepth(y);
    scene.physics.add.existing(lamp, true);
    obstaclesGroup.add(lamp);

    const glow = scene.add.particles(x, y - 48, 'glow_particle', {
      scale: { start: 1.2, end: 0.8 },
      alpha: { start: 0.35, end: 0.1 },
      tint: 0xfef08a,
      speed: 5,
      lifespan: 1000,
      frequency: 300,
      blendMode: 'ADD'
    });
    glow.setDepth(y - 1);
  }

  private static spawnLivelyDuck(
    scene: Phaser.Scene,
    startX: number,
    startY: number,
    minY: number,
    maxY: number
  ) {
    const duck = scene.add.image(startX, startY, 'duck_prop');
    duck.setDepth(-9); // In water layer (-9), below bridges/land

    // Soft water ripples trailing behind duck
    const ripples = scene.add.particles(0, 0, 'water_particle', {
      scale: { start: 0.5, end: 0 },
      alpha: { start: 0.4, end: 0 },
      speedY: { min: -8, max: 8 },
      speedX: { min: -5, max: 5 },
      lifespan: 700,
      frequency: 250,
      follow: duck
    });
    ripples.setDepth(-9.5);

    // 1. Organic Vertical Swimming
    const swimDuration = 7000 + Math.random() * 3000;
    scene.tweens.add({
      targets: duck,
      y: { from: minY, to: maxY },
      duration: swimDuration,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
      onYoyo: () => {
        duck.setFlipY(true);
      },
      onRepeat: () => {
        duck.setFlipY(false);
      }
    });

    // 2. Horizontal Waddling & Side Swaying
    scene.tweens.add({
      targets: duck,
      x: startX + 12,
      duration: 2200 + Math.random() * 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // 3. Gentle Water Bobbing & Gentle Tilt
    scene.tweens.add({
      targets: duck,
      scaleY: 0.92,
      angle: 6,
      duration: 1100 + Math.random() * 400,
      yoyo: true,
      repeat: -1,
      ease: 'Quad.easeInOut'
    });
  }
}
