import Phaser from 'phaser';
import { PlayerState } from '../../types.js';
import { showPlayerBubble } from '../Messaging.js';

export default class GardenScene extends Phaser.Scene {
  private socket!: any;
  private selfPlayer: PlayerState | null = null;
  private currentUserId: string = '';
  
  // Game objects
  private playerContainer: Phaser.GameObjects.Container | null = null;
  private playerSprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | null = null;
  private otherPlayers: Map<string, Phaser.GameObjects.Container> = new Map();
  private sleepingNPCs: Map<string, Phaser.GameObjects.Container> = new Map();
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };

  // Particle systems
  private auraEmitter: Phaser.GameObjects.Particles.ParticleEmitter | null = null;

  // Synchronization throttles
  private lastMoveSent: number = 0;
  private lastX: number = 0;
  private lastY: number = 0;
  private lastAnim: string = 'idle_down';

  // Callbacks to React UI
  private onSelectPlayerCallback?: (player: PlayerState) => void;
  private onNearLeaderboardCallback?: (isNear: boolean) => void;

  // Star Tree (Co-op Nurturing Sprout) state
  private goldenWaterActive: boolean = false;
  private communityWaterScore: number = 240;
  private starTreeSprite: Phaser.GameObjects.Image | null = null;
  private starTreePromptText: Phaser.GameObjects.Text | null = null;
  private starTreeWaterParticles: Phaser.GameObjects.Particles.ParticleEmitter | null = null;
  private goldTrailEmitter: Phaser.GameObjects.Particles.ParticleEmitter | null = null;
  private lastWateredTime: number = 0;

  // Obstacles
  private obstaclesGroup!: Phaser.Physics.Arcade.StaticGroup;
  private leaderboardTreeObj!: Phaser.GameObjects.Image;

  constructor() {
    super({ key: 'GardenScene' });
  }

  init(data: { socket: any; self: PlayerState; onSelectPlayer: (p: PlayerState) => void; onNearLeaderboard: (isNear: boolean) => void }) {
    this.socket = data.socket;
    this.selfPlayer = data.self;
    this.currentUserId = data.self?.id || '';
    this.onSelectPlayerCallback = data.onSelectPlayer;
    this.onNearLeaderboardCallback = data.onNearLeaderboard;
  }

  preload() {
    // 1. Procedurally generate our pixel-art textures to ensure 100% self-contained loading
    this.createProceduralTextures();
  }

  create(data: { players: PlayerState[]; sleepingNPCs: PlayerState[] }) {
    // Enable arcade physics
    this.physics.world.setBounds(0, 0, 1024, 768);

    // 2. Draw our lovely tilemap background
    this.drawTilemap();

    // Create a group for obstacles
    this.obstaclesGroup = this.physics.add.staticGroup();

    // 3. Create the gorgeous garden props
    this.createGardenProps();

    // Create anims for all developer visual tiers
    this.createAllAnimations();

    // 4. Spawn active players from state
    if (this.selfPlayer) {
      this.spawnSelf(this.selfPlayer);
    }

    if (data.players) {
      data.players.forEach(p => {
        if (p.id !== this.currentUserId) {
          this.spawnRemotePlayer(p);
        }
      });
    }

    if (data.sleepingNPCs) {
      data.sleepingNPCs.forEach(npc => {
        this.spawnSleepingNPC(npc);
      });
    }

    // Set up camera boundaries
    this.cameras.main.setBounds(0, 0, 1024, 768);
    if (this.playerContainer) {
      this.cameras.main.startFollow(this.playerContainer, true, 0.1, 0.1);
    }

    // Hook into Phaser's resize event to dynamically scale/zoom the garden to fit & cover the viewport perfectly
    const updateZoom = (width: number, height: number) => {
      // Scale camera zoom so the 1024x768 design size fills the container with no black borders
      const zoomX = width / 1024;
      const zoomY = height / 768;
      const zoom = Math.max(zoomX, zoomY, 1); // Keep zoom at least 1x
      this.cameras.main.setZoom(zoom);
    };

    this.scale.on('resize', (gameSize: any) => {
      updateZoom(gameSize.width, gameSize.height);
    });

    // Run initial zoom matching
    updateZoom(this.scale.width, this.scale.height);

    // 5. Setup keyboard input hooks
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.wasd = {
        W: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        A: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        S: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
        D: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      };
    }

    // 6. Setup Socket Event Listeners
    this.setupSocketListeners();

    // --- Community Star Tree (GitHub Sprout) Initialization ---
    this.goldenWaterActive = localStorage.getItem('devgarden_golden_water') === 'unlocked';
    
    // Listen for custom event from React UI
    window.addEventListener('golden_water_unlocked', () => {
      this.goldenWaterActive = true;
      if (this.playerContainer) {
        this.showChatBubble(this.playerContainer, "✨ Unlocked Golden Water! 💦", false);
      }
      this.initGoldTrail();
    });

    // Create the Star Tree Sprout
    this.createStarTree();

    // Load initial Star Tree Score
    fetch((import.meta.env.VITE_API_URL || '') + '/api/star-tree')
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.waterScore === 'number') {
          this.updateStarTreeScore(data.waterScore);
        }
      })
      .catch(err => console.error('Error fetching star-tree:', err));

    if (this.goldenWaterActive) {
      this.time.delayedCall(500, () => {
        this.initGoldTrail();
      });
    }

    // Enable physics colliders
    if (this.playerContainer) {
      this.physics.add.collider(this.playerContainer, this.obstaclesGroup);
    }
  }

  update() {
    if (!this.playerContainer || !this.playerSprite || !this.cursors || !this.wasd) return;

    // Movement speeds
    const speed = 120;
    let vx = 0;
    let vy = 0;
    let animKey = 'idle_down';

    // Check keyboard input
    if (this.cursors.left.isDown || this.wasd.A.isDown) {
      vx = -speed;
      animKey = 'walk_left';
    } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
      vx = speed;
      animKey = 'walk_right';
    }

    if (this.cursors.up.isDown || this.wasd.W.isDown) {
      vy = -speed;
      animKey = 'walk_up';
    } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
      vy = speed;
      animKey = 'walk_down';
    }

    // Normalize diagonal movement speed
    if (vx !== 0 && vy !== 0) {
      vx *= 0.7071;
      vy *= 0.7071;
    }

    // Update player body velocities (physics are attached to the container)
    const body = this.playerContainer.body as Phaser.Physics.Arcade.Body;
    body.setVelocity(vx, vy);

    // Play walk/idle anims
    const tier = this.selfPlayer?.visual_tier || 'green';
    if (vx === 0 && vy === 0) {
      // Find idle equivalent
      if (this.lastAnim.includes('left')) animKey = 'idle_left';
      else if (this.lastAnim.includes('right')) animKey = 'idle_right';
      else if (this.lastAnim.includes('up')) animKey = 'idle_up';
      else animKey = 'idle_down';

      this.playerSprite.play(`${animKey}_${tier}`, true);
    } else {
      this.playerSprite.play(`${animKey}_${tier}`, true);
    }

    // Proximity check to Leaderboard Tree
    const distToLeaderboard = Phaser.Math.Distance.Between(
      this.playerContainer.x,
      this.playerContainer.y,
      this.leaderboardTreeObj.x,
      this.leaderboardTreeObj.y
    );
    const isNearLeaderboard = distToLeaderboard < 70;
    if (this.onNearLeaderboardCallback) {
      this.onNearLeaderboardCallback(isNearLeaderboard);
    }

    // Proximity check to Community Star Tree
    if (this.starTreeSprite && this.starTreePromptText) {
      const distToStarTree = Phaser.Math.Distance.Between(
        this.playerContainer.x,
        this.playerContainer.y,
        this.starTreeSprite.x,
        this.starTreeSprite.y
      );

      const isNearStarTree = distToStarTree < 90;
      this.starTreePromptText.setVisible(isNearStarTree);
      if (isNearStarTree) {
        const stageName = this.getStarTreeStageName(this.communityWaterScore);
        const actionPrompt = "Press [SPACE] or Click Sprout to Nurture 💦";
        this.starTreePromptText.setText(
          `🌱 ${stageName}\n💧 Total Growth: ${this.communityWaterScore}\n👉 ${actionPrompt}`
        );
      }
    }

    // Spacebar to water the tree if standing close
    if (this.cursors.space && Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
      const distToStarTree = Phaser.Math.Distance.Between(
        this.playerContainer.x,
        this.playerContainer.y,
        512,
        260
      );
      if (distToStarTree < 90) {
        this.waterStarTree();
      }
    }

    // 7. Network position sync throttle (send position updates every 45ms or on animation state change)
    const now = Date.now();
    const posChanged = Math.abs(this.playerContainer.x - this.lastX) > 1 || Math.abs(this.playerContainer.y - this.lastY) > 1;
    const animChanged = animKey !== this.lastAnim;

    if (now - this.lastMoveSent > 45 && (posChanged || animChanged)) {
      this.socket.emit('player_move', {
        x: Math.round(this.playerContainer.x),
        y: Math.round(this.playerContainer.y),
        anim: animKey,
      });

      this.lastX = this.playerContainer.x;
      this.lastY = this.playerContainer.y;
      this.lastAnim = animKey;
      this.lastMoveSent = now;
    }

    // Dynamic Depth Sorting based on Y coordinate (Y-sorting)
    if (this.playerContainer) {
      this.playerContainer.setDepth(this.playerContainer.y);
    }
    this.otherPlayers.forEach((container) => {
      container.setDepth(container.y);
    });
    this.sleepingNPCs.forEach((container) => {
      container.setDepth(container.y);
    });
  }

  // --- PRIVATE CORE UTILITIES ---

  private spawnSelf(p: PlayerState) {
    this.playerContainer = this.add.container(p.x, p.y);
    this.physics.add.existing(this.playerContainer);
    
    // Set physics body size (narrower at feet for elegant top-down collisions)
    const body = this.playerContainer.body as Phaser.Physics.Arcade.Body;
    body.setCollideWorldBounds(true);
    body.setSize(16, 12);
    body.setOffset(-8, -4);

    // Under-avatar aura
    this.addAuraParticles(this.playerContainer, p.visual_tier, true);

    // Avatar Sprite
    this.playerSprite = this.add.sprite(0, 0, `player_${p.visual_tier}`) as any;
    this.playerSprite.setOrigin(0.5, 0.7);
    this.playerContainer.add(this.playerSprite);

    // Name tag & Level text
    this.addOverheadInfo(this.playerContainer, p.username, p.level, p.title, p.visual_tier, false, p.cosmetics);

    // Setup clicking self (no action needed, but matches style)
    this.playerSprite.setInteractive();
    this.playerSprite.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      pointer.event.stopPropagation();
      if (this.onSelectPlayerCallback) this.onSelectPlayerCallback(p);
    });
  }

  private spawnRemotePlayer(p: PlayerState) {
    // If already exists, clear old
    if (this.otherPlayers.has(p.id)) {
      this.otherPlayers.get(p.id)?.destroy();
    }

    const container = this.add.container(p.x, p.y);
    container.setData('tier', p.visual_tier);
    this.otherPlayers.set(p.id, container);

    // Under-avatar aura
    this.addAuraParticles(container, p.visual_tier, false);

    const sprite = this.add.sprite(0, 0, `player_${p.visual_tier}`);
    sprite.setOrigin(0.5, 0.7);
    container.add(sprite);

    // Match animation
    const anim = p.anim || 'idle_down';
    sprite.play(`${anim}_${p.visual_tier}`, true);

    // Overhead labels
    this.addOverheadInfo(container, p.username, p.level, p.title, p.visual_tier, false, p.cosmetics);

    // Clicking remote user displays profile
    sprite.setInteractive({ useHandCursor: true });
    sprite.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      pointer.event.stopPropagation();
      if (this.onSelectPlayerCallback) {
        this.onSelectPlayerCallback(p);
      }
    });
  }

  private spawnSleepingNPC(npc: PlayerState) {
    if (this.sleepingNPCs.has(npc.id)) {
      this.sleepingNPCs.get(npc.id)?.destroy();
    }

    const container = this.add.container(npc.x, npc.y);
    this.sleepingNPCs.set(npc.id, container);

    // Under-avatar aura (extremely faint / transparent glow)
    this.addAuraParticles(container, npc.visual_tier, false, true);

    const sprite = this.add.sprite(0, 0, `player_${npc.visual_tier}`);
    sprite.setOrigin(0.5, 0.7);
    sprite.setAlpha(0.65); // Semi-transparent to look sleepy
    container.add(sprite);

    // Sleeping NPCs always play idle down
    sprite.play(`idle_down_${npc.visual_tier}`);

    // Overhead labels
    this.addOverheadInfo(container, npc.username, npc.level, npc.title, npc.visual_tier, true, npc.cosmetics);

    // Mini sleeping Zzz visual particle effect!
    const zzzText = this.add.text(8, -32, 'Zzz', {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '8px',
      fontStyle: 'bold',
      color: '#58a6ff'
    });
    zzzText.setResolution(2);
    container.add(zzzText);

    // Float the Zzzs up and down
    this.tweens.add({
      targets: zzzText,
      y: -38,
      alpha: 0.2,
      duration: 1800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Make interactive to view their awesome offline legendary stats
    sprite.setInteractive({ useHandCursor: true });
    sprite.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      pointer.event.stopPropagation();
      if (this.onSelectPlayerCallback) {
        this.onSelectPlayerCallback(npc);
      }
    });
  }

  private addOverheadInfo(
    container: Phaser.GameObjects.Container,
    username: string,
    level: number,
    title: string,
    tier: string,
    isSleeping: boolean,
    cosmetics?: string[]
  ) {
    // Determine level color
    let badgeColor = '#81c784'; // light green
    if (tier === 'blue') badgeColor = '#64b5f6'; // light blue
    if (tier === 'purple') badgeColor = '#ba68c8'; // light purple
    if (tier === 'crimson') badgeColor = '#e57373'; // light red
    if (tier === 'cosmic') badgeColor = '#ffd54f'; // golden-amber

    // 1. Badge Nameplate text
    const labelText = isSleeping ? `[Sleeping] ${username}` : username;
    const nameText = this.add.text(0, -22, labelText, {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '10px',
      fontStyle: 'bold',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2,
    });
    nameText.setResolution(2);
    nameText.setOrigin(0.5);
    container.add(nameText);

    // 2. Level and title badge
    const badgeText = this.add.text(0, -33, `Lvl ${level} ${title}`, {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '8px',
      color: badgeColor,
      stroke: '#000000',
      strokeThickness: 2,
    });
    badgeText.setResolution(2);
    badgeText.setOrigin(0.5);
    container.add(badgeText);

    // 3. Render Unlocked Cosmetics
    if (cosmetics && cosmetics.includes('gardener_hat')) {
      const hatText = this.add.text(0, -14, '👒', {
        fontSize: '11px',
      });
      hatText.setOrigin(0.5, 0.5);
      hatText.setResolution(2);
      container.add(hatText);
    }

    if (cosmetics && cosmetics.includes('watering_can')) {
      const canText = this.add.text(10, -5, '🚰', {
        fontSize: '9px',
      });
      canText.setOrigin(0.5, 0.5);
      canText.setResolution(2);
      container.add(canText);
    }
  }

  private addAuraParticles(container: Phaser.GameObjects.Container, tier: string, isSelf: boolean, isNPC: boolean = false) {
    if (tier === 'green') return; // Green sprouts get no aura

    let colorHex = 0x64b5f6; // blue
    let speedRange = { min: 10, max: 20 };
    let lifespan = 1000;
    let frequency = 250;

    if (tier === 'purple') {
      colorHex = 0xffeb3b; // gold sparkle
      speedRange = { min: 15, max: 30 };
      frequency = 180;
    } else if (tier === 'crimson') {
      colorHex = 0xff3d00; // fiery orange-red
      speedRange = { min: 20, max: 40 };
      frequency = 100;
    } else if (tier === 'cosmic') {
      colorHex = 0x00e5ff; // cyano space
      speedRange = { min: 25, max: 50 };
      frequency = 80;
    }

    if (isNPC) {
      frequency *= 2; // Slower particles for sleeping NPCs
    }

    // Add particle emitter
    const emitter = this.add.particles(0, 0, 'glow_particle', {
      scale: { start: 0.15, end: 0 },
      alpha: { start: isNPC ? 0.2 : 0.6, end: 0 },
      tint: colorHex,
      speed: speedRange,
      angle: { min: -110, max: -70 }, // upward floating
      lifespan: lifespan,
      frequency: frequency,
      gravityY: -5,
    });

    container.add(emitter);
    
    // Send to back so it sits behind the character sprite
    container.sendToBack(emitter);

    if (isSelf) {
      this.auraEmitter = emitter;
    }
  }

  private showChatBubble(container: Phaser.GameObjects.Container, text: string, isEmote: boolean) {
    showPlayerBubble(this, container, text, isEmote);
  }

  private setupSocketListeners() {
    this.socket.on('player_moved', (data: { id: string; x: number; y: number; anim: string }) => {
      const container = this.otherPlayers.get(data.id);
      if (container) {
        // Smoothly tween remote movements to prevent visual jittering
        this.tweens.add({
          targets: container,
          x: data.x,
          y: data.y,
          duration: 45, // matches our emitter tick rate perfectly
          ease: 'Linear',
        });

        const sprite = container.list.find(item => item instanceof Phaser.GameObjects.Sprite) as Phaser.GameObjects.Sprite;
        const tier = container.getData('tier') || 'green';

        if (sprite && data.anim) {
          sprite.play(`${data.anim}_${tier}`, true);
        }
      }
    });

    this.socket.on('players_sync', (players: PlayerState[]) => {
      const activeIds = new Set(players.map(p => p.id));

      players.forEach(p => {
        if (p.id !== this.currentUserId) {
          if (!this.otherPlayers.has(p.id)) {
            this.spawnRemotePlayer(p);
          } else {
            const container = this.otherPlayers.get(p.id);
            if (container) {
              container.setData('tier', p.visual_tier);
            }
          }
        }
      });

      // Remove players who are no longer online
      this.otherPlayers.forEach((container, id) => {
        if (!activeIds.has(id)) {
          container.destroy();
          this.otherPlayers.delete(id);
        }
      });
    });

    this.socket.on('player_joined', (p: PlayerState) => {
      this.spawnRemotePlayer(p);
    });

    this.socket.on('player_left', (data: { id: string }) => {
      if (this.otherPlayers.has(data.id)) {
        this.otherPlayers.get(data.id)?.destroy();
        this.otherPlayers.delete(data.id);
      }
    });

    this.socket.on('player_chatted', (data: { id: string; text: string; isEmote: boolean }) => {
      if (data.id === this.currentUserId) {
        if (this.playerContainer) {
          this.showChatBubble(this.playerContainer, data.text, data.isEmote);
        }
      } else {
        const container = this.otherPlayers.get(data.id);
        if (container) {
          this.showChatBubble(container, data.text, data.isEmote);
        } else {
          // Check if NPC
          const npcContainer = this.sleepingNPCs.get(`sleeping_${data.id}`);
          if (npcContainer) {
            this.showChatBubble(npcContainer, data.text, data.isEmote);
          }
        }
      }
    });

    this.socket.on('sleeping_npcs_update', (npcs: PlayerState[]) => {
      // Remove dead NPCs
      this.sleepingNPCs.forEach((container, id) => {
        const stillSleeps = npcs.some(n => `sleeping_${n.id}` === id);
        if (!stillSleeps) {
          container.destroy();
          this.sleepingNPCs.delete(id);
        }
      });

      // Spawn or update NPCs
      npcs.forEach(npc => {
        this.spawnSleepingNPC(npc);
      });
    });

    this.socket.on('tree_watered', (data: { id: string; score: number; isGolden: boolean }) => {
      this.updateStarTreeScore(data.score);
      this.playTreeWaterEffect(data.isGolden);
      
      if (data.id !== this.currentUserId) {
        const other = this.otherPlayers.get(data.id);
        if (other) {
          this.showChatBubble(other, "💦 I nurtured the Sprout Tree!", false);
        }
      }
    });
  }

  // --- PROCEDURAL GAME GRAPHICS ENGINE (NO STATIC URLS NEEDED) ---

  private drawTilemap() {
    // Render ground grid
    for (let tx = 0; tx < 32; tx++) {
      for (let ty = 0; ty < 24; ty++) {
        const px = tx * 32;
        const py = ty * 32;

        // Path coordinates: A nice loop path around the fountain center (fountain at 512, 384)
        const isPathX = (tx >= 6 && tx <= 26) && (ty === 7 || ty === 17);
        const isPathY = (ty >= 7 && ty <= 17) && (tx === 6 || tx === 26);
        const isCenterAisle = (tx === 16 && ty >= 7 && ty <= 17) || (ty === 12 && tx >= 6 && tx <= 26);

        if (isPathX || isPathY || isCenterAisle) {
          // Dirt tile
          this.add.image(px + 16, py + 16, 'dirt_tile').setDepth(-10);
        } else {
          // Grass tile
          // Sprinkle decorative flower details procedurally
          const rng = (tx * 17 + ty * 31) % 100;
          if (rng < 8) {
            this.add.image(px + 16, py + 16, 'grass_tile_yellow').setDepth(-10);
          } else if (rng < 15) {
            this.add.image(px + 16, py + 16, 'grass_tile_pink').setDepth(-10);
          } else {
            this.add.image(px + 16, py + 16, 'grass_tile').setDepth(-10);
          }
        }
      }
    }
  }

  private createGardenProps() {
    // 1. Boundary Trees forest
    // Top border trees
    for (let x = 32; x <= 1024; x += 96) {
      this.spawnTree(x, 24);
    }
    // Bottom border trees
    for (let x = 32; x <= 1024; x += 96) {
      this.spawnTree(x, 744);
    }
    // Left border trees
    for (let y = 120; y < 700; y += 120) {
      this.spawnTree(24, y);
    }
    // Right border trees
    for (let y = 120; y < 700; y += 120) {
      this.spawnTree(1000, y);
    }

    // 2. Beautiful Central Fountain (at 512, 384)
    const fountainX = 527;
    const fountainY = 400;
    const fountain = this.add.image(fountainX, fountainY, 'fountain_prop');
    fountain.setOrigin(0.5, 0.65);
    fountain.setDepth(fountainY);
    this.physics.add.existing(fountain, true);
    
    // Set fountain collider bounds using custom updateFromGameObject override
    const fountainBody = fountain.body as Phaser.Physics.Arcade.StaticBody;
    const fw = 44;
    const fh = 28;
    const fox = 10;
    const foy = 30;

    fountainBody.updateFromGameObject = function(this: Phaser.Physics.Arcade.StaticBody) {
      const gameObject = this.gameObject as any;
      this.width = fw;
      this.height = fh;
      this.halfWidth = fw / 2;
      this.halfHeight = fh / 2;
      this.x = (gameObject.x - (gameObject.originX * gameObject.displayWidth)) + fox;
      this.y = (gameObject.y - (gameObject.originY * gameObject.displayHeight)) + foy;
      this.center.setTo(this.x + this.halfWidth, this.y + this.halfHeight);
      return this;
    };
    fountainBody.updateFromGameObject();
    this.obstaclesGroup.add(fountain);

    // Fountain water particles spray!
    const waterParticles = this.add.particles(fountainX, fountainY - 14, 'water_particle', {
      scale: { start: 1, end: 0 },
      alpha: { start: 0.8, end: 0.1 },
      speed: { min: 20, max: 40 },
      angle: { min: -130, max: -50 },
      gravityY: 120,
      lifespan: 600,
      frequency: 35,
    });
    waterParticles.setDepth(fountainY + 1);

    // 3. Wooden Benches placed beautifully on the grass quadrants
    // Top-Left Bench
    this.spawnBench(380, 290, 'bench_horizontal');
    // Top-Right Bench
    this.spawnBench(644, 290, 'bench_horizontal');
    // Bottom-Left Bench
    this.spawnBench(380, 478, 'bench_horizontal');
    // Bottom-Right Bench
    this.spawnBench(644, 478, 'bench_horizontal');

    // 4. Leaderboard Tree / Signpost (at 512, 120)
    this.leaderboardTreeObj = this.add.image(512, 110, 'leaderboard_tree');
    this.leaderboardTreeObj.setOrigin(0.5, 0.8);
    this.leaderboardTreeObj.setDepth(110);
    this.physics.add.existing(this.leaderboardTreeObj, true);

    const lbBody = this.leaderboardTreeObj.body as Phaser.Physics.Arcade.StaticBody;
    const lbw = 12;
    const lbh = 26;
    const lbox = 26;
    const lboy = 44;

    lbBody.updateFromGameObject = function(this: Phaser.Physics.Arcade.StaticBody) {
      const gameObject = this.gameObject as any;
      this.width = lbw;
      this.height = lbh;
      this.halfWidth = lbw / 2;
      this.halfHeight = lbh / 2;
      this.x = (gameObject.x - (gameObject.originX * gameObject.displayWidth)) + lbox;
      this.y = (gameObject.y - (gameObject.originY * gameObject.displayHeight)) + lboy;
      this.center.setTo(this.x + this.halfWidth, this.y + this.halfHeight);
      return this;
    };
    lbBody.updateFromGameObject();
    this.obstaclesGroup.add(this.leaderboardTreeObj);

    // Floating Crown above Leaderboard Tree to draw users to walk up
    const goldenCrown = this.add.image(512, 50, 'leaderboard_crown_icon');
    goldenCrown.setDepth(2000);
    this.tweens.add({
      targets: goldenCrown,
      y: 42,
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  private spawnTree(x: number, y: number) {
    const tree = this.add.image(x, y, 'tree_prop');
    tree.setOrigin(0.5, 0.85);
    tree.setDepth(y);
    this.physics.add.existing(tree, true);

    // Setup tight physics boundaries for trunk only
    const treeBody = tree.body as Phaser.Physics.Arcade.StaticBody;
    const tw = 10;
    const th = 15;
    const tox = 28;
    const toy = 56;

    treeBody.updateFromGameObject = function(this: Phaser.Physics.Arcade.StaticBody) {
      const gameObject = this.gameObject as any;
      this.width = tw;
      this.height = th;
      this.halfWidth = tw / 2;
      this.halfHeight = th / 2;
      this.x = (gameObject.x - (gameObject.originX * gameObject.displayWidth)) + tox;
      this.y = (gameObject.y - (gameObject.originY * gameObject.displayHeight)) + toy;
      this.center.setTo(this.x + this.halfWidth, this.y + this.halfHeight);
      return this;
    };
    treeBody.updateFromGameObject();
    this.obstaclesGroup.add(tree);
  }

  private spawnBench(x: number, y: number, benchType: string) {
    const bench = this.add.image(x, y, benchType);
    bench.setOrigin(0.5);
    bench.setDepth(y);
    this.physics.add.existing(bench, true);

    const benchBody = bench.body as Phaser.Physics.Arcade.StaticBody;
    const bw = benchType === 'bench_horizontal' ? 48 : 14;
    const bh = benchType === 'bench_horizontal' ? 14 : 48;
    const box = benchType === 'bench_horizontal' ? 0 : 2;
    const boy = benchType === 'bench_horizontal' ? 2 : 0;

    benchBody.updateFromGameObject = function(this: Phaser.Physics.Arcade.StaticBody) {
      const gameObject = this.gameObject as any;
      this.width = bw;
      this.height = bh;
      this.halfWidth = bw / 2;
      this.halfHeight = bh / 2;
      this.x = (gameObject.x - (gameObject.originX * gameObject.displayWidth)) + box;
      this.y = (gameObject.y - (gameObject.originY * gameObject.displayHeight)) + boy;
      this.center.setTo(this.x + this.halfWidth, this.y + this.halfHeight);
      return this;
    };
    benchBody.updateFromGameObject();
    this.obstaclesGroup.add(bench);
  }

  private createStarTree() {
    const treeX = 512;
    const treeY = 260;

    // Create the sprite with an initial texture (based on community water score)
    const initialStageKey = this.getStarTreeStageKey(this.communityWaterScore);
    this.starTreeSprite = this.add.image(treeX, treeY, initialStageKey);
    this.starTreeSprite.setOrigin(0.5, 0.85);
    this.starTreeSprite.setDepth(treeY);
    this.physics.add.existing(this.starTreeSprite, true);

    const treeBody = this.starTreeSprite.body as Phaser.Physics.Arcade.StaticBody;
    const tw = 24;
    const th = 20;
    const tox = 20;
    const toy = 45;

    treeBody.updateFromGameObject = function(this: Phaser.Physics.Arcade.StaticBody) {
      const gameObject = this.gameObject as any;
      this.width = tw;
      this.height = th;
      this.halfWidth = tw / 2;
      this.halfHeight = th / 2;
      this.x = (gameObject.x - (gameObject.originX * gameObject.displayWidth)) + tox;
      this.y = (gameObject.y - (gameObject.originY * gameObject.displayHeight)) + toy;
      this.center.setTo(this.x + this.halfWidth, this.y + this.halfHeight);
      return this;
    };
    treeBody.updateFromGameObject();
    this.obstaclesGroup.add(this.starTreeSprite);

    // Make the tree sprite interactive so players can water it by clicking!
    this.starTreeSprite.setInteractive({ useHandCursor: true });
    this.starTreeSprite.on('pointerdown', () => {
      this.waterStarTree();
    });

    // Add floating text prompt above the tree
    this.starTreePromptText = this.add.text(treeX, treeY - 55, '', {
      fontSize: '9px',
      fontFamily: 'monospace',
      color: '#fef08a',
      backgroundColor: 'rgba(15, 23, 42, 0.85)',
      padding: { x: 5, y: 3 },
      align: 'center'
    });
    this.starTreePromptText.setOrigin(0.5, 0.5);
    this.starTreePromptText.setDepth(2000);
    this.starTreePromptText.setVisible(false);

    // Create water splash particle emitter attached to the tree
    this.starTreeWaterParticles = this.add.particles(treeX, treeY - 15, 'water_particle', {
      scale: { start: 1, end: 0 },
      alpha: { start: 0.8, end: 0.1 },
      speed: { min: 40, max: 100 },
      angle: { min: -180, max: 0 },
      gravityY: 150,
      lifespan: 500,
      frequency: -1, // trigger manually
    });
    this.starTreeWaterParticles.setDepth(treeY + 2);
  }

  private getStarTreeStageKey(score: number): string {
    if (score < 100) return 'star_tree_stage_1';
    if (score < 500) return 'star_tree_stage_2';
    if (score < 1500) return 'star_tree_stage_3';
    return 'star_tree_stage_4';
  }

  private getStarTreeStageName(score: number): string {
    if (score < 100) return 'GitHub Seedling Sprout';
    if (score < 500) return 'Vibrant GitHub Sapling';
    if (score < 1500) return 'Majestic Glowing Star Tree';
    return 'Ultimate Cosmic Octocat Tree';
  }

  private updateStarTreeScore(score: number) {
    this.communityWaterScore = score;
    
    // Update texture if stage has changed
    const currentKey = this.starTreeSprite?.texture.key;
    const nextKey = this.getStarTreeStageKey(score);
    if (this.starTreeSprite && currentKey !== nextKey) {
      this.starTreeSprite.setTexture(nextKey);
      
      // Update its display parameters if stage changes
      if (nextKey === 'star_tree_stage_4') {
        this.starTreeSprite.setOrigin(0.5, 0.85);
      }
      
      // Play a cute grow animation (scale up/down quickly)
      this.tweens.add({
        targets: this.starTreeSprite,
        scaleY: 1.2,
        scaleX: 1.2,
        duration: 250,
        yoyo: true,
        ease: 'Quad.easeOut'
      });
    }
  }

  private waterStarTree() {
    if (!this.playerContainer) return;

    // Check distance between player and tree
    const dist = Phaser.Math.Distance.Between(
      this.playerContainer.x,
      this.playerContainer.y,
      512,
      260
    );

    if (dist > 90) {
      // If too far, show bubble prompting them to walk closer
      this.showChatBubble(this.playerContainer, "I need to walk closer to water the Sprout Tree! 🚶‍♂️", false);
      return;
    }

    // Debounce to prevent rapid spamming (max once every 0.8 seconds)
    const now = Date.now();
    if (now - this.lastWateredTime < 800) return;
    this.lastWateredTime = now;

    // Determine increment
    const isGolden = this.goldenWaterActive;
    const increment = isGolden ? 10 : 1;

    // Play local character animation tipping effect
    this.tweens.add({
      targets: this.playerSprite,
      angle: -15,
      yoyo: true,
      duration: 150,
      repeat: 1,
      ease: 'Quad.easeInOut',
      onComplete: () => {
        if (this.playerSprite) this.playerSprite.setAngle(0);
      }
    });

    // Optimistically update locally and trigger effect
    const newScore = this.communityWaterScore + increment;
    this.updateStarTreeScore(newScore);
    this.playTreeWaterEffect(isGolden);

    // Call API to save to backend
    fetch((import.meta.env.VITE_API_URL || '') + '/api/star-tree/water', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ increment })
    })
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.waterScore === 'number') {
          this.updateStarTreeScore(data.waterScore);
          
          // Emit socket update to let everyone else see the water splash in real time!
          if (this.socket && this.socket.channel) {
            this.socket.channel.send({
              type: 'broadcast',
              event: 'tree_watered',
              payload: {
                id: this.currentUserId,
                score: data.waterScore,
                isGolden,
              }
            });
          }
        }
      })
      .catch(err => console.error('Failed to water tree:', err));

    // Show a cute visual floating number popping up!
    const popText = this.add.text(512, 190, isGolden ? '⭐ +10 Growth!' : '💦 +1 Growth!', {
      fontSize: '11px',
      fontFamily: 'monospace',
      fontStyle: 'bold',
      color: isGolden ? '#f59e0b' : '#38bdf8'
    });
    popText.setOrigin(0.5);
    popText.setDepth(3000);
    this.tweens.add({
      targets: popText,
      y: 130,
      alpha: 0,
      duration: 1200,
      ease: 'Cubic.easeOut',
      onComplete: () => popText.destroy()
    });
  }

  private playTreeWaterEffect(isGolden: boolean) {
    if (!this.starTreeWaterParticles) return;
    
    // Change particle configuration on-the-fly or explode
    this.starTreeWaterParticles.explode(20);
    
    // Add flashing overlay effect to the tree sprite
    if (this.starTreeSprite) {
      this.starTreeSprite.setTint(isGolden ? 0xfef08a : 0xbfdbfe);
      this.time.delayedCall(150, () => {
        if (this.starTreeSprite) this.starTreeSprite.clearTint();
      });
    }
  }

  private initGoldTrail() {
    if (!this.playerContainer || this.goldTrailEmitter) return;
    
    this.goldTrailEmitter = this.add.particles(0, 0, 'glow_particle', {
      scale: { start: 0.6, end: 0 },
      alpha: { start: 0.6, end: 0 },
      tint: 0xf59e0b, // gorgeous gold
      speed: 10,
      lifespan: 400,
      frequency: 50, // emit every 50ms as they walk
      blendMode: 'ADD',
      follow: this.playerContainer
    });
    this.goldTrailEmitter.setDepth(this.playerContainer.depth - 1);
  }

  private createProceduralTextures() {
    // 1. Particle Glow dot
    this.drawCircleTexture('glow_particle', 8, '#ffffff', true);

    // 2. Water bubble particle
    this.drawCircleTexture('water_particle', 4, '#a5f3fc', false);

    // 3. TileTextures: grass, yellow grass, pink grass, dirt
    this.drawGrassTile('grass_tile', '#428554', []);
    this.drawGrassTile('grass_tile_yellow', '#428554', [{ x: 8, y: 12, c: '#ffd700' }, { x: 24, y: 20, c: '#ffd700' }]);
    this.drawGrassTile('grass_tile_pink', '#428554', [{ x: 12, y: 24, c: '#f472b6' }, { x: 20, y: 6, c: '#ffffff' }]);
    this.drawDirtTile();

    // 4. Props: Trees, Fountain, Benches, Signposts
    this.drawTreeProp();
    this.drawFountainProp();
    this.drawBenchProp('bench_horizontal', 48, 18, true);
    this.drawBenchProp('bench_vertical', 18, 48, false);
    this.drawLeaderboardTree();
    this.drawStarTreeStages();

    // 5. Emote Textures
    this.drawEmoteIcon('wave', '👋');
    this.drawEmoteIcon('clap', '👏');
    this.drawEmoteIcon('smile', '😊');
    this.drawEmoteIcon('love', '❤️');
    this.drawEmoteIcon('code', '💻');
    this.drawEmoteIcon('mindblown', '🤯');

    // 6. Character sheet canvases for 5 tiers: green, blue, purple, crimson, cosmic
    this.drawCharacterSpritesheet('green', '#81c784', '#388e3c', '#5d4037', false); // Sprout (Green overall, Brown hair)
    this.drawCharacterSpritesheet('blue', '#2196f3', '#0d47a1', '#212121', false);  // Committer (Blue hoodie, Dark hair)
    this.drawCharacterSpritesheet('purple', '#9c27b0', '#4a148c', '#ffffff', false); // Maintainer (Purple robe, White hair)
    this.drawCharacterSpritesheet('crimson', '#f44336', '#b71c1c', '#eceff1', false); // Arch Mage (Crimson wizard, Silver hair)
    this.drawCharacterSpritesheet('cosmic', '#263238', '#00e5ff', '#ffd700', true);  // Legend (Glowing cosmos, Gold Crown)
  }

  // --- TEXTURE DRAWING INTERNALS ---

  private drawCircleTexture(key: string, size: number, colorStr: string, blur: boolean) {
    const canvas = this.textures.createCanvas(key, size, size);
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

  private drawGrassTile(key: string, bgColor: string, flowers: Array<{ x: number; y: number; c: string }>) {
    const canvas = this.textures.createCanvas(key, 32, 32);
    const ctx = canvas.getContext();

    // Solid base lawn green
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, 32, 32);

    // Pixel grass patches (darker spots)
    ctx.fillStyle = '#2c663b';
    const blades = [
      { x: 4, y: 6 }, { x: 5, y: 5 }, { x: 18, y: 22 }, { x: 19, y: 21 },
      { x: 26, y: 8 }, { x: 25, y: 9 }, { x: 10, y: 16 }, { x: 11, y: 15 }
    ];
    blades.forEach(b => {
      ctx.fillRect(b.x, b.y, 2, 2);
      ctx.fillRect(b.x + 1, b.y - 1, 1, 2);
    });

    // Decorative flowers
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

  private drawDirtTile() {
    const canvas = this.textures.createCanvas('dirt_tile', 32, 32);
    const ctx = canvas.getContext();

    ctx.fillStyle = '#dfc49c'; // Sandy beige path
    ctx.fillRect(0, 0, 32, 32);

    // Small pixel noise to make it look gritty/organic
    ctx.fillStyle = '#cdad7e';
    const noises = [{ x: 5, y: 12 }, { x: 18, y: 4 }, { x: 25, y: 22 }, { x: 10, y: 28 }, { x: 29, y: 14 }];
    noises.forEach(n => {
      ctx.fillRect(n.x, n.y, 2, 1);
      ctx.fillRect(n.x - 1, n.y + 1, 1, 1);
    });

    canvas.refresh();
  }

  private drawTreeProp() {
    const canvas = this.textures.createCanvas('tree_prop', 64, 80);
    const ctx = canvas.getContext();

    // 1. Semi-transparent ground shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.arc(32, 70, 16, 0, Math.PI * 2);
    ctx.fill();

    // 2. Trunk
    ctx.fillStyle = '#5d4037'; // brown trunk
    ctx.fillRect(28, 48, 8, 22);
    ctx.fillStyle = '#3e2723'; // trunk shadow
    ctx.fillRect(32, 48, 4, 22);

    // 3. Fluffy leafy canopy
    ctx.fillStyle = '#1b5e20'; // dark green background/shadow
    ctx.beginPath();
    ctx.arc(32, 28, 24, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#2e7d32'; // medium green foliage
    ctx.beginPath();
    ctx.arc(26, 24, 18, 0, Math.PI * 2);
    ctx.arc(40, 26, 16, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#4caf50'; // light green highlights
    ctx.beginPath();
    ctx.arc(22, 18, 12, 0, Math.PI * 2);
    ctx.arc(34, 16, 10, 0, Math.PI * 2);
    ctx.fill();

    canvas.refresh();
  }

  private drawFountainProp() {
    const canvas = this.textures.createCanvas('fountain_prop', 64, 64);
    const ctx = canvas.getContext();

    // 1. Ground shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.arc(32, 45, 24, 0, Math.PI * 2);
    ctx.fill();

    // 2. Stone circular base pool
    ctx.fillStyle = '#90a4ae'; // slate gray stone border
    ctx.beginPath();
    ctx.arc(32, 45, 20, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#01579b'; // pool water blue
    ctx.beginPath();
    ctx.arc(32, 45, 16, 0, Math.PI * 2);
    ctx.fill();

    // Water swirls inside
    ctx.fillStyle = '#0288d1';
    ctx.beginPath();
    ctx.arc(28, 43, 8, 0, Math.PI * 2);
    ctx.fill();

    // 3. Central stone fountain pillar
    ctx.fillStyle = '#b0bec5';
    ctx.fillRect(28, 20, 8, 20);
    ctx.fillStyle = '#78909c';
    ctx.fillRect(32, 20, 4, 20);

    // Top small basin
    ctx.fillStyle = '#90a4ae';
    ctx.beginPath();
    ctx.arc(32, 20, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#00b0ff'; // bubbling water top basin
    ctx.beginPath();
    ctx.arc(32, 20, 7, 0, Math.PI * 2);
    ctx.fill();

    canvas.refresh();
  }

  private drawBenchProp(key: string, w: number, h: number, isHorizontal: boolean) {
    const canvas = this.textures.createCanvas(key, w, h);
    const ctx = canvas.getContext();

    // Bench feet shadows
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    if (isHorizontal) {
      ctx.fillRect(4, h - 3, 6, 2);
      ctx.fillRect(w - 10, h - 3, 6, 2);

      // Wood planks
      ctx.fillStyle = '#a16207'; // Golden brown wood
      ctx.fillRect(2, 2, w - 4, 4);
      ctx.fillRect(2, 8, w - 4, 4);

      // Cast iron legs and support structures
      ctx.fillStyle = '#374151'; // Charcoal legs
      ctx.fillRect(4, 2, 2, 12);
      ctx.fillRect(w - 6, 2, 2, 12);
      ctx.fillRect(2, 6, w - 4, 2); // support slat
    } else {
      ctx.fillRect(w - 3, 4, 2, 6);
      ctx.fillRect(w - 3, h - 10, 2, 6);

      // Wood planks vertically
      ctx.fillStyle = '#a16207';
      ctx.fillRect(2, 2, 4, h - 4);
      ctx.fillRect(8, 2, 4, h - 4);

      // Legs
      ctx.fillStyle = '#374151';
      ctx.fillRect(2, 4, 12, 2);
      ctx.fillRect(2, h - 6, 12, 2);
    }

    canvas.refresh();
  }

  private drawLeaderboardTree() {
    const canvas = this.textures.createCanvas('leaderboard_tree', 64, 80);
    const ctx = canvas.getContext();

    // Ground shadow
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(24, 66, 16, 4);

    // Thick rustic wood post
    ctx.fillStyle = '#78350f';
    ctx.fillRect(28, 30, 8, 38);
    ctx.fillStyle = '#451a03';
    ctx.fillRect(32, 30, 4, 38);

    // Large rustic wooden announcement billboard board
    ctx.fillStyle = '#92400e'; // Brown board back
    ctx.fillRect(4, 2, 56, 32);

    // Dark inset inner board frame
    ctx.fillStyle = '#1e1b4b'; // Deep navy board chalkboard face
    ctx.fillRect(8, 5, 48, 26);

    // Side supports/chains holding the board
    ctx.fillStyle = '#4b5563'; // Iron fasteners
    ctx.fillRect(10, 0, 2, 3);
    ctx.fillRect(52, 0, 2, 3);

    canvas.refresh();

    // Separate texture for the Leaderboard Floating Crown icon
    const crownCanvas = this.textures.createCanvas('leaderboard_crown_icon', 16, 16);
    const crownCtx = crownCanvas.getContext();
    crownCtx.fillStyle = '#fbbf24'; // Bright gold
    crownCtx.beginPath();
    crownCtx.moveTo(2, 12);
    crownCtx.lineTo(14, 12);
    crownCtx.lineTo(14, 6);
    crownCtx.lineTo(11, 9);
    crownCtx.lineTo(8, 3); // Center peak
    crownCtx.lineTo(5, 9);
    crownCtx.lineTo(2, 6);
    crownCtx.closePath();
    crownCtx.fill();

    // Red jewel in center
    crownCtx.fillStyle = '#ef4444';
    crownCtx.fillRect(7, 9, 2, 2);

    crownCanvas.refresh();
  }

  private drawEmoteIcon(key: string, emoji: string) {
    const canvas = this.textures.createCanvas(`emote_${key}`, 24, 24);
    const ctx = canvas.getContext();

    // Draw speech bubble frame
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(12, 12, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Render emoji in center
    ctx.font = '12px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#000000';
    ctx.fillText(emoji, 12, 12);

    canvas.refresh();
  }

  private drawCharacterSpritesheet(
    tier: string,
    outfitColor: string,
    outfitShadowColor: string,
    hairColor: string,
    isCosmic: boolean
  ) {
    // Canvas size: grid 3 col (step L, idle, step R) x 4 rows (Down, Left, Right, Up)
    // Frame Size: 16x24. Total Canvas size: 48x96
    const canvas = this.textures.createCanvas(`player_${tier}`, 48, 96);
    if (!canvas) return;
    const ctx = canvas.getContext();

    // Render each of the 12 frames
    const cols = [0, 1, 2]; // 0: left step, 1: idle, 2: right step
    const rows = [0, 1, 2, 3]; // 0: Down, 1: Left, 2: Right, 3: Up

    rows.forEach(row => {
      cols.forEach(col => {
        const fx = col * 16;
        const fy = row * 24;

        // Draw character inside fx, fy to fx+16, fy+24

        // 1. Hair / Head Base
        ctx.fillStyle = hairColor;
        ctx.fillRect(fx + 4, fy + 2, 8, 7); // Hair top/head

        // Skin face
        ctx.fillStyle = '#ffdbac'; // Warm skin
        ctx.fillRect(fx + 4, fy + 5, 8, 5);

        // Hair overlaps/caps skin
        ctx.fillStyle = hairColor;
        if (row === 0) { // Down: front bangs
          ctx.fillRect(fx + 4, fy + 2, 8, 3);
          ctx.fillRect(fx + 4, fy + 5, 1, 2);
          ctx.fillRect(fx + 11, fy + 5, 1, 2);
        } else if (row === 1) { // Left: hair bangs facing left
          ctx.fillRect(fx + 3, fy + 2, 8, 4);
          ctx.fillRect(fx + 3, fy + 6, 2, 3); // back of hair
        } else if (row === 2) { // Right: hair bangs facing right
          ctx.fillRect(fx + 5, fy + 2, 8, 4);
          ctx.fillRect(fx + 11, fy + 6, 2, 3); // back of hair
        } else if (row === 3) { // Up: full back of hair
          ctx.fillRect(fx + 3, fy + 2, 10, 8);
        }

        // 2. Eyes (Black dots)
        ctx.fillStyle = '#212121';
        if (row === 0) { // Down
          ctx.fillRect(fx + 6, fy + 6, 1, 1);
          ctx.fillRect(fx + 9, fy + 6, 1, 1);
        } else if (row === 1) { // Left
          ctx.fillRect(fx + 5, fy + 6, 1, 1);
        } else if (row === 2) { // Right
          ctx.fillRect(fx + 10, fy + 6, 1, 1);
        }

        // 3. Torso/Outfiting Hood/Robe
        ctx.fillStyle = outfitColor;
        ctx.fillRect(fx + 3, fy + 10, 10, 8); // Outfit body
        ctx.fillStyle = outfitShadowColor;
        ctx.fillRect(fx + 8, fy + 10, 5, 8); // Shadow side

        // Outfit accents (e.g., zippers, drawstrings, gold robes trimming)
        if (tier === 'purple' || tier === 'crimson') {
          // Gold wizard trim
          ctx.fillStyle = '#fbcb24';
          ctx.fillRect(fx + 7, fy + 10, 2, 8); // trim down middle
        } else if (isCosmic) {
          // Glowing cyan astronaut chest emblem
          ctx.fillStyle = '#00e5ff';
          ctx.fillRect(fx + 7, fy + 12, 2, 2);
        } else if (tier === 'blue') {
          // Cute white hoodie drawstrings
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(fx + 6, fy + 11, 1, 2);
          ctx.fillRect(fx + 9, fy + 11, 1, 2);
        }

        // Hands (hanging down)
        ctx.fillStyle = '#ffdbac'; // Skin hands
        if (row === 0 || row === 3) { // Facing Front/Back
          ctx.fillRect(fx + 2, fy + 12, 1, 3);
          ctx.fillRect(fx + 13, fy + 12, 1, 3);
        } else if (row === 1) { // Facing Left
          ctx.fillRect(fx + 7, fy + 13, 2, 2);
        } else if (row === 2) { // Facing Right
          ctx.fillRect(fx + 7, fy + 13, 2, 2);
        }

        // 4. Legs and Animated Step Steps
        ctx.fillStyle = '#374151'; // Dark pants grey/black

        // col 0: left step, col 1: standing idle, col 2: right step
        if (col === 1) {
          // Standing Idle - symmetrical legs
          ctx.fillRect(fx + 5, fy + 18, 2, 4);
          ctx.fillRect(fx + 9, fy + 18, 2, 4);
          // Darker shoes
          ctx.fillStyle = '#111827';
          ctx.fillRect(fx + 4, fy + 22, 3, 1);
          ctx.fillRect(fx + 9, fy + 22, 3, 1);
        } else if (col === 0) {
          // Left Leg forward step
          ctx.fillRect(fx + 5, fy + 17, 2, 5); // left leg high
          ctx.fillRect(fx + 9, fy + 19, 2, 3); // right leg trailing
          ctx.fillStyle = '#111827';
          ctx.fillRect(fx + 4, fy + 22, 3, 1);
          ctx.fillRect(fx + 9, fy + 22, 2, 1);
        } else if (col === 2) {
          // Right Leg forward step
          ctx.fillRect(fx + 5, fy + 19, 2, 3); // left leg trailing
          ctx.fillRect(fx + 9, fy + 17, 2, 5); // right leg high
          ctx.fillStyle = '#111827';
          ctx.fillRect(fx + 5, fy + 22, 2, 1);
          ctx.fillRect(fx + 8, fy + 22, 3, 1);
        }

        // 5. Special Crown for Cosmic tier legends
        if (isCosmic) {
          ctx.fillStyle = '#fbbf24'; // Golden Yellow
          ctx.fillRect(fx + 5, fy + 0, 6, 2); // crown bar
          ctx.fillRect(fx + 4, fy - 1, 1, 2); // left peak
          ctx.fillRect(fx + 7, fy - 1, 2, 2); // center peak
          ctx.fillRect(fx + 11, fy - 1, 1, 2); // right peak
        }
      });
    });

    canvas.refresh();

    // Define the 12 frames manually for the spritesheet animation to work
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

  private createAllAnimations() {
    const tiers = ['green', 'blue', 'purple', 'crimson', 'cosmic'];

    tiers.forEach(tier => {
      // Walk Down (Row 0)
      this.anims.create({
        key: `walk_down_${tier}`,
        frames: this.anims.generateFrameNumbers(`player_${tier}`, { start: 0, end: 2 }),
        frameRate: 8,
        repeat: -1,
      });
      this.anims.create({
        key: `idle_down_${tier}`,
        frames: [{ key: `player_${tier}`, frame: 1 }],
        frameRate: 1,
      });

      // Walk Left (Row 1)
      this.anims.create({
        key: `walk_left_${tier}`,
        frames: this.anims.generateFrameNumbers(`player_${tier}`, { start: 3, end: 5 }),
        frameRate: 8,
        repeat: -1,
      });
      this.anims.create({
        key: `idle_left_${tier}`,
        frames: [{ key: `player_${tier}`, frame: 4 }],
        frameRate: 1,
      });

      // Walk Right (Row 2)
      this.anims.create({
        key: `walk_right_${tier}`,
        frames: this.anims.generateFrameNumbers(`player_${tier}`, { start: 6, end: 8 }),
        frameRate: 8,
        repeat: -1,
      });
      this.anims.create({
        key: `idle_right_${tier}`,
        frames: [{ key: `player_${tier}`, frame: 7 }],
        frameRate: 1,
      });

      // Walk Up (Row 3)
      this.anims.create({
        key: `walk_up_${tier}`,
        frames: this.anims.generateFrameNumbers(`player_${tier}`, { start: 9, end: 11 }),
        frameRate: 8,
        repeat: -1,
      });
      this.anims.create({
        key: `idle_up_${tier}`,
        frames: [{ key: `player_${tier}`, frame: 10 }],
        frameRate: 1,
      });
    });
  }

  private drawStarTreeStages() {
    // Stage 1: Seedling Sprout
    {
      const canvas = this.textures.createCanvas('star_tree_stage_1', 64, 64);
      const ctx = canvas.getContext();
      
      // Ground dirt mound shadow
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.beginPath(); ctx.arc(32, 54, 12, 0, Math.PI * 2); ctx.fill();
      
      ctx.fillStyle = '#854d0e'; // Dirt mound
      ctx.beginPath(); ctx.arc(32, 54, 8, 0, Math.PI * 2); ctx.fill();

      // Tiny green shoot
      ctx.fillStyle = '#22c55e'; // Bright green
      ctx.fillRect(31, 40, 2, 14);
      
      // Left leaf
      ctx.beginPath();
      ctx.ellipse(27, 43, 5, 3, -Math.PI / 6, 0, Math.PI * 2);
      ctx.fill();

      // Right leaf
      ctx.beginPath();
      ctx.ellipse(37, 41, 5, 3, Math.PI / 6, 0, Math.PI * 2);
      ctx.fill();
      
      canvas.refresh();
    }

    // Stage 2: Vibrant Sapling
    {
      const canvas = this.textures.createCanvas('star_tree_stage_2', 64, 64);
      const ctx = canvas.getContext();

      // Ground shadow
      ctx.fillStyle = 'rgba(0,0,0,0.18)';
      ctx.beginPath(); ctx.arc(32, 54, 14, 0, Math.PI * 2); ctx.fill();

      // Brown stalk
      ctx.fillStyle = '#78350f';
      ctx.fillRect(30, 36, 4, 18);

      // Fluffy mid leaves
      ctx.fillStyle = '#15803d'; // Green foliage
      ctx.beginPath(); ctx.arc(32, 28, 12, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(24, 30, 8, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(40, 30, 8, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = '#22c55e'; // Bright highlights
      ctx.beginPath(); ctx.arc(30, 25, 8, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(35, 26, 6, 0, Math.PI * 2); ctx.fill();

      canvas.refresh();
    }

    // Stage 3: Majestic Glowing Star Tree
    {
      const canvas = this.textures.createCanvas('star_tree_stage_3', 64, 80);
      const ctx = canvas.getContext();

      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.beginPath(); ctx.arc(32, 70, 18, 0, Math.PI * 2); ctx.fill();

      // Tree trunk
      ctx.fillStyle = '#451a03';
      ctx.fillRect(29, 44, 6, 26);
      ctx.fillStyle = '#78350f';
      ctx.fillRect(29, 44, 3, 26);

      // Leaves (Glowing deep emerald & golden hints)
      ctx.fillStyle = '#065f46'; // Emerald shadow
      ctx.beginPath(); ctx.arc(32, 30, 22, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = '#059669'; // Emerald body
      ctx.beginPath(); ctx.arc(24, 28, 16, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(40, 30, 15, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = '#34d399'; // Emerald highlight
      ctx.beginPath(); ctx.arc(32, 20, 12, 0, Math.PI * 2); ctx.fill();

      // Golden sparkle dots
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(22, 18, 2, 2);
      ctx.fillRect(42, 24, 2, 2);
      ctx.fillRect(30, 34, 2, 2);

      canvas.refresh();
    }

    // Stage 4: Ultimate Cosmic Octocat Tree
    {
      const canvas = this.textures.createCanvas('star_tree_stage_4', 80, 96);
      const ctx = canvas.getContext();

      // Large ambient shadow
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ctx.beginPath(); ctx.arc(40, 84, 24, 0, Math.PI * 2); ctx.fill();

      // Golden trunk
      ctx.fillStyle = '#d97706'; // Golden trunk
      ctx.fillRect(36, 52, 8, 32);
      ctx.fillStyle = '#f59e0b'; // golden branch highlights
      ctx.fillRect(36, 52, 4, 32);

      // Celestial Purple/Indigo Canopy
      ctx.fillStyle = '#311b92'; // Deep space indigo base
      ctx.beginPath(); ctx.arc(40, 36, 28, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = '#4a148c'; // Rich purple
      ctx.beginPath(); ctx.arc(26, 32, 20, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(54, 34, 18, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = '#00e5ff'; // Cyan glowing highlights
      ctx.beginPath(); ctx.arc(40, 22, 16, 0, Math.PI * 2); ctx.fill();

      // Spinning crown/gold sparkles
      ctx.fillStyle = '#ffd700'; // Pure gold highlights
      ctx.fillRect(24, 24, 3, 3);
      ctx.fillRect(56, 26, 3, 3);
      ctx.fillRect(38, 14, 4, 4); // Peak top star

      canvas.refresh();
    }
  }
}
