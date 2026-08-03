import Phaser from 'phaser';

export class CafeCountersAndAppliances {
    public static draw(textures: Phaser.Textures.TextureManager) {
        // 1. Open Terrace Cafe Style Grand Oak Counter with Sleek Cashier POS (190x44)
        if (!textures.exists('cafe_counter')) {
            const canvas = textures.createCanvas('cafe_counter', 190, 44);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                ctx.fillRect(4, 38, 182, 6);

                ctx.fillStyle = '#3a1805';
                ctx.fillRect(2, 8, 186, 32);

                ctx.fillStyle = '#854d0e';
                ctx.fillRect(4, 10, 182, 28);

                for (let i = 0; i < 5; i++) {
                    const px = 10 + i * 35;
                    ctx.fillStyle = '#270e01';
                    ctx.fillRect(px, 14, 28, 22);
                    ctx.fillStyle = '#a16207';
                    ctx.fillRect(px + 2, 16, 24, 18);
                    ctx.fillStyle = '#d97706';
                    ctx.fillRect(px + 2, 16, 24, 2);
                    ctx.fillRect(px + 2, 16, 2, 18);
                }

                ctx.fillStyle = '#522b0c';
                ctx.fillRect(0, 6, 8, 36);
                ctx.fillRect(182, 6, 8, 36);
                ctx.fillStyle = '#d97706';
                ctx.fillRect(0, 6, 8, 2);
                ctx.fillRect(182, 6, 8, 2);

                ctx.fillStyle = '#b45309';
                ctx.fillRect(8, 36, 174, 4);
                ctx.fillStyle = '#fef08a';
                ctx.fillRect(8, 36, 174, 1);

                ctx.fillStyle = '#60330a';
                ctx.fillRect(0, 0, 190, 10);
                ctx.fillStyle = '#a16207';
                ctx.fillRect(0, 0, 190, 4);
                ctx.fillStyle = '#d97706';
                ctx.fillRect(0, 0, 190, 2);
                ctx.fillStyle = '#fef08a';
                ctx.fillRect(0, 0, 190, 1);

                // POS
                ctx.fillStyle = '#1e293b'; ctx.fillRect(92, 7, 28, 3);
                ctx.fillStyle = '#475569'; ctx.fillRect(94, 8, 24, 1);
                ctx.fillStyle = '#334155'; ctx.fillRect(104, 5, 4, 3);
                ctx.fillStyle = '#0f172a'; ctx.fillRect(95, 0, 22, 11);
                ctx.fillStyle = '#020617'; ctx.fillRect(97, 1, 18, 8);
                ctx.fillStyle = '#38bdf8'; ctx.fillRect(98, 2, 16, 2);
                ctx.fillStyle = '#22c55e'; ctx.fillRect(98, 5, 10, 1); ctx.fillRect(98, 7, 12, 1);
                ctx.fillStyle = '#f59e0b'; ctx.fillRect(111, 5, 3, 3);

                // Printer
                ctx.fillStyle = '#1e293b'; ctx.fillRect(122, 3, 10, 7);
                ctx.fillStyle = '#f8fafc'; ctx.fillRect(124, 1, 6, 3);
                ctx.fillStyle = '#94a3b8'; ctx.fillRect(125, 2, 4, 1);

                // Cups
                ctx.fillStyle = '#f8fafc'; ctx.fillRect(16, 1, 6, 8); ctx.fillRect(24, 1, 6, 8);
                ctx.fillStyle = '#b45309'; ctx.fillRect(16, 4, 6, 3); ctx.fillRect(24, 4, 6, 3);

                // Glass Pastry Case on Right
                ctx.fillStyle = '#1e293b'; ctx.fillRect(142, 0, 42, 10);
                ctx.fillStyle = '#334155'; ctx.fillRect(143, 0, 40, 1); ctx.fillRect(143, 0, 1, 10); ctx.fillRect(182, 0, 1, 10);
                ctx.fillStyle = '#94a3b8'; ctx.fillRect(144, 4, 38, 1);
                ctx.fillStyle = '#d97706'; ctx.fillRect(147, 1, 7, 3); ctx.fillRect(158, 1, 7, 3);
                ctx.fillStyle = '#78350f'; ctx.fillRect(169, 1, 6, 3);
                ctx.fillStyle = '#f59e0b'; ctx.fillRect(177, 1, 5, 3);
                ctx.fillStyle = '#b45309'; ctx.fillRect(146, 6, 5, 3); ctx.fillRect(153, 6, 5, 3);
                ctx.fillStyle = '#fde047'; ctx.fillRect(161, 5, 8, 4);
                ctx.fillStyle = '#ef4444'; ctx.fillRect(163, 5, 4, 1);
                ctx.fillStyle = '#a16207'; ctx.fillRect(172, 5, 8, 4);
                ctx.fillStyle = 'rgba(186, 230, 253, 0.35)'; ctx.fillRect(143, 1, 39, 8);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'; ctx.fillRect(146, 1, 2, 8); ctx.fillRect(152, 1, 1, 8); ctx.fillRect(176, 1, 2, 8);

                canvas.refresh();
            }
        }

        // 2. Counter Side Return Wing (24x50)
        if (!textures.exists('cafe_counter_side')) {
            const canvas = textures.createCanvas('cafe_counter_side', 24, 50);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                ctx.fillRect(0, 0, 24, 50);

                ctx.fillStyle = '#3a1805';
                ctx.fillRect(2, 0, 20, 50);

                ctx.fillStyle = '#854d0e';
                ctx.fillRect(4, 2, 16, 46);

                ctx.fillStyle = '#270e01';
                ctx.fillRect(6, 6, 12, 38);
                ctx.fillStyle = '#a16207';
                ctx.fillRect(8, 8, 8, 34);

                ctx.fillStyle = '#60330a';
                ctx.fillRect(0, 0, 24, 8);
                ctx.fillStyle = '#a16207';
                ctx.fillRect(0, 0, 24, 3);
                ctx.fillStyle = '#fef08a';
                ctx.fillRect(0, 0, 24, 1);

                canvas.refresh();
            }
        }

        // 3. Steam Particle (8x8)
        if (!textures.exists('cafe_steam_particle')) {
            const canvas = textures.createCanvas('cafe_steam_particle', 8, 8);
            if (canvas) {
                const ctx = canvas.getContext();
                const grad = ctx.createRadialGradient(4, 4, 0, 4, 4, 4);
                grad.addColorStop(0, 'rgba(255, 255, 255, 0.75)');
                grad.addColorStop(0.5, 'rgba(226, 232, 240, 0.4)');
                grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, 8, 8);
                canvas.refresh();
            }
        }

        // 4. Espresso Machine (36x36)
        if (!textures.exists('cafe_espresso_machine')) {
            const canvas = textures.createCanvas('cafe_espresso_machine', 36, 36);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = '#334155';
                ctx.fillRect(2, 4, 32, 30);

                ctx.fillStyle = '#94a3b8';
                ctx.fillRect(4, 6, 28, 24);
                ctx.fillStyle = '#f8fafc';
                ctx.fillRect(5, 7, 26, 4);

                ctx.fillStyle = '#b45309';
                ctx.fillRect(8, 18, 6, 7);
                ctx.fillRect(22, 18, 6, 7);
                ctx.fillStyle = '#270e01';
                ctx.fillRect(6, 22, 4, 2);
                ctx.fillRect(20, 22, 4, 2);

                ctx.fillStyle = '#0f172a'; ctx.fillRect(6, 12, 4, 4); ctx.fillRect(26, 12, 4, 4);
                ctx.fillStyle = '#ef4444'; ctx.fillRect(7, 13, 2, 2);
                ctx.fillStyle = '#22c55e'; ctx.fillRect(27, 13, 2, 2);
                ctx.fillStyle = '#38bdf8'; ctx.fillRect(14, 13, 8, 3);

                ctx.fillStyle = '#1e293b';
                ctx.fillRect(4, 26, 28, 6);
                ctx.fillStyle = '#64748b';
                ctx.fillRect(5, 27, 26, 2);

                ctx.fillStyle = '#f8fafc';
                ctx.fillRect(9, 24, 4, 4);
                ctx.fillRect(23, 24, 4, 4);

                ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                ctx.fillRect(10, 0, 2, 3);
                ctx.fillRect(12, 2, 2, 3);
                ctx.fillRect(24, 0, 2, 3);

                canvas.refresh();
            }
        }

        // 5. Glass Pastry Showcase Display Cabinet (44x32)
        if (!textures.exists('cafe_pastry_display')) {
            const canvas = textures.createCanvas('cafe_pastry_display', 44, 32);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                ctx.fillRect(2, 28, 40, 4);

                ctx.fillStyle = '#1e293b';
                ctx.fillRect(0, 2, 44, 28);
                ctx.fillStyle = '#334155';
                ctx.fillRect(2, 0, 40, 2);

                ctx.fillStyle = '#0f172a';
                ctx.fillRect(2, 2, 40, 26);

                ctx.fillStyle = '#94a3b8';
                ctx.fillRect(3, 14, 38, 1);

                ctx.fillStyle = '#d97706';
                ctx.fillRect(6, 8, 8, 5);
                ctx.fillRect(18, 8, 8, 5);
                ctx.fillStyle = '#78350f';
                ctx.fillRect(30, 7, 7, 6);

                ctx.fillStyle = '#b45309';
                ctx.fillRect(5, 20, 6, 5);
                ctx.fillRect(13, 20, 6, 5);
                ctx.fillStyle = '#fde047';
                ctx.fillRect(22, 18, 9, 7);
                ctx.fillStyle = '#ef4444';
                ctx.fillRect(25, 18, 4, 2);
                ctx.fillStyle = '#a16207';
                ctx.fillRect(33, 18, 8, 7);

                ctx.fillStyle = 'rgba(186, 230, 253, 0.3)';
                ctx.fillRect(2, 2, 40, 26);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
                ctx.fillRect(5, 3, 2, 24);
                ctx.fillRect(12, 3, 1, 24);
                ctx.fillRect(36, 3, 2, 24);

                canvas.refresh();
            }
        }

        // 6. POS Register Standalone (24x24)
        if (!textures.exists('cafe_pos_terminal')) {
            const canvas = textures.createCanvas('cafe_pos_terminal', 24, 24);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(6, 18, 12, 6);

                ctx.fillStyle = '#1e293b';
                ctx.fillRect(2, 4, 20, 14);
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(4, 6, 16, 10);

                ctx.fillStyle = '#38bdf8';
                ctx.fillRect(6, 8, 12, 2);
                ctx.fillStyle = '#22c55e';
                ctx.fillRect(6, 11, 4, 3);
                ctx.fillRect(11, 11, 4, 3);

                canvas.refresh();
            }
        }
    }
}
