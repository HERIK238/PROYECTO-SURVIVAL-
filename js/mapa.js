let totalCajas = 6; 
let cajasAgarradas = 0;
let tiempoRestante = 300; // 5 minutos
let intervalo;

// 🎯 Elementos del HUD
const contadorEl = document.getElementById("contador");
const tiempoEl = document.getElementById("tiempo");

// 🕒 Iniciar temporizador
function iniciarTimer() {
  intervalo = setInterval(() => {
    tiempoRestante--;
    tiempoEl.textContent = "Tiempo restante: " + tiempoRestante + "s";

    if (tiempoRestante <= 0) {
      clearInterval(intervalo);
      alert("⏰ ¡Tiempo agotado! Perdiste 😢");
      location.reload(); // reinicia el juego
    }
  }, 1000);
}

// 🎮 Detectar clic en objetos con clase "clickable"
document.querySelector("#player").addEventListener("click", function (evt) {
  const intersected = evt.detail.intersectedEl;

  if (intersected && intersected.classList.contains("clickable")) {
    // Eliminar caja
    intersected.parentNode.removeChild(intersected);

    cajasAgarradas++;
    contadorEl.textContent = "📦 Cajas: " + cajasAgarradas + " / " + totalCajas;

    // Emitir evento global (otros componentes pueden reaccionar)
    document.querySelector('a-scene').emit('object-grabbed');

    // ✅ Si ya recogió todas las cajas...
    if (cajasAgarradas >= totalCajas) {
      clearInterval(intervalo);
      console.log("✅ Todas las cajas recogidas. Abriendo puerta...");
      abrirPuerta();
    }
  }
});

// 🚪 Función para abrir la puerta
function abrirPuerta() {
  const puertaEl = document.querySelector("#puerta");

  if (puertaEl) {
    puertaEl.emit("abrir-puerta"); // 🔥 activa la animación del componente puerta-control
    setTimeout(() => {
      alert("🎉 ¡Has ganado! La puerta se ha abierto 🚪");
    }, 500);
  } else {
    console.warn("⚠️ No se encontró la puerta en la escena");
  }
}

// 🕹️ Inicia el temporizador al cargar la página
window.addEventListener("load", iniciarTimer);
