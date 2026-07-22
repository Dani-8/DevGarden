import Phaser from 'phaser';

export function showPlayerBubble(
    scene: Phaser.Scene,
    container: Phaser.GameObjects.Container,
    text: string,
    isEmote: boolean
) {
    // Remove existing bubble if any
    const existingBubble = container.getByName('chat_bubble');
    if (existingBubble) {
        existingBubble.destroy();
    }

    const emoteMap: Record<string, string> = {
        wave: '👋',
        clap: '👏',
        smile: '😊',
        love: '❤️',
        code: '💻',
        mindblown: '🤯',
    };

    const displayText = isEmote ? emoteMap[text] || text : text;

    const bubbleContainer = scene.add.container(0, -55);
    bubbleContainer.setName('chat_bubble');

    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
        fontFamily: isEmote ? 'sans-serif' : 'Arial, sans-serif',
        fontSize: isEmote ? '22px' : '11px',
        color: '#3a2f28',
        wordWrap: { width: 140 },
        align: 'center',
    };

    const bubbleText = scene.add.text(0, 0, displayText, textStyle);
    bubbleText.setOrigin(0.5, 0.5);

    const textBounds = bubbleText.getBounds();
    const paddingX = isEmote ? 12 : 10;
    const paddingY = isEmote ? 8 : 6;
    const bgWidth = Math.max(textBounds.width + paddingX * 2, 32);
    const bgHeight = Math.max(textBounds.height + paddingY * 2, 24);

    const bgGraphics = scene.add.graphics();
    bgGraphics.fillStyle(0xfaf6eb, 0.95);
    bgGraphics.lineStyle(2, 0x3a2f28, 1);
    bgGraphics.fillRoundedRect(-bgWidth / 2, -bgHeight / 2, bgWidth, bgHeight, 8);
    bgGraphics.strokeRoundedRect(-bgWidth / 2, -bgHeight / 2, bgWidth, bgHeight, 8);

    // Little tail pointing down
    bgGraphics.fillStyle(0xfaf6eb, 0.95);
    bgGraphics.fillTriangle(
        -4, bgHeight / 2,
        4, bgHeight / 2,
        0, bgHeight / 2 + 5
    );

    bubbleContainer.add(bgGraphics);
    bubbleContainer.add(bubbleText);
    container.add(bubbleContainer);

    // Animate pop in
    bubbleContainer.setScale(0.2);
    scene.tweens.add({
        targets: bubbleContainer,
        scaleX: 1,
        scaleY: 1,
        duration: 180,
        ease: 'Back.out',
    });

    // Auto destroy after 4 seconds
    scene.time.delayedCall(4000, () => {
        if (bubbleContainer && bubbleContainer.scene) {
            scene.tweens.add({
                targets: bubbleContainer,
                alpha: 0,
                scaleX: 0.5,
                scaleY: 0.5,
                duration: 200,
                onComplete: () => {
                    bubbleContainer.destroy();
                },
            });
        }
    });
}
