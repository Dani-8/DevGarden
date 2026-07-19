import Phaser from 'phaser';

const EMOTE_MAP: Record<string, string> = {
  wave: '👋',
  clap: '👏',
  smile: '😊',
  love: '❤️',
  code: '💻',
  mindblown: '🤯',
};

/**
 * Creates and displays a gorgeous, floating speech bubble or emote above a player container.
 */
export function showPlayerBubble(
  scene: Phaser.Scene,
  container: Phaser.GameObjects.Container,
  text: string,
  isEmote: boolean
) {
  // 1. Clean up existing chat bubble on this player to prevent stacking
  const oldBubble = container.getByName('chat_bubble');
  if (oldBubble) {
    oldBubble.destroy();
  }

  // 2. Base container for our bubble elements
  const bubbleGroup = scene.add.container(0, -45);
  bubbleGroup.setName('chat_bubble');

  if (isEmote) {
    // Map internal key like 'smile' to '😊' or use the text directly if it is already an emoji
    const emojiStr = EMOTE_MAP[text.toLowerCase()] || text;

    // Speach bubble background graphics
    const bg = scene.add.graphics();
    bg.fillStyle(0xffffff, 0.95);
    bg.lineStyle(1.5, 0x1e293b, 1.0); // High-contrast Slate-800 border

    const size = 32;
    // Perfect rounded square for the emoji bubble
    bg.fillRoundedRect(-size / 2, -size / 2 - 2, size, size, 8);
    bg.strokeRoundedRect(-size / 2, -size / 2 - 2, size, size, 8);

    // Cute triangle bubble tip pointing down
    bg.fillStyle(0xffffff, 1.0);
    bg.beginPath();
    bg.moveTo(-5, size / 2 - 2);
    bg.lineTo(5, size / 2 - 2);
    bg.lineTo(0, size / 2 + 3);
    bg.closePath();
    bg.fill();
    bg.stroke();

    // Large high-res emoji text
    const emojiText = scene.add.text(0, -2, emojiStr, {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '16px',
      color: '#000000',
    });
    emojiText.setResolution(2);
    emojiText.setOrigin(0.5);

    bubbleGroup.add(bg);
    bubbleGroup.add(emojiText);

    // Dynamic scale-pop entrance
    bubbleGroup.setScale(0);
    scene.tweens.add({
      targets: bubbleGroup,
      scale: 1,
      duration: 350,
      ease: 'Back.easeOut'
    });

    // Elegant vertical breathing floating effect
    scene.tweens.add({
      targets: bubbleGroup,
      y: -50,
      duration: 1100,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

  } else {
    // Regular text speech bubble
    const bubbleText = scene.add.text(0, -3, text, {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '10px',
      fontStyle: 'bold',
      color: '#0f172a', // Clean dark indigo/slate ink
      align: 'center',
      wordWrap: { width: 130 }
    });
    bubbleText.setResolution(2);
    bubbleText.setOrigin(0.5);

    // Padding calculations
    const bgWidth = Math.max(32, bubbleText.width + 16);
    const bgHeight = Math.max(20, bubbleText.height + 8);

    const bg = scene.add.graphics();
    bg.fillStyle(0xffffff, 0.98);
    bg.lineStyle(1.5, 0x1e293b, 1.0);

    // Rounded rectangle bubble frame
    bg.fillRoundedRect(-bgWidth / 2, -bgHeight / 2 - 2, bgWidth, bgHeight, 6);
    bg.strokeRoundedRect(-bgWidth / 2, -bgHeight / 2 - 2, bgWidth, bgHeight, 6);

    // Pointer tail
    bg.fillStyle(0xffffff, 1.0);
    bg.beginPath();
    bg.moveTo(-5, bgHeight / 2 - 2);
    bg.lineTo(5, bgHeight / 2 - 2);
    bg.lineTo(0, bgHeight / 2 + 4);
    bg.closePath();
    bg.fill();
    bg.stroke();

    bubbleGroup.add(bg);
    bubbleGroup.add(bubbleText);

    // Elastic pop-up slide animation
    bubbleGroup.y = -32;
    scene.tweens.add({
      targets: bubbleGroup,
      y: -48,
      duration: 300,
      ease: 'Back.easeOut'
    });
  }

  // Add the complete bubble assembly to the player's container
  container.add(bubbleGroup);

  // Self-destruct chat bubble after 4.5 seconds of exposure
  scene.time.delayedCall(4500, () => {
    if (bubbleGroup && bubbleGroup.active) {
      scene.tweens.add({
        targets: bubbleGroup,
        alpha: 0,
        scaleY: 0,
        duration: 250,
        onComplete: () => {
          bubbleGroup.destroy();
        }
      });
    }
  });
}
