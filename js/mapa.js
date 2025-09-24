
let totalCajas = 6; 
let cajasAgarradas = 0;
let tiempoRestante = 300; // 5 minutos
let intervalo;

// Mostrar HUD
const contadorEl = document.getElementById("contador");
const tiempoEl = document.getElementById("tiempo");

// Iniciar temporizador
function iniciarTimer() {
  intervalo = setInterval(() => {
    tiempoRestante--;
    tiempoEl.textContent = "Tiempo restante: " + tiempoRestante + "s";

    if (tiempoRestante <= 0) {
      clearInterval(intervalo);
      alert("¡Tiempo agotado! Perdiste 😢");
      location.reload(); // reinicia el juego
    }
  }, 1000);
}

// Eliminar cajas al hacer click con el crosshair
document.querySelector("#player").addEventListener("click", function (evt) {
  const intersected = evt.detail.intersectedEl;
  if (intersected && intersected.classList.contains("clickable")) {
    intersected.parentNode.removeChild(intersected);

    cajasAgarradas++;
    contadorEl.textContent = "Cajas: " + cajasAgarradas + " / " + totalCajas;

    if (cajasAgarradas >= totalCajas) {
      clearInterval(intervalo);
      alert("¡Ganaste! 🎉 Has recogido todas las cajas");
      location.reload();
    }
  }
});

// Inicia el temporizador cuando se cargue la escena
window.addEventListener("load", iniciarTimer);
