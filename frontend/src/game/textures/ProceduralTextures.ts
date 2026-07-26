import Phaser from 'phaser';

export class ProceduralTextures {
  static createAll(scene: Phaser.Scene) {
    const textures = scene.textures;

    // 1. Particle Glow dot
    this.drawCircleTexture(textures, 'glow_particle', 8, '#ffffff', true);

    // 2. Water bubble particle
    this.drawCircleTexture(textures, 'water_particle', 4, '#a5f3fc', false);

    // 3. TileTextures: grass, yellow grass, pink grass, dirt, river water, banks, and wooden bridges
    this.drawGrassTile(textures, 'grass_tile', '#38a154', []);
    this.drawGrassTile(textures, 'grass_tile_yellow', '#38a154', [{ x: 8, y: 12, c: '#ffd700' }, { x: 24, y: 20, c: '#ffd700' }]);
    this.drawGrassTile(textures, 'grass_tile_pink', '#38a154', [{ x: 12, y: 24, c: '#f472b6' }, { x: 20, y: 6, c: '#ffffff' }]);
    this.drawDirtTile(textures);

    // River & Bridge Textures
    this.drawWaterTile(textures, 'river_water_1', '#0284c7', '#38bdf8');
    this.drawWaterTile(textures, 'river_water_2', '#0369a1', '#0284c7');
    this.drawRiverBankTile(textures, 'river_bank_west', true);
    this.drawRiverBankTile(textures, 'river_bank_east', false);
    this.drawBridgeWoodTile(textures);
    this.drawLilyPadTile(textures);

    // Zen, Boulevard, Duck, Sakura & Firefly Textures
    this.drawZenGravelTile(textures);
    this.drawCobblestoneTile(textures);
    this.drawSakuraTreeProp(textures);
    this.drawBambooProp(textures);
    this.drawDevGardenArch(textures);
    this.drawStreetLampProp(textures);
    this.drawCodeCafeStorefront(textures);
    this.drawCafeConcretePatio(textures);
    this.drawFlowerPotProp(textures);
    this.drawMenuBoardProp(textures);
    this.drawCafeUmbrellaTable(textures);
    this.drawDuckProp(textures);
    this.drawPetalParticle(textures);
    this.drawFireflyParticle(textures);
    this.drawFenceTextures(textures);
    this.drawCafeInteriorTextures(textures);

    // 4. Props: Trees, Fountain, Benches, Signposts
    this.drawTreeProp(textures);
    this.drawFountainProp(textures);
    this.drawBenchProp(textures, 'bench_horizontal', 48, 18, true);
    this.drawBenchProp(textures, 'bench_vertical', 18, 48, false);
    this.drawLeaderboardTree(textures);
    this.drawStarTreeStages(textures);

    // 5. Emote Textures
    this.drawEmoteIcon(textures, 'wave', '👋');
    this.drawEmoteIcon(textures, 'clap', '👏');
    this.drawEmoteIcon(textures, 'smile', '😊');
    this.drawEmoteIcon(textures, 'love', '❤️');
    this.drawEmoteIcon(textures, 'code', '💻');
    this.drawEmoteIcon(textures, 'mindblown', '🤯');

    // 6. Character sheet canvases for 5 tiers: green, blue, purple, crimson, cosmic
    this.drawCharacterSpritesheet(textures, 'green', '#81c784', '#388e3c', '#5d4037', false); // Sprout (Green overall, Brown hair)
    this.drawCharacterSpritesheet(textures, 'blue', '#2196f3', '#0d47a1', '#212121', false);  // Committer (Blue hoodie, Dark hair)
    this.drawCharacterSpritesheet(textures, 'purple', '#9c27b0', '#4a148c', '#ffffff', false); // Maintainer (Purple robe, White hair)
    this.drawCharacterSpritesheet(textures, 'crimson', '#f44336', '#b71c1c', '#eceff1', false); // Arch Mage (Crimson wizard, Silver hair)
    this.drawCharacterSpritesheet(textures, 'cosmic', '#263238', '#00e5ff', '#ffd700', true);  // Legend (Glowing cosmos, Gold Crown)
  }

  private static drawCircleTexture(textures: Phaser.Textures.TextureManager, key: string, size: number, colorStr: string, blur: boolean) {
    if (textures.exists(key)) return;
    const canvas = textures.createCanvas(key, size, size);
    if (!canvas) return;
    const ctx = canvas.getContext();

    if (blur) {
      const grad = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
      grad.addColorStop(0, colorStr);
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = colorStr;
    }

    ctx.beginPath();
    ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2);
    ctx.fill();
    canvas.refresh();
  }

  private static drawGrassTile(textures: Phaser.Textures.TextureManager, key: string, bgColor: string, flowers: Array<{ x: number; y: number; c: string }>) {
    if (textures.exists(key)) return;
    const canvas = textures.createCanvas(key, 32, 32);
    if (!canvas) return;
    const ctx = canvas.getContext();

    // Base rich green lawn color
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, 32, 32);

    // Darker grass blade accents
    ctx.fillStyle = '#23733a';
    const blades = [
      { x: 4, y: 6 }, { x: 5, y: 5 }, { x: 18, y: 22 }, { x: 19, y: 21 },
      { x: 26, y: 8 }, { x: 25, y: 9 }, { x: 10, y: 16 }, { x: 11, y: 15 },
      { x: 30, y: 26 }, { x: 2, y: 28 }
    ];
    blades.forEach(b => {
      ctx.fillRect(b.x, b.y, 2, 2);
      ctx.fillRect(b.x + 1, b.y - 1, 1, 2);
    });

    // Bright vibrant green highlights
    ctx.fillStyle = '#4ade80';
    const highlights = [
      { x: 12, y: 4 }, { x: 22, y: 14 }, { x: 6, y: 24 }, { x: 28, y: 18 }
    ];
    highlights.forEach(h => {
      ctx.fillRect(h.x, h.y, 2, 1);
    });

    flowers.forEach(f => {
      ctx.fillStyle = f.c;
      ctx.fillRect(f.x, f.y, 2, 2);
      ctx.fillRect(f.x - 1, f.y - 1, 1, 1);
      ctx.fillRect(f.x + 2, f.y - 1, 1, 1);
      ctx.fillRect(f.x - 1, f.y + 2, 1, 1);
      ctx.fillRect(f.x + 2, f.y + 2, 1, 1);
    });

    canvas.refresh();
  }

  private static drawDirtTile(textures: Phaser.Textures.TextureManager) {
    if (textures.exists('dirt_tile')) return;
    const canvas = textures.createCanvas('dirt_tile', 32, 32);
    if (!canvas) return;
    const ctx = canvas.getContext();

    ctx.fillStyle = '#dfc49c';
    ctx.fillRect(0, 0, 32, 32);

    ctx.fillStyle = '#cdad7e';
    const noises = [{ x: 5, y: 12 }, { x: 18, y: 4 }, { x: 25, y: 22 }, { x: 10, y: 28 }, { x: 29, y: 14 }];
    noises.forEach(n => ctx.fillRect(n.x, n.y, 2, 2));
    canvas.refresh();
  }

  private static drawWaterTile(textures: Phaser.Textures.TextureManager, key: string, baseColor: string, waveColor: string) {
    if (textures.exists(key)) return;
    const canvas = textures.createCanvas(key, 32, 32);
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

  private static drawRiverBankTile(textures: Phaser.Textures.TextureManager, key: string, isWest: boolean) {
    if (textures.exists(key)) return;
    const canvas = textures.createCanvas(key, 32, 32);
    if (!canvas) return;
    const ctx = canvas.getContext();

    ctx.fillStyle = '#0284c7';
    ctx.fillRect(0, 0, 32, 32);

    ctx.fillStyle = '#428554';
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

  private static drawBridgeWoodTile(textures: Phaser.Textures.TextureManager) {
    if (textures.exists('bridge_wood_tile')) return;
    const canvas = textures.createCanvas('bridge_wood_tile', 32, 32);
    if (!canvas) return;
    const ctx = canvas.getContext();

    ctx.fillStyle = '#854d0e';
    ctx.fillRect(0, 0, 32, 32);

    ctx.fillStyle = '#532d08';
    ctx.fillRect(0, 0, 32, 2);
    ctx.fillRect(0, 10, 32, 2);
    ctx.fillRect(0, 20, 32, 2);
    ctx.fillRect(0, 30, 32, 2);

    ctx.fillStyle = '#a16207';
    ctx.fillRect(4, 4, 12, 2);
    ctx.fillRect(18, 14, 10, 2);
    ctx.fillRect(6, 24, 14, 2);

    canvas.refresh();
  }

  private static drawLilyPadTile(textures: Phaser.Textures.TextureManager) {
    if (textures.exists('lily_pad_tile')) return;
    const canvas = textures.createCanvas('lily_pad_tile', 32, 32);
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

  private static drawZenGravelTile(textures: Phaser.Textures.TextureManager) {
    if (textures.exists('zen_gravel_tile')) return;
    const canvas = textures.createCanvas('zen_gravel_tile', 32, 32);
    if (!canvas) return;
    const ctx = canvas.getContext();

    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(0, 0, 32, 32);

    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(0, 6, 32, 2);
    ctx.fillRect(0, 16, 32, 2);
    ctx.fillRect(0, 26, 32, 2);

    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(6, 12, 3, 2);
    ctx.fillRect(22, 22, 3, 2);

    canvas.refresh();
  }

  private static drawCobblestoneTile(textures: Phaser.Textures.TextureManager) {
    if (textures.exists('cobblestone_tile')) return;
    const canvas = textures.createCanvas('cobblestone_tile', 32, 32);
    if (!canvas) return;
    const ctx = canvas.getContext();

    ctx.fillStyle = '#334155';
    ctx.fillRect(0, 0, 32, 32);

    ctx.fillStyle = '#64748b';
    ctx.fillRect(1, 1, 14, 6);
    ctx.fillRect(17, 1, 14, 6);
    ctx.fillRect(1, 9, 7, 6);
    ctx.fillRect(10, 9, 14, 6);
    ctx.fillRect(26, 9, 5, 6);
    ctx.fillRect(1, 17, 14, 6);
    ctx.fillRect(17, 17, 14, 6);
    ctx.fillRect(1, 25, 7, 6);
    ctx.fillRect(10, 25, 14, 6);
    ctx.fillRect(26, 25, 5, 6);

    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(2, 2, 12, 1);
    ctx.fillRect(18, 2, 12, 1);
    ctx.fillRect(11, 10, 12, 1);

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

  private static drawDevGardenArch(textures: Phaser.Textures.TextureManager) {
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

  private static drawStreetLampProp(textures: Phaser.Textures.TextureManager) {
    if (textures.exists('street_lamp')) return;
    const canvas = textures.createCanvas('street_lamp', 32, 64);
    if (!canvas) return;
    const ctx = canvas.getContext();

    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(10, 58, 12, 4);

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(14, 16, 4, 44);
    ctx.fillRect(12, 54, 8, 4);

    ctx.fillStyle = '#334155';
    ctx.fillRect(10, 8, 12, 10);

    ctx.fillStyle = '#fef08a';
    ctx.fillRect(12, 10, 8, 6);

    canvas.refresh();
  }

  private static drawCodeCafeStorefront(textures: Phaser.Textures.TextureManager) {
    if (textures.exists('code_cafe_building')) return;
    const canvas = textures.createCanvas('code_cafe_building', 96, 80);
    if (!canvas) return;
    const ctx = canvas.getContext();

    // Drop shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(4, 72, 88, 6);

    // Main wooden building wall
    ctx.fillStyle = '#854d0e';
    ctx.fillRect(8, 20, 80, 56);

    // Wood plank texture lines
    ctx.fillStyle = '#713f12';
    for (let y = 28; y < 76; y += 12) {
      ctx.fillRect(8, y, 80, 1);
    }

    // Red & white striped awning/canopy
    for (let i = 0; i < 80; i += 10) {
      ctx.fillStyle = (i / 10) % 2 === 0 ? '#ef4444' : '#ffffff';
      ctx.fillRect(8 + i, 16, 10, 12);
    }
    // Awning scalloped edge shadow
    ctx.fillStyle = '#991b1b';
    ctx.fillRect(8, 27, 80, 2);

    // Header sign banner ("CODE CAFE")
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(18, 4, 60, 14);
    ctx.fillStyle = '#1d4ed8';
    ctx.fillRect(18, 16, 60, 2);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 8px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('☕ CODE CAFE', 48, 14);

    // Blue Entrance Door with Glass Window
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(40, 42, 18, 34);
    ctx.fillStyle = '#fef08a'; // Warm glowing door window
    ctx.fillRect(43, 46, 12, 14);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(48, 46, 2, 14);
    ctx.fillRect(43, 52, 12, 2);
    // Door handle
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(42, 62, 3, 3);

    // Large Front Display Window
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(12, 36, 22, 24);
    ctx.fillStyle = '#fef08a'; // Glowing yellow window interior
    ctx.fillRect(14, 38, 18, 20);
    ctx.fillStyle = '#78350f'; // Window frame grid
    ctx.fillRect(22, 38, 2, 20);
    ctx.fillRect(14, 47, 18, 2);

    canvas.refresh();
  }

  private static drawCafeConcretePatio(textures: Phaser.Textures.TextureManager) {
    if (textures.exists('cafe_concrete_patio')) return;
    const canvas = textures.createCanvas('cafe_concrete_patio', 180, 20);
    if (!canvas) return;
    const ctx = canvas.getContext();

    // Smooth grey concrete slab
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(0, 0, 180, 20);

    // Top highlight rim
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(0, 0, 180, 2);

    // Stone slab division seams
    ctx.fillStyle = '#64748b';
    for (let x = 30; x < 180; x += 30) {
      ctx.fillRect(x, 0, 2, 18);
    }
    ctx.fillRect(0, 18, 180, 2); // Bottom shadow edge

    // Subtle stone texture details
    ctx.fillStyle = '#64748b';
    ctx.fillRect(12, 6, 2, 2);
    ctx.fillRect(48, 12, 2, 2);
    ctx.fillRect(78, 5, 2, 2);
    ctx.fillRect(112, 11, 2, 2);
    ctx.fillRect(152, 6, 2, 2);

    canvas.refresh();
  }

  private static drawFlowerPotProp(textures: Phaser.Textures.TextureManager) {
    if (textures.exists('flower_pot')) return;
    const canvas = textures.createCanvas('flower_pot', 20, 24);
    if (!canvas) return;
    const ctx = canvas.getContext();

    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(3, 21, 14, 3);

    // Terracotta pot
    ctx.fillStyle = '#ea580c';
    ctx.fillRect(4, 12, 12, 9);
    ctx.fillStyle = '#c2410c';
    ctx.fillRect(3, 10, 14, 3); // pot rim
    ctx.fillStyle = '#9a3412';
    ctx.fillRect(13, 12, 3, 9); // shadow side

    // Green Foliage Bush
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

    // Blooming Flowers (Red, Pink, Yellow blooms)
    ctx.fillStyle = '#ef4444'; // Red bloom
    ctx.fillRect(5, 6, 3, 3);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(6, 7, 1, 1);

    ctx.fillStyle = '#f472b6'; // Pink bloom
    ctx.fillRect(12, 5, 3, 3);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(13, 6, 1, 1);

    ctx.fillStyle = '#f59e0b'; // Yellow bloom
    ctx.fillRect(9, 3, 3, 3);

    canvas.refresh();
  }

  private static drawMenuBoardProp(textures: Phaser.Textures.TextureManager) {
    if (textures.exists('cafe_menu_board')) return;
    const canvas = textures.createCanvas('cafe_menu_board', 26, 34);
    if (!canvas) return;
    const ctx = canvas.getContext();

    // Soft realistic ground shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(13, 31, 10, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Wooden A-frame easel legs (Back leg & front legs)
    ctx.fillStyle = '#451a03'; // Dark mahogany back leg
    ctx.fillRect(12, 16, 2, 14);

    ctx.fillStyle = '#78350f'; // Front left and right legs
    ctx.fillRect(4, 14, 3, 17);
    ctx.fillRect(19, 14, 3, 17);

    // Leg wood grain & highlights
    ctx.fillStyle = '#92400e';
    ctx.fillRect(4, 14, 1, 17);
    ctx.fillRect(19, 14, 1, 17);

    // Cross brace shelf
    ctx.fillStyle = '#581c87';
    ctx.fillStyle = '#78350f';
    ctx.fillRect(4, 26, 18, 2);

    // Main Chalkboard Frame (Dark polished wood)
    ctx.fillStyle = '#581c87';
    ctx.fillStyle = '#78350f';
    ctx.fillRect(2, 2, 22, 21);

    // Outer frame highlight rim
    ctx.fillStyle = '#92400e';
    ctx.fillRect(2, 2, 22, 1);
    ctx.fillRect(2, 2, 1, 21);

    // Slate Blackboard surface
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(4, 4, 18, 17);

    // Chalk dust texture tint
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(5, 5, 16, 15);

    // --- CHALK ARTWORK & MENU ---
    // Top "MENU" Header (Gold/White chalk)
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 6px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('MENU', 13, 9);

    // Steaming Coffee Cup Icon
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(6, 11, 4, 3); // Cup body
    ctx.fillRect(5, 11, 1, 2); // Handle
    ctx.fillStyle = '#fde047'; // Steam wisps
    ctx.fillRect(7, 10, 1, 1);
    ctx.fillRect(9, 10, 1, 1);

    // Chalk Menu items (Lines & dots)
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(11, 11, 9, 1); // Item 1: Coffee
    ctx.fillRect(11, 13, 7, 1); // Item 2: Cake
    ctx.fillRect(6, 16, 12, 1); // Item 3: Code Special

    ctx.fillStyle = '#86efac'; // Price tag bullets
    ctx.fillRect(19, 11, 1, 1);
    ctx.fillRect(17, 13, 1, 1);
    ctx.fillRect(17, 16, 1, 1);

    // Small chalk flower doodle in bottom right corner
    ctx.fillStyle = '#f472b6';
    ctx.fillRect(18, 18, 2, 2);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(19, 19, 1, 1);

    // Green leafy vines wrapping around the top and side borders of the board
    ctx.fillStyle = '#15803d'; // Base dark green leaves
    ctx.fillRect(1, 0, 24, 3);
    ctx.fillRect(0, 1, 3, 12);
    ctx.fillRect(23, 1, 3, 12);

    ctx.fillStyle = '#22c55e'; // Bright green leaf clusters
    ctx.fillRect(3, 0, 5, 2);
    ctx.fillRect(11, 0, 6, 2);
    ctx.fillRect(19, 0, 4, 2);
    ctx.fillRect(0, 3, 2, 4);
    ctx.fillRect(24, 4, 2, 5);
    ctx.fillRect(0, 9, 2, 3);
    ctx.fillRect(24, 11, 2, 3);

    ctx.fillStyle = '#86efac'; // Fresh leaf highlights
    ctx.fillRect(5, 0, 2, 1);
    ctx.fillRect(14, 0, 2, 1);
    ctx.fillRect(1, 4, 1, 2);
    ctx.fillRect(24, 6, 1, 2);

    canvas.refresh();
  }

  private static drawCafeUmbrellaTable(textures: Phaser.Textures.TextureManager) {
    if (textures.exists('cafe_umbrella_table')) return;
    const canvas = textures.createCanvas('cafe_umbrella_table', 36, 42);
    if (!canvas) return;
    const ctx = canvas.getContext();

    // Ground shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.beginPath();
    ctx.arc(18, 36, 14, 0, Math.PI * 2);
    ctx.fill();

    // Table base & legs
    ctx.fillStyle = '#451a03';
    ctx.fillRect(16, 26, 4, 11);
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.arc(18, 26, 10, 0, Math.PI * 2);
    ctx.fill();

    // Table edge highlight
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.arc(18, 25, 9, 0, Math.PI * 2);
    ctx.fill();

    // Umbrella pole
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(17, 8, 2, 18);

    // Umbrella Canopy (Red & White striped)
    ctx.save();
    ctx.beginPath();
    ctx.arc(18, 12, 16, 0, Math.PI * 2);
    ctx.clip();

    for (let i = 0; i < 8; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#ef4444' : '#ffffff';
      ctx.beginPath();
      ctx.moveTo(18, 12);
      ctx.arc(18, 12, 18, (i * Math.PI) / 4, ((i + 1) * Math.PI) / 4);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // Umbrella center finial
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(17, 0, 2, 3);

    canvas.refresh();
  }

  private static drawDuckProp(textures: Phaser.Textures.TextureManager) {
    if (textures.exists('duck_prop')) return;
    const canvas = textures.createCanvas('duck_prop', 16, 16);
    if (!canvas) return;
    const ctx = canvas.getContext();

    ctx.fillStyle = '#fef08a';
    ctx.fillRect(2, 6, 12, 8);
    ctx.fillRect(6, 2, 6, 6);

    ctx.fillStyle = '#f97316';
    ctx.fillRect(12, 4, 4, 2);

    ctx.fillStyle = '#000000';
    ctx.fillRect(9, 3, 2, 2);

    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(0, 12, 16, 2);

    canvas.refresh();
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

  private static drawFountainProp(textures: Phaser.Textures.TextureManager) {
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

  private static drawBenchProp(textures: Phaser.Textures.TextureManager, key: string, w: number, h: number, isHorizontal: boolean) {
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

  private static drawEmoteIcon(textures: Phaser.Textures.TextureManager, key: string, emoji: string) {
    const fullKey = `emote_${key}`;
    if (textures.exists(fullKey)) return;
    const canvas = textures.createCanvas(fullKey, 24, 24);
    if (!canvas) return;
    const ctx = canvas.getContext();

    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(12, 12, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.font = '12px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#000000';
    ctx.fillText(emoji, 12, 12);

    canvas.refresh();
  }

  private static drawCharacterSpritesheet(
    textures: Phaser.Textures.TextureManager,
    tier: string,
    outfitColor: string,
    outfitShadowColor: string,
    hairColor: string,
    isCosmic: boolean
  ) {
    const key = `player_${tier}`;
    if (textures.exists(key)) return;
    const canvas = textures.createCanvas(key, 48, 96);
    if (!canvas) return;
    const ctx = canvas.getContext();

    const cols = [0, 1, 2];
    const rows = [0, 1, 2, 3];

    rows.forEach(row => {
      cols.forEach(col => {
        const fx = col * 16;
        const fy = row * 24;

        ctx.fillStyle = hairColor;
        ctx.fillRect(fx + 4, fy + 2, 8, 7);

        ctx.fillStyle = '#ffdbac';
        ctx.fillRect(fx + 4, fy + 5, 8, 5);

        ctx.fillStyle = hairColor;
        if (row === 0) {
          ctx.fillRect(fx + 4, fy + 2, 8, 3);
          ctx.fillRect(fx + 4, fy + 5, 1, 2);
          ctx.fillRect(fx + 11, fy + 5, 1, 2);
        } else if (row === 1) {
          ctx.fillRect(fx + 3, fy + 2, 8, 4);
          ctx.fillRect(fx + 3, fy + 6, 2, 3);
        } else if (row === 2) {
          ctx.fillRect(fx + 5, fy + 2, 8, 4);
          ctx.fillRect(fx + 11, fy + 6, 2, 3);
        } else if (row === 3) {
          ctx.fillRect(fx + 3, fy + 2, 10, 8);
        }

        ctx.fillStyle = '#212121';
        if (row === 0) {
          ctx.fillRect(fx + 6, fy + 6, 1, 1);
          ctx.fillRect(fx + 9, fy + 6, 1, 1);
        } else if (row === 1) {
          ctx.fillRect(fx + 5, fy + 6, 1, 1);
        } else if (row === 2) {
          ctx.fillRect(fx + 10, fy + 6, 1, 1);
        }

        ctx.fillStyle = outfitColor;
        ctx.fillRect(fx + 3, fy + 10, 10, 8);
        ctx.fillStyle = outfitShadowColor;
        ctx.fillRect(fx + 8, fy + 10, 5, 8);

        if (tier === 'purple' || tier === 'crimson') {
          ctx.fillStyle = '#fbcb24';
          ctx.fillRect(fx + 7, fy + 10, 2, 8);
        } else if (isCosmic) {
          ctx.fillStyle = '#00e5ff';
          ctx.fillRect(fx + 7, fy + 12, 2, 2);
        } else if (tier === 'blue') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(fx + 6, fy + 11, 1, 2);
          ctx.fillRect(fx + 9, fy + 11, 1, 2);
        }

        ctx.fillStyle = '#ffdbac';
        if (row === 0 || row === 3) {
          ctx.fillRect(fx + 2, fy + 12, 1, 3);
          ctx.fillRect(fx + 13, fy + 12, 1, 3);
        } else if (row === 1) {
          ctx.fillRect(fx + 7, fy + 13, 2, 2);
        } else if (row === 2) {
          ctx.fillRect(fx + 7, fy + 13, 2, 2);
        }

        ctx.fillStyle = '#374151';

        if (col === 1) {
          ctx.fillRect(fx + 5, fy + 18, 2, 4);
          ctx.fillRect(fx + 9, fy + 18, 2, 4);
          ctx.fillStyle = '#111827';
          ctx.fillRect(fx + 4, fy + 22, 3, 1);
          ctx.fillRect(fx + 9, fy + 22, 3, 1);
        } else if (col === 0) {
          ctx.fillRect(fx + 5, fy + 17, 2, 5);
          ctx.fillRect(fx + 9, fy + 19, 2, 3);
          ctx.fillStyle = '#111827';
          ctx.fillRect(fx + 4, fy + 22, 3, 1);
          ctx.fillRect(fx + 9, fy + 22, 2, 1);
        } else if (col === 2) {
          ctx.fillRect(fx + 5, fy + 19, 2, 3);
          ctx.fillRect(fx + 9, fy + 17, 2, 5);
          ctx.fillStyle = '#111827';
          ctx.fillRect(fx + 5, fy + 22, 2, 1);
          ctx.fillRect(fx + 8, fy + 22, 3, 1);
        }

        if (isCosmic) {
          ctx.fillStyle = '#fbbf24';
          ctx.fillRect(fx + 5, fy + 0, 6, 2);
          ctx.fillRect(fx + 4, fy - 1, 1, 2);
          ctx.fillRect(fx + 7, fy - 1, 2, 2);
          ctx.fillRect(fx + 11, fy - 1, 1, 2);
        }
      });
    });

    canvas.refresh();

    let frameIndex = 0;
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 3; c++) {
        const fx = c * 16;
        const fy = r * 24;
        canvas.add(frameIndex, 0, fx, fy, 16, 24);
        frameIndex++;
      }
    }
  }

  private static drawStarTreeStages(textures: Phaser.Textures.TextureManager) {
    // Stage 1
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

    // Stage 2
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

    // Stage 3
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

    // Stage 4
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

  private static drawFenceTextures(textures: Phaser.Textures.TextureManager) {
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

  private static drawCafeInteriorTextures(textures: Phaser.Textures.TextureManager) {
    // 1. Primary Wood Floor Tile (32x32) - #3a2e2b with #2b1f1d grain
    if (!textures.exists('cafe_floor_wood_1')) {
      const canvas = textures.createCanvas('cafe_floor_wood_1', 32, 32);
      if (canvas) {
        const ctx = canvas.getContext();
        ctx.fillStyle = '#3a2e2b'; // Primary Wood Base
        ctx.fillRect(0, 0, 32, 32);

        // Subtle wood grain lines (#2b1f1d)
        ctx.fillStyle = '#2b1f1d';
        ctx.fillRect(0, 0, 32, 1);
        ctx.fillRect(0, 16, 32, 1);
        ctx.fillRect(4, 4, 12, 1);
        ctx.fillRect(18, 8, 10, 1);
        ctx.fillRect(8, 22, 14, 1);
        ctx.fillRect(16, 0, 1, 16);
        ctx.fillRect(8, 16, 1, 16);

        canvas.refresh();
      }
    }

    // 2. Secondary Wood Floor Tile (32x32) - #332724 with #2b1f1d grain
    if (!textures.exists('cafe_floor_wood_2')) {
      const canvas = textures.createCanvas('cafe_floor_wood_2', 32, 32);
      if (canvas) {
        const ctx = canvas.getContext();
        ctx.fillStyle = '#332724'; // Secondary Wood Base
        ctx.fillRect(0, 0, 32, 32);

        // Subtle wood grain lines (#2b1f1d)
        ctx.fillStyle = '#2b1f1d';
        ctx.fillRect(0, 0, 32, 1);
        ctx.fillRect(0, 16, 32, 1);
        ctx.fillRect(2, 6, 14, 1);
        ctx.fillRect(20, 10, 8, 1);
        ctx.fillRect(10, 24, 12, 1);
        ctx.fillRect(16, 0, 1, 16);
        ctx.fillRect(24, 16, 1, 16);

        canvas.refresh();
      }
    }

    // Legacy fallback texture alias
    if (!textures.exists('cafe_floor_wood')) {
      const canvas = textures.createCanvas('cafe_floor_wood', 32, 32);
      if (canvas) {
        const ctx = canvas.getContext();
        ctx.fillStyle = '#3a2e2b';
        ctx.fillRect(0, 0, 32, 32);
        canvas.refresh();
      }
    }

    // 3. Cozy Terrace Slate Stone Patio Tile (32x32)
    if (!textures.exists('cafe_floor_terrace_stone')) {
      const canvas = textures.createCanvas('cafe_floor_terrace_stone', 32, 32);
      if (canvas) {
        const ctx = canvas.getContext();
        ctx.fillStyle = '#211c1a'; // Slate grout base
        ctx.fillRect(0, 0, 32, 32);

        // Stone pavers
        ctx.fillStyle = '#2d2522';
        ctx.fillRect(1, 1, 14, 14);
        ctx.fillRect(17, 1, 14, 14);
        ctx.fillRect(1, 17, 30, 14);

        // Bevel highlights
        ctx.fillStyle = '#3a302c';
        ctx.fillRect(2, 2, 12, 2);
        ctx.fillRect(18, 2, 12, 2);
        ctx.fillRect(2, 18, 28, 2);

        canvas.refresh();
      }
    }

    // 4. Crimson Warm Cafe Brick Wall (32x32)
    // Wall Base Color: #4a2c20, Brick Pattern Color: #5c3829, Baseboard Skirting: #261610
    if (!textures.exists('cafe_wall_brick')) {
      const canvas = textures.createCanvas('cafe_wall_brick', 32, 32);
      if (canvas) {
        const ctx = canvas.getContext();
        ctx.fillStyle = '#4a2c20'; // Wall Base Color
        ctx.fillRect(0, 0, 32, 32);

        // Brick Pattern Color: #5c3829
        ctx.fillStyle = '#5c3829';
        ctx.fillRect(1, 1, 14, 6);
        ctx.fillRect(17, 1, 14, 6);
        ctx.fillRect(1, 9, 30, 6);
        ctx.fillRect(1, 17, 14, 6);
        ctx.fillRect(17, 17, 14, 6);

        // Baseboard Skirting: #261610 at bottom 6px
        ctx.fillStyle = '#261610';
        ctx.fillRect(0, 26, 32, 6);

        canvas.refresh();
      }
    }

    // 3. Open Terrace Cafe Style Grand Oak Counter (190x44)
    if (!textures.exists('cafe_counter')) {
      const canvas = textures.createCanvas('cafe_counter', 190, 44);
      if (canvas) {
        const ctx = canvas.getContext();
        // Drop shadow on floor
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.fillRect(4, 38, 182, 6);

        // Open Terrace Cafe Warm Oak Body Base
        ctx.fillStyle = '#451a03';
        ctx.fillRect(2, 8, 186, 32);

        // Vertical Golden Oak Panelling (#854d0e body with #a16207 panels)
        ctx.fillStyle = '#854d0e';
        ctx.fillRect(4, 10, 182, 28);

        // 5 Carved Recessed Oak Front Panels
        for (let i = 0; i < 5; i++) {
          const px = 10 + i * 35;
          // Outer panel shadow border
          ctx.fillStyle = '#270e01';
          ctx.fillRect(px, 14, 28, 22);
          // Inner raised oak panel
          ctx.fillStyle = '#a16207';
          ctx.fillRect(px + 2, 16, 24, 18);
          // Highlight edge on top/left of panel
          ctx.fillStyle = '#d97706';
          ctx.fillRect(px + 2, 16, 24, 2);
          ctx.fillRect(px + 2, 16, 2, 18);
        }

        // Left & Right Solid End Pillar Posts
        ctx.fillStyle = '#522b0c';
        ctx.fillRect(0, 6, 8, 36);
        ctx.fillRect(182, 6, 8, 36);
        ctx.fillStyle = '#d97706'; // Brass post caps
        ctx.fillRect(0, 6, 8, 2);
        ctx.fillRect(182, 6, 8, 2);

        // Brass Kickplate along bottom
        ctx.fillStyle = '#b45309';
        ctx.fillRect(8, 36, 174, 4);
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(8, 36, 174, 1);

        // Polished Warm Oak Countertop Slab
        ctx.fillStyle = '#713f12';
        ctx.fillRect(0, 0, 190, 10);
        ctx.fillStyle = '#a16207';
        ctx.fillRect(0, 0, 190, 4); // Top surface
        ctx.fillStyle = '#d97706';
        ctx.fillRect(0, 0, 190, 2); // Highlight rim
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(0, 0, 190, 1); // Shiny spec edge

        // Dual-screen Touchscreen POS Terminal
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(115, 1, 20, 11);
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(117, 2, 16, 7);
        ctx.fillStyle = '#22c55e'; // Green POS text line
        ctx.fillRect(119, 4, 10, 1);
        ctx.fillRect(119, 6, 12, 1);
        ctx.fillStyle = '#d97706'; // POS brass stand
        ctx.fillRect(123, 10, 4, 3);

        // Coffee cup stack with red sleeves
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(18, 1, 6, 8);
        ctx.fillRect(26, 1, 6, 8);
        ctx.fillStyle = '#ef4444'; // Red sleeves
        ctx.fillRect(18, 4, 6, 3);
        ctx.fillRect(26, 4, 6, 3);

        // Glass Tip Jar with green bills inside
        ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.fillRect(150, 2, 12, 8);
        ctx.fillStyle = '#16a34a';
        ctx.fillRect(152, 5, 8, 4);

        canvas.refresh();
      }
    }

    // 4. Commercial Dual-Grouphead Espresso Machine (36x36)
    if (!textures.exists('cafe_espresso_machine')) {
      const canvas = textures.createCanvas('cafe_espresso_machine', 36, 36);
      if (canvas) {
        const ctx = canvas.getContext();
        // Steel & Brass Frame
        ctx.fillStyle = '#334155';
        ctx.fillRect(2, 4, 32, 30);

        // Shiny Chrome Front Panel
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(4, 6, 28, 24);
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(5, 7, 26, 4); // Bright metallic reflection

        // Brass Portafilter Mounts & Groupheads
        ctx.fillStyle = '#b45309';
        ctx.fillRect(8, 18, 6, 7);
        ctx.fillRect(22, 18, 6, 7);
        ctx.fillStyle = '#270e01'; // Black handles
        ctx.fillRect(6, 22, 4, 2);
        ctx.fillRect(20, 22, 4, 2);

        // Pressure Gauges & LED Indicators
        ctx.fillStyle = '#0f172a'; ctx.fillRect(6, 12, 4, 4); ctx.fillRect(26, 12, 4, 4);
        ctx.fillStyle = '#ef4444'; ctx.fillRect(7, 13, 2, 2); // Red gauge needle
        ctx.fillStyle = '#22c55e'; ctx.fillRect(27, 13, 2, 2); // Green gauge needle
        ctx.fillStyle = '#38bdf8'; ctx.fillRect(14, 13, 8, 3); // Digital temp display

        // Drip Tray & Mesh
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(4, 26, 28, 6);
        ctx.fillStyle = '#64748b';
        ctx.fillRect(5, 27, 26, 2);

        // Ceramic Espresso Cups resting on bottom
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(9, 24, 4, 4);
        ctx.fillRect(23, 24, 4, 4);

        // Rising Steam Pixels
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fillRect(10, 0, 2, 3);
        ctx.fillRect(12, 2, 2, 3);
        ctx.fillRect(24, 0, 2, 3);

        canvas.refresh();
      }
    }

    // 5. Cafe Barista NPC (24x32) - White Fair Skin Tone
    if (!textures.exists('cafe_barista')) {
      const canvas = textures.createCanvas('cafe_barista', 24, 32);
      if (canvas) {
        const ctx = canvas.getContext();
        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.beginPath();
        ctx.ellipse(12, 30, 8, 2, 0, 0, Math.PI * 2);
        ctx.fill();

        // Dark Hair
        ctx.fillStyle = '#3f1d0b';
        ctx.fillRect(6, 4, 12, 7);

        // Head / Face - Fair White Skin Tone (#ffedd5)
        ctx.fillStyle = '#ffedd5';
        ctx.fillRect(7, 8, 10, 8);

        // Rosy Cheeks
        ctx.fillStyle = '#fca5a5';
        ctx.fillRect(7, 12, 2, 2);
        ctx.fillRect(15, 12, 2, 2);

        // Eyes & Smile
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(9, 11, 2, 2); // eyes
        ctx.fillRect(13, 11, 2, 2);
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(11, 14, 2, 1); // smile

        // Green Barista Apron
        ctx.fillStyle = '#15803d';
        ctx.fillRect(6, 16, 12, 14);
        ctx.fillStyle = '#22c55e'; // Apron chest
        ctx.fillRect(8, 18, 8, 10);
        ctx.fillStyle = '#ffffff'; // Coffee bean badge on apron
        ctx.fillRect(11, 20, 2, 3);

        // Barista Cap / Coffee cup hat
        ctx.fillStyle = '#16a34a';
        ctx.fillRect(5, 2, 14, 3);
        ctx.fillStyle = '#15803d';
        ctx.fillRect(4, 4, 16, 2);

        canvas.refresh();
      }
    }

    // 6. Cafe Table (36x36)
    if (!textures.exists('cafe_interior_table')) {
      const canvas = textures.createCanvas('cafe_interior_table', 36, 36);
      if (canvas) {
        const ctx = canvas.getContext();
        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.beginPath();
        ctx.ellipse(18, 33, 14, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Table leg & base
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(16, 18, 4, 14);
        ctx.fillRect(10, 30, 16, 3);

        // Circular wooden top
        ctx.fillStyle = '#92400e';
        ctx.beginPath();
        ctx.ellipse(18, 14, 16, 10, 0, 0, Math.PI * 2);
        ctx.fill();

        // Top surface highlight
        ctx.fillStyle = '#b45309';
        ctx.beginPath();
        ctx.ellipse(18, 13, 14, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Coffee mug on table
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(16, 10, 5, 5);
        ctx.fillStyle = '#78350f'; // Coffee liquid
        ctx.fillRect(17, 11, 3, 3);

        // Flower vase on table
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(23, 8, 3, 5);
        ctx.fillStyle = '#f472b6'; // Flower bloom
        ctx.fillRect(23, 5, 3, 3);

        canvas.refresh();
      }
    }

    // 7. Cafe Chair (18x24)
    if (!textures.exists('cafe_interior_chair')) {
      const canvas = textures.createCanvas('cafe_interior_chair', 18, 24);
      if (canvas) {
        const ctx = canvas.getContext();
        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(2, 22, 14, 2);

        // Chair legs
        ctx.fillStyle = '#451a03';
        ctx.fillRect(3, 12, 2, 10);
        ctx.fillRect(13, 12, 2, 10);

        // Seat cushion
        ctx.fillStyle = '#991b1b'; // Red velvet cushion
        ctx.fillRect(2, 10, 14, 4);
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(2, 10, 14, 2);

        // Chair backrest
        ctx.fillStyle = '#78350f';
        ctx.fillRect(3, 1, 12, 9);
        ctx.fillStyle = '#991b1b'; // Backrest cushion inset
        ctx.fillRect(5, 3, 8, 6);

        canvas.refresh();
      }
    }

    // 8. Entrance Gateway Step Portal Mat (192x80 2x canvas -> 96x40 display)
    if (!textures.exists('cafe_entrance_gateway')) {
      const canvas = textures.createCanvas('cafe_entrance_gateway', 192, 80);
      if (canvas) {
        const ctx = canvas.getContext();
        // Drop Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.fillRect(4, 4, 184, 72);

        // Step 1: Dark Stone Threshold Base
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, 0, 192, 80);

        // Step 2: Beveled Brass Outer Railings & Frame
        ctx.fillStyle = '#b45309';
        ctx.fillRect(4, 4, 184, 72);
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(6, 6, 180, 2); ctx.fillRect(6, 6, 2, 68);

        // Step 3: Royal Blue Carpet Runway Center (Matching reference entrance carpets)
        ctx.fillStyle = '#1e3a8a';
        ctx.fillRect(12, 10, 168, 60);

        // Plush Carpet Inner Shading & Pattern
        ctx.fillStyle = '#2563eb';
        ctx.fillRect(16, 14, 160, 52);

        // Gold Trim Border inside carpet
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(20, 18, 152, 2);
        ctx.fillRect(20, 60, 152, 2);
        ctx.fillRect(20, 18, 2, 44);
        ctx.fillRect(170, 18, 2, 44);

        // Centered "CODE CAFE ENTRY" / Welcome Gold Chevron Text
        ctx.fillStyle = '#fef08a';
        ctx.font = 'bold 14px "Segoe UI", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('❖  WELCOME TO CODE CAFE  ❖', 96, 44);

        // Downward Entrance Step Indicator Arrows
        ctx.fillStyle = '#60a5fa';
        ctx.fillText('▼                   ▼', 96, 58);

        canvas.refresh();
      }
    }

    // 8b. Carved Grand Entrance Pillar Post with Lantern (64x112 2x canvas -> 32x56 display)
    if (!textures.exists('cafe_entrance_pillar')) {
      const canvas = textures.createCanvas('cafe_entrance_pillar', 64, 112);
      if (canvas) {
        const ctx = canvas.getContext();
        // Ground drop shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.fillRect(4, 100, 56, 12);

        // Heavy Brass Base Pedestal
        ctx.fillStyle = '#78350f';
        ctx.fillRect(8, 88, 48, 20);
        ctx.fillStyle = '#b45309';
        ctx.fillRect(8, 88, 48, 4);
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(8, 88, 48, 2);

        // Carved Dark Oak Vertical Shaft
        ctx.fillStyle = '#270e01';
        ctx.fillRect(12, 28, 40, 60);

        // Vertical Fluting Grooves
        ctx.fillStyle = '#451a03';
        ctx.fillRect(18, 30, 6, 56);
        ctx.fillRect(29, 30, 6, 56);
        ctx.fillRect(40, 30, 6, 56);

        // Shaft Highlight Bevels
        ctx.fillStyle = '#78350f';
        ctx.fillRect(14, 28, 2, 60);

        // Brass Top Capital Crown
        ctx.fillStyle = '#b45309';
        ctx.fillRect(8, 20, 48, 8);
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(8, 20, 48, 2);

        // Warm Brass Lantern Fixture on Top
        // Ambient Light Aura
        ctx.fillStyle = 'rgba(254, 240, 138, 0.35)';
        ctx.fillRect(0, 0, 64, 30);

        // Lantern Housing
        ctx.fillStyle = '#1c0a02';
        ctx.fillRect(16, 2, 32, 20);
        ctx.fillStyle = '#d97706';
        ctx.fillRect(18, 4, 28, 16);

        // Glowing Yellow Glass Pane
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(20, 6, 24, 12);
        ctx.fillStyle = '#ffffff'; // Glowing bulb center
        ctx.fillRect(28, 8, 8, 8);

        // Lantern Top Cap / Finial
        ctx.fillStyle = '#b45309';
        ctx.fillRect(24, 0, 16, 3);

        canvas.refresh();
      }
    }

    // 8c. Continuous Bottom Boundary Wall with Lush Planter Box (768x64 2x canvas -> 384x32 display)
    if (!textures.exists('cafe_entrance_planter_wall')) {
      const canvas = textures.createCanvas('cafe_entrance_planter_wall', 768, 64);
      if (canvas) {
        const ctx = canvas.getContext();
        // Drop Shadow at bottom
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.fillRect(0, 52, 768, 12);

        // Solid Dark Oak Wall Base
        ctx.fillStyle = '#270e01';
        ctx.fillRect(0, 20, 768, 40);

        // Recessed Wood Panels along wall
        for (let x = 8; x < 768; x += 64) {
          ctx.fillStyle = '#451a03';
          ctx.fillRect(x, 24, 52, 32);
          ctx.fillStyle = '#78350f';
          ctx.fillRect(x + 2, 26, 48, 2);
          ctx.fillRect(x + 2, 26, 2, 28);
        }

        // Brass Trim Rail along middle
        ctx.fillStyle = '#b45309';
        ctx.fillRect(0, 20, 768, 4);
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(0, 20, 768, 1);

        // Top Continuous Boxwood Green Hedge Planter
        ctx.fillStyle = '#14532d'; // Dark foliage base
        ctx.fillRect(0, 0, 768, 22);

        // Lush Leaf Texture Clusters
        for (let x = 4; x < 768; x += 12) {
          ctx.fillStyle = '#16a34a'; // Vibrant green
          ctx.fillRect(x, (x % 3) * 2, 10, 16);
          ctx.fillStyle = '#4ade80'; // Bright leaf highlight
          ctx.fillRect(x + 2, (x % 3) * 2 + 2, 4, 4);

          // Red & Gold Small Flower Accents
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

    // 9. Detailed Cafe Chalkboard Wall Menu (280x140 2x supersampled for ultra-crisp text)
    if (!textures.exists('cafe_wall_menu')) {
      const canvas = textures.createCanvas('cafe_wall_menu', 280, 140);
      if (canvas) {
        const ctx = canvas.getContext();
        // Ornate dark mahogany frame
        ctx.fillStyle = '#2b1003';
        ctx.fillRect(0, 0, 280, 140);
        ctx.fillStyle = '#5c280b';
        ctx.fillRect(4, 4, 272, 132);

        // Blackboard surface
        ctx.fillStyle = '#18181b';
        ctx.fillRect(10, 10, 260, 120);

        // Chalk header
        ctx.fillStyle = '#fef08a';
        ctx.font = 'bold 18px "Segoe UI", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('☕ CODE CAFE MENU ☕', 140, 34);

        // Header underline
        ctx.fillStyle = '#d97706';
        ctx.fillRect(40, 40, 200, 2);

        // Chalk items list (Left & Right columns)
        ctx.textAlign = 'left';

        // Column 1: COFFEE
        ctx.fillStyle = '#fef08a';
        ctx.font = 'bold 15px "Segoe UI", sans-serif';
        ctx.fillText('[ COFFEE ]', 24, 62);
        ctx.fillStyle = '#f8fafc';
        ctx.font = '14px "Segoe UI", sans-serif';
        ctx.fillText('Bugfix Brew    $3.50', 24, 84);
        ctx.fillText('Async Espresso $4.00', 24, 104);
        ctx.fillText('Zero-Bug Cold  $4.50', 24, 124);

        // Column 2: SNACKS
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

    // 10. Terrace Stone Floor Tile (32x32)
    if (!textures.exists('cafe_floor_terrace_stone')) {
      const canvas = textures.createCanvas('cafe_floor_terrace_stone', 32, 32);
      if (canvas) {
        const ctx = canvas.getContext();
        ctx.fillStyle = '#cbd5e1'; // Light grey stone base
        ctx.fillRect(0, 0, 32, 32);

        // Grid grout lines
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(0, 31, 32, 1);
        ctx.fillRect(31, 0, 1, 32);

        // Inner tile bevel & texture
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(1, 1, 30, 2);
        ctx.fillRect(1, 1, 2, 30);

        ctx.fillStyle = '#64748b';
        ctx.fillRect(8, 12, 2, 2);
        ctx.fillRect(22, 24, 2, 2);

        canvas.refresh();
      }
    }

    // 11. Grand Glowing CODE CAFE /> Neon Plaque with GLOWING BORDER (300x88 2x supersampled)
    if (!textures.exists('cafe_neon_sign')) {
      const canvas = textures.createCanvas('cafe_neon_sign', 300, 88);
      if (canvas) {
        const ctx = canvas.getContext();
        // Outer Ambient Neon Glow Halo (6px border glow effect)
        ctx.fillStyle = 'rgba(251, 191, 36, 0.45)';
        ctx.fillRect(0, 0, 300, 88);

        // Outer Bright Yellow-Gold Neon Border
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(4, 4, 292, 80);

        // Middle Amber Neon Tube Border
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(8, 8, 284, 72);

        // Dark Mahogany Carved Sign Backing
        ctx.fillStyle = '#1c0a02';
        ctx.fillRect(12, 12, 276, 64);

        // Inner Glow Inset
        ctx.fillStyle = '#3a1705';
        ctx.fillRect(16, 16, 268, 56);

        // Brass corner rivets
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(16, 16, 8, 8); ctx.fillRect(276, 16, 8, 8);
        ctx.fillRect(16, 64, 8, 8); ctx.fillRect(276, 64, 8, 8);

        // Glowing Coffee Cup Icon on Left
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(32, 32, 24, 24); // Cup body
        ctx.fillRect(56, 36, 6, 16);  // Handle
        ctx.fillStyle = '#d97706';
        ctx.fillRect(36, 36, 16, 16); // Cup coffee

        // Steaming Wisps
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(36, 22, 4, 6);
        ctx.fillRect(44, 18, 4, 8);
        ctx.fillRect(50, 22, 4, 6);

        // Neon Text "CODE CAFE />" with intense glow effect
        ctx.textAlign = 'center';
        ctx.font = 'bold 30px "Segoe UI", monospace';

        // Outer glow text shadow
        ctx.fillStyle = '#b45309';
        ctx.fillText('CODE CAFE />', 180, 56);

        ctx.fillStyle = '#fef08a';
        ctx.fillText('CODE CAFE />', 178, 54);

        ctx.fillStyle = '#ffffff'; // White glowing core
        ctx.fillText('CODE CAFE />', 176, 52);

        canvas.refresh();
      }
    }

    // 12. "TEA SLEEP CODE REPEAT" Wall Poster / Sign (220x140 2x supersampled)
    if (!textures.exists('cafe_wall_poster')) {
      const canvas = textures.createCanvas('cafe_wall_poster', 220, 140);
      if (canvas) {
        const ctx = canvas.getContext();
        // Deep walnut frame
        ctx.fillStyle = '#2d1810';
        ctx.fillRect(0, 0, 220, 140);
        ctx.fillStyle = '#b45309'; // Inner gold bevel line
        ctx.fillRect(6, 6, 208, 128);

        // Blackboard poster surface
        ctx.fillStyle = '#1c1917';
        ctx.fillRect(10, 10, 200, 120);

        // Chalk & Gold Typography with Icons
        ctx.textAlign = 'center';
        ctx.font = 'bold 20px "Segoe UI", sans-serif';

        // ☕ TEA
        ctx.fillStyle = '#fef08a';
        ctx.fillText('☕ TEA', 110, 38);

        // 💤 SLEEP
        ctx.fillStyle = '#a5f3fc';
        ctx.fillText('💤 SLEEP', 110, 66);

        // 💻 CODE
        ctx.fillStyle = '#86efac';
        ctx.fillText('💻 CODE', 110, 94);

        // 🔁 REPEAT
        ctx.fillStyle = '#fdba74';
        ctx.fillText('🔁 REPEAT', 110, 122);

        canvas.refresh();
      }
    }

    // 13. Glass Pastry Display Case (40x36)
    if (!textures.exists('cafe_pastry_display')) {
      const canvas = textures.createCanvas('cafe_pastry_display', 40, 36);
      if (canvas) {
        const ctx = canvas.getContext();
        // Brass Frame
        ctx.fillStyle = '#b45309';
        ctx.fillRect(0, 0, 40, 36);

        // Warm LED Glowing Interior
        ctx.fillStyle = '#2d1810';
        ctx.fillRect(2, 2, 36, 32);
        ctx.fillStyle = 'rgba(254, 240, 138, 0.15)';
        ctx.fillRect(2, 2, 36, 32);

        // Glass Reflection
        ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.fillRect(4, 4, 28, 3);

        // Shelves (3 Tiers)
        ctx.fillStyle = '#d97706';
        ctx.fillRect(2, 12, 36, 2);
        ctx.fillRect(2, 22, 36, 2);

        // Tier 1 Pastries (Golden Croissants & Cinnamon Rolls)
        ctx.fillStyle = '#f59e0b'; ctx.fillRect(4, 8, 8, 4); // Croissant
        ctx.fillStyle = '#d97706'; ctx.fillRect(16, 7, 6, 5); // Cinnamon roll
        ctx.fillStyle = '#ffffff'; ctx.fillRect(17, 8, 4, 1); // Icing
        ctx.fillStyle = '#fbbf24'; ctx.fillRect(26, 8, 8, 4); // Danishes

        // Tier 2 Pastries (Blueberry Muffins & Pink Sprinkled Donuts)
        ctx.fillStyle = '#a16207'; ctx.fillRect(5, 17, 7, 5); // Muffin
        ctx.fillStyle = '#3b82f6'; ctx.fillRect(7, 18, 3, 2); // Blueberries
        ctx.fillStyle = '#f472b6'; ctx.fillRect(16, 18, 7, 4); // Donut
        ctx.fillStyle = '#fbbf24'; ctx.fillRect(27, 18, 8, 4); // Scone

        // Tier 3 Pastries (Strawberry Cheesecake & Chocolate Cake Slices)
        ctx.fillStyle = '#fef08a'; ctx.fillRect(6, 27, 8, 5); // Cake
        ctx.fillStyle = '#ef4444'; ctx.fillRect(6, 26, 8, 2); // Strawberry topping
        ctx.fillStyle = '#451a03'; ctx.fillRect(18, 27, 9, 5); // Chocolate cake
        ctx.fillStyle = '#f59e0b'; ctx.fillRect(30, 28, 6, 4); // Cookies

        canvas.refresh();
      }
    }

    // 14. Grand Library Bookshelf (52x80)
    if (!textures.exists('cafe_bookshelf')) {
      const canvas = textures.createCanvas('cafe_bookshelf', 52, 80);
      if (canvas) {
        const ctx = canvas.getContext();
        // Grand dark mahogany cabinet frame
        ctx.fillStyle = '#2b1003';
        ctx.fillRect(0, 0, 52, 80);
        ctx.fillStyle = '#4a200a';
        ctx.fillRect(3, 3, 46, 74);

        // 4 Sturdy Shelves
        ctx.fillStyle = '#1c0a02';
        ctx.fillRect(3, 22, 46, 3);
        ctx.fillRect(3, 41, 46, 3);
        ctx.fillRect(3, 60, 46, 3);

        // Colorful book spines + Tech manuals
        const bookColors = ['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#a855f7', '#ec4899', '#06b6d4', '#f97316'];

        // Shelf 1: Glowing Tech Manuals
        let bx = 5;
        for (let i = 0; i < 9; i++) {
          ctx.fillStyle = bookColors[i % bookColors.length];
          ctx.fillRect(bx, 8, 4, 14);
          // Gold spine foil line
          ctx.fillStyle = '#fef08a';
          ctx.fillRect(bx + 1, 10, 2, 2);
          bx += 5;
        }

        // Shelf 2: Mixed volumes
        bx = 5;
        for (let i = 0; i < 8; i++) {
          ctx.fillStyle = bookColors[(i + 3) % bookColors.length];
          ctx.fillRect(bx, 27, 4, 14);
          bx += 5;
        }
        // Slanted book at end of shelf 2
        ctx.fillStyle = '#a855f7';
        ctx.fillRect(45, 30, 3, 11);

        // Shelf 3: Tech Books (JS, PY, AI)
        bx = 5;
        for (let i = 0; i < 9; i++) {
          ctx.fillStyle = bookColors[(i + 5) % bookColors.length];
          ctx.fillRect(bx, 46, 4, 14);
          bx += 5;
        }

        // Shelf 4: Encyclopedias
        bx = 5;
        for (let i = 0; i < 9; i++) {
          ctx.fillStyle = '#451a03';
          ctx.fillRect(bx, 65, 4, 12);
          ctx.fillStyle = '#d97706';
          ctx.fillRect(bx + 1, 67, 2, 8);
          bx += 5;
        }

        // Top of Bookshelf: Trailing Pothos Green Ivy Plant
        ctx.fillStyle = '#15803d';
        ctx.fillRect(38, 0, 10, 3);
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(40, 2, 8, 6);
        ctx.fillRect(44, 7, 4, 8); // Trailing vine down right side

        canvas.refresh();
      }
    }

    // 15. Open Terrace Glass Window Wall (96x64)
    if (!textures.exists('cafe_terrace_window')) {
      const canvas = textures.createCanvas('cafe_terrace_window', 96, 64);
      if (canvas) {
        const ctx = canvas.getContext();
        // Window wooden arch frame
        ctx.fillStyle = '#451a03';
        ctx.fillRect(0, 0, 96, 64);

        // Outside sky & garden view through panes
        ctx.fillStyle = '#bae6fd'; // Sky blue
        ctx.fillRect(4, 4, 42, 56);
        ctx.fillRect(50, 4, 42, 56);

        // Outside trees & sun rays
        ctx.fillStyle = '#86efac'; ctx.fillRect(8, 20, 20, 30);
        ctx.fillStyle = '#22c55e'; ctx.fillRect(12, 10, 28, 40);
        ctx.fillStyle = '#16a34a'; ctx.fillRect(54, 15, 30, 40);

        // Window pane grid bars
        ctx.fillStyle = '#78350f';
        ctx.fillRect(24, 4, 3, 56);
        ctx.fillRect(70, 4, 3, 56);
        ctx.fillRect(4, 30, 88, 3);

        // Glass sheen reflections
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath(); ctx.moveTo(6, 6); ctx.lineTo(30, 6); ctx.lineTo(6, 30); ctx.fill();
        ctx.beginPath(); ctx.moveTo(52, 6); ctx.lineTo(76, 6); ctx.lineTo(52, 30); ctx.fill();

        canvas.refresh();
      }
    }

    // 16. Ivy Vines Crawling (48x24)
    if (!textures.exists('cafe_ivy_vine')) {
      const canvas = textures.createCanvas('cafe_ivy_vine', 48, 24);
      if (canvas) {
        const ctx = canvas.getContext();
        ctx.fillStyle = '#15803d'; // Dark green leaves
        ctx.fillRect(0, 0, 48, 6);
        ctx.fillRect(6, 6, 12, 10);
        ctx.fillRect(24, 6, 16, 12);
        ctx.fillRect(40, 6, 8, 8);

        ctx.fillStyle = '#22c55e'; // Bright green leaves
        ctx.fillRect(2, 2, 44, 4);
        ctx.fillRect(8, 8, 8, 6);
        ctx.fillRect(26, 8, 12, 8);

        ctx.fillStyle = '#86efac'; // Highlights
        ctx.fillRect(10, 10, 3, 3);
        ctx.fillRect(30, 10, 4, 3);

        canvas.refresh();
      }
    }

    // 17. Cozy Leather Lounge Sofa Side View for Left Wall (36x56)
    if (!textures.exists('cafe_sofa_side')) {
      const canvas = textures.createCanvas('cafe_sofa_side', 36, 56);
      if (canvas) {
        const ctx = canvas.getContext();
        // Drop shadow on floor
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.fillRect(4, 52, 32, 4);

        // Main warm caramel leather body base
        ctx.fillStyle = '#7c2d12';
        ctx.fillRect(0, 0, 36, 56);

        // Backrest attached flush to the left wall (x: 0 to 10)
        ctx.fillStyle = '#521d0a';
        ctx.fillRect(0, 0, 10, 56);
        ctx.fillStyle = '#9a3412';
        ctx.fillRect(2, 2, 4, 52); // Backrest cushion highlight

        // Top Armrest (y: 0 to 10) and Bottom Armrest (y: 46 to 56)
        ctx.fillStyle = '#6e270d';
        ctx.fillRect(10, 0, 26, 10);
        ctx.fillRect(10, 46, 26, 10);

        // Armrest highlights
        ctx.fillStyle = '#b45309';
        ctx.fillRect(12, 2, 22, 3);
        ctx.fillRect(12, 48, 22, 3);

        // Seat Cushions (Top & Bottom halves)
        ctx.fillStyle = '#9a3412';
        ctx.fillRect(10, 10, 24, 17);
        ctx.fillRect(10, 29, 24, 17);

        // Seat Cushion Highlights & Creases
        ctx.fillStyle = '#c2410c';
        ctx.fillRect(12, 12, 20, 2);
        ctx.fillRect(12, 31, 20, 2);
        ctx.fillStyle = '#451a03';
        ctx.fillRect(10, 27, 24, 2); // Center cushion divider seam

        // Wooden legs
        ctx.fillStyle = '#270e01';
        ctx.fillRect(30, 52, 4, 4);
        ctx.fillRect(12, 52, 4, 4);

        canvas.refresh();
      }
    }

    // 18. Legacy Cozy Leather Lounge Sofa (44x28)
    if (!textures.exists('cafe_sofa')) {
      const canvas = textures.createCanvas('cafe_sofa', 44, 28);
      if (canvas) {
        const ctx = canvas.getContext();
        // Drop shadow
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.fillRect(2, 24, 40, 4);

        // Main warm caramel leather body
        ctx.fillStyle = '#9a3412';
        ctx.fillRect(0, 4, 44, 20);

        // Backrest padded cushion
        ctx.fillStyle = '#7c2d12';
        ctx.fillRect(2, 2, 40, 10);
        ctx.fillStyle = '#c2410c';
        ctx.fillRect(4, 3, 16, 2); // Left backrest highlight
        ctx.fillRect(24, 3, 16, 2); // Right backrest highlight

        // Armrests
        ctx.fillStyle = '#7c2d12';
        ctx.fillRect(0, 6, 6, 16);
        ctx.fillRect(38, 6, 6, 16);

        // Seat cushions
        ctx.fillStyle = '#b45309';
        ctx.fillRect(6, 12, 15, 10);
        ctx.fillRect(23, 12, 15, 10);

        // Wooden legs
        ctx.fillStyle = '#270e01';
        ctx.fillRect(2, 22, 3, 4);
        ctx.fillRect(39, 22, 3, 4);

        canvas.refresh();
      }
    }
  }
}

