import Phaser from 'phaser';

export const MODIFIER_TYPES = {
  // Jump pads
  PAD_YELLOW: 'PAD_YELLOW',
  PAD_PINK: 'PAD_PINK',
  PAD_RED: 'PAD_RED',

  // Interactive Air Orbs
  ORB_YELLOW: 'ORB_YELLOW',
  ORB_PINK: 'ORB_PINK',
  ORB_RED: 'ORB_RED',
  ORB_BLUE_GRAVITY: 'ORB_BLUE_GRAVITY',
  ORB_SLOW_MO: 'ORB_SLOW_MO',

  // Portals
  PORTAL_SPEED_0_5: 'PORTAL_SPEED_0_5',
  PORTAL_SPEED_1_0: 'PORTAL_SPEED_1_0',
  PORTAL_SPEED_2_0: 'PORTAL_SPEED_2_0',
  PORTAL_SPEED_4_0: 'PORTAL_SPEED_4_0',
  PORTAL_MIRROR: 'PORTAL_MIRROR',

  // Vehicle Portals
  PORTAL_VEHICLE_CUBE: 'PORTAL_VEHICLE_CUBE',
  PORTAL_VEHICLE_ROCKET: 'PORTAL_VEHICLE_ROCKET',
  PORTAL_VEHICLE_GRAVITY: 'PORTAL_VEHICLE_GRAVITY',
  PORTAL_VEHICLE_WAVE: 'PORTAL_VEHICLE_WAVE',
  PORTAL_VEHICLE_UFO: 'PORTAL_VEHICLE_UFO',

  // Items
  ITEM_SHIELD: 'ITEM_SHIELD'
};

export class ModifierPool {
  constructor(scene) {
    this.scene = scene;
    this.activeModifiers = [];
    this.inactivePool = [];
  }

  spawnModifier(config) {
    let modifier = this.inactivePool.pop();
    if (!modifier) {
      modifier = new ModifierContainer(this.scene);
    }
    modifier.activate(config);
    this.activeModifiers.push(modifier);
    return modifier;
  }

  update(dt, player, inputManager, pruneThreshold = 600) {
    const playerX = player.container.x;

    for (let i = this.activeModifiers.length - 1; i >= 0; i--) {
      const modifier = this.activeModifiers[i];
      modifier.update(dt);

      // Interaction check with player
      if (modifier.checkPlayerInteraction(player, inputManager)) {
        // Trigger modifier effect
        this.triggerModifierEffect(modifier, player);
      }

      // Off-screen pruning
      if (modifier.x < playerX - pruneThreshold) {
        modifier.deactivate();
        this.activeModifiers.splice(i, 1);
        this.inactivePool.push(modifier);
      }
    }
  }

  triggerModifierEffect(modifier, player) {
    const type = modifier.type;

    switch (type) {
      // Jump Pads
      case MODIFIER_TYPES.PAD_YELLOW:
        player.impulseJump(1.2);
        this.scene.events.emit('sfx', 'jump');
        break;
      case MODIFIER_TYPES.PAD_PINK:
        player.impulseJump(0.85);
        this.scene.events.emit('sfx', 'jump');
        break;
      case MODIFIER_TYPES.PAD_RED:
        player.impulseJump(1.6);
        this.scene.events.emit('sfx', 'jump');
        break;

      // Air Orbs
      case MODIFIER_TYPES.ORB_YELLOW:
        player.impulseJump(1.25);
        this.scene.events.emit('sfx', 'orb');
        break;
      case MODIFIER_TYPES.ORB_PINK:
        player.impulseJump(0.9);
        this.scene.events.emit('sfx', 'orb');
        break;
      case MODIFIER_TYPES.ORB_RED:
        player.impulseJump(1.65);
        this.scene.events.emit('sfx', 'orb');
        break;
      case MODIFIER_TYPES.ORB_BLUE_GRAVITY:
        player.setGravity(player.gravityDirection * -1);
        player.vy = 250 * player.gravityDirection;
        this.scene.events.emit('sfx', 'orb');
        break;
      case MODIFIER_TYPES.ORB_SLOW_MO:
        this.scene.events.emit('triggerSlowMo');
        this.scene.events.emit('sfx', 'orb');
        break;

      // Speed Portals
      case MODIFIER_TYPES.PORTAL_SPEED_0_5:
        player.setSpeedMultiplier(0.55);
        this.scene.events.emit('sfx', 'portal');
        break;
      case MODIFIER_TYPES.PORTAL_SPEED_1_0:
        player.setSpeedMultiplier(1.0);
        this.scene.events.emit('sfx', 'portal');
        break;
      case MODIFIER_TYPES.PORTAL_SPEED_2_0:
        player.setSpeedMultiplier(1.35);
        this.scene.events.emit('sfx', 'portal');
        break;
      case MODIFIER_TYPES.PORTAL_SPEED_4_0:
        player.setSpeedMultiplier(1.75);
        this.scene.events.emit('sfx', 'portal');
        break;

      // Mirror Portal
      case MODIFIER_TYPES.PORTAL_MIRROR:
        this.scene.events.emit('toggleMirrorMode');
        this.scene.events.emit('sfx', 'portal');
        break;

      // Vehicle Portals
      case MODIFIER_TYPES.PORTAL_VEHICLE_CUBE:
        player.setVehicle('CUBE');
        this.scene.events.emit('sfx', 'portal');
        break;
      case MODIFIER_TYPES.PORTAL_VEHICLE_ROCKET:
        player.setVehicle('ROCKET');
        this.scene.events.emit('sfx', 'portal');
        break;
      case MODIFIER_TYPES.PORTAL_VEHICLE_GRAVITY:
        player.setVehicle('GRAVITY_FLIP');
        this.scene.events.emit('sfx', 'portal');
        break;
      case MODIFIER_TYPES.PORTAL_VEHICLE_WAVE:
        player.setVehicle('WAVE');
        this.scene.events.emit('sfx', 'portal');
        break;
      case MODIFIER_TYPES.PORTAL_VEHICLE_UFO:
        player.setVehicle('UFO');
        this.scene.events.emit('sfx', 'portal');
        break;

      // Item Shield
      case MODIFIER_TYPES.ITEM_SHIELD:
        player.setShield(true);
        this.scene.events.emit('sfx', 'shield');
        break;
    }
  }

  clearAll() {
    for (const modifier of this.activeModifiers) {
      modifier.deactivate();
      this.inactivePool.push(modifier);
    }
    this.activeModifiers.length = 0;
  }
}

export class ModifierContainer {
  constructor(scene) {
    this.scene = scene;
    this.container = scene.add.container(0, 0);
    this.gfx = scene.add.graphics();
    this.container.add(this.gfx);

    this.type = MODIFIER_TYPES.PAD_YELLOW;
    this.x = 0;
    this.y = 0;
    this.radius = 24;
    this.used = false;
    this.animTime = 0;
  }

  activate(config) {
    this.type = config.type || MODIFIER_TYPES.PAD_YELLOW;
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.used = false;
    this.animTime = 0;

    this.container.setPosition(this.x, this.y);
    this.container.setVisible(true);

    this.drawGraphic();
  }

  deactivate() {
    this.container.setVisible(false);
  }

  drawGraphic() {
    const g = this.gfx;
    g.clear();

    const isOrb = this.type.startsWith('ORB_');
    const isPad = this.type.startsWith('PAD_');
    const isPortal = this.type.startsWith('PORTAL_');
    const isItem = this.type.startsWith('ITEM_');

    if (isPad) {
      let color = 0xffe600;
      if (this.type === MODIFIER_TYPES.PAD_PINK) color = 0xff00cc;
      if (this.type === MODIFIER_TYPES.PAD_RED) color = 0xff0044;

      g.fillStyle(color, 1);
      g.fillRect(-20, 10, 40, 10);
      g.lineStyle(2, 0xffffff, 1);
      g.strokeRect(-20, 10, 40, 10);
    } else if (isOrb) {
      let color = 0xffe600;
      if (this.type === MODIFIER_TYPES.ORB_PINK) color = 0xff00cc;
      if (this.type === MODIFIER_TYPES.ORB_RED) color = 0xff0044;
      if (this.type === MODIFIER_TYPES.ORB_BLUE_GRAVITY) color = 0x0088ff;
      if (this.type === MODIFIER_TYPES.ORB_SLOW_MO) color = 0x00ffcc;

      // Glowing outer ring
      g.lineStyle(3, color, 0.9);
      g.strokeCircle(0, 0, 22);
      // Inner circle
      g.fillStyle(color, 0.85);
      g.fillCircle(0, 0, 14);
      g.fillStyle(0xffffff, 0.9);
      g.fillCircle(0, 0, 6);
    } else if (isPortal) {
      let color = 0x00f0ff;
      if (this.type.includes('SPEED_0_5')) color = 0xffee00;
      if (this.type.includes('SPEED_2_0')) color = 0xff0055;
      if (this.type.includes('SPEED_4_0')) color = 0xff00ff;
      if (this.type.includes('MIRROR')) color = 0xaa00ff;

      if (this.type.includes('VEHICLE')) color = 0x00ff66;

      // Portal oval graphic
      g.lineStyle(4, color, 1);
      g.strokeEllipse(0, 0, 24, 70);
      g.fillStyle(color, 0.3);
      g.fillEllipse(0, 0, 24, 70);
      // Center line
      g.lineStyle(2, 0xffffff, 0.9);
      g.lineBetween(0, -30, 0, 30);
    } else if (isItem) {
      // Shield item
      g.fillStyle(0x00ffff, 0.8);
      g.fillCircle(0, 0, 16);
      g.lineStyle(3, 0xffffff, 1);
      g.strokeCircle(0, 0, 16);
    }
  }

  update(dt) {
    this.animTime += dt;
    const isOrb = this.type.startsWith('ORB_');
    const isPortal = this.type.startsWith('PORTAL_');

    if (isOrb) {
      // Pulsing pulse animation
      const scale = 1 + Math.sin(this.animTime * 6) * 0.08;
      this.container.setScale(scale);
    } else if (isPortal) {
      const pulse = 1 + Math.sin(this.animTime * 8) * 0.05;
      this.container.setScale(pulse);
    }
  }

  checkPlayerInteraction(player, inputManager) {
    if (this.used) return false;

    const pb = player.getBounds();
    const px = pb.x + pb.width / 2;
    const py = pb.y + pb.height / 2;
    const dist = Phaser.Math.Distance.Between(px, py, this.x, this.y);

    const isPad = this.type.startsWith('PAD_');
    const isOrb = this.type.startsWith('ORB_');
    const isPortal = this.type.startsWith('PORTAL_');
    const isItem = this.type.startsWith('ITEM_');

    if (isPad) {
      // Automatic trigger when player touches pad box
      const touchDist = 32;
      if (dist < touchDist) {
        this.used = true;
        return true;
      }
    } else if (isOrb) {
      // Trigger when player is within radius AND inputs tap
      const interactRadius = 48;
      if (dist < interactRadius && inputManager.isTapBuffered()) {
        this.used = true;
        inputManager.consumeTap();
        return true;
      }
    } else if (isPortal) {
      // Trigger when player passes through portal center
      if (Math.abs(px - this.x) < 20 && Math.abs(py - this.y) < 60) {
        this.used = true;
        return true;
      }
    } else if (isItem) {
      if (dist < 32) {
        this.used = true;
        this.container.setVisible(false);
        return true;
      }
    }

    return false;
  }
}
