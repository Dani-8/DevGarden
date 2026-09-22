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
            const canvas = textures.createCanvas('cafe_collab_whiteboard', 96, 66);
            if (canvas) {
                const ctx = canvas.getContext();

                // 1. Floor Drop Shadow (Soft ellipse directly under wheeled base)
                ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
                ctx.beginPath();
                ctx.ellipse(48, 62, 44, 4, 0, 0, Math.PI * 2);
                ctx.fill();

                // 2. Heavy-Duty Wheeled Tubular Stand Structure
                // Left Horizontal T-Bar Base on Floor
                ctx.fillStyle = '#1e293b';
                ctx.fillRect(8, 57, 24, 4);
                ctx.fillStyle = '#334155';
                ctx.fillRect(9, 58, 22, 2);

                // Left 2 Caster Wheels & Swivel Axles
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(9, 61, 5, 4);
                ctx.fillRect(26, 61, 5, 4);
                ctx.fillStyle = '#94a3b8';
                ctx.fillRect(10, 62, 3, 2);
                ctx.fillRect(27, 62, 3, 2);

                // Right Horizontal T-Bar Base on Floor
                ctx.fillStyle = '#1e293b';
                ctx.fillRect(64, 57, 24, 4);
                ctx.fillStyle = '#334155';
                ctx.fillRect(65, 58, 22, 2);

                // Right 2 Caster Wheels & Swivel Axles
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(65, 61, 5, 4);
                ctx.fillRect(82, 61, 5, 4);
                ctx.fillStyle = '#94a3b8';
                ctx.fillRect(66, 62, 3, 2);
                ctx.fillRect(83, 62, 3, 2);

                // Low Cross-Stabilizer Bar between the two T-bases
                ctx.fillStyle = '#1e293b';
                ctx.fillRect(20, 52, 56, 3);
                ctx.fillStyle = '#475569';
                ctx.fillRect(20, 52, 56, 1);

                // Twin Vertical Steel Tubular Uprights
                // Left Upright Post
                ctx.fillStyle = '#1e293b';
                ctx.fillRect(18, 6, 4, 52);
                ctx.fillStyle = '#64748b';
                ctx.fillRect(19, 6, 2, 52);

                // Right Upright Post
                ctx.fillStyle = '#1e293b';
                ctx.fillRect(74, 6, 4, 52);
                ctx.fillStyle = '#64748b';
                ctx.fillRect(75, 6, 2, 52);

                // Side Swivel Tilt Tightening Knobs
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(16, 24, 8, 6);
                ctx.fillRect(72, 24, 8, 6);
                ctx.fillStyle = '#3b82f6';
                ctx.fillRect(17, 26, 2, 2);
                ctx.fillRect(77, 26, 2, 2);

                // 3. Double-Sided Whiteboard Frame & Glossy Canvas
                // Drop shadow from board onto rear frame
                ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                ctx.fillRect(14, 8, 68, 38);

                // Aluminum Outer Frame Bevel
                ctx.fillStyle = '#1e293b';
                ctx.fillRect(13, 6, 70, 38);
                ctx.fillStyle = '#475569';
                ctx.fillRect(14, 7, 68, 36);
                ctx.fillStyle = '#94a3b8';
                ctx.fillRect(15, 8, 66, 1);

                // Glossy Crisp White Dry-Erase Board Surface
                ctx.fillStyle = '#f8fafc';
                ctx.fillRect(16, 9, 64, 32);

                // Subtle Glass / Board Sheen Diagonal Highlights
                ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.beginPath();
                ctx.moveTo(35, 9);
                ctx.lineTo(45, 9);
                ctx.lineTo(20, 41);
                ctx.lineTo(16, 41);
                ctx.closePath();
                ctx.fill();

                // 4. Architecture Flowchart Graphics & System Diagram
                // Node 1: API Gateway (Blue)
                ctx.fillStyle = '#2563eb';
                ctx.fillRect(19, 12, 14, 8);
                ctx.fillStyle = '#93c5fd';
                ctx.fillRect(20, 13, 12, 2);

                // Node 2: Microservice Engine (Emerald Green)
                ctx.fillStyle = '#16a34a';
                ctx.fillRect(41, 12, 14, 8);
                ctx.fillStyle = '#86efac';
                ctx.fillRect(42, 13, 12, 2);

                // Node 3: Database & Cache (Amber / Red)
                ctx.fillStyle = '#dc2626';
                ctx.fillRect(63, 12, 14, 8);
                ctx.fillStyle = '#fca5a5';
                ctx.fillRect(64, 13, 12, 2);

                // Flowchart Connecting Vectors & Arrows
                ctx.strokeStyle = '#334155';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(33, 16);
                ctx.lineTo(41, 16);
                ctx.moveTo(55, 16);
                ctx.lineTo(63, 16);
                ctx.stroke();

                // 5. Colorful Post-it / Sticky Notes Grouping
                // Yellow Sticky
                ctx.fillStyle = '#fef08a';
                ctx.fillRect(19, 23, 10, 9);
                ctx.fillStyle = '#ca8a04';
                ctx.fillRect(20, 24, 8, 1);
                ctx.fillRect(20, 26, 6, 1);

                // Pink Sticky
                ctx.fillStyle = '#fbcfe8';
                ctx.fillRect(33, 23, 10, 9);
                ctx.fillStyle = '#db2777';
                ctx.fillRect(34, 24, 8, 1);
                ctx.fillRect(34, 26, 7, 1);

                // Mint Sticky
                ctx.fillStyle = '#bbf7d0';
                ctx.fillRect(47, 23, 10, 9);
                ctx.fillStyle = '#15803d';
                ctx.fillRect(48, 24, 8, 1);
                ctx.fillRect(48, 26, 6, 1);

                // Orange Sticky
                ctx.fillStyle = '#fed7aa';
                ctx.fillRect(61, 23, 10, 9);
                ctx.fillStyle = '#c2410c';
                ctx.fillRect(62, 24, 8, 1);
                ctx.fillRect(62, 26, 8, 1);

                // 6. Full-Width Marker & Felt Eraser Tray at Bottom Edge of Board
                ctx.fillStyle = '#1e293b';
                ctx.fillRect(22, 42, 52, 4);
                ctx.fillStyle = '#475569';
                ctx.fillRect(23, 42, 50, 2);

                // Dry Erase Markers (Red, Blue, Green)
                ctx.fillStyle = '#ef4444';
                ctx.fillRect(27, 41, 6, 2);
                ctx.fillStyle = '#3b82f6';
                ctx.fillRect(36, 41, 6, 2);
                ctx.fillStyle = '#10b981';
                ctx.fillRect(45, 41, 6, 2);

                // Dark Gray Felt Eraser Block
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(56, 40, 10, 3);
                ctx.fillStyle = '#334155';
                ctx.fillRect(57, 40, 8, 1);

                canvas.refresh();
            }
        }

        // =========================================================================
        // 13. CORK BULLETIN BOARD (36x30)
        // =========================================================================
        if (!textures.exists('cafe_cork_bulletin_board')) {
            const canvas = textures.createCanvas('cafe_cork_bulletin_board', 36, 30);
            if (canvas) {
                const ctx = canvas.getContext();

                // Frame
                ctx.fillStyle = '#271206';
                ctx.fillRect(0, 0, 36, 30);
                ctx.fillStyle = '#4e2712';
                ctx.fillRect(2, 2, 32, 26);

                // Cork surface
                ctx.fillStyle = '#9a582c';
                ctx.fillRect(4, 4, 28, 22);

                // Pinned notes
                ctx.fillStyle = '#fef08a';
                ctx.fillRect(6, 6, 8, 8);
                ctx.fillStyle = '#ef4444';
                ctx.fillRect(9, 6, 2, 2);

                ctx.fillStyle = '#bae6fd';
                ctx.fillRect(18, 8, 10, 10);
                ctx.fillStyle = '#3b82f6';
                ctx.fillRect(22, 8, 2, 2);

                ctx.fillStyle = '#fed7aa';
                ctx.fillRect(8, 16, 7, 8);

                canvas.refresh();
            }
        }

        // =========================================================================
        // 14. DISCUSSION & COLLABORATION GROUP TABLE (86x42)
        // =========================================================================
        if (!textures.exists('cafe_collab_group_table')) {
            const canvas = textures.createCanvas('cafe_collab_group_table', 86, 42);
            if (canvas) {
                const ctx = canvas.getContext();

                // Floor Shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                ctx.beginPath();
                ctx.ellipse(43, 38, 40, 4, 0, 0, Math.PI * 2);
                ctx.fill();

                // Solid Oak Legs
                ctx.fillStyle = '#271206';
                ctx.fillRect(8, 24, 4, 15);
                ctx.fillRect(74, 24, 4, 15);

                // Solid Warm Oak Surface
                ctx.fillStyle = '#451a03';
                ctx.fillRect(4, 6, 78, 20);
                ctx.fillStyle = '#78350f';
                ctx.fillRect(6, 7, 74, 17);
                ctx.fillStyle = '#9a3412';
                ctx.fillRect(8, 8, 70, 3);

                // Laptops (IDE & Notes)
                ctx.fillStyle = '#1e293b';
                ctx.fillRect(12, 9, 16, 12);
                ctx.fillStyle = '#38bdf8';
                ctx.fillRect(13, 10, 14, 8);
                ctx.fillStyle = '#475569';
                ctx.fillRect(11, 18, 18, 3);

                // Center Blueprint & Coffee Cup
                ctx.fillStyle = '#1e3a8a';
                ctx.fillRect(36, 10, 14, 10);
                ctx.fillStyle = '#60a5fa';
                ctx.strokeRect(37, 11, 12, 8);

                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(33, 16, 2.5, 0, Math.PI * 2);
                ctx.fill();

                // Right Laptop / Notebook
                ctx.fillStyle = '#1e293b';
                ctx.fillRect(58, 9, 16, 12);
                ctx.fillStyle = '#4ade80';
                ctx.fillRect(59, 10, 14, 8);

                canvas.refresh();
            }
        }

        // =========================================================================
        // 15. SIDE TABLE WITH COZY LAMP (24x28)
        // =========================================================================
        if (!textures.exists('cafe_lounge_side_table')) {
            const canvas = textures.createCanvas('cafe_lounge_side_table', 24, 28);
            if (canvas) {
                const ctx = canvas.getContext();

                // Floor Shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                ctx.beginPath();
                ctx.ellipse(12, 25, 10, 3, 0, 0, Math.PI * 2);
                ctx.fill();

                // Table Legs & Top
                ctx.fillStyle = '#271206';
                ctx.fillRect(4, 14, 2, 11);
                ctx.fillRect(18, 14, 2, 11);
                ctx.fillStyle = '#4e2712';
                ctx.fillRect(2, 10, 20, 5);

                // Cozy Table Lamp
                ctx.fillStyle = '#1c1917';
                ctx.fillRect(11, 5, 2, 6);
                ctx.fillStyle = '#fef08a';
                ctx.beginPath();
                ctx.moveTo(7, 6);
                ctx.lineTo(17, 6);
                ctx.lineTo(19, 1);
                ctx.lineTo(5, 1);
                ctx.closePath();
                ctx.fill();

                canvas.refresh();
            }
        }

        // =========================================================================
        // 16. WARM WALL LANTERN SCONCE (16x16)
        // =========================================================================
        if (!textures.exists('cafe_wing_wall_lantern')) {
            const canvas = textures.createCanvas('cafe_wing_wall_lantern', 16, 16);
            if (canvas) {
                const ctx = canvas.getContext();

                // Dark iron bracket
                ctx.fillStyle = '#1c1917';
                ctx.fillRect(7, 3, 2, 10);
                ctx.fillRect(5, 4, 6, 2);
                ctx.fillRect(4, 11, 8, 2);

                // Warm Glowing Amber Lantern Glass
                ctx.fillStyle = '#f59e0b';
                ctx.fillRect(5, 6, 6, 5);
                ctx.fillStyle = '#fef08a';
                ctx.fillRect(6, 7, 4, 3);
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(7, 7, 2, 2);

                canvas.refresh();
            }
        }

        // =========================================================================
        // 17. SPHERICAL LUXURY POTTED PLANT POT (32x56)
        // =========================================================================
        if (!textures.exists('cafe_luxury_plant_pot')) {
            const canvas = textures.createCanvas('cafe_luxury_plant_pot', 32, 56);
            if (canvas) {
                const ctx = canvas.getContext();

                // Floor Shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                ctx.beginPath();
                ctx.ellipse(16, 52, 12, 3, 0, 0, Math.PI * 2);
                ctx.fill();

                // Terracotta Pot Base
                ctx.fillStyle = '#9a3412';
                ctx.beginPath();
                ctx.moveTo(8, 36);
                ctx.lineTo(24, 36);
                ctx.lineTo(21, 52);
                ctx.lineTo(11, 52);
                ctx.closePath();
                ctx.fill();

                // Pot Rim
                ctx.fillStyle = '#c2410c';
                ctx.fillRect(6, 33, 20, 4);

                // White accent pot band
                ctx.fillStyle = '#f8fafc';
                ctx.fillRect(9, 41, 14, 3);

                // Trunk / Stem
                ctx.fillStyle = '#451a03';
                ctx.fillRect(15, 20, 2, 14);

                // Lush Spherical Foliage (Topiary sphere)
                ctx.fillStyle = '#14532d';
                ctx.beginPath();
                ctx.arc(16, 16, 12, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#16a34a';
                ctx.beginPath();
                ctx.arc(15, 14, 10, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#4ade80';
                ctx.beginPath();
                ctx.arc(13, 12, 5, 0, Math.PI * 2);
                ctx.fill();

                canvas.refresh();
            }
        }

        // =========================================================================
        // 18. LO-FI BOHEMIAN GEOMETRIC AREA RUG (220x120)
        // =========================================================================
        if (!textures.exists('cafe_lofi_boho_rug')) {
            const canvas = textures.createCanvas('cafe_lofi_boho_rug', 220, 120);
            if (canvas) {
                const ctx = canvas.getContext();

                // Floor Shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
                ctx.fillRect(4, 4, 212, 112);

                // Fringes on Left and Right ends
                ctx.fillStyle = '#e7dfd5';
                for (let y = 8; y < 112; y += 4) {
                    ctx.fillRect(0, y, 4, 2);
                    ctx.fillRect(216, y, 4, 2);
                }

                // Cream woven base field
                ctx.fillStyle = '#f8f5ee';
                ctx.fillRect(4, 4, 212, 112);

                // Outer terracotta border
                ctx.fillStyle = '#9a3412';
                ctx.fillRect(8, 8, 204, 3);
                ctx.fillRect(8, 109, 204, 3);
                ctx.fillRect(8, 8, 3, 104);
                ctx.fillRect(209, 8, 3, 104);

                // Inner sage charcoal accent stripe
                ctx.fillStyle = '#292524';
                ctx.fillRect(14, 14, 192, 2);
                ctx.fillRect(14, 104, 192, 2);
                ctx.fillRect(14, 14, 2, 92);
                ctx.fillRect(204, 14, 2, 92);

                // Diamond Aztec Motifs across center
                const drawDiamond = (cx: number, cy: number, size: number, color: string) => {
                    ctx.fillStyle = color;
                    ctx.beginPath();
                    ctx.moveTo(cx, cy - size);
                    ctx.lineTo(cx + size, cy);
                    ctx.lineTo(cx, cy + size);
                    ctx.lineTo(cx - size, cy);
                    ctx.closePath();
                    ctx.fill();
                };

                const centers = [40, 78, 110, 142, 180];
                centers.forEach((cx) => {
                    drawDiamond(cx, 60, 22, '#ea580c');
                    drawDiamond(cx, 60, 16, '#f8f5ee');
                    drawDiamond(cx, 60, 11, '#0f766e');
                    drawDiamond(cx, 60, 5, '#f59e0b');
                });

                // Soft woven horizontal weave lines
                ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
                for (let y = 18; y < 100; y += 3) {
                    ctx.fillRect(16, y, 188, 1);
                }

                canvas.refresh();
            }
        }

        // =========================================================================
        // 19. RETRO VINYL TURNTABLE & STEREO CREDENZA (92x48)
        // =========================================================================
        if (!textures.exists('cafe_vinyl_turntable_station')) {
            const canvas = textures.createCanvas('cafe_vinyl_turntable_station', 92, 48);
            if (canvas) {
                const ctx = canvas.getContext();

                // Floor Shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                ctx.beginPath();
                ctx.ellipse(46, 44, 42, 4, 0, 0, Math.PI * 2);
                ctx.fill();

                // Tapered Mid-Century Wooden Peg Legs with Brass Tips
                ctx.fillStyle = '#271206';
                ctx.fillRect(10, 36, 4, 9);
                ctx.fillRect(78, 36, 4, 9);
                ctx.fillRect(32, 36, 3, 9);
                ctx.fillRect(57, 36, 3, 9);
                ctx.fillStyle = '#f59e0b';
                ctx.fillRect(10, 42, 4, 3);
                ctx.fillRect(78, 42, 4, 3);

                // Teak Credenza Body
                ctx.fillStyle = '#361502';
                ctx.fillRect(4, 14, 84, 24);
                ctx.fillStyle = '#5c2406';
                ctx.fillRect(5, 15, 82, 22);

                // Credenza Top Surface Lip
                ctx.fillStyle = '#78350f';
                ctx.fillRect(3, 12, 86, 3);
                ctx.fillStyle = '#9a3412';
                ctx.fillRect(4, 12, 84, 1);

                // Lower Shelves with Stored Vinyl Record Spines
                ctx.fillStyle = '#1c0c04';
                ctx.fillRect(8, 22, 76, 13);

                // Shelf Dividers
                ctx.fillStyle = '#5c2406';
                ctx.fillRect(32, 22, 2, 13);
                ctx.fillRect(58, 22, 2, 13);

                // Vinyl Album Spines (Colorful vertical slices)
                const spineColors = [
                    '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f97316',
                    '#e2e8f0', '#06b6d4', '#84cc16', '#a855f7', '#f43f5e', '#fbbf24', '#64748b'
                ];
                let px = 10;
                for (let i = 0; px < 30; i++) {
                    ctx.fillStyle = spineColors[i % spineColors.length];
                    ctx.fillRect(px, 23, 2, 11);
                    px += 2;
                }

                px = 35;
                for (let i = 4; px < 56; i++) {
                    ctx.fillStyle = spineColors[i % spineColors.length];
                    ctx.fillRect(px, 23, 2, 11);
                    px += 2;
                }

                px = 61;
                for (let i = 8; px < 82; i++) {
                    ctx.fillStyle = spineColors[i % spineColors.length];
                    ctx.fillRect(px, 23, 2, 11);
                    px += 2;
                }

                // --- TOP DECK EQUIPMENT ---
                // Left Studio Monitor Speaker
                ctx.fillStyle = '#1c1917';
                ctx.fillRect(6, 2, 12, 11);
                ctx.fillStyle = '#292524';
                ctx.fillRect(7, 3, 10, 9);
                ctx.fillStyle = '#d97706';
                ctx.beginPath();
                ctx.arc(12, 7, 3, 0, Math.PI * 2);
                ctx.fill();

                // Right Studio Monitor Speaker
                ctx.fillStyle = '#1c1917';
                ctx.fillRect(74, 2, 12, 11);
                ctx.fillStyle = '#292524';
                ctx.fillRect(75, 3, 10, 9);
                ctx.fillStyle = '#d97706';
                ctx.beginPath();
                ctx.arc(80, 7, 3, 0, Math.PI * 2);
                ctx.fill();

                // Center-Left Turntable (Player)
                ctx.fillStyle = '#1e293b';
                ctx.fillRect(22, 3, 24, 10);
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(23, 4, 22, 8);

                // Spinning Vinyl Platter (Black disc with red label)
                ctx.fillStyle = '#020617';
                ctx.beginPath();
                ctx.ellipse(33, 8, 7, 3.5, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#ef4444';
                ctx.beginPath();
                ctx.ellipse(33, 8, 2.5, 1.2, 0, 0, Math.PI * 2);
                ctx.fill();

                // Silver Tonearm
                ctx.strokeStyle = '#cbd5e1';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(42, 5);
                ctx.lineTo(39, 7);
                ctx.lineTo(36, 8);
                ctx.stroke();

                // Center-Right Vintage Receiver with Warm Amber Dials
                ctx.fillStyle = '#27272a';
                ctx.fillRect(50, 4, 20, 9);
                ctx.fillStyle = '#18181b';
                ctx.fillRect(51, 5, 18, 7);

                // Glowing Amber Frequency Display
                ctx.fillStyle = '#f59e0b';
                ctx.fillRect(53, 6, 9, 3);
                ctx.fillStyle = '#fbbf24';
                ctx.fillRect(57, 6, 1, 3); // needle

                // Dials
                ctx.fillStyle = '#a1a1aa';
                ctx.beginPath();
                ctx.arc(65, 8, 1.5, 0, Math.PI * 2);
                ctx.fill();

                canvas.refresh();
            }
        }


        // =========================================================================
        // 20. FRAMED RETRO ALBUM ART POSTERS (22x22 each)
        // =========================================================================
        if (!textures.exists('cafe_vinyl_wall_art_1')) {
            const canvas = textures.createCanvas('cafe_vinyl_wall_art_1', 22, 22);
            if (canvas) {
                const ctx = canvas.getContext();

                // Black Gallery Frame
                ctx.fillStyle = '#18181b';
                ctx.fillRect(0, 0, 22, 22);
                ctx.fillStyle = '#f8fafc';
                ctx.fillRect(2, 2, 18, 18);

                // Warm Sunset / Retro Wave Art
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(3, 3, 16, 16);
                ctx.fillStyle = '#f97316';
                ctx.beginPath();
                ctx.arc(11, 10, 5, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#06b6d4';
                ctx.fillRect(3, 12, 16, 7);
                ctx.fillStyle = '#e0e7ff';
                ctx.fillRect(4, 13, 14, 1);

                canvas.refresh();
            }
        }

        if (!textures.exists('cafe_vinyl_wall_art_2')) {
            const canvas = textures.createCanvas('cafe_vinyl_wall_art_2', 22, 22);
            if (canvas) {
                const ctx = canvas.getContext();

                // Teak Wooden Frame
                ctx.fillStyle = '#451a03';
                ctx.fillRect(0, 0, 22, 22);
                ctx.fillStyle = '#fdf4ff';
                ctx.fillRect(2, 2, 18, 18);

                // Minimalist Geometric Plant Art
                ctx.fillStyle = '#f5f5f4';
                ctx.fillRect(3, 3, 16, 16);

                ctx.fillStyle = '#d97706';
                ctx.beginPath();
                ctx.arc(11, 7, 3.5, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#15803d';
                ctx.beginPath();
                ctx.ellipse(11, 14, 4, 2, -Math.PI / 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.ellipse(11, 11, 4, 2, Math.PI / 4, 0, Math.PI * 2);
                ctx.fill();

                canvas.refresh();
            }
        }

        // =========================================================================
        // 21. CURVED / L-SHAPED PLUSH SECTIONAL SOFA (118x56)
        // =========================================================================
        if (!textures.exists('cafe_lofi_l_sectional')) {
            const canvas = textures.createCanvas('cafe_lofi_l_sectional', 118, 56);
            if (canvas) {
                const ctx = canvas.getContext();

                // Floor Shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.32)';
                ctx.beginPath();
                ctx.ellipse(59, 50, 56, 5, 0, 0, Math.PI * 2);
                ctx.fill();

                // Peg Legs
                ctx.fillStyle = '#271206';
                ctx.fillRect(8, 46, 4, 7);
                ctx.fillRect(106, 46, 4, 7);
                ctx.fillRect(56, 46, 4, 7);
                ctx.fillRect(8, 26, 4, 7);

                // Wooden Base Rim
                ctx.fillStyle = '#451a03';
                ctx.fillRect(6, 40, 106, 6);
                ctx.fillRect(6, 20, 26, 26);

                // Main Sofa Backrest (Sage / Forest Chenille)
                ctx.fillStyle = '#1b3b27';
                ctx.fillRect(6, 6, 106, 18);
                ctx.fillStyle = '#275237';
                ctx.fillRect(8, 8, 102, 14);

                // Tufted Backrest Dimples
                ctx.fillStyle = '#163121';
                for (let x = 18; x < 105; x += 14) {
                    ctx.fillRect(x, 14, 2, 2);
                }

                // Left Chaise Backrest (extending vertically down on left)
                ctx.fillStyle = '#1b3b27';
                ctx.fillRect(6, 6, 12, 40);
                ctx.fillStyle = '#275237';
                ctx.fillRect(8, 8, 8, 36);

                // Main Seat Cushions (Horizontal seats)
                ctx.fillStyle = '#2d5f40';
                ctx.fillRect(18, 22, 92, 18);
                ctx.fillStyle = '#37754f';
                ctx.fillRect(20, 24, 88, 14);

                // Cushion division seams
                ctx.fillStyle = '#1b3b27';
                ctx.fillRect(48, 22, 2, 18);
                ctx.fillRect(78, 22, 2, 18);

                // Left Chaise Return Seat Cushion
                ctx.fillStyle = '#2d5f40';
                ctx.fillRect(18, 22, 22, 24);
                ctx.fillStyle = '#37754f';
                ctx.fillRect(19, 24, 20, 20);

                // Right Armrest
                ctx.fillStyle = '#1b3b27';
                ctx.fillRect(108, 14, 8, 28);
                ctx.fillStyle = '#275237';
                ctx.fillRect(109, 16, 6, 24);

                // --- ACCENT THROW PILLOWS ---
                // Warm Mustard Velvet Pillow (Left Corner)
                ctx.fillStyle = '#b45309';
                ctx.fillRect(18, 14, 12, 12);
                ctx.fillStyle = '#f59e0b';
                ctx.fillRect(20, 16, 8, 8);

                // Terracotta Rust Pillow (Center)
                ctx.fillStyle = '#9a3412';
                ctx.fillRect(52, 13, 11, 11);
                ctx.fillStyle = '#ea580c';
                ctx.fillRect(54, 15, 7, 7);

                // Cream Woven Boho Pillow (Right)
                ctx.fillStyle = '#78716c';
                ctx.fillRect(94, 14, 12, 12);
                ctx.fillStyle = '#f5f5f4';
                ctx.fillRect(96, 16, 8, 8);
                ctx.fillStyle = '#d97706';
                ctx.fillRect(99, 19, 2, 2);

                // Soft Chenille Blanket Draped on Chaise
                ctx.fillStyle = '#e7e5e4';
                ctx.fillRect(22, 34, 14, 14);
                ctx.fillStyle = '#d6d3d1';
                ctx.fillRect(23, 36, 12, 2);
                ctx.fillRect(23, 40, 12, 2);
                // Fringe
                ctx.fillStyle = '#a8a29e';
                for (let fx = 23; fx < 35; fx += 2) {
                    ctx.fillRect(fx, 48, 1, 3);
                }

                canvas.refresh();
            }
        }

        // =========================================================================
        // 22. RUSTIC LIVE-EDGE COFFEE TABLE WITH BOARD GAME & COFFEE (70x36)
        // =========================================================================
        if (!textures.exists('cafe_lofi_coffee_table')) {
            const canvas = textures.createCanvas('cafe_lofi_coffee_table', 70, 36);
            if (canvas) {
                const ctx = canvas.getContext();

                // Floor Shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                ctx.beginPath();
                ctx.ellipse(35, 31, 31, 4, 0, 0, Math.PI * 2);
                ctx.fill();

                // Hairpin Iron Legs
                ctx.strokeStyle = '#18181b';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(10, 18);
                ctx.lineTo(8, 30);
                ctx.moveTo(60, 18);
                ctx.lineTo(62, 30);
                ctx.stroke();

                // Warm Teak Tabletop
                ctx.fillStyle = '#451a03';
                ctx.beginPath();
                ctx.ellipse(35, 16, 31, 12, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#78350f';
                ctx.beginPath();
                ctx.ellipse(35, 15, 29, 10.5, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#9a3412';
                ctx.beginPath();
                ctx.ellipse(35, 14, 25, 8, 0, 0, Math.PI * 2);
                ctx.fill();

                // Live edge wood grain rings
                ctx.strokeStyle = '#b45309';
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.ellipse(35, 14, 21, 6, 0, 0, Math.PI * 2);
                ctx.stroke();

                // --- ITEMS ON TABLE ---
                // Wooden Board Game (Mini Chessboard Grid)
                ctx.fillStyle = '#fef3c7';
                ctx.fillRect(16, 9, 14, 11);
                ctx.fillStyle = '#78350f';
                for (let row = 0; row < 3; row++) {
                    for (let col = 0; col < 4; col++) {
                        if ((row + col) % 2 === 0) {
                            ctx.fillRect(16 + col * 3.5, 9 + row * 3.5, 3.5, 3.5);
                        }
                    }
                }
                ctx.strokeStyle = '#451a03';
                ctx.lineWidth = 1;
                ctx.strokeRect(16, 9, 14, 11);

                // Ceramic Coffee Mug 1 (Speckled Oat with Latte Foam)
                ctx.fillStyle = '#f5f5f4';
                ctx.beginPath();
                ctx.arc(38, 12, 3.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#78350f';
                ctx.beginPath();
                ctx.arc(38, 12, 2.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#fef08a';
                ctx.fillRect(37, 11, 2, 2); // Latte heart

                // Ceramic Coffee Mug 2 (Sage Green)
                ctx.fillStyle = '#166534';
                ctx.beginPath();
                ctx.arc(47, 17, 3, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#451a03';
                ctx.beginPath();
                ctx.arc(47, 17, 2, 0, Math.PI * 2);
                ctx.fill();

                // Vinyl Album Cover resting on table edge
                ctx.fillStyle = '#0284c7';
                ctx.fillRect(48, 8, 12, 10);
                ctx.fillStyle = '#fde047';
                ctx.beginPath();
                ctx.arc(54, 13, 3, 0, Math.PI * 2);
                ctx.fill();

                canvas.refresh();
            }
        }

        // =========================================================================
        // 23. WOVEN ROUND FLOOR POUF / OTTOMAN (26x22)
        // =========================================================================
        if (!textures.exists('cafe_lofi_floor_pouf')) {
            const canvas = textures.createCanvas('cafe_lofi_floor_pouf', 26, 22);
            if (canvas) {
                const ctx = canvas.getContext();

                // Floor Shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
                ctx.beginPath();
                ctx.ellipse(13, 19, 11, 3, 0, 0, Math.PI * 2);
                ctx.fill();

                // Woven Knit Rust/Terracotta Body
                ctx.fillStyle = '#7c2d12';
                ctx.beginPath();
                ctx.ellipse(13, 12, 11, 7, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#c2410c';
                ctx.beginPath();
                ctx.ellipse(13, 10, 10, 6, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#ea580c';
                ctx.beginPath();
                ctx.ellipse(13, 9, 8, 4.5, 0, 0, Math.PI * 2);
                ctx.fill();

                // Radial knit ribs
                ctx.strokeStyle = '#9a3412';
                ctx.lineWidth = 0.8;
                for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
                    ctx.beginPath();
                    ctx.moveTo(13, 9);
                    ctx.lineTo(13 + Math.cos(a) * 8, 9 + Math.sin(a) * 4.5);
                    ctx.stroke();
                }

                // Center button tuft
                ctx.fillStyle = '#431407';
                ctx.beginPath();
                ctx.arc(13, 9, 1.5, 0, Math.PI * 2);
                ctx.fill();

                canvas.refresh();
            }
        }

        // =========================================================================
        // 24. TALL INDOOR FIDDLE-LEAF FIG TREE IN CERAMIC PLANTER (36x68)
        // =========================================================================
        if (!textures.exists('cafe_lofi_fiddle_leaf_tree')) {
            const canvas = textures.createCanvas('cafe_lofi_fiddle_leaf_tree', 36, 68);
            if (canvas) {
                const ctx = canvas.getContext();

                // Floor Shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                ctx.beginPath();
                ctx.ellipse(18, 65, 14, 3, 0, 0, Math.PI * 2);
                ctx.fill();

                // Brass Tripod Stand
                ctx.strokeStyle = '#b45309';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(10, 52);
                ctx.lineTo(7, 65);
                ctx.moveTo(26, 52);
                ctx.lineTo(29, 65);
                ctx.moveTo(18, 52);
                ctx.lineTo(18, 66);
                ctx.stroke();

                // White Fluted Ceramic Pot
                ctx.fillStyle = '#e2e8f0';
                ctx.beginPath();
                ctx.moveTo(10, 42);
                ctx.lineTo(26, 42);
                ctx.lineTo(24, 56);
                ctx.lineTo(12, 56);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = '#f8fafc';
                ctx.fillRect(9, 40, 18, 3);

                // Fluted vertical grooves
                ctx.strokeStyle = '#cbd5e1';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(14, 43);
                ctx.lineTo(14, 55);
                ctx.moveTo(18, 43);
                ctx.lineTo(18, 55);
                ctx.moveTo(22, 43);
                ctx.lineTo(22, 55);
                ctx.stroke();

                // Soil
                ctx.fillStyle = '#271206';
                ctx.fillRect(11, 41, 14, 2);

                // Natural Woody Trunk
                ctx.fillStyle = '#5c2d13';
                ctx.fillRect(17, 24, 3, 18);
                ctx.fillRect(18, 12, 2, 14);

                // Large Sculptural Fiddle Leaves
                const drawLeaf = (cx: number, cy: number, rx: number, ry: number, angle: number) => {
                    ctx.save();
                    ctx.translate(cx, cy);
                    ctx.rotate(angle);

                    // Leaf body
                    ctx.fillStyle = '#064e3b';
                    ctx.beginPath();
                    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.fillStyle = '#047857';
                    ctx.beginPath();
                    ctx.ellipse(0, -1, rx - 1.5, ry - 1.5, 0, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.fillStyle = '#10b981';
                    ctx.beginPath();
                    ctx.ellipse(0, -2, rx - 3, ry - 3, 0, 0, Math.PI * 2);
                    ctx.fill();

                    // Main leaf vein
                    ctx.strokeStyle = '#6ee7b7';
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(0, ry - 2);
                    ctx.lineTo(0, -ry + 2);
                    ctx.stroke();

                    ctx.restore();
                };

                drawLeaf(9, 36, 8, 5, -0.4);
                drawLeaf(27, 34, 8, 5, 0.4);
                drawLeaf(8, 24, 9, 6, -0.6);
                drawLeaf(28, 22, 9, 6, 0.5);
                drawLeaf(11, 14, 8, 5, -0.3);
                drawLeaf(25, 12, 8, 5, 0.3);
                drawLeaf(18, 6, 7, 5, 0);

                canvas.refresh();
            }
        }

        // =========================================================================
        // 25. VINTAGE CURVED ARC FLOOR READING LAMP (28x64)
        // =========================================================================
        if (!textures.exists('cafe_lofi_arc_lamp')) {
            const canvas = textures.createCanvas('cafe_lofi_arc_lamp', 28, 64);
            if (canvas) {
                const ctx = canvas.getContext();

                // Floor Shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                ctx.beginPath();
                ctx.ellipse(8, 61, 7, 2.5, 0, 0, Math.PI * 2);
                ctx.fill();

                // Brass Base Plate
                ctx.fillStyle = '#78350f';
                ctx.fillRect(4, 58, 8, 3);
                ctx.fillStyle = '#f59e0b';
                ctx.fillRect(5, 57, 6, 2);

                // Curved Brass Arc Stem
                ctx.strokeStyle = '#b45309';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(8, 57);
                ctx.lineTo(8, 30);
                ctx.quadraticCurveTo(8, 8, 22, 8);
                ctx.lineTo(22, 14);
                ctx.stroke();

                ctx.strokeStyle = '#fbbf24';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(8, 57);
                ctx.lineTo(8, 30);
                ctx.quadraticCurveTo(8, 9, 22, 9);
                ctx.stroke();

                // Warm Bell Shade
                ctx.fillStyle = '#78350f';
                ctx.beginPath();
                ctx.moveTo(17, 14);
                ctx.lineTo(27, 14);
                ctx.lineTo(28, 20);
                ctx.lineTo(16, 20);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = '#fef08a';
                ctx.fillRect(17, 15, 10, 5);

                // Warm Light Glow Aura
                ctx.fillStyle = 'rgba(254, 240, 138, 0.25)';
                ctx.beginPath();
                ctx.moveTo(22, 20);
                ctx.lineTo(12, 34);
                ctx.lineTo(32, 34);
                ctx.closePath();
                ctx.fill();

                canvas.refresh();
            }
        }

        // =========================================================================
        // 26. ACOUSTIC GUITAR ON FLOOR STAND WITH MUSIC BASKET (26x44)
        // =========================================================================
        if (!textures.exists('cafe_lofi_guitar_stand')) {
            const canvas = textures.createCanvas('cafe_lofi_guitar_stand', 26, 44);
            if (canvas) {
                const ctx = canvas.getContext();

                // Floor Shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                ctx.beginPath();
                ctx.ellipse(13, 41, 11, 3, 0, 0, Math.PI * 2);
                ctx.fill();

                // Tripod Stand
                ctx.strokeStyle = '#27272a';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(6, 42);
                ctx.lineTo(12, 26);
                ctx.lineTo(18, 42);
                ctx.stroke();

                // Guitar Lower Bout
                ctx.fillStyle = '#5c2d13';
                ctx.beginPath();
                ctx.ellipse(12, 28, 7, 8, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#ca8a04';
                ctx.beginPath();
                ctx.ellipse(12, 28, 6, 7, 0, 0, Math.PI * 2);
                ctx.fill();

                // Guitar Upper Bout
                ctx.fillStyle = '#5c2d13';
                ctx.beginPath();
                ctx.ellipse(12, 18, 5, 5, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#ca8a04';
                ctx.beginPath();
                ctx.ellipse(12, 18, 4, 4, 0, 0, Math.PI * 2);
                ctx.fill();

                // Soundhole
                ctx.fillStyle = '#271206';
                ctx.beginPath();
                ctx.arc(12, 22, 2, 0, Math.PI * 2);
                ctx.fill();

                // Bridge
                ctx.fillStyle = '#1c0c04';
                ctx.fillRect(10, 30, 4, 1.5);

                // Fretboard & Neck
                ctx.fillStyle = '#271206';
                ctx.fillRect(11, 4, 2, 14);

                // Headstock with Tuning Pegs
                ctx.fillStyle = '#5c2d13';
                ctx.fillRect(10, 1, 4, 4);
                ctx.fillStyle = '#fef08a';
                ctx.fillRect(9, 2, 1, 1);
                ctx.fillRect(9, 4, 1, 1);
                ctx.fillRect(14, 2, 1, 1);
                ctx.fillRect(14, 4, 1, 1);

                // Canvas Basket with Sheet Music on Right Side
                ctx.fillStyle = '#78350f';
                ctx.fillRect(18, 30, 7, 10);
                ctx.fillStyle = '#a16207';
                ctx.fillRect(19, 31, 5, 8);
                ctx.fillStyle = '#fef3c7';
                ctx.fillRect(20, 26, 2, 8);
                ctx.fillRect(22, 28, 2, 6);

                canvas.refresh();
            }
        }

        // =========================================================================
        // 27. RICH WINE-BURGUNDY & AMBER PERSIAN RUG (180x112)
        // =========================================================================
        if (!textures.exists('cafe_lounge_persian_carpet')) {
            const canvas = textures.createCanvas('cafe_lounge_persian_carpet', 180, 112);
            if (canvas) {
                const ctx = canvas.getContext();

                // Floor Shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                ctx.fillRect(4, 4, 172, 104);

                // Fringes on Left and Right ends
                ctx.fillStyle = '#d6cbbe';
                for (let y = 8; y < 104; y += 4) {
                    ctx.fillRect(0, y, 4, 2);
                    ctx.fillRect(176, y, 4, 2);
                }

                // Deep Navy Outer Border
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(4, 4, 172, 104);

                // Golden Ochre Accent Band
                ctx.fillStyle = '#b45309';
                ctx.fillRect(8, 8, 164, 96);

                // Dark Walnut Divider Trim
                ctx.fillStyle = '#271206';
                ctx.fillRect(12, 12, 156, 88);

                // Deep Rich Wine / Burgundy Field
                ctx.fillStyle = '#581c1c';
                ctx.fillRect(14, 14, 152, 84);
                ctx.fillStyle = '#6b2020';
                ctx.fillRect(16, 16, 148, 80);

                // Woven textile cross-grain
                for (let y = 18; y < 94; y += 4) {
                    ctx.fillStyle = (Math.floor(y / 4) % 2 === 0) ? '#742323' : '#5f1e1e';
                    ctx.fillRect(18, y, 144, 2);
                }

                // Center Medallion (Classic Persian Diamond & Floral Core)
                const drawMedallion = (cx: number, cy: number, rx: number, ry: number, color: string) => {
                    ctx.fillStyle = color;
                    ctx.beginPath();
                    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
                    ctx.fill();
                };

                // Outer medallion navy & gold
                drawMedallion(90, 56, 32, 20, '#0f172a');
                drawMedallion(90, 56, 28, 17, '#b45309');
                drawMedallion(90, 56, 22, 13, '#7f1d1d');
                drawMedallion(90, 56, 16, 9, '#f59e0b');
                drawMedallion(90, 56, 9, 5, '#1e3a8a');
                drawMedallion(90, 56, 4, 2.5, '#fef08a');

                // Corner Medallion Ornaments
                const drawCorner = (cx: number, cy: number) => {
                    ctx.fillStyle = '#b45309';
                    ctx.beginPath();
                    ctx.arc(cx, cy, 12, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = '#0f172a';
                    ctx.beginPath();
                    ctx.arc(cx, cy, 8, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = '#f59e0b';
                    ctx.beginPath();
                    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
                    ctx.fill();
                };

                drawCorner(28, 28);
                drawCorner(152, 28);
                drawCorner(28, 84);
                drawCorner(152, 84);

                canvas.refresh();
            }
        }

        // =========================================================================
        // 28. PERFECTLY PROPORTIONED COGNAC LEATHER LOUNGE SOFA (76x36)
        // =========================================================================
        if (!textures.exists('cafe_lounge_proportional_sofa')) {
            const canvas = textures.createCanvas('cafe_lounge_proportional_sofa', 76, 36);
            if (canvas) {
                const ctx = canvas.getContext();

                // Floor Shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.32)';
                ctx.beginPath();
                ctx.ellipse(38, 33, 35, 3.5, 0, 0, Math.PI * 2);
                ctx.fill();

                // Tapered Walnut Peg Legs
                ctx.fillStyle = '#271206';
                ctx.fillRect(8, 28, 3, 6);
                ctx.fillRect(65, 28, 3, 6);
                ctx.fillRect(36, 28, 3, 6);

                // Solid Walnut Base Rim
                ctx.fillStyle = '#361502';
                ctx.fillRect(4, 24, 68, 5);

                // Tufted Backrest (Cognac / Saddle Leather)
                ctx.fillStyle = '#5c2406';
                ctx.fillRect(5, 5, 66, 14);
                ctx.fillStyle = '#78350f';
                ctx.fillRect(6, 6, 64, 11);
                ctx.fillStyle = '#9a3412';
                ctx.fillRect(7, 7, 62, 3); // top highlight

                // Button tufting on backrest
                ctx.fillStyle = '#361502';
                for (let x = 16; x < 65; x += 11) {
                    ctx.fillRect(x, 11, 2, 2);
                }

                // Twin Plush Seat Cushions
                // Left Cushion
                ctx.fillStyle = '#78350f';
                ctx.fillRect(7, 16, 30, 11);
                ctx.fillStyle = '#9a3412';
                ctx.fillRect(8, 17, 28, 8);
                ctx.fillStyle = '#b45309';
                ctx.fillRect(9, 17, 26, 2);

                // Right Cushion
                ctx.fillStyle = '#78350f';
                ctx.fillRect(39, 16, 30, 11);
                ctx.fillStyle = '#9a3412';
                ctx.fillRect(40, 17, 28, 8);
                ctx.fillStyle = '#b45309';
                ctx.fillRect(41, 17, 26, 2);

                // Center Seam
                ctx.fillStyle = '#361502';
                ctx.fillRect(37, 16, 2, 11);

                // Padded Armrests
                ctx.fillStyle = '#5c2406';
                ctx.fillRect(3, 8, 5, 18);
                ctx.fillRect(68, 8, 5, 18);
                ctx.fillStyle = '#78350f';
                ctx.fillRect(4, 9, 3, 16);
                ctx.fillRect(69, 9, 3, 16);

                // Left Throw Pillow (Deep Forest Emerald Velvet)
                ctx.fillStyle = '#064e3b';
                ctx.fillRect(9, 11, 9, 9);
                ctx.fillStyle = '#047857';
                ctx.fillRect(10, 12, 6, 6);

                // Right Throw Pillow (Cream Gold Wool)
                ctx.fillStyle = '#b45309';
                ctx.fillRect(58, 11, 9, 9);
                ctx.fillStyle = '#fde68a';
                ctx.fillRect(59, 12, 6, 6);

                canvas.refresh();
            }
        }

        // =========================================================================
        // 29. PERFECTLY PROPORTIONED WALNUT COFFEE TABLE (52x26)
        // =========================================================================
        if (!textures.exists('cafe_lounge_proportional_table')) {
            const canvas = textures.createCanvas('cafe_lounge_proportional_table', 52, 26);
            if (canvas) {
                const ctx = canvas.getContext();

                // Floor Shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                ctx.beginPath();
                ctx.ellipse(26, 23, 23, 3, 0, 0, Math.PI * 2);
                ctx.fill();

                // Hairpin Iron Legs
                ctx.fillStyle = '#1c1917';
                ctx.fillRect(8, 14, 2, 9);
                ctx.fillRect(42, 14, 2, 9);

                // Solid Walnut Oval Tabletop
                ctx.fillStyle = '#361502';
                ctx.beginPath();
                ctx.ellipse(26, 12, 24, 9, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#5c2406';
                ctx.beginPath();
                ctx.ellipse(26, 11, 23, 8, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#78350f';
                ctx.beginPath();
                ctx.ellipse(26, 10, 20, 6, 0, 0, Math.PI * 2);
                ctx.fill();

                // Open Paperback Book
                ctx.fillStyle = '#fef3c7';
                ctx.fillRect(14, 7, 10, 6);
                ctx.fillStyle = '#94a3b8';
                ctx.fillRect(18, 7, 1, 6);

                // Ceramic Coffee Mug with Latte Art
                ctx.fillStyle = '#f8fafc';
                ctx.beginPath();
                ctx.arc(34, 9, 3, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#78350f';
                ctx.beginPath();
                ctx.arc(34, 9, 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#fef08a';
                ctx.fillRect(33, 8, 1.5, 1.5);

                canvas.refresh();
            }
        }

        // =========================================================================
        // 30. DEEP FOREST EMERALD & GOLD ACCENT AREA RUG (220x124) [Concept 1 & 5]
        // =========================================================================
        if (!textures.exists('cafe_lounge_emerald_gold_rug')) {
            const canvas = textures.createCanvas('cafe_lounge_emerald_gold_rug', 220, 124);
            if (canvas) {
                const ctx = canvas.getContext();

                // Soft Floor Drop Shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
                ctx.fillRect(4, 4, 212, 116);

                // Fringes on Left and Right ends
                ctx.fillStyle = '#cfc6b8';
                for (let y = 8; y < 116; y += 4) {
                    ctx.fillRect(0, y, 4, 2);
                    ctx.fillRect(216, y, 4, 2);
                }

                // Deep Forest Charcoal Outer Rim
                ctx.fillStyle = '#0f2015';
                ctx.fillRect(4, 4, 212, 116);

                // Warm Polished Brass / Gold Inlay Band (From Concept 1)
                ctx.fillStyle = '#b45309';
                ctx.fillRect(8, 8, 204, 108);
                ctx.fillStyle = '#d97706';
                ctx.fillRect(9, 9, 202, 106);
                ctx.fillStyle = '#f59e0b';
                ctx.fillRect(10, 10, 200, 1);
                ctx.fillRect(10, 113, 200, 1);

                // Dark Moss Transition Border
                ctx.fillStyle = '#143320';
                ctx.fillRect(12, 12, 196, 100);

                // Rich Forest Emerald Main Field
                ctx.fillStyle = '#1b4332';
                ctx.fillRect(15, 15, 190, 94);
                ctx.fillStyle = '#245640';
                ctx.fillRect(18, 18, 184, 88);

                // Subtle Botanical Woven Cross-Grain
                for (let y = 20; y < 104; y += 4) {
                    ctx.fillStyle = (Math.floor(y / 4) % 2 === 0) ? '#2a634a' : '#1f4c38';
                    ctx.fillRect(20, y, 180, 2);
                }

                // Subtle Inner Gold Geometric Frame
                ctx.strokeStyle = '#b45309';
                ctx.lineWidth = 1;
                ctx.strokeRect(26, 26, 168, 72);

                // Corner Flourishes
                const drawGoldCorner = (cx: number, cy: number) => {
                    ctx.fillStyle = '#f59e0b';
                    ctx.fillRect(cx - 2, cy - 2, 5, 5);
                    ctx.fillStyle = '#1b4332';
                    ctx.fillRect(cx - 1, cy - 1, 3, 3);
                };
                drawGoldCorner(26, 26);
                drawGoldCorner(194, 26);
                drawGoldCorner(26, 98);
                drawGoldCorner(194, 98);

                canvas.refresh();
            }
        }

        // =========================================================================
        // 31. FRAMED MOUNTAIN & PINE LANDSCAPE PAINTING (76x24) [Concept 1]
        // =========================================================================
        if (!textures.exists('cafe_lounge_wall_landscape')) {
            const canvas = textures.createCanvas('cafe_lounge_wall_landscape', 76, 24);
            if (canvas) {
                const ctx = canvas.getContext();

                // Dark Walnut Frame Shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
                ctx.fillRect(1, 2, 74, 22);

                // Polished Walnut Frame
                ctx.fillStyle = '#2e1205';
                ctx.fillRect(0, 0, 76, 22);

                // Inner Brass Bevel
                ctx.fillStyle = '#b45309';
                ctx.fillRect(2, 2, 72, 18);
                ctx.fillStyle = '#d97706';
                ctx.fillRect(3, 3, 70, 16);

                // Canvas: Sky Gradient (Dawn Amber to Mountain Blue)
                ctx.fillStyle = '#fed7aa';
                ctx.fillRect(4, 4, 68, 14);
                ctx.fillStyle = '#bae6fd';
                ctx.fillRect(4, 4, 68, 7);

                // Distant Misty Blue Peaks
                ctx.fillStyle = '#64748b';
                ctx.beginPath();
                ctx.moveTo(8, 14);
                ctx.lineTo(20, 6);
                ctx.lineTo(32, 14);
                ctx.fill();

                ctx.fillStyle = '#475569';
                ctx.beginPath();
                ctx.moveTo(26, 14);
                ctx.lineTo(40, 5);
                ctx.lineTo(54, 14);
                ctx.fill();

                // Forefront Evergreen Pine Forest Silhouette
                ctx.fillStyle = '#143320';
                for (let x = 6; x < 68; x += 5) {
                    ctx.beginPath();
                    ctx.moveTo(x, 18);
                    ctx.lineTo(x + 3, 9 + ((x % 3) * 2));
                    ctx.lineTo(x + 6, 18);
                    ctx.fill();
                }

                // Small Morning Sun
                ctx.fillStyle = '#fef08a';
                ctx.beginPath();
                ctx.arc(58, 7, 3, 0, Math.PI * 2);
                ctx.fill();

                canvas.refresh();
            }
        }

        // =========================================================================
        // 32. FREESTANDING WICKER RATTAN HANGING EGG CHAIR (34x50) [Concept 5]
        // =========================================================================
        if (!textures.exists('cafe_lounge_hanging_egg_chair')) {
            const canvas = textures.createCanvas('cafe_lounge_hanging_egg_chair', 34, 50);
            if (canvas) {
                const ctx = canvas.getContext();

                // Floor Shadow for Base
                ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                ctx.beginPath();
                ctx.ellipse(17, 45, 14, 4, 0, 0, Math.PI * 2);
                ctx.fill();

                // Curved Wrought Iron Stand (Base & Arching Pole)
                ctx.fillStyle = '#1c1917';
                ctx.fillRect(6, 44, 22, 3); // floor disc
                ctx.fillStyle = '#292524';
                ctx.fillRect(23, 10, 3, 34); // vertical pole
                // Curved top hook
                ctx.fillRect(17, 4, 9, 3);
                ctx.fillRect(15, 6, 3, 4);

                // Suspension Chain / Spring
                ctx.fillStyle = '#94a3b8';
                ctx.fillRect(16, 9, 1.5, 5);

                // Teardrop Woven Wicker Pod Shell (Natural Honey Rattan)
                ctx.fillStyle = '#5c2d13';
                ctx.beginPath();
                ctx.ellipse(15, 27, 13, 16, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#9a3412';
                ctx.beginPath();
                ctx.ellipse(15, 27, 11, 14, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#b45309';
                ctx.beginPath();
                ctx.ellipse(15, 27, 9.5, 12, 0, 0, Math.PI * 2);
                ctx.fill();

                // Wicker Cross-Weave Texture
                ctx.fillStyle = '#78350f';
                for (let y = 16; y < 38; y += 4) {
                    ctx.fillRect(6, y, 18, 1);
                }

                // Plush Tufted Cream Nest Cushion
                ctx.fillStyle = '#fef3c7';
                ctx.beginPath();
                ctx.ellipse(15, 30, 8, 9, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#fde68a';
                ctx.beginPath();
                ctx.ellipse(15, 32, 7, 6, 0, 0, Math.PI * 2);
                ctx.fill();

                // Sage Velvet Accent Pillow
                ctx.fillStyle = '#065f46';
                ctx.fillRect(12, 26, 6, 6);
                ctx.fillStyle = '#047857';
                ctx.fillRect(13, 27, 4, 4);

                canvas.refresh();
            }
        }

        // =========================================================================
        // 33. SLIM FLOOR-STANDING LIBRARY BOOKCASE (28x56) [Concept 1 & 6]
        // =========================================================================
        if (!textures.exists('cafe_lounge_tall_bookshelf')) {
            const canvas = textures.createCanvas('cafe_lounge_tall_bookshelf', 28, 56);
            if (canvas) {
                const ctx = canvas.getContext();

                // Floor Shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                ctx.fillRect(2, 52, 24, 4);

                // Solid Walnut Outer Frame
                ctx.fillStyle = '#271206';
                ctx.fillRect(0, 0, 28, 52);
                ctx.fillStyle = '#3c1b09';
                ctx.fillRect(2, 2, 24, 48);

                // 3 Shelf Planks
                ctx.fillStyle = '#1c0c04';
                ctx.fillRect(2, 14, 24, 3);
                ctx.fillRect(2, 27, 24, 3);
                ctx.fillRect(2, 40, 24, 3);

                // Top Shelf (Small potted ivy plant & books)
                ctx.fillStyle = '#b45309';
                ctx.fillRect(4, 8, 5, 6);
                ctx.fillStyle = '#16a34a';
                ctx.fillRect(17, 6, 8, 6);
                ctx.fillStyle = '#22c55e';
                ctx.fillRect(19, 10, 4, 4); // trailing ivy

                // Shelf 2 (Row of colorful vintage book spines)
                const spineColors = ['#dc2626', '#d97706', '#2563eb', '#16a34a', '#9333ea', '#ca8a04'];
                let bx = 4;
                spineColors.forEach((color, i) => {
                    ctx.fillStyle = color;
                    ctx.fillRect(bx, 17, 3, 10);
                    bx += 3.5;
                });

                // Shelf 3 (Stacked books horizontally & rolled scrolls)
                ctx.fillStyle = '#0284c7';
                ctx.fillRect(4, 34, 11, 3);
                ctx.fillStyle = '#ea580c';
                ctx.fillRect(5, 31, 9, 3);
                ctx.fillStyle = '#fef08a';
                ctx.fillRect(18, 30, 6, 10);

                // Bottom Shelf (Large encyclopedia volumes & antique jug)
                ctx.fillStyle = '#78350f';
                ctx.fillRect(4, 43, 4, 9);
                ctx.fillStyle = '#451a03';
                ctx.fillRect(9, 43, 4, 9);
                ctx.fillStyle = '#d97706';
                ctx.fillRect(16, 44, 8, 8);

                canvas.refresh();
            }
        }

        // =========================================================================
        // 34. CLASSIC BRASS FLOOR READING LAMP (18x54) [Concept 1 & 6]
        // =========================================================================
        if (!textures.exists('cafe_lounge_brass_floor_lamp')) {
            const canvas = textures.createCanvas('cafe_lounge_brass_floor_lamp', 18, 54);
            if (canvas) {
                const ctx = canvas.getContext();

                // Floor Shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                ctx.beginPath();
                ctx.ellipse(9, 50, 7, 2.5, 0, 0, Math.PI * 2);
                ctx.fill();

                // Weighted Polished Brass Base
                ctx.fillStyle = '#78350f';
                ctx.fillRect(4, 48, 10, 3);
                ctx.fillStyle = '#d97706';
                ctx.fillRect(5, 47, 8, 2);

                // Slim Brass Pole
                ctx.fillStyle = '#b45309';
                ctx.fillRect(8, 16, 2, 32);
                ctx.fillStyle = '#f59e0b';
                ctx.fillRect(8.5, 16, 1, 32);

                // Warm Pleated Fabric Lampshade
                ctx.fillStyle = '#d97706';
                ctx.beginPath();
                ctx.moveTo(3, 16);
                ctx.lineTo(15, 16);
                ctx.lineTo(13, 8);
                ctx.lineTo(5, 8);
                ctx.fill();

                ctx.fillStyle = '#fef08a';
                ctx.beginPath();
                ctx.moveTo(4, 15);
                ctx.lineTo(14, 15);
                ctx.lineTo(12, 9);
                ctx.lineTo(6, 9);
                ctx.fill();

                // Pleat lines
                ctx.fillStyle = '#ca8a04';
                for (let x = 6; x < 13; x += 2) {
                    ctx.fillRect(x, 9, 1, 6);
                }

                // Finial on top
                ctx.fillStyle = '#d97706';
                ctx.fillRect(8, 6, 2, 2);

                canvas.refresh();
            }
        }

    // =========================================================================
    // 35. CIRCULAR WALNUT SIDE TABLE WITH LIT CANDLE (18x22) [Concept 1]
    // =========================================================================
    if (!textures.exists('cafe_lounge_side_table_candle')) {
      const canvas = textures.createCanvas('cafe_lounge_side_table_candle', 18, 22);
      if (canvas) {
        const ctx = canvas.getContext();

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(9, 19, 8, 2.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Tripod Wood Legs
        ctx.fillStyle = '#271206';
        ctx.fillRect(4, 11, 2, 8);
        ctx.fillRect(12, 11, 2, 8);
        ctx.fillRect(8, 11, 2, 9);

        // Round Walnut Tabletop
        ctx.fillStyle = '#3c1b09';
        ctx.beginPath();
        ctx.ellipse(9, 10, 8, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#5c2d13';
        ctx.beginPath();
        ctx.ellipse(9, 9, 7.5, 3.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Glass Votive Candle (Glowing Amber Flame)
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(7.5, 4, 3, 4);
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(8, 2, 2, 3);
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(8.5, 1, 1, 2);

        canvas.refresh();
      }
    }
