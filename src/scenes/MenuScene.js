import Phaser from 'phaser';
import { globalAudio } from '../audio/AudioEngine.js';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    this.cameras.main.setBackgroundColor('#050510');

    // Title text
    const title = this.add.text(640, 200, 'CYBER PULSE', {
      fontFamily: 'Segoe UI, Roboto, sans-serif',
      fontSize: '72px',
      fontStyle: 'bold',
      color: '#00f0ff'
    }).setOrigin(0.5);

    this.tweens.add({
      targets: title,
      scaleX: 1.05,
      scaleY: 1.05,
      yoyo: true,
      repeat: -1,
      duration: 1200,
      ease: 'Sine.easeInOut'
    });

    const subtitle = this.add.text(640, 280, 'HIGH-PERFORMANCE 2D RHYTHM PLATFORMER', {
      fontFamily: 'Segoe UI, Roboto, sans-serif',
      fontSize: '22px',
      color: '#ff007f'
    }).setOrigin(0.5);

    // Instructions Box
    const instructions = [
      '• SPACE / UP / CLICK / TAP to Jump & Fly',
      '• Pass Portals to switch Vehicles (Cube, Rocket, Gravity, Wave, UFO)',
      '• Collect Air Orbs for mid-air jumps & gravity flips',
      '• Avoid Spikes, Sawblades, Sweeping Lasers & Falling Ceilings!'
    ];

    this.add.text(640, 420, instructions.join('\n'), {
      fontFamily: 'Segoe UI, Roboto, sans-serif',
      fontSize: '18px',
      color: '#cccccc',
      align: 'center',
      lineSpacing: 10
    }).setOrigin(0.5);

    // Play Button
    const playBtn = this.add.rectangle(640, 580, 260, 60, 0x00f0ff, 1)
      .setInteractive({ useHandCursor: true });

    const playText = this.add.text(640, 580, 'START LEVEL', {
      fontFamily: 'Segoe UI, Roboto, sans-serif',
      fontSize: '28px',
      fontStyle: 'bold',
      color: '#050510'
    }).setOrigin(0.5);

    playBtn.on('pointerover', () => {
      playBtn.setFillStyle(0xff007f, 1);
      playText.setColor('#ffffff');
    });

    playBtn.on('pointerout', () => {
      playBtn.setFillStyle(0x00f0ff, 1);
      playText.setColor('#050510');
    });

    const startGame = () => {
      globalAudio.init();
      globalAudio.startMusic(130);
      this.scene.start('GameScene');
    };

    playBtn.on('pointerdown', startGame);
    this.input.keyboard.once('keydown-SPACE', startGame);
    this.input.keyboard.once('keydown-UP', startGame);
  }
}
