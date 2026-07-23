import Phaser from 'phaser';

export function createProceduralTextures(scene: Phaser.Scene) {
    createTiles(scene);
    createProps(scene);
    createEmotes(scene);
    createCharacterSpritesheets(scene);
    createStarTreeStages(scene);
}

function createTiles(scene: Phaser.Scene) {
    // 1. Grass & Dirt Tiles (32x32)
    drawGrassTile(scene, 'grass_tile', '#15803d', '#16a34a');
    drawGrassTile(scene, 'grass_tile_yellow', '#15803d', '#facc15');
    drawGrassTile(scene, 'grass_tile_pink', '#15803d', '#f472b6');
    drawSimpleTile(scene, 'dirt_tile', '#854d0e', '#713f12');

    // 2. River & Water Tiles (32x32)
    drawWaterTile(scene, 'water_tile_1', '#0284c7', '#38bdf8');
    drawWaterTile(scene, 'water_tile_2', '#0369a1', '#0284c7');
    drawBankTile(scene, 'river_bank_west', true);
    drawBankTile(scene, 'river_bank_east', false);
    drawLilyPadTile(scene);

    // 3. Bridge Tiles (32x32)
    drawBridgeTile(scene, 'bridge_wood_tile', '#78350f', '#92400e');
    drawBridgeTile(scene, 'bridge_stone_tile', '#475569', '#64748b');

    // 4. Zen Sanctuary Tiles (32x32)
    drawGrassTile(scene, 'sakura_grass_tile', '#15803d', '#f472b6');
    drawPebbleTile(scene, 'zen_pebble_tile');

    // 5. Town Road & Sidewalk Tiles (32x32)
    drawSimpleTile(scene, 'cobblestone_tile', '#475569', '#334155');
    drawSimpleTile(scene, 'asphalt_road_tile', '#1e293b', '#0f172a');
    drawRoadStripeTile(scene, 'road_stripe_h', true);
    drawRoadStripeTile(scene, 'road_stripe_v', false);
    drawCrosswalkTile(scene);

    // 6. Particles
    drawParticle(scene, 'glow_particle', '#38bdf8');
    drawParticle(scene, 'water_particle', '#7dd3fc');
    drawParticle(scene, 'gold_sparkle', '#fde047');
    drawParticle(scene, 'sakura_petal', '#f472b6');
}

function drawSimpleTile(scene: Phaser.Scene, key: string, bg: string, detail: string) {
    if (scene.textures.exists(key)) return;
    const canvas = scene.textures.createCanvas(key, 32, 32);
    if (!canvas) return;
    const ctx = canvas.getContext();
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = detail;
    ctx.fillRect(0, 0, 32, 1);
    ctx.fillRect(0, 0, 1, 32);
    ctx.fillRect(8, 8, 2, 2);
    ctx.fillRect(20, 18, 2, 2);
    canvas.refresh();
}

function drawGrassTile(scene: Phaser.Scene, key: string, bg: string, flowerColor: string) {
    if (scene.textures.exists(key)) return;
    const canvas = scene.textures.createCanvas(key, 32, 32);
    if (!canvas) return;
    const ctx = canvas.getContext();
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#166534';
    ctx.fillRect(4, 6, 2, 3);
    ctx.fillRect(18, 20, 2, 3);
    ctx.fillRect(26, 8, 2, 3);
    if (flowerColor !== bg) {
        ctx.fillStyle = flowerColor;
        ctx.fillRect(12, 12, 3, 3);
    }
    canvas.refresh();
}

function drawWaterTile(scene: Phaser.Scene, key: string, baseColor: string, waveColor: string) {
    if (scene.textures.exists(key)) return;
    const canvas = scene.textures.createCanvas(key, 32, 32);
    if (!canvas) return;
    const ctx = canvas.getContext();
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = waveColor;
    ctx.fillRect(4, 8, 12, 2);
    ctx.fillRect(20, 16, 8, 2);
    ctx.fillRect(8, 24, 10, 2);
    canvas.refresh();
}

function drawBankTile(scene: Phaser.Scene, key: string, isWest: boolean) {
    if (scene.textures.exists(key)) return;
    const canvas = scene.textures.createCanvas(key, 32, 32);
    if (!canvas) return;
    const ctx = canvas.getContext();
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#15803d';
    if (isWest) {
        ctx.fillRect(0, 0, 16, 32);
        ctx.fillStyle = '#854d0e';
        ctx.fillRect(14, 0, 4, 32);
    } else {
        ctx.fillRect(16, 0, 16, 32);
        ctx.fillStyle = '#854d0e';
        ctx.fillRect(14, 0, 4, 32);
    }
    canvas.refresh();
}

function drawLilyPadTile(scene: Phaser.Scene) {
    if (scene.textures.exists('lily_pad_tile')) return;
    const canvas = scene.textures.createCanvas('lily_pad_tile', 32, 32);
    if (!canvas) return;
    const ctx = canvas.getContext();
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(16, 16, 10, 0, Math.PI * 1.8);
    ctx.fill();
    ctx.fillStyle = '#f472b6';
    ctx.fillRect(14, 14, 4, 4);
    canvas.refresh();
}

function drawBridgeTile(scene: Phaser.Scene, key: string, mainColor: string, detailColor: string) {
    if (scene.textures.exists(key)) return;
    const canvas = scene.textures.createCanvas(key, 32, 32);
    if (!canvas) return;
    const ctx = canvas.getContext();
    ctx.fillStyle = mainColor;
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = detailColor;
    ctx.fillRect(0, 2, 32, 4);
    ctx.fillRect(0, 10, 32, 4);
    ctx.fillRect(0, 18, 32, 4);
    ctx.fillRect(0, 26, 32, 4);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, 32, 2);
    canvas.refresh();
}

function drawPebbleTile(scene: Phaser.Scene, key: string) {
    if (scene.textures.exists(key)) return;
    const canvas = scene.textures.createCanvas(key, 32, 32);
    if (!canvas) return;
    const ctx = canvas.getContext();
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath(); ctx.arc(10, 10, 4, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(22, 22, 5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(24, 8, 3, 0, Math.PI * 2); ctx.fill();
    canvas.refresh();
}

function drawRoadStripeTile(scene: Phaser.Scene, key: string, isH: boolean) {
    if (scene.textures.exists(key)) return;
    const canvas = scene.textures.createCanvas(key, 32, 32);
    if (!canvas) return;
    const ctx = canvas.getContext();
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#facc15'; // Yellow road divider line
    if (isH) {
        ctx.fillRect(4, 14, 24, 4);
    } else {
        ctx.fillRect(14, 4, 4, 24);
    }
    canvas.refresh();
}

function drawCrosswalkTile(scene: Phaser.Scene) {
    if (scene.textures.exists('crosswalk_tile')) return;
    const canvas = scene.textures.createCanvas('crosswalk_tile', 32, 32);
    if (!canvas) return;
    const ctx = canvas.getContext();
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(4, 0, 8, 32);
    ctx.fillRect(20, 0, 8, 32);
    canvas.refresh();
}

function drawParticle(scene: Phaser.Scene, key: string, color: string) {
    if (scene.textures.exists(key)) return;
    const canvas = scene.textures.createCanvas(key, 8, 8);
    if (!canvas) return;
    const ctx = canvas.getContext();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(4, 4, 3, 0, Math.PI * 2);
    ctx.fill();
    canvas.refresh();
}

function createProps(scene: Phaser.Scene) {
    // Trees
    drawTreeProp(scene, 'tree_prop', '#15803d', '#166534');
    drawTreeProp(scene, 'sakura_tree_prop', '#f472b6', '#db2777');
    drawBambooProp(scene);

    // Garden Furniture
    drawFountainProp(scene);
    drawBenchProp(scene, 'bench_horizontal', true);
    drawBenchProp(scene, 'bench_vertical', false);
    drawLeaderboardTree(scene);

    // Town & Gates
    drawGardenGateArch(scene);
    drawStreetLampProp(scene);
    drawCafeStorefrontProp(scene);
    drawBusStopSign(scene);
}

function drawTreeProp(scene: Phaser.Scene, key: string, c1: string, c2: string) {
    if (scene.textures.exists(key)) return;
    const canvas = scene.textures.createCanvas(key, 64, 80);
    if (!canvas) return;
    const ctx = canvas.getContext();
    // Trunk
    ctx.fillStyle = '#78350f';
    ctx.fillRect(28, 48, 8, 28);
    // Foliage
    ctx.fillStyle = c2;
    ctx.beginPath(); ctx.arc(32, 32, 26, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = c1;
    ctx.beginPath(); ctx.arc(32, 28, 22, 0, Math.PI * 2); ctx.fill();
    canvas.refresh();
}

function drawBambooProp(scene: Phaser.Scene) {
    if (scene.textures.exists('bamboo_prop')) return;
    const canvas = scene.textures.createCanvas('bamboo_prop', 32, 64);
    if (!canvas) return;
    const ctx = canvas.getContext();
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(10, 10, 4, 50);
    ctx.fillRect(18, 5, 4, 55);
    ctx.fillStyle = '#15803d';
    ctx.fillRect(10, 25, 4, 2);
    ctx.fillRect(18, 20, 4, 2);
    canvas.refresh();
}

function drawFountainProp(scene: Phaser.Scene) {
    if (scene.textures.exists('fountain_prop')) return;
    const canvas = scene.textures.createCanvas('fountain_prop', 64, 64);
    if (!canvas) return;
    const ctx = canvas.getContext();
    ctx.fillStyle = '#64748b';
    ctx.beginPath(); ctx.arc(32, 38, 26, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath(); ctx.arc(32, 38, 20, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(28, 20, 8, 20);
    canvas.refresh();
}

function drawBenchProp(scene: Phaser.Scene, key: string, isH: boolean) {
    if (scene.textures.exists(key)) return;
    const canvas = scene.textures.createCanvas(key, isH ? 48 : 16, isH ? 16 : 48);
    if (!canvas) return;
    const ctx = canvas.getContext();
    ctx.fillStyle = '#92400e';
    ctx.fillRect(0, 0, isH ? 48 : 16, isH ? 16 : 48);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(2, 2, isH ? 44 : 12, isH ? 12 : 44);
    canvas.refresh();
}

function drawLeaderboardTree(scene: Phaser.Scene) {
    if (scene.textures.exists('leaderboard_tree')) return;
    const canvas = scene.textures.createCanvas('leaderboard_tree', 64, 80);
    if (!canvas) return;
    const ctx = canvas.getContext();
    ctx.fillStyle = '#78350f';
    ctx.fillRect(28, 30, 8, 38);
    ctx.fillStyle = '#92400e';
    ctx.fillRect(4, 2, 56, 32);
    ctx.fillStyle = '#1e1b4b';
    ctx.fillRect(8, 5, 48, 26);
    canvas.refresh();

    const crownCanvas = scene.textures.createCanvas('leaderboard_crown_icon', 16, 16);
    if (crownCanvas) {
        const cctx = crownCanvas.getContext();
        cctx.fillStyle = '#fbbf24';
        cctx.fillRect(2, 6, 12, 6);
        cctx.fillStyle = '#ef4444';
        cctx.fillRect(7, 8, 2, 2);
        crownCanvas.refresh();
    }
}

function drawGardenGateArch(scene: Phaser.Scene) {
    if (scene.textures.exists('garden_gate_arch')) return;
    const canvas = scene.textures.createCanvas('garden_gate_arch', 96, 64);
    if (!canvas) return;
    const ctx = canvas.getContext();
    // Arch pillars
    ctx.fillStyle = '#854d0e';
    ctx.fillRect(4, 10, 12, 50);
    ctx.fillRect(80, 10, 12, 50);
    // Arch top beam
    ctx.fillRect(0, 0, 96, 14);
    ctx.fillStyle = '#facc15';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('DEV GARDEN', 48, 11);
    canvas.refresh();
}

function drawStreetLampProp(scene: Phaser.Scene) {
    if (scene.textures.exists('street_lamp_prop')) return;
    const canvas = scene.textures.createCanvas('street_lamp_prop', 32, 64);
    if (!canvas) return;
    const ctx = canvas.getContext();
    ctx.fillStyle = '#334155';
    ctx.fillRect(14, 20, 4, 40);
    ctx.fillStyle = '#fef08a'; // Lamp bulb glow
    ctx.beginPath(); ctx.arc(16, 16, 8, 0, Math.PI * 2); ctx.fill();
    canvas.refresh();
}

function drawCafeStorefrontProp(scene: Phaser.Scene) {
    if (scene.textures.exists('cafe_storefront_prop')) return;
    const canvas = scene.textures.createCanvas('cafe_storefront_prop', 128, 96);
    if (!canvas) return;
    const ctx = canvas.getContext();
    // Building body
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 16, 128, 80);
    // Awning striped top
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(0, 16, 128, 16);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(16, 16, 16, 16);
    ctx.fillRect(48, 16, 16, 16);
    ctx.fillRect(80, 16, 16, 16);
    ctx.fillRect(112, 16, 16, 16);
    // Glass window & Door
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(12, 44, 48, 36);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(76, 44, 36, 52);
    // Sign
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('☕ CODE CAFE', 64, 12);
    canvas.refresh();
}

function drawBusStopSign(scene: Phaser.Scene) {
    if (scene.textures.exists('bus_stop_sign')) return;
    const canvas = scene.textures.createCanvas('bus_stop_sign', 32, 64);
    if (!canvas) return;
    const ctx = canvas.getContext();
    ctx.fillStyle = '#64748b';
    ctx.fillRect(14, 20, 4, 42);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(4, 4, 24, 20);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('BUS', 16, 18);
    canvas.refresh();
}

function createEmotes(scene: Phaser.Scene) {
    const emotes = [
        { key: 'wave', emoji: '👋' },
        { key: 'heart', emoji: '❤️' },
        { key: 'sparkles', emoji: '✨' },
        { key: 'coffee', emoji: '☕' },
    ];
    emotes.forEach(e => {
        const k = `emote_${e.key}`;
        if (scene.textures.exists(k)) return;
        const canvas = scene.textures.createCanvas(k, 24, 24);
        if (!canvas) return;
        const ctx = canvas.getContext();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.arc(12, 12, 10, 0, Math.PI * 2); ctx.fill();
        ctx.font = '12px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillStyle = '#000000'; ctx.fillText(e.emoji, 12, 12);
        canvas.refresh();
    });
}

function createCharacterSpritesheets(scene: Phaser.Scene) {
    const configs = [
        { tier: 'green', outfit: '#22c55e', shadow: '#15803d', hair: '#854d0e', cosmic: false },
        { tier: 'blue', outfit: '#3b82f6', shadow: '#1d4ed8', hair: '#1e293b', cosmic: false },
        { tier: 'purple', outfit: '#a855f7', shadow: '#7e22ce', hair: '#facc15', cosmic: false },
        { tier: 'crimson', outfit: '#ef4444', shadow: '#b91c1c', hair: '#111827', cosmic: false },
        { tier: 'cosmic', outfit: '#06b6d4', shadow: '#0e7490', hair: '#e0e7ff', cosmic: true },
    ];

    configs.forEach(cfg => {
        const key = `player_${cfg.tier}`;
        if (scene.textures.exists(key)) return;
        const canvas = scene.textures.createCanvas(key, 48, 96);
        if (!canvas) return;
        const ctx = canvas.getContext();

        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 3; c++) {
                const fx = c * 16;
                const fy = r * 24;

                ctx.fillStyle = cfg.hair;
                ctx.fillRect(fx + 4, fy + 2, 8, 5);
                ctx.fillStyle = '#ffdbac';
                ctx.fillRect(fx + 4, fy + 5, 8, 5);

                ctx.fillStyle = cfg.outfit;
                ctx.fillRect(fx + 3, fy + 10, 10, 8);
                ctx.fillStyle = cfg.shadow;
                ctx.fillRect(fx + 8, fy + 10, 5, 8);

                ctx.fillStyle = '#374151';
                ctx.fillRect(fx + 5, fy + 18, 2, 4);
                ctx.fillRect(fx + 9, fy + 18, 2, 4);

                if (cfg.cosmic) {
                    ctx.fillStyle = '#fbbf24';
                    ctx.fillRect(fx + 5, fy, 6, 2);
                }
            }
        }
        canvas.refresh();

        let frameIndex = 0;
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 3; c++) {
                canvas.add(frameIndex, 0, c * 16, r * 24, 16, 24);
                frameIndex++;
            }
        }
    });
}

function createStarTreeStages(scene: Phaser.Scene) {
    for (let stage = 1; stage <= 4; stage++) {
        const key = `star_tree_stage_${stage}`;
        if (scene.textures.exists(key)) continue;
        const canvas = scene.textures.createCanvas(key, 64, 80);
        if (!canvas) continue;
        const ctx = canvas.getContext();

        ctx.fillStyle = '#78350f';
        ctx.fillRect(30, 44, 4, 26);
        ctx.fillStyle = stage === 4 ? '#eab308' : '#22c55e';
        ctx.beginPath();
        ctx.arc(32, 30, 10 + stage * 4, 0, Math.PI * 2);
        ctx.fill();
        canvas.refresh();
    }
}
