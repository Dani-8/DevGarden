import Phaser from 'phaser';

export class PetTextures {
  public static create(textures: Phaser.Textures.TextureManager) {
    this.drawDuckProp(textures);
  }

  public static drawDuckProp(textures: Phaser.Textures.TextureManager) {
    if (textures.exists('duck_prop')) return;
    const canvas = textures.createCanvas('duck_prop', 16, 16);
    if (!canvas) return;
    const ctx = canvas.getContext();

    ctx.fillStyle = '#fef08a';
    ctx.fillRect(2, 6, 12, 8);
    ctx.fillRect(6, 2, 6, 6);

    ctx.fillStyle = '#f97316';
    ctx.fillRect(12, 4, 4, 2);

    ctx.fillStyle = '#000000';
    ctx.fillRect(9, 3, 2, 2);

    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(0, 12, 16, 2);

    canvas.refresh();
  }
}
