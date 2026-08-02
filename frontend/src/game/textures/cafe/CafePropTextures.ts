import Phaser from 'phaser';

export class CafePropTextures {
  public static create(textures: Phaser.Textures.TextureManager) {
    this.drawFlowerPotProp(textures);
    this.drawMenuBoardProp(textures);
    this.drawCafeUmbrellaTable(textures);
  }

  public static drawFlowerPotProp(textures: Phaser.Textures.TextureManager) {
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

  public static drawMenuBoardProp(textures: Phaser.Textures.TextureManager) {
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

  public static drawCafeUmbrellaTable(textures: Phaser.Textures.TextureManager) {
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
}
