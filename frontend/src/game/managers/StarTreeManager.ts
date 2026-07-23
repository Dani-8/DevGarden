import Phaser from 'phaser';

export class StarTreeManager {
  private scene: Phaser.Scene;
  private socket: any;
  private currentUserId: string;
  
  public communityWaterScore: number = 240;
  public goldenWaterActive: boolean = false;
  
  public starTreeSprite: Phaser.GameObjects.Image | null = null;
  public starTreePromptText: Phaser.GameObjects.Text | null = null;
  public starTreeWaterParticles: Phaser.GameObjects.Particles.ParticleEmitter | null = null;
  public goldTrailEmitter: Phaser.GameObjects.Particles.ParticleEmitter | null = null;
  
  private lastWateredTime: number = 0;
  private showChatBubbleCb?: (text: string) => void;

  constructor(scene: Phaser.Scene, socket: any, currentUserId: string, showChatBubbleCb?: (text: string) => void) {
    this.scene = scene;
    this.socket = socket;
    this.currentUserId = currentUserId;
    this.showChatBubbleCb = showChatBubbleCb;
  }

  public init(obstaclesGroup: Phaser.Physics.Arcade.StaticGroup) {
    this.goldenWaterActive = localStorage.getItem('devgarden_golden_water') === 'unlocked';

    window.addEventListener('golden_water_unlocked', () => {
      this.goldenWaterActive = true;
      if (this.showChatBubbleCb) {
        this.showChatBubbleCb("✨ Unlocked Golden Water! 💦");
      }
    });

    window.addEventListener('golden_water_locked', () => {
      this.goldenWaterActive = false;
      if (this.showChatBubbleCb) {
        this.showChatBubbleCb("🔒 Golden Water Locked!");
      }
      this.deactivateGoldTrail();
    });

    this.createStarTree(obstaclesGroup);

    fetch((import.meta.env.VITE_API_URL || '') + '/api/star-tree')
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.waterScore === 'number') {
          this.updateStarTreeScore(data.waterScore);
        }
      })
      .catch(err => console.error('Error fetching star-tree:', err));
  }

  private createStarTree(obstaclesGroup: Phaser.Physics.Arcade.StaticGroup) {
    const treeX = 526;
    const treeY = 260;

    const initialStageKey = this.getStarTreeStageKey(this.communityWaterScore);
    this.starTreeSprite = this.scene.add.image(treeX, treeY, initialStageKey);
    this.starTreeSprite.setOrigin(0.5, 0.85);
    this.starTreeSprite.setDepth(treeY);
    this.scene.physics.add.existing(this.starTreeSprite, true);

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
    obstaclesGroup.add(this.starTreeSprite);

    this.starTreeSprite.setInteractive({ useHandCursor: true });
    this.starTreeSprite.on('pointerdown', () => {
      this.waterStarTree();
    });

    this.starTreePromptText = this.scene.add.text(treeX, treeY - 60, '', {
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

    this.starTreeWaterParticles = this.scene.add.particles(treeX, treeY - 15, 'water_particle', {
      scale: { start: 1, end: 0 },
      alpha: { start: 0.8, end: 0.1 },
      speed: { min: 40, max: 100 },
      angle: { min: -180, max: 0 },
      gravityY: 150,
      lifespan: 500,
      frequency: -1,
    });
    this.starTreeWaterParticles.setDepth(treeY + 2);
  }

  public updateProximity(playerContainer: Phaser.GameObjects.Container) {
    if (!this.starTreeSprite || !this.starTreePromptText) return;

    const distToStarTree = Phaser.Math.Distance.Between(
      playerContainer.x,
      playerContainer.y,
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

  public waterStarTree(playerContainer?: Phaser.GameObjects.Container, playerSprite?: Phaser.GameObjects.Sprite) {
    if (playerContainer) {
      const dist = Phaser.Math.Distance.Between(
        playerContainer.x,
        playerContainer.y,
        512,
        260
      );

      if (dist > 90) {
        if (this.showChatBubbleCb) {
          this.showChatBubbleCb("I need to walk closer to water the Sprout Tree! 🚶‍♂️");
        }
        return;
      }
    }

    const now = Date.now();
    if (now - this.lastWateredTime < 800) return;
    this.lastWateredTime = now;

    const isGolden = this.goldenWaterActive;
    const increment = isGolden ? 10 : 1;

    if (playerSprite) {
      this.scene.tweens.add({
        targets: playerSprite,
        angle: -15,
        yoyo: true,
        duration: 150,
        repeat: 1,
        ease: 'Quad.easeInOut',
        onComplete: () => {
          playerSprite.setAngle(0);
        }
      });
    }

    const newScore = this.communityWaterScore + increment;
    this.updateStarTreeScore(newScore);
    this.playTreeWaterEffect(isGolden);

    fetch((import.meta.env.VITE_API_URL || '') + '/api/star-tree/water', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ increment })
    })
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.waterScore === 'number') {
          this.updateStarTreeScore(data.waterScore);
          
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

    const popText = this.scene.add.text(512, 190, isGolden ? '⭐ +10 Growth!' : '💦 +1 Growth!', {
      fontSize: '11px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontStyle: 'bold',
      color: isGolden ? '#f59e0b' : '#38bdf8'
    });
    popText.setOrigin(0.5);
    popText.setDepth(3000);
    this.scene.tweens.add({
      targets: popText,
      y: 130,
      alpha: 0,
      duration: 1200,
      ease: 'Cubic.easeOut',
      onComplete: () => popText.destroy()
    });
  }

  public updateStarTreeScore(score: number) {
    this.communityWaterScore = score;
    
    const currentKey = this.starTreeSprite?.texture.key;
    const nextKey = this.getStarTreeStageKey(score);
    if (this.starTreeSprite && currentKey !== nextKey) {
      this.starTreeSprite.setTexture(nextKey);
      
      if (nextKey === 'star_tree_stage_4') {
        this.starTreeSprite.setOrigin(0.5, 0.85);
      }
      
      this.scene.tweens.add({
        targets: this.starTreeSprite,
        scaleY: 1.2,
        scaleX: 1.2,
        duration: 250,
        yoyo: true,
        ease: 'Quad.easeOut'
      });
    }
  }

  public playTreeWaterEffect(isGolden: boolean) {
    if (!this.starTreeWaterParticles) return;
    this.starTreeWaterParticles.explode(20);
    
    if (this.starTreeSprite) {
      this.starTreeSprite.setTint(isGolden ? 0xfef08a : 0xbfdbfe);
      this.scene.time.delayedCall(150, () => {
        if (this.starTreeSprite) this.starTreeSprite.clearTint();
      });
    }
  }

  public initGoldTrail(playerContainer: Phaser.GameObjects.Container) {
    if (this.goldTrailEmitter) return;
    
    this.goldTrailEmitter = this.scene.add.particles(0, 0, 'glow_particle', {
      scale: { start: 0.6, end: 0 },
      alpha: { start: 0.6, end: 0 },
      tint: 0xf59e0b,
      speed: 10,
      lifespan: 400,
      frequency: 50,
      blendMode: 'ADD',
      follow: playerContainer
    });
    this.goldTrailEmitter.setDepth(playerContainer.depth - 1);
  }

  public deactivateGoldTrail() {
    if (this.goldTrailEmitter) {
      this.goldTrailEmitter.destroy();
      this.goldTrailEmitter = null;
    }
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
}
