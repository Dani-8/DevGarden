import Phaser from 'phaser';

export class CafeCommunityTextures {
  public static createAll(scene: Phaser.Scene) {
    const textures = scene.textures;

    // 1. Cozy Lounge Sofa (Plush Cognac Velvet 64x40)
    if (!textures.exists('cafe_lounge_plush_sofa')) {
      const canvas = textures.createCanvas('cafe_lounge_plush_sofa', 64, 40);
      if (canvas) {
        const ctx = canvas.getContext();

        // Floor shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.beginPath();
        ctx.ellipse(32, 36, 30, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Sofa Wooden Legs
        ctx.fillStyle = '#270e01';
        ctx.fillRect(6, 32, 4, 6);
        ctx.fillRect(54, 32, 4, 6);

        // Sofa Base & Seat Frame
        ctx.fillStyle = '#78350f';
        ctx.fillRect(4, 26, 56, 8);

        // Main Plush Cushions (Warm Cognac / Velvet)
        ctx.fillStyle = '#991b1b';
        ctx.fillRect(6, 16, 25, 12);
        ctx.fillRect(33, 16, 25, 12);

        // Cushion Highlights
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(8, 17, 21, 3);
        ctx.fillRect(35, 17, 21, 3);

        // Backrest (Tufted velvet styling)
        ctx.fillStyle = '#7f1d1d';
        ctx.fillRect(4, 4, 56, 14);
        ctx.fillStyle = '#b91c1c';
        ctx.fillRect(6, 6, 52, 4);

        // Armrests
        ctx.fillStyle = '#5c1212';
        ctx.fillRect(2, 10, 6, 20);
        ctx.fillRect(56, 10, 6, 20);
        ctx.fillStyle = '#991b1b';
        ctx.fillRect(3, 11, 4, 18);

        // Accent Throw Pillows (Teal & Gold)
        ctx.fillStyle = '#0f766e';
        ctx.fillRect(8, 12, 10, 10);
        ctx.fillStyle = '#14b8a6';
        ctx.fillRect(9, 13, 8, 3);

        ctx.fillStyle = '#d97706';
        ctx.fillRect(46, 12, 10, 10);
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(47, 13, 8, 3);

        canvas.refresh();
      }
    }

    // 2. Deluxe Coffee Table with Laptop & Steaming Mug (48x28)
    if (!textures.exists('cafe_lounge_coffee_table_deluxe')) {
      const canvas = textures.createCanvas('cafe_lounge_coffee_table_deluxe', 48, 28);
      if (canvas) {
        const ctx = canvas.getContext();

        // Floor Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(24, 25, 22, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Table Legs
        ctx.fillStyle = '#1c1917';
        ctx.fillRect(4, 16, 3, 10);
        ctx.fillRect(41, 16, 3, 10);

        // Walnut Tabletop (Double Tiered Glass & Wood)
        ctx.fillStyle = '#451a03';
        ctx.fillRect(2, 6, 44, 12);
        ctx.fillStyle = '#78350f';
        ctx.fillRect(4, 7, 40, 9);

        // Brass Table Rim
        ctx.fillStyle = '#d97706';
        ctx.strokeRect(3, 6, 42, 11);

        // Open Book / Magazine
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(8, 9, 12, 7);
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(14, 9, 1, 7);

        // Ceramic Coffee Mug with Latte Art
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(36, 12, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#92400e';
        ctx.beginPath();
        ctx.arc(36, 12, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(35, 11, 2, 2);

        canvas.refresh();
      }
    }

    // 3. Discussion & Collaboration Group Table (68x36)
    if (!textures.exists('cafe_collab_group_table')) {
      const canvas = textures.createCanvas('cafe_collab_group_table', 68, 36);
      if (canvas) {
        const ctx = canvas.getContext();

        // Floor Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.beginPath();
        ctx.ellipse(34, 32, 32, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Steel Frame Legs with Brass Caps
        ctx.fillStyle = '#1c1917';
        ctx.fillRect(6, 20, 4, 13);
        ctx.fillRect(58, 20, 4, 13);
        ctx.fillStyle = '#d97706';
        ctx.fillRect(6, 31, 4, 2);
        ctx.fillRect(58, 31, 4, 2);

        // Solid Oak Surface
        ctx.fillStyle = '#451a03';
        ctx.fillRect(3, 6, 62, 16);
        ctx.fillStyle = '#78350f';
        ctx.fillRect(5, 7, 58, 13);
        ctx.fillStyle = '#9a3412';
        ctx.fillRect(7, 8, 54, 3);

        // Dual Open Laptops (Left: Code IDE, Right: Architecture Diagram)
        // Laptop 1 (Left)
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(10, 8, 14, 10);
        ctx.fillStyle = '#38bdf8'; // Glowing Blue IDE Screen
        ctx.fillRect(11, 9, 12, 6);
        ctx.fillStyle = '#475569';
        ctx.fillRect(9, 15, 16, 3);

        // Laptop 2 (Right)
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(44, 8, 14, 10);
        ctx.fillStyle = '#4ade80'; // Glowing Green Terminal/Stats Screen
        ctx.fillRect(45, 9, 12, 6);
        ctx.fillStyle = '#475569';
        ctx.fillRect(43, 15, 16, 3);

        // Center Blueprint Diagram & Coffee Cups
        ctx.fillStyle = '#1e3a8a';
        ctx.fillRect(27, 9, 14, 8);
        ctx.fillStyle = '#60a5fa';
        ctx.strokeRect(28, 10, 12, 6);

        // Coffee Cups
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(24, 14, 2.5, 0, Math.PI * 2);
        ctx.fill();

        canvas.refresh();
      }
    }

    // 4. Whiteboard & Tech Architecture Wall Board (64x38)
    if (!textures.exists('cafe_collab_whiteboard')) {
      const canvas = textures.createCanvas('cafe_collab_whiteboard', 64, 38);
      if (canvas) {
        const ctx = canvas.getContext();

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.fillRect(2, 2, 62, 36);

        // Aluminum Frame
        ctx.fillStyle = '#64748b';
        ctx.fillRect(0, 0, 64, 36);
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(2, 2, 60, 32);

        // White Board Surface
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(4, 4, 56, 28);

        // Architecture Flowchart Graphics (Boxes & Connecting Arrows)
        ctx.fillStyle = '#2563eb';
        ctx.fillRect(8, 8, 12, 7);
        ctx.fillStyle = '#16a34a';
        ctx.fillRect(26, 8, 12, 7);
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(44, 8, 12, 7);

        // Connecting lines
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(20, 11);
        ctx.lineTo(26, 11);
        ctx.moveTo(38, 11);
        ctx.lineTo(44, 11);
        ctx.stroke();

        // Colorful Sticky Notes at bottom of board
        ctx.fillStyle = '#fef08a'; // Yellow
        ctx.fillRect(8, 19, 8, 8);
        ctx.fillStyle = '#fbcfe8'; // Pink
        ctx.fillRect(20, 19, 8, 8);
        ctx.fillStyle = '#bbf7d0'; // Green
        ctx.fillRect(32, 19, 8, 8);
        ctx.fillStyle = '#fed7aa'; // Orange
        ctx.fillRect(44, 19, 8, 8);

        // Marker Tray at bottom
        ctx.fillStyle = '#334155';
        ctx.fillRect(16, 33, 32, 3);
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(20, 32, 5, 2);
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(28, 32, 5, 2);
        ctx.fillStyle = '#10b981';
        ctx.fillRect(36, 32, 5, 2);

        canvas.refresh();
      }
    }

    // 5. Interactive Project Showcase Wall Board (80x48)
    if (!textures.exists('cafe_showcase_wall_board')) {
      const canvas = textures.createCanvas('cafe_showcase_wall_board', 80, 48);
      if (canvas) {
        const ctx = canvas.getContext();

        // Drop Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
        ctx.fillRect(3, 3, 76, 44);

        // Ornate Brass & Dark Oak Frame
        ctx.fillStyle = '#1c1917';
        ctx.fillRect(0, 0, 80, 46);
        ctx.fillStyle = '#b45309';
        ctx.fillRect(2, 2, 76, 42);
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(3, 3, 74, 40);

        // Inner Felt Backing (Rich Navy Blue Velvet)
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(5, 5, 70, 36);

        // Header Title Banner "PROJECT SHOWCASE"
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(10, 7, 60, 9);
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(12, 8, 56, 7);

        // Star Badges / Pins on Header
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(16, 11, 2, 0, Math.PI * 2);
        ctx.arc(64, 11, 2, 0, Math.PI * 2);
        ctx.fill();

        // 3 Showcase Project Cards Pinned
        // Card 1
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(8, 19, 18, 18);
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(9, 20, 16, 8);
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(9, 31, 5, 4); // Trophy / Star pin

        // Card 2 (Featured Golden Glow)
        ctx.fillStyle = '#78350f';
        ctx.fillRect(30, 18, 20, 20);
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(31, 19, 18, 9);
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(32, 30, 7, 5); // Gold Star

        // Card 3
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(54, 19, 18, 18);
        ctx.fillStyle = '#a855f7';
        ctx.fillRect(55, 20, 16, 8);
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(55, 31, 5, 4);

        // Interactive Glowing Indicator LED
        ctx.fillStyle = '#4ade80';
        ctx.beginPath();
        ctx.arc(40, 42, 2, 0, Math.PI * 2);
        ctx.fill();

        canvas.refresh();
      }
    }

    // 6. Presentation Podium / Speaker Stage (28x32)
    if (!textures.exists('cafe_showcase_podium')) {
      const canvas = textures.createCanvas('cafe_showcase_podium', 28, 32);
      if (canvas) {
        const ctx = canvas.getContext();

        // Floor Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.beginPath();
        ctx.ellipse(14, 29, 12, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Dark Walnut Stand
        ctx.fillStyle = '#270e01';
        ctx.fillRect(8, 12, 12, 16);
        ctx.fillStyle = '#451a03';
        ctx.fillRect(9, 12, 10, 15);

        // Brass Trim on Stand
        ctx.fillStyle = '#d97706';
        ctx.fillRect(8, 26, 12, 2);

        // Podium Slanted Top
        ctx.fillStyle = '#78350f';
        ctx.fillRect(4, 5, 20, 8);
        ctx.fillStyle = '#9a3412';
        ctx.fillRect(5, 6, 18, 5);

        // Gooseneck Microphone
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(13, 0, 2, 6);
        ctx.beginPath();
        ctx.arc(14, 1, 2, 0, Math.PI * 2);
        ctx.fill();

        canvas.refresh();
      }
    }

    // 7. Area Rug - Persian Red & Gold Accent Carpet (84x56)
    if (!textures.exists('cafe_zone_persian_rug')) {
      const canvas = textures.createCanvas('cafe_zone_persian_rug', 84, 56);
      if (canvas) {
        const ctx = canvas.getContext();

        // Outer Fringe
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(0, 0, 84, 56);

        // Outer Dark Red Border
        ctx.fillStyle = '#450a0a';
        ctx.fillRect(2, 2, 80, 52);

        // Gold Trim
        ctx.fillStyle = '#b45309';
        ctx.fillRect(5, 5, 74, 46);
        ctx.fillStyle = '#d97706';
        ctx.strokeRect(6, 6, 72, 44);

        // Center Navy & Ruby Medallion
        ctx.fillStyle = '#7f1d1d';
        ctx.fillRect(10, 10, 64, 36);

        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.ellipse(42, 28, 20, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.ellipse(42, 28, 12, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        canvas.refresh();
      }
    }

    // 8. Room Floor: Rich Darker Amber / Espresso Wood Floor (32x32) as in reference images
    if (!textures.exists('cafe_wing_dark_floor')) {
      const canvas = textures.createCanvas('cafe_wing_dark_floor', 32, 32);
      if (canvas) {
        const ctx = canvas.getContext();

        // Dark rich oak base
        ctx.fillStyle = '#2c1409';
        ctx.fillRect(0, 0, 32, 32);

        // Individual plank rows
        ctx.fillStyle = '#3a1b0d';
        ctx.fillRect(0, 0, 32, 7);
        ctx.fillRect(0, 8, 32, 7);
        ctx.fillRect(0, 16, 32, 7);
        ctx.fillRect(0, 24, 32, 7);

        // Plank highlights & grain
        ctx.fillStyle = '#4a2412';
        ctx.fillRect(1, 1, 30, 2);
        ctx.fillRect(1, 9, 30, 2);
        ctx.fillRect(1, 17, 30, 2);
        ctx.fillRect(1, 25, 30, 2);

        // Dark plank seam lines
        ctx.fillStyle = '#1c0b05';
        ctx.fillRect(0, 7, 32, 1);
        ctx.fillRect(0, 15, 32, 1);
        ctx.fillRect(0, 23, 32, 1);
        ctx.fillRect(0, 31, 32, 1);

        // Vertical plank joints (offset)
        ctx.fillRect(14, 0, 1, 7);
        ctx.fillRect(26, 8, 1, 7);
        ctx.fillRect(8, 16, 1, 7);
        ctx.fillRect(22, 24, 1, 7);

        canvas.refresh();
      }
    }

    // 9. Vertical Dividing Wall Segment (20x64) - Solid wooden partition matching entrance boundary style
    if (!textures.exists('cafe_wing_div_wall_v')) {
      const canvas = textures.createCanvas('cafe_wing_div_wall_v', 20, 64);
      if (canvas) {
        const ctx = canvas.getContext();

        // Drop shadow on left
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.fillRect(0, 0, 3, 64);

        // Main dark walnut post
        ctx.fillStyle = '#261208';
        ctx.fillRect(3, 0, 15, 64);

        // Warm oak panel face
        ctx.fillStyle = '#4a2412';
        ctx.fillRect(5, 0, 11, 64);

        // Center warm wood grain highlight
        ctx.fillStyle = '#78350f';
        ctx.fillRect(7, 0, 7, 64);
        ctx.fillStyle = '#9a3412';
        ctx.fillRect(9, 0, 3, 64);

        // Brass Top Cap & Post Studs
        ctx.fillStyle = '#d97706';
        ctx.fillRect(4, 0, 13, 3);
        ctx.fillRect(4, 30, 13, 3);
        ctx.fillRect(4, 61, 13, 3);

        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(5, 1, 11, 1);
        ctx.fillRect(5, 31, 11, 1);
        ctx.fillRect(5, 62, 11, 1);

        canvas.refresh();
      }
    }

    // 10. Horizontal Separation Wall with Carved Wood Header Plaque (384x28)
    if (!textures.exists('cafe_wing_div_wall_h')) {
      const canvas = textures.createCanvas('cafe_wing_div_wall_h', 384, 28);
      if (canvas) {
        const ctx = canvas.getContext();

        // Cast shadow below wall
        ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
        ctx.fillRect(0, 20, 384, 8);

        // Base dark wood frame
        ctx.fillStyle = '#1c0b05';
        ctx.fillRect(0, 0, 384, 22);

        // Warm oak paneling
        ctx.fillStyle = '#3a1b0d';
        ctx.fillRect(0, 2, 384, 18);
        ctx.fillStyle = '#5c2b14';
        ctx.fillRect(0, 4, 384, 14);

        // Golden wood top trim
        ctx.fillStyle = '#b45309';
        ctx.fillRect(0, 0, 384, 3);
        ctx.fillStyle = '#d97706';
        ctx.fillRect(0, 1, 384, 1);

        // Brass corner brackets & bolts
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(4, 3, 3, 3);
        ctx.fillRect(377, 3, 3, 3);

        // Carved Center Title Plaque Backing (Centered in 384px: width 150 -> x = 117)
        ctx.fillStyle = '#1c1917';
        ctx.fillRect(117, 4, 150, 15);
        ctx.fillStyle = '#78350f';
        ctx.fillRect(119, 5, 146, 13);
        ctx.fillStyle = '#d97706';
        ctx.strokeRect(119, 5, 146, 13);

        canvas.refresh();
      }
    }

    // 11. Room Gate Entrance Step / Welcome Threshold Mat (32x48)
    if (!textures.exists('cafe_wing_gate_threshold')) {
      const canvas = textures.createCanvas('cafe_wing_gate_threshold', 32, 48);
      if (canvas) {
        const ctx = canvas.getContext();

        // Outer Dark Walnut Door Frame
        ctx.fillStyle = '#1c0b05';
        ctx.fillRect(0, 0, 32, 48);

        // Warm Inlaid Woven Doorway Runner
        ctx.fillStyle = '#78350f';
        ctx.fillRect(3, 2, 26, 44);

        // Brass inlay border
        ctx.fillStyle = '#d97706';
        ctx.strokeRect(4, 3, 24, 42);

        // Center Welcome Design
        ctx.fillStyle = '#9a3412';
        ctx.fillRect(7, 6, 18, 36);

        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(9, 12, 14, 2);
        ctx.fillRect(9, 23, 14, 2);
        ctx.fillRect(9, 34, 14, 2);

        canvas.refresh();
      }
    }

    // 12. Warm Glowing Lantern / Wall Sconce on Gate Posts (16x16)
    if (!textures.exists('cafe_wing_wall_lantern')) {
      const canvas = textures.createCanvas('cafe_wing_wall_lantern', 16, 16);
      if (canvas) {
        const ctx = canvas.getContext();

        // Iron bracket
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(7, 2, 2, 12);
        ctx.fillRect(4, 3, 8, 2);
        ctx.fillRect(3, 12, 10, 2);

        // Glowing Lantern Glass
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(5, 5, 6, 7);
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(6, 6, 4, 5);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(7, 7, 2, 3);

        canvas.refresh();
      }
    }
  }
}
