import Phaser from 'phaser';
import { DECORATION_EMOJIS } from '../../config/constants.js';

export class DecorManager {
    private scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    getEmojiForItem(itemType: string): string {
        return DECORATION_EMOJIS[itemType] || '🪵';
    }
}
