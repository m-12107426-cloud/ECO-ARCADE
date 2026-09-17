import Phaser from 'phaser';
import { Player } from '../entities/Player.js';
import { HazardPool } from '../entities/Hazards.js';
import { ModifierPool } from '../entities/Modifiers.js';
import { InputManager } from '../core/InputManager.js';
import { PhysicsEngine } from '../core/PhysicsEngine.js';
import { EffectsManager } from '../effects/EffectsManager.js';
import { globalAudio } from '../audio/AudioEngine.js';
import { UIHUD } from './UIHUD.js';
import { createShowcaseLevel } from './ShowcaseLevel.js';

export class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    this.floorY = 580;
    this.ceilingY = 100;
    this.isGameOver = false;
    this.isVictory = false;
    this.isMirrorMode = false;
    this.slowMoTimer = 0;

    // Core Managers
    this.inputManager = new InputManager(this);
    this.physicsEngine = new PhysicsEngine(1 / 60);
    this.effectsManager = new EffectsManager(this);

    // Audio Sync Beat Event Listener
    globalAudio.beatCallbacks = [];
    globalAudio.onBeat((beatNum) => {
      this.effectsManager.onBeatPulse();
    });

    // SFX listener from entities
    this.events.on('sfx', (type) => {
      globalAudio.playSFX(type);
    });

    this.events.on('triggerSlowMo', () => {
      this.slowMoTimer = 2.0; // 2 seconds slow motion
    });

    this.events.on('toggleMirrorMode', () => {
      this.isMirrorMode = !this.isMirrorMode;
      this.cameras.main.setFlipY(this.isMirrorMode);
    });

    // Draw Floor and Ceiling boundaries
    this.createStageBoundaries();

    // Player Entity
    this.player = new Player(this, 100, 500);

    // Entity Pools
    this.hazardPool = new HazardPool(this);
    this.modifierPool = new ModifierPool(this);

    // Load Showcase Level
    this.levelLength = createShowcaseLevel(this.hazardPool, this.modifierPool);

    // UI HUD
    this.hud = new UIHUD(this);

    // Camera follow setup
    this.cameras.main.startFollow(this.player.container, true, 0.1, 0.1, -300, 0);
    this.cameras.main.setBounds(0, 0, this.levelLength + 1000, 720);
  }

  createStageBoundaries() {
    const floorCeilGfx = this.add.graphics();
    floorCeilGfx.fillStyle(0x0a0a20, 1);
    floorCeilGfx.fillRect(0, this.floorY, 30000, 140);
    floorCeilGfx.fillRect(0, 0, 30000, this.ceilingY);

    // Glowing boundary neon strips
    floorCeilGfx.lineStyle(4, 0x00f0ff, 1);
    floorCeilGfx.lineBetween(0, this.floorY, 30000, this.floorY);
    floorCeilGfx.lineBetween(0, this.ceilingY, 30000, this.ceilingY);
    floorCeilGfx.setDepth(1);
  }

  update(time, delta) {
    if (this.isGameOver || this.isVictory) return;

    let dt = delta / 1000;

    // Slow-mo orb modifier
    if (this.slowMoTimer > 0) {
      this.slowMoTimer -= dt;
      dt *= 0.5; // Half speed time dilation
      globalAudio.setTempoMultiplier(0.5);
    } else {
      globalAudio.setTempoMultiplier(this.player.speedMultiplier);
    }

    // Input update
    this.inputManager.update();

    // Fixed-step sub-pixel physics tick
    this.physicsEngine.step(delta, (fixedDt) => {
      const stepDt = this.slowMoTimer > 0 ? fixedDt * 0.5 : fixedDt;
      this.player.update(stepDt, this.inputManager, this.floorY, this.ceilingY);
    });

    const px = this.player.container.x;
    const py = this.player.container.y;

    // Camera & Background
    this.effectsManager.updateBackground(dt, px, this.cameras.main.scrollX);

    // Particle Trail Emitter
    this.effectsManager.emitPlayerTrail(px, py, this.player.vehicleType);

    // Entity Pool Updates
    this.hazardPool.update(dt, px);
    this.modifierPool.update(dt, this.player, this.inputManager);

    // Collision Check with Hazards
    const hitHazard = this.hazardPool.checkCollision(this.player);
    if (hitHazard) {
      if (this.player.hasShield) {
        // Shield absorbs hit
        this.player.setShield(false);
        hitHazard.deactivate();
        this.effectsManager.triggerCameraShake(0.02, 250);
        globalAudio.playSFX('shield');
      } else {
        this.handlePlayerDeath();
      }
    }

    // Progress percentage
    const progressRatio = px / this.levelLength;
    this.hud.update(this.player, progressRatio);

    // Victory Check
    if (px >= this.levelLength && !this.isVictory) {
      this.handleVictory();
    }
  }

  handlePlayerDeath() {
    this.isGameOver = true;
    this.player.isDead = true;
    this.player.container.setVisible(false);

    globalAudio.playSFX('death');
    globalAudio.stopMusic();

    this.effectsManager.triggerDeathShatter(this.player.container.x, this.player.container.y);

    // Overlay Game Over UI
    this.time.delayedCall(800, () => {
      this.showGameOverScreen();
    });
  }

  showGameOverScreen() {
    const overlay = this.add.rectangle(640, 360, 1280, 720, 0x000000, 0.75)
      .setScrollFactor(0)
      .setDepth(200);

    const txt = this.add.text(640, 280, 'GAME OVER', {
      fontFamily: 'Segoe UI, Roboto, sans-serif',
      fontSize: '64px',
      fontStyle: 'bold',
      color: '#ff0055'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(201);

    const restartBtn = this.add.rectangle(640, 420, 240, 50, 0x00f0ff, 1)
      .setScrollFactor(0)
      .setDepth(201)
      .setInteractive({ useHandCursor: true });

    const btnText = this.add.text(640, 420, 'RESTART (SPACE)', {
      fontFamily: 'Segoe UI, Roboto, sans-serif',
      fontSize: '20px',
      fontStyle: 'bold',
      color: '#050510'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(202);

    const restartGame = () => {
      this.cameras.main.setFlipY(false);
      globalAudio.startMusic(130);
      this.scene.restart();
    };

    restartBtn.on('pointerdown', restartGame);
    this.input.keyboard.once('keydown-SPACE', restartGame);
    this.input.keyboard.once('keydown-UP', restartGame);
  }

  handleVictory() {
    this.isVictory = true;
    globalAudio.playSFX('win');
    globalAudio.stopMusic();

    const overlay = this.add.rectangle(640, 360, 1280, 720, 0x000000, 0.75)
      .setScrollFactor(0)
      .setDepth(200);

    this.add.text(640, 280, 'LEVEL COMPLETE!', {
      fontFamily: 'Segoe UI, Roboto, sans-serif',
      fontSize: '64px',
      fontStyle: 'bold',
      color: '#00ff66'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(201);

    const menuBtn = this.add.rectangle(640, 420, 240, 50, 0x00f0ff, 1)
      .setScrollFactor(0)
      .setDepth(201)
      .setInteractive({ useHandCursor: true });

    this.add.text(640, 420, 'MAIN MENU', {
      fontFamily: 'Segoe UI, Roboto, sans-serif',
      fontSize: '20px',
      fontStyle: 'bold',
      color: '#050510'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(202);

    const returnMenu = () => {
      this.cameras.main.setFlipY(false);
      this.scene.start('MenuScene');
    };

    menuBtn.on('pointerdown', returnMenu);
    this.input.keyboard.once('keydown-SPACE', returnMenu);
  }
}
