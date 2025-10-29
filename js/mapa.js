let totalCajas = 6; 
let cajasAgarradas = 0;
let tiempoRestante = 200;
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
      mostrarTimeoutOverlay();
    }
  }, 1000);
}

// 🧩 Mostrar alerta tiempo agotado
function mostrarTimeoutOverlay() {
  timeoutOverlay.style.display = "flex";
}

// 🔄 Reintentar
retryBtn.addEventListener("click", () => {
  location.reload();
});

// 🎮 Obtener cajas
document.querySelector("#player").addEventListener("click", function (evt) {
  const intersected = evt.detail.intersectedEl;

  if (intersected && intersected.classList.contains("clickable")) {
    intersected.parentNode.removeChild(intersected);

    cajasAgarradas++;
    contadorEl.textContent = "📦 Cajas: " + cajasAgarradas + " / " + totalCajas;

    document.querySelector('a-scene').emit('object-grabbed');

    if (cajasAgarradas >= totalCajas) {
      clearInterval(intervalo);
      console.log("✅ Todas las cajas recogidas. Abriendo puerta...");
      abrirPuerta();
    }
  }
});

// 🚪 Abrir puerta
function abrirPuerta() {
  const puertaEl = document.querySelector("#puerta");

  if (puertaEl) {
    puertaEl.emit("abrir-puerta");
    console.log("🚪 La puerta se ha abierto automáticamente.");
  }
}

/*  ⬇️⬇️⬇️  AQUI VA LA FUNCIÓN DE VICTORIA  ⬇️⬇️⬇️ */
function mostrarMensajeVictoria() {
  Swal.fire({
    title: "🎉 ¡HAS ESCAPADO! 🎉",
    text: "Has ganado el juego.",
    icon: "success",
    allowOutsideClick: false,
    allowEscapeKey: false,
    confirmButtonText: "Aceptar"
  });
}

/* (Opcional) Detener enemigo al ganar */
function detenerJuego() {
  const enemy = document.querySelector("#enemy");
  if (enemy && enemy.components["homing-enemy"]) {
    enemy.components["homing-enemy"].data.speed = 0;
  }
}

/* ✅ Detección cuando pasas por la puerta */
AFRAME.registerComponent("win-check", {
  tick: function () {
    const player = document.querySelector("#player");
    const puerta = document.querySelector("#puerta");

    const puertaControl = puerta.components["puerta-control"];
    if (!puertaControl || !puertaControl.abierta) return;

    const playerPos = player.object3D.position;
    const puertaPos = puerta.object3D.position;

    const dist = playerPos.distanceTo(puertaPos);

    if (dist < 3) {
      detenerJuego();      // <---- SE LLAMA AQUÍ
      mostrarMensajeVictoria(); // <---- SE LLAMA AQUÍ
    }
  }
});

// 🕹️ Iniciar temporizador
window.addEventListener("load", iniciarTimer);
