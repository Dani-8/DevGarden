import Phaser from 'phaser';
import { PlayerState } from '../../../types/index';
import { PlayerManager } from '../PlayerManager';
import { StarTreeManager } from '../../managers/StarTreeManager';

export class GardenSocketManager {
    private boundSocketListeners: { event: string; fn: Function }[] = [];

    constructor(
        private scene: Phaser.Scene,
        private socket: any,
        private currentUserId: string,
        private playerManager: PlayerManager,
        private starTreeManager: StarTreeManager,
        private otherPlayers: Map<string, Phaser.GameObjects.Container>,
        private sleepingNPCs: Map<string, Phaser.GameObjects.Container>,
        private getPlayerContainer: () => Phaser.GameObjects.Container | null,
        private onSelectPlayerCallback?: (player: PlayerState) => void
    ) { }

    public cleanupSocketListeners() {
        if (this.socket && this.boundSocketListeners.length > 0) {
            this.boundSocketListeners.forEach(({ event, fn }) => {
                this.socket.off(event, fn);
            });
            this.boundSocketListeners = [];
        }
    }

    public setupSocketListeners() {
        if (!this.socket) return;
        
        this.cleanupSocketListeners();

        this.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.cleanupSocketListeners();
        });

        const addListener = (event: string, fn: Function) => {
            this.socket.on(event, fn);
            this.boundSocketListeners.push({ event, fn });
        };

        addListener('player_moved', (data: { id: string; x: number; y: number; anim: string; scene?: string }) => {
            if (data.id === this.currentUserId) return;
            const playerScene = data.scene || 'GardenScene';

            if (playerScene !== 'GardenScene') {
                if (this.otherPlayers.has(data.id)) {
                    this.otherPlayers.get(data.id)?.destroy();
                    this.otherPlayers.delete(data.id);
                }
                return;
            }

            let remote = this.otherPlayers.get(data.id);
            if (!remote) {
                const known = this.socket.getKnownPlayer ? this.socket.getKnownPlayer(data.id) : null;

                const pState: PlayerState = known ? { ...known, x: data.x, y: data.y, scene: 'GardenScene' } : {
                    id: data.id,
                    username: 'Dev',
                    avatar_url: '',
                    level: 1,
                    score: 0,
                    title: 'Sprout',
                    visual_tier: 'green',
                    x: data.x,
                    y: data.y,
                    scene: 'GardenScene',
                    commits: 0,
                    stars: 0,
                    followers: 0,
                    repos: 0,
                    cosmetics: [],
                };
                this.playerManager.spawnRemotePlayer(pState, this.otherPlayers, this.onSelectPlayerCallback);
                remote = this.otherPlayers.get(data.id);
            }

            if (remote) {
                remote.setData('targetX', data.x);
                remote.setData('targetY', data.y);
                const tier = remote.getData('tier') || 'green';
                const sprite = remote.list.find(obj => obj instanceof Phaser.GameObjects.Sprite) as Phaser.GameObjects.Sprite;
                if (sprite && data.anim) {
                    sprite.play(`${data.anim}_${tier}`, true);
                }
            }
        });

        const syncPlayers = (players: PlayerState[]) => {
            const activeIds = new Set<string>();

            players.forEach(p => {
                if (p.id !== this.currentUserId) {
                    const pScene = p.scene || 'GardenScene';
                    if (pScene === 'GardenScene') {
                        activeIds.add(p.id);
                        let container = this.otherPlayers.get(p.id);
                        if (!container) {
                            this.playerManager.spawnRemotePlayer(p, this.otherPlayers, this.onSelectPlayerCallback);
                            container = this.otherPlayers.get(p.id);
                        }
                        if (container) {
                            container.setData('targetX', p.x);
                            container.setData('targetY', p.y);
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
        };

        addListener('players_state', syncPlayers);
        addListener('players_sync', syncPlayers);

        addListener('player_joined', (p: PlayerState) => {
            if (p.id !== this.currentUserId && (!p.scene || p.scene === 'GardenScene')) {
                if (!this.otherPlayers.has(p.id)) {
                    this.playerManager.spawnRemotePlayer(p, this.otherPlayers, this.onSelectPlayerCallback);
                }
            }
        });

        addListener('player_left', (data: { id: string }) => {
            if (this.otherPlayers.has(data.id)) {
                this.otherPlayers.get(data.id)?.destroy();
                this.otherPlayers.delete(data.id);
            }
        });

        addListener('player_chatted', (data: { id: string; text: string; isEmote: boolean }) => {
            const playerContainer = this.getPlayerContainer();
            if (data.id === this.currentUserId) {
                if (playerContainer) {
                    this.playerManager.showChatBubble(playerContainer, data.text, data.isEmote);
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

        addListener('sleeping_npcs_update', (npcs: PlayerState[]) => {
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

        addListener('tree_watered', (data: { id: string; score: number; isGolden: boolean }) => {
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
