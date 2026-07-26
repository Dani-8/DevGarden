import Phaser from 'phaser';

export class CafeBaristaManager {
  private scene: Phaser.Scene;
  private baristaSprite: Phaser.GameObjects.Image;
  private showChatBubbleFn: (text: string, x: number, y: number) => void;
  private lastQuoteTime: number = 0;

  private quotes: string[] = [
    "☕ Welcome to Code Cafe! Serving fresh Async Espresso for devs!",
    "🚀 Need energy to crush bugs? Try our StackOverflow Latte!",
    "💡 Tip of the day: Clean code brews the richest coffee!",
    "⭐ Zero-Bug Cold Brew is on special today!",
    "✨ Rest your keys and enjoy the ambient lo-fi coding vibes!",
  ];

  constructor(
    scene: Phaser.Scene,
    baristaSprite: Phaser.GameObjects.Image,
    showChatBubbleFn: (text: string, x: number, y: number) => void
  ) {
    this.scene = scene;
    this.baristaSprite = baristaSprite;
    this.showChatBubbleFn = showChatBubbleFn;
  }

  public checkInteraction(playerX: number, playerY: number) {
    const dist = Phaser.Math.Distance.Between(playerX, playerY, this.baristaSprite.x, this.baristaSprite.y + 20);
    if (dist < 50) {
      const now = Date.now();
      if (now - this.lastQuoteTime > 3500) {
        this.lastQuoteTime = now;
        const randomQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
        this.showChatBubbleFn(randomQuote, this.baristaSprite.x, this.baristaSprite.y - 28);

        // Gentle bounce animation on Barista
        const initialY = this.baristaSprite.y;
        this.scene.tweens.add({
          targets: this.baristaSprite,
          y: initialY - 3,
          duration: 150,
          yoyo: true,
          ease: 'Sine.easeInOut',
        });
      }
    }
  }
}
