import Phaser from 'phaser';

export class CafeSeatingAndTables {
    public static draw(textures: Phaser.Textures.TextureManager) {
        // 1. Cafe Table Base (48x48)
        if (!textures.exists('cafe_interior_table')) {
            const canvas = textures.createCanvas('cafe_interior_table', 48, 48);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                ctx.beginPath();
                ctx.ellipse(24, 44, 20, 4, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#0f172a';
                ctx.fillRect(22, 22, 4, 20);
                ctx.fillRect(12, 40, 24, 4);

                ctx.fillStyle = '#270e01';
                ctx.beginPath();
                ctx.ellipse(24, 18, 22, 14, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#78350f';
                ctx.beginPath();
                ctx.ellipse(24, 17, 20, 12, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#92400e';
                ctx.beginPath();
                ctx.ellipse(24, 16, 17, 10, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#b45309';
                ctx.beginPath();
                ctx.ellipse(24, 15, 13, 7, 0, 0, Math.PI * 2);
                ctx.fill();

                canvas.refresh();
            }
        }

        // 2. Table with Laptop (48x48)
        if (!textures.exists('cafe_interior_table_laptop')) {
            const canvas = textures.createCanvas('cafe_interior_table_laptop', 48, 48);
            if (canvas) {
                const ctx = canvas.getContext();
                const baseTable = textures.get('cafe_interior_table').getSourceImage() as CanvasImageSource;
                ctx.drawImage(baseTable, 0, 0);

                ctx.fillStyle = '#334155';
                ctx.fillRect(16, 16, 16, 10);
                ctx.fillStyle = '#38bdf8';
                ctx.fillRect(18, 10, 12, 7);
                ctx.fillStyle = '#f8fafc';
                ctx.fillRect(20, 12, 8, 1); ctx.fillRect(20, 14, 6, 1);

                ctx.fillStyle = '#ffffff'; ctx.fillRect(34, 14, 5, 5);
                ctx.fillStyle = '#451a03'; ctx.fillRect(35, 15, 3, 3);

                canvas.refresh();
            }
        }

        // 3. Table with Coffee & Pastry (48x48)
        if (!textures.exists('cafe_interior_table_coffee')) {
            const canvas = textures.createCanvas('cafe_interior_table_coffee', 48, 48);
            if (canvas) {
                const ctx = canvas.getContext();
                const baseTable = textures.get('cafe_interior_table').getSourceImage() as CanvasImageSource;
                ctx.drawImage(baseTable, 0, 0);

                ctx.fillStyle = '#cbd5e1';
                ctx.beginPath(); ctx.ellipse(20, 16, 6, 4, 0, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#ffffff'; ctx.fillRect(17, 13, 6, 5);
                ctx.fillStyle = '#78350f'; ctx.fillRect(18, 14, 4, 3);

                ctx.fillStyle = '#e2e8f0';
                ctx.beginPath(); ctx.ellipse(32, 16, 6, 4, 0, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#d97706'; ctx.fillRect(29, 14, 6, 4);

                canvas.refresh();
            }
        }

        // 4. Table with Plant / Succulent (48x48)
        if (!textures.exists('cafe_interior_table_plant')) {
            const canvas = textures.createCanvas('cafe_interior_table_plant', 48, 48);
            if (canvas) {
                const ctx = canvas.getContext();
                const baseTable = textures.get('cafe_interior_table').getSourceImage() as CanvasImageSource;
                ctx.drawImage(baseTable, 0, 0);

                ctx.fillStyle = '#c2410c'; ctx.fillRect(21, 14, 6, 6);
                ctx.fillStyle = '#15803d'; ctx.fillRect(19, 10, 10, 5);
                ctx.fillStyle = '#4ade80'; ctx.fillRect(21, 9, 6, 4);

                ctx.fillStyle = '#ffffff'; ctx.fillRect(12, 15, 5, 4);
                ctx.fillStyle = '#78350f'; ctx.fillRect(13, 16, 3, 2);

                canvas.refresh();
            }
        }

        // 5a. Chair facing DOWN (22x28)
        if (!textures.exists('cafe_chair_down')) {
            const canvas = textures.createCanvas('cafe_chair_down', 22, 28);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
                ctx.fillRect(2, 25, 18, 3);

                ctx.fillStyle = '#270e01';
                ctx.fillRect(3, 14, 3, 12);
                ctx.fillRect(16, 14, 3, 12);

                ctx.fillStyle = '#7f1d1d';
                ctx.fillRect(2, 12, 18, 5);
                ctx.fillStyle = '#991b1b';
                ctx.fillRect(2, 12, 18, 3);
                ctx.fillStyle = '#dc2626';
                ctx.fillRect(3, 12, 16, 1);

                ctx.fillStyle = '#451a03';
                ctx.fillRect(3, 1, 16, 11);
                ctx.fillStyle = '#78350f';
                ctx.fillRect(4, 2, 14, 1);
                ctx.fillStyle = '#991b1b';
                ctx.fillRect(5, 3, 12, 8);
                ctx.fillStyle = '#dc2626';
                ctx.fillRect(6, 4, 10, 6);

                canvas.refresh();
            }
        }

        // Alias default chair
        if (!textures.exists('cafe_interior_chair')) {
            const canvas = textures.createCanvas('cafe_interior_chair', 22, 28);
            if (canvas) {
                const ctx = canvas.getContext();
                const base = textures.get('cafe_chair_down').getSourceImage() as CanvasImageSource;
                ctx.drawImage(base, 0, 0);
                canvas.refresh();
            }
        }

        // 5b. Chair facing UP (22x28)
        if (!textures.exists('cafe_chair_up')) {
            const canvas = textures.createCanvas('cafe_chair_up', 22, 28);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
                ctx.fillRect(2, 25, 18, 3);

                ctx.fillStyle = '#270e01';
                ctx.fillRect(3, 2, 3, 10);
                ctx.fillRect(16, 2, 3, 10);

                ctx.fillStyle = '#7f1d1d';
                ctx.fillRect(2, 7, 18, 7);
                ctx.fillStyle = '#991b1b';
                ctx.fillRect(2, 7, 18, 4);
                ctx.fillStyle = '#dc2626';
                ctx.fillRect(3, 7, 16, 1);

                ctx.fillStyle = '#451a03';
                ctx.fillRect(3, 14, 16, 12);
                ctx.fillStyle = '#78350f';
                ctx.fillRect(4, 15, 14, 1);
                ctx.fillStyle = '#991b1b';
                ctx.fillRect(5, 16, 12, 8);
                ctx.fillStyle = '#dc2626';
                ctx.fillRect(6, 17, 10, 6);

                canvas.refresh();
            }
        }

        // 5c. Chair facing RIGHT (22x28)
        if (!textures.exists('cafe_chair_right')) {
            const canvas = textures.createCanvas('cafe_chair_right', 22, 28);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
                ctx.fillRect(2, 25, 18, 3);

                ctx.fillStyle = '#270e01';
                ctx.fillRect(3, 15, 3, 11);
                ctx.fillRect(16, 15, 3, 11);

                ctx.fillStyle = '#7f1d1d';
                ctx.fillRect(7, 12, 13, 6);
                ctx.fillStyle = '#991b1b';
                ctx.fillRect(7, 12, 13, 3);
                ctx.fillStyle = '#dc2626';
                ctx.fillRect(8, 12, 11, 1);

                ctx.fillStyle = '#451a03';
                ctx.fillRect(2, 2, 6, 19);
                ctx.fillStyle = '#78350f';
                ctx.fillRect(3, 3, 4, 1);
                ctx.fillStyle = '#991b1b';
                ctx.fillRect(3, 4, 4, 15);
                ctx.fillStyle = '#dc2626';
                ctx.fillRect(4, 5, 2, 13);

                canvas.refresh();
            }
        }

        // 5d. Chair facing LEFT (22x28)
        if (!textures.exists('cafe_chair_left')) {
            const canvas = textures.createCanvas('cafe_chair_left', 22, 28);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
                ctx.fillRect(2, 25, 18, 3);

                ctx.fillStyle = '#270e01';
                ctx.fillRect(3, 15, 3, 11);
                ctx.fillRect(16, 15, 3, 11);

                ctx.fillStyle = '#7f1d1d';
                ctx.fillRect(2, 12, 13, 6);
                ctx.fillStyle = '#991b1b';
                ctx.fillRect(2, 12, 13, 3);
                ctx.fillStyle = '#dc2626';
                ctx.fillRect(3, 12, 11, 1);

                ctx.fillStyle = '#451a03';
                ctx.fillRect(14, 2, 6, 19);
                ctx.fillStyle = '#78350f';
                ctx.fillRect(15, 3, 4, 1);
                ctx.fillStyle = '#991b1b';
                ctx.fillRect(15, 4, 4, 15);
                ctx.fillStyle = '#dc2626';
                ctx.fillRect(16, 5, 2, 13);

                canvas.refresh();
            }
        }

        // 6. Leather Lounge Sofa Side View (36x56)
        if (!textures.exists('cafe_sofa_side')) {
            const canvas = textures.createCanvas('cafe_sofa_side', 36, 56);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = 'rgba(0,0,0,0.25)';
                ctx.fillRect(4, 52, 32, 4);

                ctx.fillStyle = '#7c2d12';
                ctx.fillRect(0, 0, 36, 56);

                ctx.fillStyle = '#521d0a';
                ctx.fillRect(0, 0, 10, 56);
                ctx.fillStyle = '#9a3412';
                ctx.fillRect(2, 2, 4, 52);

                ctx.fillStyle = '#6e270d';
                ctx.fillRect(10, 0, 26, 10);
                ctx.fillRect(10, 46, 26, 10);

                ctx.fillStyle = '#b45309';
                ctx.fillRect(12, 2, 22, 3);
                ctx.fillRect(12, 48, 22, 3);

                ctx.fillStyle = '#9a3412';
                ctx.fillRect(10, 10, 24, 17);
                ctx.fillRect(10, 29, 24, 17);

                ctx.fillStyle = '#c2410c';
                ctx.fillRect(12, 12, 20, 2);
                ctx.fillRect(12, 31, 20, 2);
                ctx.fillStyle = '#451a03';
                ctx.fillRect(10, 27, 24, 2);

                ctx.fillStyle = '#270e01';
                ctx.fillRect(30, 52, 4, 4);
                ctx.fillRect(12, 52, 4, 4);

                canvas.refresh();
            }
        }

        // 7. Leather Lounge Sofa Front View (44x28)
        if (!textures.exists('cafe_sofa')) {
            const canvas = textures.createCanvas('cafe_sofa', 44, 28);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = 'rgba(0,0,0,0.25)';
                ctx.fillRect(2, 24, 40, 4);

                ctx.fillStyle = '#9a3412';
                ctx.fillRect(0, 4, 44, 20);

                ctx.fillStyle = '#7c2d12';
                ctx.fillRect(2, 2, 40, 10);
                ctx.fillStyle = '#c2410c';
                ctx.fillRect(4, 3, 16, 2);
                ctx.fillRect(24, 3, 16, 2);

                ctx.fillStyle = '#7c2d12';
                ctx.fillRect(0, 6, 6, 16);
                ctx.fillRect(38, 6, 6, 16);

                ctx.fillStyle = '#b45309';
                ctx.fillRect(6, 12, 15, 10);
                ctx.fillRect(23, 12, 15, 10);

                ctx.fillStyle = '#270e01';
                ctx.fillRect(2, 22, 3, 4);
                ctx.fillRect(39, 22, 3, 4);

                canvas.refresh();
            }
        }

        // 8. L-Shaped Leather Corner Lounge Sofa (Left Entrance Wing - 80x60 canvas)
        if (!textures.exists('cafe_l_sofa_left')) {
            const canvas = textures.createCanvas('cafe_l_sofa_left', 80, 60);
            if (canvas) {
                const ctx = canvas.getContext();

                // Drop shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                ctx.beginPath();
                ctx.roundRect(4, 52, 72, 8, 4);
                ctx.fill();

                // Wooden base frame & legs
                ctx.fillStyle = '#271202';
                ctx.fillRect(8, 48, 6, 8);
                ctx.fillRect(66, 48, 6, 8);
                ctx.fillRect(8, 20, 6, 8);
                ctx.fillRect(6, 46, 68, 6);

                // Backrest & Armrests (Rich cognac/tobacco leather)
                // Left vertical backrest
                ctx.fillStyle = '#451a03';
                ctx.fillRect(4, 4, 16, 46);
                ctx.fillStyle = '#78350f';
                ctx.fillRect(6, 6, 12, 42);
                ctx.fillStyle = '#92400e';
                ctx.fillRect(7, 7, 10, 40);
                ctx.fillStyle = '#b45309';
                ctx.fillRect(8, 8, 3, 38);

                // Bottom backrest
                ctx.fillStyle = '#451a03';
                ctx.fillRect(4, 36, 72, 14);
                ctx.fillStyle = '#78350f';
                ctx.fillRect(6, 38, 68, 10);
                ctx.fillStyle = '#92400e';
                ctx.fillRect(7, 39, 66, 8);
                ctx.fillStyle = '#b45309';
                ctx.fillRect(8, 39, 64, 2);

                // Plush Seat Cushions
                // Corner Seat
                ctx.fillStyle = '#78350f';
                ctx.fillRect(18, 18, 26, 20);
                ctx.fillStyle = '#92400e';
                ctx.fillRect(19, 19, 24, 18);
                ctx.fillStyle = '#b45309';
                ctx.fillRect(20, 20, 22, 10);

                // Right Extended Seat
                ctx.fillStyle = '#78350f';
                ctx.fillRect(46, 18, 26, 20);
                ctx.fillStyle = '#92400e';
                ctx.fillRect(47, 19, 24, 18);
                ctx.fillStyle = '#b45309';
                ctx.fillRect(48, 20, 22, 10);

                // Decorative Throw Pillow (Lush Forest Green)
                ctx.fillStyle = '#14532d';
                ctx.beginPath();
                ctx.roundRect(14, 14, 12, 12, 3);
                ctx.fill();
                ctx.fillStyle = '#16a34a';
                ctx.beginPath();
                ctx.roundRect(16, 16, 8, 8, 2);
                ctx.fill();

                // Decorative Throw Pillow (Mustard Velvet)
                ctx.fillStyle = '#854d0e';
                ctx.beginPath();
                ctx.roundRect(60, 26, 12, 12, 3);
                ctx.fill();
                ctx.fillStyle = '#ca8a04';
                ctx.beginPath();
                ctx.roundRect(62, 28, 8, 8, 2);
                ctx.fill();

                canvas.refresh();
            }
        }

        // 9. L-Shaped Leather Corner Lounge Sofa (Right Entrance Wing - 80x60 canvas)
        if (!textures.exists('cafe_l_sofa_right')) {
            const canvas = textures.createCanvas('cafe_l_sofa_right', 80, 60);
            if (canvas) {
                const ctx = canvas.getContext();

                // Drop shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                ctx.beginPath();
                ctx.roundRect(4, 52, 72, 8, 4);
                ctx.fill();

                // Wooden base frame & legs
                ctx.fillStyle = '#271202';
                ctx.fillRect(8, 48, 6, 8);
                ctx.fillRect(66, 48, 6, 8);
                ctx.fillRect(66, 20, 6, 8);
                ctx.fillRect(6, 46, 68, 6);

                // Backrest & Armrests (Rich cognac/tobacco leather)
                // Right vertical backrest
                ctx.fillStyle = '#451a03';
                ctx.fillRect(60, 4, 16, 46);
                ctx.fillStyle = '#78350f';
                ctx.fillRect(62, 6, 12, 42);
                ctx.fillStyle = '#92400e';
                ctx.fillRect(63, 7, 10, 40);
                ctx.fillStyle = '#b45309';
                ctx.fillRect(69, 8, 3, 38);

                // Bottom backrest
                ctx.fillStyle = '#451a03';
                ctx.fillRect(4, 36, 72, 14);
                ctx.fillStyle = '#78350f';
                ctx.fillRect(6, 38, 68, 10);
                ctx.fillStyle = '#92400e';
                ctx.fillRect(7, 39, 66, 8);
                ctx.fillStyle = '#b45309';
                ctx.fillRect(8, 39, 64, 2);

                // Plush Seat Cushions
                // Left Extended Seat
                ctx.fillStyle = '#78350f';
                ctx.fillRect(8, 18, 26, 20);
                ctx.fillStyle = '#92400e';
                ctx.fillRect(9, 19, 24, 18);
                ctx.fillStyle = '#b45309';
                ctx.fillRect(10, 20, 22, 10);

                // Corner Seat
                ctx.fillStyle = '#78350f';
                ctx.fillRect(36, 18, 26, 20);
                ctx.fillStyle = '#92400e';
                ctx.fillRect(37, 19, 24, 18);
                ctx.fillStyle = '#b45309';
                ctx.fillRect(38, 20, 22, 10);

                // Decorative Throw Pillow (Mustard Velvet)
                ctx.fillStyle = '#854d0e';
                ctx.beginPath();
                ctx.roundRect(8, 26, 12, 12, 3);
                ctx.fill();
                ctx.fillStyle = '#ca8a04';
                ctx.beginPath();
                ctx.roundRect(10, 28, 8, 8, 2);
                ctx.fill();

                // Decorative Throw Pillow (Lush Forest Green)
                ctx.fillStyle = '#14532d';
                ctx.beginPath();
                ctx.roundRect(54, 14, 12, 12, 3);
                ctx.fill();
                ctx.fillStyle = '#16a34a';
                ctx.beginPath();
                ctx.roundRect(56, 16, 8, 8, 2);
                ctx.fill();

                canvas.refresh();
            }
        }

        // 10. Low Round Lounge Coffee Table (36x36)
        if (!textures.exists('cafe_lounge_coffee_table')) {
            const canvas = textures.createCanvas('cafe_lounge_coffee_table', 36, 36);
            if (canvas) {
                const ctx = canvas.getContext();

                // Shadow
                ctx.fillStyle = 'rgba(0,0,0,0.3)';
                ctx.beginPath();
                ctx.ellipse(18, 30, 14, 5, 0, 0, Math.PI * 2);
                ctx.fill();

                // Dark wooden legs
                ctx.fillStyle = '#270e01';
                ctx.fillRect(10, 16, 3, 12);
                ctx.fillRect(23, 16, 3, 12);
                ctx.fillRect(16, 18, 4, 12);

                // Tabletop Walnut Finish
                ctx.fillStyle = '#451a03';
                ctx.beginPath();
                ctx.ellipse(18, 14, 16, 10, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#78350f';
                ctx.beginPath();
                ctx.ellipse(18, 13, 15, 9, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#92400e';
                ctx.beginPath();
                ctx.ellipse(18, 12, 13, 7, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#b45309';
                ctx.beginPath();
                ctx.ellipse(18, 11, 10, 5, 0, 0, Math.PI * 2);
                ctx.fill();

                // Small Coffee Cup on saucer
                ctx.fillStyle = '#e2e8f0';
                ctx.beginPath();
                ctx.ellipse(14, 11, 4, 3, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#451a03';
                ctx.fillRect(12, 9, 4, 3);
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(12, 8, 4, 1);

                // Small Succulent in white ceramic pot
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(22, 9, 5, 4);
                ctx.fillStyle = '#16a34a';
                ctx.fillRect(21, 6, 7, 4);
                ctx.fillStyle = '#4ade80';
                ctx.fillRect(23, 5, 3, 3);

                canvas.refresh();
            }
        }

        // 11. Tall Monstera Deliciosa Indoor Plant (40x56)
        if (!textures.exists('cafe_plant_monstera')) {
            const canvas = textures.createCanvas('cafe_plant_monstera', 40, 56);
            if (canvas) {
                const ctx = canvas.getContext();

                // Drop shadow
                ctx.fillStyle = 'rgba(0,0,0,0.35)';
                ctx.beginPath();
                ctx.ellipse(20, 52, 16, 4, 0, 0, Math.PI * 2);
                ctx.fill();

                // Terracotta Ceramic Pot
                ctx.fillStyle = '#431407';
                ctx.beginPath();
                ctx.moveTo(12, 34);
                ctx.lineTo(28, 34);
                ctx.lineTo(25, 52);
                ctx.lineTo(15, 52);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = '#9a3412';
                ctx.beginPath();
                ctx.moveTo(13, 35);
                ctx.lineTo(27, 35);
                ctx.lineTo(24, 51);
                ctx.lineTo(16, 51);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = '#c2410c';
                ctx.fillRect(11, 33, 18, 4);
                ctx.fillStyle = '#ea580c';
                ctx.fillRect(12, 34, 16, 2);

                // Soil
                ctx.fillStyle = '#1c1917';
                ctx.beginPath();
                ctx.ellipse(20, 35, 7, 2, 0, 0, Math.PI * 2);
                ctx.fill();

                // Stems
                ctx.strokeStyle = '#14532d';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(20, 35); ctx.lineTo(12, 22);
                ctx.moveTo(20, 35); ctx.lineTo(28, 18);
                ctx.moveTo(20, 35); ctx.lineTo(20, 12);
                ctx.stroke();

                // Big Monstera Leaves with perforations/texture
                // Leaf 1 (Left)
                ctx.fillStyle = '#14532d';
                ctx.beginPath();
                ctx.ellipse(10, 18, 10, 8, -0.4, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#16a34a';
                ctx.beginPath();
                ctx.ellipse(10, 17, 8, 6, -0.4, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#22c55e';
                ctx.beginPath();
                ctx.ellipse(9, 16, 5, 4, -0.4, 0, Math.PI * 2);
                ctx.fill();

                // Leaf 2 (Right)
                ctx.fillStyle = '#14532d';
                ctx.beginPath();
                ctx.ellipse(30, 15, 11, 9, 0.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#16a34a';
                ctx.beginPath();
                ctx.ellipse(30, 14, 9, 7, 0.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#4ade80';
                ctx.beginPath();
                ctx.ellipse(29, 13, 6, 4, 0.5, 0, Math.PI * 2);
                ctx.fill();

                // Leaf 3 (Top Center)
                ctx.fillStyle = '#15803d';
                ctx.beginPath();
                ctx.ellipse(20, 9, 10, 8, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#22c55e';
                ctx.beginPath();
                ctx.ellipse(20, 8, 8, 6, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#86efac';
                ctx.beginPath();
                ctx.ellipse(19, 7, 4, 3, 0, 0, Math.PI * 2);
                ctx.fill();

                canvas.refresh();
            }
        }

        // 12. High Bar Stool (20x30 canvas - 4 slim dark legs, footrest ring, cushioned seat)
        if (!textures.exists('cafe_high_stool')) {
            const canvas = textures.createCanvas('cafe_high_stool', 20, 30);
            if (canvas) {
                const ctx = canvas.getContext();

                // Drop shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                ctx.beginPath();
                ctx.ellipse(10, 27, 8, 3, 0, 0, Math.PI * 2);
                ctx.fill();

                // 4 Slim Dark Metal / Walnut Legs with taper
                ctx.fillStyle = '#1c1917';
                // Back Left Leg
                ctx.fillRect(4, 10, 2, 17);
                // Back Right Leg
                ctx.fillRect(14, 10, 2, 17);
                // Front Left Leg
                ctx.fillRect(5, 12, 2, 16);
                // Front Right Leg
                ctx.fillRect(13, 12, 2, 16);

                // Lower Footrest Crossbars
                ctx.fillStyle = '#292524';
                ctx.fillRect(4, 21, 12, 2);
                ctx.fillRect(4, 23, 12, 1);

                // Seat Cushion Wooden Base Plinth
                ctx.fillStyle = '#451a03';
                ctx.beginPath();
                ctx.ellipse(10, 11, 8, 3.5, 0, 0, Math.PI * 2);
                ctx.fill();

                // Padded Cushion (Rich Burgundy / Wine Red like reference image)
                ctx.fillStyle = '#881337'; // Deep burgundy shadow
                ctx.beginPath();
                ctx.ellipse(10, 9, 8, 4, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#9f1239'; // Rich red cushion body
                ctx.beginPath();
                ctx.ellipse(10, 8, 7.5, 3.5, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#be123c'; // Highlight
                ctx.beginPath();
                ctx.ellipse(9, 7, 5, 2.2, 0, 0, Math.PI * 2);
                ctx.fill();

                canvas.refresh();
            }
        }

        // 13. Big L-Shaped High Table Counter (160x100 canvas)
        if (!textures.exists('cafe_big_l_table')) {
            const canvas = textures.createCanvas('cafe_big_l_table', 160, 100);
            if (canvas) {
                const ctx = canvas.getContext();

                // Floor drop shadow for whole L-table
                ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                ctx.beginPath();
                // Shadow under vertical left wing
                ctx.roundRect(4, 10, 28, 88, 4);
                // Shadow under horizontal bottom wing
                ctx.roundRect(4, 68, 154, 28, 4);
                ctx.fill();

                // Dark Metal Frame & Sturdy Legs
                ctx.fillStyle = '#1c1917';
                // Legs along left wing
                ctx.fillRect(6, 12, 4, 80);
                ctx.fillRect(24, 12, 4, 80);
                // Legs along bottom wing
                ctx.fillRect(60, 72, 4, 22);
                ctx.fillRect(105, 72, 4, 22);
                ctx.fillRect(150, 72, 4, 22);
                // Lower support stretchers
                ctx.fillRect(6, 82, 148, 3);

                // --- Tabletop Wooden Surface (Rich Natural Walnut / Teak with Beveled Edges) ---
                // Base Wood Underlayer
                ctx.fillStyle = '#451a03';
                ctx.fillRect(4, 6, 26, 86);   // Left vertical arm
                ctx.fillRect(4, 64, 154, 26);  // Bottom horizontal arm

                // Main Warm Wood Surface
                ctx.fillStyle = '#78350f';
                ctx.fillRect(6, 8, 22, 82);
                ctx.fillRect(6, 66, 150, 22);

                // Lighter Wood Grain Tone
                ctx.fillStyle = '#92400e';
                ctx.fillRect(7, 9, 20, 80);
                ctx.fillRect(7, 67, 148, 20);

                // Top Edge Highlight (Reflected Light)
                ctx.fillStyle = '#b45309';
                ctx.fillRect(7, 9, 2, 78);
                ctx.fillRect(7, 67, 148, 2);

                // Subtle wood plank seams
                ctx.fillStyle = '#78350f';
                ctx.fillRect(7, 35, 20, 1);
                ctx.fillRect(60, 67, 1, 20);
                ctx.fillRect(110, 67, 1, 20);

                // --- Tabletop Accessories (Ceramic Mugs, Glass Latte, Notepad) ---
                // 1. Ceramic Coffee Mug on vertical wing
                ctx.fillStyle = '#f8fafc';
                ctx.beginPath();
                ctx.arc(17, 24, 5, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#451a03';
                ctx.beginPath();
                ctx.arc(17, 24, 3.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#d97706';
                ctx.beginPath();
                ctx.arc(16.5, 23.5, 2, 0, Math.PI * 2);
                ctx.fill();

                // 2. Open Journal / Notebook on bottom wing
                ctx.fillStyle = '#fef3c7';
                ctx.fillRect(80, 72, 14, 10);
                ctx.fillStyle = '#d97706';
                ctx.fillRect(86, 72, 1, 10); // Book spine
                ctx.fillStyle = '#94a3b8';
                ctx.fillRect(82, 74, 3, 1);
                ctx.fillRect(82, 77, 3, 1);
                ctx.fillRect(88, 74, 4, 1);
                ctx.fillRect(88, 77, 4, 1);

                // 3. Iced Latte Glass on bottom wing
                ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
                ctx.beginPath();
                ctx.arc(135, 75, 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#b45309';
                ctx.beginPath();
                ctx.arc(135, 75, 2.8, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#22c55e'; // Green eco-straw
                ctx.fillRect(135, 71, 1.5, 6);

                canvas.refresh();
            }
        }

        // 14. Lush Tropical Broad-Leaf Palm Tree in Modern Square Planter (Reference image - 44x58 canvas)
        if (!textures.exists('cafe_square_palm_pot')) {
            const canvas = textures.createCanvas('cafe_square_palm_pot', 44, 58);
            if (canvas) {
                const ctx = canvas.getContext();

                // Drop shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                ctx.beginPath();
                ctx.ellipse(22, 54, 18, 4, 0, 0, Math.PI * 2);
                ctx.fill();

                // Dark Modern Square Tapered Planter Pot (Like reference photo)
                ctx.fillStyle = '#1c1917';
                ctx.beginPath();
                ctx.moveTo(10, 36);
                ctx.lineTo(34, 36);
                ctx.lineTo(31, 54);
                ctx.lineTo(13, 54);
                ctx.closePath();
                ctx.fill();

                // Dark charcoal facet highlight
                ctx.fillStyle = '#292524';
                ctx.beginPath();
                ctx.moveTo(11, 37);
                ctx.lineTo(33, 37);
                ctx.lineTo(30, 53);
                ctx.lineTo(14, 53);
                ctx.closePath();
                ctx.fill();

                // Planter rim
                ctx.fillStyle = '#44403c';
                ctx.fillRect(9, 35, 26, 3);
                ctx.fillStyle = '#57534e';
                ctx.fillRect(10, 35, 24, 1);

                // Dark potting soil
                ctx.fillStyle = '#171717';
                ctx.beginPath();
                ctx.ellipse(22, 36, 11, 3, 0, 0, Math.PI * 2);
                ctx.fill();

                // Stems branching upwards and outwards
                ctx.strokeStyle = '#14532d';
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                ctx.moveTo(22, 36); ctx.lineTo(10, 20);
                ctx.moveTo(22, 36); ctx.lineTo(34, 18);
                ctx.moveTo(22, 36); ctx.lineTo(22, 10);
                ctx.moveTo(22, 36); ctx.lineTo(7, 30);
                ctx.moveTo(22, 36); ctx.lineTo(37, 28);
                ctx.stroke();

                // Broad Fan Palm / Monstera Style Leaves (Tiered layered vibrant greens)
                const drawFanLeaf = (cx: number, cy: number, rx: number, ry: number, rot: number) => {
                    ctx.save();
                    ctx.translate(cx, cy);
                    ctx.rotate(rot);

                    // Deep green base
                    ctx.fillStyle = '#14532d';
                    ctx.beginPath();
                    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
                    ctx.fill();

                    // Vibrant green core
                    ctx.fillStyle = '#16a34a';
                    ctx.beginPath();
                    ctx.ellipse(0, -1, rx * 0.8, ry * 0.75, 0, 0, Math.PI * 2);
                    ctx.fill();

                    // Bright green leaf ribs
                    ctx.fillStyle = '#22c55e';
                    ctx.beginPath();
                    ctx.ellipse(0, -1, rx * 0.55, ry * 0.45, 0, 0, Math.PI * 2);
                    ctx.fill();

                    // Highlight
                    ctx.fillStyle = '#4ade80';
                    ctx.beginPath();
                    ctx.ellipse(-1, -2, rx * 0.3, ry * 0.25, 0, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.restore();
                };

                // Layer leaves around
                drawFanLeaf(8, 28, 9, 6, -0.6);
                drawFanLeaf(36, 26, 9, 6, 0.6);
                drawFanLeaf(10, 18, 12, 8, -0.4);
                drawFanLeaf(34, 16, 12, 8, 0.4);
                drawFanLeaf(22, 8, 13, 9, 0);

                canvas.refresh();
            }
        }
    }
}
