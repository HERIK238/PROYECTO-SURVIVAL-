AFRAME.registerComponent('player-health', {
  schema: {
    health: {type: 'number', default: 100},
    healthTextEl: {type: 'selector'}
  },

  init: function () {
    // Asegurarse de que 'this' se refiera al componente
    this.onPlayerHitBound = this.onPlayerHit.bind(this);
    this.el.sceneEl.addEventListener('player-hit', this.onPlayerHitBound);
    this.updateHealthText();
    console.log('Player health system inicializado.');
  },

  onPlayerHit: function (evt) {
    if (this.data.health <= 0) return; // Ya está derrotado

    // Reduce la vida, asegurando que no sea negativa
    this.data.health -= evt.detail.damage || 10;
    this.data.health = Math.max(0, this.data.health);

    if (this.data.health === 0) {
  const overlay = document.getElementById('gameover-overlay');
  overlay.classList.add('show');

  const restartBtn = document.getElementById('restart-btn');
  const cancelBtn = document.getElementById('cancel-btn');

  restartBtn.onclick = () => location.reload();
  // Redirige al dashboard cuando se presiona "Cancelar".
  cancelBtn.onclick = () => {
    window.location.href = '../views/dashboard.php';
  };

    // Desactivar controles del jugador para que no se pueda mover
    this.el.setAttribute('wasd-controls', 'enabled', false);
    this.el.setAttribute('look-controls', 'enabled', false);

    // Detener a los enemigos
    document.querySelectorAll('[homing-enemy]').forEach(enemy => {
        enemy.setAttribute('homing-enemy', 'speed', 0);
    });
}

    this.updateHealthText();
    console.log("Vida restante: " + this.data.health);
  },

  updateHealthText: function () {
    // Actualiza el elemento de texto en la pantalla si existe
    if (this.data.healthTextEl) {
        // Mejorar la visibilidad del texto si la vida es baja
        const color = this.data.health <= 20 ? 'red' : 'white';
        this.data.healthTextEl.setAttribute('text', `value: Vida: ${this.data.health}; color: ${color};`);
    }
  },

  remove: function () {
    // Limpia el listener
    this.el.sceneEl.removeEventListener('player-hit', this.onPlayerHitBound);
  }
});