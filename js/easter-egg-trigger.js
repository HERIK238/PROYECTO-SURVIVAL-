AFRAME.registerComponent('easter-egg-trigger', {
  schema: {
    player: {type: 'selector', default: '#player'},
    distance: {type: 'number', default: 4}, // Distancia en metros para activar el susto
    soundEl: {type: 'selector'}, // Selector para la entidad de sonido
    imageSelector: {type: 'string'}, // Selector CSS para la imagen overlay
    cooldown: {type: 'number', default: 10000} // Tiempo de espera en ms
  },

  init: function () {
    this.playerPos = new THREE.Vector3();
    this.eggPos = new THREE.Vector3();
    this.isJumpscareActive = false; // Para saber si el susto está ocurriendo
    this.isOnCooldown = false; // Para saber si está en tiempo de espera
    this.imageEl = document.querySelector(this.data.imageSelector);

    if (!this.imageEl) {
      console.error('EASTER-EGG: No se encontró el elemento de imagen:', this.data.imageSelector);
    }
  },

  tick: function () {
    const { player, distance, soundEl } = this.data;

    // Si el susto está activo, en cooldown, o falta algo, no hacer nada.
    if (this.isJumpscareActive || this.isOnCooldown || !player || !soundEl || !this.imageEl) {
      return;
    }

    // Obtener posiciones
    player.object3D.getWorldPosition(this.playerPos);
    this.el.object3D.getWorldPosition(this.eggPos);

    const currentDistance = this.playerPos.distanceTo(this.eggPos);

    // Si el jugador está cerca y no hay cooldown
    if (currentDistance < distance) {
      this.triggerJumpscare();
    }
  },

  triggerJumpscare: function() {
    const { soundEl, cooldown } = this.data;
    const soundComponent = soundEl.components.sound;

    this.isJumpscareActive = true;
    this.isOnCooldown = true;

    console.log("👻 ¡Susto del Easter Egg activado!");
    this.imageEl.classList.add('show');
    soundComponent.playSound();

    // Ocultar la imagen cuando el sonido termine
    const soundDuration = soundComponent.pool.children[0].buffer.duration * 1000; // en milisegundos
    this.soundTimeout = setTimeout(() => {
      this.imageEl.classList.remove('show');
      this.isJumpscareActive = false;
      console.log(`👻 Susto terminado. Enfriamiento de ${cooldown / 1000}s iniciado.`);
      // Iniciar el cooldown DESPUÉS de que el susto termine
      this.cooldownTimeout = setTimeout(() => {
        this.isOnCooldown = false;
        console.log("👻 Cooldown terminado. ¡Listo para el próximo susto!");
      }, cooldown);
    }, soundDuration);
  }
});