AFRAME.registerComponent('orthographic-camera', {
  init: function () {
    const el = this.el;
    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 15;

    const camera = new THREE.OrthographicCamera(
      -frustumSize * aspect / 2,
      frustumSize * aspect / 2,
      frustumSize / 2,
      -frustumSize / 2,
      0.1,
      1000
    );

    el.setObject3D('camera', camera);

    // Para evitar errores con look-controls
    el.object3D.updateMatrixWorld = function () {
      THREE.Object3D.prototype.updateMatrixWorld.call(this, true);
    };

    // Actualizar proyección al cambiar tamaño de ventana
    window.addEventListener('resize', () => {
      const aspect = window.innerWidth / window.innerHeight;
      camera.left = -frustumSize * aspect / 2;
      camera.right = frustumSize * aspect / 2;
      camera.top = frustumSize / 2;
      camera.bottom = -frustumSize / 2;
      camera.updateProjectionMatrix();
    });
  }
});
