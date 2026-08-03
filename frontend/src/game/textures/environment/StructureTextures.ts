import Phaser from 'phaser';

export class StructureTextures {
    public static create(textures: Phaser.Textures.TextureManager) {
        this.drawDevGardenArch(textures);
        this.drawStreetLampProp(textures);
        this.drawFountainProp(textures);
        this.drawBenchProp(textures, 'bench_horizontal', 48, 18, true);
        this.drawBenchProp(textures, 'bench_vertical', 18, 48, false);
        this.drawFenceTextures(textures);
    }

    public static drawDevGardenArch(textures: Phaser.Textures.TextureManager) {
        if (textures.exists('dev_garden_arch')) return;
        const canvas = textures.createCanvas('dev_garden_arch', 128, 80);
        if (!canvas) return;
        const ctx = canvas.getContext();

        ctx.fillStyle = '#78350f';
        ctx.fillRect(12, 16, 16, 60);
        ctx.fillStyle = '#451a03';
        ctx.fillRect(20, 16, 8, 60);

        ctx.fillStyle = '#78350f';
        ctx.fillRect(100, 16, 16, 60);
        ctx.fillStyle = '#451a03';
        ctx.fillRect(108, 16, 8, 60);

        ctx.fillStyle = '#92400e';
        ctx.fillRect(4, 8, 120, 18);
        ctx.fillStyle = '#78350f';
        ctx.fillRect(4, 22, 120, 4);

        ctx.fillStyle = '#b45309';
        ctx.fillRect(0, 4, 128, 6);

        ctx.fillStyle = '#fef08a';
        ctx.fillRect(32, 12, 64, 12);
        ctx.strokeStyle = '#78350f';
        ctx.strokeRect(32, 12, 64, 12);

        ctx.fillStyle = '#451a03';
        ctx.font = 'bold 8px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('DEV GARDEN', 64, 21);

        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(16, 28, 8, 10);
        ctx.fillRect(104, 28, 8, 10);

        canvas.refresh();
    }

    public static drawStreetLampProp(textures: Phaser.Textures.TextureManager) {
        // 1. Street Lamp OFF (Daytime)
        if (!textures.exists('street_lamp')) {
            const canvas = textures.createCanvas('street_lamp', 32, 64);
            if (canvas) {
                const ctx = canvas.getContext();

                ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
                ctx.fillRect(10, 58, 12, 4);

                ctx.fillStyle = '#1e293b';
                ctx.fillRect(14, 16, 4, 44);
                ctx.fillRect(12, 54, 8, 4);

                ctx.fillStyle = '#334155';
                ctx.fillRect(10, 8, 12, 10);

                // Unlit frosted glass bulb
                ctx.fillStyle = '#94a3b8';
                ctx.fillRect(12, 10, 8, 6);

                canvas.refresh();
            }
        }

        // 2. Street Lamp ON (Nighttime)
        if (!textures.exists('street_lamp_on')) {
            const canvas = textures.createCanvas('street_lamp_on', 32, 64);
            if (canvas) {
                const ctx = canvas.getContext();

                ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
                ctx.fillRect(10, 58, 12, 4);

                ctx.fillStyle = '#1e293b';
                ctx.fillRect(14, 16, 4, 44);
                ctx.fillRect(12, 54, 8, 4);

                // Warm radial glow around head
                const glowGrad = ctx.createRadialGradient(16, 13, 2, 16, 13, 18);
                glowGrad.addColorStop(0, 'rgba(254, 240, 138, 0.9)');
                glowGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.4)');
                glowGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
                ctx.fillStyle = glowGrad;
                ctx.beginPath();
                ctx.arc(16, 13, 18, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#334155';
                ctx.fillRect(10, 8, 12, 10);

                // Lit glowing bulb
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(12, 10, 8, 6);
                ctx.fillStyle = '#fef08a';
                ctx.fillRect(13, 11, 6, 4);

                canvas.refresh();
            }
        }
    }

    public static drawFountainProp(textures: Phaser.Textures.TextureManager) {
        if (textures.exists('fountain_prop')) return;
        const canvas = textures.createCanvas('fountain_prop', 64, 64);
        if (!canvas) return;
        const ctx = canvas.getContext();

        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.arc(32, 40, 23, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#90a4ae';
        ctx.beginPath();
        ctx.arc(32, 40, 20, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#01579b';
        ctx.beginPath();
        ctx.arc(32, 40, 16, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#0288d1';
        ctx.beginPath();
        ctx.arc(28, 38, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#b0bec5';
        ctx.fillRect(28, 15, 8, 20);
        ctx.fillStyle = '#78909c';
        ctx.fillRect(32, 15, 4, 20);

        ctx.fillStyle = '#90a4ae';
        ctx.beginPath();
        ctx.arc(32, 15, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#00b0ff';
        ctx.beginPath();
        ctx.arc(32, 15, 7, 0, Math.PI * 2);
        ctx.fill();

        canvas.refresh();
    }

    public static drawBenchProp(textures: Phaser.Textures.TextureManager, key: string, w: number, h: number, isHorizontal: boolean) {
        if (textures.exists(key)) return;
        const canvas = textures.createCanvas(key, w, h);
        if (!canvas) return;
        const ctx = canvas.getContext();

        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        if (isHorizontal) {
            ctx.fillRect(4, h - 3, 6, 2);
            ctx.fillRect(w - 10, h - 3, 6, 2);

            ctx.fillStyle = '#a16207';
            ctx.fillRect(2, 2, w - 4, 4);
            ctx.fillRect(2, 8, w - 4, 4);

            ctx.fillStyle = '#374151';
            ctx.fillRect(4, 2, 2, 12);
            ctx.fillRect(w - 6, 2, 2, 12);
            ctx.fillRect(2, 6, w - 4, 2);
        } else {
            ctx.fillRect(w - 3, 4, 2, 6);
            ctx.fillRect(w - 3, h - 10, 2, 6);

            ctx.fillStyle = '#a16207';
            ctx.fillRect(2, 2, 4, h - 4);
            ctx.fillRect(8, 2, 4, h - 4);

            ctx.fillStyle = '#374151';
            ctx.fillRect(2, 4, 12, 2);
            ctx.fillRect(2, h - 6, 12, 2);
        }

        canvas.refresh();
    }

    public static drawFenceTextures(textures: Phaser.Textures.TextureManager) {
        // 1. Horizontal Wooden Picket Fence Segment (32x24)
        if (!textures.exists('fence_picket_horizontal')) {
            const canvas = textures.createCanvas('fence_picket_horizontal', 32, 24);
            if (canvas) {
                const ctx = canvas.getContext();

                // Soft drop shadow under fence
                ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
                ctx.fillRect(0, 20, 32, 3);

                // 2 Horizontal wooden rails behind pickets
                ctx.fillStyle = '#854d0e'; // Warm wood dark
                ctx.fillRect(0, 6, 32, 3);
                ctx.fillRect(0, 14, 32, 3);

                // 4 Vertical pickets with pointed tops per 32px block
                const pickets = [2, 10, 18, 26];
                pickets.forEach(px => {
                    // Picket body (warm cream/natural wood color)
                    ctx.fillStyle = '#fef3c7'; // Warm ivory
                    ctx.fillRect(px, 4, 4, 16);

                    // Pointed tip top
                    ctx.beginPath();
                    ctx.moveTo(px, 4);
                    ctx.lineTo(px + 2, 1);
                    ctx.lineTo(px + 4, 4);
                    ctx.closePath();
                    ctx.fill();

                    // Picket shadow outline for 2.5D depth
                    ctx.fillStyle = '#d97706'; // Warm wood shadow accent
                    ctx.fillRect(px + 3, 4, 1, 16);

                    // Picket nail heads on horizontal rails
                    ctx.fillStyle = '#451a03';
                    ctx.fillRect(px + 1, 7, 1, 1);
                    ctx.fillRect(px + 1, 15, 1, 1);
                });

                canvas.refresh();
            }
        }

        // 2. Vertical Wooden Picket Fence Segment (24x32)
        if (!textures.exists('fence_picket_vertical')) {
            const canvas = textures.createCanvas('fence_picket_vertical', 24, 32);
            if (canvas) {
                const ctx = canvas.getContext();

                // Shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
                ctx.fillRect(16, 0, 6, 32);

                // Vertical rails
                ctx.fillStyle = '#854d0e';
                ctx.fillRect(6, 0, 3, 32);
                ctx.fillRect(14, 0, 3, 32);

                // 4 Horizontal pickets along vertical side
                const pyList = [2, 10, 18, 26];
                pyList.forEach(py => {
                    ctx.fillStyle = '#fef3c7';
                    ctx.fillRect(2, py, 16, 4);

                    // Pointed tip right side
                    ctx.beginPath();
                    ctx.moveTo(18, py);
                    ctx.lineTo(21, py + 2);
                    ctx.lineTo(18, py + 4);
                    ctx.closePath();
                    ctx.fill();

                    ctx.fillStyle = '#d97706';
                    ctx.fillRect(2, py + 3, 16, 1);
                });

                canvas.refresh();
            }
        }

        // 3. Grand Gate Posts for Main Entrance (24x40)
        if (!textures.exists('fence_gate_post')) {
            const canvas = textures.createCanvas('fence_gate_post', 24, 40);
            if (canvas) {
                const ctx = canvas.getContext();

                // Base shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
                ctx.beginPath();
                ctx.ellipse(12, 36, 10, 4, 0, 0, Math.PI * 2);
                ctx.fill();

                // Wooden Pillar Body
                ctx.fillStyle = '#78350f'; // Dark wood
                ctx.fillRect(6, 10, 12, 28);
                ctx.fillStyle = '#b45309'; // Front highlight
                ctx.fillRect(8, 10, 6, 28);

                // Decorative Post Cap (Pyramid top)
                ctx.fillStyle = '#f59e0b'; // Amber cap
                ctx.fillRect(4, 8, 16, 4);
                ctx.beginPath();
                ctx.moveTo(4, 8);
                ctx.lineTo(12, 2);
                ctx.lineTo(20, 8);
                ctx.closePath();
                ctx.fill();

                // Lantern / Flower pot decoration on gate post top
                ctx.fillStyle = '#10b981'; // Green leaf trim
                ctx.fillRect(7, 6, 10, 2);

                canvas.refresh();
            }
        }

        // 4. Decorative Open Gate Door (32x24)
        if (!textures.exists('fence_gate_door')) {
            const canvas = textures.createCanvas('fence_gate_door', 32, 24);
            if (canvas) {
                const ctx = canvas.getContext();

                // Shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
                ctx.fillRect(2, 20, 28, 3);

                // Wooden frame
                ctx.fillStyle = '#92400e';
                ctx.fillRect(0, 4, 32, 16);

                // Inner lattice diagonal
                ctx.fillStyle = '#78350f';
                ctx.fillRect(2, 6, 28, 12);

                // Golden handle / latch
                ctx.fillStyle = '#f59e0b';
                ctx.fillRect(26, 10, 4, 4);

                // Warm picket slats on gate
                const gPickets = [4, 11, 18, 25];
                gPickets.forEach(px => {
                    ctx.fillStyle = '#fde68a';
                    ctx.fillRect(px, 2, 4, 18);
                    ctx.beginPath();
                    ctx.moveTo(px, 2);
                    ctx.lineTo(px + 2, 0);
                    ctx.lineTo(px + 4, 2);
                    ctx.closePath();
                    ctx.fill();
                });

                canvas.refresh();
            }
        }
    }
}
