import Phaser from 'phaser';
import { PlayerState } from '../../types/index.js';
import { showPlayerBubble } from '../messaging/Messaging.js';

export class PlayerManager {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  createAllAnimations() {
    const tiers = ['green', 'blue', 'purple', 'crimson', 'cosmic'];

    tiers.forEach(tier => {
      // Walk Down (Row 0)
      if (!this.scene.anims.exists(`walk_down_${tier}`)) {
        this.scene.anims.create({
          key: `walk_down_${tier}`,
          frames: this.scene.anims.generateFrameNumbers(`player_${tier}`, { start: 0, end: 2 }),
          frameRate: 8,
          repeat: -1,
        });
        this.scene.anims.create({
          key: `idle_down_${tier}`,
          frames: [{ key: `player_${tier}`, frame: 1 }],
          frameRate: 1,
        });

        // Walk Left
        this.scene.anims.create({
          key: `walk_left_${tier}`,
          frames: this.scene.anims.generateFrameNumbers(`player_${tier}`, { start: 6, end: 8 }),
          frameRate: 8,
          repeat: -1,
        });
        this.scene.anims.create({
          key: `idle_left_${tier}`,
          frames: [{ key: `player_${tier}`, frame: 7 }],
          frameRate: 1,
        });

        // Walk Right
        this.scene.anims.create({
          key: `walk_right_${tier}`,
          frames: this.scene.anims.generateFrameNumbers(`player_${tier}`, { start: 3, end: 5 }),
          frameRate: 8,
          repeat: -1,
        });
        this.scene.anims.create({
          key: `idle_right_${tier}`,
          frames: [{ key: `player_${tier}`, frame: 4 }],
          frameRate: 1,
        });

        // Walk Up
        this.scene.anims.create({
          key: `walk_up_${tier}`,
          frames: this.scene.anims.generateFrameNumbers(`player_${tier}`, { start: 9, end: 11 }),
          frameRate: 8,
          repeat: -1,
        });
        this.scene.anims.create({
          key: `idle_up_${tier}`,
          frames: [{ key: `player_${tier}`, frame: 10 }],
          frameRate: 1,
        });
      }
    });
  }

  spawnSelf(
    p: PlayerState,
    onSelectPlayerCallback?: (player: PlayerState) => void
  ): { container: Phaser.GameObjects.Container; sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody } {
    const container = this.scene.add.container(p.x, p.y);
    this.scene.physics.add.existing(container);

    const body = container.body as Phaser.Physics.Arcade.Body;
    body.setCollideWorldBounds(true);
    body.setSize(16, 12);
    body.setOffset(-8, -4);

    this.addAuraParticles(container, p.visual_tier, true);

    const sprite = this.scene.add.sprite(0, 0, `player_${p.visual_tier}`) as any;
    sprite.setOrigin(0.5, 0.7);
    container.add(sprite);

    this.addOverheadInfo(container, p.username, p.level, p.title, p.visual_tier, false, p.cosmetics);

    sprite.setInteractive();
    sprite.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      pointer.event.stopPropagation();
      if (onSelectPlayerCallback) onSelectPlayerCallback(p);
    });

    return { container, sprite };
  }

  spawnRemotePlayer(
    p: PlayerState,
    otherPlayers: Map<string, Phaser.GameObjects.Container>,
    onSelectPlayerCallback?: (player: PlayerState) => void
  ) {
    if (otherPlayers.has(p.id)) {
      otherPlayers.get(p.id)?.destroy();
    }

    const container = this.scene.add.container(p.x, p.y);
    container.setData('tier', p.visual_tier);
    otherPlayers.set(p.id, container);

    this.addAuraParticles(container, p.visual_tier, false);

    const sprite = this.scene.add.sprite(0, 0, `player_${p.visual_tier}`);
    sprite.setOrigin(0.5, 0.7);
    container.add(sprite);

    const anim = p.anim || 'idle_down';
    sprite.play(`${anim}_${p.visual_tier}`, true);

    this.addOverheadInfo(container, p.username, p.level, p.title, p.visual_tier, false, p.cosmetics);

    sprite.setInteractive({ useHandCursor: true });
    sprite.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      pointer.event.stopPropagation();
      if (onSelectPlayerCallback) {
        onSelectPlayerCallback(p);
      }
    });
  }

  spawnSleepingNPC(
    npc: PlayerState,
    sleepingNPCs: Map<string, Phaser.GameObjects.Container>,
    onSelectPlayerCallback?: (player: PlayerState) => void
  ) {
    const key = `sleeping_${npc.id}`;
    if (sleepingNPCs.has(key)) {
      sleepingNPCs.get(key)?.destroy();
    }

    const container = this.scene.add.container(npc.x, npc.y);
    sleepingNPCs.set(key, container);

    this.addAuraParticles(container, npc.visual_tier, false, true);

    const sprite = this.scene.add.sprite(0, 0, `player_${npc.visual_tier}`);
    sprite.setOrigin(0.5, 0.7);
    sprite.setAlpha(0.65);
    container.add(sprite);

    sprite.play(`idle_down_${npc.visual_tier}`);

    this.addOverheadInfo(container, npc.username, npc.level, npc.title, npc.visual_tier, true, npc.cosmetics);

    const zzzText = this.scene.add.text(8, -32, 'Zzz', {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '8px',
      fontStyle: 'bold',
      color: '#58a6ff'
    });
    zzzText.setResolution(2);
    container.add(zzzText);

    this.scene.tweens.add({
      targets: zzzText,
      y: -38,
      alpha: 0.2,
      duration: 1800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    sprite.setInteractive({ useHandCursor: true });
    sprite.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      pointer.event.stopPropagation();
      if (onSelectPlayerCallback) {
        onSelectPlayerCallback(npc);
      }
    });
  }

  addOverheadInfo(
    container: Phaser.GameObjects.Container,
    username: string,
    level: number,
    title: string,
    tier: string,
    isSleeping: boolean,
    cosmetics?: string[]
  ) {
    let badgeColor = '#81c784';
    if (tier === 'blue') badgeColor = '#64b5f6';
    if (tier === 'purple') badgeColor = '#ba68c8';
    if (tier === 'crimson') badgeColor = '#e57373';
    if (tier === 'cosmic') badgeColor = '#ffd54f';

    const labelText = isSleeping ? `[Sleeping] ${username}` : username;
    const nameText = this.scene.add.text(0, -22, labelText, {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '10px',
      fontStyle: 'bold',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2,
    });
    nameText.setResolution(2);
    nameText.setOrigin(0.5);
    container.add(nameText);

    const badgeText = this.scene.add.text(0, -33, `Lvl ${level} ${title}`, {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '8px',
      color: badgeColor,
      stroke: '#000000',
      strokeThickness: 2,
    });
    badgeText.setResolution(2);
    badgeText.setOrigin(0.5);
    container.add(badgeText);

    if (cosmetics && cosmetics.includes('gardener_hat')) {
      const hatText = this.scene.add.text(0, -14, '👒', {
        fontSize: '11px',
      });
      hatText.setOrigin(0.5, 0.5);
      hatText.setResolution(2);
      container.add(hatText);
    }

    if (cosmetics && cosmetics.includes('watering_can')) {
      const canText = this.scene.add.text(10, -5, '🚰', {
        fontSize: '9px',
      });
      canText.setOrigin(0.5, 0.5);
      canText.setResolution(2);
      container.add(canText);
    }
  }

  addAuraParticles(container: Phaser.GameObjects.Container, tier: string, isSelf: boolean, isNPC: boolean = false) {
    if (tier === 'green') return;

    let colorHex = 0x64b5f6;
    let speedRange = { min: 10, max: 20 };
    let lifespan = 1000;
    let frequency = 250;

    if (tier === 'purple') {
      colorHex = 0xffeb3b;
      speedRange = { min: 15, max: 30 };
      frequency = 180;
    } else if (tier === 'crimson') {
      colorHex = 0xff3d00;
      speedRange = { min: 20, max: 40 };
      frequency = 100;
    } else if (tier === 'cosmic') {
      colorHex = 0x00e5ff;
      speedRange = { min: 25, max: 50 };
      frequency = 80;
    }

    if (isNPC) {
      frequency *= 2;
    }

    const emitter = this.scene.add.particles(0, 0, 'glow_particle', {
      scale: { start: 0.15, end: 0 },
      alpha: { start: isNPC ? 0.2 : 0.6, end: 0 },
      tint: colorHex,
      speed: speedRange,
      angle: { min: -110, max: -70 },
      lifespan: lifespan,
      frequency: frequency,
    });

    container.add(emitter);
    container.sendToBack(emitter);
  }

  showChatBubble(container: Phaser.GameObjects.Container, text: string, isEmote: boolean = false) {
    showPlayerBubble(this.scene, container, text, isEmote);
  }
}
