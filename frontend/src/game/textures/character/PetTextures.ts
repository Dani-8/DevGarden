import Phaser from 'phaser';

export class PetTextures {
  public static create(textures: Phaser.Textures.TextureManager) {
    this.drawDuckProp(textures);
  }

  private static drawDuckProp(textures: Phaser.Textures.TextureManager) {
    if (textures.exists('duck_prop')) return;
    const canvas = textures.createCanvas('duck_prop', 24, 24);
    if (!canvas) return;
    const ctx = canvas.getContext();

    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    ctx.ellipse(12, 20, 8, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.ellipse(11, 14, 8, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(14, 8, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.moveTo(17, 8);
    ctx.lineTo(22, 9);
    ctx.lineTo(17, 11);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#000000';
    ctx.fillRect(15, 6, 2, 2);

    canvas.refresh();
  }
}
