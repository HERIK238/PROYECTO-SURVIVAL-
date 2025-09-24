// js/modal.js
// ──────────────────────────────────────────────
// Envía el formulario del modal para crear usuario
// ──────────────────────────────────────────────

$(document).ready(function () {

    // Captura el evento submit del formulario
    $('#formUsuarioDashboard').on('submit', function (e) {
        e.preventDefault(); // Evita el envío normal y la recarga

        // Serializa todos los campos del formulario
        var datos = $(this).serialize();

        // Petición Ajax al endpoint que acabamos de crear
        $.ajax({
            url: '/PROYECTO-SURVIVAL-/api/crear_usuario_modal.php', // ⚠️ Ajusta la ruta según la ubicación real del dashboard
            type: 'POST',
            data: datos,
            success: function (respuesta) {

                // Si la respuesta viene en string la convertimos a objeto
                var r = (typeof respuesta === 'string') ? JSON.parse(respuesta) : respuesta;

                if (r.ok) {
                    // ✅ Usuario creado correctamente
                    alert(r.mensaje);

                    // Cerrar modal
                    $('#crearUsuarioModal').modal('hide');

                    // Limpiar formulario
                    $('#formUsuarioDashboard')[0].reset();
                } else {
                    // ❗ Hubo un error que vino desde el PHP
                    alert('Error: ' + (r.error || 'Error desconocido'));
                }
            },
            error: function (xhr) {
                // ❗ Error de red o respuesta no válida
                alert('Error al enviar los datos. Código: ' + xhr.status);
            }
        });
    });

});
