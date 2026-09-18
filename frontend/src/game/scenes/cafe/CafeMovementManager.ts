import Phaser from 'phaser';
import { PlayerState } from '../../../types/index';
import { CafeBaristaManager } from '../../cafe/CafeBaristaManager';
import { CafeInteractionManager } from './CafeInteractionManager';

export class CafeMovementManager {
    private lastMoveSent: number = 0;
    private lastX: number = 0;
    private lastY: number = 0;
    private lastAnim: string = 'idle_down';

    constructor(
        private scene: Phaser.Scene,
        private socket: any,
        private selfPlayer: PlayerState | null,
        private interactionManager: CafeInteractionManager,
        private baristaManager: CafeBaristaManager,
        private otherPlayers: Map<string, Phaser.GameObjects.Container>,
        private showcasePos?: { x: number; y: number }
    ) { }

    public handleUpdate(
        playerContainer: Phaser.GameObjects.Container | null,
        playerSprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | null,
        cursors: Phaser.Types.Input.Keyboard.CursorKeys,
        wasd: {
            W: Phaser.Input.Keyboard.Key;
            A: Phaser.Input.Keyboard.Key;
            S: Phaser.Input.Keyboard.Key;
            D: Phaser.Input.Keyboard.Key;
        }
    ) {
        if (
            this.interactionManager.isTransitioning ||
            !playerContainer ||
            !playerSprite ||
            !cursors ||
            !wasd
        ) {
            return;
        }

        const speed = 110;
        let vx = 0;
        let vy = 0;
        let animKey = 'idle_down';

        if (cursors.left.isDown || wasd.A.isDown) {
            vx = -speed;
            animKey = 'walk_left';
        } else if (cursors.right.isDown || wasd.D.isDown) {
            vx = speed;
            animKey = 'walk_right';
        }

    if (cursors.up.isDown || wasd.W.isDown) {
      vy = -speed;
      animKey = 'walk_up';
    } else if (cursors.down.isDown || wasd.S.isDown) {
      vy = speed;
      animKey = 'walk_down';
    }

    if (vx !== 0 && vy !== 0) {
      vx *= 0.7071;
      vy *= 0.7071;
    }

    const body = playerContainer.body as Phaser.Physics.Arcade.Body;

    // Chair interaction & sitting logic
    const nearChair = this.interactionManager.checkChairInteraction(
      playerContainer,
      () => this.lastAnim,
      (anim) => {
        this.lastAnim = anim;
      }
    );

    if (this.interactionManager.isSitting) {
      body.setVelocity(0, 0);
      vx = 0;
      vy = 0;

      if (cursors.left.isDown || wasd.A.isDown) this.lastAnim = 'idle_left';
      else if (cursors.right.isDown || wasd.D.isDown) this.lastAnim = 'idle_right';
      else if (cursors.up.isDown || wasd.W.isDown) this.lastAnim = 'idle_up';
      else if (cursors.down.isDown || wasd.S.isDown) this.lastAnim = 'idle_down';
    } else {
      body.setVelocity(vx, vy);
    }

    // Depth Sorting
    if (this.interactionManager.isSitting && nearChair) {
      playerContainer.setDepth(nearChair.y + 10);
    } else {
      playerContainer.setDepth(playerContainer.y);
    }

    this.otherPlayers.forEach((container) => {
      const targetX = container.getData('targetX');
      const targetY = container.getData('targetY');
      if (typeof targetX === 'number' && typeof targetY === 'number') {
        const dx = targetX - container.x;
        const dy = targetY - container.y;
        if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
          container.x += dx * 0.25;
          container.y += dy * 0.25;
        } else {
          container.x = targetX;
          container.y = targetY;
        }
      }
      container.setDepth(container.y);
    });
