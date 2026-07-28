import Phaser from 'phaser';
import { PlayerState } from '../../types/index';
import { ProceduralTextures } from '../textures/ProceduralTextures';
import { PlayerManager } from './PlayerManager';
import { CafeTilemap } from '../cafe/CafeTilemap';
import { CafePropsManager, CafeChair } from '../cafe/CafePropsManager';
import { CafeBaristaManager } from '../cafe/CafeBaristaManager';

export default class CodeCafeScene extends Phaser.Scene {
    private socket!: any;
    private selfPlayer: PlayerState | null = null;
    private currentUserId: string = '';
    private otherPlayersList: PlayerState[] = [];
    private sleepingNPCsList: PlayerState[] = [];

    // Managers
    private playerManager!: PlayerManager;
    private baristaManager!: CafeBaristaManager;

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

    // Interaction prompts & Sitting
    private promptText!: Phaser.GameObjects.Text;
    private sitPromptText!: Phaser.GameObjects.Text;
    private cafeChairs: CafeChair[] = [];
    private isSitting: boolean = false;
    private isTransitioning: boolean = false;

    // Network position sync
    private lastMoveSent: number = 0;
    private lastX: number = 0;
    private lastY: number = 0;
    private lastAnim: string = 'idle_down';

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

        // Tail pointing down towards barista head
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
        players?: PlayerState[];
        sleepingNPCs?: PlayerState[];
        onSelectPlayer?: (p: PlayerState) => void;
        onNearLeaderboard?: (isNear: boolean) => void;
    }) {
        this.socket = data.socket;
        this.selfPlayer = data.self;
        this.currentUserId = data.self?.id || '';
        this.otherPlayersList = data.players || [];
        this.sleepingNPCsList = data.sleepingNPCs || [];
        this.onSelectPlayerCallback = data.onSelectPlayer;
        this.onNearLeaderboardCallback = data.onNearLeaderboard;
        this.isTransitioning = false;

        this.playerManager = new PlayerManager(this);
    }

    preload() {
        ProceduralTextures.createAll(this);
    }

    create() {
        this.physics.world.setBounds(0, 0, 960, 600);
        this.cameras.main.setBackgroundColor('#180a03');

        // Solid dark wood backdrop for letterboxing on wide displays
        this.add.rectangle(480, 300, 3000, 3000, 0x180a03).setDepth(-1000);

        // 1. Draw Interior Tilemap
        CafeTilemap.draw(this);

        // 2. Props & Obstacles
        this.obstaclesGroup = this.physics.add.staticGroup();
        const props = CafePropsManager.createProps(this, this.obstaclesGroup);
        this.cafeChairs = props.chairs;

        // 3. Player animations
        this.playerManager.createAllAnimations();

        // 4. Spawn Self (preserve saved position or start near entrance at 352, 520)
        if (this.selfPlayer) {
            const savedX = localStorage.getItem('devgarden_last_x');
            const savedY = localStorage.getItem('devgarden_last_y');
            const startX = savedX ? parseFloat(savedX) : (this.selfPlayer.x || 352);
            const startY = savedY ? parseFloat(savedY) : (this.selfPlayer.y || 520);

            const selfCopy = { ...this.selfPlayer, x: startX, y: startY };
            const selfObj = this.playerManager.spawnSelf(selfCopy, this.onSelectPlayerCallback);
            this.playerContainer = selfObj.container;
            this.playerSprite = selfObj.sprite;
        }

        // 5. Spawn Remote Players inside Cafe
        if (this.otherPlayersList) {
            this.otherPlayersList.forEach(p => {
                if (p.id !== this.currentUserId) {
                    this.playerManager.spawnRemotePlayer(p, this.otherPlayers, this.onSelectPlayerCallback);
                }
            });
        }

        // 6. Camera setup for 960x600 Canvas (30x18.75 32px grid)
        this.cameras.main.setBounds(0, 0, 960, 600);
        this.cameras.main.roundPixels = true;
        if (this.playerContainer) {
            this.cameras.main.startFollow(this.playerContainer, true, 0.1, 0.1);
        }

        const updateZoom = (width: number, height: number) => {
            const zoomX = width / 960;
            const zoomY = height / 600;
            const zoom = Math.min(zoomX, zoomY);
            this.cameras.main.setZoom(Math.max(zoom, 1));
            this.cameras.main.centerOn(480, 300);
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

        // 8. Interaction prompt text
        this.promptText = this.add.text(0, 0, 'Press [O] to Exit to Dev Garden 🌿', {
            fontSize: '11px',
            fontFamily: 'system-ui, sans-serif',
            fontStyle: 'bold',
            color: '#ffffff',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            padding: { x: 8, y: 4 },
        });
        this.promptText.setOrigin(0.5, 0);
        this.promptText.setDepth(3000);
        this.promptText.setVisible(false);

        // Sitting UI prompt - placed below player feet
        this.sitPromptText = this.add.text(0, 0, 'Press [E] to Sit 🧘', {
            fontSize: '10px',
            fontFamily: 'system-ui, sans-serif',
            fontStyle: 'bold',
            color: '#ffffff',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            padding: { x: 6, y: 3 }
        });
        this.sitPromptText.setOrigin(0.5, 0);
        this.sitPromptText.setDepth(3000);
        this.sitPromptText.setVisible(false);

        // 9. Barista Manager
        this.baristaManager = new CafeBaristaManager(
            this,
            props.baristaSprite,
            (text: string, x: number, y: number) => {
                this.showBaristaBubble(text, x, y);
            }
        );

        // Socket network listeners
        this.setupSocketListeners();

        if (this.playerContainer) {
            this.physics.add.collider(this.playerContainer, this.obstaclesGroup);
        }

        // Camera fade in from black
        this.cameras.main.fadeIn(400, 0, 0, 0);
    }

    update() {
        if (this.isTransitioning || !this.playerContainer || !this.playerSprite || !this.cursors || !this.wasd) return;

        const speed = 110;
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

        const body = this.playerContainer.body as Phaser.Physics.Arcade.Body;

        // Check chair sitting proximity
        let nearChair: CafeChair | null = null;
        let minDist = 30;
        for (const chair of this.cafeChairs) {
            const dist = Phaser.Math.Distance.Between(this.playerContainer.x, this.playerContainer.y, chair.x, chair.y);
            if (dist < minDist) {
                minDist = dist;
                nearChair = chair;
            }
        }

        if (nearChair) {
            this.sitPromptText.setPosition(this.playerContainer.x, this.playerContainer.y + 14);
            this.sitPromptText.setText(this.isSitting ? 'Press [E] to Stand Up 🚶' : 'Press [E] to Sit 🧘');
            this.sitPromptText.setVisible(true);

            if (this.eKey && Phaser.Input.Keyboard.JustDown(this.eKey)) {
                if (this.isSitting) {
                    this.isSitting = false;
                    body.enable = true;

                    // Calculate safe standing position outside chair & table colliders
                    if (nearChair.dir === 'up') {
                        this.playerContainer.setPosition(nearChair.x, nearChair.y - 18);
                    } else if (nearChair.dir === 'down') {
                        this.playerContainer.setPosition(nearChair.x, nearChair.y + 18);
                    } else if (nearChair.dir === 'left') {
                        this.playerContainer.setPosition(nearChair.x - 18, nearChair.y + 4);
                    } else if (nearChair.dir === 'right') {
                        this.playerContainer.setPosition(nearChair.x + 18, nearChair.y + 4);
                    } else if (nearChair.dir === 'sofa' || nearChair.x < 60) {
                        this.playerContainer.setPosition(nearChair.x + 22, nearChair.y);
                    } else {
                        this.playerContainer.setPosition(nearChair.x, nearChair.y + 18);
                    }

                    this.playerManager.showChatBubble(this.playerContainer, "🚶 Stood up!", false);
                } else {
                    this.isSitting = true;
                    body.enable = false; // Disable physics body collision while seated
                    this.playerContainer.setPosition(nearChair.x, nearChair.y - 2);
                    body.setVelocity(0, 0);

                    // Face inward towards the table based on chair direction
                    if (nearChair.dir === 'up') {
                        this.lastAnim = 'idle_down'; // Top chair faces down into table
                    } else if (nearChair.dir === 'down') {
                        this.lastAnim = 'idle_up'; // Bottom chair faces up into table
                    } else if (nearChair.dir === 'left') {
                        this.lastAnim = 'idle_right'; // Left chair faces right into table
                    } else if (nearChair.dir === 'right') {
                        this.lastAnim = 'idle_left'; // Right chair faces left into table
                    } else if (nearChair.x < 60) {
                        this.lastAnim = 'idle_right';
                    } else {
                        this.lastAnim = 'idle_down';
                    }

                    this.playerManager.showChatBubble(this.playerContainer, "🧘 Relaxing at Code Cafe...", false);
                }
            }
        } else {
            if (this.sitPromptText) this.sitPromptText.setVisible(false);
            if (this.isSitting) {
                this.isSitting = false;
                body.enable = true;
            }
        }

        if (this.isSitting) {
            body.setVelocity(0, 0);
            vx = 0;
            vy = 0;

            // Allow looking around with arrow keys while seated
            if (this.cursors.left.isDown || this.wasd.A.isDown) this.lastAnim = 'idle_left';
            else if (this.cursors.right.isDown || this.wasd.D.isDown) this.lastAnim = 'idle_right';
            else if (this.cursors.up.isDown || this.wasd.W.isDown) this.lastAnim = 'idle_up';
            else if (this.cursors.down.isDown || this.wasd.S.isDown) this.lastAnim = 'idle_down';
        } else {
            body.setVelocity(vx, vy);
        }

        // Dynamic Depth Sorting
        if (this.isSitting && nearChair) {
            this.playerContainer.setDepth(nearChair.y + 10);
        } else {
            this.playerContainer.setDepth(this.playerContainer.y);
        }
        this.otherPlayers.forEach(container => {
            container.setDepth(container.y);
        });

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

        // Check Barista interaction when walking near counter
        this.baristaManager.checkInteraction(this.playerContainer.x, this.playerContainer.y);

        // Check exit door mat proximity (around x: 352, y: 560..580)
        const distToExit = Phaser.Math.Distance.Between(this.playerContainer.x, this.playerContainer.y, 352, 560);
        if (distToExit < 40) {
            this.promptText.setPosition(this.playerContainer.x, this.playerContainer.y + 14);
            this.promptText.setVisible(true);

            if (this.oKey && Phaser.Input.Keyboard.JustDown(this.oKey)) {
                this.exitToGarden();
            }
        } else {
            this.promptText.setVisible(false);
        }

        // Network position sync
        const now = Date.now();
        const posChanged = Math.abs(this.playerContainer.x - this.lastX) > 1 || Math.abs(this.playerContainer.y - this.lastY) > 1;
        const animChanged = animKey !== this.lastAnim;

        if (now - this.lastMoveSent > 45 && (posChanged || animChanged)) {
            const rx = Math.round(this.playerContainer.x);
            const ry = Math.round(this.playerContainer.y);

            if (this.socket) {
                this.socket.emit('player_move', {
                    x: rx,
                    y: ry,
                    anim: animKey,
                });
            }

            try {
                localStorage.setItem('devgarden_last_x', String(rx));
                localStorage.setItem('devgarden_last_y', String(ry));
                localStorage.setItem('devgarden_last_scene', 'CodeCafeScene');
            } catch {
                // ignore quota errors
            }

            this.lastX = this.playerContainer.x;
            this.lastY = this.playerContainer.y;
            this.lastAnim = animKey;
            this.lastMoveSent = now;
        }
    }

    private exitToGarden() {
        this.isTransitioning = true;
        this.promptText.setVisible(false);
        this.playerManager.showChatBubble(this.playerContainer!, "🚪 Exiting to Dev Garden...", false);

        this.cameras.main.fadeOut(300, 0, 0, 0);
        this.time.delayedCall(300, () => {
            localStorage.setItem('devgarden_last_scene', 'GardenScene');
            localStorage.setItem('devgarden_last_x', '480');
            localStorage.setItem('devgarden_last_y', '700');
            this.scene.start('GardenScene', {
                socket: this.socket,
                self: this.selfPlayer,
                players: this.otherPlayersList,
                sleepingNPCs: this.sleepingNPCsList,
                onSelectPlayer: this.onSelectPlayerCallback,
                onNearLeaderboard: this.onNearLeaderboardCallback,
                spawnPos: { x: 175, y: 690 }, // Spawn right outside Code Cafe entrance
            });
        });
    }

    private setupSocketListeners() {
        if (!this.socket) return;

        this.socket.off('player_moved_sync');
        this.socket.on('player_moved_sync', (data: { id: string; x: number; y: number; anim: string }) => {
            if (data.id === this.currentUserId) return;
            this.playerManager.handleRemotePlayerMove(data, this.otherPlayers);
        });

        this.socket.off('chat_message_sync');
        this.socket.on('chat_message_sync', (data: { sender_id: string; sender_name: string; message: string; is_ai?: boolean }) => {
            this.playerManager.handleChatMessageSync(data, this.currentUserId, this.playerContainer, this.otherPlayers);
        });

        this.socket.off('player_chatted');
        this.socket.on('player_chatted', (data: { id: string; text: string; isEmote: boolean }) => {
            if (data.id === this.currentUserId) {
                if (this.playerContainer) {
                    this.playerManager.showChatBubble(this.playerContainer, data.text, data.isEmote);
                }
            } else {
                const container = this.otherPlayers.get(data.id);
                if (container) {
                    this.playerManager.showChatBubble(container, data.text, data.isEmote);
                }
            }
        });
    }
}
