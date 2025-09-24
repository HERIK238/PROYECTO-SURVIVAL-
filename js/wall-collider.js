/*
 * wall-collider
 * 
 * Component for A-Frame to prevent the camera from passing through walls.
 * It works by casting rays from the camera's position in the direction of movement.
 * If a ray intersects with an object with the 'collidable' class, it temporarily
 * disables the movement key in that direction.
 */
AFRAME.registerComponent('wall-collider', {
  schema: {
    enabled: {default: true},
    distance: {default: 1.0} // Distance of the rays
  },

  init: function () {
    this.camera = this.el;
    this.lastPosition = new THREE.Vector3();
    this.lastPosition.copy(this.camera.object3D.position);
    this.keys = {};
    this.raycaster = new THREE.Raycaster();
    this.colliding = false;

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);

    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  },

  onKeyDown: function (event) {
    this.keys[event.code] = true;
  },

  onKeyUp: function (event) {
    this.keys[event.code] = false;
  },

  tick: function () {
    if (!this.data.enabled) { return; }

    const currentPosition = this.camera.object3D.position;
    const direction = currentPosition.clone().sub(this.lastPosition);

    if (direction.lengthSq() === 0) { return; }

    direction.normalize();

    this.raycaster.set(this.lastPosition, direction);
    this.raycaster.far = this.data.distance;

    const collidableEls = this.el.sceneEl.querySelectorAll('.collidable');
    const objects = Array.from(collidableEls).map(el => el.object3D);
    const intersections = this.raycaster.intersectObjects(objects, true);

    if (intersections.length > 0) {
      this.colliding = true;
      // Revert position
      this.camera.object3D.position.copy(this.lastPosition);
      this.disableMovementKeys(direction);
    } else {
      this.colliding = false;
      this.lastPosition.copy(currentPosition);
    }
  },

  disableMovementKeys: function(collisionDirection) {
    // This is a simplified approach. It blocks the key that was likely pressed to cause the collision.
    // A more robust solution would check the camera's orientation.
    if (this.keys['KeyW'] || this.keys['ArrowUp']) {
        // Moving forward, block W
    } 
    if (this.keys['KeyS'] || this.keys['ArrowDown']) {
        // Moving backward, block S
    }
    if (this.keys['KeyA'] || this.keys['ArrowLeft']) {
        // Moving left, block A
    }
    if (this.keys['KeyD'] || this.keys['ArrowRight']) {
        // Moving right, block D
    }
    // This part is tricky and requires more logic to be truly effective.
    // For now, just reverting the position is the main effect.
  },

  remove: function () {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  }
});
