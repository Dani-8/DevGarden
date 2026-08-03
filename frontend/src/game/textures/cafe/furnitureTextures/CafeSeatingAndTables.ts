import Phaser from 'phaser';

export class CafeSeatingAndTables {
  public static draw(textures: Phaser.Textures.TextureManager) {
    // 1. Cafe Table Base (48x48)
    if (!textures.exists('cafe_interior_table')) {
      const canvas = textures.createCanvas('cafe_interior_table', 48, 48);
      if (canvas) {
        const ctx = canvas.getContext();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(24, 44, 20, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#0f172a';
        ctx.fillRect(22, 22, 4, 20);
        ctx.fillRect(12, 40, 24, 4);

        ctx.fillStyle = '#270e01';
        ctx.beginPath();
        ctx.ellipse(24, 18, 22, 14, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#78350f';
        ctx.beginPath();
        ctx.ellipse(24, 17, 20, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#92400e';
        ctx.beginPath();
        ctx.ellipse(24, 16, 17, 10, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#b45309';
        ctx.beginPath();
        ctx.ellipse(24, 15, 13, 7, 0, 0, Math.PI * 2);
        ctx.fill();

        canvas.refresh();
      }
    }

    // 2. Table with Laptop (48x48)
    if (!textures.exists('cafe_interior_table_laptop')) {
      const canvas = textures.createCanvas('cafe_interior_table_laptop', 48, 48);
      if (canvas) {
        const ctx = canvas.getContext();
        const baseTable = textures.get('cafe_interior_table').getSourceImage() as CanvasImageSource;
        ctx.drawImage(baseTable, 0, 0);

        ctx.fillStyle = '#334155';
        ctx.fillRect(16, 16, 16, 10);
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(18, 10, 12, 7);
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(20, 12, 8, 1); ctx.fillRect(20, 14, 6, 1);

        ctx.fillStyle = '#ffffff'; ctx.fillRect(34, 14, 5, 5);
        ctx.fillStyle = '#451a03'; ctx.fillRect(35, 15, 3, 3);

        canvas.refresh();
      }
    }

    // 3. Table with Coffee & Pastry (48x48)
    if (!textures.exists('cafe_interior_table_coffee')) {
      const canvas = textures.createCanvas('cafe_interior_table_coffee', 48, 48);
      if (canvas) {
        const ctx = canvas.getContext();
        const baseTable = textures.get('cafe_interior_table').getSourceImage() as CanvasImageSource;
        ctx.drawImage(baseTable, 0, 0);

        ctx.fillStyle = '#cbd5e1';
        ctx.beginPath(); ctx.ellipse(20, 16, 6, 4, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ffffff'; ctx.fillRect(17, 13, 6, 5);
        ctx.fillStyle = '#78350f'; ctx.fillRect(18, 14, 4, 3);

        ctx.fillStyle = '#e2e8f0';
        ctx.beginPath(); ctx.ellipse(32, 16, 6, 4, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#d97706'; ctx.fillRect(29, 14, 6, 4);

        canvas.refresh();
      }
    }

    // 4. Table with Plant / Succulent (48x48)
    if (!textures.exists('cafe_interior_table_plant')) {
      const canvas = textures.createCanvas('cafe_interior_table_plant', 48, 48);
      if (canvas) {
        const ctx = canvas.getContext();
        const baseTable = textures.get('cafe_interior_table').getSourceImage() as CanvasImageSource;
        ctx.drawImage(baseTable, 0, 0);

        ctx.fillStyle = '#c2410c'; ctx.fillRect(21, 14, 6, 6);
        ctx.fillStyle = '#15803d'; ctx.fillRect(19, 10, 10, 5);
        ctx.fillStyle = '#4ade80'; ctx.fillRect(21, 9, 6, 4);

        ctx.fillStyle = '#ffffff'; ctx.fillRect(12, 15, 5, 4);
        ctx.fillStyle = '#78350f'; ctx.fillRect(13, 16, 3, 2);

        canvas.refresh();
      }
    }

    // 5a. Chair facing DOWN (22x28)
    if (!textures.exists('cafe_chair_down')) {
      const canvas = textures.createCanvas('cafe_chair_down', 22, 28);
      if (canvas) {
        const ctx = canvas.getContext();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.fillRect(2, 25, 18, 3);

        ctx.fillStyle = '#270e01';
        ctx.fillRect(3, 14, 3, 12);
        ctx.fillRect(16, 14, 3, 12);

        ctx.fillStyle = '#7f1d1d';
        ctx.fillRect(2, 12, 18, 5);
        ctx.fillStyle = '#991b1b';
        ctx.fillRect(2, 12, 18, 3);
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(3, 12, 16, 1);

        ctx.fillStyle = '#451a03';
        ctx.fillRect(3, 1, 16, 11);
        ctx.fillStyle = '#78350f';
        ctx.fillRect(4, 2, 14, 1);
        ctx.fillStyle = '#991b1b';
        ctx.fillRect(5, 3, 12, 8);
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(6, 4, 10, 6);

        canvas.refresh();
      }
    }

    // Alias default chair
    if (!textures.exists('cafe_interior_chair')) {
      const canvas = textures.createCanvas('cafe_interior_chair', 22, 28);
      if (canvas) {
        const ctx = canvas.getContext();
        const base = textures.get('cafe_chair_down').getSourceImage() as CanvasImageSource;
        ctx.drawImage(base, 0, 0);
        canvas.refresh();
      }
    }

    // 5b. Chair facing UP (22x28)
    if (!textures.exists('cafe_chair_up')) {
      const canvas = textures.createCanvas('cafe_chair_up', 22, 28);
      if (canvas) {
        const ctx = canvas.getContext();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.fillRect(2, 25, 18, 3);

        ctx.fillStyle = '#270e01';
        ctx.fillRect(3, 2, 3, 10);
        ctx.fillRect(16, 2, 3, 10);

        ctx.fillStyle = '#7f1d1d';
        ctx.fillRect(2, 7, 18, 7);
        ctx.fillStyle = '#991b1b';
        ctx.fillRect(2, 7, 18, 4);
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(3, 7, 16, 1);

        ctx.fillStyle = '#451a03';
        ctx.fillRect(3, 14, 16, 12);
        ctx.fillStyle = '#78350f';
        ctx.fillRect(4, 15, 14, 1);
        ctx.fillStyle = '#991b1b';
        ctx.fillRect(5, 16, 12, 8);
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(6, 17, 10, 6);

        canvas.refresh();
      }
    }

    // 5c. Chair facing RIGHT (22x28)
    if (!textures.exists('cafe_chair_right')) {
      const canvas = textures.createCanvas('cafe_chair_right', 22, 28);
      if (canvas) {
        const ctx = canvas.getContext();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.fillRect(2, 25, 18, 3);

        ctx.fillStyle = '#270e01';
        ctx.fillRect(3, 15, 3, 11);
        ctx.fillRect(16, 15, 3, 11);

        ctx.fillStyle = '#7f1d1d';
        ctx.fillRect(7, 12, 13, 6);
        ctx.fillStyle = '#991b1b';
        ctx.fillRect(7, 12, 13, 3);
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(8, 12, 11, 1);

        ctx.fillStyle = '#451a03';
        ctx.fillRect(2, 2, 6, 19);
        ctx.fillStyle = '#78350f';
        ctx.fillRect(3, 3, 4, 1);
        ctx.fillStyle = '#991b1b';
        ctx.fillRect(3, 4, 4, 15);
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(4, 5, 2, 13);

        canvas.refresh();
      }
    }

    // 5d. Chair facing LEFT (22x28)
    if (!textures.exists('cafe_chair_left')) {
      const canvas = textures.createCanvas('cafe_chair_left', 22, 28);
      if (canvas) {
        const ctx = canvas.getContext();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.fillRect(2, 25, 18, 3);

        ctx.fillStyle = '#270e01';
        ctx.fillRect(3, 15, 3, 11);
        ctx.fillRect(16, 15, 3, 11);

        ctx.fillStyle = '#7f1d1d';
        ctx.fillRect(2, 12, 13, 6);
        ctx.fillStyle = '#991b1b';
        ctx.fillRect(2, 12, 13, 3);
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(3, 12, 11, 1);

        ctx.fillStyle = '#451a03';
        ctx.fillRect(14, 2, 6, 19);
        ctx.fillStyle = '#78350f';
        ctx.fillRect(15, 3, 4, 1);
        ctx.fillStyle = '#991b1b';
        ctx.fillRect(15, 4, 4, 15);
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(16, 5, 2, 13);

        canvas.refresh();
      }
    }

    // 6. Leather Lounge Sofa Side View (36x56)
    if (!textures.exists('cafe_sofa_side')) {
      const canvas = textures.createCanvas('cafe_sofa_side', 36, 56);
      if (canvas) {
        const ctx = canvas.getContext();
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.fillRect(4, 52, 32, 4);

        ctx.fillStyle = '#7c2d12';
        ctx.fillRect(0, 0, 36, 56);

        ctx.fillStyle = '#521d0a';
        ctx.fillRect(0, 0, 10, 56);
        ctx.fillStyle = '#9a3412';
        ctx.fillRect(2, 2, 4, 52);

        ctx.fillStyle = '#6e270d';
        ctx.fillRect(10, 0, 26, 10);
        ctx.fillRect(10, 46, 26, 10);

        ctx.fillStyle = '#b45309';
        ctx.fillRect(12, 2, 22, 3);
        ctx.fillRect(12, 48, 22, 3);

        ctx.fillStyle = '#9a3412';
        ctx.fillRect(10, 10, 24, 17);
        ctx.fillRect(10, 29, 24, 17);

        ctx.fillStyle = '#c2410c';
        ctx.fillRect(12, 12, 20, 2);
        ctx.fillRect(12, 31, 20, 2);
        ctx.fillStyle = '#451a03';
        ctx.fillRect(10, 27, 24, 2);

        ctx.fillStyle = '#270e01';
        ctx.fillRect(30, 52, 4, 4);
        ctx.fillRect(12, 52, 4, 4);

        canvas.refresh();
      }
    }

    // 7. Leather Lounge Sofa Front View (44x28)
    if (!textures.exists('cafe_sofa')) {
      const canvas = textures.createCanvas('cafe_sofa', 44, 28);
      if (canvas) {
        const ctx = canvas.getContext();
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.fillRect(2, 24, 40, 4);

        ctx.fillStyle = '#9a3412';
        ctx.fillRect(0, 4, 44, 20);

        ctx.fillStyle = '#7c2d12';
        ctx.fillRect(2, 2, 40, 10);
        ctx.fillStyle = '#c2410c';
        ctx.fillRect(4, 3, 16, 2);
        ctx.fillRect(24, 3, 16, 2);

        ctx.fillStyle = '#7c2d12';
        ctx.fillRect(0, 6, 6, 16);
        ctx.fillRect(38, 6, 6, 16);

        ctx.fillStyle = '#b45309';
        ctx.fillRect(6, 12, 15, 10);
        ctx.fillRect(23, 12, 15, 10);

        ctx.fillStyle = '#270e01';
        ctx.fillRect(2, 22, 3, 4);
        ctx.fillRect(39, 22, 3, 4);

        canvas.refresh();
      }
    }
  }
}
