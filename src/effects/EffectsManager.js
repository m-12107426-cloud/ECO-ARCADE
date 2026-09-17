import Phaser from 'phaser';

export class EffectsManager {
  constructor(scene) {
    this.scene = scene;

    // Background pulsing state
    this.bgHue = 0.6; // Cyberpunk cyan-purple range
    this.bgPulseIntensity = 0;
    this.bpmColors = [
      0x050515, // Deep navy
      0x150525, // Deep magenta
      0x051525, // Cyber blue
      0x200515  // Synth purple
    ];
    this.currentBgIndex = 0;

    // Trail particle graphics pool
    this.trailParticles = [];
    this.shatterParticles = [];

    // Create background graphics
    this.bgGraphics = this.scene.add.graphics();
    this.bgGraphics.setDepth(-10);

    this.gridGraphics = this.scene.add.graphics();
    this.gridGraphics.setDepth(-9);
  }

  updateBackground(dt, playerX, cameraX) {
    // Pulse decay
    if (this.bgPulseIntensity > 0) {
      this.bgPulseIntensity = Math.max(0, this.bgPulseIntensity - dt * 3);
    }

    const curColor = this.bpmColors[this.currentBgIndex];
    this.bgGraphics.clear();
    this.bgGraphics.fillStyle(curColor, 1);
    this.bgGraphics.fillRect(cameraX - 100, 0, 1480, 720);

    // Draw scrolling perspective neon grid
    const g = this.gridGraphics;
    g.clear();
    g.lineStyle(1, 0x00f0ff, 0.15 + this.bgPulseIntensity * 0.25);

    const gridSize = 60;
    const offsetX = -(cameraX % gridSize);

    // Vertical grid lines
    for (let x = offsetX - 100; x < 1380; x += gridSize) {
      g.lineBetween(x + cameraX, 0, x + cameraX, 720);
    }

    // Horizontal grid lines
    for (let y = 0; y < 720; y += gridSize) {
      g.lineBetween(cameraX - 100, y, cameraX + 1380, y);
    }
  }

  onBeatPulse() {
    this.bgPulseIntensity = 1.0;
    this.currentBgIndex = (this.currentBgIndex + 1) % this.bpmColors.length;

    // Camera gentle beat bounce
    this.scene.cameras.main.zoom = 1.015;
    this.scene.tweens.add({
      targets: this.scene.cameras.main,
      zoom: 1.0,
      duration: 120,
      ease: 'Quad.easeOut'
    });
  }

  emitPlayerTrail(x, y, vehicleType) {
    let color = 0x00f0ff;
    if (vehicleType === 'ROCKET') color = 0xff007f;
    if (vehicleType === 'GRAVITY_FLIP') color = 0xb026ff;
    if (vehicleType === 'WAVE') color = 0x00ff66;
    if (vehicleType === 'UFO') color = 0xffd700;

    const p = this.scene.add.graphics();
    p.fillStyle(color, 0.7);
    p.fillCircle(x, y, 6);
    p.setDepth(2);

    this.scene.tweens.add({
      targets: p,
      scaleX: 0.1,
      scaleY: 0.1,
      alpha: 0,
      duration: 300,
      onComplete: () => p.destroy()
    });
  }

  triggerDeathShatter(x, y) {
    // Camera shake on death
    this.scene.cameras.main.shake(350, 0.025);

    // Spawn 40 pixel shatter particles flying outward
    const numParticles = 40;
    for (let i = 0; i < numParticles; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Phaser.Math.Between(150, 550);
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const size = Phaser.Math.Between(4, 10);

      const p = this.scene.add.graphics();
      p.fillStyle(i % 2 === 0 ? 0x00f0ff : 0xff007f, 1);
      p.fillRect(-size / 2, -size / 2, size, size);
      p.setPosition(x, y);
      p.setDepth(10);

      this.scene.tweens.add({
        targets: p,
        x: x + vx * 0.6,
        y: y + vy * 0.6,
        rotation: Math.random() * 6,
        alpha: 0,
        scaleX: 0.2,
        scaleY: 0.2,
        duration: 700 + Math.random() * 300,
        ease: 'Cubic.easeOut',
        onComplete: () => p.destroy()
      });
    }
  }

  triggerCameraShake(intensity = 0.015, duration = 200) {
    this.scene.cameras.main.shake(duration, intensity);
  }
}
