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
    // 1. Primary Warm Golden Oak Wood Floor Tile (32x32) - Image 5 Open Terrace Style
    if (!textures.exists('cafe_floor_wood_1')) {
      const canvas = textures.createCanvas('cafe_floor_wood_1', 32, 32);
      if (canvas) {
        const ctx = canvas.getContext();
        ctx.fillStyle = '#85522b'; // Light Warm Golden Oak Base
        ctx.fillRect(0, 0, 32, 32);

        // Wood grain & plank seams
        ctx.fillStyle = '#6e411f';
        ctx.fillRect(0, 0, 32, 1);
        ctx.fillRect(0, 16, 32, 1);
        ctx.fillRect(16, 0, 1, 16);
        ctx.fillRect(8, 16, 1, 16);

        // Lighter grain highlights
        ctx.fillStyle = '#a16638';
        ctx.fillRect(2, 4, 12, 1);
        ctx.fillRect(18, 8, 10, 1);
        ctx.fillRect(10, 22, 14, 1);

        canvas.refresh();
      }
    }

    // 2. Secondary Warm Golden Oak Wood Floor Tile (32x32)
    if (!textures.exists('cafe_floor_wood_2')) {
      const canvas = textures.createCanvas('cafe_floor_wood_2', 32, 32);
      if (canvas) {
        const ctx = canvas.getContext();
        ctx.fillStyle = '#7a4a25'; // Lighter Secondary Oak Base
        ctx.fillRect(0, 0, 32, 32);

        // Wood grain & plank seams
        ctx.fillStyle = '#633a1b';
        ctx.fillRect(0, 0, 32, 1);
        ctx.fillRect(0, 16, 32, 1);
        ctx.fillRect(16, 0, 1, 16);
        ctx.fillRect(24, 16, 1, 16);

        // Grain highlights
        ctx.fillStyle = '#965e31';
        ctx.fillRect(4, 6, 10, 1);
        ctx.fillRect(20, 10, 8, 1);
        ctx.fillRect(12, 24, 10, 1);

        canvas.refresh();
      }
    }

    // Legacy fallback texture alias
    if (!textures.exists('cafe_floor_wood')) {
      const canvas = textures.createCanvas('cafe_floor_wood', 32, 32);
      if (canvas) {
        const ctx = canvas.getContext();
        ctx.fillStyle = '#85522b';
        ctx.fillRect(0, 0, 32, 32);
        canvas.refresh();
      }
    }

    // 3. Cozy Terrace Warm Stone Patio Tile (32x32)
    if (!textures.exists('cafe_floor_terrace_stone')) {
      const canvas = textures.createCanvas('cafe_floor_terrace_stone', 32, 32);
      if (canvas) {
        const ctx = canvas.getContext();
        ctx.fillStyle = '#59493a'; // Warm Stone grout base
        ctx.fillRect(0, 0, 32, 32);

        // Light warm stone pavers
        ctx.fillStyle = '#7c6a58';
        ctx.fillRect(1, 1, 14, 14);
        ctx.fillRect(17, 1, 14, 14);
        ctx.fillRect(1, 17, 30, 14);

        // Bevel highlights
        ctx.fillStyle = '#917d6a';
        ctx.fillRect(2, 2, 12, 2);
        ctx.fillRect(18, 2, 12, 2);
        ctx.fillRect(2, 18, 28, 2);

        canvas.refresh();
      }
    }

    // 4. Two-Tone Open Terrace Cafe Wall: Lighter Stone/Plaster Upper + Dark Oak Wood Lower + Hanging Vines
    if (!textures.exists('cafe_wall_brick')) {
      const canvas = textures.createCanvas('cafe_wall_brick', 32, 32);
      if (canvas) {
        const ctx = canvas.getContext();
        // Upper Wall Half: Lighter warm beige plaster/stone
        ctx.fillStyle = '#9c8971';
        ctx.fillRect(0, 0, 32, 16);

        // Subtle upper stone texture lines
        ctx.fillStyle = '#8f7b62';
        ctx.fillRect(0, 7, 32, 1);
        ctx.fillRect(16, 0, 1, 7);
        ctx.fillRect(8, 8, 1, 8);

        // Lower Wall Half: Dark Oak Wood Planks
        ctx.fillStyle = '#3e2617';
        ctx.fillRect(0, 16, 32, 16);

        // Vertical Wood Seams & Panel Highlights
        ctx.fillStyle = '#29180e';
        ctx.fillRect(0, 16, 32, 1); // Border seam separating upper plaster & lower wood
        ctx.fillRect(8, 16, 1, 16);
        ctx.fillRect(16, 16, 1, 16);
        ctx.fillRect(24, 16, 1, 16);

        // Lighter wood grain highlights
        ctx.fillStyle = '#523420';
        ctx.fillRect(2, 20, 4, 1);
        ctx.fillRect(10, 24, 4, 1);
        ctx.fillRect(18, 18, 4, 1);
        ctx.fillRect(26, 26, 4, 1);

        // Hanging Ivy Vines along top edge
        ctx.fillStyle = '#15803d'; // Dark green leaves
        ctx.fillRect(2, 0, 6, 4);
        ctx.fillRect(12, 0, 8, 5);
        ctx.fillRect(24, 0, 6, 3);
        ctx.fillStyle = '#22c55e'; // Bright leaf highlights
        ctx.fillRect(3, 1, 3, 2);
        ctx.fillRect(14, 1, 4, 3);
        ctx.fillRect(25, 1, 3, 1);

        // Baseboard Skirting at very bottom
        ctx.fillStyle = '#21130a';
        ctx.fillRect(0, 28, 32, 4);

        canvas.refresh();
      }
    }

    // 3. Open Terrace Cafe Style Grand Oak Counter with Sleek Cashier POS (190x44)
    if (!textures.exists('cafe_counter')) {
      const canvas = textures.createCanvas('cafe_counter', 190, 44);
      if (canvas) {
        const ctx = canvas.getContext();
        // Drop shadow on floor
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.fillRect(4, 38, 182, 6);

        // Open Terrace Cafe Warm Oak Body Base
        ctx.fillStyle = '#3a1805';
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
        ctx.fillStyle = '#60330a';
        ctx.fillRect(0, 0, 190, 10);
        ctx.fillStyle = '#a16207';
        ctx.fillRect(0, 0, 190, 4); // Top surface
        ctx.fillStyle = '#d97706';
        ctx.fillRect(0, 0, 190, 2); // Highlight rim
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(0, 0, 190, 1); // Shiny spec edge

        // --- SLEEK CASHIER POS TERMINAL & RECEIPT PRINTER (x=95 to 125) ---
        // Cash Register Drawer Base underneath
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(92, 7, 28, 3);
        ctx.fillStyle = '#475569';
        ctx.fillRect(94, 8, 24, 1); // Drawer slot

        // POS Monitor Stand
        ctx.fillStyle = '#334155';
        ctx.fillRect(104, 5, 4, 3);

        // Sleek POS Touchscreen Display (Angled)
        ctx.fillStyle = '#0f172a'; // Bezel
        ctx.fillRect(95, 0, 22, 11);
        ctx.fillStyle = '#020617'; // Screen glass
        ctx.fillRect(97, 1, 18, 8);

        // POS Screen UI Elements
        ctx.fillStyle = '#38bdf8'; // Blue title header
        ctx.fillRect(98, 2, 16, 2);
        ctx.fillStyle = '#22c55e'; // Green item total text
        ctx.fillRect(98, 5, 10, 1);
        ctx.fillRect(98, 7, 12, 1);
        ctx.fillStyle = '#f59e0b'; // Pay button
        ctx.fillRect(111, 5, 3, 3);

        // Compact Thermal Receipt Printer beside POS
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(122, 3, 10, 7);
        ctx.fillStyle = '#f8fafc'; // Paper receipt sticking out
        ctx.fillRect(124, 1, 6, 3);
        ctx.fillStyle = '#94a3b8'; // Print text line on receipt
        ctx.fillRect(125, 2, 4, 1);

        // --- COFFEE CUP STACK & SLEEVES (x=16 to 32) ---
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(16, 1, 6, 8);
        ctx.fillRect(24, 1, 6, 8);
        ctx.fillStyle = '#b45309'; // Warm cardboard sleeves
        ctx.fillRect(16, 4, 6, 3);
        ctx.fillRect(24, 4, 6, 3);

        // --- GLASS PASTRY DISPLAY CASE ON RIGHT SIDE (x=142 to 182) ---
        // Metallic Frame Base & Edges
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(142, 0, 42, 10);
        ctx.fillStyle = '#334155';
        ctx.fillRect(143, 0, 40, 1); // Metallic top trim
        ctx.fillRect(143, 0, 1, 10); // Left frame
        ctx.fillRect(182, 0, 1, 10); // Right frame

        // Shelf 1 (Upper Shelf Line)
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(144, 4, 38, 1);

        // Pastries - Shelf 1 (Top): Croissants & Muffins
        ctx.fillStyle = '#d97706'; // Golden Croissants
        ctx.fillRect(147, 1, 7, 3);
        ctx.fillRect(158, 1, 7, 3);
        ctx.fillStyle = '#78350f'; // Chocolate Muffin
        ctx.fillRect(169, 1, 6, 3);
        ctx.fillStyle = '#f59e0b'; // Cinnamon Roll
        ctx.fillRect(177, 1, 5, 3);

        // Pastries - Shelf 2 (Bottom): Cake Slices & Cookies
        ctx.fillStyle = '#b45309'; // Golden Chocolate Chip Cookies
        ctx.fillRect(146, 6, 5, 3);
        ctx.fillRect(153, 6, 5, 3);
        ctx.fillStyle = '#fde047'; // Lemon/Yellow Cake Slice
        ctx.fillRect(161, 5, 8, 4);
        ctx.fillStyle = '#ef4444'; // Strawberry Topping
        ctx.fillRect(163, 5, 4, 1);
        ctx.fillStyle = '#a16207'; // Pie Slice
        ctx.fillRect(172, 5, 8, 4);

        // Glass Front & Diagonal Light Reflection Glare
        ctx.fillStyle = 'rgba(186, 230, 253, 0.35)';
        ctx.fillRect(143, 1, 39, 8);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fillRect(146, 1, 2, 8); // White glare streak 1
        ctx.fillRect(152, 1, 1, 8); // White glare streak 2
        ctx.fillRect(176, 1, 2, 8); // White glare streak 3

        canvas.refresh();
      }
    }

    // 3b. Counter Side Return Wing (24x50) - Covers Left and Right sides of Cashier Desk
    if (!textures.exists('cafe_counter_side')) {
      const canvas = textures.createCanvas('cafe_counter_side', 24, 50);
      if (canvas) {
        const ctx = canvas.getContext();
        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.fillRect(0, 0, 24, 50);

        // Body base
        ctx.fillStyle = '#3a1805';
        ctx.fillRect(2, 0, 20, 50);

        // Panelling
        ctx.fillStyle = '#854d0e';
        ctx.fillRect(4, 2, 16, 46);

        // Inner panel
        ctx.fillStyle = '#270e01';
        ctx.fillRect(6, 6, 12, 38);
        ctx.fillStyle = '#a16207';
        ctx.fillRect(8, 8, 8, 34);

        // Polished top counter slab edge
        ctx.fillStyle = '#60330a';
        ctx.fillRect(0, 0, 24, 8);
        ctx.fillStyle = '#a16207';
        ctx.fillRect(0, 0, 24, 3);
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(0, 0, 24, 1);

        canvas.refresh();
      }
    }

    // 3c. Backwall Wooden Brick Panel Structure behind Counter (240x70)
    if (!textures.exists('cafe_counter_backwall')) {
      const canvas = textures.createCanvas('cafe_counter_backwall', 240, 70);
      if (canvas) {
        const ctx = canvas.getContext();
        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.fillRect(0, 0, 240, 70);

        // Dark Walnut Wood/Brick Panel Base
        ctx.fillStyle = '#2d180c';
        ctx.fillRect(2, 2, 236, 66);

        // Recessed Panel Bricks
        for (let y = 6; y < 62; y += 14) {
          for (let x = 6; x < 230; x += 32) {
            const shift = (Math.floor(y / 14) % 2) * 16;
            ctx.fillStyle = '#3e2415';
            ctx.fillRect(x + shift, y, 28, 10);
            ctx.fillStyle = '#54331d';
            ctx.fillRect(x + shift + 1, y + 1, 26, 2);
          }
        }

        // Gold Bevel Edge Frame
        ctx.fillStyle = '#b45309';
        ctx.fillRect(0, 0, 240, 3);
        ctx.fillRect(0, 67, 240, 3);
        ctx.fillRect(0, 0, 3, 70);
        ctx.fillRect(237, 0, 3, 70);

        // Ivy Vines on Top/Sides
        ctx.fillStyle = '#15803d';
        ctx.fillRect(0, 0, 240, 5);
        ctx.fillRect(0, 0, 5, 70);
        ctx.fillRect(235, 0, 5, 70);

        canvas.refresh();
      }
    }

    // 3d. Soft Coffee Machine Steam / Smoke Particle (8x8)
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

    // 4b. Glass Pastry Showcase Display Cabinet (44x32)
    if (!textures.exists('cafe_pastry_display')) {
      const canvas = textures.createCanvas('cafe_pastry_display', 44, 32);
      if (canvas) {
        const ctx = canvas.getContext();
        // Shadow base
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(2, 28, 40, 4);

        // Dark Slate Frame
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, 2, 44, 28);
        ctx.fillStyle = '#334155';
        ctx.fillRect(2, 0, 40, 2); // Top metal bevel

        // Clear Glass Interior Background
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(2, 2, 40, 26);

        // Glass Shelf 1 (Top)
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(3, 14, 38, 1);

        // Pastries - Shelf 1 (Top): Golden Croissants & Chocolate Muffin
        ctx.fillStyle = '#d97706'; // Golden Croissants
        ctx.fillRect(6, 8, 8, 5);
        ctx.fillRect(18, 8, 8, 5);
        ctx.fillStyle = '#78350f'; // Chocolate Muffin
        ctx.fillRect(30, 7, 7, 6);

        // Pastries - Shelf 2 (Bottom): Cake Slice & Cookies
        ctx.fillStyle = '#b45309'; // Golden Cookies
        ctx.fillRect(5, 20, 6, 5);
        ctx.fillRect(13, 20, 6, 5);
        ctx.fillStyle = '#fde047'; // Lemon/Yellow Cake Slice
        ctx.fillRect(22, 18, 9, 7);
        ctx.fillStyle = '#ef4444'; // Strawberry Topping
        ctx.fillRect(25, 18, 4, 2);
        ctx.fillStyle = '#a16207'; // Pie Slice
        ctx.fillRect(33, 18, 8, 7);

        // Front Glass Pane Reflection & Glare
        ctx.fillStyle = 'rgba(186, 230, 253, 0.3)';
        ctx.fillRect(2, 2, 40, 26);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fillRect(5, 3, 2, 24); // Glare line 1
        ctx.fillRect(12, 3, 1, 24); // Glare line 2
        ctx.fillRect(36, 3, 2, 24); // Glare line 3

        canvas.refresh();
      }
    }

    // 5. Cafe Barista NPC (24x34) - White Fair Skin Tone
    if (!textures.exists('cafe_barista')) {
      const canvas = textures.createCanvas('cafe_barista', 24, 34);
      if (canvas) {
        const ctx = canvas.getContext();
        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.beginPath();
        ctx.ellipse(12, 32, 8, 2, 0, 0, Math.PI * 2);
        ctx.fill();

        // Dark Hair & Cap
        ctx.fillStyle = '#3f1d0b';
        ctx.fillRect(6, 5, 12, 7);

        // Head / Face - Fair White Skin Tone (#ffedd5)
        ctx.fillStyle = '#ffedd5';
        ctx.fillRect(7, 8, 10, 8);

        // Rosy Cheeks
        ctx.fillStyle = '#fca5a5';
        ctx.fillRect(7, 13, 2, 2);
        ctx.fillRect(15, 13, 2, 2);

        // Eyes & Smile
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(8, 11, 2, 2); // eyes
        ctx.fillRect(14, 11, 2, 2);
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(11, 14, 2, 1); // smile

        // Green Barista Apron
        ctx.fillStyle = '#15803d';
        ctx.fillRect(5, 16, 14, 16);
        ctx.fillStyle = '#22c55e'; // Apron chest bib
        ctx.fillRect(7, 18, 10, 12);
        ctx.fillStyle = '#ffffff'; // Coffee badge
        ctx.fillRect(11, 20, 2, 3);

        // Barista Cap / Coffee cup hat
        ctx.fillStyle = '#16a34a';
        ctx.fillRect(5, 2, 14, 3);
        ctx.fillStyle = '#15803d';
        ctx.fillRect(4, 4, 16, 2);

        canvas.refresh();
      }
    }

    // 6. Cafe Table Base (48x48 for rich pixel scale matching reference image)
    if (!textures.exists('cafe_interior_table')) {
      const canvas = textures.createCanvas('cafe_interior_table', 48, 48);
      if (canvas) {
        const ctx = canvas.getContext();
        // Drop Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(24, 44, 20, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Sturdy Dark Metal Pedestal Base
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(22, 22, 4, 20);
        ctx.fillRect(12, 40, 24, 4);

        // Circular Dark Walnut Top Rim
        ctx.fillStyle = '#270e01';
        ctx.beginPath();
        ctx.ellipse(24, 18, 22, 14, 0, 0, Math.PI * 2);
        ctx.fill();

        // Polished Warm Golden-Mahogany Surface
        ctx.fillStyle = '#78350f';
        ctx.beginPath();
        ctx.ellipse(24, 17, 20, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        // Inner Wood Grain Ring
        ctx.fillStyle = '#92400e';
        ctx.beginPath();
        ctx.ellipse(24, 16, 17, 10, 0, 0, Math.PI * 2);
        ctx.fill();

        // Surface Highlight
        ctx.fillStyle = '#b45309';
        ctx.beginPath();
        ctx.ellipse(24, 15, 13, 7, 0, 0, Math.PI * 2);
        ctx.fill();

        canvas.refresh();
      }
    }

    // 6b. Cafe Table with Laptop
    if (!textures.exists('cafe_interior_table_laptop')) {
      const canvas = textures.createCanvas('cafe_interior_table_laptop', 48, 48);
      if (canvas) {
        const ctx = canvas.getContext();
        // Draw base table
        const baseTable = textures.get('cafe_interior_table').getSourceImage() as CanvasImageSource;
        ctx.drawImage(baseTable, 0, 0);

        // Open Laptop on table
        ctx.fillStyle = '#334155'; // Metallic silver body
        ctx.fillRect(16, 16, 16, 10); // Base keyboard
        ctx.fillStyle = '#38bdf8'; // Glowing blue screen
        ctx.fillRect(18, 10, 12, 7);
        ctx.fillStyle = '#f8fafc'; // Code text lines on screen
        ctx.fillRect(20, 12, 8, 1); ctx.fillRect(20, 14, 6, 1);

        // Small Coffee Espresso Cup
        ctx.fillStyle = '#ffffff'; ctx.fillRect(34, 14, 5, 5);
        ctx.fillStyle = '#451a03'; ctx.fillRect(35, 15, 3, 3);

        canvas.refresh();
      }
    }

    // 6c. Cafe Table with Coffee & Pastry
    if (!textures.exists('cafe_interior_table_coffee')) {
      const canvas = textures.createCanvas('cafe_interior_table_coffee', 48, 48);
      if (canvas) {
        const ctx = canvas.getContext();
        const baseTable = textures.get('cafe_interior_table').getSourceImage() as CanvasImageSource;
        ctx.drawImage(baseTable, 0, 0);

        // White Saucer & Coffee Cup
        ctx.fillStyle = '#cbd5e1';
        ctx.beginPath(); ctx.ellipse(20, 16, 6, 4, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ffffff'; ctx.fillRect(17, 13, 6, 5);
        ctx.fillStyle = '#78350f'; ctx.fillRect(18, 14, 4, 3);

        // Pastry Plate with Croissant
        ctx.fillStyle = '#e2e8f0';
        ctx.beginPath(); ctx.ellipse(32, 16, 6, 4, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#d97706'; ctx.fillRect(29, 14, 6, 4);

        canvas.refresh();
      }
    }

    // 6d. Cafe Table with Plant / Succulent
    if (!textures.exists('cafe_interior_table_plant')) {
      const canvas = textures.createCanvas('cafe_interior_table_plant', 48, 48);
      if (canvas) {
        const ctx = canvas.getContext();
        const baseTable = textures.get('cafe_interior_table').getSourceImage() as CanvasImageSource;
        ctx.drawImage(baseTable, 0, 0);

        // Small Terra Cotta Pot with Succulent
        ctx.fillStyle = '#c2410c'; ctx.fillRect(21, 14, 6, 6);
        ctx.fillStyle = '#15803d'; ctx.fillRect(19, 10, 10, 5);
        ctx.fillStyle = '#4ade80'; ctx.fillRect(21, 9, 6, 4);

        // Coffee Cup
        ctx.fillStyle = '#ffffff'; ctx.fillRect(12, 15, 5, 4);
        ctx.fillStyle = '#78350f'; ctx.fillRect(13, 16, 3, 2);

        canvas.refresh();
      }
    }

    // 7. Cafe Chair (22x28 for rich scale)
    if (!textures.exists('cafe_interior_chair')) {
      const canvas = textures.createCanvas('cafe_interior_chair', 22, 28);
      if (canvas) {
        const ctx = canvas.getContext();
        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.fillRect(2, 25, 18, 3);

        // Chair legs & Frame
        ctx.fillStyle = '#270e01';
        ctx.fillRect(3, 14, 3, 12);
        ctx.fillRect(16, 14, 3, 12);

        // Rich Red Velvet Seat Cushion
        ctx.fillStyle = '#7f1d1d';
        ctx.fillRect(2, 12, 18, 5);
        ctx.fillStyle = '#991b1b';
        ctx.fillRect(2, 12, 18, 3);
        ctx.fillStyle = '#dc2626'; // Highlight lip
        ctx.fillRect(3, 12, 16, 1);

        // Carved Mahogany Backrest with Red Velvet Inset
        ctx.fillStyle = '#451a03';
        ctx.fillRect(3, 1, 16, 11);
        ctx.fillStyle = '#78350f';
        ctx.fillRect(4, 2, 14, 1);
        ctx.fillStyle = '#991b1b'; // Backrest cushion
        ctx.fillRect(5, 3, 12, 8);
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(6, 4, 10, 6);

        canvas.refresh();
      }
    }

    // 7b. POS Register / Cash Counter Terminal (24x24)
    if (!textures.exists('cafe_pos_terminal')) {
      const canvas = textures.createCanvas('cafe_pos_terminal', 24, 24);
      if (canvas) {
        const ctx = canvas.getContext();
        // Stand base
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(6, 18, 12, 6);

        // Terminal Screen (Angled facing front)
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(2, 4, 20, 14);
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(4, 6, 16, 10);

        // Screen Display Items
        ctx.fillStyle = '#38bdf8'; // Order total text
        ctx.fillRect(6, 8, 12, 2);
        ctx.fillStyle = '#22c55e'; // Item buttons
        ctx.fillRect(6, 11, 4, 3);
        ctx.fillRect(11, 11, 4, 3);

        canvas.refresh();
      }
    }

    // 7c. Centerpiece Grand Garden Planter Island (160x500 canvas -> 80x250 display)
    if (!textures.exists('cafe_center_garden_planter')) {
      const canvas = textures.createCanvas('cafe_center_garden_planter', 160, 500);
      if (canvas) {
        const ctx = canvas.getContext();
        // Ground Drop Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.fillRect(4, 4, 152, 492);

        // Heavy Outer Polished Oak Wood Frame (straight outer edges matching floor oak palette #451a03 / #78350f)
        ctx.fillStyle = '#451a03';
        ctx.fillRect(0, 0, 160, 500);

        // Beveled Inner Wood Edge
        ctx.fillStyle = '#78350f';
        ctx.fillRect(6, 6, 148, 488);

        ctx.fillStyle = '#92400e';
        ctx.fillRect(10, 10, 140, 480);

        // Recessed Rich Dark Soil Bed (SMOOTHLY CURVED / ROUNDED GRASS BED CORNERS)
        ctx.fillStyle = '#1c0a02';
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(18, 18, 124, 464, 48);
        } else {
          ctx.rect(18, 18, 124, 464);
        }
        ctx.fill();

        // Deep Green Base Foliage / Moss Layer (CURVED / ROUNDED)
        ctx.fillStyle = '#14532d';
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(22, 22, 116, 456, 42);
        } else {
          ctx.rect(22, 22, 116, 456);
        }
        ctx.fill();

        // Layered Curved Grass Clusters & Plants inside rounded bed
        for (let y = 30; y < 465; y += 10) {
          for (let x = 28; x < 130; x += 12) {
            // Check if x, y is inside the rounded grass bed shape
            const distFromTop = Math.hypot(x - 80, y - 70);
            const distFromBottom = Math.hypot(x - 80, y - 430);
            if ((y >= 70 && y <= 430) || distFromTop <= 52 || distFromBottom <= 52) {
              const shift = ((x + y) % 5);
              ctx.fillStyle = '#15803d';
              ctx.fillRect(x, y + shift, 10, 8);
              ctx.fillStyle = '#16a34a';
              ctx.fillRect(x + 2, y + shift + 1, 8, 6);
              ctx.fillStyle = '#22c55e';
              ctx.fillRect(x + 3, y + shift + 2, 4, 3);
            }
          }
        }

        // Blooming Flowers (Daisies, Roses, Lavender) across the rounded bed
        for (let y = 35; y < 450; y += 22) {
          for (let x = 32; x < 125; x += 25) {
            const distFromTop = Math.hypot(x - 80, y - 70);
            const distFromBottom = Math.hypot(x - 80, y - 430);
            if ((y >= 70 && y <= 430) || distFromTop <= 48 || distFromBottom <= 48) {
              const mod = (x * 7 + y * 13) % 4;
              if (mod === 0) {
                // White Daisy
                ctx.fillStyle = '#ffffff'; ctx.fillRect(x, y, 6, 6);
                ctx.fillStyle = '#fef08a'; ctx.fillRect(x + 2, y + 2, 2, 2);
              } else if (mod === 1) {
                // Pink Rose
                ctx.fillStyle = '#f472b6'; ctx.fillRect(x, y, 6, 6);
                ctx.fillStyle = '#db2777'; ctx.fillRect(x + 2, y + 2, 2, 2);
              } else if (mod === 2) {
                // Gold Marigold
                ctx.fillStyle = '#fef08a'; ctx.fillRect(x, y, 6, 6);
                ctx.fillStyle = '#f59e0b'; ctx.fillRect(x + 2, y + 2, 2, 2);
              } else {
                // Purple Lavender
                ctx.fillStyle = '#c084fc'; ctx.fillRect(x, y, 5, 7);
              }
            }
          }
        }

        canvas.refresh();
      }
    }

    // 7c-2. Standalone Short Garden Lamp Post (24x48)
    if (!textures.exists('cafe_garden_lamp_post')) {
      const canvas = textures.createCanvas('cafe_garden_lamp_post', 24, 48);
      if (canvas) {
        const ctx = canvas.getContext();
        // Base Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.beginPath();
        ctx.ellipse(12, 44, 10, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Dark Wood & Brass Pedestal Base
        ctx.fillStyle = '#451a03';
        ctx.fillRect(6, 38, 12, 6);
        ctx.fillStyle = '#f59e0b'; // Brass ring
        ctx.fillRect(7, 36, 10, 2);

        // Slender Vertical Post
        ctx.fillStyle = '#270e01';
        ctx.fillRect(10, 18, 4, 18);

        // Warm Light Radial Glow
        const glowGrad = ctx.createRadialGradient(12, 12, 2, 12, 12, 16);
        glowGrad.addColorStop(0, 'rgba(254, 240, 138, 0.9)');
        glowGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.4)');
        glowGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(12, 12, 16, 0, Math.PI * 2);
        ctx.fill();

        // Brass Lantern Cap & Frame
        ctx.fillStyle = '#78350f'; // Dark wood top connector
        ctx.fillRect(8, 16, 8, 3);
        ctx.fillStyle = '#f59e0b'; // Brass lantern roof
        ctx.beginPath();
        ctx.moveTo(4, 12);
        ctx.lineTo(20, 12);
        ctx.lineTo(12, 4);
        ctx.closePath();
        ctx.fill();

        // Lantern Glass Shade with Light Core
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(8, 11, 8, 5);
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(9, 10, 6, 6);

        canvas.refresh();
      }
    }

    // 7d. Tall Luxury Ceramic & Brass Plant Pot with Indoor Palm Tree (32x56)
    if (!textures.exists('cafe_luxury_plant_pot')) {
      const canvas = textures.createCanvas('cafe_luxury_plant_pot', 32, 56);
      if (canvas) {
        const ctx = canvas.getContext();
        // Drop Shadow at base
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.beginPath();
        ctx.ellipse(16, 52, 14, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Sleek Tapered Terracotta / White Ceramic Vessel Pot
        ctx.fillStyle = '#c2410c'; // Terracotta Body
        ctx.beginPath();
        ctx.moveTo(8, 32);
        ctx.lineTo(24, 32);
        ctx.lineTo(21, 51);
        ctx.lineTo(11, 51);
        ctx.closePath();
        ctx.fill();

        // White Ceramic Upper Rim
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(7, 30, 18, 4);

        // Gold Brass Accent Ring
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(9, 40, 14, 2);

        // Lush Dark Soil
        ctx.fillStyle = '#1c0a02';
        ctx.ellipse(16, 31, 8, 2, 0, 0, Math.PI * 2);

        // Tall Stems & Trunk
        ctx.fillStyle = '#14532d';
        ctx.fillRect(14, 18, 4, 13);
        ctx.fillRect(10, 20, 3, 11);
        ctx.fillRect(19, 20, 3, 11);

        // Bushy Multi-tiered Palm & Monstera Leaves
        ctx.fillStyle = '#166534'; // Base dark foliage
        ctx.beginPath(); ctx.ellipse(16, 18, 14, 10, 0, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = '#15803d'; // Mid green leaves
        ctx.beginPath(); ctx.ellipse(12, 14, 10, 8, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(20, 14, 10, 8, 0, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = '#16a34a'; // Vibrant green top leaves
        ctx.beginPath(); ctx.ellipse(16, 10, 11, 8, 0, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = '#4ade80'; // Bright leaf highlights
        ctx.beginPath(); ctx.ellipse(14, 8, 6, 4, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(21, 11, 5, 3, 0, 0, Math.PI * 2); ctx.fill();

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

    // 11. Classic Open Terrace Carved Oak Wooden Sign Plaque "CODE CAFE" (Image 5 Style) (260x70 2x supersampled)
    if (!textures.exists('cafe_neon_sign')) {
      const canvas = textures.createCanvas('cafe_neon_sign', 260, 70);
      if (canvas) {
        const ctx = canvas.getContext();
        // Drop shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.fillRect(4, 4, 252, 62);

        // Dark Walnut Outer Carved Frame
        ctx.fillStyle = '#270e01';
        ctx.fillRect(0, 0, 260, 64);

        // Inner Brass Bevel Line
        ctx.fillStyle = '#b45309';
        ctx.fillRect(4, 4, 252, 56);
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(6, 6, 248, 2); ctx.fillRect(6, 6, 2, 52);

        // Polished Warm Golden-Oak Plaque Surface
        ctx.fillStyle = '#854d0e';
        ctx.fillRect(8, 8, 244, 48);

        // Inner Grain & Inset
        ctx.fillStyle = '#a16207';
        ctx.fillRect(12, 12, 236, 40);

        // Corner Brass Rivets
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(10, 10, 6, 6); ctx.fillRect(244, 10, 6, 6);
        ctx.fillRect(10, 48, 6, 6); ctx.fillRect(244, 48, 6, 6);

        // Gold Coffee Cup Icon on Left (x=24 to 52)
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(24, 24, 20, 20); // Cup body
        ctx.fillRect(44, 28, 5, 12);  // Handle
        ctx.fillStyle = '#d97706';
        ctx.fillRect(28, 28, 12, 12); // Coffee fill
        // Steaming wisps
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(28, 16, 3, 5);
        ctx.fillRect(34, 13, 3, 7);
        ctx.fillRect(39, 16, 3, 5);

        // Clean Gold Typography "CODE CAFE"
        ctx.textAlign = 'center';
        ctx.font = 'bold 26px "Segoe UI", serif';

        // Drop shadow text
        ctx.fillStyle = '#270e01';
        ctx.fillText('CODE CAFE', 152, 43);

        // Glowing core gold text
        ctx.fillStyle = '#fef08a';
        ctx.fillText('CODE CAFE', 150, 41);

        canvas.refresh();
      }
    }

    // 12. Framed Wall Poster "COFFEE FOCUS FLOW" with Ivy Vines (Image 5 Style) (200x130 2x supersampled)
    if (!textures.exists('cafe_wall_poster')) {
      const canvas = textures.createCanvas('cafe_wall_poster', 200, 130);
      if (canvas) {
        const ctx = canvas.getContext();
        // Deep walnut frame
        ctx.fillStyle = '#270e01';
        ctx.fillRect(0, 0, 200, 130);
        ctx.fillStyle = '#b45309'; // Inner gold bevel line
        ctx.fillRect(6, 6, 188, 118);

        // Blackboard poster surface
        ctx.fillStyle = '#1c1917';
        ctx.fillRect(10, 10, 180, 110);

        // Chalk & Gold Typography (No Emojis)
        ctx.textAlign = 'center';
        ctx.font = 'bold 20px "Segoe UI", sans-serif';

        // COFFEE
        ctx.fillStyle = '#fef08a';
        ctx.fillText('COFFEE', 100, 42);

        // FOCUS
        ctx.fillStyle = '#fef08a';
        ctx.fillText('FOCUS', 100, 72);

        // FLOW
        ctx.fillStyle = '#fef08a';
        ctx.fillText('FLOW', 100, 102);

        // Lush Ivy Vines climbing around the frame
        ctx.fillStyle = '#15803d'; // Dark vine leaves
        ctx.fillRect(0, 0, 200, 6);   // Top frame vine
        ctx.fillRect(0, 0, 6, 130);   // Left frame vine
        ctx.fillRect(194, 0, 6, 130); // Right frame vine

        ctx.fillStyle = '#22c55e'; // Bright green leaf highlights
        for (let y = 10; y < 120; y += 18) {
          ctx.fillRect(2, y, 6, 6);
          ctx.fillRect(192, y + 8, 6, 6);
        }
        for (let x = 10; x < 190; x += 20) {
          ctx.fillRect(x, 2, 6, 6);
        }

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

