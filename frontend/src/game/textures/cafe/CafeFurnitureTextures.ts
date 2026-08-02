import Phaser from 'phaser';

export class CafeFurnitureTextures {
    public static create(textures: Phaser.Textures.TextureManager) {
        this.drawCafeUmbrellaTable(textures);
        this.drawCafeInteriorTables(textures);
        this.drawCafeChairs(textures);
        this.drawCafeBookshelf(textures);
        this.drawCafeGardenPlanterAndPot(textures);
    }

    private static drawCafeUmbrellaTable(textures: Phaser.Textures.TextureManager) {
        if (textures.exists('cafe_umbrella_table')) return;
        const canvas = textures.createCanvas('cafe_umbrella_table', 48, 48);
        if (!canvas) return;
        const ctx = canvas.getContext();

        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.arc(24, 26, 18, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#78350f';
        ctx.beginPath();
        ctx.arc(24, 24, 14, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.arc(24, 20, 22, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#f8fafc';
        for (let i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.moveTo(24, 20);
            ctx.arc(24, 20, 22, (i * Math.PI) / 2, (i * Math.PI) / 2 + Math.PI / 4);
            ctx.closePath();
            ctx.fill();
        }

        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(24, 20, 3, 0, Math.PI * 2);
        ctx.fill();

        canvas.refresh();
    }

    private static drawCafeInteriorTables(textures: Phaser.Textures.TextureManager) {
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
    }

    private static drawCafeChairs(textures: Phaser.Textures.TextureManager) {
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

        if (!textures.exists('cafe_interior_chair')) {
            const canvas = textures.createCanvas('cafe_interior_chair', 22, 28);
            if (canvas) {
                const ctx = canvas.getContext();
                const base = textures.get('cafe_chair_down').getSourceImage() as CanvasImageSource;
                ctx.drawImage(base, 0, 0);
                canvas.refresh();
            }
        }

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
    }

    private static drawCafeBookshelf(textures: Phaser.Textures.TextureManager) {
        if (!textures.exists('cafe_bookshelf')) {
            const canvas = textures.createCanvas('cafe_bookshelf', 56, 88);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
                ctx.fillRect(4, 4, 52, 84);

                ctx.fillStyle = '#270e01';
                ctx.fillRect(0, 0, 56, 88);

                ctx.fillStyle = '#451a03';
                ctx.fillRect(2, 2, 52, 84);

                ctx.fillStyle = '#1c0a02';
                ctx.fillRect(5, 12, 46, 72);

                ctx.fillStyle = '#78350f';
                ctx.fillRect(2, 10, 3, 76);
                ctx.fillRect(51, 10, 3, 76);

                ctx.fillStyle = '#78350f';
                ctx.fillRect(0, 0, 56, 10);
                ctx.fillStyle = '#b45309';
                ctx.fillRect(2, 2, 52, 2);

                const shelfYPositions = [28, 48, 68, 84];
                shelfYPositions.forEach(sy => {
                    ctx.fillStyle = '#451a03';
                    ctx.fillRect(4, sy, 48, 4);
                    ctx.fillStyle = '#78350f';
                    ctx.fillRect(4, sy, 48, 2);
                });

                canvas.refresh();
            }
        }
    }

    private static drawCafeGardenPlanterAndPot(textures: Phaser.Textures.TextureManager) {
        if (!textures.exists('cafe_center_garden_planter')) {
            const canvas = textures.createCanvas('cafe_center_garden_planter', 176, 536);
            if (canvas) {
                const ctx = canvas.getContext();

                ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
                ctx.fillRect(4, 8, 168, 524);

                ctx.fillStyle = '#2b1003';
                ctx.fillRect(4, 4, 160, 520);

                ctx.fillStyle = '#78350f';
                ctx.fillRect(8, 8, 152, 512);

                ctx.fillStyle = '#1a6323';
                ctx.fillRect(20, 20, 120, 480);

                canvas.refresh();
            }
        }

        if (!textures.exists('cafe_garden_lamp_post')) {
            const canvas = textures.createCanvas('cafe_garden_lamp_post', 24, 48);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                ctx.beginPath();
                ctx.ellipse(12, 44, 10, 3, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#451a03';
                ctx.fillRect(6, 38, 12, 6);

                ctx.fillStyle = '#270e01';
                ctx.fillRect(10, 18, 4, 18);

                ctx.fillStyle = '#fef08a';
                ctx.fillRect(8, 11, 8, 5);

                canvas.refresh();
            }
        }

        if (!textures.exists('cafe_luxury_plant_pot')) {
            const canvas = textures.createCanvas('cafe_luxury_plant_pot', 32, 56);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                ctx.beginPath();
                ctx.ellipse(16, 52, 14, 4, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#c2410c';
                ctx.fillRect(8, 32, 16, 19);

                ctx.fillStyle = '#166534';
                ctx.beginPath(); ctx.ellipse(16, 18, 14, 10, 0, 0, Math.PI * 2); ctx.fill();

                canvas.refresh();
            }
        }
    }
}
