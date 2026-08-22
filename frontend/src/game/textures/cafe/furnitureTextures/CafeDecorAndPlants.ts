import Phaser from 'phaser';

export class CafeDecorAndPlants {
    public static draw(textures: Phaser.Textures.TextureManager) {
        // 1. Centerpiece Grand Garden Planter Island (176x536)
        if (!textures.exists('cafe_center_garden_planter')) {
            const canvas = textures.createCanvas('cafe_center_garden_planter', 176, 536);
            if (canvas) {
                const ctx = canvas.getContext();

                ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
                if (ctx.roundRect) {
                    ctx.roundRect(4, 8, 168, 524, 12);
                } else {
                    ctx.rect(4, 8, 168, 524);
                }
                ctx.fill();

                ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
                if (ctx.roundRect) {
                    ctx.roundRect(8, 12, 160, 516, 8);
                } else {
                    ctx.rect(8, 12, 160, 516);
                }
                ctx.fill();

                const ox = 4;
                const oy = 4;

                ctx.fillStyle = '#2b1003';
                ctx.fillRect(ox, oy, 160, 520);

                ctx.fillStyle = '#78350f';
                ctx.fillRect(ox + 4, oy + 4, 152, 512);

                ctx.fillStyle = '#92400e';
                ctx.fillRect(ox + 6, oy + 6, 148, 508);

                ctx.fillStyle = '#b45309';
                ctx.fillRect(ox + 4, oy + 4, 152, 4);
                ctx.fillRect(ox + 4, oy + 4, 4, 512);
                ctx.fillStyle = '#d97706';
                ctx.fillRect(ox + 6, oy + 6, 148, 2);
                ctx.fillRect(ox + 6, oy + 6, 2, 508);

                for (let py = 40; py < 510; py += 40) {
                    ctx.fillStyle = '#451a03';
                    ctx.fillRect(ox + 4, oy + py, 152, 3);
                    ctx.fillStyle = '#d97706';
                    ctx.fillRect(ox + 4, oy + py + 3, 152, 1);
                }

                const drawBrassCorner = (cx: number, cy: number) => {
                    ctx.fillStyle = '#b45309'; ctx.fillRect(ox + cx, oy + cy, 12, 12);
                    ctx.fillStyle = '#fef08a'; ctx.fillRect(ox + cx + 2, oy + cy + 2, 8, 8);
                    ctx.fillStyle = '#78350f'; ctx.fillRect(ox + cx + 4, oy + cy + 4, 4, 4);
                };
                drawBrassCorner(6, 6);
                drawBrassCorner(142, 6);
                drawBrassCorner(6, 502);
                drawBrassCorner(142, 502);

                ctx.fillStyle = '#451a03';
                ctx.fillRect(ox + 20, oy + 20, 120, 480);
                ctx.fillStyle = '#270e01';
                ctx.fillRect(ox + 22, oy + 22, 116, 476);

                ctx.fillStyle = '#1c0a02';
                ctx.fillRect(ox + 24, oy + 24, 112, 472);
                ctx.fillStyle = '#0a230d';
                ctx.fillRect(ox + 26, oy + 26, 108, 468);

                const drawBushClump = (cx: number, cy: number, rx: number, ry: number) => {
                    ctx.fillStyle = '#0a230d';
                    ctx.beginPath();
                    ctx.ellipse(ox + cx, oy + cy + 2, rx + 1, ry + 1, 0, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.fillStyle = '#1a6323';
                    ctx.beginPath();
                    ctx.ellipse(ox + cx, oy + cy, rx, ry, 0, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.fillStyle = '#268a32';
                    ctx.beginPath();
                    ctx.ellipse(ox + cx - Math.floor(rx * 0.2), oy + cy - Math.floor(ry * 0.2), Math.floor(rx * 0.75), Math.floor(ry * 0.75), 0, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.fillStyle = '#3dbd4a';
                    ctx.beginPath();
                    ctx.ellipse(ox + cx - Math.floor(rx * 0.35), oy + cy - Math.floor(ry * 0.35), Math.floor(rx * 0.5), Math.floor(ry * 0.5), 0, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.fillStyle = '#94f36c';
                    ctx.beginPath();
                    ctx.ellipse(ox + cx - Math.floor(rx * 0.45), oy + cy - Math.floor(ry * 0.45), Math.floor(rx * 0.25), Math.floor(ry * 0.25), 0, 0, Math.PI * 2);
                    ctx.fill();
                };

                const rows = 31;
                for (let r = 0; r < rows; r++) {
                    const cy = 30 + r * 15;
                    drawBushClump(50 + (r % 2 === 0 ? -2 : 2), cy, 22, 14);
                    drawBushClump(110 + (r % 2 === 0 ? 2 : -2), cy, 22, 14);
                    drawBushClump(80, cy - 2, 24, 15);
                }

                const pRand = (a: number, b: number) => {
                    const n = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
                    return n - Math.floor(n);
                };

                for (let y = 32; y <= 488; y += 15) {
                    for (let x = 36; x <= 124; x += 16) {
                        const fRand = pRand(x * 7, y * 13);
                        if (fRand > 0.38) {
                            const fx = ox + x + (pRand(x, y) - 0.5) * 5;
                            const fy = oy + y + (pRand(y, x) - 0.5) * 5;
                            const flowerType = Math.floor(fRand * 10) % 4;

                            if (flowerType === 0) {
                                ctx.fillStyle = '#f472b6'; ctx.beginPath(); ctx.arc(fx, fy, 3.5, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = '#db2777'; ctx.beginPath(); ctx.arc(fx - 0.5, fy - 0.5, 2, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = '#fef08a'; ctx.fillRect(fx - 0.5, fy - 0.5, 1, 1);
                            } else if (flowerType === 1) {
                                ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(fx, fy, 3, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = '#fef08a'; ctx.beginPath(); ctx.arc(fx, fy, 1.5, 0, Math.PI * 2); ctx.fill();
                            } else if (flowerType === 2) {
                                ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(fx, fy, 3.5, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = '#d97706'; ctx.beginPath(); ctx.arc(fx, fy, 1.5, 0, Math.PI * 2); ctx.fill();
                            } else {
                                ctx.fillStyle = '#c084fc'; ctx.fillRect(fx - 1, fy - 2, 3, 5);
                                ctx.fillStyle = '#e9d5ff'; ctx.fillRect(fx, fy - 1, 1, 3);
                            }
                        }
                    }
                }

                canvas.refresh();
            }
        }

        // 2. Standalone Garden Lamp Post (24x58 - Original lamp style with taller post height)
        if (!textures.exists('cafe_garden_lamp_post')) {
            const canvas = textures.createCanvas('cafe_garden_lamp_post', 24, 58);
            if (canvas) {
                const ctx = canvas.getContext();

                // Floor Drop Shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                ctx.beginPath();
                ctx.ellipse(12, 54, 10, 3, 0, 0, Math.PI * 2);
                ctx.fill();

                // Base Wooden Block & Brass Trim
                ctx.fillStyle = '#451a03';
                ctx.fillRect(6, 48, 12, 6);
                ctx.fillStyle = '#f59e0b';
                ctx.fillRect(7, 46, 10, 2);

                // Taller Wooden Post (Extended height)
                ctx.fillStyle = '#270e01';
                ctx.fillRect(10, 18, 4, 28);

                // Radial Glow
                const glowGrad = ctx.createRadialGradient(12, 12, 2, 12, 12, 16);
                glowGrad.addColorStop(0, 'rgba(254, 240, 138, 0.9)');
                glowGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.4)');
                glowGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
                ctx.fillStyle = glowGrad;
                ctx.beginPath();
                ctx.arc(12, 12, 16, 0, Math.PI * 2);
                ctx.fill();

                // Lantern Head Top & Body (Original exact art)
                ctx.fillStyle = '#78350f';
                ctx.fillRect(8, 16, 8, 3);
                ctx.fillStyle = '#f59e0b';
                ctx.beginPath();
                ctx.moveTo(4, 12);
                ctx.lineTo(20, 12);
                ctx.lineTo(12, 4);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = '#ffffff';
                ctx.fillRect(8, 11, 8, 5);
                ctx.fillStyle = '#fef08a';
                ctx.fillRect(9, 10, 6, 6);

                canvas.refresh();
            }
        }

        // 3. Luxury Plant Pot (32x56)
        if (!textures.exists('cafe_luxury_plant_pot')) {
            const canvas = textures.createCanvas('cafe_luxury_plant_pot', 32, 56);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                ctx.beginPath();
                ctx.ellipse(16, 52, 14, 4, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#c2410c';
                ctx.beginPath();
                ctx.moveTo(8, 32);
                ctx.lineTo(24, 32);
                ctx.lineTo(21, 51);
                ctx.lineTo(11, 51);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = '#f8fafc';
                ctx.fillRect(7, 30, 18, 4);

                ctx.fillStyle = '#f59e0b';
                ctx.fillRect(9, 40, 14, 2);

                ctx.fillStyle = '#1c0a02';
                ctx.ellipse(16, 31, 8, 2, 0, 0, Math.PI * 2);

                ctx.fillStyle = '#14532d';
                ctx.fillRect(14, 18, 4, 13);
                ctx.fillRect(10, 20, 3, 11);
                ctx.fillRect(19, 20, 3, 11);

                ctx.fillStyle = '#166534';
                ctx.beginPath(); ctx.ellipse(16, 18, 14, 10, 0, 0, Math.PI * 2); ctx.fill();

                ctx.fillStyle = '#15803d';
                ctx.beginPath(); ctx.ellipse(12, 14, 10, 8, 0, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.ellipse(20, 14, 10, 8, 0, 0, Math.PI * 2); ctx.fill();

                ctx.fillStyle = '#16a34a';
                ctx.beginPath(); ctx.ellipse(16, 10, 11, 8, 0, 0, Math.PI * 2); ctx.fill();

                ctx.fillStyle = '#4ade80';
                ctx.beginPath(); ctx.ellipse(14, 8, 6, 4, 0, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.ellipse(21, 11, 5, 3, 0, 0, Math.PI * 2); ctx.fill();

                canvas.refresh();
            }
        }

        // 4. Entrance Gateway Step Portal Mat (256x160 canvas, Realistic Woven Coir / Jute Floor Rug)
        if (!textures.exists('cafe_entrance_gateway')) {
            const canvas = textures.createCanvas('cafe_entrance_gateway', 256, 160);
            if (canvas) {
                const ctx = canvas.getContext();

                // Soft ambient drop shadow underneath on wooden floor
                ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
                ctx.beginPath();
                ctx.roundRect(8, 12, 240, 140, 12);
                ctx.fill();

                // Heavy Black Vulcanized Rubber Non-Slip Mat Base & Outer Border
                ctx.fillStyle = '#1c1917';
                ctx.beginPath();
                ctx.roundRect(6, 8, 244, 144, 10);
                ctx.fill();

                // Rubber Edge Highlight & Texture Grooves
                ctx.fillStyle = '#292524';
                ctx.beginPath();
                ctx.roundRect(8, 10, 240, 140, 8);
                ctx.fill();

                ctx.strokeStyle = '#44403c';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.roundRect(10, 12, 236, 136, 6);
                ctx.stroke();

                // Heavy Braided Coir Fiber Main Bed (Rich Natural Coconut Coir / Jute)
                ctx.fillStyle = '#92613b';
                ctx.fillRect(16, 18, 224, 124);

                // Dense woven ribbing / texture across coir bristles
                for (let y = 18; y < 142; y += 3) {
                    ctx.fillStyle = (Math.floor(y / 3) % 2 === 0) ? '#a57348' : '#7f502c';
                    ctx.fillRect(16, y, 224, 2);
                }

                // Micro speckling / woven cross-hatch fiber details
                for (let x = 18; x < 238; x += 4) {
                    for (let y = 19; y < 140; y += 6) {
                        const rand = ((x * 17 + y * 31) % 100) / 100;
                        if (rand > 0.6) {
                            ctx.fillStyle = 'rgba(254, 243, 199, 0.12)';
                            ctx.fillRect(x, y, 2, 2);
                        } else if (rand < 0.3) {
                            ctx.fillStyle = 'rgba(41, 23, 10, 0.28)';
                            ctx.fillRect(x, y, 2, 2);
                        }
                    }
                }

                // Inner Stenciled Border Box (Matte Carbon Black Ink)
                ctx.strokeStyle = 'rgba(28, 25, 23, 0.85)';
                ctx.lineWidth = 4;
                ctx.strokeRect(26, 26, 204, 108);

                ctx.strokeStyle = 'rgba(68, 64, 60, 0.4)';
                ctx.lineWidth = 1;
                ctx.strokeRect(24, 24, 208, 112);

                // Corner decorative stencil accents
                ctx.fillStyle = 'rgba(28, 25, 23, 0.85)';
                ctx.fillRect(28, 28, 8, 8);
                ctx.fillRect(220, 28, 8, 8);
                ctx.fillRect(28, 124, 8, 8);
                ctx.fillRect(220, 124, 8, 8);

                // Stenciled Typography (Slightly weathered matte ink pressed into coir fibers)
                ctx.fillStyle = '#1c1917';
                ctx.font = '900 17px "Trebuchet MS", "Arial Black", sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('WELCOME TO', 128, 60);

                ctx.font = '900 22px "Trebuchet MS", "Arial Black", sans-serif';
                ctx.fillText('CODE CAFE', 128, 96);

                // Subtle fiber bleed over text to integrate with rug surface
                for (let y = 48; y < 112; y += 4) {
                    ctx.fillStyle = 'rgba(165, 115, 72, 0.15)';
                    ctx.fillRect(36, y, 184, 1);
                }

                canvas.refresh();
            }
        }

        // 5. Entrance Dark Stone Pillar with Glowing Lantern (64x120 canvas)
        if (!textures.exists('cafe_entrance_pillar')) {
            const canvas = textures.createCanvas('cafe_entrance_pillar', 64, 120);
            if (canvas) {
                const ctx = canvas.getContext();

                // Drop shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
                ctx.fillRect(6, 106, 52, 12);

                // --- Stone Pillar Structure ---
                // Stepped Plinth Base (Bottom stone footing)
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(8, 96, 48, 18);
                ctx.fillStyle = '#334155';
                ctx.fillRect(10, 94, 44, 12);
                ctx.fillStyle = '#475569';
                ctx.fillRect(10, 94, 44, 2);
                ctx.fillStyle = '#1e293b';
                ctx.fillRect(10, 104, 44, 2);

                // Main Stone Shaft Body
                ctx.fillStyle = '#1e293b';
                ctx.fillRect(12, 42, 40, 54);

                // Stone Vertical Inset Panel Details
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(16, 46, 32, 46);
                ctx.fillStyle = '#334155';
                ctx.fillRect(18, 48, 28, 42);

                // Stone Fluted Grooves
                ctx.fillStyle = '#1e293b';
                ctx.fillRect(23, 50, 4, 38);
                ctx.fillRect(30, 50, 4, 38);
                ctx.fillRect(37, 50, 4, 38);

                ctx.fillStyle = '#64748b';
                ctx.fillRect(18, 48, 28, 1);
                ctx.fillRect(18, 48, 1, 42);

                // Capital Top Stone Molding
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(8, 36, 48, 8);
                ctx.fillStyle = '#334155';
                ctx.fillRect(6, 30, 52, 8);
                ctx.fillStyle = '#64748b';
                ctx.fillRect(6, 30, 52, 2);
                ctx.fillStyle = '#1e293b';
                ctx.fillRect(6, 37, 52, 2);

                // --- Top Lantern ---
                // Lantern Light Glow Aura
                const glow = ctx.createRadialGradient(32, 16, 2, 32, 16, 24);
                glow.addColorStop(0, 'rgba(254, 240, 138, 0.85)');
                glow.addColorStop(0.4, 'rgba(245, 158, 11, 0.45)');
                glow.addColorStop(1, 'rgba(245, 158, 11, 0)');
                ctx.fillStyle = glow;
                ctx.fillRect(8, 0, 48, 34);

                // Lantern Dark Iron Base Stand
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(22, 26, 20, 5);
                ctx.fillStyle = '#475569';
                ctx.fillRect(24, 26, 16, 2);

                // Lantern Glass & Glowing Core
                ctx.fillStyle = '#b45309';
                ctx.fillRect(18, 8, 28, 19);
                ctx.fillStyle = '#f59e0b';
                ctx.fillRect(20, 10, 24, 15);
                ctx.fillStyle = '#fef08a';
                ctx.fillRect(23, 12, 18, 11);
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(28, 14, 8, 7);

                // Dark Iron Cage Struts & Framing
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(18, 8, 2, 19);
                ctx.fillRect(44, 8, 2, 19);
                ctx.fillRect(31, 8, 2, 19);

                // Lantern Roof Cap & Ring
                ctx.fillStyle = '#1e293b';
                ctx.fillRect(16, 5, 32, 4);
                ctx.fillStyle = '#475569';
                ctx.fillRect(18, 5, 28, 2);
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(22, 2, 20, 4);
                ctx.fillStyle = '#f59e0b';
                ctx.fillRect(28, 0, 8, 3);

                canvas.refresh();
            }
        }

        // 5b. Regular Wall Stone Pillar / Pier without Lantern (64x80 canvas)
        if (!textures.exists('cafe_wall_pillar')) {
            const canvas = textures.createCanvas('cafe_wall_pillar', 64, 80);
            if (canvas) {
                const ctx = canvas.getContext();

                // Drop shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
                ctx.fillRect(6, 68, 52, 10);

                // Stepped Plinth Base
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(8, 62, 48, 14);
                ctx.fillStyle = '#334155';
                ctx.fillRect(10, 60, 44, 10);
                ctx.fillStyle = '#475569';
                ctx.fillRect(10, 60, 44, 2);

                // Main Stone Shaft Body
                ctx.fillStyle = '#1e293b';
                ctx.fillRect(12, 18, 40, 44);

                // Stone Inset Panel
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(16, 22, 32, 36);
                ctx.fillStyle = '#334155';
                ctx.fillRect(18, 24, 28, 32);

                // Fluted Grooves
                ctx.fillStyle = '#1e293b';
                ctx.fillRect(24, 26, 4, 28);
                ctx.fillRect(31, 26, 4, 28);
                ctx.fillRect(38, 26, 4, 28);

                ctx.fillStyle = '#64748b';
                ctx.fillRect(18, 24, 28, 1);
                ctx.fillRect(18, 24, 1, 32);

                // Flat Stone Cap (Matching wall coping height with subtle pyramid stone cap)
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(6, 10, 52, 10);
                ctx.fillStyle = '#334155';
                ctx.fillRect(6, 6, 52, 8);
                ctx.fillStyle = '#64748b';
                ctx.fillRect(6, 6, 52, 2);
                ctx.fillStyle = '#1e293b';
                ctx.fillRect(6, 14, 52, 2);

                // Subtle top pyramid stone block
                ctx.fillStyle = '#475569';
                ctx.fillRect(20, 2, 24, 5);
                ctx.fillStyle = '#94a3b8';
                ctx.fillRect(24, 3, 16, 3);
                ctx.fillStyle = '#f8fafc';
                ctx.fillRect(28, 3, 8, 2);

                canvas.refresh();
            }
        }

        // 6b. Entrance Flanking Thin Wooden Boundary / Railings (Left and Right - Full Edge Width, Mat Height)
        if (!textures.exists('cafe_entrance_railing_left')) {
            const canvas = textures.createCanvas('cafe_entrance_railing_left', 390, 120);
            if (canvas) {
                const ctx = canvas.getContext();

                // Drop shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                // Vertical rail shadow
                ctx.fillRect(380, 8, 4, 106);
                // Horizontal rail shadow
                ctx.fillRect(0, 114, 380, 4);

                // --- Horizontal Wooden Rail (Bottom ground edge to screen wall) ---
                // Dark border
                ctx.fillStyle = '#271202';
                ctx.fillRect(0, 104, 382, 12);
                // Main wood fill
                ctx.fillStyle = '#854d0e';
                ctx.fillRect(0, 105, 382, 10);
                // Wood grain gradient / highlights
                ctx.fillStyle = '#b45309';
                ctx.fillRect(0, 106, 382, 5);
                ctx.fillStyle = '#d97706';
                ctx.fillRect(0, 105, 382, 2);
                ctx.fillStyle = '#f59e0b';
                ctx.fillRect(0, 105, 382, 1);
                // Dark bottom edge
                ctx.fillStyle = '#451a03';
                ctx.fillRect(0, 113, 382, 2);

                // --- Vertical Wooden Rail (Right side, starting at Mat height down to ground) ---
                // Dark border
                ctx.fillStyle = '#271202';
                ctx.fillRect(370, 4, 12, 110);
                // Main wood fill
                ctx.fillStyle = '#854d0e';
                ctx.fillRect(371, 5, 10, 108);
                // Highlight on left edge of vertical rail
                ctx.fillStyle = '#b45309';
                ctx.fillRect(372, 5, 5, 108);
                ctx.fillStyle = '#d97706';
                ctx.fillRect(371, 5, 2, 108);
                ctx.fillStyle = '#f59e0b';
                ctx.fillRect(371, 6, 1, 106);
                // Dark shadow on right edge of vertical rail
                ctx.fillStyle = '#451a03';
                ctx.fillRect(379, 5, 2, 108);

                // Top rounded/beveled cap on vertical rail (at mat level)
                ctx.fillStyle = '#271202';
                ctx.fillRect(369, 2, 14, 4);
                ctx.fillStyle = '#d97706';
                ctx.fillRect(370, 2, 12, 2);
                ctx.fillStyle = '#fef08a';
                ctx.fillRect(371, 2, 10, 1);

                // --- Corner Planter Pot at junction ---
                // Base shadow
                ctx.fillStyle = '#1c1917';
                ctx.fillRect(364, 96, 22, 22);
                // Outer pot border
                ctx.fillStyle = '#451a03';
                ctx.fillRect(365, 97, 20, 20);
                // Pot wood fill
                ctx.fillStyle = '#92400e';
                ctx.fillRect(366, 98, 18, 18);
                ctx.fillStyle = '#b45309';
                ctx.fillRect(366, 98, 18, 5);
                ctx.fillStyle = '#d97706';
                ctx.fillRect(366, 98, 18, 2);
                // Soil
                ctx.fillStyle = '#271202';
                ctx.fillRect(368, 99, 14, 6);

                // Succulent Plant Sprout
                ctx.fillStyle = '#14532d';
                ctx.fillRect(370, 94, 10, 7);
                ctx.fillStyle = '#16a34a';
                ctx.fillRect(368, 90, 6, 8);
                ctx.fillRect(374, 91, 6, 7);
                ctx.fillStyle = '#4ade80';
                ctx.fillRect(371, 87, 5, 7);
                ctx.fillStyle = '#86efac';
                ctx.fillRect(372, 88, 2, 3);

                canvas.refresh();
            }
        }

        if (!textures.exists('cafe_entrance_railing_right')) {
            const canvas = textures.createCanvas('cafe_entrance_railing_right', 390, 120);
            if (canvas) {
                const ctx = canvas.getContext();

                // Drop shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                // Vertical rail shadow
                ctx.fillRect(16, 8, 4, 106);
                // Horizontal rail shadow
                ctx.fillRect(0, 114, 390, 4);

                // --- Horizontal Wooden Rail (Bottom ground edge all the way to right screen wall) ---
                // Dark border
                ctx.fillStyle = '#271202';
                ctx.fillRect(0, 104, 390, 12);
                // Main wood fill
                ctx.fillStyle = '#854d0e';
                ctx.fillRect(0, 105, 390, 10);
                // Wood grain gradient / highlights
                ctx.fillStyle = '#b45309';
                ctx.fillRect(0, 106, 390, 5);
                ctx.fillStyle = '#d97706';
                ctx.fillRect(0, 105, 390, 2);
                ctx.fillStyle = '#f59e0b';
                ctx.fillRect(0, 105, 390, 1);
                // Dark bottom edge
                ctx.fillStyle = '#451a03';
                ctx.fillRect(0, 113, 390, 2);

                // --- Vertical Wooden Rail (Left side, starting at Mat height down to ground) ---
                // Dark border
                ctx.fillStyle = '#271202';
                ctx.fillRect(6, 4, 12, 110);
                // Main wood fill
                ctx.fillStyle = '#854d0e';
                ctx.fillRect(7, 5, 10, 108);
                // Highlight on left edge of vertical rail
                ctx.fillStyle = '#b45309';
                ctx.fillRect(8, 5, 5, 108);
                ctx.fillStyle = '#d97706';
                ctx.fillRect(7, 5, 2, 108);
                ctx.fillStyle = '#f59e0b';
                ctx.fillRect(7, 6, 1, 106);
                // Dark shadow on right edge of vertical rail
                ctx.fillStyle = '#451a03';
                ctx.fillRect(15, 5, 2, 108);

                // Top rounded/beveled cap on vertical rail (at mat level)
                ctx.fillStyle = '#271202';
                ctx.fillRect(5, 2, 14, 4);
                ctx.fillStyle = '#d97706';
                ctx.fillRect(6, 2, 12, 2);
                ctx.fillStyle = '#fef08a';
                ctx.fillRect(7, 2, 10, 1);

                // --- Corner Planter Pot at junction ---
                // Base shadow
                ctx.fillStyle = '#1c1917';
                ctx.fillRect(2, 96, 22, 22);
                // Outer pot border
                ctx.fillStyle = '#451a03';
                ctx.fillRect(3, 97, 20, 20);
                // Pot wood fill
                ctx.fillStyle = '#92400e';
                ctx.fillRect(4, 98, 18, 18);
                ctx.fillStyle = '#b45309';
                ctx.fillRect(4, 98, 18, 5);
                ctx.fillStyle = '#d97706';
                ctx.fillRect(4, 98, 18, 2);
                // Soil
                ctx.fillStyle = '#271202';
                ctx.fillRect(6, 99, 14, 6);

                // Succulent Plant Sprout
                ctx.fillStyle = '#14532d';
                ctx.fillRect(8, 94, 10, 7);
                ctx.fillStyle = '#16a34a';
                ctx.fillRect(6, 90, 6, 8);
                ctx.fillRect(12, 91, 6, 7);
                ctx.fillStyle = '#4ade80';
                ctx.fillRect(9, 87, 5, 7);
                ctx.fillStyle = '#86efac';
                ctx.fillRect(10, 88, 2, 3);

                canvas.refresh();
            }
        }
        if (!textures.exists('cafe_entrance_planter_wall')) {
            const canvas = textures.createCanvas('cafe_entrance_planter_wall', 768, 64);
            if (canvas) {
                const ctx = canvas.getContext();

                // Drop shadow underneath
                ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
                ctx.fillRect(0, 56, 768, 8);

                // 1. Top Dark Stone Coping/Cap Ledge (Height: 14px)
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(0, 2, 768, 14);
                ctx.fillStyle = '#334155';
                ctx.fillRect(0, 0, 768, 12);
                ctx.fillStyle = '#64748b'; // Top edge highlight
                ctx.fillRect(0, 0, 768, 2);
                ctx.fillStyle = '#1e293b'; // Coping undercut shadow
                ctx.fillRect(0, 11, 768, 3);

                // Coping Segment Dividers (stone blocks every 48px)
                for (let x = 48; x < 768; x += 48) {
                    ctx.fillStyle = '#0f172a';
                    ctx.fillRect(x, 0, 2, 13);
                    ctx.fillStyle = '#64748b';
                    ctx.fillRect(x + 2, 0, 1, 12);
                }

                // 2. Brick Wall Mortar Base Field (Height: 44px)
                ctx.fillStyle = '#291307';
                ctx.fillRect(0, 14, 768, 44);

                // 3. Staggered Red/Terracotta Bricks
                const brickColors = ['#9a3412', '#7c2d12', '#c2410c', '#854d0e', '#9a3412'];
                const brickH = 7;
                const brickW = 24;

                let row = 0;
                for (let y = 15; y <= 50; y += brickH + 1) {
                    const xOffset = (row % 2 === 1) ? 12 : 0;
                    row++;

                    for (let x = -12 + xOffset; x < 768; x += brickW + 1) {
                        const colorIdx = Math.abs(Math.floor((x + y * 7) / 19)) % brickColors.length;
                        const mainColor = brickColors[colorIdx];

                        const drawX = Math.max(0, x);
                        const drawW = Math.min(brickW, 768 - drawX);
                        if (drawW <= 0) continue;

                        ctx.fillStyle = mainColor;
                        ctx.fillRect(drawX, y, drawW, brickH);

                        // Brick top highlight
                        ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
                        ctx.fillRect(drawX, y, drawW, 1);
                        // Brick bottom shadow
                        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                        ctx.fillRect(drawX, y + brickH - 1, drawW, 1);
                    }
                }

                // 4. Bottom Stone Foundation Footing Plinth
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(0, 58, 768, 6);
                ctx.fillStyle = '#1e293b';
                ctx.fillRect(0, 56, 768, 4);
                ctx.fillStyle = '#334155';
                ctx.fillRect(0, 56, 768, 1);

                canvas.refresh();
            }
        }

        // 7. Chalkboard Menu Wall (280x140)
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

        // 8. Sign Plaque (260x70)
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

        // 9. Wall Poster (160x140)
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

                ctx.fillStyle = '#fef08a';
                ctx.fillText('TEA', 80, 32);

                ctx.fillStyle = '#fef08a';
                ctx.fillText('SLEEP', 80, 58);

                ctx.fillStyle = '#fef08a';
                ctx.fillText('CODE', 80, 84);

                ctx.fillStyle = '#fef08a';
                ctx.fillText('REPEAT', 80, 110);

                ctx.fillStyle = '#14532d';
                ctx.fillRect(0, 0, 160, 5);
                ctx.fillRect(0, 0, 5, 140);
                ctx.fillRect(155, 0, 5, 140);
                ctx.fillRect(0, 135, 160, 5);

                const leafColors = ['#15803d', '#16a34a', '#22c55e', '#4ade80'];

                const drawLeaf = (lx: number, ly: number, angle: number, size: number, colorIdx: number) => {
                    ctx.save();
                    ctx.translate(lx, ly);
                    ctx.rotate(angle);
                    ctx.fillStyle = leafColors[colorIdx % leafColors.length];
                    ctx.beginPath();
                    ctx.ellipse(0, 0, size * 2.5, size, 0, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                };

                for (let x = 8; x < 155; x += 14) {
                    drawLeaf(x, 4, -0.3, 3, x % 4);
                    drawLeaf(x + 4, 6, 0.4, 2.5, (x + 1) % 4);
                }

                for (let y = 10; y < 135; y += 14) {
                    drawLeaf(4, y, 1.2, 3, y % 4);
                    drawLeaf(6, y + 5, -0.8, 2.5, (y + 1) % 4);
                }

                for (let y = 10; y < 135; y += 14) {
                    drawLeaf(156, y, -1.2, 3, (y + 2) % 4);
                    drawLeaf(154, y + 5, 0.8, 2.5, (y + 3) % 4);
                }

                drawLeaf(10, 10, -0.6, 4, 1);
                drawLeaf(14, 8, 0.2, 3.5, 3);
                drawLeaf(8, 14, 0.9, 3.5, 2);

                drawLeaf(150, 10, 0.6, 4, 1);
                drawLeaf(146, 8, -0.2, 3.5, 3);
                drawLeaf(152, 14, -0.9, 3.5, 2);

                drawLeaf(10, 130, 0.6, 4, 2);
                drawLeaf(14, 132, -0.2, 3.5, 0);

                drawLeaf(150, 130, -0.6, 4, 2);
                drawLeaf(146, 132, 0.2, 3.5, 0);

                canvas.refresh();
            }
        }

        // 10. Bookshelf (56x88)
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
                ctx.fillStyle = '#b45309';
                ctx.fillRect(3, 10, 1, 76);
                ctx.fillRect(52, 10, 1, 76);

                ctx.fillStyle = '#78350f';
                ctx.fillRect(0, 0, 56, 10);
                ctx.fillStyle = '#b45309';
                ctx.fillRect(2, 2, 52, 2);
                ctx.fillStyle = '#f59e0b';
                ctx.fillRect(18, 4, 20, 4);
                ctx.fillStyle = '#fef08a';
                ctx.fillRect(20, 5, 16, 2);

                const lampGlow = ctx.createRadialGradient(28, 10, 2, 28, 25, 28);
                lampGlow.addColorStop(0, 'rgba(254, 240, 138, 0.35)');
                lampGlow.addColorStop(1, 'rgba(254, 240, 138, 0)');
                ctx.fillStyle = lampGlow;
                ctx.beginPath(); ctx.arc(28, 10, 28, 0, Math.PI * 2); ctx.fill();

                ctx.fillStyle = '#b45309';
                ctx.fillRect(25, 8, 6, 3);
                ctx.fillStyle = '#fef08a';
                ctx.fillRect(26, 11, 4, 3);

                const shelfYPositions = [28, 48, 68, 84];
                shelfYPositions.forEach(sy => {
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
                    ctx.fillRect(5, sy - 2, 46, 2);

                    ctx.fillStyle = '#451a03';
                    ctx.fillRect(4, sy, 48, 4);
                    ctx.fillStyle = '#78350f';
                    ctx.fillRect(4, sy, 48, 2);
                    ctx.fillStyle = '#b45309';
                    ctx.fillRect(4, sy, 48, 1);
                });

                const drawBook = (
                    x: number,
                    y: number,
                    w: number,
                    h: number,
                    color: string,
                    goldFoil: boolean = true,
                    codeEmblem: boolean = false
                ) => {
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                    ctx.fillRect(x, y, 1, h);

                    ctx.fillStyle = color;
                    ctx.fillRect(x + 1, y, w - 1, h);

                    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
                    ctx.fillRect(x + Math.floor(w / 2), y, 1, h);

                    if (goldFoil) {
                        ctx.fillStyle = '#fef08a';
                        ctx.fillRect(x + 1, y + 2, w - 1, 1);
                        ctx.fillRect(x + 1, y + h - 3, w - 1, 1);
                    }

                    if (codeEmblem && w >= 4) {
                        ctx.fillStyle = '#fef08a';
                        ctx.fillRect(x + 1, y + Math.floor(h / 2) - 1, w - 1, 2);
                    }
                };

                let bx = 6;
                for (let i = 0; i < 5; i++) {
                    drawBook(bx, 13, 4, 15, i % 2 === 0 ? '#7f1d1d' : '#991b1b', true, false);
                    bx += 4;
                }

                ctx.fillStyle = '#b45309'; ctx.fillRect(28, 22, 6, 2);
                ctx.fillRect(30, 18, 2, 4);
                ctx.fillStyle = '#38bdf8'; ctx.beginPath(); ctx.arc(31, 17, 4, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(31, 17, 5, -Math.PI / 2, Math.PI / 2, true); ctx.stroke();

                drawBook(38, 14, 4, 14, '#14532d', true, false);
                drawBook(42, 12, 4, 16, '#1e3a8a', true, true);
                drawBook(46, 15, 4, 13, '#1e1b4b', true, false);

                ctx.fillStyle = '#7c2d12'; ctx.fillRect(6, 45, 12, 3); ctx.fillStyle = '#fef08a'; ctx.fillRect(7, 46, 10, 1);
                ctx.fillStyle = '#1e3a8a'; ctx.fillRect(6, 42, 12, 3); ctx.fillStyle = '#fef08a'; ctx.fillRect(7, 43, 10, 1);
                ctx.fillStyle = '#064e3b'; ctx.fillRect(7, 39, 10, 3); ctx.fillStyle = '#fef08a'; ctx.fillRect(8, 40, 8, 1);

                drawBook(20, 31, 5, 17, '#2563eb', true, true);
                drawBook(25, 33, 4, 15, '#16a34a', true, true);
                drawBook(29, 30, 5, 18, '#7e22ce', true, true);
                drawBook(34, 34, 4, 14, '#d97706', true, false);

                ctx.fillStyle = '#b45309'; ctx.fillRect(47, 42, 3, 6);
                ctx.save();
                ctx.translate(40, 48);
                ctx.rotate(-0.25);
                ctx.fillStyle = '#be123c'; ctx.fillRect(0, -15, 4, 15);
                ctx.fillStyle = '#fef08a'; ctx.fillRect(1, -13, 2, 1); ctx.fillRect(1, -3, 2, 1);
                ctx.restore();

                drawBook(6, 51, 5, 17, '#312e81', true, true);
                drawBook(11, 53, 4, 15, '#881337', true, false);
                drawBook(15, 50, 5, 18, '#047857', true, true);

                ctx.fillStyle = '#fef3c7'; ctx.fillRect(22, 64, 12, 4);
                ctx.fillStyle = '#d97706'; ctx.fillRect(23, 64, 1, 4); ctx.fillRect(32, 64, 1, 4);
                ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(28, 66, 2, 0, Math.PI * 2); ctx.fill();

                drawBook(36, 52, 4, 16, '#92400e', true, false);
                drawBook(40, 54, 5, 14, '#4c1d95', true, true);
                drawBook(45, 51, 5, 17, '#1e293b', true, false);

                let fx = 6;
                for (let i = 0; i < 5; i++) {
                    const fColors = ['#451a03', '#1c1917', '#3f1d0b', '#451a03', '#1e1b4b'];
                    drawBook(fx, 70, 5, 14, fColors[i], true, false);
                    fx += 5;
                }

                ctx.fillStyle = '#c2410c'; ctx.fillRect(36, 78, 8, 6);
                ctx.fillStyle = '#f8fafc'; ctx.fillRect(35, 77, 10, 2);
                ctx.fillStyle = '#15803d'; ctx.beginPath(); ctx.ellipse(40, 75, 5, 3, 0, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#4ade80'; ctx.beginPath(); ctx.ellipse(40, 73, 3, 2, 0, 0, Math.PI * 2); ctx.fill();

                ctx.fillStyle = '#14532d';
                ctx.fillRect(40, 0, 14, 4);
                ctx.fillRect(46, 4, 8, 12);
                ctx.fillRect(48, 16, 6, 14);

                ctx.fillStyle = '#16a34a';
                ctx.beginPath(); ctx.ellipse(46, 3, 5, 3, 0, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.ellipse(50, 8, 4, 5, 0, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.ellipse(51, 18, 3, 5, 0, 0, Math.PI * 2); ctx.fill();

                ctx.fillStyle = '#4ade80';
                ctx.fillRect(45, 2, 2, 2);
                ctx.fillRect(49, 7, 2, 3);
                ctx.fillRect(51, 16, 2, 3);

                canvas.refresh();
            }
        }

        // 11. Cafe Barista NPC (24x34)
        if (!textures.exists('cafe_barista')) {
            const canvas = textures.createCanvas('cafe_barista', 24, 34);
            if (canvas) {
                const ctx = canvas.getContext();
                ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
                ctx.beginPath();
                ctx.ellipse(12, 32, 8, 2, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#3f1d0b';
                ctx.fillRect(6, 5, 12, 7);

                ctx.fillStyle = '#ffedd5';
                ctx.fillRect(7, 8, 10, 8);

                ctx.fillStyle = '#fca5a5';
                ctx.fillRect(7, 13, 2, 2);
                ctx.fillRect(15, 13, 2, 2);

                ctx.fillStyle = '#1e293b';
                ctx.fillRect(8, 11, 2, 2);
                ctx.fillRect(14, 11, 2, 2);
                ctx.fillStyle = '#ef4444';
                ctx.fillRect(11, 14, 2, 1);

                ctx.fillStyle = '#15803d';
                ctx.fillRect(5, 16, 14, 16);
                ctx.fillStyle = '#22c55e';
                ctx.fillRect(7, 18, 10, 12);
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(11, 20, 2, 3);

                ctx.fillStyle = '#16a34a';
                ctx.fillRect(5, 2, 14, 3);
                ctx.fillStyle = '#15803d';
                ctx.fillRect(4, 4, 16, 2);

                canvas.refresh();
            }
        }
    }
}
