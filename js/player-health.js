AFRAME.registerComponent('player-health', {
  schema: {
    health: {type: 'number', default: 100},
    healthTextEl: {type: 'selector'} // Selector para el texto de la vida en la UI
  },

  init: function () {
    // Escucha el evento que lanzará el enemigo
    this.el.sceneEl.addEventListener('player-hit', this.onPlayerHit.bind(this));
    this.updateHealthText();
    console.log('Player health system inicializado.');
  },

  onPlayerHit: function (evt) {
    if (this.data.health <= 0) return; // Ya está derrotado

    // Reduce la vida (el enemigo puede especificar el daño en el evento)
    this.data.health -= evt.detail.damage || 10; // Daño por defecto: 10

    if (this.data.health <= 0) {
      this.data.health = 0;
      console.log("¡Has sido derrotado!");
      // Aquí podrías emitir un evento de 'game-over' o mostrar una pantalla de derrota
      this.el.sceneEl.emit('game-over');
    }

    this.updateHealthText();
    console.log("Vida restante: " + this.data.health);
  },

  updateHealthText: function () {
    // Actualiza el elemento de texto en la pantalla si existe
    if (this.data.healthTextEl) {
      this.data.healthTextEl.setAttribute('text', 'value', `Vida: ${this.data.health}`);
    }
  },

  remove: function () {
    // Limpia el listener cuando el componente se elimina
    this.el.sceneEl.removeEventListener('player-hit', this.onPlayerHit.bind(this));
  }
});