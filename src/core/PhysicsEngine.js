/**
 * PhysicsEngine - Handles fixed-timestep sub-pixel collision physics
 * with AABB and tile / hazard precision collision resolution.
 */
export class PhysicsEngine {
  constructor(fixedStepSeconds = 1 / 60) {
    this.fixedStep = fixedStepSeconds;
    this.accumulator = 0;
  }

  /**
   * Run physics ticks with sub-pixel collision step
   * @param {number} deltaMs - Frame delta in milliseconds
   * @param {Function} updateCallback - Called for each physics step
   */
  step(deltaMs, updateCallback) {
    let deltaSec = deltaMs / 1000;
    // Cap maximum frame time to prevent spiraling after lag spikes
    if (deltaSec > 0.1) deltaSec = 0.1;

    this.accumulator += deltaSec;

    while (this.accumulator >= this.fixedStep) {
      updateCallback(this.fixedStep);
      this.accumulator -= this.fixedStep;
    }
  }

  /**
   * Precise AABB intersection with sub-pixel bounds
   */
  static checkAABB(rectA, rectB) {
    return (
      rectA.x < rectB.x + rectB.width &&
      rectA.x + rectA.width > rectB.x &&
      rectA.y < rectB.y + rectB.height &&
      rectA.y + rectA.height > rectB.y
    );
  }

  /**
   * Circle to AABB sub-pixel collision test (e.g. for Sawblades & Orbs)
   */
  static checkCircleAABB(circle, rect) {
    const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
    const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));

    const distanceX = circle.x - closestX;
    const distanceY = circle.y - closestY;

    const distanceSquared = distanceX * distanceX + distanceY * distanceY;
    return distanceSquared < circle.radius * circle.radius;
  }
}
