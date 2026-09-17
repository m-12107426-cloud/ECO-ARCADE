import { HAZARD_TYPES } from '../entities/Hazards.js';
import { MODIFIER_TYPES } from '../entities/Modifiers.js';

export function createShowcaseLevel(hazardPool, modifierPool) {
  const levelLength = 16000; // Total track length in pixels

  // Ground & Ceiling Platforms (Decorations / Static structures)
  const hazards = [
    // Section 1: Cube Intro (Spikes & Jump Pads)
    { type: HAZARD_TYPES.SPIKE, x: 800, y: 560 },
    { type: HAZARD_TYPES.SPIKE, x: 1200, y: 560 },
    { type: HAZARD_TYPES.SPIKE, x: 1240, y: 560 },
    { type: HAZARD_TYPES.SAWBLADE, x: 1600, y: 500, width: 60, height: 60 },

    // Section 2: Rocket Transition
    { type: HAZARD_TYPES.SPIKE, x: 2800, y: 560 },
    { type: HAZARD_TYPES.SPIKE, x: 3000, y: 120, rotation: Math.PI },
    { type: HAZARD_TYPES.SAWBLADE, x: 3300, y: 340, width: 80, height: 80 },
    { type: HAZARD_TYPES.SWEEPING_LASER, x: 3800, y: 150, height: 350 },

    // Section 3: Gravity Flip Section
    { type: HAZARD_TYPES.SPIKE, x: 4800, y: 120, rotation: Math.PI },
    { type: HAZARD_TYPES.SPIKE, x: 5100, y: 560 },
    { type: HAZARD_TYPES.FALLING_CEILING, x: 5500, y: 100, width: 120, height: 40 },

    // Section 4: Wave Section (Tight Obstacle Course)
    { type: HAZARD_TYPES.SAWBLADE, x: 6500, y: 250, width: 70, height: 70 },
    { type: HAZARD_TYPES.SAWBLADE, x: 6800, y: 450, width: 70, height: 70 },
    { type: HAZARD_TYPES.SAWBLADE, x: 7100, y: 220, width: 70, height: 70 },
    { type: HAZARD_TYPES.SWEEPING_LASER, x: 7500, y: 150, height: 380 },

    // Section 5: UFO & Air Orbs Section
    { type: HAZARD_TYPES.SPIKE, x: 8600, y: 560 },
    { type: HAZARD_TYPES.SPIKE, x: 8640, y: 560 },
    { type: HAZARD_TYPES.SAWBLADE, x: 9100, y: 380, width: 90, height: 90 },
    { type: HAZARD_TYPES.FALLING_CEILING, x: 9600, y: 100, width: 160, height: 40 },

    // Final Climax Hybrid Section
    { type: HAZARD_TYPES.SPIKE, x: 10800, y: 560 },
    { type: HAZARD_TYPES.SAWBLADE, x: 11200, y: 300, width: 100, height: 100 },
    { type: HAZARD_TYPES.SWEEPING_LASER, x: 11800, y: 150, height: 380 },
    { type: HAZARD_TYPES.SPIKE, x: 12400, y: 560 },
    { type: HAZARD_TYPES.SPIKE, x: 12440, y: 560 },
    { type: HAZARD_TYPES.SPIKE, x: 12480, y: 560 }
  ];

  const modifiers = [
    // Intro Orbs & Pads
    { type: MODIFIER_TYPES.PAD_YELLOW, x: 1100, y: 570 },
    { type: MODIFIER_TYPES.ORB_YELLOW, x: 1500, y: 420 },
    { type: MODIFIER_TYPES.ITEM_SHIELD, x: 1900, y: 480 },

    // Portal -> Rocket Form & Speed Up
    { type: MODIFIER_TYPES.PORTAL_VEHICLE_ROCKET, x: 2300, y: 350 },
    { type: MODIFIER_TYPES.PORTAL_SPEED_2_0, x: 2500, y: 350 },
    { type: MODIFIER_TYPES.ORB_SLOW_MO, x: 3500, y: 300 },

    // Portal -> Gravity Flip Form
    { type: MODIFIER_TYPES.PORTAL_VEHICLE_GRAVITY, x: 4400, y: 350 },
    { type: MODIFIER_TYPES.ORB_BLUE_GRAVITY, x: 4900, y: 350 },
    { type: MODIFIER_TYPES.PAD_RED, x: 5300, y: 570 },

    // Portal -> Wave Form
    { type: MODIFIER_TYPES.PORTAL_VEHICLE_WAVE, x: 6100, y: 350 },
    { type: MODIFIER_TYPES.PORTAL_MIRROR, x: 6300, y: 350 },
    { type: MODIFIER_TYPES.PORTAL_SPEED_4_0, x: 7000, y: 350 },

    // Portal -> UFO Form
    { type: MODIFIER_TYPES.PORTAL_VEHICLE_UFO, x: 8100, y: 350 },
    { type: MODIFIER_TYPES.PORTAL_SPEED_1_0, x: 8300, y: 350 },
    { type: MODIFIER_TYPES.ORB_PINK, x: 8800, y: 380 },
    { type: MODIFIER_TYPES.ORB_RED, x: 9300, y: 320 },
    { type: MODIFIER_TYPES.ITEM_SHIELD, x: 9900, y: 350 },

    // Portal -> Return to Standard Cube for Grand Finale
    { type: MODIFIER_TYPES.PORTAL_VEHICLE_CUBE, x: 10400, y: 350 },
    { type: MODIFIER_TYPES.PORTAL_SPEED_2_0, x: 10600, y: 350 },
    { type: MODIFIER_TYPES.ORB_YELLOW, x: 11100, y: 420 },
    { type: MODIFIER_TYPES.ORB_YELLOW, x: 11500, y: 380 },
    { type: MODIFIER_TYPES.PAD_RED, x: 12200, y: 570 }
  ];

  // Spawn into hazard and modifier pools
  hazards.forEach(h => hazardPool.spawnHazard(h));
  modifiers.forEach(m => modifierPool.spawnModifier(m));

  return levelLength;
}
