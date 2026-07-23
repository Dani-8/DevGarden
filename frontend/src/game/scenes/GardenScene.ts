import Phaser from 'phaser';
import { PlayerState, DecorationRow } from '../../types/index.js';
import { showPlayerBubble } from '../messaging/Messaging.js';

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

  // Atmosphere & Day/Night elements
  private atmosphereOverlay: Phaser.GameObjects.Rectangle | null = null;
  private fireflies: Phaser.GameObjects.Arc[] = [];

  // Obstacles
  private obstaclesGroup!: Phaser.Physics.Arcade.StaticGroup;
  private leaderboardTreeObj!: Phaser.GameObjects.Image;

  // Benches and sitting state
  private benchesList: Array<{ x: number; y: number; type: string; sprite: Phaser.GameObjects.Image }> = [];
  private isSitting: boolean = false;
  private eKey!: Phaser.Input.Keyboard.Key;
  private sitPromptText!: Phaser.GameObjects.Text;

  // Decoration placement state
  private activeDecorTool: string | null = null;
  private decorGhostPreview: Phaser.GameObjects.Container | null = null;
  private decorationsMap: Map<string, Phaser.GameObjects.Container> = new Map();

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
      this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    }

    // Sitting UI prompt text floating above benches when standing near
    this.sitPromptText = this.add.text(0, 0, 'Press [E] to Sit 🧘', {
      fontSize: '11px',
      fontFamily: 'system-ui, sans-serif',
      fontStyle: 'bold',
      color: '#ffffff',
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      padding: { x: 6, y: 3 }
    });
    this.sitPromptText.setOrigin(0.5, 1);
    this.sitPromptText.setDepth(3000);
    this.sitPromptText.setVisible(false);

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

    window.addEventListener('golden_water_locked', () => {
      this.goldenWaterActive = false;
      if (this.playerContainer) {
        this.showChatBubble(this.playerContainer, "🔒 Golden Water Locked!", false);
      }
      this.deactivateGoldTrail();
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

    // Initialize day/night atmosphere lighting & effects
    this.initAtmosphere();

    // Initialize our cozy decoration placement system!
    this.setupDecorationSystem();
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

    // Standing up if moving
    if (this.isSitting && (vx !== 0 || vy !== 0)) {
      this.isSitting = false;
    }

    // Interactive Bench Sitting check
    let nearBench: { x: number; y: number; type: string } | null = null;
    for (const bench of this.benchesList) {
      const dist = Phaser.Math.Distance.Between(this.playerContainer.x, this.playerContainer.y, bench.x, bench.y);
      if (dist < 40) {
        nearBench = bench;
        break;
      }
    }

    const body = this.playerContainer.body as Phaser.Physics.Arcade.Body;

    if (nearBench) {
      this.sitPromptText.setPosition(this.playerContainer.x, this.playerContainer.y - 35);
      this.sitPromptText.setText(this.isSitting ? 'Press [E] to Stand Up 🚶' : 'Press [E] to Sit 🧘');
      this.sitPromptText.setVisible(true);

      if (this.eKey && Phaser.Input.Keyboard.JustDown(this.eKey)) {
        if (this.isSitting) {
          this.isSitting = false;
          this.showChatBubble(this.playerContainer, "🚶 Stood up!", false);
        } else {
          this.isSitting = true;
          this.playerContainer.setPosition(nearBench.x, nearBench.y - 4);
          body.setVelocity(0, 0);
          this.showChatBubble(this.playerContainer, "🧘 Resting at Dev Garden...", false);
        }
      }
    } else {
      if (this.sitPromptText) this.sitPromptText.setVisible(false);
      if (this.isSitting) {
        this.isSitting = false;
      }
    }

    if (this.isSitting) {
      vx = 0;
      vy = 0;
      body.setVelocity(0, 0);
    } else {
      body.setVelocity(vx, vy);
    }

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
    // Render ground grid (32 cols x 24 rows)
    for (let tx = 0; tx < 32; tx++) {
      for (let ty = 0; ty < 24; ty++) {
        const px = tx * 32;
        const py = ty * 32;

        // 1. South Town Boulevard & Sidewalks (ty >= 21)
        if (ty >= 21) {
          this.add.image(px + 16, py + 16, 'cobblestone_tile').setDepth(-10);
          continue;
        }

        // 2. River Stream (tx = 24..26)
        if (tx >= 24 && tx <= 26) {
          // Spacious 3-tile wide Wooden Bridges at top (ty = 6, 7, 8) and bottom (ty = 16, 17, 18)
          if ((ty >= 6 && ty <= 8) || (ty >= 16 && ty <= 18)) {
            this.add.image(px + 16, py + 16, 'bridge_wood_tile').setDepth(-10);
            continue;
          }

          if (tx === 24) {
            this.add.image(px + 16, py + 16, 'river_bank_west').setDepth(-10);
          } else if (tx === 26) {
            this.add.image(px + 16, py + 16, 'river_bank_east').setDepth(-10);
          } else {
            const isWater2 = (tx + ty) % 2 === 0;
            this.add.image(px + 16, py + 16, isWater2 ? 'river_water_2' : 'river_water_1').setDepth(-10);

            // Procedural lily pad
            if ((tx * 13 + ty * 29) % 7 === 0) {
              this.add.image(px + 16, py + 16, 'lily_pad_tile').setDepth(-9);
            }
          }
          continue;
        }

        // 3. Eastern Zen Sanctuary (tx >= 27)
        if (tx >= 27) {
          const isEastBridgePath = (ty >= 6 && ty <= 8) || (ty >= 16 && ty <= 18);
          const isZenCourtyard = tx >= 27 && tx <= 30 && ty >= 9 && ty <= 15;

          if (isEastBridgePath || isZenCourtyard) {
            this.add.image(px + 16, py + 16, 'zen_gravel_tile').setDepth(-10);
          } else {
            const rng = (tx * 17 + ty * 31) % 100;
            if (rng < 25) {
              this.add.image(px + 16, py + 16, 'grass_tile_pink').setDepth(-10);
            } else {
              this.add.image(px + 16, py + 16, 'grass_tile').setDepth(-10);
            }
          }
          continue;
        }

        // 4. Western Main Garden (tx < 24) - Exact original path & grass layout
        const isPathX = (tx >= 6 && tx <= 23) && (ty === 7 || ty === 17);
        const isPathY = (ty >= 7 && ty <= 17) && (tx === 6 || tx === 23);
        const isCenterAisle = (tx === 16 && ty >= 7 && ty <= 20) || (ty === 12 && tx >= 6 && tx <= 23);

        if (isPathX || isPathY || isCenterAisle) {
          this.add.image(px + 16, py + 16, 'dirt_tile').setDepth(-10);
        } else {
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
    // Top border trees (skip river channel around x=768-832)
    for (let x = 32; x <= 1024; x += 96) {
      if (x >= 736 && x <= 864) continue;
      this.spawnTree(x, 24);
    }
    // Bottom border trees (skip river channel around x=768-832)
    for (let x = 32; x <= 1024; x += 96) {
      if (x >= 736 && x <= 864) continue;
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
    fountain.setOrigin(0.5, 0.6);
    fountain.setDepth(fountainY);
    this.physics.add.existing(fountain, true);
    
    // Set fountain collider bounds using custom updateFromGameObject override
    const fountainBody = fountain.body as Phaser.Physics.Arcade.StaticBody;
    const fw = 44;
    const fh = 30;
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
    const waterParticles = this.add.particles(fountainX, fountainY - 18, 'water_particle', {
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

    // Eastern Zen Sanctuary Benches
    this.spawnBench(930, 320, 'bench_horizontal');
    this.spawnBench(930, 460, 'bench_horizontal');

    // 4. River Physics Colliders (Blocks walking into water, leaves 3-tile wide bridges wide open!)
    // North water block (y: 0 to 192)
    const northWater = this.add.zone(816, 96, 65, 192);
    this.physics.add.existing(northWater, true);
    this.obstaclesGroup.add(northWater);

    // Mid water block between bridges (y: 288 to 512)
    const midWater = this.add.zone(816, 400, 65, 224);
    this.physics.add.existing(midWater, true);
    this.obstaclesGroup.add(midWater);

    // South water block (y: 608 to 672)
    const southWater = this.add.zone(816, 640, 65, 64);
    this.physics.add.existing(southWater, true);
    this.obstaclesGroup.add(southWater);

    // Sparkling River Water Particle Emitter
    const riverSparkles = this.add.particles(800, 384, 'water_particle', {
      scale: { start: 0.8, end: 0.1 },
      alpha: { start: 0.7, end: 0 },
      speedY: { min: 20, max: 50 },
      speedX: { min: -10, max: 10 },
      lifespan: 1200,
      frequency: 150,
      emitZone: {
        type: 'random',
        source: new Phaser.Geom.Rectangle(-15, -350, 64, 700) as any
      }
    });
    riverSparkles.setDepth(-8);

    // Swimming Ducks on the River
    const duck1 = this.add.image(816, 140, 'duck_prop');
    duck1.setDepth(140);
    this.tweens.add({
      targets: duck1,
      y: 350,
      duration: 12000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    const duck2 = this.add.image(816, 620, 'duck_prop');
    duck2.setDepth(620);
    this.tweens.add({
      targets: duck2,
      y: 420,
      duration: 9000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // 5. Eastern Zen Sanctuary (Sakura Cherry Blossom trees & Bamboo Groves)
    this.spawnSakuraTree(930, 160);
    this.spawnSakuraTree(930, 520);
    this.spawnBamboo(985, 220);
    this.spawnBamboo(985, 280);
    this.spawnBamboo(985, 380);
    this.spawnBamboo(985, 440);

    // 6. South Town Boulevard (Entrance Arch, Street Lamps, Code Cafe Storefront)
    const devArch = this.add.image(526, 665, 'dev_garden_arch');
    devArch.setOrigin(0.5, 0.85);
    devArch.setDepth(680);

    this.spawnStreetLamp(320, 672);
    this.spawnStreetLamp(720, 672);

    const codeCafe = this.add.image(180, 672, 'code_cafe_building');
    codeCafe.setOrigin(0.5, 0.85);
    codeCafe.setDepth(672);
    this.physics.add.existing(codeCafe, true);
    this.obstaclesGroup.add(codeCafe);

    // 7. Fireflies Ambient Lighting Particles
    const fireflyEmitter = this.add.particles(512, 384, 'firefly_particle', {
      scale: { start: 1, end: 0.2 },
      alpha: { start: 0.8, end: 0 },
      speedX: { min: -12, max: 12 },
      speedY: { min: -12, max: 12 },
      lifespan: 3000,
      frequency: 250,
      blendMode: 'ADD',
      emitZone: {
        type: 'random',
        source: new Phaser.Geom.Rectangle(-450, -320, 900, 640) as any
      }
    });
    fireflyEmitter.setDepth(2500);

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
    const goldenCrown = this.add.image(512, 44, 'leaderboard_crown_icon');
    goldenCrown.setDepth(2000);
    this.tweens.add({
      targets: goldenCrown,
      y: 35,
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

    // Save bench in interactive list for sitting!
    this.benchesList.push({ x, y, type: benchType, sprite: bench });
  }

  private spawnSakuraTree(x: number, y: number) {
    const tree = this.add.image(x, y, 'sakura_tree_prop');
    tree.setOrigin(0.5, 0.85);
    tree.setDepth(y);
    this.physics.add.existing(tree, true);

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

    // Falling Sakura Petals Emitter
    const petals = this.add.particles(x, y - 40, 'sakura_petal', {
      scale: { start: 1, end: 0.3 },
      alpha: { start: 0.9, end: 0 },
      speedX: { min: -25, max: -5 },
      speedY: { min: 15, max: 35 },
      lifespan: 2500,
      frequency: 300,
      emitZone: {
        type: 'random',
        source: new Phaser.Geom.Rectangle(-20, -10, 40, 20) as any
      }
    });
    petals.setDepth(y + 10);
  }

  private spawnBamboo(x: number, y: number) {
    const bamboo = this.add.image(x, y, 'bamboo_prop');
    bamboo.setOrigin(0.5, 0.9);
    bamboo.setDepth(y);
    this.physics.add.existing(bamboo, true);

    const bambooBody = bamboo.body as Phaser.Physics.Arcade.StaticBody;
    bambooBody.updateFromGameObject = function(this: Phaser.Physics.Arcade.StaticBody) {
      const gameObject = this.gameObject as any;
      this.width = 12;
      this.height = 10;
      this.halfWidth = 6;
      this.halfHeight = 5;
      this.x = gameObject.x - 6;
      this.y = gameObject.y - 10;
      this.center.setTo(this.x + 6, this.y + 5);
      return this;
    };
    bambooBody.updateFromGameObject();
    this.obstaclesGroup.add(bamboo);
  }

  private spawnStreetLamp(x: number, y: number) {
    const lamp = this.add.image(x, y, 'street_lamp');
    lamp.setOrigin(0.5, 0.9);
    lamp.setDepth(y);
    this.physics.add.existing(lamp, true);
    this.obstaclesGroup.add(lamp);

    // Warm streetlamp glow light aura
    const glow = this.add.particles(x, y - 48, 'glow_particle', {
      scale: { start: 1.2, end: 0.8 },
      alpha: { start: 0.35, end: 0.1 },
      tint: 0xfef08a,
      speed: 5,
      lifespan: 1000,
      frequency: 300,
      blendMode: 'ADD'
    });
    glow.setDepth(y - 1);
  }

  private createStarTree() {
    const treeX = 526;
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
    const toy = 55;

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
    this.starTreePromptText = this.add.text(treeX, treeY - 60, '', {
      fontSize: '11px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontStyle: 'bold',
      color: '#ffffff',
      backgroundColor: 'rgba(15, 23, 42, 0.92)',
      padding: { x: 8, y: 6 },
      align: 'center',
      stroke: '#000000',
      strokeThickness: 1
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
    if (score < 50) return 'star_tree_stage_1';
    if (score < 150) return 'star_tree_stage_2';
    if (score < 400) return 'star_tree_stage_3';
    return 'star_tree_stage_4';
  }

  private getStarTreeStageName(score: number): string {
    if (score < 50) return 'GitHub Seedling Sprout';
    if (score < 150) return 'Vibrant GitHub Sapling';
    if (score < 400) return 'Majestic Glowing Star Tree';
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
      fontFamily: 'system-ui, -apple-system, sans-serif',
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

  private deactivateGoldTrail() {
    if (this.goldTrailEmitter) {
      this.goldTrailEmitter.destroy();
      this.goldTrailEmitter = null;
    }
  }

  private createProceduralTextures() {
    // 1. Particle Glow dot
    this.drawCircleTexture('glow_particle', 8, '#ffffff', true);

    // 2. Water bubble particle
    this.drawCircleTexture('water_particle', 4, '#a5f3fc', false);

    // 3. TileTextures: grass, yellow grass, pink grass, dirt, river water, banks, and wooden bridges
    this.drawGrassTile('grass_tile', '#428554', []);
    this.drawGrassTile('grass_tile_yellow', '#428554', [{ x: 8, y: 12, c: '#ffd700' }, { x: 24, y: 20, c: '#ffd700' }]);
    this.drawGrassTile('grass_tile_pink', '#428554', [{ x: 12, y: 24, c: '#f472b6' }, { x: 20, y: 6, c: '#ffffff' }]);
    this.drawDirtTile();

    // River & Bridge Textures
    this.drawWaterTile('river_water_1', '#0284c7', '#38bdf8');
    this.drawWaterTile('river_water_2', '#0369a1', '#0284c7');
    this.drawRiverBankTile('river_bank_west', true);
    this.drawRiverBankTile('river_bank_east', false);
    this.drawBridgeWoodTile();
    this.drawLilyPadTile();

    // Zen, Boulevard, Duck, Sakura & Firefly Textures
    this.drawZenGravelTile();
    this.drawCobblestoneTile();
    this.drawSakuraTreeProp();
    this.drawBambooProp();
    this.drawDevGardenArch();
    this.drawStreetLampProp();
    this.drawCodeCafeStorefront();
    this.drawDuckProp();
    this.drawPetalParticle();
    this.drawFireflyParticle();

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
    canvas.refresh();
  }

  private drawWaterTile(key: string, baseColor: string, waveColor: string) {
    const canvas = this.textures.createCanvas(key, 32, 32);
    const ctx = canvas.getContext();

    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, 32, 32);

    ctx.fillStyle = waveColor;
    ctx.fillRect(4, 8, 12, 2);
    ctx.fillRect(20, 16, 8, 2);
    ctx.fillRect(8, 24, 10, 2);

    canvas.refresh();
  }

  private drawRiverBankTile(key: string, isWest: boolean) {
    const canvas = this.textures.createCanvas(key, 32, 32);
    const ctx = canvas.getContext();

    // Base water
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(0, 0, 32, 32);

    // Grass and mud shore edge
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

  private drawBridgeWoodTile() {
    const canvas = this.textures.createCanvas('bridge_wood_tile', 32, 32);
    const ctx = canvas.getContext();

    // Sturdy wooden bridge plank base
    ctx.fillStyle = '#854d0e';
    ctx.fillRect(0, 0, 32, 32);

    // Dark plank separation lines
    ctx.fillStyle = '#532d08';
    ctx.fillRect(0, 0, 32, 2);
    ctx.fillRect(0, 10, 32, 2);
    ctx.fillRect(0, 20, 32, 2);
    ctx.fillRect(0, 30, 32, 2);

    // Wooden grain detail highlights
    ctx.fillStyle = '#a16207';
    ctx.fillRect(4, 4, 12, 2);
    ctx.fillRect(18, 14, 10, 2);
    ctx.fillRect(6, 24, 14, 2);

    canvas.refresh();
  }

  private drawLilyPadTile() {
    const canvas = this.textures.createCanvas('lily_pad_tile', 32, 32);
    const ctx = canvas.getContext();

    // Base river water
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(0, 0, 32, 32);

    // Green rounded lily pad
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(16, 16, 10, 0, Math.PI * 1.8);
    ctx.fill();

    // Pink water lily blossom
    ctx.fillStyle = '#f472b6';
    ctx.fillRect(14, 14, 4, 4);

    canvas.refresh();
  }

  private drawZenGravelTile() {
    const canvas = this.textures.createCanvas('zen_gravel_tile', 32, 32);
    const ctx = canvas.getContext();

    // Base light grey stone
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(0, 0, 32, 32);

    // Zen rake grooves
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(0, 6, 32, 2);
    ctx.fillRect(0, 16, 32, 2);
    ctx.fillRect(0, 26, 32, 2);

    // Pebble accents
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(6, 12, 3, 2);
    ctx.fillRect(22, 22, 3, 2);

    canvas.refresh();
  }

  private drawCobblestoneTile() {
    const canvas = this.textures.createCanvas('cobblestone_tile', 32, 32);
    const ctx = canvas.getContext();

    // Mortar dark gray
    ctx.fillStyle = '#334155';
    ctx.fillRect(0, 0, 32, 32);

    // Cobble stone blocks
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

    // Stone highlights
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(2, 2, 12, 1);
    ctx.fillRect(18, 2, 12, 1);
    ctx.fillRect(11, 10, 12, 1);

    canvas.refresh();
  }

  private drawSakuraTreeProp() {
    const canvas = this.textures.createCanvas('sakura_tree_prop', 64, 80);
    const ctx = canvas.getContext();

    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.arc(32, 62, 13, 0, Math.PI * 2);
    ctx.fill();

    // Trunk
    ctx.fillStyle = '#451a03';
    ctx.fillRect(28, 46, 8, 24);
    ctx.fillStyle = '#290e02';
    ctx.fillRect(32, 46, 4, 24);

    // Sakura Cherry Blossom canopy
    ctx.fillStyle = '#be185d'; // Deep pink shadow
    ctx.beginPath();
    ctx.arc(32, 28, 24, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f472b6'; // Vibrant cherry blossom pink
    ctx.beginPath();
    ctx.arc(26, 24, 18, 0, Math.PI * 2);
    ctx.arc(40, 26, 16, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fbcfe8'; // Light pink highlights
    ctx.beginPath();
    ctx.arc(22, 18, 12, 0, Math.PI * 2);
    ctx.arc(34, 16, 10, 0, Math.PI * 2);
    ctx.fill();

    // White blossom petals
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(20, 20, 2, 2);
    ctx.fillRect(38, 24, 2, 2);
    ctx.fillRect(28, 14, 2, 2);

    canvas.refresh();
  }

  private drawBambooProp() {
    const canvas = this.textures.createCanvas('bamboo_prop', 32, 64);
    const ctx = canvas.getContext();

    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(6, 58, 20, 4);

    // 3 Bamboo Stalks
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

  private drawDevGardenArch() {
    const canvas = this.textures.createCanvas('dev_garden_arch', 128, 80);
    const ctx = canvas.getContext();

    // Left Pillar
    ctx.fillStyle = '#78350f';
    ctx.fillRect(12, 16, 16, 60);
    ctx.fillStyle = '#451a03';
    ctx.fillRect(20, 16, 8, 60);

    // Right Pillar
    ctx.fillStyle = '#78350f';
    ctx.fillRect(100, 16, 16, 60);
    ctx.fillStyle = '#451a03';
    ctx.fillRect(108, 16, 8, 60);

    // Cross Beam
    ctx.fillStyle = '#92400e';
    ctx.fillRect(4, 8, 120, 18);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(4, 22, 120, 4);

    // Arch roof top
    ctx.fillStyle = '#b45309';
    ctx.fillRect(0, 4, 128, 6);

    // Banner "DEV GARDEN"
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(32, 12, 64, 12);
    ctx.strokeStyle = '#78350f';
    ctx.strokeRect(32, 12, 64, 12);

    ctx.fillStyle = '#451a03';
    ctx.font = 'bold 8px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('DEV GARDEN', 64, 21);

    // Lanterns on pillars
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(16, 28, 8, 10);
    ctx.fillRect(104, 28, 8, 10);

    canvas.refresh();
  }

  private drawStreetLampProp() {
    const canvas = this.textures.createCanvas('street_lamp', 32, 64);
    const ctx = canvas.getContext();

    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(10, 58, 12, 4);

    // Iron pole
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(14, 16, 4, 44);
    ctx.fillRect(12, 54, 8, 4);

    // Lantern head
    ctx.fillStyle = '#334155';
    ctx.fillRect(10, 8, 12, 10);

    // Glowing bulb
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(12, 10, 8, 6);

    canvas.refresh();
  }

  private drawCodeCafeStorefront() {
    const canvas = this.textures.createCanvas('code_cafe_building', 96, 80);
    const ctx = canvas.getContext();

    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(4, 72, 88, 6);

    // Brick building body
    ctx.fillStyle = '#854d0e';
    ctx.fillRect(8, 20, 80, 56);

    // Roof awning (red and white stripes)
    for (let i = 0; i < 80; i += 10) {
      ctx.fillStyle = (i / 10) % 2 === 0 ? '#ef4444' : '#ffffff';
      ctx.fillRect(8 + i, 16, 10, 12);
    }

    // Signboard "CODE CAFE"
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(20, 4, 56, 12);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 8px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('☕ CODE CAFE', 48, 13);

    // Glass door
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(40, 44, 16, 32);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(42, 48, 12, 16);

    // Cafe Window
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(14, 36, 20, 24);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(16, 38, 16, 20);

    canvas.refresh();
  }

  private drawDuckProp() {
    const canvas = this.textures.createCanvas('duck_prop', 16, 16);
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

  private drawPetalParticle() {
    const canvas = this.textures.createCanvas('sakura_petal', 6, 6);
    const ctx = canvas.getContext();
    ctx.fillStyle = '#f472b6';
    ctx.beginPath();
    ctx.arc(3, 3, 2.5, 0, Math.PI * 2);
    ctx.fill();
    canvas.refresh();
  }

  private drawFireflyParticle() {
    const canvas = this.textures.createCanvas('firefly_particle', 6, 6);
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

  private drawTreeProp() {
    const canvas = this.textures.createCanvas('tree_prop', 64, 80);
    const ctx = canvas.getContext();

    // 1. Semi-transparent ground shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.arc(32, 62, 13, 0, Math.PI * 2);
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
    ctx.arc(32, 40, 23, 0, Math.PI * 2);
    ctx.fill();

    // 2. Stone circular base pool
    ctx.fillStyle = '#90a4ae'; // slate gray stone border
    ctx.beginPath();
    ctx.arc(32, 40, 20, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#01579b'; // pool water blue
    ctx.beginPath();
    ctx.arc(32, 40, 16, 0, Math.PI * 2);
    ctx.fill();

    // Water swirls inside
    ctx.fillStyle = '#0288d1';
    ctx.beginPath();
    ctx.arc(28, 38, 8, 0, Math.PI * 2);
    ctx.fill();

    // 3. Central stone fountain pillar
    ctx.fillStyle = '#b0bec5';
    ctx.fillRect(28, 15, 8, 20);
    ctx.fillStyle = '#78909c';
    ctx.fillRect(32, 15, 4, 20);

    // Top small basin
    ctx.fillStyle = '#90a4ae';
    ctx.beginPath();
    ctx.arc(32, 15, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#00b0ff'; // bubbling water top basin
    ctx.beginPath();
    ctx.arc(32, 15, 7, 0, Math.PI * 2);
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

      // Walk Left (Row 1 is drawn facing right, Row 2 is drawn facing left, so we use Row 2 for Left)
      this.anims.create({
        key: `walk_left_${tier}`,
        frames: this.anims.generateFrameNumbers(`player_${tier}`, { start: 6, end: 8 }),
        frameRate: 8,
        repeat: -1,
      });
      this.anims.create({
        key: `idle_left_${tier}`,
        frames: [{ key: `player_${tier}`, frame: 7 }],
        frameRate: 1,
      });

      // Walk Right (Row 1 is drawn facing right, so we use Row 1 for Right)
      this.anims.create({
        key: `walk_right_${tier}`,
        frames: this.anims.generateFrameNumbers(`player_${tier}`, { start: 3, end: 5 }),
        frameRate: 8,
        repeat: -1,
      });
      this.anims.create({
        key: `idle_right_${tier}`,
        frames: [{ key: `player_${tier}`, frame: 4 }],
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

  private initAtmosphere() {
    const hours = new Date().getHours();
    
    let color = 0xfffaf0;
    let alpha = 0.02;
    let isNight = false;

    if (hours >= 5 && hours < 9) {
      // Morning Dew (warm rose/peach pink)
      color = 0xff9e7d;
      alpha = 0.15;
    } else if (hours >= 9 && hours < 17) {
      // Clear Greenhouse Day (crystal warm white)
      color = 0xfffaf0;
      alpha = 0.02;
    } else if (hours >= 17 && hours < 20) {
      // Golden Hour (warm sunset gold)
      color = 0xf28e2b;
      alpha = 0.22;
    } else {
      // Midnight (cozy deep navy/violet)
      color = 0x07091e;
      alpha = 0.42;
      isNight = true;
    }

    // Create full viewport overlay rectangle spanning the world bounds (1024x768)
    this.atmosphereOverlay = this.add.rectangle(0, 0, 1024, 768, color, alpha);
    this.atmosphereOverlay.setOrigin(0, 0);
    this.atmosphereOverlay.setDepth(1500); // Overlay characters and trees but let tags sit readable
    this.atmosphereOverlay.setScrollFactor(1); // Anchored to world layout

    if (isNight) {
      this.spawnFireflies();
    }
  }

  private spawnFireflies() {
    // Spawn 15 drifting glowing fireflies at random locations in the greenhouse
    for (let i = 0; i < 15; i++) {
      const rx = Phaser.Math.Between(50, 974);
      const ry = Phaser.Math.Between(50, 718);
      
      const firefly = this.add.circle(rx, ry, 2.5, 0xfff97d, 0.85);
      firefly.setDepth(1600); // Floating above atmosphere overlay
      this.fireflies.push(firefly);
      
      this.tweens.add({
        targets: firefly,
        x: rx + Phaser.Math.Between(-40, 40),
        y: ry + Phaser.Math.Between(-40, 40),
        alpha: { from: 0.2, to: 1.0 },
        scale: { from: 0.6, to: 1.2 },
        duration: Phaser.Math.Between(3000, 6000),
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }
  }

  // --- COZY DECORATION PLACEMENT SYSTEM ---

  private setupDecorationSystem() {
    // 1. Listen for active tool changes from React UI
    window.addEventListener('select-decor-tool', (e: any) => {
      const toolId = e.detail?.toolId || null;
      this.activeDecorTool = toolId;
      this.updateGhostPreview();
    });

    // 2. Sync mouse movement to update the ghost preview coordinates
    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (this.decorGhostPreview) {
        // Snap to 16px grid for clean building!
        const snapX = Math.round(pointer.worldX / 16) * 16;
        const snapY = Math.round(pointer.worldY / 16) * 16;
        this.decorGhostPreview.setPosition(snapX, snapY);
        this.decorGhostPreview.setDepth(snapY + 20); // render slightly above floor depth
      }
    });

    // 3. Handle clicks on the ground to place items
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer, currentlyOver: any[]) => {
      if (!this.activeDecorTool) return;

      // Ignore clicks on existing UI/interactive items if we're not using the hammer
      if (currentlyOver.length > 0 && this.activeDecorTool !== 'hammer') {
        // Check if we clicked on another player or NPC, if so ignore placement
        const hasInteractiveOverlap = currentlyOver.some(obj => {
          return obj.texture && (obj.texture.key.startsWith('player_') || obj.texture.key === 'star_tree_sprout');
        });
        if (hasInteractiveOverlap) return;
      }

      const snapX = Math.round(pointer.worldX / 16) * 16;
      const snapY = Math.round(pointer.worldY / 16) * 16;

      if (this.activeDecorTool === 'hammer') {
        // Demolish check: did we click a decoration?
        let clickedDecorId: string | null = null;
        for (const [id, container] of this.decorationsMap.entries()) {
          // Check proximity to the click
          const dist = Phaser.Math.Distance.Between(snapX, snapY, container.x, container.y);
          if (dist < 20) {
            clickedDecorId = id;
            break;
          }
        }

        if (clickedDecorId) {
          const container = this.decorationsMap.get(clickedDecorId);
          const placedBy = container?.getData('placed_by');
          const username = container?.getData('placed_by_username') || 'someone';

          // Allow users to delete their own items (or default items starting with 'default_')
          if (placedBy === this.selfPlayer?.id || clickedDecorId.startsWith('default_')) {
            this.removeDecorItem(clickedDecorId);
          } else {
            // Show a speech bubble indicating who owns this item
            if (this.playerContainer) {
              this.showChatBubble(this.playerContainer, `🔒 This cozy item belongs to @${username}!`, false);
            }
          }
        }
      } else {
        // Place item
        // Prevent placing items outside world bounds (0, 0, 1024, 768)
        if (snapX < 32 || snapX > 992 || snapY < 32 || snapY > 736) return;

        // Prevent placing directly on top of the leaderboard tree or co-op sprout
        const distToLeaderboard = Phaser.Math.Distance.Between(snapX, snapY, this.leaderboardTreeObj.x, this.leaderboardTreeObj.y);
        if (distToLeaderboard < 50) {
          if (this.playerContainer) {
            this.showChatBubble(this.playerContainer, "❌ Too close to the Leaderboard Tree!", false);
          }
          return;
        }

        if (this.starTreeSprite) {
          const distToStarTree = Phaser.Math.Distance.Between(snapX, snapY, this.starTreeSprite.x, this.starTreeSprite.y);
          if (distToStarTree < 50) {
            if (this.playerContainer) {
              this.showChatBubble(this.playerContainer, "❌ Too close to the Co-op Sprout Tree!", false);
            }
            return;
          }
        }

        this.placeDecorItem(this.activeDecorTool, snapX, snapY);
      }
    });

    // 4. Fetch initial decorations list from server
    const apiBase = import.meta.env.VITE_API_URL || '';
    fetch(`${apiBase}/api/decorations`)
      .then(res => res.json())
      .then((decors: DecorationRow[]) => {
        if (decors && Array.isArray(decors)) {
          decors.forEach(decor => {
            this.drawDecoration(decor);
          });
        }
      })
      .catch(err => {
        console.error('Error loading decorations from API:', err);
      });

    // 5. Connect real-time socket events for sync
    this.socket.on('decor_placed', (decor: DecorationRow) => {
      this.drawDecoration(decor);
    });

    this.socket.on('decor_removed', (data: { id: string }) => {
      const container = this.decorationsMap.get(data.id);
      if (container) {
        this.playDecorBreakEffect(container.x, container.y);
        container.destroy();
        this.decorationsMap.delete(data.id);
      }
    });
  }

  private updateGhostPreview() {
    // Clear old preview if any
    if (this.decorGhostPreview) {
      this.decorGhostPreview.destroy();
      this.decorGhostPreview = null;
    }

    if (!this.activeDecorTool || this.activeDecorTool === 'hammer') {
      return;
    }

    // Ensure input and activePointer exist
    if (!this.input || !this.input.activePointer) {
      return;
    }

    // Determine emoji
    const emojiMap: Record<string, string> = {
      campfire: '🔥',
      lantern: '🏮',
      picnic: '🧺',
      bench: '🪑',
      sunflower: '🌻',
      mushroom: '🍄',
      duckpool: '🦆',
    };

    const emoji = emojiMap[this.activeDecorTool] || '❓';
    
    // Create ghost container
    const x = this.input.activePointer.worldX;
    const y = this.input.activePointer.worldY;
    this.decorGhostPreview = this.add.container(x, y);

    // Subtle ghost shadow
    const shadow = this.add.ellipse(0, 4, 16, 6, 0x000000, 0.15);
    this.decorGhostPreview.add(shadow);

    // Ghost emoji with alpha transparency
    const text = this.add.text(0, -8, emoji, {
      fontSize: '24px'
    }).setOrigin(0.5).setAlpha(0.5);
    this.decorGhostPreview.add(text);

    // Subtle placement circle guide
    const ring = this.add.circle(0, 0, 18, 0x00e5ff, 0.1);
    const stroke = this.add.circle(0, 0, 18);
    stroke.setStrokeStyle(1, 0x00e5ff, 0.4);
    this.decorGhostPreview.add(ring);
    this.decorGhostPreview.add(stroke);
  }

  private drawDecoration(decor: DecorationRow) {
    // Prevent duplicate rendering
    if (this.decorationsMap.has(decor.id)) {
      this.decorationsMap.get(decor.id)?.destroy();
    }

    const emojiMap: Record<string, string> = {
      campfire: '🔥',
      lantern: '🏮',
      picnic: '🧺',
      bench: '🪑',
      sunflower: '🌻',
      mushroom: '🍄',
      duckpool: '🦆',
    };

    const emoji = emojiMap[decor.item_type] || '🪵';

    // Create container at coordinate
    const container = this.add.container(decor.x, decor.y);
    container.setData('id', decor.id);
    container.setData('placed_by', decor.placed_by);
    container.setData('placed_by_username', decor.placed_by_username);
    container.setDepth(decor.y);

    // Beautiful grounded shadow
    const shadow = this.add.ellipse(0, 5, 20, 8, 0x000000, 0.25);
    container.add(shadow);

    // Pulsing or glowing visual effects for active items
    if (decor.item_type === 'campfire') {
      // Warm glowing fire pulse
      const glow = this.add.circle(0, 4, 18, 0xff5722, 0.15);
      container.add(glow);
      this.tweens.add({
        targets: glow,
        scale: 1.3,
        alpha: 0.04,
        duration: 900 + Math.random() * 300,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    } else if (decor.item_type === 'lantern') {
      // Warm yellow lamp pulse
      const glow = this.add.circle(0, -6, 12, 0xffeb3b, 0.15);
      container.add(glow);
      this.tweens.add({
        targets: glow,
        scale: 1.25,
        alpha: 0.05,
        duration: 1200 + Math.random() * 400,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    } else if (decor.item_type === 'mushroom') {
      // Magical neon pink/purple pulse
      const glow = this.add.circle(0, -2, 14, 0xe040fb, 0.15);
      container.add(glow);
      this.tweens.add({
        targets: glow,
        scale: 1.2,
        alpha: 0.03,
        duration: 1500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }

    // Primary emoji visual
    const emojiText = this.add.text(0, -10, emoji, {
      fontSize: '26px'
    }).setOrigin(0.5);
    emojiText.setResolution(2);
    container.add(emojiText);

    // Hover Tooltip: Shows "Placed by: @username" only on hover (as requested!)
    const isSelf = decor.placed_by === this.selfPlayer?.id;
    const authorText = isSelf ? 'You' : `@${decor.placed_by_username}`;
    const tooltip = this.add.text(0, -28, `Placed by ${authorText}`, {
      fontFamily: 'monospace',
      fontSize: '8px',
      color: '#ffeb3b',
      backgroundColor: '#0f172acc',
      padding: { x: 5, y: 2.5 },
      stroke: '#000000',
      strokeThickness: 1.5,
    }).setOrigin(0.5).setResolution(2).setVisible(false).setDepth(2000);
    container.add(tooltip);

    // Setup interactive zone on emoji text
    emojiText.setInteractive({ useHandCursor: true });
    
    emojiText.on('pointerover', () => {
      tooltip.setVisible(true);
      // If we have the hammer active and it belongs to us (or is default), color it slightly red to indicate demolition
      if (this.activeDecorTool === 'hammer' && (isSelf || decor.id.startsWith('default_'))) {
        emojiText.setTint(0xff7b72);
      }
    });

    emojiText.on('pointerout', () => {
      tooltip.setVisible(false);
      emojiText.clearTint();
    });

    // Also support clicking for demolition
    emojiText.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      pointer.event.stopPropagation();
      
      if (this.activeDecorTool === 'hammer') {
        if (isSelf || decor.id.startsWith('default_')) {
          this.removeDecorItem(decor.id);
        } else {
          // Tell them who placed it
          if (this.playerContainer) {
            this.showChatBubble(this.playerContainer, `🔒 This cozy item belongs to @${decor.placed_by_username}!`, false);
          }
        }
      }
    });

    this.decorationsMap.set(decor.id, container);
  }

  private async placeDecorItem(itemType: string, x: number, y: number) {
    const id = `decor_${this.selfPlayer?.id || 'anon'}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    
    const payload = {
      id,
      item_type: itemType,
      x,
      y,
      placed_by: this.selfPlayer?.id || 'anon',
      placed_by_username: this.selfPlayer?.username || 'Anonymous',
    };

    // Render locally immediately for instant responsive game feedback
    const decorRow: DecorationRow = {
      ...payload,
      created_at: Date.now()
    };
    this.drawDecoration(decorRow);
    this.playDecorPlaceEffect(x, y);

    // Broadcast over sockets so other active players see it instantly!
    this.socket.emit('decor_place', decorRow);

    // Cancel React hotbar selection state
    window.dispatchEvent(new CustomEvent('cancel-decor-tool'));

    // Call REST API to save persistently in database
    try {
      const apiBase = import.meta.env.VITE_API_URL || '';
      const token = localStorage.getItem('devgarden_token');
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        headers['X-Session-ID'] = token;
      }

      const res = await fetch(`${apiBase}/api/decorations`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        console.error('Failed to persist decoration in database.');
      }
    } catch (e) {
      console.error('Network error persisting decoration:', e);
    }
  }

  private async removeDecorItem(id: string) {
    // Remove locally
    const container = this.decorationsMap.get(id);
    if (container) {
      this.playDecorBreakEffect(container.x, container.y);
      container.destroy();
      this.decorationsMap.delete(id);
    }

    // Broadcast over sockets
    this.socket.emit('decor_remove', { id });

    // Cancel React hotbar selection state
    window.dispatchEvent(new CustomEvent('cancel-decor-tool'));

    // Call REST API to delete persistently
    try {
      const apiBase = import.meta.env.VITE_API_URL || '';
      const token = localStorage.getItem('devgarden_token');
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        headers['X-Session-ID'] = token;
      }

      const res = await fetch(`${apiBase}/api/decorations/${id}`, {
        method: 'DELETE',
        headers
      });

      if (!res.ok) {
        console.error('Failed to remove decoration from database.');
      }
    } catch (e) {
      console.error('Network error deleting decoration:', e);
    }
  }

  private playDecorPlaceEffect(x: number, y: number) {
    // Cute spark particles on placement
    const spark = this.add.particles(x, y, 'glow_particle', {
      scale: { start: 0.25, end: 0 },
      alpha: { start: 0.8, end: 0 },
      tint: 0x4caf50,
      speed: { min: 20, max: 50 },
      lifespan: 500,
      maxParticles: 8,
    });
    this.time.delayedCall(600, () => spark.destroy());
  }

  private playDecorBreakEffect(x: number, y: number) {
    // Cozy wood chip breaking particle effect
    const chips = this.add.particles(x, y, 'glow_particle', {
      scale: { start: 0.2, end: 0 },
      alpha: { start: 0.7, end: 0 },
      tint: 0x8d6e63, // wood brown chips
      speed: { min: 30, max: 80 },
      lifespan: 400,
      maxParticles: 10,
    });
    this.time.delayedCall(500, () => chips.destroy());
  }
}
