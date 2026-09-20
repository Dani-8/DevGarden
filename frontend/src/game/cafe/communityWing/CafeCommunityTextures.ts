import Phaser from 'phaser';

export class CafeCommunityTextures {
  public static createAll(scene: Phaser.Scene) {
    const textures = scene.textures;

    // =========================================================================
    // 1. LIGHT WARM GRAY / BEIGE STONE-BRICK WALL (32x32 Tileable)
    // Base stone color: #B8B1A3 with subtle bevels and mortar
    // =========================================================================
    if (!textures.exists('cafe_wing_stone_brick_wall')) {
      const canvas = textures.createCanvas('cafe_wing_stone_brick_wall', 32, 32);
      if (canvas) {
        const ctx = canvas.getContext();

        // Base Mortar Color (Muted Stone Mortar)
        ctx.fillStyle = '#6e675d';
        ctx.fillRect(0, 0, 32, 32);

        // Course 1 (y: 0 to 15) - 2 Ashlar Stone Blocks
        // Block 1A (x: 1 to 14)
        ctx.fillStyle = '#b8b1a3';
        ctx.fillRect(1, 1, 14, 14);
        ctx.fillStyle = '#cfc9bd';
        ctx.fillRect(2, 2, 12, 2); // Top highlight
        ctx.fillStyle = '#9e978a';
        ctx.fillRect(2, 13, 12, 2); // Bottom bevel shade
        // Texture flecks
        ctx.fillStyle = '#aba496';
        ctx.fillRect(5, 6, 4, 3);
        ctx.fillRect(10, 8, 2, 2);

        // Block 1B (x: 17 to 30)
        ctx.fillStyle = '#b0a99c';
        ctx.fillRect(17, 1, 14, 14);
        ctx.fillStyle = '#c9c3b8';
        ctx.fillRect(18, 2, 12, 2);
        ctx.fillStyle = '#968f82';
        ctx.fillRect(18, 13, 12, 2);
        ctx.fillStyle = '#a69f92';
        ctx.fillRect(21, 5, 5, 3);
        ctx.fillRect(27, 9, 2, 2);

