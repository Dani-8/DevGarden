import Phaser from 'phaser';

export class CafeBuildingTextures {
    public static create(textures: Phaser.Textures.TextureManager) {
        this.drawCodeCafeStorefront(textures);
        this.drawCafeConcretePatio(textures);
        this.drawCafeInteriorFloors(textures);
        this.drawCafeWallsAndDecor(textures);
        this.drawCafeEntranceAndWindows(textures);
    }

    private static drawCodeCafeStorefront(textures: Phaser.Textures.TextureManager) {
        if (textures.exists('code_cafe_storefront')) return;
        const canvas = textures.createCanvas('code_cafe_storefront', 192, 128);
        if (!canvas) return;
        const ctx = canvas.getContext();

        ctx.fillStyle = '#451a03';
        ctx.fillRect(0, 32, 192, 96);

        ctx.fillStyle = '#78350f';
        ctx.fillRect(8, 40, 176, 88);

        ctx.fillStyle = '#9a3412';
        ctx.fillRect(0, 20, 192, 16);

        ctx.fillStyle = '#fde047';
        for (let x = 0; x < 192; x += 32) {
            ctx.fillRect(x, 20, 16, 16);
        }

        ctx.fillStyle = '#292524';
        ctx.fillRect(16, 0, 160, 24);

        ctx.fillStyle = '#fef08a';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('CODE CAFE', 96, 16);

        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(16, 56, 48, 56);
        ctx.fillRect(128, 56, 48, 56);

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(20, 60, 12, 48);
        ctx.fillRect(132, 60, 12, 48);

        ctx.fillStyle = '#1e293b';
        ctx.fillRect(80, 64, 32, 64);
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(82, 66, 13, 60);
        ctx.fillRect(97, 66, 13, 60);

        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(93, 96, 2, 4);
        ctx.fillRect(97, 96, 2, 4);

        canvas.refresh();
    }

    private static drawCafeConcretePatio(textures: Phaser.Textures.TextureManager) {
        if (textures.exists('cafe_concrete_patio')) return;
        const canvas = textures.createCanvas('cafe_concrete_patio', 32, 32);
        if (!canvas) return;
        const ctx = canvas.getContext();

        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(0, 0, 32, 32);

        ctx.fillStyle = '#64748b';
        ctx.fillRect(0, 31, 32, 1);
        ctx.fillRect(31, 0, 1, 32);

        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(2, 2, 28, 1);
        ctx.fillRect(2, 2, 1, 28);

        canvas.refresh();
    }

    private static drawCafeInteriorFloors(textures: Phaser.Textures.TextureManager) {
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

        if (!textures.exists('cafe_floor_wood')) {
            const canvas = textures.createCanvas('cafe_floor_wood', 32, 32);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = '#85522b';
                ctx.fillRect(0, 0, 32, 32);
                canvas.refresh();
            }
        }

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
    }

    private static drawCafeWallsAndDecor(textures: Phaser.Textures.TextureManager) {
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

        if (!textures.exists('cafe_wall_menu')) {
            const canvas = textures.createCanvas('cafe_wall_menu', 280, 140);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = '#2b1003';
                ctx.fillRect(0, 0, 280, 140);
                ctx.fillStyle = '#5c280b';
                ctx.fillRect(4, 4, 272, 132);

                ctx.fillStyle = '#18181b';
                ctx.fillRect(10, 10, 260, 120);

                ctx.fillStyle = '#fef08a';
                ctx.font = 'bold 18px "Segoe UI", sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('☕ CODE CAFE MENU ☕', 140, 34);

                ctx.fillStyle = '#d97706';
                ctx.fillRect(40, 40, 200, 2);

                ctx.textAlign = 'left';

                ctx.fillStyle = '#fef08a';
                ctx.font = 'bold 15px "Segoe UI", sans-serif';
                ctx.fillText('[ COFFEE ]', 24, 62);
                ctx.fillStyle = '#f8fafc';
                ctx.font = '14px "Segoe UI", sans-serif';
                ctx.fillText('Bugfix Brew    $3.50', 24, 84);
                ctx.fillText('Async Espresso $4.00', 24, 104);
                ctx.fillText('Zero-Bug Cold  $4.50', 24, 124);

                ctx.fillStyle = '#fef08a';
                ctx.font = 'bold 15px "Segoe UI", sans-serif';
                ctx.fillText('[ SNACKS ]', 156, 62);
                ctx.fillStyle = '#f8fafc';
                ctx.font = '14px "Segoe UI", sans-serif';
                ctx.fillText('Croissant  $2.50', 156, 84);
                ctx.fillText('Muffin     $3.00', 156, 104);
                ctx.fillText('Cheesecake $4.00', 156, 124);

                canvas.refresh();
            }
        }

        if (!textures.exists('cafe_neon_sign')) {
            const canvas = textures.createCanvas('cafe_neon_sign', 260, 70);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
                ctx.fillRect(4, 4, 252, 62);

                ctx.fillStyle = '#270e01';
                ctx.fillRect(0, 0, 260, 64);

                ctx.fillStyle = '#b45309';
                ctx.fillRect(4, 4, 252, 56);
                ctx.fillStyle = '#fef08a';
                ctx.fillRect(6, 6, 248, 2); ctx.fillRect(6, 6, 2, 52);

                ctx.fillStyle = '#854d0e';
                ctx.fillRect(8, 8, 244, 48);

                ctx.fillStyle = '#a16207';
                ctx.fillRect(12, 12, 236, 40);

                ctx.fillStyle = '#fef08a';
                ctx.fillRect(10, 10, 6, 6); ctx.fillRect(244, 10, 6, 6);
                ctx.fillRect(10, 48, 6, 6); ctx.fillRect(244, 48, 6, 6);

                ctx.fillStyle = '#fef08a';
                ctx.fillRect(24, 24, 20, 20);
                ctx.fillRect(44, 28, 5, 12);
                ctx.fillStyle = '#d97706';
                ctx.fillRect(28, 28, 12, 12);
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(28, 16, 3, 5);
                ctx.fillRect(34, 13, 3, 7);
                ctx.fillRect(39, 16, 3, 5);

                ctx.textAlign = 'center';
                ctx.font = 'bold 26px "Segoe UI", serif';

                ctx.fillStyle = '#270e01';
                ctx.fillText('CODE CAFE', 152, 43);

                ctx.fillStyle = '#fef08a';
                ctx.fillText('CODE CAFE', 150, 41);

                canvas.refresh();
            }
        }

        if (!textures.exists('cafe_wall_poster')) {
            const canvas = textures.createCanvas('cafe_wall_poster', 160, 140);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                ctx.fillRect(4, 4, 152, 132);

                ctx.fillStyle = '#270e01';
                ctx.fillRect(0, 0, 160, 140);

                ctx.fillStyle = '#b45309';
                ctx.fillRect(5, 5, 150, 130);
                ctx.fillStyle = '#fef08a';
                ctx.fillRect(6, 6, 148, 1); ctx.fillRect(6, 6, 1, 128);

                ctx.fillStyle = '#1c1917';
                ctx.fillRect(8, 8, 144, 124);

                ctx.textAlign = 'center';
                ctx.font = 'bold 15px "Segoe UI", sans-serif';

                ctx.fillStyle = '#fef08a'; ctx.fillText('TEA', 80, 32);
                ctx.fillStyle = '#fef08a'; ctx.fillText('SLEEP', 80, 58);
                ctx.fillStyle = '#fef08a'; ctx.fillText('CODE', 80, 84);
                ctx.fillStyle = '#fef08a'; ctx.fillText('REPEAT', 80, 110);

                ctx.fillStyle = '#14532d';
                ctx.fillRect(0, 0, 160, 5);
                ctx.fillRect(0, 0, 5, 140);
                ctx.fillRect(155, 0, 5, 140);
                ctx.fillRect(0, 135, 160, 5);

                canvas.refresh();
            }
        }
    }

    private static drawCafeEntranceAndWindows(textures: Phaser.Textures.TextureManager) {
        if (!textures.exists('cafe_entrance_gateway')) {
            const canvas = textures.createCanvas('cafe_entrance_gateway', 192, 80);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
                ctx.fillRect(4, 4, 184, 72);

                ctx.fillStyle = '#1e293b';
                ctx.fillRect(0, 0, 192, 80);

                ctx.fillStyle = '#b45309';
                ctx.fillRect(4, 4, 184, 72);
                ctx.fillStyle = '#fef08a';
                ctx.fillRect(6, 6, 180, 2); ctx.fillRect(6, 6, 2, 68);

                ctx.fillStyle = '#1e3a8a';
                ctx.fillRect(12, 10, 168, 60);

                ctx.fillStyle = '#2563eb';
                ctx.fillRect(16, 14, 160, 52);

                ctx.fillStyle = '#fef08a';
                ctx.font = 'bold 14px "Segoe UI", sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('WELCOME TO', 96, 36);
                ctx.fillText('CODE CAFE', 96, 54);

                canvas.refresh();
            }
        }

        if (!textures.exists('cafe_entrance_pillar')) {
            const canvas = textures.createCanvas('cafe_entrance_pillar', 64, 112);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
                ctx.fillRect(4, 100, 56, 12);

                ctx.fillStyle = '#78350f';
                ctx.fillRect(8, 88, 48, 20);
                ctx.fillStyle = '#b45309';
                ctx.fillRect(8, 88, 48, 4);

                ctx.fillStyle = '#270e01';
                ctx.fillRect(12, 28, 40, 60);

                ctx.fillStyle = '#451a03';
                ctx.fillRect(18, 30, 6, 56);
                ctx.fillRect(29, 30, 6, 56);
                ctx.fillRect(40, 30, 6, 56);

                canvas.refresh();
            }
        }

        if (!textures.exists('cafe_entrance_planter_wall')) {
            const canvas = textures.createCanvas('cafe_entrance_planter_wall', 768, 64);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                ctx.fillRect(0, 52, 768, 12);

                ctx.fillStyle = '#270e01';
                ctx.fillRect(0, 20, 768, 40);

                for (let x = 8; x < 768; x += 64) {
                    ctx.fillStyle = '#451a03';
                    ctx.fillRect(x, 24, 52, 32);
                    ctx.fillStyle = '#78350f';
                    ctx.fillRect(x + 2, 26, 48, 2);
                    ctx.fillRect(x + 2, 26, 2, 28);
                }

                ctx.fillStyle = '#b45309';
                ctx.fillRect(0, 20, 768, 4);

                ctx.fillStyle = '#14532d';
                ctx.fillRect(0, 0, 768, 22);

                canvas.refresh();
            }
        }

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

                canvas.refresh();
            }
        }
    }
}
