import Phaser from 'phaser';
import { PlayerState } from '../../../types/index';
import { StarTreeManager } from '../../managers/StarTreeManager';
import { GardenInteractionManager } from './GardenInteractionManager';

export class GardenMovementManager {
    private lastMoveSent: number = 0;
    private lastX: number = 0;
    private lastY: number = 0;
    private lastAnim: string = 'idle_down';

    constructor(
        private scene: Phaser.Scene,
        private socket: any,
        private selfPlayer: PlayerState | null,
        private interactionManager: GardenInteractionManager,
        private starTreeManager: StarTreeManager,
        private leaderboardTreeObj: Phaser.GameObjects.Image,
        private otherPlayers: Map<string, Phaser.GameObjects.Container>,
        private sleepingNPCs: Map<string, Phaser.GameObjects.Container>,
        private onNearLeaderboardCallback?: (isNear: boolean) => void
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

        const speed = 120;
        let vx = 0;
        let vy = 0;
        let animKey = 'idle_down';

        if (this.interactionManager.isSitting) {
            vx = 0;
            vy = 0;

            if (cursors.left.isDown || wasd.A.isDown) animKey = 'idle_left';
            else if (cursors.right.isDown || wasd.D.isDown) animKey = 'idle_right';
            else if (cursors.up.isDown || wasd.W.isDown) animKey = 'idle_up';
            else if (cursors.down.isDown || wasd.S.isDown) animKey = 'idle_down';
            else {
                if (this.lastAnim.includes('left')) animKey = 'idle_left';
                else if (this.lastAnim.includes('right')) animKey = 'idle_right';
                else if (this.lastAnim.includes('up')) animKey = 'idle_up';
                else animKey = 'idle_down';
            }
        } else {
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
        }

        this.interactionManager.updateInteractions(playerContainer);

        const body = playerContainer.body as Phaser.Physics.Arcade.Body;

        if (this.interactionManager.isSitting) {
            body.setVelocity(0, 0);
        } else {
            body.setVelocity(vx, vy);
        }

        const tier = this.selfPlayer?.visual_tier || 'green';
        if (this.interactionManager.isSitting) {
            playerSprite.play(`${animKey}_${tier}`, true);
        } else if (vx === 0 && vy === 0) {
            if (this.lastAnim.includes('left')) animKey = 'idle_left';
            else if (this.lastAnim.includes('right')) animKey = 'idle_right';
            else if (this.lastAnim.includes('up')) animKey = 'idle_up';
            else animKey = 'idle_down';

            playerSprite.play(`${animKey}_${tier}`, true);
        } else {
            playerSprite.play(`${animKey}_${tier}`, true);
        }

        // Leaderboard Proximity
        const distToLeaderboard = Phaser.Math.Distance.Between(
            playerContainer.x,
            playerContainer.y,
            this.leaderboardTreeObj.x,
            this.leaderboardTreeObj.y
        );
        const isNearLeaderboard = distToLeaderboard < 70;
        if (this.onNearLeaderboardCallback) {
            this.onNearLeaderboardCallback(isNearLeaderboard);
        }

        // Star Tree Proximity
        this.starTreeManager.updateProximity(playerContainer);

        if (cursors.space && Phaser.Input.Keyboard.JustDown(cursors.space)) {
            const distToStarTree = Phaser.Math.Distance.Between(
                playerContainer.x,
                playerContainer.y,
                512,
                260
            );
            if (distToStarTree < 90) {
                this.starTreeManager.waterStarTree(playerContainer, playerSprite);
            }
        }

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
                    scene: 'GardenScene',
                });
            }

            try {
                localStorage.setItem('devgarden_last_x', rx.toString());
                localStorage.setItem('devgarden_last_y', ry.toString());
                localStorage.setItem('devgarden_last_scene', 'GardenScene');
                sessionStorage.setItem('devgarden_last_pos', JSON.stringify({ x: rx, y: ry }));
            } catch {
                // ignore quota errors
            }

            this.lastX = playerContainer.x;
            this.lastY = playerContainer.y;
            this.lastAnim = animKey;
            this.lastMoveSent = now;
        }

        // Depth Sorting & Interpolation
        playerContainer.setDepth(playerContainer.y);

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

        this.sleepingNPCs.forEach((container) => {
            container.setDepth(container.y);
        });
    }
}
