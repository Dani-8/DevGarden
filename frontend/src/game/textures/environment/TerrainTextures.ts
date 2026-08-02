import Phaser from 'phaser';

export class TerrainTextures {
  public static create(textures: Phaser.Textures.TextureManager) {
    this.drawCircleTexture(textures, 'glow_particle', 8, '#ffffff', true);
    this.drawCircleTexture(textures, 'water_particle', 4, '#a5f3fc', false);

    this.drawGrassTile(textures, 'grass_tile', '#38a154', []);
    this.drawGrassTile(textures, 'grass_tile_yellow', '#38a154', [{ x: 8, y: 12, c: '#ffd700' }, { x: 24, y: 20, c: '#ffd700' }]);
    this.drawGrassTile(textures, 'grass_tile_pink', '#38a154', [{ x: 12, y: 24, c: '#f472b6' }, { x: 20, y: 6, c: '#ffffff' }]);
    this.drawDirtTile(textures);

    this.drawWaterTile(textures, 'river_water_1', '#0284c7', '#38bdf8');
    this.drawWaterTile(textures, 'river_water_2', '#0369a1', '#0284c7');
    this.drawRiverBankTile(textures, 'river_bank_west', true);
    this.drawRiverBankTile(textures, 'river_bank_east', false);
    this.drawLilyPadTile(textures);

    this.drawZenGravelTile(textures);
    this.drawCobblestoneTile(textures);
  }

  public static drawCircleTexture(textures: Phaser.Textures.TextureManager, key: string, size: number, colorStr: string, blur: boolean) {
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

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, 32, 32);

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
}
