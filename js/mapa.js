let totalCajas = 6; 
let cajasAgarradas = 0;
let tiempoRestante = 200; // 5 minutos
let intervalo;

const contadorEl = document.getElementById("contador");
const tiempoEl = document.getElementById("tiempo");
const timeoutOverlay = document.getElementById("timeout-overlay");
const retryBtn = document.getElementById("retry-btn");

// 🕒 Iniciar temporizador
function iniciarTimer() {
  intervalo = setInterval(() => {
    tiempoRestante--;
    tiempoEl.textContent = "Tiempo restante: " + tiempoRestante + "s";

    if (tiempoRestante <= 0) {
      clearInterval(intervalo);
      mostrarTimeoutOverlay(); // Muestra la alerta azul
    }
  }, 1000);
}

// 🧩 Mostrar alerta de tiempo agotado
function mostrarTimeoutOverlay() {
  timeoutOverlay.style.display = "flex"; // la muestra
}

// 🔄 Reintentar
retryBtn.addEventListener("click", () => {
  location.reload(); // reinicia el juego
});


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

// 🚪 Función para abrir la puerta (sin alerta)
function abrirPuerta() {
  const puertaEl = document.querySelector("#puerta");

  if (puertaEl) {
    // Emitir evento para activar la animación del componente puerta-control
    puertaEl.emit("abrir-puerta"); 
    console.log("🚪 La puerta se ha abierto automáticamente.");
  } else {
    console.warn("⚠️ No se encontró la puerta en la escena");
  }
}

// 🕹️ Inicia el temporizador al cargar la página
window.addEventListener("load", iniciarTimer);
