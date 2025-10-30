document.addEventListener('DOMContentLoaded', () => {
  const scene = document.querySelector('a-scene');
  if (!scene) {
    console.error('Error: No se encontró la escena de A-Frame.');
    return;
  }

  const ambientSound = document.querySelector('#ambient-music');
  if (!ambientSound) {
    console.error('Error: No se encontró la entidad de sonido ambiental #ambient-music.');
    return;
  }

  scene.addEventListener('enter-vr', () => {
    ambientSound.components.sound.playSound();
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const scene = document.querySelector('a-scene');
  if (!scene) {
    console.error('SCENE-SETUP: No se encontró la escena de A-Frame.');
    return;
  }

  const ambientSound = document.querySelector('#ambient-music');
  if (!ambientSound) {
    console.error('SCENE-SETUP: No se encontró la entidad de sonido ambiental #ambient-music.');
    return;
  }

  // Función para iniciar la música y eliminar el listener
  const startMusic = () => {
    // Asegurarse de que el componente de sonido esté listo
    if (ambientSound.components.sound) {
      ambientSound.components.sound.playSound();
      console.log('SCENE-SETUP: Sonido ambiental iniciado por interacción del usuario.');
      // Eliminar el listener para que no se intente reproducir de nuevo
      document.body.removeEventListener('click', startMusic);
    }
  };

  // Esperar al primer clic en cualquier parte del cuerpo del documento
  document.body.addEventListener('click', startMusic, { once: true });
});