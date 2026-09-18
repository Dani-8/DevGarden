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
