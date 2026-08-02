import Phaser from 'phaser';

export class VegetationTextures {
    public static create(textures: Phaser.Textures.TextureManager) {
        this.drawTreeProp(textures);
        this.drawSakuraTreeProp(textures);
        this.drawBambooProp(textures);
        this.drawFlowerPotProp(textures);
        this.drawLeaderboardTree(textures);
        this.drawStarTreeStages(textures);
        this.drawPetalParticle(textures);
        this.drawFireflyParticle(textures);
    }

    private static drawTreeProp(textures: Phaser.Textures.TextureManager) {
        if (textures.exists('tree_prop')) return;
        const canvas = textures.createCanvas('tree_prop', 64, 80);
        if (!canvas) return;
        const ctx = canvas.getContext();

        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.arc(32, 62, 13, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#5d4037';
        ctx.fillRect(28, 48, 8, 22);
        ctx.fillStyle = '#3e2723';
        ctx.fillRect(32, 48, 4, 22);

        ctx.fillStyle = '#1b5e20';
        ctx.beginPath();
        ctx.arc(32, 28, 24, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#2e7d32';
        ctx.beginPath();
        ctx.arc(26, 24, 18, 0, Math.PI * 2);
        ctx.arc(40, 26, 16, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#4caf50';
        ctx.beginPath();
        ctx.arc(22, 18, 12, 0, Math.PI * 2);
        ctx.arc(34, 16, 10, 0, Math.PI * 2);
        ctx.fill();

        canvas.refresh();
    }

    private static drawSakuraTreeProp(textures: Phaser.Textures.TextureManager) {
        if (textures.exists('sakura_tree_prop')) return;
        const canvas = textures.createCanvas('sakura_tree_prop', 64, 80);
        if (!canvas) return;
        const ctx = canvas.getContext();

        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.arc(32, 62, 13, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#451a03';
        ctx.fillRect(28, 46, 8, 24);
        ctx.fillStyle = '#290e02';
        ctx.fillRect(32, 46, 4, 24);

        ctx.fillStyle = '#be185d';
        ctx.beginPath();
        ctx.arc(32, 28, 24, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#f472b6';
        ctx.beginPath();
        ctx.arc(26, 24, 18, 0, Math.PI * 2);
        ctx.arc(40, 26, 16, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#fbcfe8';
        ctx.beginPath();
        ctx.arc(22, 18, 12, 0, Math.PI * 2);
        ctx.arc(34, 16, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(20, 20, 2, 2);
        ctx.fillRect(38, 24, 2, 2);
        ctx.fillRect(28, 14, 2, 2);

        canvas.refresh();
    }

    private static drawBambooProp(textures: Phaser.Textures.TextureManager) {
        if (textures.exists('bamboo_prop')) return;
        const canvas = textures.createCanvas('bamboo_prop', 32, 64);
        if (!canvas) return;
        const ctx = canvas.getContext();

        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(6, 58, 20, 4);

        const stalks = [8, 16, 24];
        stalks.forEach((sx, idx) => {
            ctx.fillStyle = '#15803d';
            ctx.fillRect(sx, 12 + (idx * 4), 4, 46 - (idx * 4));

            ctx.fillStyle = '#86efac';
            for (let ny = 20; ny < 55; ny += 12) {
                ctx.fillRect(sx - 1, ny, 6, 2);
            }

            ctx.fillStyle = '#22c55e';
            ctx.beginPath();
            ctx.moveTo(sx + 2, 18);
            ctx.lineTo(sx + 12, 12);
            ctx.lineTo(sx + 4, 22);
            ctx.fill();
        });

        canvas.refresh();
    }

    private static drawFlowerPotProp(textures: Phaser.Textures.TextureManager) {
        if (textures.exists('flower_pot')) return;
        const canvas = textures.createCanvas('flower_pot', 20, 24);
        if (!canvas) return;
        const ctx = canvas.getContext();

        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(3, 21, 14, 3);

        ctx.fillStyle = '#ea580c';
        ctx.fillRect(4, 12, 12, 9);
        ctx.fillStyle = '#c2410c';
        ctx.fillRect(3, 10, 14, 3);
        ctx.fillStyle = '#9a3412';
        ctx.fillRect(13, 12, 3, 9);

        ctx.fillStyle = '#15803d';
        ctx.beginPath();
        ctx.arc(10, 8, 7, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.arc(8, 6, 5, 0, Math.PI * 2);
        ctx.arc(12, 7, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#4ade80';
        ctx.fillRect(7, 4, 2, 2);
        ctx.fillRect(11, 5, 2, 2);

        ctx.fillStyle = '#ef4444';
        ctx.fillRect(5, 6, 3, 3);
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(6, 7, 1, 1);

        ctx.fillStyle = '#f472b6';
        ctx.fillRect(12, 5, 3, 3);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(13, 6, 1, 1);

        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(9, 3, 3, 3);

        canvas.refresh();
    }

    private static drawLeaderboardTree(textures: Phaser.Textures.TextureManager) {
        if (textures.exists('leaderboard_tree')) return;
        const canvas = textures.createCanvas('leaderboard_tree', 64, 80);
        if (!canvas) return;
        const ctx = canvas.getContext();

        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.fillRect(24, 66, 16, 4);

        ctx.fillStyle = '#78350f';
        ctx.fillRect(28, 30, 8, 38);
        ctx.fillStyle = '#451a03';
        ctx.fillRect(32, 30, 4, 38);

        ctx.fillStyle = '#92400e';
        ctx.fillRect(4, 2, 56, 32);

        ctx.fillStyle = '#1e1b4b';
        ctx.fillRect(8, 5, 48, 26);

        ctx.fillStyle = '#4b5563';
        ctx.fillRect(10, 0, 2, 3);
        ctx.fillRect(52, 0, 2, 3);

        canvas.refresh();

        if (!textures.exists('leaderboard_crown_icon')) {
            const crownCanvas = textures.createCanvas('leaderboard_crown_icon', 16, 16);
            if (crownCanvas) {
                const crownCtx = crownCanvas.getContext();
                crownCtx.fillStyle = '#fbbf24';
                crownCtx.beginPath();
                crownCtx.moveTo(2, 12);
                crownCtx.lineTo(14, 12);
                crownCtx.lineTo(14, 6);
                crownCtx.lineTo(11, 9);
                crownCtx.lineTo(8, 3);
                crownCtx.lineTo(5, 9);
                crownCtx.lineTo(2, 6);
                crownCtx.closePath();
                crownCtx.fill();

                crownCtx.fillStyle = '#ef4444';
                crownCtx.fillRect(7, 9, 2, 2);
                crownCanvas.refresh();
            }
        }
    }

    private static drawStarTreeStages(textures: Phaser.Textures.TextureManager) {
        if (!textures.exists('star_tree_stage_1')) {
            const canvas = textures.createCanvas('star_tree_stage_1', 64, 64);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = 'rgba(0,0,0,0.15)';
                ctx.beginPath(); ctx.arc(32, 54, 12, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#854d0e';
                ctx.beginPath(); ctx.arc(32, 54, 8, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#22c55e';
                ctx.fillRect(31, 40, 2, 14);
                ctx.beginPath();
                ctx.ellipse(27, 43, 5, 3, -Math.PI / 6, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.ellipse(37, 41, 5, 3, Math.PI / 6, 0, Math.PI * 2);
                ctx.fill();
                canvas.refresh();
            }
        }

        if (!textures.exists('star_tree_stage_2')) {
            const canvas = textures.createCanvas('star_tree_stage_2', 64, 64);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = 'rgba(0,0,0,0.18)';
                ctx.beginPath(); ctx.arc(32, 54, 14, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#78350f';
                ctx.fillRect(30, 36, 4, 18);
                ctx.fillStyle = '#15803d';
                ctx.beginPath(); ctx.arc(32, 28, 12, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(24, 30, 8, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(40, 30, 8, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#22c55e';
                ctx.beginPath(); ctx.arc(30, 25, 8, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(35, 26, 6, 0, Math.PI * 2); ctx.fill();
                canvas.refresh();
            }
        }

        if (!textures.exists('star_tree_stage_3')) {
            const canvas = textures.createCanvas('star_tree_stage_3', 64, 80);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = 'rgba(0,0,0,0.2)';
                ctx.beginPath(); ctx.arc(32, 70, 18, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#451a03';
                ctx.fillRect(29, 44, 6, 26);
                ctx.fillStyle = '#78350f';
                ctx.fillRect(29, 44, 3, 26);
                ctx.fillStyle = '#065f46';
                ctx.beginPath(); ctx.arc(32, 30, 22, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#059669';
                ctx.beginPath(); ctx.arc(24, 28, 16, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(40, 30, 15, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#34d399';
                ctx.beginPath(); ctx.arc(32, 20, 12, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#fbbf24';
                ctx.fillRect(22, 18, 2, 2);
                ctx.fillRect(42, 24, 2, 2);
                ctx.fillRect(30, 34, 2, 2);
                canvas.refresh();
            }
        }

        if (!textures.exists('star_tree_stage_4')) {
            const canvas = textures.createCanvas('star_tree_stage_4', 80, 96);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = 'rgba(0,0,0,0.25)';
                ctx.beginPath(); ctx.arc(40, 84, 24, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#d97706';
                ctx.fillRect(36, 52, 8, 32);
                ctx.fillStyle = '#f59e0b';
                ctx.fillRect(36, 52, 4, 32);
                ctx.fillStyle = '#311b92';
                ctx.beginPath(); ctx.arc(40, 36, 28, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#4a148c';
                ctx.beginPath(); ctx.arc(26, 32, 20, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(54, 34, 18, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#00e5ff';
                ctx.beginPath(); ctx.arc(40, 22, 16, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#ffd700';
                ctx.fillRect(24, 24, 3, 3);
                ctx.fillRect(56, 26, 3, 3);
                ctx.fillRect(38, 14, 4, 4);
                canvas.refresh();
            }
        }
    }

    private static drawPetalParticle(textures: Phaser.Textures.TextureManager) {
        if (textures.exists('sakura_petal')) return;
        const canvas = textures.createCanvas('sakura_petal', 6, 6);
        if (!canvas) return;
        const ctx = canvas.getContext();
        ctx.fillStyle = '#f472b6';
        ctx.beginPath();
        ctx.arc(3, 3, 2.5, 0, Math.PI * 2);
        ctx.fill();
        canvas.refresh();
    }

    private static drawFireflyParticle(textures: Phaser.Textures.TextureManager) {
        if (textures.exists('firefly_particle')) return;
        const canvas = textures.createCanvas('firefly_particle', 6, 6);
        if (!canvas) return;
        const ctx = canvas.getContext();
        const grad = ctx.createRadialGradient(3, 3, 0, 3, 3, 3);
        grad.addColorStop(0, '#fef08a');
        grad.addColorStop(1, 'rgba(254, 240, 138, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(3, 3, 3, 0, Math.PI * 2);
        ctx.fill();
        canvas.refresh();
    }
}
