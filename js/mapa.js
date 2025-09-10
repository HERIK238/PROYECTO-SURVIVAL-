// Eliminar cajas al hacer click con el crosshair
document.querySelector("#player").addEventListener("click", function (evt) {
  const intersected = evt.detail.intersectedEl;
  if (intersected && intersected.classList.contains("clickable")) {
    intersected.parentNode.removeChild(intersected);
  }
});
