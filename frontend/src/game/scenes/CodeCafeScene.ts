import Phaser from 'phaser';
import { PlayerState } from '../../types/index';
import { ProceduralTextures } from '../textures/ProceduralTextures';
import { PlayerManager } from './PlayerManager';
import { CafeTilemap } from '../cafe/CafeTilemap';
import { CafePropsManager, CafeChair } from '../cafe/CafePropsManager';
import { CafeBaristaManager } from '../cafe/CafeBaristaManager';
import { CafeSocketManager } from './cafe/CafeSocketManager';
import { CafeInteractionManager } from './cafe/CafeInteractionManager';
import { CafeMovementManager } from './cafe/CafeMovementManager';

export default class CodeCafeScene extends Phaser.Scene {
  private socket!: any;
  private selfPlayer: PlayerState | null = null;
  private currentUserId: string = '';
  private otherPlayersList: PlayerState[] = [];
  private sleepingNPCsList: PlayerState[] = [];

  // Managers
  private playerManager!: PlayerManager;
  private baristaManager!: CafeBaristaManager;
  private cafeSocketManager!: CafeSocketManager;
  private interactionManager!: CafeInteractionManager;
  private movementManager!: CafeMovementManager;

  // Objects & State
  private playerContainer: Phaser.GameObjects.Container | null = null;
  private playerSprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | null = null;
  private otherPlayers: Map<string, Phaser.GameObjects.Container> = new Map();
  private obstaclesGroup!: Phaser.Physics.Arcade.StaticGroup;

  // Controls
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };
  private oKey!: Phaser.Input.Keyboard.Key;
  private eKey!: Phaser.Input.Keyboard.Key;

  // React callbacks
  private onSelectPlayerCallback?: (player: PlayerState) => void;
  private onNearLeaderboardCallback?: (isNear: boolean) => void;

  private cafeChairs: CafeChair[] = [];
  private baristaBubbleContainer?: Phaser.GameObjects.Container;

  private showBaristaBubble(text: string, x: number, y: number) {
    if (this.baristaBubbleContainer) {
      this.baristaBubbleContainer.destroy();
    }

    const bubbleContainer = this.add.container(x, y);
    bubbleContainer.setDepth(3000);

    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '11px',
      color: '#3a2f28',
      wordWrap: { width: 150 },
      align: 'center',
    };

    const bubbleText = this.add.text(0, 0, text, textStyle);
    bubbleText.setOrigin(0.5, 0.5);

    const textBounds = bubbleText.getBounds();
    const paddingX = 10;
    const paddingY = 6;
    const bgWidth = Math.max(textBounds.width + paddingX * 2, 32);
    const bgHeight = Math.max(textBounds.height + paddingY * 2, 24);

    const bgGraphics = this.add.graphics();
    bgGraphics.fillStyle(0xfaf6eb, 0.95);
    bgGraphics.lineStyle(2, 0x3a2f28, 1);
    bgGraphics.fillRoundedRect(-bgWidth / 2, -bgHeight / 2, bgWidth, bgHeight, 8);
    bgGraphics.strokeRoundedRect(-bgWidth / 2, -bgHeight / 2, bgWidth, bgHeight, 8);

    bgGraphics.fillStyle(0xfaf6eb, 0.95);
    bgGraphics.fillTriangle(
      -4, bgHeight / 2,
      4, bgHeight / 2,
      0, bgHeight / 2 + 5
    );

    bubbleContainer.add(bgGraphics);
    bubbleContainer.add(bubbleText);

    this.baristaBubbleContainer = bubbleContainer;

    this.time.delayedCall(3500, () => {
      if (this.baristaBubbleContainer === bubbleContainer) {
        bubbleContainer.destroy();
      }
    });
  }

  constructor() {
    super({ key: 'CodeCafeScene' });
  }

  init(data: {
    socket: any;
    self: PlayerState;
    spawnPos?: { x: number; y: number };
    players?: PlayerState[];
    sleepingNPCs?: PlayerState[];
    onSelectPlayer?: (p: PlayerState) => void;
    onNearLeaderboard?: (isNear: boolean) => void;
  }) {
    this.socket = data.socket;
    this.selfPlayer = data.self ? { ...data.self } : null as any;
    if (this.selfPlayer && data.spawnPos) {
      this.selfPlayer.x = data.spawnPos.x;
      this.selfPlayer.y = data.spawnPos.y;
    }
    this.currentUserId = data.self?.id || '';
    this.otherPlayersList = data.players || [];
    this.sleepingNPCsList = data.sleepingNPCs || [];
    this.onSelectPlayerCallback = data.onSelectPlayer;
    this.onNearLeaderboardCallback = data.onNearLeaderboard;
    this.otherPlayers.clear();

    this.playerManager = new PlayerManager(this);
  }

  preload() {
    ProceduralTextures.createAll(this);
  }

  create() {
    this.physics.world.setBounds(0, 0, 1152, 600);

    // 1. Draw Interior Tilemap
    CafeTilemap.draw(this);

    // 2. Props & Obstacles
    this.obstaclesGroup = this.physics.add.staticGroup();
    const props = CafePropsManager.createProps(this, this.obstaclesGroup);
    this.cafeChairs = props.chairs;

    // 3. Player animations
    this.playerManager.createAllAnimations();

    // 4. Spawn Self
    if (this.selfPlayer) {
      const selfObj = this.playerManager.spawnSelf(this.selfPlayer, this.onSelectPlayerCallback);
      this.playerContainer = selfObj.container;
      this.playerSprite = selfObj.sprite;
    }

    // 5. Spawn Remote Players inside Cafe
    const allPlayers = this.socket && typeof this.socket.getKnownPlayers === 'function'
      ? Array.from(this.socket.getKnownPlayers().values()) as PlayerState[]
      : this.otherPlayersList;

    if (allPlayers) {
      allPlayers.forEach(p => {
        if (p.id !== this.currentUserId && p.scene === 'CodeCafeScene') {
          if (!this.otherPlayers.has(p.id)) {
            this.playerManager.spawnRemotePlayer(p, this.otherPlayers, this.onSelectPlayerCallback);
          }
        }
      });
    }

    if (this.socket && typeof this.socket.getKnownPlayers === 'function') {
      const knownPlayers = this.socket.getKnownPlayers();
      knownPlayers.forEach((p: PlayerState) => {
        if (p.id !== this.currentUserId && p.scene === 'CodeCafeScene') {
          if (!this.otherPlayers.has(p.id)) {
            this.playerManager.spawnRemotePlayer(p, this.otherPlayers, this.onSelectPlayerCallback);
          }
        }
      });
    }

    // 6. Camera setup
    this.cameras.main.setBounds(0, 0, 1152, 600);
    this.cameras.main.roundPixels = true;
    if (this.playerContainer) {
      this.cameras.main.startFollow(this.playerContainer, true, 0.1, 0.1);
    }

    const updateZoom = (width: number, height: number) => {
      const zoomX = width / 960;
      const zoomY = height / 600;
      const zoom = Math.max(1, Math.min(zoomX, zoomY));
      this.cameras.main.setZoom(zoom);
    };

    this.scale.on('resize', (gameSize: any) => {
      updateZoom(gameSize.width, gameSize.height);
    });
    updateZoom(this.scale.width, this.scale.height);

    // 7. Controls
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.wasd = {
        W: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        A: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        S: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
        D: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      };
      this.oKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
      this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    }

    // 8. Interaction Manager
    this.interactionManager = new CafeInteractionManager(
      this,
      this.playerManager,
      this.cafeChairs,
      this.eKey,
      this.oKey,
      () => this.exitToGarden()
    );

    // 9. Barista Manager
    this.baristaManager = new CafeBaristaManager(
      this,
      props.baristaSprite,
      (text: string, x: number, y: number) => {
        this.showBaristaBubble(text, x, y);
      }
    );

    // 10. Movement Manager
    this.movementManager = new CafeMovementManager(
      this,
      this.socket,
      this.selfPlayer,
      this.interactionManager,
      this.baristaManager,
      this.otherPlayers
    );

    if (this.socket && typeof this.socket.updateScene === 'function' && this.selfPlayer) {
      this.socket.updateScene('CodeCafeScene', this.selfPlayer.x, this.selfPlayer.y);
    }

    // 11. Socket network listeners
    this.cafeSocketManager = new CafeSocketManager(
      this,
      this.socket,
      this.currentUserId,
      this.playerManager,
      this.otherPlayers,
      () => this.playerContainer,
      this.onSelectPlayerCallback
    );
    this.cafeSocketManager.setupSocketListeners();

    if (this.playerContainer) {
      this.physics.add.collider(this.playerContainer, this.obstaclesGroup);
    }

    // Camera fade in from black
    this.cameras.main.fadeIn(400, 0, 0, 0);
  }

  update() {
    this.movementManager.handleUpdate(
      this.playerContainer,
      this.playerSprite,
      this.cursors,
      this.wasd
    );
  }

  private exitToGarden() {
    this.interactionManager.isTransitioning = true;
    this.interactionManager.hidePromptText();

    if (this.playerContainer) {
      this.playerManager.showChatBubble(this.playerContainer, '🚪 Exiting to Dev Garden...', false);
    }

    if (this.socket && typeof this.socket.updateScene === 'function') {
      this.socket.updateScene('GardenScene', 175, 690);
    }

    try {
      localStorage.setItem('devgarden_last_scene', 'GardenScene');
      localStorage.setItem('devgarden_last_x', '175');
      localStorage.setItem('devgarden_last_y', '690');
    } catch { }

    this.cameras.main.fadeOut(300, 0, 0, 0);
    this.time.delayedCall(300, () => {
      this.scene.start('GardenScene', {
        socket: this.socket,
        self: this.selfPlayer,
        players: this.otherPlayersList,
        sleepingNPCs: this.sleepingNPCsList,
        onSelectPlayer: this.onSelectPlayerCallback,
        onNearLeaderboard: this.onNearLeaderboardCallback,
        spawnPos: { x: 175, y: 690 },
      });
    });
  }
}
