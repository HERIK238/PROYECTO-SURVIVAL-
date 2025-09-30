AFRAME.registerComponent('billboard', {
  tick: function () {
    const cam = document.querySelector('[camera]');
    if (!cam) return;
    this.el.object3D.lookAt(cam.object3D.position); // 🔹 Solo rota, no cambia escala
  }
});
