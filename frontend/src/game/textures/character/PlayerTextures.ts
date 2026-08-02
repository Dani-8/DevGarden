import Phaser from 'phaser';

export class PlayerTextures {
    public static create(textures: Phaser.Textures.TextureManager) {
        this.drawEmotes(textures);

        this.drawPlayerTexture(textures, 'player_green', '#22c55e', '#16a34a');
        this.drawPlayerTexture(textures, 'player_blue', '#3b82f6', '#2563eb');
        this.drawPlayerTexture(textures, 'player_purple', '#a855f7', '#9333ea');
        this.drawPlayerTexture(textures, 'player_crimson', '#ef4444', '#dc2626');
        this.drawPlayerTexture(textures, 'player_cosmic', '#ec4899', '#db2777');
    }

    private static drawPlayerTexture(textures: Phaser.Textures.TextureManager, key: string, mainColor: string, darkColor: string) {
        if (textures.exists(key)) return;
        const canvas = textures.createCanvas(key, 128, 128);
        
        if (!canvas) return;
        const ctx = canvas.getContext();

        const directions = ['down', 'left', 'right', 'up'];
        directions.forEach((dir, dirIdx) => {
            for (let frame = 0; frame < 4; frame++) {
                const x = frame * 32;
                const y = dirIdx * 32;

                ctx.fillStyle = 'rgba(0,0,0,0.2)';
                ctx.beginPath();
                ctx.ellipse(x + 16, y + 28, 8, 3, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = darkColor;
                const legOffset = (frame % 2 === 1) ? (dirIdx === 1 || dirIdx === 2 ? 2 : 1) : 0;
                ctx.fillRect(x + 10, y + 20 + legOffset, 4, 8);
                ctx.fillRect(x + 18, y + 20 - legOffset, 4, 8);

                ctx.fillStyle = mainColor;
                ctx.fillRect(x + 8, y + 12, 16, 10);

                ctx.fillStyle = '#fde047';
                ctx.fillRect(x + 10, y + 4, 12, 10);

                ctx.fillStyle = '#000000';
                if (dir === 'down') {
                    ctx.fillRect(x + 12, y + 8, 2, 2);
                    ctx.fillRect(x + 18, y + 8, 2, 2);
                } else if (dir === 'left') {
                    ctx.fillRect(x + 11, y + 8, 2, 2);
                } else if (dir === 'right') {
                    ctx.fillRect(x + 19, y + 8, 2, 2);
                }

                ctx.fillStyle = darkColor;
                ctx.fillRect(x + 8, y + 2, 16, 4);
            }
        });

        canvas.refresh();
    }

    private static drawEmotes(textures: Phaser.Textures.TextureManager) {
        const emoteKeys = ['emote_wave', 'emote_clap', 'emote_heart', 'emote_coffee', 'emote_dance'];
        emoteKeys.forEach(k => {
            if (!textures.exists(k)) {
                const canvas = textures.createCanvas(k, 24, 24)

                if (canvas) {
                    const ctx = canvas.getContext();
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                    ctx.beginPath();
                    ctx.arc(12, 12, 10, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.strokeStyle = '#334155';
                    ctx.lineWidth = 1.5;
                    ctx.stroke();

                    ctx.fillStyle = '#3b82f6';
                    if (k === 'emote_heart') ctx.fillStyle = '#ef4444';
                    if (k === 'emote_coffee') ctx.fillStyle = '#78350f';
                    if (k === 'emote_dance') ctx.fillStyle = '#a855f7';

                    ctx.fillRect(8, 8, 8, 8);
                    canvas.refresh();
                }
            }
        });
    }
}
