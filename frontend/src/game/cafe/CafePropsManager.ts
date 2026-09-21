import Phaser from 'phaser';
import { CafeCommunityWing } from './communityWing/CafeCommunityWing';

export interface CafeChair {
    x: number;
    y: number;
    sprite: Phaser.GameObjects.Image;
    dir?: 'up' | 'down' | 'left' | 'right' | 'sofa';
    standPos?: { x: number; y: number };
}

export interface CafePropsResult {
    baristaSprite: Phaser.GameObjects.Image;
    exitMat: Phaser.GameObjects.Image;
    chairs: CafeChair[];
    showcasePos?: { x: number; y: number };
}
export class CafePropsManager {
    static createProps(
        scene: Phaser.Scene,
        obstaclesGroup: Phaser.Physics.Arcade.StaticGroup
    ): CafePropsResult {
        const chairs: CafeChair[] = [];

        // 1. Top Wall Deco & Signage
        // Dark Wooden Brick Backwall Structure behind counter & sign (Centered at true center x=480)
        const backwall = scene.add.image(480, 72, 'cafe_counter_backwall');
        backwall.setDisplaySize(280, 68);
        backwall.setOrigin(0.5, 0.5);
        backwall.setDepth(15);

        // Classic Open Terrace Carved Oak Wooden Sign Plaque "CODE CAFE"
        const neonSign = scene.add.image(480, 48, 'cafe_neon_sign');
        neonSign.setDisplaySize(130, 35);
        neonSign.setOrigin(0.5, 0.5);
        neonSign.setDepth(20);

        // Wall Poster: "TEA, SLEEP, CODE, REPEAT" (Right side wall: x=720)
        const poster = scene.add.image(720, 52, 'cafe_wall_poster');
        poster.setDisplaySize(85, 75);
        poster.setOrigin(0.5, 0.5);
        poster.setDepth(20);

        // Detailed Chalkboard Wall Menu (Left side wall: x=240)
        const wallMenu = scene.add.image(240, 52, 'cafe_wall_menu');
        wallMenu.setDisplaySize(140, 70);
        wallMenu.setOrigin(0.5, 0.5);
        wallMenu.setDepth(20);

        // 2. Center Open-Terrace Style Grand Counter & Barista Station (Centered at x=480)
        // Main Cashier Front Counter
        const counter = scene.add.image(480, 135, 'cafe_counter');
        counter.setDisplaySize(280, 48);
        counter.setOrigin(0.5, 0.5);
        counter.setDepth(140);
        scene.physics.add.existing(counter, true);
        obstaclesGroup.add(counter);

        // Left Side Return Counter Wing
        const counterSideL = scene.add.image(332, 115, 'cafe_counter_side');
        counterSideL.setDisplaySize(18, 48);
        counterSideL.setOrigin(0.5, 0.5);
        counterSideL.setDepth(138);
        scene.physics.add.existing(counterSideL, true);
        obstaclesGroup.add(counterSideL);

        // Right Side Return Counter Wing
        const counterSideR = scene.add.image(628, 115, 'cafe_counter_side');
        counterSideR.setDisplaySize(18, 48);
        counterSideR.setOrigin(0.5, 0.5);
        counterSideR.setDepth(138);
        scene.physics.add.existing(counterSideR, true);
        obstaclesGroup.add(counterSideR);

        // Barista NPC behind counter
        const baristaSprite = scene.add.image(460, 108, 'cafe_barista');
        baristaSprite.setOrigin(0.5, 0.85);
        baristaSprite.setDepth(130);

        // POS Cash Register Terminal on Counter
        const posTerminal = scene.add.image(495, 126, 'cafe_pos_terminal');
        posTerminal.setOrigin(0.5, 0.85);
        posTerminal.setDepth(145);

        // Pastry Display Case on right side of counter
        const pastryDisplay = scene.add.image(555, 126, 'cafe_pastry_display');
        pastryDisplay.setOrigin(0.5, 0.85);
        pastryDisplay.setDepth(145);

        // Commercial Dual-Grouphead Espresso Machine on left side of counter
        const espressoMachine = scene.add.image(385, 126, 'cafe_espresso_machine');
        espressoMachine.setOrigin(0.5, 0.85);
        espressoMachine.setDepth(145);

