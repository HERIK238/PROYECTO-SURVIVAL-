AFRAME.registerComponent('homing-enemy', {
  schema: {
    speed: {type: 'number', default: 1},
    target: {type: 'selector', default: '[camera]'},
    attackCooldown: {type: 'number', default: 1500}, // Tiempo entre ataques (en milisegundos)
    damage: {type: 'number', default: 10} // Daño inicial del enemigo
  },

  init: function () {
    // Vectores para reutilizar y no crear nuevos en cada tick (mejor rendimiento)
    this.targetPosition = new THREE.Vector3();
    this.enemyPosition = new THREE.Vector3();
    this.direction = new THREE.Vector3();
    this.timeSinceLastAttack = 0; // Contador para el cooldown

    // Bindeamos la función para que 'this' funcione correctamente dentro de ella
    this.onObjectGrabbed = this.increaseDifficulty.bind(this);
    // Escuchamos el evento personalizado en la escena
    this.el.sceneEl.addEventListener('object-grabbed', this.onObjectGrabbed);
  },

  tick: function (time, timeDelta) {
    const targetEl = this.data.target;
    if (!targetEl) { return; }

    // 1. Obtener la posición del jugador (cámara)
    targetEl.object3D.getWorldPosition(this.targetPosition);

    // 2. Obtener la posición del enemigo
    this.el.object3D.getWorldPosition(this.enemyPosition);

    // Para que el enemigo se mueva solo en el plano horizontal (XZ),
    // ignoramos la diferencia de altura (Y).
    this.targetPosition.y = this.enemyPosition.y;

    // 3. Calcular la distancia
    const distance = this.enemyPosition.distanceTo(this.targetPosition);

    // Aumentamos el contador de tiempo desde el último ataque
    this.timeSinceLastAttack += timeDelta;

    // 4. Comprobar si está en rango de ataque
    if (distance < 0.8) {
      // Si está en rango, intenta atacar en lugar de moverse
      if (this.timeSinceLastAttack >= this.data.attackCooldown) {
        this.attack();
        this.timeSinceLastAttack = 0; // Reinicia el contador
      }
      // Importante: Hacemos 'return' para que no ejecute el código de movimiento
      return;
    }

    // 5. Si no está en rango de ataque, se mueve
    this.direction.subVectors(this.targetPosition, this.enemyPosition).normalize();
    const speed = this.data.speed;
    const moveDistance = speed * (timeDelta / 1000);
    this.el.object3D.position.add(this.direction.multiplyScalar(moveDistance));

    // Opcional: Hacer que el enemigo siempre mire al jugador
    this.el.object3D.lookAt(this.targetPosition);
  },

  attack: function() {
    // Aquí va la lógica del ataque.
    console.log("¡El enemigo te ataca!");

    // Emite un evento en la escena para avisar que el jugador ha sido golpeado.
    // El componente 'player-health' escuchará este evento.
    this.el.sceneEl.emit('player-hit', { damage: this.data.damage });
  },

  increaseDifficulty: function() {
    // Aumenta la velocidad y el daño en una pequeña cantidad
    this.data.speed += 1.5; // Aumento de velocidad
    this.data.damage += 5;   // Aumento de daño
    console.log(`¡El enemigo se ha vuelto más fuerte! Nueva velocidad: ${this.data.speed.toFixed(2)}, Nuevo daño: ${this.data.damage}`);
  },

  remove: function() {
    // Limpiamos el listener cuando el componente es eliminado para evitar fugas de memoria
    this.el.sceneEl.removeEventListener('object-grabbed', this.onObjectGrabbed);
  }
});