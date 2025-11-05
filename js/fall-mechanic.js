
AFRAME.registerComponent('fall-mechanic', {
  schema: {
    fallChance: { type: 'number', default: 0.001 }, // Small chance per tick
    spacebarPresses: { type: 'number', default: 5 },
    healthTextEl: {type: 'selector'}
  },

  init: function () {
    this.isFallen = false;
    this.pressCount = 0;
    this.player = this.el;
    this.initialPosition = Object.assign({}, this.player.getAttribute('position'));
    this.healthText = this.data.healthTextEl;
    this.initialHealthTextPosition = Object.assign({}, this.healthText.getAttribute('position'));

    // Create UI text
    this.fallText = document.createElement('a-entity');
    this.fallText.setAttribute('text', {
      value: 'Presiona ESPACIO para levantarte',
      align: 'center',
      color: 'white',
      width: 2
    });
    this.fallText.setAttribute('position', '0 -0.2 -1');
    this.fallText.setAttribute('visible', 'false');
    this.player.appendChild(this.fallText);

    this.handleKeyDown = this.handleKeyDown.bind(this);
  },

  tick: function () {
    if (this.isFallen) return;

    const isMoving = this.player.components['wasd-controls'] && (
        this.player.components['wasd-controls'].keys.KeyW ||
        this.player.components['wasd-controls'].keys.KeyA ||
        this.player.components['wasd-controls'].keys.KeyS ||
        this.player.components['wasd-controls'].keys.KeyD
    );

    if (isMoving && Math.random() < this.data.fallChance) {
      this.fall();
    }
  },

  fall: function () {
    if (this.isFallen) return;

    console.log("Player has fallen!");
    this.isFallen = true;
    this.pressCount = 0;

    // Lower camera and disable movement
    this.player.setAttribute('wasd-controls', 'enabled', false);
    const currentPosition = this.player.getAttribute('position');
    this.player.setAttribute('position', { x: currentPosition.x, y: 0.2, z: currentPosition.z });

    // Show text
    this.fallText.setAttribute('position', '0 0.5 -1');
    this.healthText.setAttribute('position', '0 0.6 -1.5');
    this.fallText.setAttribute('visible', 'true');

    // Listen for spacebar
    window.addEventListener('keydown', this.handleKeyDown);
  },

  handleKeyDown: function (event) {
    if (event.code !== 'Space') return;

    this.pressCount++;
    this.fallText.setAttribute('text', 'value', `LEVANTATE! ${this.pressCount} / ${this.data.spacebarPresses}`);


    if (this.pressCount >= this.data.spacebarPresses) {
      this.getUp();
    }
  },

  getUp: function () {
    console.log("Player got up!");
    this.isFallen = false;

    // Restore camera and movement
    this.player.setAttribute('wasd-controls', 'enabled', true);
    const currentPosition = this.player.getAttribute('position');
    this.player.setAttribute('position', { x: currentPosition.x, y: this.initialPosition.y, z: currentPosition.z });
    this.healthText.setAttribute('position', this.initialHealthTextPosition);

    // Hide text
    this.fallText.setAttribute('visible', 'false');

    // Stop listening for spacebar
    window.removeEventListener('keydown', this.handleKeyDown);
  }
});
