import Phaser from 'phaser';
import { CafeChair } from '../CafePropsManager';
import { CafeCommunityTextures } from './CafeCommunityTextures';

export class CafeCommunityWing {
    /**
     * Dedicated 3-Section Community & Social Extension horizontally expanded to the right (x: 960..1344):
     *
     * 1. SECTION 1 (Top: y = 100..300) -> "CHILL & LOUNGE NOOK"
     *    - Gate entrance at x = 960, y = 200
     * 2. SECTION 2 (Middle: y = 300..500) -> "PROJECT SHOWCASE HUB"
     *    - Gate entrance at x = 960, y = 400
     * 3. SECTION 3 (Bottom: y = 500..708) -> "COLLAB & MEETING ROOM"
     *    - Gate entrance at x = 960, y = 590
     */
    public static create(
        scene: Phaser.Scene,
        obstaclesGroup: Phaser.Physics.Arcade.StaticGroup,
        chairs: CafeChair[]
    ): { showcaseX: number; showcaseY: number } {
        CafeCommunityTextures.createAll(scene);