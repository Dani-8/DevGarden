import Phaser from 'phaser';
import { PlayerState } from '../../types/index';
import { ProceduralTextures } from '../textures/ProceduralTextures';
import { TilemapBuilder } from '../map/TilemapBuilder';
import { WorldPropsManager, BenchInfo } from '../props/WorldPropsManager';
import { PlayerManager } from './PlayerManager';
import { StarTreeManager } from '../managers/StarTreeManager';
import { DecorationsManager } from '../managers/DecorationsManager';
import { AtmosphereManager } from '../managers/AtmosphereManager';
import { GardenSocketManager } from './garden/GardenSocketManager';
import { GardenInteractionManager } from './garden/GardenInteractionManager';
import { GardenMovementManager } from './garden/GardenMovementManager';
import { GardenCameraManager } from './garden/GardenCameraManager';

export default class GardenScene extends Phaser.Scene {
  private socket!: any;
  private selfPlayer: PlayerState | null = null;
  private currentUserId: string = '';

  // Managers
  private playerManager!: PlayerManager;
  private starTreeManager!: StarTreeManager;
  private decorationsManager!: DecorationsManager;
  private atmosphereManager!: AtmosphereManager;
  private gardenSocketManager!: GardenSocketManager;
  private interactionManager!: GardenInteractionManager;
  private movementManager!: GardenMovementManager;

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

  // React UI Callbacks
  private onSelectPlayerCallback?: (player: PlayerState) => void;
  private onNearLeaderboardCallback?: (isNear: boolean) => void;

  // Obstacles & World Props
  private obstaclesGroup!: Phaser.Physics.Arcade.StaticGroup;
  private leaderboardTreeObj!: Phaser.GameObjects.Image;

  // Benches & Keys
  private benchesList: BenchInfo[] = [];
  private eKey!: Phaser.Input.Keyboard.Key;
  private oKey!: Phaser.Input.Keyboard.Key;

  constructor() {
    super({ key: 'GardenScene' });
  }

  init(data: {
    socket: any;
    self: PlayerState;
    spawnPos?: { x: number; y: number };
    onSelectPlayer: (p: PlayerState) => void;
    onNearLeaderboard: (isNear: boolean) => void;
  }) {
    this.socket = data.socket;
    this.selfPlayer = data.self ? { ...data.self } : null;
    if (this.selfPlayer && data.spawnPos) {
      this.selfPlayer.x = data.spawnPos.x;
      this.selfPlayer.y = data.spawnPos.y;
    }
    this.currentUserId = data.self?.id || '';
    this.onSelectPlayerCallback = data.onSelectPlayer;
    this.onNearLeaderboardCallback = data.onNearLeaderboard;
    this.otherPlayers.clear();
    this.sleepingNPCs.clear();

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

    if (data && data.players) {
      data.players.forEach((p) => {
        if (p.id !== this.currentUserId && (!p.scene || p.scene === 'GardenScene')) {
          if (!this.otherPlayers.has(p.id)) {
            this.playerManager.spawnRemotePlayer(p, this.otherPlayers, this.onSelectPlayerCallback);
          }
        }
      });
    }

    if (this.socket && typeof this.socket.getKnownPlayers === 'function') {
      const knownPlayers = this.socket.getKnownPlayers();
      knownPlayers.forEach((p: PlayerState) => {
        if (p.id !== this.currentUserId && (!p.scene || p.scene === 'GardenScene')) {
          if (!this.otherPlayers.has(p.id)) {
            this.playerManager.spawnRemotePlayer(p, this.otherPlayers, this.onSelectPlayerCallback);
          }
        }
      });
    }

    if (this.socket && typeof this.socket.updateScene === 'function' && this.selfPlayer) {
      this.socket.updateScene('GardenScene', this.selfPlayer.x, this.selfPlayer.y);
    }

    if (data.sleepingNPCs) {
      data.sleepingNPCs.forEach((npc) => {
        this.playerManager.spawnSleepingNPC(npc, this.sleepingNPCs, this.onSelectPlayerCallback);
      });
    }

    // 5. Camera follow & dynamic zoom
    const cameraManager = new GardenCameraManager(this);
    cameraManager.setupCamera(this.playerContainer);

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
      this.oKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
    }

    // Interactions
    this.interactionManager = new GardenInteractionManager(
      this,
      this.playerManager,
      this.benchesList,
      this.eKey,
      this.oKey,
      () => this.enterCodeCafe()
    );

    // Movement Manager
    this.movementManager = new GardenMovementManager(
      this,
      this.socket,
      this.selfPlayer,
      this.interactionManager,
      this.starTreeManager,
      this.leaderboardTreeObj,
      this.otherPlayers,
      this.sleepingNPCs,
      this.onNearLeaderboardCallback
    );

    // 7. Sub-Managers
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
    this.gardenSocketManager = new GardenSocketManager(
      this,
      this.socket,
      this.currentUserId,
      this.playerManager,
      this.starTreeManager,
      this.otherPlayers,
      this.sleepingNPCs,
      () => this.playerContainer,
      this.onSelectPlayerCallback
    );
    this.gardenSocketManager.setupSocketListeners();

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
    this.movementManager.handleUpdate(
      this.playerContainer,
      this.playerSprite,
      this.cursors,
      this.wasd
    );
  }

  private enterCodeCafe() {
    if (this.interactionManager.isTransitioning) return;
    this.interactionManager.isTransitioning = true;
    this.interactionManager.hideCafeDoorPrompt();

    if (this.playerContainer) {
      this.playerManager.showChatBubble(this.playerContainer, '🚪 Entering Code Cafe...', false);
    }

    if (this.socket && typeof this.socket.updateScene === 'function') {
      this.socket.updateScene('CodeCafeScene', 448, 620);
    }

    try {
      localStorage.setItem('devgarden_last_scene', 'CodeCafeScene');
      localStorage.setItem('devgarden_last_x', '448');
      localStorage.setItem('devgarden_last_y', '620');
    } catch { }

    this.cameras.main.fadeOut(300, 0, 0, 0);
    this.time.delayedCall(300, () => {
      this.scene.start('CodeCafeScene', {
        socket: this.socket,
        self: this.selfPlayer,
        onSelectPlayer: this.onSelectPlayerCallback,
        onNearLeaderboard: this.onNearLeaderboardCallback,
        spawnPos: { x: 448, y: 620 },
      });
    });
  }
}
