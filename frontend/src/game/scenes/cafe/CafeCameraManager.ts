import Phaser from 'phaser';

export class CafeCameraManager {
  constructor(private scene: Phaser.Scene) {}

  public setupCamera(playerContainer: Phaser.GameObjects.Container | null) {
    const mainCamera = this.scene.cameras.main;
    mainCamera.setBounds(0, 0, 1152, 600);
    mainCamera.roundPixels = true;

    const hasSeenIntro = localStorage.getItem('devgarden_seen_cafe_intro') === 'true';

    const getTargetZoom = (width: number, height: number) => {
      const zoomX = width / 960;
      const zoomY = height / 600;
      return Math.max(1, Math.min(zoomX, zoomY));
    };

    if (!hasSeenIntro && playerContainer) {
      localStorage.setItem('devgarden_seen_cafe_intro', 'true');

      // Start zoomed out showing full cafe view
      const fullViewZoom = Math.min(this.scene.scale.width / 1152, this.scene.scale.height / 600);
      mainCamera.setZoom(fullViewZoom);
      mainCamera.centerOn(576, 300);

      // Pan & Zoom in to player after short delay
      this.scene.time.delayedCall(800, () => {
        if (!playerContainer) return;
        const targetZoom = getTargetZoom(this.scene.scale.width, this.scene.scale.height);
        mainCamera.pan(
          playerContainer.x,
          playerContainer.y,
          1500,
          'Power2',
          false,
          (_cam, progress) => {
            if (progress === 1 && playerContainer) {
              mainCamera.startFollow(playerContainer, true, 0.1, 0.1);
            }
          }
        );
        mainCamera.zoomTo(targetZoom, 1500, 'Power2');
      });
    } else {
      if (playerContainer) {
        mainCamera.startFollow(playerContainer, true, 0.1, 0.1);
      }
      mainCamera.setZoom(getTargetZoom(this.scene.scale.width, this.scene.scale.height));
    }

    this.scene.scale.on('resize', (gameSize: any) => {
      const zoom = getTargetZoom(gameSize.width, gameSize.height);
      mainCamera.setZoom(zoom);
    });
  }
}
