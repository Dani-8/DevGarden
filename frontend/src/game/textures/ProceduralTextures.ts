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
    this.drawFlowerPotProp(textures);
    this.drawMenuBoardProp(textures);
    this.drawCafeUmbrellaTable(textures);
    this.drawDuckProp(textures);
    this.drawPetalParticle(textures);
    this.drawFireflyParticle(textures);
    this.drawFenceTextures(textures);

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
      const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      grad.addColorStop(0, colorStr);
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = colorStr;
    }

    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
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
}
