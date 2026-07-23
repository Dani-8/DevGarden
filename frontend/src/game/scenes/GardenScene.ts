import Phaser from 'phaser';
import { PlayerState } from '../../types/index.js';
import { ProceduralTextures } from '../textures/ProceduralTextures.js';
import { TilemapBuilder } from '../map/TilemapBuilder.js';
import { WorldPropsManager, BenchInfo } from '../props/WorldPropsManager.js';
import { PlayerManager } from './PlayerManager.js';
import { StarTreeManager } from '../managers/StarTreeManager.js';
import { DecorationsManager } from '../managers/DecorationsManager.js';
import { AtmosphereManager } from '../managers/AtmosphereManager.js';

export default class GardenScene extends Phaser.Scene {
  private socket!: any;
  private selfPlayer: PlayerState | null = null;
  private currentUserId: string = '';
  
  // Managers
  private playerManager!: PlayerManager;
  private starTreeManager!: StarTreeManager;
  private decorationsManager!: DecorationsManager;
  private atmosphereManager!: AtmosphereManager;

  // Game objects & physics state
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

  // Position sync throttles
  private lastMoveSent: number = 0;
  private lastX: number = 0;
  private lastY: number = 0;
  private lastAnim: string = 'idle_down';

  // React UI Callbacks
  private onSelectPlayerCallback?: (player: PlayerState) => void;
  private onNearLeaderboardCallback?: (isNear: boolean) => void;

  // Obstacles & World Props
  private obstaclesGroup!: Phaser.Physics.Arcade.StaticGroup;
  private leaderboardTreeObj!: Phaser.GameObjects.Image;

  // Benches and Sitting
  private benchesList: BenchInfo[] = [];
  private isSitting: boolean = false;
  private eKey!: Phaser.Input.Keyboard.Key;
  private sitPromptText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'GardenScene' });
  }

  init(data: { socket: any; self: PlayerState; onSelectPlayer: (p: PlayerState) => void; onNearLeaderboard: (isNear: boolean) => void }) {
    this.socket = data.socket;
    this.selfPlayer = data.self;
    this.currentUserId = data.self?.id || '';
    this.onSelectPlayerCallback = data.onSelectPlayer;
    this.onNearLeaderboardCallback = data.onNearLeaderboard;
    
    this.playerManager = new PlayerManager(this);
    this.starTreeManager = new StarTreeManager(
      this,
      this.socket,
      this.currentUserId,
      (text: string) => {
        if (this.playerContainer) {
          this.playerManager.showChatBubble(this.playerContainer, text, false);
        }
      }
    );
    this.atmosphereManager = new AtmosphereManager(this);
  }

  preload() {
    ProceduralTextures.createAll(this);
  }

  create(data: { players: PlayerState[]; sleepingNPCs: PlayerState[] }) {
    this.physics.world.setBounds(0, 0, 1024, 768);

    // 1. Tilemap background
    TilemapBuilder.draw(this);

    // 2. Obstacles static group & props
    this.obstaclesGroup = this.physics.add.staticGroup();
    const props = WorldPropsManager.createProps(this, this.obstaclesGroup, this.benchesList);
    this.leaderboardTreeObj = props.leaderboardTreeObj;

    // 3. Player animations
    this.playerManager.createAllAnimations();

    // 4. Spawn self & others
    if (this.selfPlayer) {
      const selfObj = this.playerManager.spawnSelf(this.selfPlayer, this.onSelectPlayerCallback);
      this.playerContainer = selfObj.container;
      this.playerSprite = selfObj.sprite;
    }

    if (data.players) {
      data.players.forEach(p => {
        if (p.id !== this.currentUserId) {
          this.playerManager.spawnRemotePlayer(p, this.otherPlayers, this.onSelectPlayerCallback);
        }
      });
    }

    if (data.sleepingNPCs) {
      data.sleepingNPCs.forEach(npc => {
        this.playerManager.spawnSleepingNPC(npc, this.sleepingNPCs, this.onSelectPlayerCallback);
      });
    }

    // 5. Camera follow & dynamic zoom
    this.cameras.main.setBounds(0, 0, 1024, 768);
    if (this.playerContainer) {
      this.cameras.main.startFollow(this.playerContainer, true, 0.1, 0.1);
    }

    const updateZoom = (width: number, height: number) => {
      const zoomX = width / 1024;
      const zoomY = height / 768;
      const zoom = Math.max(zoomX, zoomY, 1);
      this.cameras.main.setZoom(zoom);
    };

    this.scale.on('resize', (gameSize: any) => {
      updateZoom(gameSize.width, gameSize.height);
    });
    updateZoom(this.scale.width, this.scale.height);

    // 6. Controls
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

    // Sitting UI prompt
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

    // 7. Initialize Sub-Managers
    this.starTreeManager.init(this.obstaclesGroup);

    this.decorationsManager = new DecorationsManager(
      this,
      this.socket,
      this.selfPlayer,
      this.leaderboardTreeObj,
      this.starTreeManager.starTreeSprite,
      (text: string) => {
        if (this.playerContainer) {
          this.playerManager.showChatBubble(this.playerContainer, text, false);
        }
      }
    );
    this.decorationsManager.init();

    this.atmosphereManager.init();

    // Socket network listeners
    this.setupSocketListeners();

    if (this.starTreeManager.goldenWaterActive && this.playerContainer) {
      this.time.delayedCall(500, () => {
        if (this.playerContainer) {
          this.starTreeManager.initGoldTrail(this.playerContainer);
        }
      });
    }

    if (this.playerContainer) {
      this.physics.add.collider(this.playerContainer, this.obstaclesGroup);
    }
  }

  update() {
    if (!this.playerContainer || !this.playerSprite || !this.cursors || !this.wasd) return;

    const speed = 120;
    let vx = 0;
    let vy = 0;
    let animKey = 'idle_down';

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

    if (vx !== 0 && vy !== 0) {
      vx *= 0.7071;
      vy *= 0.7071;
    }

    if (this.isSitting && (vx !== 0 || vy !== 0)) {
      this.isSitting = false;
    }

    let nearBench: BenchInfo | null = null;
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
          this.playerManager.showChatBubble(this.playerContainer, "🚶 Stood up!", false);
        } else {
          this.isSitting = true;
          this.playerContainer.setPosition(nearBench.x, nearBench.y - 4);
          body.setVelocity(0, 0);
          this.playerManager.showChatBubble(this.playerContainer, "🧘 Resting at Dev Garden...", false);
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

    const tier = this.selfPlayer?.visual_tier || 'green';
    if (vx === 0 && vy === 0) {
      if (this.lastAnim.includes('left')) animKey = 'idle_left';
      else if (this.lastAnim.includes('right')) animKey = 'idle_right';
      else if (this.lastAnim.includes('up')) animKey = 'idle_up';
      else animKey = 'idle_down';

      this.playerSprite.play(`${animKey}_${tier}`, true);
    } else {
      this.playerSprite.play(`${animKey}_${tier}`, true);
    }

    // Leaderboard Proximity
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

    // Star Tree Proximity
    this.starTreeManager.updateProximity(this.playerContainer);

    if (this.cursors.space && Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
      const distToStarTree = Phaser.Math.Distance.Between(
        this.playerContainer.x,
        this.playerContainer.y,
        512,
        260
      );
      if (distToStarTree < 90) {
        this.starTreeManager.waterStarTree(this.playerContainer, this.playerSprite);
      }
    }

    // Network position sync
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

    // Dynamic Depth Sorting
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

  private setupSocketListeners() {
    if (!this.socket) return;

    this.socket.on('player_moved', (data: { id: string; x: number; y: number; anim: string }) => {
      const remote = this.otherPlayers.get(data.id);
      if (remote) {
        remote.setPosition(data.x, data.y);
        const tier = remote.getData('tier') || 'green';
        const sprite = remote.list.find(obj => obj instanceof Phaser.GameObjects.Sprite) as Phaser.GameObjects.Sprite;
        if (sprite) {
          sprite.play(`${data.anim}_${tier}`, true);
        }
      }
    });

    this.socket.on('players_state', (players: PlayerState[]) => {
      const activeIds = new Set<string>();

      players.forEach(p => {
        if (p.id !== this.currentUserId) {
          activeIds.add(p.id);
          if (!this.otherPlayers.has(p.id)) {
            this.playerManager.spawnRemotePlayer(p, this.otherPlayers, this.onSelectPlayerCallback);
          } else {
            const container = this.otherPlayers.get(p.id);
            if (container) {
              container.setPosition(p.x, p.y);
              container.setData('tier', p.visual_tier);
            }
          }
        }
      });

      this.otherPlayers.forEach((container, id) => {
        if (!activeIds.has(id)) {
          container.destroy();
          this.otherPlayers.delete(id);
        }
      });
    });

    this.socket.on('player_joined', (p: PlayerState) => {
      this.playerManager.spawnRemotePlayer(p, this.otherPlayers, this.onSelectPlayerCallback);
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
          this.playerManager.showChatBubble(this.playerContainer, data.text, data.isEmote);
        }
      } else {
        const container = this.otherPlayers.get(data.id);
        if (container) {
          this.playerManager.showChatBubble(container, data.text, data.isEmote);
        } else {
          const npcContainer = this.sleepingNPCs.get(`sleeping_${data.id}`);
          if (npcContainer) {
            this.playerManager.showChatBubble(npcContainer, data.text, data.isEmote);
          }
        }
      }
    });

    this.socket.on('sleeping_npcs_update', (npcs: PlayerState[]) => {
      this.sleepingNPCs.forEach((container, id) => {
        const stillSleeps = npcs.some(n => `sleeping_${n.id}` === id);
        if (!stillSleeps) {
          container.destroy();
          this.sleepingNPCs.delete(id);
        }
      });

      npcs.forEach(npc => {
        this.playerManager.spawnSleepingNPC(npc, this.sleepingNPCs, this.onSelectPlayerCallback);
      });
    });

    this.socket.on('tree_watered', (data: { id: string; score: number; isGolden: boolean }) => {
      this.starTreeManager.updateStarTreeScore(data.score);
      this.starTreeManager.playTreeWaterEffect(data.isGolden);
      
      if (data.id !== this.currentUserId) {
        const other = this.otherPlayers.get(data.id);
        if (other) {
          this.playerManager.showChatBubble(other, "💦 I nurtured the Sprout Tree!", false);
        }
      }
    });
  }
}
