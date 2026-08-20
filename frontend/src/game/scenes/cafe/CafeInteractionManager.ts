import Phaser from 'phaser';
import { CafeChair } from '../../cafe/CafePropsManager';
import { PlayerManager } from '../PlayerManager';

export class CafeInteractionManager {
  public promptText!: Phaser.GameObjects.Text;
  public sitPromptText!: Phaser.GameObjects.Text;
  public isSitting: boolean = false;
  public isTransitioning: boolean = false;

  constructor(
    private scene: Phaser.Scene,
    private playerManager: PlayerManager,
    private cafeChairs: CafeChair[],
    private eKey: Phaser.Input.Keyboard.Key,
    private oKey: Phaser.Input.Keyboard.Key,
    private onExitToGarden: () => void
  ) {
    this.createPrompts();
  }

  private createPrompts() {
    this.promptText = this.scene.add.text(0, 0, 'Press [O] to Exit to Dev Garden 🌿', {
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

    this.sitPromptText = this.scene.add.text(0, 0, 'Press [E] to Sit 🧘', {
      fontSize: '10px',
      fontFamily: 'system-ui, sans-serif',
      fontStyle: 'bold',
      color: '#ffffff',
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      padding: { x: 6, y: 3 },
    });
    this.sitPromptText.setOrigin(0.5, 0);
    this.sitPromptText.setDepth(3000);
    this.sitPromptText.setVisible(false);
  }

  public checkChairInteraction(
    playerContainer: Phaser.GameObjects.Container,
    getLastAnim: () => string,
    setLastAnim: (anim: string) => void
  ): CafeChair | null {
    let nearChair: CafeChair | null = null;
    let minDist = 30;

    for (const chair of this.cafeChairs) {
      const dist = Phaser.Math.Distance.Between(playerContainer.x, playerContainer.y, chair.x, chair.y);
      if (dist < minDist) {
        minDist = dist;
        nearChair = chair;
      }
    }

    const body = playerContainer.body as Phaser.Physics.Arcade.Body;

    if (nearChair) {
      this.sitPromptText.setPosition(playerContainer.x, playerContainer.y + 14);
      this.sitPromptText.setText(this.isSitting ? 'Press [E] to Stand Up 🚶' : 'Press [E] to Sit 🧘');
      this.sitPromptText.setVisible(true);

      if (this.eKey && Phaser.Input.Keyboard.JustDown(this.eKey)) {
        if (this.isSitting) {
          this.isSitting = false;
          body.enable = true;

          if (nearChair.dir === 'up') {
            playerContainer.setPosition(nearChair.x, nearChair.y - 18);
          } else if (nearChair.dir === 'down') {
            playerContainer.setPosition(nearChair.x, nearChair.y + 18);
          } else if (nearChair.dir === 'left') {
            playerContainer.setPosition(nearChair.x - 18, nearChair.y + 4);
          } else if (nearChair.dir === 'right') {
            playerContainer.setPosition(nearChair.x + 18, nearChair.y + 4);
          } else if (nearChair.dir === 'sofa' || nearChair.x < 60) {
            playerContainer.setPosition(nearChair.x + 22, nearChair.y);
          } else {
            playerContainer.setPosition(nearChair.x, nearChair.y + 18);
          }

          this.playerManager.showChatBubble(playerContainer, '🚶 Stood up!', false);
        } else {
          this.isSitting = true;
          body.enable = false;
          playerContainer.setPosition(nearChair.x, nearChair.y - 2);
          body.setVelocity(0, 0);

          if (nearChair.dir === 'up') {
            setLastAnim('idle_down');
          } else if (nearChair.dir === 'down') {
            setLastAnim('idle_up');
          } else if (nearChair.dir === 'left') {
            setLastAnim('idle_right');
          } else if (nearChair.dir === 'right') {
            setLastAnim('idle_left');
          } else if (nearChair.x < 60) {
            setLastAnim('idle_right');
          } else {
            setLastAnim('idle_down');
          }

          this.playerManager.showChatBubble(playerContainer, '🧘 Relaxing at Code Cafe...', false);
        }
      }
    } else {
      if (this.sitPromptText) this.sitPromptText.setVisible(false);
      if (this.isSitting) {
        this.isSitting = false;
        body.enable = true;
      }
    }

    return nearChair;
  }

  public checkExitInteraction(playerContainer: Phaser.GameObjects.Container) {
    const distToExit = Phaser.Math.Distance.Between(playerContainer.x, playerContainer.y, 448, 660);
    const isNearExit = distToExit < 60 || (playerContainer.y > 620 && Math.abs(playerContainer.x - 448) < 65);

    if (isNearExit) {
      this.promptText.setPosition(playerContainer.x, playerContainer.y + 14);
      this.promptText.setText('Press [O] to Exit to Dev Garden 🌿');
      this.promptText.setVisible(true);

      if (this.oKey && Phaser.Input.Keyboard.JustDown(this.oKey) && !this.isTransitioning) {
        this.onExitToGarden();
      }
    } else {
      this.promptText.setVisible(false);
    }
  }

  public hidePromptText() {
    if (this.promptText) {
      this.promptText.setVisible(false);
    }
  }
}
