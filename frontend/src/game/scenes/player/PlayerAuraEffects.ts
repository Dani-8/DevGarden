import Phaser from 'phaser';

export function addAuraParticles(
    scene: Phaser.Scene,
    container: Phaser.GameObjects.Container,
    tier: string,
    isSelf: boolean,
    isNPC: boolean = false
) {
    if (tier === 'green') return;

    let colorHex = 0x64b5f6;
    let speedRange = { min: 10, max: 20 };
    let lifespan = 1000;
    let frequency = 250;

    if (tier === 'purple') {
        colorHex = 0xffeb3b;
        speedRange = { min: 15, max: 30 };
        frequency = 180;
    } else if (tier === 'crimson') {
        colorHex = 0xff3d00;
        speedRange = { min: 20, max: 40 };
        frequency = 100;
    } else if (tier === 'cosmic') {
        colorHex = 0x00e5ff;
        speedRange = { min: 25, max: 50 };
        frequency = 80;
    }

    if (isNPC) {
        frequency *= 2;
    }

    const emitter = scene.add.particles(0, 0, 'glow_particle', {
        scale: { start: 0.15, end: 0 },
        alpha: { start: isNPC ? 0.2 : 0.6, end: 0 },
        tint: colorHex,
        speed: speedRange,
        angle: { min: -110, max: -70 },
        lifespan: lifespan,
        frequency: frequency,
    });

    container.add(emitter);
    container.sendToBack(emitter);
}
