import Phaser from 'phaser';
import { CafeChair } from '../../cafe/CafePropsManager';
import { PlayerManager } from '../PlayerManager';

export class CafeInteractionManager {
    public promptText!: Phaser.GameObjects.Text;
    public sitPromptText!: Phaser.GameObjects.Text;
    public showcasePromptText!: Phaser.GameObjects.Text;
    public collabPromptText!: Phaser.GameObjects.Text;
    public isSitting: boolean = false;
    public isTransitioning: boolean = false;

    constructor(
        private scene: Phaser.Scene,
        private playerManager: PlayerManager,
        private cafeChairs: CafeChair[],
        private eKey: Phaser.Input.Keyboard.Key,
        private oKey: Phaser.Input.Keyboard.Key,
        private onExitToGarden: () => void,
        private onOpenShowcase?: () => void,
        private onOpenCollab?: () => void
    ) {
        this.createPrompts();
    }

    private createPrompts() {
        this.promptText = this.scene.add.text(0, 0, 'Press [O] to Exit to Dev Garden 🌿', {
            fontSize: '11px',
            fontFamily: 'system-ui, sans-serif',
            fontStyle: 'bold',
            color: '#ffffff',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            padding: { x: 8, y: 4 },
        });
        this.promptText.setOrigin(0.5, 0);
        this.promptText.setDepth(3000);
        this.promptText.setVisible(false);

        this.sitPromptText = this.scene.add.text(0, 0, 'Press [E] to Sit 🧘', {
            fontSize: '10px',
            fontFamily: 'system-ui, sans-serif',
            fontStyle: 'bold',
            color: '#ffffff',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            padding: { x: 6, y: 3 },
        });
        this.sitPromptText.setOrigin(0.5, 0);
        this.sitPromptText.setDepth(3000);
        this.sitPromptText.setVisible(false);

        this.showcasePromptText = this.scene.add.text(0, 0, 'Press [E] to View & Share Projects 🚀', {
            fontSize: '10px',
            fontFamily: 'system-ui, sans-serif',
            fontStyle: 'bold',
            color: '#fbbf24',
            backgroundColor: 'rgba(15, 23, 42, 0.92)',
            padding: { x: 8, y: 4 },
        });
        this.showcasePromptText.setOrigin(0.5, 0);
        this.showcasePromptText.setDepth(3000);
        this.showcasePromptText.setVisible(false);

        this.collabPromptText = this.scene.add.text(0, 0, 'Press [E] to Open Collab & Help Board 📊', {
            fontSize: '10px',
            fontFamily: 'system-ui, sans-serif',
            fontStyle: 'bold',
            color: '#60a5fa',
            backgroundColor: 'rgba(15, 23, 42, 0.92)',
            padding: { x: 8, y: 4 },
        });
        this.collabPromptText.setOrigin(0.5, 0);
        this.collabPromptText.setDepth(3000);
        this.collabPromptText.setVisible(false);
    }

    public checkShowcaseInteraction(
        playerContainer: Phaser.GameObjects.Container,
        showcasePos?: { x: number; y: number }
    ): boolean {
        const targetX = showcasePos?.x ?? 1152;
        const targetY = showcasePos?.y ?? 360;
        const dist = Phaser.Math.Distance.Between(playerContainer.x, playerContainer.y, targetX, targetY);

        if (dist < 58 && !this.isSitting) {
            this.showcasePromptText.setPosition(playerContainer.x, playerContainer.y + 14);
            this.showcasePromptText.setVisible(true);

            if (this.eKey && Phaser.Input.Keyboard.JustDown(this.eKey)) {
                if (this.onOpenShowcase) {
                    this.onOpenShowcase();
                } else {
                    window.dispatchEvent(new CustomEvent('open_cafe_showcase'));
                }
            }
            return true;
        } else {
            if (this.showcasePromptText) this.showcasePromptText.setVisible(false);
            return false;
        }
    }

    public checkCollabInteraction(
        playerContainer: Phaser.GameObjects.Container,
        collabPos?: { x: number; y: number }
    ): boolean {
        const targetX = collabPos?.x ?? 1152;
        const targetY = collabPos?.y ?? 550;
        const dist = Phaser.Math.Distance.Between(playerContainer.x, playerContainer.y, targetX, targetY);

        if (dist < 60 && !this.isSitting) {
            this.collabPromptText.setPosition(playerContainer.x, playerContainer.y + 14);
            this.collabPromptText.setVisible(true);

            if (this.eKey && Phaser.Input.Keyboard.JustDown(this.eKey)) {
                if (this.onOpenCollab) {
                    this.onOpenCollab();
                } else {
                    window.dispatchEvent(new CustomEvent('open_cafe_collab'));
                }
            }
            return true;
        } else {
            if (this.collabPromptText) this.collabPromptText.setVisible(false);
            return false;
        }
    }

    public checkChairInteraction(
        playerContainer: Phaser.GameObjects.Container,
        getLastAnim: () => string,
        setLastAnim: (anim: string) => void
    ): CafeChair | null {
        let nearChair: CafeChair | null = null;
        let minDist = 30;

        for (const chair of this.cafeChairs) {
            const distToChair = Phaser.Math.Distance.Between(playerContainer.x, playerContainer.y, chair.x, chair.y);
            const distToStand = chair.standPos
                ? Phaser.Math.Distance.Between(playerContainer.x, playerContainer.y, chair.standPos.x, chair.standPos.y)
                : 999;
            const effectiveDist = Math.min(distToChair, distToStand);
            if (effectiveDist < minDist) {
                minDist = effectiveDist;
                nearChair = chair;
            }
        }

        const body = playerContainer.body as Phaser.Physics.Arcade.Body;

        if (nearChair) {
            this.sitPromptText.setPosition(playerContainer.x, playerContainer.y + 14);
            this.sitPromptText.setText(this.isSitting ? 'Press [E] to Stand Up 🚶' : 'Press [E] to Sit 🧘');
            this.sitPromptText.setVisible(true);

            if (this.eKey && Phaser.Input.Keyboard.JustDown(this.eKey)) {
                if (this.isSitting) {
                    this.isSitting = false;

                    let standX = nearChair.x;
                    let standY = nearChair.y;

                    if (nearChair.standPos) {
                        standX = nearChair.standPos.x;
                        standY = nearChair.standPos.y;
                    } else {
                        if (nearChair.dir === 'up') {
                            standY = nearChair.y + 24;
                        } else if (nearChair.dir === 'down') {
                            standY = nearChair.y - 24;
                        } else if (nearChair.dir === 'left') {
                            standX = nearChair.x - 24;
                        } else if (nearChair.dir === 'right') {
                            standX = nearChair.x + 24;
                        } else if (nearChair.dir === 'sofa' || nearChair.x < 60) {
                            standX = nearChair.x + 26;
                        } else {
                            standY = nearChair.y + 24;
                        }
                    }
