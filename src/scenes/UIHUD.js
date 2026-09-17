import Phaser from 'phaser';

export class UIHUD {
  constructor(scene) {
    this.scene = scene;

    // HUD Container fixed on screen
    this.container = this.scene.add.container(0, 0);
    this.container.setScrollFactor(0);
    this.container.setDepth(100);

    // Progress Bar Background
    this.barBg = this.scene.add.graphics();
    this.barBg.fillStyle(0x111122, 0.8);
    this.barBg.fillRect(240, 20, 800, 16);
    this.barBg.lineStyle(2, 0x00f0ff, 0.8);
    this.barBg.strokeRect(240, 20, 800, 16);
    this.container.add(this.barBg);

    // Progress Fill
    this.barFill = this.scene.add.graphics();
    this.container.add(this.barFill);

    // Progress Text
    this.percentText = this.scene.add.text(640, 48, '0%', {
      fontFamily: 'Segoe UI, Arial, sans-serif',
      fontSize: '20px',
      fontStyle: 'bold',
      color: '#00f0ff'
    }).setOrigin(0.5);
    this.container.add(this.percentText);

    // Vehicle Badge Text
    this.vehicleText = this.scene.add.text(40, 30, 'MODE: CUBE', {
      fontFamily: 'Segoe UI, Arial, sans-serif',
      fontSize: '18px',
      fontStyle: 'bold',
      color: '#ffffff'
    });
    this.container.add(this.vehicleText);

    // Speed Multiplier Badge
    this.speedText = this.scene.add.text(40, 58, 'SPEED: 1.0x', {
      fontFamily: 'Segoe UI, Arial, sans-serif',
      fontSize: '16px',
      color: '#ffd700'
    });
    this.container.add(this.speedText);

    // Shield Indicator Badge
    this.shieldText = this.scene.add.text(1120, 30, 'SHIELD: OFF', {
      fontFamily: 'Segoe UI, Arial, sans-serif',
      fontSize: '16px',
      fontStyle: 'bold',
      color: '#888888'
    });
    this.container.add(this.shieldText);
  }

  update(player, progressRatio) {
    // Update progress bar fill
    const pct = Phaser.Math.Clamp(progressRatio, 0, 1);
    this.barFill.clear();
    this.barFill.fillStyle(0x00f0ff, 1);
    this.barFill.fillRect(242, 22, 796 * pct, 12);

    this.percentText.setText(`${Math.floor(pct * 100)}%`);

    // Vehicle & Speed
    this.vehicleText.setText(`MODE: ${player.vehicleType}`);
    this.speedText.setText(`SPEED: ${player.speedMultiplier.toFixed(1)}x`);

    // Shield status badge
    if (player.hasShield) {
      this.shieldText.setText('SHIELD: ACTIVE');
      this.shieldText.setColor('#00ffff');
    } else {
      this.shieldText.setText('SHIELD: OFF');
      this.shieldText.setColor('#888888');
    }
  }
}
