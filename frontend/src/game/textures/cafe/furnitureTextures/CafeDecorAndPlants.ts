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

        // 2. Standalone Short Garden Lamp Post (24x48)
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
                ctx.fillStyle = '#f59e0b';
                ctx.fillRect(7, 36, 10, 2);

                ctx.fillStyle = '#270e01';
                ctx.fillRect(10, 18, 4, 18);

                const glowGrad = ctx.createRadialGradient(12, 12, 2, 12, 12, 16);
                glowGrad.addColorStop(0, 'rgba(254, 240, 138, 0.9)');
                glowGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.4)');
                glowGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
                ctx.fillStyle = glowGrad;
                ctx.beginPath();
                ctx.arc(12, 12, 16, 0, Math.PI * 2);
                ctx.fill();

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

        // 4. Entrance Gateway Step Portal Mat (192x80)
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
                ctx.fillRect(20, 18, 152, 2);
                ctx.fillRect(20, 60, 152, 2);
                ctx.fillRect(20, 18, 2, 44);
                ctx.fillRect(170, 18, 2, 44);

                ctx.fillStyle = '#fef08a';
                ctx.font = 'bold 14px "Segoe UI", sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('WELCOME TO', 96, 36);
                ctx.fillText('CODE CAFE', 96, 54);

                canvas.refresh();
            }
        }

        // 5. Entrance Pillar Post (64x112)
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
                ctx.fillStyle = '#fef08a';
                ctx.fillRect(8, 88, 48, 2);

                ctx.fillStyle = '#270e01';
                ctx.fillRect(12, 28, 40, 60);

                ctx.fillStyle = '#451a03';
                ctx.fillRect(18, 30, 6, 56);
                ctx.fillRect(29, 30, 6, 56);
                ctx.fillRect(40, 30, 6, 56);

                ctx.fillStyle = '#78350f';
                ctx.fillRect(14, 28, 2, 60);

                ctx.fillStyle = '#b45309';
                ctx.fillRect(8, 20, 48, 8);
                ctx.fillStyle = '#fef08a';
                ctx.fillRect(8, 20, 48, 2);

                ctx.fillStyle = 'rgba(254, 240, 138, 0.35)';
                ctx.fillRect(0, 0, 64, 30);

                ctx.fillStyle = '#1c0a02';
                ctx.fillRect(16, 2, 32, 20);
                ctx.fillStyle = '#d97706';
                ctx.fillRect(18, 4, 28, 16);

                ctx.fillStyle = '#fef08a';
                ctx.fillRect(20, 6, 24, 12);
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(28, 8, 8, 8);

                ctx.fillStyle = '#b45309';
                ctx.fillRect(24, 0, 16, 3);

                canvas.refresh();
            }
        }

        // 6. Planter Wall (768x64)
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
                ctx.fillStyle = '#fef08a';
                ctx.fillRect(0, 20, 768, 1);

                ctx.fillStyle = '#14532d';
                ctx.fillRect(0, 0, 768, 22);

                for (let x = 4; x < 768; x += 12) {
                    ctx.fillStyle = '#16a34a';
                    ctx.fillRect(x, (x % 3) * 2, 10, 16);
                    ctx.fillStyle = '#4ade80';
                    ctx.fillRect(x + 2, (x % 3) * 2 + 2, 4, 4);

                    if (x % 36 === 0) {
                        ctx.fillStyle = '#ef4444';
                        ctx.fillRect(x + 4, 4, 4, 4);
                    } else if (x % 48 === 0) {
                        ctx.fillStyle = '#fef08a';
                        ctx.fillRect(x + 4, 6, 4, 4);
                    }
                }

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
