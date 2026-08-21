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

        const tier = this.selfPlayer?.visual_tier || 'green';
        if (vx === 0 && vy === 0) {
            if (this.lastAnim.includes('left')) animKey = 'idle_left';
            else if (this.lastAnim.includes('right')) animKey = 'idle_right';
            else if (this.lastAnim.includes('up')) animKey = 'idle_up';
            else animKey = 'idle_down';
            playerSprite.play(`${animKey}_${tier}`, true);
        } else {
            playerSprite.play(`${animKey}_${tier}`, true);
        }

        // Barista interaction
        this.baristaManager.checkInteraction(playerContainer.x, playerContainer.y);

        // Project showcase interaction
        this.interactionManager.checkShowcaseInteraction(playerContainer, this.showcasePos);

        // Exit interaction
        this.interactionManager.checkExitInteraction(playerContainer);

        // Network position sync
        const now = Date.now();
        const posChanged =
            Math.abs(playerContainer.x - this.lastX) > 1 || Math.abs(playerContainer.y - this.lastY) > 1;
        const animChanged = animKey !== this.lastAnim;

        if (now - this.lastMoveSent > 45 && (posChanged || animChanged)) {
            const rx = Math.round(playerContainer.x);
            const ry = Math.round(playerContainer.y);

            if (this.socket) {
                this.socket.emit('player_move', {
                    x: rx,
                    y: ry,
                    anim: animKey,
                    scene: 'CodeCafeScene',
                });
            }

            try {
                localStorage.setItem('devgarden_last_x', rx.toString());
                localStorage.setItem('devgarden_last_y', ry.toString());
                localStorage.setItem('devgarden_last_scene', 'CodeCafeScene');
            } catch {
                // ignore quota errors
            }

            this.lastX = playerContainer.x;
            this.lastY = playerContainer.y;
            this.lastAnim = animKey;
            this.lastMoveSent = now;
        }
    }
}
