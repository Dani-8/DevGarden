import Phaser from 'phaser';
import { BenchInfo } from '../../props/WorldPropsManager';
import { PlayerManager } from '../PlayerManager';

export class GardenInteractionManager {
    private sitPromptText!: Phaser.GameObjects.Text;
    private cafeDoorPromptText!: Phaser.GameObjects.Text;
    public isSitting: boolean = false;
    public isTransitioning: boolean = false;

    constructor(
        private scene: Phaser.Scene,
        private playerManager: PlayerManager,
        private benchesList: BenchInfo[],
        private eKey: Phaser.Input.Keyboard.Key,
        private oKey: Phaser.Input.Keyboard.Key,
        private onEnterCafe: () => void
    ) {
        this.createPrompts();
    }

    private createPrompts() {
        this.sitPromptText = this.scene.add.text(0, 0, 'Press [E] to Sit 🧘', {
            fontSize: '11px',
            fontFamily: 'system-ui, sans-serif',
            fontStyle: 'bold',
            color: '#ffffff',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            padding: { x: 6, y: 3 }
        });
        this.sitPromptText.setOrigin(0.5, 0);
        this.sitPromptText.setDepth(3000);
        this.sitPromptText.setVisible(false);

        this.cafeDoorPromptText = this.scene.add.text(0, 0, 'Press [O] to Open Door & Enter 🚪', {
            fontSize: '11px',
            fontFamily: 'system-ui, sans-serif',
            fontStyle: 'bold',
            color: '#ffffff',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: { x: 8, y: 4 }
        });
        this.cafeDoorPromptText.setOrigin(0.5, 0);
        this.cafeDoorPromptText.setDepth(3000);
        this.cafeDoorPromptText.setVisible(false);
    }

    public updateInteractions(playerContainer: Phaser.GameObjects.Container) {
        let nearBench: BenchInfo | null = null;
        for (const bench of this.benchesList) {
            const dist = Phaser.Math.Distance.Between(playerContainer.x, playerContainer.y, bench.x, bench.y);
            if (dist < 40) {
                nearBench = bench;
                break;
            }
        }

        const body = playerContainer.body as Phaser.Physics.Arcade.Body;

        if (nearBench) {
            this.sitPromptText.setPosition(playerContainer.x, playerContainer.y + 12);
            this.sitPromptText.setText(this.isSitting ? 'Press [E] to Stand Up 🚶' : 'Press [E] to Sit 🧘');
            this.sitPromptText.setVisible(true);

            if (this.eKey && Phaser.Input.Keyboard.JustDown(this.eKey)) {
                if (this.isSitting) {
                    this.isSitting = false;
                    this.playerManager.showChatBubble(playerContainer, "🚶 Stood up!", false);
                } else {
                    this.isSitting = true;
                    let sitX = nearBench.x;
                    let sitY = nearBench.y - 4;

                    if (nearBench.type === 'bench_horizontal') {
                        sitX = Phaser.Math.Clamp(playerContainer.x, nearBench.x - 20, nearBench.x + 20);
                        sitY = nearBench.y - 4;
                    } else {
                        sitX = nearBench.x;
                        sitY = Phaser.Math.Clamp(playerContainer.y, nearBench.y - 20, nearBench.y + 20);
                    }

                    playerContainer.setPosition(sitX, sitY);
                    body.setVelocity(0, 0);
                    this.playerManager.showChatBubble(playerContainer, "🧘 Resting at Dev Garden...", false);
                }
            }
        } else {
            if (this.sitPromptText) this.sitPromptText.setVisible(false);
            if (this.isSitting) {
                this.isSitting = false;
            }
        }

        const distToCafeDoor = Phaser.Math.Distance.Between(
            playerContainer.x,
            playerContainer.y,
            160,
            675
        );

        if (distToCafeDoor < 45) {
            this.cafeDoorPromptText.setPosition(playerContainer.x, playerContainer.y + 12);
            this.cafeDoorPromptText.setVisible(true);

            if (this.oKey && Phaser.Input.Keyboard.JustDown(this.oKey)) {
                this.onEnterCafe();
            }
        } else {
            if (this.cafeDoorPromptText) this.cafeDoorPromptText.setVisible(false);
        }
    }

    public hideCafeDoorPrompt() {
        if (this.cafeDoorPromptText) {
            this.cafeDoorPromptText.setVisible(false);
        }
    }
}
