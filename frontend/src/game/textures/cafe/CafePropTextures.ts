import Phaser from 'phaser';

export class CafePropTextures {
    public static create(textures: Phaser.Textures.TextureManager) {
        this.drawCafeCounters(textures);
        this.drawCafeBarista(textures);
        this.drawCafeEspressoMachine(textures);
        this.drawCafePastryDisplay(textures);
        this.drawCafePOSTerminal(textures);
        this.drawCafeSteamParticle(textures);
    }

    private static drawCafeCounters(textures: Phaser.Textures.TextureManager) {
        if (!textures.exists('cafe_counter')) {
            const canvas = textures.createCanvas('cafe_counter', 48, 32);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = '#451a03';
                ctx.fillRect(0, 0, 48, 32);

                ctx.fillStyle = '#78350f';
                ctx.fillRect(2, 2, 44, 12);
                ctx.fillStyle = '#b45309';
                ctx.fillRect(2, 2, 44, 2);

                ctx.fillStyle = '#270e01';
                ctx.fillRect(2, 14, 44, 16);
                ctx.fillStyle = '#451a03';
                ctx.fillRect(4, 16, 18, 12);
                ctx.fillRect(26, 16, 18, 12);

                canvas.refresh();
            }
        }

        if (!textures.exists('cafe_counter_side')) {
            const canvas = textures.createCanvas('cafe_counter_side', 32, 48);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = '#451a03';
                ctx.fillRect(0, 0, 32, 48);

                ctx.fillStyle = '#78350f';
                ctx.fillRect(2, 2, 12, 44);
                ctx.fillStyle = '#b45309';
                ctx.fillRect(2, 2, 2, 44);

                ctx.fillStyle = '#270e01';
                ctx.fillRect(14, 2, 16, 44);
                ctx.fillStyle = '#451a03';
                ctx.fillRect(16, 4, 12, 18);
                ctx.fillRect(16, 26, 12, 18);

                canvas.refresh();
            }
        }
    }

    private static drawCafeBarista(textures: Phaser.Textures.TextureManager) {
        if (!textures.exists('cafe_barista')) {
            const canvas = textures.createCanvas('cafe_barista', 32, 48);
            if (canvas) {
                const ctx = canvas.getContext();

                ctx.fillStyle = 'rgba(0,0,0,0.2)';
                ctx.beginPath();
                ctx.ellipse(16, 44, 10, 4, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#1e293b';
                ctx.fillRect(10, 32, 5, 12);
                ctx.fillRect(17, 32, 5, 12);

                ctx.fillStyle = '#0f172a';
                ctx.fillRect(9, 42, 6, 4);
                ctx.fillRect(17, 42, 6, 4);

                ctx.fillStyle = '#ffffff';
                ctx.fillRect(8, 18, 16, 16);

                ctx.fillStyle = '#15803d';
                ctx.fillRect(8, 22, 16, 12);
                ctx.fillRect(12, 18, 8, 4);

                ctx.fillStyle = '#fbcfe8';
                ctx.fillRect(10, 8, 12, 11);

                ctx.fillStyle = '#451a03';
                ctx.fillRect(9, 5, 14, 5);
                ctx.fillRect(8, 7, 3, 7);

                ctx.fillStyle = '#000000';
                ctx.fillRect(13, 11, 2, 2);
                ctx.fillRect(18, 11, 2, 2);

                ctx.fillStyle = '#f43f5e';
                ctx.fillRect(14, 15, 4, 1);

                ctx.fillStyle = '#15803d';
                ctx.fillRect(7, 4, 18, 3);
                ctx.fillRect(9, 2, 14, 3);

                canvas.refresh();
            }
        }
    }

    private static drawCafeEspressoMachine(textures: Phaser.Textures.TextureManager) {
        if (!textures.exists('cafe_espresso_machine')) {
            const canvas = textures.createCanvas('cafe_espresso_machine', 28, 24);
            if (canvas) {
                const ctx = canvas.getContext();

                ctx.fillStyle = '#64748b';
                ctx.fillRect(2, 2, 24, 20);

                ctx.fillStyle = '#f8fafc';
                ctx.fillRect(4, 4, 20, 6);

                ctx.fillStyle = '#334155';
                ctx.fillRect(4, 12, 20, 8);

                ctx.fillStyle = '#ef4444';
                ctx.fillRect(6, 6, 2, 2);
                ctx.fillStyle = '#22c55e';
                ctx.fillRect(10, 6, 2, 2);

                ctx.fillStyle = '#0f172a';
                ctx.fillRect(8, 14, 3, 4);
                ctx.fillRect(17, 14, 3, 4);

                ctx.fillStyle = '#e2e8f0';
                ctx.fillRect(7, 18, 5, 3);
                ctx.fillRect(16, 18, 5, 3);

                canvas.refresh();
            }
        }

    }

    private static drawCafePastryDisplay(textures: Phaser.Textures.TextureManager) {
        if (!textures.exists('cafe_pastry_display')) {
            const canvas = textures.createCanvas('cafe_pastry_display', 32, 24);
            if (canvas) {
                const ctx = canvas.getContext();

                ctx.fillStyle = '#38bdf8';
                ctx.fillRect(2, 2, 28, 20);

                ctx.fillStyle = '#ffffff';
                ctx.fillRect(2, 2, 28, 2);
                ctx.fillRect(2, 2, 2, 20);

                ctx.fillStyle = '#78350f';
                ctx.fillRect(4, 12, 24, 2);

                ctx.fillStyle = '#d97706';
                ctx.fillRect(6, 7, 4, 3);
                ctx.fillRect(14, 6, 5, 4);
                ctx.fillRect(22, 7, 4, 3);

                ctx.fillStyle = '#f59e0b';
                ctx.fillRect(6, 16, 5, 3);
                ctx.fillStyle = '#ec4899';
                ctx.fillRect(15, 15, 4, 4);
                ctx.fillStyle = '#84cc16';
                ctx.fillRect(22, 16, 4, 3);

                canvas.refresh();
            }
        }
    }

    private static drawCafePOSTerminal(textures: Phaser.Textures.TextureManager) {
        if (!textures.exists('cafe_pos_terminal')) {
            const canvas = textures.createCanvas('cafe_pos_terminal', 16, 18);
            if (canvas) {
                const ctx = canvas.getContext();

                ctx.fillStyle = '#1e293b';
                ctx.fillRect(4, 12, 8, 4);

                ctx.fillStyle = '#0f172a';
                ctx.fillRect(2, 2, 12, 10);

                ctx.fillStyle = '#38bdf8';
                ctx.fillRect(3, 3, 10, 8);

                ctx.fillStyle = '#22c55e';
                ctx.fillRect(4, 5, 4, 1);
                ctx.fillRect(4, 7, 6, 1);

                canvas.refresh();
            }
        }
    }

    private static drawCafeSteamParticle(textures: Phaser.Textures.TextureManager) {
        if (!textures.exists('cafe_steam_particle')) {
            const canvas = textures.createCanvas('cafe_steam_particle', 8, 8);
            if (canvas) {
                const ctx = canvas.getContext();

                const grad = ctx.createRadialGradient(4, 4, 0, 4, 4, 4);
                grad.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
                grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(4, 4, 4, 0, Math.PI * 2);
                ctx.fill();

                canvas.refresh();
            }
        }
    }
}
