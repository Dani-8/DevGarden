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

                // Clean Dark Walnut Plaque Backing in Center (x: 100 to 284)
                ctx.fillStyle = '#1c0c04';
                ctx.fillRect(100, 2, 184, 16);
                ctx.fillStyle = '#3a1b0d';
                ctx.fillRect(102, 3, 180, 14);
                ctx.fillStyle = '#5c2d15';
                ctx.fillRect(103, 4, 178, 2);

                // Subtle dark wooden border
                ctx.strokeStyle = '#271206';
                ctx.lineWidth = 1;
                ctx.strokeRect(102, 3, 180, 14);

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

        if (!textures.exists('cafe_wing_gate_threshold')) {
            const canvas = textures.createCanvas('cafe_wing_gate_threshold', 64, 96);
            if (canvas) {
                const source = textures.get('cafe_wing_gate_mat').getSourceImage() as any;
                if (source) {
                    canvas.getContext().drawImage(source, 0, 0);
                    canvas.refresh();
                }
            }
        }

        // =========================================================================
        // 6. OLIVE & MOSS GREEN LOUNGE AREA RUG (170x110)
        // =========================================================================
        if (!textures.exists('cafe_zone_olive_rug')) {
            const canvas = textures.createCanvas('cafe_zone_olive_rug', 170, 110);
            if (canvas) {
                const ctx = canvas.getContext();

                // Floor Shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                ctx.fillRect(3, 3, 164, 104);

                // Dark Slate / Forest Outer Border
                ctx.fillStyle = '#1c2819';
                ctx.fillRect(0, 0, 170, 110);

                // Rich Warm Olive / Moss Field
                ctx.fillStyle = '#324528';
                ctx.fillRect(4, 4, 162, 102);
                ctx.fillStyle = '#3c5330';
                ctx.fillRect(8, 8, 154, 94);

                // Woven textile grain
                for (let y = 10; y < 100; y += 4) {
                    ctx.fillStyle = (Math.floor(y / 4) % 2 === 0) ? '#455e37' : '#354b2b';
                    ctx.fillRect(10, y, 150, 2);
                }

                // Inner decorative border trim
                ctx.strokeStyle = '#5a7849';
                ctx.lineWidth = 1.5;
                ctx.strokeRect(12, 12, 146, 86);

                canvas.refresh();
            }
        }

        if (!textures.exists('cafe_zone_persian_rug')) {
            const canvas = textures.createCanvas('cafe_zone_persian_rug', 170, 110);
            if (canvas) {
                const source = textures.get('cafe_zone_olive_rug').getSourceImage() as any;
                if (source) {
                    canvas.getContext().drawImage(source, 0, 0);
                    canvas.refresh();
                }
            }
        }

        // =========================================================================
        // 7. COZY PLUSH CRIMSON LOUNGE SOFA (64x40)
        // =========================================================================
        if (!textures.exists('cafe_lounge_plush_sofa')) {
            const canvas = textures.createCanvas('cafe_lounge_plush_sofa', 64, 40);
            if (canvas) {
                const ctx = canvas.getContext();

                // Floor shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                ctx.beginPath();
                ctx.ellipse(32, 36, 30, 4, 0, 0, Math.PI * 2);
                ctx.fill();

                // Sofa Wooden Legs
                ctx.fillStyle = '#270e01';
                ctx.fillRect(6, 32, 4, 6);
                ctx.fillRect(54, 32, 4, 6);

                // Sofa Base & Seat Frame
                ctx.fillStyle = '#78350f';
                ctx.fillRect(4, 26, 56, 8);

                // Main Plush Cushions (Warm Crimson)
                ctx.fillStyle = '#991b1b';
                ctx.fillRect(6, 16, 25, 12);
                ctx.fillRect(33, 16, 25, 12);

                // Cushion Highlights
                ctx.fillStyle = '#dc2626';
                ctx.fillRect(8, 17, 21, 3);
                ctx.fillRect(35, 17, 21, 3);

                // Backrest (Tufted velvet styling)
                ctx.fillStyle = '#7f1d1d';
                ctx.fillRect(4, 4, 56, 14);
                ctx.fillStyle = '#b91c1c';
                ctx.fillRect(6, 6, 52, 4);

                // Armrests
                ctx.fillStyle = '#5c1212';
                ctx.fillRect(2, 10, 6, 20);
                ctx.fillRect(56, 10, 6, 20);
                ctx.fillStyle = '#991b1b';
                ctx.fillRect(3, 11, 4, 18);

                // Accent Throw Pillows
                ctx.fillStyle = '#0f766e';
                ctx.fillRect(8, 12, 10, 10);
                ctx.fillStyle = '#14b8a6';
                ctx.fillRect(9, 13, 8, 3);

                ctx.fillStyle = '#d97706';
                ctx.fillRect(46, 12, 10, 10);
                ctx.fillStyle = '#fbbf24';
                ctx.fillRect(47, 13, 8, 3);

                canvas.refresh();
            }
        }

        // =========================================================================
        // 8. OVAL / DELUXE COFFEE TABLE WITH LAPTOP & DRINKS (48x28)
        // =========================================================================
        if (!textures.exists('cafe_lounge_coffee_table_deluxe')) {
            const canvas = textures.createCanvas('cafe_lounge_coffee_table_deluxe', 48, 28);
            if (canvas) {
                const ctx = canvas.getContext();

                // Floor Shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                ctx.beginPath();
                ctx.ellipse(24, 25, 22, 3, 0, 0, Math.PI * 2);
                ctx.fill();

                // Table Legs
                ctx.fillStyle = '#1c1917';
                ctx.fillRect(6, 16, 3, 10);
                ctx.fillRect(39, 16, 3, 10);

                // Warm Walnut Oval Tabletop
                ctx.fillStyle = '#451a03';
                ctx.beginPath();
                ctx.ellipse(24, 12, 22, 9, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#78350f';
                ctx.beginPath();
                ctx.ellipse(24, 11, 20, 8, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#9a3412';
                ctx.beginPath();
                ctx.ellipse(24, 10, 16, 5, 0, 0, Math.PI * 2);
                ctx.fill();

                // Open Book / Magazine
                ctx.fillStyle = '#fef08a';
                ctx.fillRect(12, 8, 10, 6);
                ctx.fillStyle = '#cbd5e1';
                ctx.fillRect(16, 8, 1, 6);

                // Ceramic Coffee Mug with Latte Art
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(33, 11, 3.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#92400e';
                ctx.beginPath();
                ctx.arc(33, 11, 2.5, 0, Math.PI * 2);
                ctx.fill();

                canvas.refresh();
            }
        }

        // =========================================================================
        // 9. FREESTANDING PROJECT SHOWCASE DISPLAY EASEL (88x66) - STANDS ON FLOOR
        // =========================================================================
        if (!textures.exists('cafe_showcase_wall_board')) {
            const canvas = textures.createCanvas('cafe_showcase_wall_board', 88, 66);
            if (canvas) {
                const ctx = canvas.getContext();

                // 1. Floor Drop Shadow (Soft ellipse directly under easel legs)
                ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
                ctx.beginPath();
                ctx.ellipse(44, 62, 38, 4, 0, 0, Math.PI * 2);
                ctx.fill();

                // 2. Rear Center Wooden Mast (Extends from top finial to near floor)
                ctx.fillStyle = '#221106';
                ctx.fillRect(42, 2, 4, 58);
                ctx.fillStyle = '#451a03';
                ctx.fillRect(43, 2, 2, 58);

                // 3. Front A-Frame Easel Legs (Angled wooden legs)
                // Left Leg
                ctx.fillStyle = '#221106';
                ctx.beginPath();
                ctx.moveTo(42, 10);
                ctx.lineTo(46, 10);
                ctx.lineTo(17, 62);
                ctx.lineTo(13, 62);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = '#5a2a0c';
                ctx.beginPath();
                ctx.moveTo(43, 10);
                ctx.lineTo(45, 10);
                ctx.lineTo(16, 61);
                ctx.lineTo(14, 61);
                ctx.closePath();
                ctx.fill();

                // Right Leg
                ctx.fillStyle = '#221106';
                ctx.beginPath();
                ctx.moveTo(42, 10);
                ctx.lineTo(46, 10);
                ctx.lineTo(75, 62);
                ctx.lineTo(71, 62);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = '#5a2a0c';
                ctx.beginPath();
                ctx.moveTo(43, 10);
                ctx.lineTo(45, 10);
                ctx.lineTo(74, 61);
                ctx.lineTo(72, 61);
                ctx.closePath();
                ctx.fill();

                // Brass Floor Feet Caps
                ctx.fillStyle = '#b45309';
                ctx.fillRect(12, 60, 6, 3);
                ctx.fillRect(70, 60, 6, 3);
                ctx.fillStyle = '#f59e0b';
                ctx.fillRect(13, 61, 4, 1);
                ctx.fillRect(71, 61, 4, 1);

                // Horizontal Wooden Cross-Brace Bar
                ctx.fillStyle = '#2d1405';
                ctx.fillRect(20, 52, 48, 4);
                ctx.fillStyle = '#4e2712';
                ctx.fillRect(20, 53, 48, 2);

                // Support Shelf Ledge (Holds the display board)
                ctx.fillStyle = '#1c0c03';
                ctx.fillRect(8, 41, 72, 5);
                ctx.fillStyle = '#652e0e';
                ctx.fillRect(9, 41, 70, 3);
                ctx.fillStyle = '#b45309';
                ctx.fillRect(15, 45, 4, 2);
                ctx.fillRect(69, 45, 4, 2);

                // 4. Mounted Display Board (Resting on easel shelf)
                // Drop shadow behind board onto easel
                ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
                ctx.fillRect(12, 7, 66, 36);

                // Dark Walnut & Brass Trim Frame
                ctx.fillStyle = '#1e0f05';
                ctx.fillRect(10, 5, 68, 36);
                ctx.fillStyle = '#4a240e';
                ctx.fillRect(12, 7, 64, 32);

                // Corner Brass Reinforcement Brackets
                ctx.fillStyle = '#f59e0b';
                ctx.fillRect(10, 5, 5, 5);
                ctx.fillRect(73, 5, 5, 5);
                ctx.fillRect(10, 36, 5, 5);
                ctx.fillRect(73, 36, 5, 5);
                ctx.fillStyle = '#fbbf24';
                ctx.fillRect(11, 6, 3, 3);
                ctx.fillRect(74, 6, 3, 3);

                // Inner Felt Slate Backing
                ctx.fillStyle = '#090d16';
                ctx.fillRect(14, 9, 60, 28);

                // Top Header Banner ("PROJECT SHOWCASE")
                ctx.fillStyle = '#1e293b';
                ctx.fillRect(18, 11, 52, 6);
                ctx.fillStyle = '#f59e0b';
                ctx.fillRect(20, 12, 48, 4);
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(22, 13, 2, 2);
                ctx.fillRect(25, 13, 10, 2);
                ctx.fillRect(37, 13, 12, 2);
                ctx.fillRect(51, 13, 14, 2);

                // 3 Pinned Showcase Project Cards
                // Card 1 (Cyan - Web Audio)
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(17, 19, 15, 15);
                ctx.fillStyle = '#0284c7';
                ctx.fillRect(18, 20, 13, 13);
                ctx.fillStyle = '#38bdf8';
                ctx.fillRect(19, 21, 11, 2);
                ctx.fillRect(20, 25, 9, 1);
                ctx.fillRect(20, 28, 6, 1);
                // Golden Thumbtack
                ctx.fillStyle = '#fbbf24';
                ctx.fillRect(24, 19, 2, 2);

                // Card 2 (Emerald - Git Visualizer)
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(36, 19, 16, 15);
                ctx.fillStyle = '#16a34a';
                ctx.fillRect(37, 20, 14, 13);
                ctx.fillStyle = '#4ade80';
                ctx.fillRect(38, 21, 12, 2);
                ctx.fillRect(39, 25, 10, 1);
                ctx.fillRect(39, 28, 8, 1);
                // Golden Thumbtack
                ctx.fillStyle = '#fbbf24';
                ctx.fillRect(44, 19, 2, 2);

                // Card 3 (Purple - Game Engine)
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(56, 19, 15, 15);
                ctx.fillStyle = '#9333ea';
                ctx.fillRect(57, 20, 13, 13);
                ctx.fillStyle = '#c084fc';
                ctx.fillRect(58, 21, 11, 2);
                ctx.fillRect(59, 25, 9, 1);
                ctx.fillRect(59, 28, 5, 1);
                // Golden Thumbtack
                ctx.fillStyle = '#fbbf24';
                ctx.fillRect(63, 19, 2, 2);

                // Top Brass Clamp securing board to mast
                ctx.fillStyle = '#d97706';
                ctx.fillRect(41, 3, 6, 5);
                ctx.fillStyle = '#fbbf24';
                ctx.fillRect(42, 4, 4, 3);

                // Shelf Accessories (Parchment scroll on ledge)
                ctx.fillStyle = '#e2e8f0';
                ctx.fillRect(22, 40, 14, 3);
                ctx.fillStyle = '#94a3b8';
                ctx.fillRect(22, 40, 2, 3);
                ctx.fillRect(34, 40, 2, 3);

                canvas.refresh();
            }
        }

        // =========================================================================
        // 10. LONG PROJECT SHOWCASE PRESENTATION TABLE (110x36)
        // =========================================================================
        if (!textures.exists('cafe_showcase_long_table')) {
            const canvas = textures.createCanvas('cafe_showcase_long_table', 110, 36);
            if (canvas) {
                const ctx = canvas.getContext();

                // Floor Shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                ctx.beginPath();
                ctx.ellipse(55, 32, 52, 4, 0, 0, Math.PI * 2);
                ctx.fill();

                // Legs
                ctx.fillStyle = '#271206';
                ctx.fillRect(8, 20, 4, 13);
                ctx.fillRect(53, 20, 4, 13);
                ctx.fillRect(98, 20, 4, 13);

                // Solid Rich Wood Tabletop
                ctx.fillStyle = '#451a03';
                ctx.fillRect(4, 6, 102, 16);
                ctx.fillStyle = '#78350f';
                ctx.fillRect(6, 7, 98, 13);
                ctx.fillStyle = '#9a3412';
                ctx.fillRect(8, 8, 94, 3);

                // Spec Sheet Left
                ctx.fillStyle = '#f8fafc';
                ctx.fillRect(14, 9, 10, 8);
                ctx.fillStyle = '#ef4444';
                ctx.fillRect(16, 10, 6, 2);

                // Open Blueprints
                ctx.fillStyle = '#0284c7';
                ctx.fillRect(32, 8, 16, 9);
                ctx.fillStyle = '#bae6fd';
                ctx.fillRect(34, 9, 12, 7);

                // Center succulent plant pot
                ctx.fillStyle = '#b45309';
                ctx.beginPath();
                ctx.arc(55, 14, 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#16a34a';
                ctx.beginPath();
                ctx.arc(55, 13, 3, 0, Math.PI * 2);
                ctx.fill();

                // Notebooks Right
                ctx.fillStyle = '#15803d';
                ctx.fillRect(72, 9, 10, 8);
                ctx.fillStyle = '#38bdf8';
                ctx.fillRect(86, 9, 8, 8);

                canvas.refresh();
            }
        }

        // =========================================================================
        // 11. DELUXE GLASS TROPHY & AWARDS CABINET (32x56)
        // =========================================================================
        if (!textures.exists('cafe_trophy_cabinet')) {
            const canvas = textures.createCanvas('cafe_trophy_cabinet', 32, 56);
            if (canvas) {
                const ctx = canvas.getContext();

                // Shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                ctx.fillRect(2, 4, 30, 52);

                // Wooden cabinet frame
                ctx.fillStyle = '#271206';
                ctx.fillRect(0, 0, 32, 54);
                ctx.fillStyle = '#4e2712';
                ctx.fillRect(2, 2, 28, 50);

                // Glass display area
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(4, 4, 24, 42);

                // Shelf 1: Golden Trophy
                ctx.fillStyle = '#fbbf24';
                ctx.beginPath();
                ctx.ellipse(16, 16, 6, 4, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillRect(14, 16, 4, 6);
                ctx.fillRect(11, 22, 10, 3);
                ctx.fillStyle = '#fef08a';
                ctx.fillRect(14, 14, 4, 3);

                // Shelf 2: Award ribbon / plaque
                ctx.fillStyle = '#38bdf8';
                ctx.fillRect(8, 30, 7, 10);
                ctx.fillStyle = '#a855f7';
                ctx.fillRect(18, 32, 6, 8);

                // Bottom drawer
                ctx.fillStyle = '#3a1b0d';
                ctx.fillRect(4, 48, 24, 4);
                ctx.fillStyle = '#fbbf24';
                ctx.fillRect(15, 49, 2, 2);

                canvas.refresh();
            }
        }

        // =========================================================================
        // 12. FREESTANDING MOBILE ROLLING WHITEBOARD (96x66) - STANDS ON FLOOR
        // =========================================================================
        if (!textures.exists('cafe_collab_whiteboard')) {
