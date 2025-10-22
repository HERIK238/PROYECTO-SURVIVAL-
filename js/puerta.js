
AFRAME.registerComponent('puerta-control', {
  init: function () {
    const el = this.el;

    el.addEventListener('model-loaded', () => {
      const model = el.getObject3D('mesh');
      if (!model) return;

      // 🔧 Crear mezclador
      const mixer = new THREE.AnimationMixer(model);
      const clips = model.animations || [];

      console.log("🎬 Animaciones disponibles:", clips.map(c => c.name));

      // Buscar la animación
      const clip = THREE.AnimationClip.findByName(clips, "Door Open and Close");
      const action = mixer.clipAction(clip);

      // ⚙️ Configuración de la animación
      action.setLoop(THREE.LoopOnce);        // Solo se ejecuta una vez
      action.clampWhenFinished = true;       // Mantiene el último frame (la puerta abierta)
      action.paused = true;                  // No inicia sola
      action.enabled = true;                 // Asegura que no se reinicie
      action.timeScale = 1;                  // Velocidad normal

      this.mixer = mixer;
      this.action = action;
      this.abierta = false;

      // 🖱️ Click manual
      el.addEventListener('click', () => {
        if (!this.abierta && this.action) {
          console.log("🚪 Puerta abierta por clic");
          this.abrirPuerta();
        }
      });

      // 🔥 Evento automático (por las cajas)
      el.addEventListener("abrir-puerta", () => {
        if (!this.abierta && this.action) {
          console.log("🚪 Puerta abierta automáticamente (todas las cajas recogidas)");
          this.abrirPuerta();
        }
      });
    });
  },

  abrirPuerta: function () {
    this.abierta = true;
    this.action.reset();
    this.action.paused = false;
    this.action.play();

    // 🔒 Forzamos que se quede en el último frame al terminar
    this.action.onFinish = () => {
      this.action.paused = true;
      this.action.time = this.action.getClip().duration;
    };
  },

  tick: function (time, deltaTime) {
    if (this.mixer) this.mixer.update(deltaTime / 1000);
  }
});
