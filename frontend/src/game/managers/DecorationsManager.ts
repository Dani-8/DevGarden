import Phaser from 'phaser';
import { PlayerState, DecorationRow } from '../../types/index';

export class DecorationsManager {
  private scene: Phaser.Scene;
  private socket: any;
  private selfPlayer: PlayerState | null;

  public activeDecorTool: string | null = null;
  public decorGhostPreview: Phaser.GameObjects.Container | null = null;
  public decorationsMap: Map<string, Phaser.GameObjects.Container> = new Map();

  private leaderboardTreeObj: Phaser.GameObjects.Image;
  private starTreeSprite: Phaser.GameObjects.Image | null;
  private showChatBubbleCb?: (text: string) => void;

  constructor(
    scene: Phaser.Scene,
    socket: any,
    selfPlayer: PlayerState | null,
    leaderboardTreeObj: Phaser.GameObjects.Image,
    starTreeSprite: Phaser.GameObjects.Image | null,
    showChatBubbleCb?: (text: string) => void
  ) {
    this.scene = scene;
    this.socket = socket;
    this.selfPlayer = selfPlayer;
    this.leaderboardTreeObj = leaderboardTreeObj;
    this.starTreeSprite = starTreeSprite;
    this.showChatBubbleCb = showChatBubbleCb;
  }

  public setStarTreeSprite(sprite: Phaser.GameObjects.Image | null) {
    this.starTreeSprite = sprite;
  }

  public init() {
    window.addEventListener('select-decor-tool', (e: any) => {
      const toolId = e.detail?.toolId || null;
      this.activeDecorTool = toolId;
      this.updateGhostPreview();
    });

    this.scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (this.decorGhostPreview) {
        const snapX = Math.round(pointer.worldX / 16) * 16;
        const snapY = Math.round(pointer.worldY / 16) * 16;
        this.decorGhostPreview.setPosition(snapX, snapY);
        this.decorGhostPreview.setDepth(snapY + 20);
      }
    });

    this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer, currentlyOver: any[]) => {
      if (!this.activeDecorTool) return;

      if (currentlyOver.length > 0 && this.activeDecorTool !== 'hammer') {
        const hasInteractiveOverlap = currentlyOver.some(obj => {
          return obj.texture && (obj.texture.key.startsWith('player_') || obj.texture.key === 'star_tree_sprout');
        });
        if (hasInteractiveOverlap) return;
      }

      const snapX = Math.round(pointer.worldX / 16) * 16;
      const snapY = Math.round(pointer.worldY / 16) * 16;

      if (this.activeDecorTool === 'hammer') {
        let clickedDecorId: string | null = null;
        for (const [id, container] of this.decorationsMap.entries()) {
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

          if (placedBy === this.selfPlayer?.id || clickedDecorId.startsWith('default_')) {
            this.removeDecorItem(clickedDecorId);
          } else {
            if (this.showChatBubbleCb) {
              this.showChatBubbleCb(`🔒 This cozy item belongs to @${username}!`);
            }
          }
        }
      } else {
        if (snapX < 32 || snapX > 992 || snapY < 32 || snapY > 736) return;

        const distToLeaderboard = Phaser.Math.Distance.Between(snapX, snapY, this.leaderboardTreeObj.x, this.leaderboardTreeObj.y);
        if (distToLeaderboard < 50) {
          if (this.showChatBubbleCb) {
            this.showChatBubbleCb("❌ Too close to the Leaderboard Tree!");
          }
          return;
        }

        if (this.starTreeSprite) {
          const distToStarTree = Phaser.Math.Distance.Between(snapX, snapY, this.starTreeSprite.x, this.starTreeSprite.y);
          if (distToStarTree < 50) {
            if (this.showChatBubbleCb) {
              this.showChatBubbleCb("❌ Too close to the Co-op Sprout Tree!");
            }
            return;
          }
        }

        this.placeDecorItem(this.activeDecorTool, snapX, snapY);
      }
    });

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

    if (this.socket) {
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
  }

  private updateGhostPreview() {
    if (this.decorGhostPreview) {
      this.decorGhostPreview.destroy();
      this.decorGhostPreview = null;
    }

    if (!this.activeDecorTool || this.activeDecorTool === 'hammer') {
      return;
    }

    if (!this.scene.input || !this.scene.input.activePointer) {
      return;
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

    const emoji = emojiMap[this.activeDecorTool] || '❓';
    
    const x = this.scene.input.activePointer.worldX;
    const y = this.scene.input.activePointer.worldY;
    this.decorGhostPreview = this.scene.add.container(x, y);

    const shadow = this.scene.add.ellipse(0, 4, 16, 6, 0x000000, 0.15);
    this.decorGhostPreview.add(shadow);

    const text = this.scene.add.text(0, -8, emoji, {
      fontSize: '24px'
    }).setOrigin(0.5).setAlpha(0.5);
    this.decorGhostPreview.add(text);

    const ring = this.scene.add.circle(0, 0, 18, 0x00e5ff, 0.1);
    const stroke = this.scene.add.circle(0, 0, 18);
    stroke.setStrokeStyle(1, 0x00e5ff, 0.4);
    this.decorGhostPreview.add(ring);
    this.decorGhostPreview.add(stroke);
  }

  public drawDecoration(decor: DecorationRow) {
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

    const container = this.scene.add.container(decor.x, decor.y);
    container.setData('id', decor.id);
    container.setData('placed_by', decor.placed_by);
    container.setData('placed_by_username', decor.placed_by_username);
    container.setDepth(decor.y);

    const shadow = this.scene.add.ellipse(0, 5, 20, 8, 0x000000, 0.25);
    container.add(shadow);

    if (decor.item_type === 'campfire') {
      const glow = this.scene.add.circle(0, 4, 18, 0xff5722, 0.15);
      container.add(glow);
      this.scene.tweens.add({
        targets: glow,
        scale: 1.3,
        alpha: 0.04,
        duration: 900 + Math.random() * 300,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    } else if (decor.item_type === 'lantern') {
      const glow = this.scene.add.circle(0, -6, 12, 0xffeb3b, 0.15);
      container.add(glow);
      this.scene.tweens.add({
        targets: glow,
        scale: 1.25,
        alpha: 0.05,
        duration: 1200 + Math.random() * 400,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    } else if (decor.item_type === 'mushroom') {
      const glow = this.scene.add.circle(0, -2, 14, 0xe040fb, 0.15);
      container.add(glow);
      this.scene.tweens.add({
        targets: glow,
        scale: 1.2,
        alpha: 0.03,
        duration: 1500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }

    const emojiText = this.scene.add.text(0, -10, emoji, {
      fontSize: '26px'
    }).setOrigin(0.5);
    emojiText.setResolution(2);
    container.add(emojiText);

    const isSelf = decor.placed_by === this.selfPlayer?.id;
    const authorText = isSelf ? 'You' : `@${decor.placed_by_username}`;
    const tooltip = this.scene.add.text(0, -28, `Placed by ${authorText}`, {
      fontFamily: 'monospace',
      fontSize: '8px',
      color: '#ffeb3b',
      backgroundColor: '#0f172acc',
      padding: { x: 5, y: 2.5 },
      stroke: '#000000',
      strokeThickness: 1.5,
    }).setOrigin(0.5).setResolution(2).setVisible(false).setDepth(2000);
    container.add(tooltip);

    emojiText.setInteractive({ useHandCursor: true });
    
    emojiText.on('pointerover', () => {
      tooltip.setVisible(true);
      if (this.activeDecorTool === 'hammer' && (isSelf || decor.id.startsWith('default_'))) {
        emojiText.setTint(0xff7b72);
      }
    });

    emojiText.on('pointerout', () => {
      tooltip.setVisible(false);
      emojiText.clearTint();
    });

    emojiText.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      pointer.event.stopPropagation();
      
      if (this.activeDecorTool === 'hammer') {
        if (isSelf || decor.id.startsWith('default_')) {
          this.removeDecorItem(decor.id);
        } else {
          if (this.showChatBubbleCb) {
            this.showChatBubbleCb(`🔒 This cozy item belongs to @${decor.placed_by_username}!`);
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

    const decorRow: DecorationRow = {
      ...payload,
      created_at: Date.now()
    };
    this.drawDecoration(decorRow);
    this.playDecorPlaceEffect(x, y);

    if (this.socket) {
      this.socket.emit('decor_place', decorRow);
    }

    window.dispatchEvent(new CustomEvent('cancel-decor-tool'));

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
    const container = this.decorationsMap.get(id);
    if (container) {
      this.playDecorBreakEffect(container.x, container.y);
      container.destroy();
      this.decorationsMap.delete(id);
    }

    if (this.socket) {
      this.socket.emit('decor_remove', { id });
    }

    window.dispatchEvent(new CustomEvent('cancel-decor-tool'));

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
    const spark = this.scene.add.particles(x, y, 'glow_particle', {
      scale: { start: 0.25, end: 0 },
      alpha: { start: 0.8, end: 0 },
      tint: 0x4caf50,
      speed: { min: 20, max: 50 },
      lifespan: 500,
      maxParticles: 8,
    });
    this.scene.time.delayedCall(600, () => spark.destroy());
  }

  private playDecorBreakEffect(x: number, y: number) {
    const chips = this.scene.add.particles(x, y, 'glow_particle', {
      scale: { start: 0.2, end: 0 },
      alpha: { start: 0.7, end: 0 },
      tint: 0x8d6e63,
      speed: { min: 30, max: 80 },
      lifespan: 400,
      maxParticles: 10,
    });
    this.scene.time.delayedCall(500, () => chips.destroy());
  }
}
