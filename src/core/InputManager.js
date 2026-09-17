/**
 * InputManager - Handles multi-input mapping (Space, Up Arrow, Click, Touch)
 * with input buffering to ensure precise jump and tap registering in rhythm platforming.
 */
export class InputManager {
  constructor(scene) {
    this.scene = scene;
    this.isPressed = false;
    this.bufferTimer = 0;
    this.bufferWindowMs = 120; // 120ms input buffer window
    this.hasActiveTap = false;

    this.initListeners();
  }

  initListeners() {
    // Keyboard
    const spaceKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    const upKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

    const onPressDown = () => {
      this.isPressed = true;
      this.bufferTimer = this.scene.time.now + this.bufferWindowMs;
      this.hasActiveTap = true;
    };

    const onPressUp = () => {
      this.isPressed = false;
      this.hasActiveTap = false;
    };

    spaceKey.on('down', onPressDown);
    spaceKey.on('up', onPressUp);
    upKey.on('down', onPressDown);
    upKey.on('up', onPressUp);

    // Pointer / Touch
    this.scene.input.on('pointerdown', () => {
      onPressDown();
    });

    this.scene.input.on('pointerup', () => {
      onPressUp();
    });
  }

  update() {
    // Expire buffer if time window passed and not actively holding
    if (this.scene.time.now > this.bufferTimer && !this.isPressed) {
      this.hasActiveTap = false;
    }
  }

  isDown() {
    return this.isPressed;
  }

  isTapBuffered() {
    return this.hasActiveTap || (this.scene.time.now <= this.bufferTimer);
  }

  consumeTap() {
    this.hasActiveTap = false;
    this.bufferTimer = 0;
  }
}
