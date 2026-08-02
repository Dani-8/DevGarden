import Phaser from 'phaser';

export class CafeBuildingTextures {
  public static create(textures: Phaser.Textures.TextureManager) {
    this.drawCodeCafeStorefront(textures);
    this.drawCafeConcretePatio(textures);
  }

  public static drawCodeCafeStorefront(textures: Phaser.Textures.TextureManager) {
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

  public static drawCafeConcretePatio(textures: Phaser.Textures.TextureManager) {
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
}
