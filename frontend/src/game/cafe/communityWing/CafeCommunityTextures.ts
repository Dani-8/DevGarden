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

                // Plank 2 (y: 8 to 15)
                ctx.fillStyle = '#835231';
                ctx.fillRect(0, 9, 32, 7);
                ctx.fillStyle = '#98613c';
                ctx.fillRect(0, 10, 32, 1);
                ctx.fillStyle = '#663c20';
                ctx.fillRect(26, 9, 1, 7);

                // Plank 3 (y: 16 to 23)
                ctx.fillStyle = '#8e5937';
                ctx.fillRect(0, 17, 32, 7);
                ctx.fillStyle = '#a36a44';
                ctx.fillRect(0, 18, 32, 1);
                ctx.fillStyle = '#663c20';
                ctx.fillRect(8, 17, 1, 7);

                // Plank 4 (y: 24 to 31)
                ctx.fillStyle = '#804f2f';
                ctx.fillRect(0, 25, 32, 7);
                ctx.fillStyle = '#945e39';
                ctx.fillRect(0, 26, 32, 1);
                ctx.fillStyle = '#663c20';
                ctx.fillRect(20, 25, 1, 7);

                // Plank separation groove shadows
                ctx.fillStyle = '#4a2913';
                ctx.fillRect(0, 0, 32, 1);
                ctx.fillRect(0, 8, 32, 1);
                ctx.fillRect(0, 16, 32, 1);
                ctx.fillRect(0, 24, 32, 1);

                canvas.refresh();
            }
        }

        if (!textures.exists('cafe_wing_floor_wood_2')) {
            const canvas = textures.createCanvas('cafe_wing_floor_wood_2', 32, 32);
            if (canvas) {
                const ctx = canvas.getContext();

                // Base Wood Alternate Variant
                ctx.fillStyle = '#865433';
                ctx.fillRect(0, 0, 32, 32);

                // Plank 1
                ctx.fillStyle = '#8a5735';
                ctx.fillRect(0, 1, 32, 7);
                ctx.fillStyle = '#9d6540';
                ctx.fillRect(0, 2, 32, 1);
                ctx.fillStyle = '#61381d';
                ctx.fillRect(22, 1, 1, 7);

                // Plank 2
                ctx.fillStyle = '#905b39';
                ctx.fillRect(0, 9, 32, 7);
                ctx.fillStyle = '#a56c46';
                ctx.fillRect(0, 10, 32, 1);
                ctx.fillStyle = '#61381d';
                ctx.fillRect(6, 9, 1, 7);

                // Plank 3
                ctx.fillStyle = '#825130';
                ctx.fillRect(0, 17, 32, 7);
                ctx.fillStyle = '#97603b';
                ctx.fillRect(0, 18, 32, 1);
                ctx.fillStyle = '#61381d';
                ctx.fillRect(28, 17, 1, 7);

                // Plank 4
                ctx.fillStyle = '#8c5836';
                ctx.fillRect(0, 25, 32, 7);
                ctx.fillStyle = '#a16843';
                ctx.fillRect(0, 26, 32, 1);
                ctx.fillStyle = '#61381d';
                ctx.fillRect(12, 25, 1, 7);

                // Groove shadows
                ctx.fillStyle = '#462611';
                ctx.fillRect(0, 0, 32, 1);
                ctx.fillRect(0, 8, 32, 1);
                ctx.fillRect(0, 16, 32, 1);
                ctx.fillRect(0, 24, 32, 1);

                canvas.refresh();
            }
        }

        // =========================================================================
        // 3. CLEAN, THICK NEUTRAL STONE DIVIDER WALL (384x28)
        // Base stone color: #B8B1A3, limestone capstone, NO gold stripes
        // =========================================================================
        if (!textures.exists('cafe_wing_stone_div_wall')) {
            const canvas = textures.createCanvas('cafe_wing_stone_div_wall', 384, 28);
            if (canvas) {
                const ctx = canvas.getContext();

                // Floor Shadow below wall
                ctx.fillStyle = 'rgba(0, 0, 0, 0.38)';
                ctx.fillRect(0, 20, 384, 8);

                // Top Limestone Capstone Rail (y: 0 to 6)
                ctx.fillStyle = '#c7c0b3';
                ctx.fillRect(0, 0, 384, 6);
                ctx.fillStyle = '#ded8cb';
                ctx.fillRect(0, 0, 384, 2); // Top rim highlight
                ctx.fillStyle = '#9e978b';
                ctx.fillRect(0, 5, 384, 1); // Capstone underside shadow

                // Capstone seams every 32px
                ctx.fillStyle = '#7a7368';
                for (let x = 32; x < 384; x += 32) {
                    ctx.fillRect(x, 0, 1, 6);
                }

                // Stone Brick Masonry Body (y: 6 to 20)
                ctx.fillStyle = '#665f56'; // Mortar base
                ctx.fillRect(0, 6, 384, 14);

                // Upper Stone Course (y: 7 to 12)
                for (let x = 0; x < 384; x += 24) {
                    ctx.fillStyle = (Math.floor(x / 24) % 2 === 0) ? '#b8b1a3' : '#aea799';
                    ctx.fillRect(x + 1, 7, 22, 5);
                    ctx.fillStyle = '#cbc4b7';
                    ctx.fillRect(x + 1, 7, 22, 1);
                }

                // Lower Stone Course (y: 14 to 19)
                for (let x = -12; x < 384; x += 24) {
                    const rx = Math.max(0, x + 1);
                    const rw = Math.min(22, 384 - rx);
                    if (rw > 0) {
                        ctx.fillStyle = (Math.floor((x + 12) / 24) % 2 === 0) ? '#b0a99b' : '#a69f92';
                        ctx.fillRect(rx, 14, rw, 5);
                        ctx.fillStyle = '#c4bdae';
                        ctx.fillRect(rx, 14, rw, 1);
                    }
                }

                // Base skirting line
                ctx.fillStyle = '#3d3832';
                ctx.fillRect(0, 19, 384, 1);

                canvas.refresh();
            }
        }

        // Alias for horizontal wall
        if (!textures.exists('cafe_wing_div_wall_h')) {
            const canvas = textures.createCanvas('cafe_wing_div_wall_h', 384, 28);
            if (canvas) {
                const source = textures.get('cafe_wing_stone_div_wall').getSourceImage() as any;
                if (source) {
                    canvas.getContext().drawImage(source, 0, 0);
                    canvas.refresh();
                }
            }
        }

        // =========================================================================
        // 4. VERTICAL DIVIDING WALL (20x64)
        // Tiny dark neutral stone-brick column (slightly darker than horizontal dividers)
        // Matches the stone material without being overly light or distracting.
        // =========================================================================
        if (!textures.exists('cafe_wing_div_wall_v')) {
            const canvas = textures.createCanvas('cafe_wing_div_wall_v', 20, 64);
            if (canvas) {
                const ctx = canvas.getContext();

                // Floor / boundary drop shadow on left
                ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
                ctx.fillRect(0, 0, 3, 64);

                // Dark outer stone edging / mortar
                ctx.fillStyle = '#423d36';
                ctx.fillRect(3, 0, 15, 64);

                // Tiny darker stone-brick body (#9a9386 base, darker than #b8b1a3)
                ctx.fillStyle = '#9a9386';
                ctx.fillRect(4, 0, 13, 64);

                // Stone blocks and joints across height (8px blocks)
                for (let y = 0; y < 64; y += 8) {
                    const isAlt = (y / 8) % 2 === 0;
                    ctx.fillStyle = isAlt ? '#9e978a' : '#8e887b';
                    ctx.fillRect(5, y + 1, 11, 6);

                    // Top highlight
                    ctx.fillStyle = '#aba599';
                    ctx.fillRect(5, y + 1, 11, 1);

                    // Horizontal mortar joint
                    ctx.fillStyle = '#4e4840';
                    ctx.fillRect(4, y + 7, 13, 1);
                }

                // Inner vertical bevel line for solid structural depth
                ctx.fillStyle = '#b5afa3';
                ctx.fillRect(5, 0, 1, 64);

                ctx.fillStyle = '#615a51';
                ctx.fillRect(15, 0, 1, 64);

                // Top and bottom stone cap seam
                ctx.fillStyle = '#2b2722';
                ctx.fillRect(3, 0, 15, 1);
                ctx.fillRect(3, 63, 15, 1);

                canvas.refresh();
            }
        }

        // =========================================================================
        // 5. WARM WOVEN COIR DOORWAY MAT (64x96)
        // =========================================================================
        if (!textures.exists('cafe_wing_gate_mat')) {
            const canvas = textures.createCanvas('cafe_wing_gate_mat', 64, 96);
            if (canvas) {
                const ctx = canvas.getContext();

                // Floor Shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                ctx.beginPath();
                ctx.roundRect(2, 3, 60, 90, 6);
                ctx.fill();

                // Heavy Black Vulcanized Rubber Rim
                ctx.fillStyle = '#1c1917';
                ctx.beginPath();
                ctx.roundRect(1, 2, 62, 92, 5);
                ctx.fill();

                // Rubber Edge Highlight
                ctx.fillStyle = '#292524';
                ctx.beginPath();
                ctx.roundRect(2, 3, 60, 90, 4);
                ctx.fill();

                // Heavy Braided Coir Fiber Bed
                ctx.fillStyle = '#9c663b';
                ctx.fillRect(5, 6, 54, 84);

                // Dense woven ribbing texture
                for (let y = 6; y < 90; y += 3) {
                    ctx.fillStyle = (Math.floor(y / 3) % 2 === 0) ? '#ad7748' : '#885329';
                    ctx.fillRect(5, y, 54, 2);
                }

                // Inner Stenciled Border Box
                ctx.strokeStyle = '#1c1917';
                ctx.lineWidth = 2;
                ctx.strokeRect(9, 10, 46, 76);

                ctx.strokeStyle = '#d97706';
                ctx.lineWidth = 1;
                ctx.strokeRect(11, 12, 42, 72);

                // Corner stencil accents
                ctx.fillStyle = '#1c1917';
                ctx.fillRect(9, 10, 4, 4);
                ctx.fillRect(51, 10, 4, 4);
                ctx.fillRect(9, 82, 4, 4);
                ctx.fillRect(51, 82, 4, 4);

                canvas.refresh();
            }
        }
