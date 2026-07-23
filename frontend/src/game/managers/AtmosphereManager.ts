import Phaser from 'phaser';

export class AtmosphereManager {
  private scene: Phaser.Scene;
  private atmosphereOverlay: Phaser.GameObjects.Rectangle | null = null;
  private fireflies: Phaser.GameObjects.Arc[] = [];

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  public init() {
    const hours = new Date().getHours();

    let color = 0xfffaf0;
    let alpha = 0.02;
    let isNight = false;

    if (hours >= 5 && hours < 9) {
      color = 0xff9e7d;
      alpha = 0.15;
    } else if (hours >= 9 && hours < 17) {
      color = 0xfffaf0;
      alpha = 0.02;
    } else if (hours >= 17 && hours < 20) {
      color = 0xf28e2b;
      alpha = 0.22;
    } else {
      color = 0x07091e;
      alpha = 0.42;
      isNight = true;
    }

    this.atmosphereOverlay = this.scene.add.rectangle(0, 0, 1024, 768, color, alpha);
    this.atmosphereOverlay.setOrigin(0, 0);
    this.atmosphereOverlay.setDepth(1500);
    this.atmosphereOverlay.setScrollFactor(1);

    if (isNight) {
      this.spawnFireflies();
    }
  }

  private spawnFireflies() {
    for (let i = 0; i < 15; i++) {
      const rx = Phaser.Math.Between(50, 974);
      const ry = Phaser.Math.Between(50, 718);

      const firefly = this.scene.add.circle(rx, ry, 2.5, 0xfff97d, 0.85);
      firefly.setDepth(1600);
      this.fireflies.push(firefly);

      this.scene.tweens.add({
        targets: firefly,
        x: rx + Phaser.Math.Between(-40, 40),
        y: ry + Phaser.Math.Between(-40, 40),
        alpha: { from: 0.2, to: 1.0 },
        scale: { from: 0.6, to: 1.2 },
        duration: Phaser.Math.Between(3000, 6000),
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }
  }
}
