// fix-materials.js
AFRAME.registerComponent('fix-materials', {
  init: function () {
    this.el.addEventListener('model-loaded', () => {
      // Crea un nuevo material con aspecto de fantasma
      const ghostMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff,       // Color blanco
          transparent: true,     // Activa la transparencia
          opacity: 0.7,          // Ligeramente transparente
          emissive: 0xffffff,    // Hace que brille un poco
          emissiveIntensity: 0.2 // Intensidad del brillo
      });

      this.el.object3D.traverse(node => {
        if (node.isMesh && node.material) {
          // Reemplaza el material del modelo por nuestro nuevo material
          node.material = ghostMaterial;
        }
      });

      console.log("✅ Materiales corregidos en:", this.el.id);
    });
  }
});
