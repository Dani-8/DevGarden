import Phaser from 'phaser';

export class AssetLoader {
    static drawCircleTexture(scene: Phaser.Scene, key: string, size: number, colorStr: string, blur: boolean) {
        const canvas = scene.textures.createCanvas(key, size, size);
        if (!canvas) return;
        const ctx = canvas.getContext();

        if (blur) {
            const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
            grad.addColorStop(0, colorStr);
            grad.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = grad;
        } else {
            ctx.fillStyle = colorStr;
        }

        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.fill();
        canvas.refresh();
    }
}
