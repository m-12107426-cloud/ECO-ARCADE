import Phaser from 'phaser';

export const VEHICLE_TYPES = {
  CUBE: 'CUBE',
  ROCKET: 'ROCKET',
  GRAVITY_FLIP: 'GRAVITY_FLIP',
  WAVE: 'WAVE',
  UFO: 'UFO'
};

export class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    this.initialX = x;
    this.initialY = y;

    // Vehicle state
    this.vehicleType = VEHICLE_TYPES.CUBE;
    this.gravityDirection = 1; // 1 = down, -1 = up
    this.speedMultiplier = 1.0;
    this.baseSpeed = 360; // Pixels per second forward movement

    // Physics properties
    this.gravityForce = 1800;
    this.jumpForce = -620;
    this.vx = this.baseSpeed;
    this.vy = 0;

    // Shield status
    this.hasShield = false;
    this.isDead = false;
    this.isGrounded = false;

    // Dimensions
    this.width = 38;
    this.height = 38;

    // Render graphic container / sprite
    this.createPlayerGraphic();
  }

  createPlayerGraphic() {
    this.container = this.scene.add.container(this.initialX, this.initialY);

    // Cube body (Cyber neon theme)
    this.bodyGfx = this.scene.add.graphics();
    this.drawVehicleGfx();
    this.container.add(this.bodyGfx);

    // Shield aura graphic
    this.shieldGfx = this.scene.add.graphics();
    this.drawShieldGfx();
    this.shieldGfx.setVisible(false);
    this.container.add(this.shieldGfx);
  }

  drawVehicleGfx() {
    const g = this.bodyGfx;
    g.clear();

    switch (this.vehicleType) {
      case VEHICLE_TYPES.CUBE: {
        // Glowing cyan cube
        g.fillStyle(0x00f0ff, 1);
        g.fillRect(-19, -19, 38, 38);
        g.lineStyle(3, 0xffffff, 0.9);
        g.strokeRect(-19, -19, 38, 38);
        // Inner core
        g.fillStyle(0xffffff, 0.8);
        g.fillRect(-8, -8, 16, 16);
        break;
      }
      case VEHICLE_TYPES.ROCKET: {
        // Rocket / Jet form (triangle / rocket ship)
        g.fillStyle(0xff007f, 1);
        g.beginPath();
        g.moveTo(20, 0);
        g.lineTo(-18, -16);
        g.lineTo(-10, 0);
        g.lineTo(-18, 16);
        g.closePath();
        g.fillPath();
        g.lineStyle(2, 0x00f0ff, 1);
        g.strokePath();
        break;
      }
      case VEHICLE_TYPES.GRAVITY_FLIP: {
        // Purple diamond / inverted cube form
        g.fillStyle(0xb026ff, 1);
        g.beginPath();
        g.moveTo(0, -20);
        g.lineTo(20, 0);
        g.lineTo(0, 20);
        g.lineTo(-20, 0);
        g.closePath();
        g.fillPath();
        g.lineStyle(2, 0x00f0ff, 1);
        g.strokePath();
        break;
      }
      case VEHICLE_TYPES.WAVE: {
        // Sharp dart form
        g.fillStyle(0x00ff66, 1);
        g.beginPath();
        g.moveTo(20, 0);
        g.lineTo(-16, -14);
        g.lineTo(-16, 14);
        g.closePath();
        g.fillPath();
        g.lineStyle(2, 0xffffff, 0.9);
        g.strokePath();
        break;
      }
      case VEHICLE_TYPES.UFO: {
        // Flying saucer dome
        g.fillStyle(0xffd700, 1);
        g.fillCircle(0, -4, 12);
        g.fillStyle(0x00f0ff, 1);
        g.fillEllipse(0, 4, 22, 10);
        g.lineStyle(2, 0xffffff, 1);
        g.strokeEllipse(0, 4, 22, 10);
        break;
      }
    }
  }

  drawShieldGfx() {
    const g = this.shieldGfx;
    g.clear();
    g.lineStyle(3, 0x00ffff, 0.8);
    g.strokeCircle(0, 0, 28);
    g.fillStyle(0x00ffff, 0.2);
    g.fillCircle(0, 0, 28);
  }

  setVehicle(type) {
    if (this.vehicleType === type) return;
    this.vehicleType = type;
    this.drawVehicleGfx();
  }

  setGravity(dir) {
    this.gravityDirection = dir; // 1 or -1
  }

  setSpeedMultiplier(mult) {
    this.speedMultiplier = mult;
    this.vx = this.baseSpeed * mult;
  }

  setShield(active) {
    this.hasShield = active;
    this.shieldGfx.setVisible(active);
  }

  getBounds() {
    return {
      x: this.container.x - this.width / 2,
      y: this.container.y - this.height / 2,
      width: this.width,
      height: this.height
    };
  }

  update(dt, inputManager, floorY = 580, ceilingY = 100) {
    if (this.isDead) return;

    const isInputDown = inputManager.isDown();
    const isTapBuffered = inputManager.isTapBuffered();

    // Horizontal Movement
    this.container.x += this.vx * dt;

    // Vehicle Specific Logic
    switch (this.vehicleType) {
      case VEHICLE_TYPES.CUBE: {
        // Standard Jump Logic
        this.vy += this.gravityForce * this.gravityDirection * dt;

        if (this.isGrounded && isTapBuffered) {
          this.vy = this.jumpForce * this.gravityDirection;
          this.isGrounded = false;
          inputManager.consumeTap();
          this.scene.events.emit('playerJump');
        }

        // Cube snap rotation when in air
        if (!this.isGrounded) {
          this.container.rotation += 8 * this.gravityDirection * dt;
        } else {
          // Snap to nearest 90 degrees on floor
          const nearestQuarter = Math.round(this.container.rotation / (Math.PI / 2)) * (Math.PI / 2);
          this.container.rotation = Phaser.Math.Angle.RotateTo(this.container.rotation, nearestQuarter, 15 * dt);
        }
        break;
      }

      case VEHICLE_TYPES.ROCKET: {
        // Hold-to-fly smooth rocket vertical control
        const flyForce = -1200 * this.gravityDirection;
        const fallForce = 1100 * this.gravityDirection;

        if (isInputDown) {
          this.vy += flyForce * dt;
        } else {
          this.vy += fallForce * dt;
        }

        // Clamp rocket velocity
        this.vy = Phaser.Math.Clamp(this.vy, -450, 450);

        // Tilt angle based on vertical velocity
        const targetAngle = Phaser.Math.DegToRad(this.vy * 0.08);
        this.container.rotation = Phaser.Math.Angle.RotateTo(this.container.rotation, targetAngle, 5 * dt);
        break;
      }

      case VEHICLE_TYPES.GRAVITY_FLIP: {
        // Gravity Flip: Flip gravity when touching ceiling/floor on tap
        this.vy += this.gravityForce * this.gravityDirection * dt;

        if (this.isGrounded && isTapBuffered) {
          this.gravityDirection *= -1;
          this.vy = 200 * this.gravityDirection;
          this.isGrounded = false;
          inputManager.consumeTap();
          this.scene.events.emit('playerGravityFlip');
        }

        this.container.rotation += 6 * this.gravityDirection * dt;
        break;
      }

      case VEHICLE_TYPES.WAVE: {
        // Wave: Diagonal zig-zag movement
        const waveSpeed = 480 * this.speedMultiplier;
        if (isInputDown) {
          this.vy = -waveSpeed * this.gravityDirection;
          this.container.rotation = Phaser.Math.DegToRad(-45 * this.gravityDirection);
        } else {
          this.vy = waveSpeed * this.gravityDirection;
          this.container.rotation = Phaser.Math.DegToRad(45 * this.gravityDirection);
        }
        break;
      }

      case VEHICLE_TYPES.UFO: {
        // UFO: Air jump on tap
        this.vy += (this.gravityForce * 0.8) * this.gravityDirection * dt;

        if (isTapBuffered) {
          this.vy = (this.jumpForce * 0.75) * this.gravityDirection;
          inputManager.consumeTap();
          this.scene.events.emit('playerJump');
        }

        this.container.rotation = Phaser.Math.DegToRad(this.vy * 0.04);
        break;
      }
    }

    // Apply vertical velocity
    this.container.y += this.vy * dt;

    // Collision with Floor & Ceiling
    const topY = ceilingY + this.height / 2;
    const botY = floorY - this.height / 2;

    if (this.gravityDirection === 1) {
      if (this.container.y >= botY) {
        this.container.y = botY;
        this.vy = 0;
        this.isGrounded = true;
      } else if (this.container.y <= topY) {
        this.container.y = topY;
        this.vy = Math.max(0, this.vy);
      } else {
        this.isGrounded = false;
      }
    } else {
      // Inverted gravity
      if (this.container.y <= topY) {
        this.container.y = topY;
        this.vy = 0;
        this.isGrounded = true;
      } else if (this.container.y >= botY) {
        this.container.y = botY;
        this.vy = Math.min(0, this.vy);
      } else {
        this.isGrounded = false;
      }
    }
  }

  impulseJump(forceMultiplier = 1.0) {
    this.vy = this.jumpForce * forceMultiplier * this.gravityDirection;
    this.isGrounded = false;
  }
}
