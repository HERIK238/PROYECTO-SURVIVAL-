// lighting.js
AFRAME.registerComponent("setup-lighting", {
  init: function () {
    const sceneEl = this.el;

    // 🔦 Luz ambiental tenue (ilumina todo un poco)
    const ambient = document.createElement("a-entity");
    ambient.setAttribute("light", {
      type: "ambient",
      color: "#888", // gris suave
      intensity: 0.5
    });
    sceneEl.appendChild(ambient);

    // 💡 Luz direccional principal (como una lámpara en el techo)
    const mainLight = document.createElement("a-entity");
    mainLight.setAttribute("light", {
      type: "directional",
      color: "#ffffff",
      intensity: 0.8,
      castShadow: true
    });
    mainLight.setAttribute("position", "10 15 10");
    sceneEl.appendChild(mainLight);

    // 🔥 Luces puntuales en zonas clave (puedes duplicar con otras posiciones)
    const point1 = document.createElement("a-entity");
    point1.setAttribute("light", {
      type: "point",
      color: "#ffcc88", // cálido
      intensity: 1,
      distance: 20,
      decay: 2
    });
    point1.setAttribute("position", "0 5 0");
    sceneEl.appendChild(point1);

    const point2 = document.createElement("a-entity");
    point2.setAttribute("light", {
      type: "point",
      color: "#88ccff", // frío
      intensity: 0.7,
      distance: 25,
      decay: 2
    });
    point2.setAttribute("position", "-20 6 -20");
    sceneEl.appendChild(point2);

    const point3 = document.createElement("a-entity");
    point3.setAttribute("light", {
      type: "point",
      color: "#ffffff",
      intensity: 0.9,
      distance: 25,
      decay: 2
    });
    point3.setAttribute("position", "25 7 25");
    sceneEl.appendChild(point3);
  }
});
