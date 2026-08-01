import Phaser from 'phaser';

export function addOverheadInfo(
    scene: Phaser.Scene,
    container: Phaser.GameObjects.Container,
    username: string,
    level: number,
    title: string,
    tier: string,
    isSleeping: boolean,
    cosmetics?: string[]
) {
    let badgeColor = '#81c784';
    if (tier === 'blue') badgeColor = '#64b5f6';
    if (tier === 'purple') badgeColor = '#ba68c8';
    if (tier === 'crimson') badgeColor = '#e57373';
    if (tier === 'cosmic') badgeColor = '#ffd54f';

    const labelText = isSleeping ? `[Sleeping] ${username}` : username;

    const nameText = scene.add.text(0, -22, labelText, {
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '10px',
        fontStyle: 'bold',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 2,
    });

    nameText.setResolution(2);
    nameText.setOrigin(0.5);
    container.add(nameText);

    const badgeText = scene.add.text(0, -33, `Lvl ${level} ${title}`, {
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '8px',
        color: badgeColor,
        stroke: '#000000',
        strokeThickness: 2,
    });

    badgeText.setResolution(2);
    badgeText.setOrigin(0.5);
    container.add(badgeText);

    
    if (cosmetics && cosmetics.includes('gardener_hat')) {
        const hatText = scene.add.text(0, -14, '👒', {
            fontSize: '11px',
        });
        hatText.setOrigin(0.5, 0.5);
        hatText.setResolution(2);
        container.add(hatText);
    }

    if (cosmetics && cosmetics.includes('watering_can')) {
        const canText = scene.add.text(10, -5, '🚰', {
            fontSize: '9px',
        });
        canText.setOrigin(0.5, 0.5);
        canText.setResolution(2);
        container.add(canText);
    }
}
