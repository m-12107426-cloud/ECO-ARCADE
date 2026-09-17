import Phaser from 'phaser';

export const HAZARD_TYPES = {
  SPIKE: 'SPIKE',
  BLOCK_GAP: 'BLOCK_GAP',
  SAWBLADE: 'SAWBLADE',
  SWEEPING_LASER: 'SWEEPING_LASER',
  FALLING_CEILING: 'FALLING_CEILING'
};

export class HazardPool {
  constructor(scene) {
    this.scene = scene;
    this.activeHazards = [];
    this.inactivePool = [];
  }

  spawnHazard(config) {
    let hazard = this.inactivePool.pop();
    if (!hazard) {
      hazard = new HazardContainer(this.scene);
    }
    hazard.activate(config);
    this.activeHazards.push(hazard);
    return hazard;
  }

  update(dt, playerX, pruneThreshold = 600) {
    for (let i = this.activeHazards.length - 1; i >= 0; i--) {
      const hazard = this.activeHazards[i];
      hazard.update(dt, playerX);

      // Prune off-screen entities behind the player to eliminate GC frame drops
      if (hazard.x < playerX - pruneThreshold) {
        hazard.deactivate();
        this.activeHazards.splice(i, 1);
        this.inactivePool.push(hazard);
      }
    }
  }

  checkCollision(player) {
    const playerBounds = player.getBounds();

    for (let i = 0; i < this.activeHazards.length; i++) {
      const hazard = this.activeHazards[i];
      if (hazard.checkCollisionWithPlayer(playerBounds, player)) {
        return hazard;
      }
    }
    return null;
  }

  clearAll() {
    for (const hazard of this.activeHazards) {
      hazard.deactivate();
      this.inactivePool.push(hazard);
    }
    this.activeHazards.length = 0;
  }
}

export class HazardContainer {
  constructor(scene) {
    this.scene = scene;
    this.container = scene.add.container(0, 0);
    this.gfx = scene.add.graphics();
    this.container.add(this.gfx);

    this.type = HAZARD_TYPES.SPIKE;
    this.x = 0;
    this.y = 0;
    this.width = 40;
    this.height = 40;
    this.rotationSpeed = 0;

    // Dynamic behavior states
    this.laserTimer = 0;
    this.laserActive = true;
    this.fallingOffset = 0;
    this.isTriggered = false;
  }

  activate(config) {
    this.type = config.type || HAZARD_TYPES.SPIKE;
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.width = config.width || 40;
    this.height = config.height || 40;
    this.rotationSpeed = config.rotationSpeed || 0;
    this.laserTimer = 0;
    this.laserActive = true;
    this.fallingOffset = 0;
    this.isTriggered = false;

    this.container.setPosition(this.x, this.y);
    this.container.setRotation(config.rotation || 0);
    this.container.setVisible(true);

    this.drawGraphic();
  }

  deactivate() {
    this.container.setVisible(false);
  }

  drawGraphic() {
    const g = this.gfx;
    g.clear();

    switch (this.type) {
      case HAZARD_TYPES.SPIKE: {
        // Red neon triangle spike
        g.fillStyle(0xff0044, 1);
        g.beginPath();
        g.moveTo(0, -this.height / 2);
        g.lineTo(this.width / 2, this.height / 2);
        g.lineTo(-this.width / 2, this.height / 2);
        g.closePath();
        g.fillPath();
        g.lineStyle(2, 0xff77aa, 1);
        g.strokePath();
        break;
      }

      case HAZARD_TYPES.BLOCK_GAP: {
        // Solid wall obstacle
        g.fillStyle(0x330066, 1);
        g.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        g.lineStyle(2, 0xff0055, 1);
        g.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height);
        break;
      }

      case HAZARD_TYPES.SAWBLADE: {
        // Rotating sawblade
        const radius = this.width / 2;
        g.fillStyle(0xffaa00, 1);
        g.fillCircle(0, 0, radius);

        // Blade teeth
        g.fillStyle(0xff3300, 1);
        const numTeeth = 8;
        for (let i = 0; i < numTeeth; i++) {
          const angle = (i * Math.PI * 2) / numTeeth;
          const tx = Math.cos(angle) * (radius + 8);
          const ty = Math.sin(angle) * (radius + 8);
          g.fillCircle(tx, ty, 5);
        }
        g.fillStyle(0xffffff, 1);
        g.fillCircle(0, 0, radius * 0.3);
        break;
      }

      case HAZARD_TYPES.SWEEPING_LASER: {
        // Sweeping beam generator
        g.fillStyle(0xff00ff, 1);
        g.fillRect(-15, -15, 30, 30);
        g.lineStyle(3, 0xff0055, 1);
        g.strokeRect(-15, -15, 30, 30);

        if (this.laserActive) {
          g.fillStyle(0xff00ff, 0.8);
          g.fillRect(-6, 15, 12, this.height);
          g.lineStyle(2, 0xffffff, 0.9);
          g.strokeRect(-6, 15, 12, this.height);
        }
        break;
      }

      case HAZARD_TYPES.FALLING_CEILING: {
        // Spiked ceiling crusher
        g.fillStyle(0x880033, 1);
        g.fillRect(-this.width / 2, -15, this.width, 30);

        // Downward spikes
        g.fillStyle(0xff0044, 1);
        const spikeCount = Math.floor(this.width / 20);
        for (let i = 0; i < spikeCount; i++) {
          const sx = -this.width / 2 + i * 20 + 10;
          g.beginPath();
          g.moveTo(sx - 8, 15);
          g.lineTo(sx + 8, 15);
          g.lineTo(sx, 35);
          g.closePath();
          g.fillPath();
        }
        break;
      }
    }
  }

  update(dt, playerX) {
    if (this.type === HAZARD_TYPES.SAWBLADE) {
      this.container.rotation += (this.rotationSpeed || 6) * dt;
    } else if (this.type === HAZARD_TYPES.SWEEPING_LASER) {
      this.laserTimer += dt;
      // Pulse / cycle laser active state
      this.laserActive = Math.sin(this.laserTimer * 4) > -0.3;
      this.drawGraphic();
    } else if (this.type === HAZARD_TYPES.FALLING_CEILING) {
      // Trigger falling when player approaches
      if (playerX > this.x - 300) {
        this.isTriggered = true;
      }
      if (this.isTriggered && this.fallingOffset < 180) {
        this.fallingOffset += 300 * dt;
        this.container.setPosition(this.x, this.y + this.fallingOffset);
      }
    }
  }

  checkCollisionWithPlayer(playerBounds, player) {
    const px = playerBounds.x + playerBounds.width / 2;
    const py = playerBounds.y + playerBounds.height / 2;
    const pr = playerBounds.width * 0.4; // Slightly lenient hitbox for gameplay feel

    if (this.type === HAZARD_TYPES.SPIKE) {
      // Triangle / AABB overlap
      const hx = this.x;
      const hy = this.y;
      const halfW = this.width / 2 * 0.7; // Inner precise spike box
      const halfH = this.height / 2 * 0.7;

      return (
        px + pr > hx - halfW &&
        px - pr < hx + halfW &&
        py + pr > hy - halfH &&
        py - pr < hy + halfH
      );
    } else if (this.type === HAZARD_TYPES.SAWBLADE) {
      // Circle-Circle collision
      const dist = Phaser.Math.Distance.Between(px, py, this.x, this.y);
      return dist < pr + (this.width / 2 * 0.85);
    } else if (this.type === HAZARD_TYPES.SWEEPING_LASER) {
      if (!this.laserActive) return false;
      const beamX = this.x;
      const beamTop = this.y + 15;
      const beamBottom = this.y + 15 + this.height;

      return (
        px + pr > beamX - 8 &&
        px - pr < beamX + 8 &&
        py + pr > beamTop &&
        py - pr < beamBottom
      );
    } else if (this.type === HAZARD_TYPES.BLOCK_GAP || this.type === HAZARD_TYPES.FALLING_CEILING) {
      const curY = this.container.y;
      const halfW = this.width / 2;
      const halfH = this.height / 2;

      return (
        px + pr > this.x - halfW &&
        px - pr < this.x + halfW &&
        py + pr > curY - halfH &&
        py - pr < curY + halfH
      );
    }

    return false;
  }
}
