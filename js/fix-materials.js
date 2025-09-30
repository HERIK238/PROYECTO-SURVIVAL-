// fix-materials.js
AFRAME.registerComponent('fix-materials', {
  init: function () {
    this.el.addEventListener('model-loaded', () => {
      this.el.object3D.traverse(node => {
        if (node.isMesh && node.material) {
          node.material.transparent = false; // Desactiva transparencia
          node.material.opacity = 1;         // Opacidad completa
          node.material.needsUpdate = true;  // Fuerza actualización
        }
      });
      console.log("✅ Materiales corregidos en:", this.el.id);
    });
  }
});
