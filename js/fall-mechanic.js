
AFRAME.registerComponent('fall-mechanic', {
  schema: {
    fallChance: { type: 'number', default: 0.001 }, // Small chance per tick
    spacebarPresses: { type: 'number', default: 10 }
  },

  init: function () {
    this.isFallen = false;
    this.pressCount = 0;
    this.player = this.el;
    this.initialHeight = this.player.getAttribute('camera').userHeight || 1.6;

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
    this.player.setAttribute('camera', 'userHeight', 0.2);

    // Show text
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
    this.player.setAttribute('camera', 'userHeight', this.initialHeight);

    // Hide text
    this.fallText.setAttribute('visible', 'false');

    // Stop listening for spacebar
    window.removeEventListener('keydown', this.handleKeyDown);
  }
});
