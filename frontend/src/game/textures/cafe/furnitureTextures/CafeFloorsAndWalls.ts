import Phaser from 'phaser';

export class CafeFloorsAndWalls {
    public static draw(textures: Phaser.Textures.TextureManager) {
        // 1. Primary Warm Golden Oak Wood Floor Tile (32x32)
        if (!textures.exists('cafe_floor_wood_1')) {
            const canvas = textures.createCanvas('cafe_floor_wood_1', 32, 32);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = '#85522b';
                ctx.fillRect(0, 0, 32, 32);

                ctx.fillStyle = '#6e411f';
                ctx.fillRect(0, 0, 32, 1);
                ctx.fillRect(0, 16, 32, 1);
                ctx.fillRect(16, 0, 1, 16);
                ctx.fillRect(8, 16, 1, 16);

                ctx.fillStyle = '#a16638';
                ctx.fillRect(2, 4, 12, 1);
                ctx.fillRect(18, 8, 10, 1);
                ctx.fillRect(10, 22, 14, 1);

                canvas.refresh();
            }
        }

        // 2. Secondary Warm Golden Oak Wood Floor Tile (32x32)
        if (!textures.exists('cafe_floor_wood_2')) {
            const canvas = textures.createCanvas('cafe_floor_wood_2', 32, 32);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = '#7a4a25';
                ctx.fillRect(0, 0, 32, 32);

                ctx.fillStyle = '#633a1b';
                ctx.fillRect(0, 0, 32, 1);
                ctx.fillRect(0, 16, 32, 1);
                ctx.fillRect(16, 0, 1, 16);
                ctx.fillRect(24, 16, 1, 16);

                ctx.fillStyle = '#965e31';
                ctx.fillRect(4, 6, 10, 1);
                ctx.fillRect(20, 10, 8, 1);
                ctx.fillRect(12, 24, 10, 1);

                canvas.refresh();
            }
        }

        // Legacy fallback texture alias
        if (!textures.exists('cafe_floor_wood')) {
            const canvas = textures.createCanvas('cafe_floor_wood', 32, 32);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = '#85522b';
                ctx.fillRect(0, 0, 32, 32);
                canvas.refresh();
            }
        }

        // 3. Terrace Stone Patio Tile (32x32)
        if (!textures.exists('cafe_floor_terrace_stone')) {
            const canvas = textures.createCanvas('cafe_floor_terrace_stone', 32, 32);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = '#59493a';
                ctx.fillRect(0, 0, 32, 32);

                ctx.fillStyle = '#7c6a58';
                ctx.fillRect(1, 1, 14, 14);
                ctx.fillRect(17, 1, 14, 14);
                ctx.fillRect(1, 17, 30, 14);

                ctx.fillStyle = '#917d6a';
                ctx.fillRect(2, 2, 12, 2);
                ctx.fillRect(18, 2, 12, 2);
                ctx.fillRect(2, 18, 28, 2);

                canvas.refresh();
            }
        }

        // 4. Two-Tone Open Terrace Cafe Wall (32x32)
        if (!textures.exists('cafe_wall_brick')) {
            const canvas = textures.createCanvas('cafe_wall_brick', 32, 32);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = '#9c8971';
                ctx.fillRect(0, 0, 32, 16);

                ctx.fillStyle = '#8f7b62';
                ctx.fillRect(0, 7, 32, 1);
                ctx.fillRect(16, 0, 1, 7);
                ctx.fillRect(8, 8, 1, 8);

                ctx.fillStyle = '#3e2617';
                ctx.fillRect(0, 16, 32, 16);

                ctx.fillStyle = '#29180e';
                ctx.fillRect(0, 16, 32, 1);
                ctx.fillRect(8, 16, 1, 16);
                ctx.fillRect(16, 16, 1, 16);
                ctx.fillRect(24, 16, 1, 16);

                ctx.fillStyle = '#523420';
                ctx.fillRect(2, 20, 4, 1);
                ctx.fillRect(10, 24, 4, 1);
                ctx.fillRect(18, 18, 4, 1);
                ctx.fillRect(26, 26, 4, 1);

                ctx.fillStyle = '#15803d';
                ctx.fillRect(2, 0, 6, 4);
                ctx.fillRect(12, 0, 8, 5);
                ctx.fillRect(24, 0, 6, 3);
                ctx.fillStyle = '#22c55e';
                ctx.fillRect(3, 1, 3, 2);
                ctx.fillRect(14, 1, 4, 3);
                ctx.fillRect(25, 1, 3, 1);

                ctx.fillStyle = '#21130a';
                ctx.fillRect(0, 28, 32, 4);

                canvas.refresh();
            }
        }

        // 5. Backwall Wooden Brick Panel Structure behind Counter (240x70)
        if (!textures.exists('cafe_counter_backwall')) {
            const canvas = textures.createCanvas('cafe_counter_backwall', 240, 70);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
                ctx.fillRect(0, 0, 240, 70);

                ctx.fillStyle = '#2d180c';
                ctx.fillRect(2, 2, 236, 66);

                for (let y = 6; y < 62; y += 14) {
                    for (let x = 6; x < 230; x += 32) {
                        const shift = (Math.floor(y / 14) % 2) * 16;
                        ctx.fillStyle = '#3e2415';
                        ctx.fillRect(x + shift, y, 28, 10);
                        ctx.fillStyle = '#54331d';
                        ctx.fillRect(x + shift + 1, y + 1, 26, 2);
                    }
                }

                ctx.fillStyle = '#b45309';
                ctx.fillRect(0, 0, 240, 3);
                ctx.fillRect(0, 67, 240, 3);
                ctx.fillRect(0, 0, 3, 70);
                ctx.fillRect(237, 0, 3, 70);

                ctx.fillStyle = '#15803d';
                ctx.fillRect(0, 0, 240, 5);
                ctx.fillRect(0, 0, 5, 70);
                ctx.fillRect(235, 0, 5, 70);

                canvas.refresh();
            }
        }

        // 6. Terrace Window (96x64)
        if (!textures.exists('cafe_terrace_window')) {
            const canvas = textures.createCanvas('cafe_terrace_window', 96, 64);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = '#451a03';
                ctx.fillRect(0, 0, 96, 64);

                ctx.fillStyle = '#bae6fd';
                ctx.fillRect(4, 4, 42, 56);
                ctx.fillRect(50, 4, 42, 56);

                ctx.fillStyle = '#86efac'; ctx.fillRect(8, 20, 20, 30);
                ctx.fillStyle = '#22c55e'; ctx.fillRect(12, 10, 28, 40);
                ctx.fillStyle = '#16a34a'; ctx.fillRect(54, 15, 30, 40);

                ctx.fillStyle = '#78350f';
                ctx.fillRect(24, 4, 3, 56);
                ctx.fillRect(70, 4, 3, 56);
                ctx.fillRect(4, 30, 88, 3);

                ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
                ctx.beginPath(); ctx.moveTo(6, 6); ctx.lineTo(30, 6); ctx.lineTo(6, 30); ctx.fill();
                ctx.beginPath(); ctx.moveTo(52, 6); ctx.lineTo(76, 6); ctx.lineTo(52, 30); ctx.fill();

                canvas.refresh();
            }
        }

        // 7. Ivy Vines Crawling (48x24)
        if (!textures.exists('cafe_ivy_vine')) {
            const canvas = textures.createCanvas('cafe_ivy_vine', 48, 24);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = '#15803d';
                ctx.fillRect(0, 0, 48, 6);
                ctx.fillRect(6, 6, 12, 10);
                ctx.fillRect(24, 6, 16, 12);
                ctx.fillRect(40, 6, 8, 8);

                ctx.fillStyle = '#22c55e';
                ctx.fillRect(2, 2, 44, 4);
                ctx.fillRect(8, 8, 8, 6);
                ctx.fillRect(26, 8, 12, 8);

                ctx.fillStyle = '#86efac';
                ctx.fillRect(10, 10, 3, 3);
                ctx.fillRect(30, 10, 4, 3);

                canvas.refresh();
            }
        }
    }
}
