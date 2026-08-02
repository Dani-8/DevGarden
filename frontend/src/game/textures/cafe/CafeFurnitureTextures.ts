import Phaser from 'phaser';

export class CafeFurnitureTextures {
  public static create(textures: Phaser.Textures.TextureManager) {
    this.drawCafeInteriorTextures(textures);
  }

  public static drawCafeInteriorTextures(textures: Phaser.Textures.TextureManager) {
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

    // 7. Cafe Chair Directional Textures (22x28)
    // 7a. Top Chair facing DOWN towards table
    if (!textures.exists('cafe_chair_down')) {
      const canvas = textures.createCanvas('cafe_chair_down', 22, 28);
      if (canvas) {
        const ctx = canvas.getContext();
        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.fillRect(2, 25, 18, 3);

        // Chair legs
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

        // Carved Mahogany Backrest with Red Velvet Inset (at top)
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

    // Default alias for legacy compatibility
    if (!textures.exists('cafe_interior_chair')) {
      const canvas = textures.createCanvas('cafe_interior_chair', 22, 28);
      if (canvas) {
        const ctx = canvas.getContext();
        const base = textures.get('cafe_chair_down').getSourceImage() as CanvasImageSource;
        ctx.drawImage(base, 0, 0);
        canvas.refresh();
      }
    }

    // 7b. Bottom Chair facing UP towards table
    if (!textures.exists('cafe_chair_up')) {
      const canvas = textures.createCanvas('cafe_chair_up', 22, 28);
      if (canvas) {
        const ctx = canvas.getContext();
        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.fillRect(2, 25, 18, 3);

        // Front legs under seat
        ctx.fillStyle = '#270e01';
        ctx.fillRect(3, 2, 3, 10);
        ctx.fillRect(16, 2, 3, 10);

        // Red Velvet Seat Cushion (top half facing table)
        ctx.fillStyle = '#7f1d1d';
        ctx.fillRect(2, 7, 18, 7);
        ctx.fillStyle = '#991b1b';
        ctx.fillRect(2, 7, 18, 4);
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(3, 7, 16, 1);

        // Backrest facing camera (bottom half)
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

    // 7c. Left Chair facing RIGHT towards table
    if (!textures.exists('cafe_chair_right')) {
      const canvas = textures.createCanvas('cafe_chair_right', 22, 28);
      if (canvas) {
        const ctx = canvas.getContext();
        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.fillRect(2, 25, 18, 3);

        // Chair legs
        ctx.fillStyle = '#270e01';
        ctx.fillRect(3, 15, 3, 11);
        ctx.fillRect(16, 15, 3, 11);

        // Seat Cushion extending right towards table
        ctx.fillStyle = '#7f1d1d';
        ctx.fillRect(7, 12, 13, 6);
        ctx.fillStyle = '#991b1b';
        ctx.fillRect(7, 12, 13, 3);
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(8, 12, 11, 1);

        // Backrest on left side
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

    // 7d. Right Chair facing LEFT towards table
    if (!textures.exists('cafe_chair_left')) {
      const canvas = textures.createCanvas('cafe_chair_left', 22, 28);
      if (canvas) {
        const ctx = canvas.getContext();
        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.fillRect(2, 25, 18, 3);

        // Chair legs
        ctx.fillStyle = '#270e01';
        ctx.fillRect(3, 15, 3, 11);
        ctx.fillRect(16, 15, 3, 11);

        // Seat Cushion extending left towards table
        ctx.fillStyle = '#7f1d1d';
        ctx.fillRect(2, 12, 13, 6);
        ctx.fillStyle = '#991b1b';
        ctx.fillRect(2, 12, 13, 3);
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(3, 12, 11, 1);

        // Backrest on right side
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

    // 7c. Centerpiece Grand Garden Planter Island (176x536 canvas -> 88x268 display with ground shadow)
    if (!textures.exists('cafe_center_garden_planter')) {
      const canvas = textures.createCanvas('cafe_center_garden_planter', 176, 536);
      if (canvas) {
        const ctx = canvas.getContext();

        // 1. Visible Ground Drop Shadow casting onto floor tiles
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

        // 2. Heavy Warm Teak & Oak Wooden Boundary Frame
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

    // 7c-2. Standalone Short Garden Lamp Post (24x48)
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

    // 7d. Tall Luxury Ceramic & Brass Plant Pot with Indoor Palm Tree (32x56)
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

    // 8. Entrance Gateway Step Portal Mat (192x80 2x canvas -> 96x40 display)
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

    // 8b. Carved Grand Entrance Pillar Post with Lantern (64x112 2x canvas -> 32x56 display)
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

    // 8c. Continuous Bottom Boundary Wall with Lush Planter Box (768x64 2x canvas -> 384x32 display)
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

    // 9. Detailed Cafe Chalkboard Wall Menu (280x140 2x supersampled for ultra-crisp text)
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

    // 10. Terrace Stone Floor Tile (32x32)
    if (!textures.exists('cafe_floor_terrace_stone')) {
      const canvas = textures.createCanvas('cafe_floor_terrace_stone', 32, 32);
      if (canvas) {
        const ctx = canvas.getContext();
        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(0, 0, 32, 32);

        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(0, 31, 32, 1);
        ctx.fillRect(31, 0, 1, 32);

        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(1, 1, 30, 2);
        ctx.fillRect(1, 1, 2, 30);

        ctx.fillStyle = '#64748b';
        ctx.fillRect(8, 12, 2, 2);
        ctx.fillRect(22, 24, 2, 2);

        canvas.refresh();
      }
    }

    // 11. Classic Open Terrace Carved Oak Wooden Sign Plaque "CODE CAFE"
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

    // 12. Framed Wall Poster "TEA, SLEEP, CODE, REPEAT" with Lush Grass Leaves Effect
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

    // 13. Glass Pastry Display Case (40x36)
    if (!textures.exists('cafe_pastry_display')) {
      const canvas = textures.createCanvas('cafe_pastry_display', 40, 36);
      if (canvas) {
        const ctx = canvas.getContext();
        ctx.fillStyle = '#b45309';
        ctx.fillRect(0, 0, 40, 36);

        ctx.fillStyle = '#2d1810';
        ctx.fillRect(2, 2, 36, 32);
        ctx.fillStyle = 'rgba(254, 240, 138, 0.15)';
        ctx.fillRect(2, 2, 36, 32);

        ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.fillRect(4, 4, 28, 3);

        ctx.fillStyle = '#d97706';
        ctx.fillRect(2, 12, 36, 2);
        ctx.fillRect(2, 22, 36, 2);

        ctx.fillStyle = '#f59e0b'; ctx.fillRect(4, 8, 8, 4);
        ctx.fillStyle = '#d97706'; ctx.fillRect(16, 7, 6, 5);
        ctx.fillStyle = '#ffffff'; ctx.fillRect(17, 8, 4, 1);
        ctx.fillStyle = '#fbbf24'; ctx.fillRect(26, 8, 8, 4);

        ctx.fillStyle = '#a16207'; ctx.fillRect(5, 17, 7, 5);
        ctx.fillStyle = '#3b82f6'; ctx.fillRect(7, 18, 3, 2);
        ctx.fillStyle = '#f472b6'; ctx.fillRect(16, 18, 7, 4);
        ctx.fillStyle = '#fbbf24'; ctx.fillRect(27, 18, 8, 4);

        ctx.fillStyle = '#fef08a'; ctx.fillRect(6, 27, 8, 5);
        ctx.fillStyle = '#ef4444'; ctx.fillRect(6, 26, 8, 2);
        ctx.fillStyle = '#451a03'; ctx.fillRect(18, 27, 9, 5);
        ctx.fillStyle = '#f59e0b'; ctx.fillRect(30, 28, 6, 4);

        canvas.refresh();
      }
    }

    // 14. Grand 32-Bit Library Bookshelf (56x88)
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

    // 15. Open Terrace Glass Window Wall (96x64)
    if (!textures.exists('cafe_terrace_window')) {
      const canvas = textures.createCanvas('cafe_terrace_window', 96, 64);
      if (canvas) {
        const ctx = canvas.getContext();
        ctx.fillStyle = '#451a03';
        ctx.fillRect(0, 0, 96, 64);

        ctx.fillStyle = '#bae6fd';
        ctx.fillRect(4, 4, 42, 56);
        ctx.fillRect(50, 4, 42, 56);

        ctx.fillStyle = '#86efac'; ctx.fillRect(8, 20, 20, 30);
        ctx.fillStyle = '#22c55e'; ctx.fillRect(12, 10, 28, 40);
        ctx.fillStyle = '#16a34a'; ctx.fillRect(54, 15, 30, 40);

        ctx.fillStyle = '#78350f';
        ctx.fillRect(24, 4, 3, 56);
        ctx.fillRect(70, 4, 3, 56);
        ctx.fillRect(4, 30, 88, 3);

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
        ctx.fillStyle = '#15803d';
        ctx.fillRect(0, 0, 48, 6);
        ctx.fillRect(6, 6, 12, 10);
        ctx.fillRect(24, 6, 16, 12);
        ctx.fillRect(40, 6, 8, 8);

        ctx.fillStyle = '#22c55e';
        ctx.fillRect(2, 2, 44, 4);
        ctx.fillRect(8, 8, 8, 6);
        ctx.fillRect(26, 8, 12, 8);

        ctx.fillStyle = '#86efac';
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

    // 18. Legacy Cozy Leather Lounge Sofa (44x28)
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
