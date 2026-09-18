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