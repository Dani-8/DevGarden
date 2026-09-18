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