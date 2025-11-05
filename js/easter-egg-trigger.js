AFRAME.registerComponent('easter-egg-trigger', {
  schema: {
    soundEl: {type: 'selector'}, // Selector para la entidad de sonido
    imageSelector: {type: 'string'}, // Selector CSS para la imagen overlay
    cooldown: {type: 'number', default: 10000} // Tiempo de espera en ms
  },

  init: function () {
    this.isJumpscareActive = false; // Para saber si el susto está ocurriendo
    this.isOnCooldown = false; // Para saber si está en tiempo de espera
    this.imageEl = document.querySelector(this.data.imageSelector);
    this.jumpscare = this.jumpscare.bind(this);
    this.el.sceneEl.addEventListener('player-hit', this.jumpscare);

    if (!this.imageEl) {
      console.error('EASTER-EGG: No se encontró el elemento de imagen:', this.data.imageSelector);
    }
  },

  jumpscare: function() {
    const { soundEl, cooldown } = this.data;
    const soundComponent = soundEl.components.sound;

    if (this.isJumpscareActive || this.isOnCooldown || !soundEl || !this.imageEl) {
      return;
    }

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
  },

  remove: function () {
    this.el.sceneEl.removeEventListener('player-hit', this.jumpscare);
    clearTimeout(this.soundTimeout);
    clearTimeout(this.cooldownTimeout);
  }
});