import Phaser from 'phaser';

export class GardenCameraManager {
    constructor(private scene: Phaser.Scene) { }

    public setupCamera(playerContainer: Phaser.GameObjects.Container | null) {
        const mainCamera = this.scene.cameras.main;
        mainCamera.setBounds(0, 0, 1024, 768);

        if (playerContainer) {
            mainCamera.startFollow(playerContainer, true, 0.1, 0.1);
        }

        const updateZoom = (width: number, height: number) => {
            const zoomX = width / 1024;
            const zoomY = height / 768;
            const zoom = Math.max(zoomX, zoomY, 1);
            mainCamera.setZoom(zoom);
        };

        this.scene.scale.on('resize', (gameSize: any) => {
            updateZoom(gameSize.width, gameSize.height);
        });
        updateZoom(this.scene.scale.width, this.scene.scale.height);
    }
}
