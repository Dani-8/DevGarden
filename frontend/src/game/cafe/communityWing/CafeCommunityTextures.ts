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

                // Course 2 (y: 17 to 31) - Staggered Ashlar Stone Blocks
                // Block 2A (x: 0 to 6)
                ctx.fillStyle = '#b4ada0';
                ctx.fillRect(0, 17, 7, 14);
                ctx.fillStyle = '#ccc6bb';
                ctx.fillRect(0, 18, 6, 2);
                ctx.fillStyle = '#999285';
                ctx.fillRect(0, 29, 6, 2);

                // Block 2B (x: 9 to 22)
                ctx.fillStyle = '#b8b1a3';
                ctx.fillRect(9, 17, 14, 14);
                ctx.fillStyle = '#d2ccbf';
                ctx.fillRect(10, 18, 12, 2);
                ctx.fillStyle = '#9f988b';
                ctx.fillRect(10, 29, 12, 2);
                ctx.fillStyle = '#aaa396';
                ctx.fillRect(13, 22, 5, 3);

                // Block 2C (x: 25 to 31)
                ctx.fillStyle = '#ada698';
                ctx.fillRect(25, 17, 7, 14);
                ctx.fillStyle = '#c5bfae';
                ctx.fillRect(26, 18, 6, 2);
                ctx.fillStyle = '#928b7e';
                ctx.fillRect(26, 29, 6, 2);

                // Mortar lines & shadow seams
                ctx.fillStyle = '#524c44';
                ctx.fillRect(0, 15, 32, 2);
                ctx.fillRect(0, 31, 32, 1);
                ctx.fillRect(15, 0, 2, 16);
                ctx.fillRect(7, 16, 2, 16);
                ctx.fillRect(23, 16, 2, 16);

                canvas.refresh();
            }
        }

        // =========================================================================
        // 2. 3-SECTION FLOOR: MEDIUM WARM BROWN WOOD FLOOR (32x32 Tileable)
        // Main plank body: #8A5735 (distinct richer warm tone, separate from main cafe)
        // =========================================================================
        if (!textures.exists('cafe_wing_floor_wood_1')) {
            const canvas = textures.createCanvas('cafe_wing_floor_wood_1', 32, 32);
            if (canvas) {
                const ctx = canvas.getContext();

                // Base Wood
                ctx.fillStyle = '#8a5735';
                ctx.fillRect(0, 0, 32, 32);

                // Horizontal Planks (8px high each)
                // Plank 1 (y: 0 to 7)
                ctx.fillStyle = '#8a5735';
                ctx.fillRect(0, 1, 32, 7);
                ctx.fillStyle = '#9f6742';
                ctx.fillRect(0, 2, 32, 1); // Highlight
                ctx.fillStyle = '#663c20';
                ctx.fillRect(14, 1, 1, 7); // Vertical plank seam

