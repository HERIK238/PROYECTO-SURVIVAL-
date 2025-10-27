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
  cancelBtn.onclick = () => overlay.classList.remove('show');
}


    this.updateHealthText();
    console.log("Vida restante: " + this.data.health);
  },

  // FUNCIÓN AGREGADA: Lógica para terminar el juego
gameOver: function() {
    // 1. Desactivar controles del jugador y detener enemigos
    this.el.setAttribute('wasd-controls', 'enabled', false);
    this.el.setAttribute('look-controls', 'enabled', false);
    
    document.querySelectorAll('[homing-enemy]').forEach(enemy => {
        enemy.setAttribute('homing-enemy', 'speed', 0); 
    });

    // 2. Mostrar la ventana de confirmación para reiniciar
    setTimeout(() => {
        // 'confirm' devuelve 'true' si el usuario presiona Aceptar
        const shouldRestart = confirm("¡JUEGO TERMINADO! Has sido derrotado.\n\n¿Quieres reiniciar la partida?");

        if (shouldRestart) {
            // Reinicia el juego recargando la página.
            window.location.reload(); 
        } else {
            // Opcional: Redirigir al menú principal si no quiere reiniciar
            window.location.href = '../views/dashboard.php';
        }
    }, 100); 
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