import Phaser from 'phaser';

export class PlayerTextures {
    public static create(textures: Phaser.Textures.TextureManager) {
        this.drawCharacterSpritesheet(textures, 'green', '#81c784', '#388e3c', '#5d4037', false); // Sprout (Green overall, Brown hair)
        this.drawCharacterSpritesheet(textures, 'blue', '#2196f3', '#0d47a1', '#212121', false);  // Committer (Blue hoodie, Dark hair)
        this.drawCharacterSpritesheet(textures, 'purple', '#9c27b0', '#4a148c', '#ffffff', false); // Maintainer (Purple robe, White hair)
        this.drawCharacterSpritesheet(textures, 'crimson', '#f44336', '#b71c1c', '#eceff1', false); // Arch Mage (Crimson wizard, Silver hair)
        this.drawCharacterSpritesheet(textures, 'cosmic', '#263238', '#00e5ff', '#ffd700', true);  // Legend (Glowing cosmos, Gold Crown)

        this.drawEmoteIcon(textures, 'wave', '👋');
        this.drawEmoteIcon(textures, 'clap', '👏');
        this.drawEmoteIcon(textures, 'smile', '😊');
        this.drawEmoteIcon(textures, 'love', '❤️');
        this.drawEmoteIcon(textures, 'code', '💻');
        this.drawEmoteIcon(textures, 'mindblown', '🤯');
    }

    public static drawEmoteIcon(textures: Phaser.Textures.TextureManager, key: string, emoji: string) {
        const fullKey = `emote_${key}`;
        if (textures.exists(fullKey)) return;
        const canvas = textures.createCanvas(fullKey, 24, 24);
        if (!canvas) return;
        const ctx = canvas.getContext();

        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(12, 12, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.font = '12px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#000000';
        ctx.fillText(emoji, 12, 12);

        canvas.refresh();
    }

    public static drawCharacterSpritesheet(
        textures: Phaser.Textures.TextureManager,
        tier: string,
        outfitColor: string,
        outfitShadowColor: string,
        hairColor: string,
        isCosmic: boolean
    ) {
        const key = `player_${tier}`;
        if (textures.exists(key)) return;
        const canvas = textures.createCanvas(key, 48, 96);
        if (!canvas) return;
        const ctx = canvas.getContext();

        const cols = [0, 1, 2];
        const rows = [0, 1, 2, 3];

        rows.forEach(row => {
            cols.forEach(col => {
                const fx = col * 16;
                const fy = row * 24;

                ctx.fillStyle = hairColor;
                ctx.fillRect(fx + 4, fy + 2, 8, 7);

                ctx.fillStyle = '#ffdbac';
                ctx.fillRect(fx + 4, fy + 5, 8, 5);

                ctx.fillStyle = hairColor;
                if (row === 0) {
                    ctx.fillRect(fx + 4, fy + 2, 8, 3);
                    ctx.fillRect(fx + 4, fy + 5, 1, 2);
                    ctx.fillRect(fx + 11, fy + 5, 1, 2);
                } else if (row === 1) {
                    ctx.fillRect(fx + 3, fy + 2, 8, 4);
                    ctx.fillRect(fx + 3, fy + 6, 2, 3);
                } else if (row === 2) {
                    ctx.fillRect(fx + 5, fy + 2, 8, 4);
                    ctx.fillRect(fx + 11, fy + 6, 2, 3);
                } else if (row === 3) {
                    ctx.fillRect(fx + 3, fy + 2, 10, 8);
                }

                ctx.fillStyle = '#212121';
                if (row === 0) {
                    ctx.fillRect(fx + 6, fy + 6, 1, 1);
                    ctx.fillRect(fx + 9, fy + 6, 1, 1);
                } else if (row === 1) {
                    ctx.fillRect(fx + 5, fy + 6, 1, 1);
                } else if (row === 2) {
                    ctx.fillRect(fx + 10, fy + 6, 1, 1);
                }

                ctx.fillStyle = outfitColor;
                ctx.fillRect(fx + 3, fy + 10, 10, 8);
                ctx.fillStyle = outfitShadowColor;
                ctx.fillRect(fx + 8, fy + 10, 5, 8);

                if (tier === 'purple' || tier === 'crimson') {
                    ctx.fillStyle = '#fbcb24';
                    ctx.fillRect(fx + 7, fy + 10, 2, 8);
                } else if (isCosmic) {
                    ctx.fillStyle = '#00e5ff';
                    ctx.fillRect(fx + 7, fy + 12, 2, 2);
                } else if (tier === 'blue') {
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(fx + 6, fy + 11, 1, 2);
                    ctx.fillRect(fx + 9, fy + 11, 1, 2);
                }

                ctx.fillStyle = '#ffdbac';
                if (row === 0 || row === 3) {
                    ctx.fillRect(fx + 2, fy + 12, 1, 3);
                    ctx.fillRect(fx + 13, fy + 12, 1, 3);
                } else if (row === 1) {
                    ctx.fillRect(fx + 7, fy + 13, 2, 2);
                } else if (row === 2) {
                    ctx.fillRect(fx + 7, fy + 13, 2, 2);
                }

                ctx.fillStyle = '#374151';

                if (col === 1) {
                    ctx.fillRect(fx + 5, fy + 18, 2, 4);
                    ctx.fillRect(fx + 9, fy + 18, 2, 4);
                    ctx.fillStyle = '#111827';
                    ctx.fillRect(fx + 4, fy + 22, 3, 1);
                    ctx.fillRect(fx + 9, fy + 22, 3, 1);
                } else if (col === 0) {
                    ctx.fillRect(fx + 5, fy + 17, 2, 5);
                    ctx.fillRect(fx + 9, fy + 19, 2, 3);
                    ctx.fillStyle = '#111827';
                    ctx.fillRect(fx + 4, fy + 22, 3, 1);
                    ctx.fillRect(fx + 9, fy + 22, 2, 1);
                } else if (col === 2) {
                    ctx.fillRect(fx + 5, fy + 19, 2, 3);
                    ctx.fillRect(fx + 9, fy + 17, 2, 5);
                    ctx.fillStyle = '#111827';
                    ctx.fillRect(fx + 5, fy + 22, 2, 1);
                    ctx.fillRect(fx + 8, fy + 22, 3, 1);
                }

                if (isCosmic) {
                    ctx.fillStyle = '#fbbf24';
                    ctx.fillRect(fx + 5, fy + 0, 6, 2);
                    ctx.fillRect(fx + 4, fy - 1, 1, 2);
                    ctx.fillRect(fx + 7, fy - 1, 2, 2);
                    ctx.fillRect(fx + 11, fy - 1, 1, 2);
                }
            });
        });

        canvas.refresh();

        let frameIndex = 0;
        
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 3; c++) {
                const fx = c * 16;
                const fy = r * 24;
                canvas.add(frameIndex, 0, fx, fy, 16, 24);
                frameIndex++;
            }
        }
    }
}
