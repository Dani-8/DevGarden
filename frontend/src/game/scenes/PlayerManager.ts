import Phaser from 'phaser';
import { PlayerState } from '../../types/index';
import { showPlayerBubble } from '../messaging/Messaging';
import { createAllPlayerAnimations } from './player/PlayerAnimations';
import { addOverheadInfo } from './player/PlayerOverheadInfo';
import { addAuraParticles } from './player/PlayerAuraEffects';

export class PlayerManager {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  createAllAnimations() {
    createAllPlayerAnimations(this.scene);
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

    addAuraParticles(this.scene, container, p.visual_tier, true);

    const sprite = this.scene.add.sprite(0, 0, `player_${p.visual_tier}`) as any;
    sprite.setOrigin(0.5, 0.7);
    container.add(sprite);

    addOverheadInfo(this.scene, container, p.username, p.level, p.title, p.visual_tier, false, p.cosmetics);

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
    container.setData('targetX', p.x);
    container.setData('targetY', p.y);
    container.setData('targetAnim', p.anim || 'idle_down');
    otherPlayers.set(p.id, container);

    addAuraParticles(this.scene, container, p.visual_tier, false);

    const sprite = this.scene.add.sprite(0, 0, `player_${p.visual_tier}`);
    sprite.setOrigin(0.5, 0.7);
    container.add(sprite);

    const anim = p.anim || 'idle_down';
    sprite.play(`${anim}_${p.visual_tier}`, true);

    addOverheadInfo(this.scene, container, p.username, p.level, p.title, p.visual_tier, false, p.cosmetics);

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

    addAuraParticles(this.scene, container, npc.visual_tier, false, true);

    const sprite = this.scene.add.sprite(0, 0, `player_${npc.visual_tier}`);
    sprite.setOrigin(0.5, 0.7);
    sprite.setAlpha(0.65);
    container.add(sprite);

    sprite.play(`idle_down_${npc.visual_tier}`);

    addOverheadInfo(this.scene, container, npc.username, npc.level, npc.title, npc.visual_tier, true, npc.cosmetics);

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
    addOverheadInfo(this.scene, container, username, level, title, tier, isSleeping, cosmetics);
  }

  addAuraParticles(container: Phaser.GameObjects.Container, tier: string, isSelf: boolean, isNPC: boolean = false) {
    addAuraParticles(this.scene, container, tier, isSelf, isNPC);
  }

  showChatBubble(container: Phaser.GameObjects.Container, text: string, isEmote: boolean = false) {
    showPlayerBubble(this.scene, container, text, isEmote);
  }

  handleRemotePlayerMove(
    data: { id: string; x: number; y: number; anim: string },
    otherPlayers: Map<string, Phaser.GameObjects.Container>
  ) {
    const container = otherPlayers.get(data.id);
    if (container) {
      container.setPosition(data.x, data.y);
      const sprite = container.list.find(child => child instanceof Phaser.GameObjects.Sprite) as Phaser.GameObjects.Sprite;
      if (sprite) {
        const tier = container.getData('tier') || 'green';
        sprite.play(`${data.anim}_${tier}`, true);
      }
    }
  }

  handleChatMessageSync(
    data: { sender_id: string; sender_name: string; message: string; is_ai?: boolean },
    currentUserId: string,
    selfContainer: Phaser.GameObjects.Container | null,
    otherPlayers: Map<string, Phaser.GameObjects.Container>
  ) {
    if (data.sender_id === currentUserId) {
      if (selfContainer) {
        this.showChatBubble(selfContainer, data.message, false);
      }
    } else {
      const container = otherPlayers.get(data.sender_id)

      if (container) {
        this.showChatBubble(container, data.message, false);
      }
    }
  }
}
