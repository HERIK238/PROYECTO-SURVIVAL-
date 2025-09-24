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

        // Petición Ajax al endpoint PHP
        $.ajax({
            url: '/PROYECTO-SURVIVAL-/api/crear_usuario_modal.php', // Ajusta según la ubicación real
            type: 'POST',
            data: datos,
            dataType: 'json', // Espera respuesta JSON
            success: function (r) {

                // Manejo de respuesta según status
                if (r.status === 'success') {
                    // ✅ Usuario creado correctamente
                    alert(r.message);
                } else {
                    // ❗ Error del PHP
                    alert('Error: ' + r.message);
                }
            },
            error: function (xhr, status, error) {
                // ❗ Error de red o del servidor
                alert('Ocurrió un error. Revisa los datos e inténtalo de nuevo.');
                console.error("Error AJAX:", xhr.responseText);
            },
            complete: function() {
                // Este bloque se ejecuta SIEMPRE (con éxito o con error)
                $('#crearUsuarioModal').modal('hide'); // Cierra el modal
                $('#formUsuarioDashboard')[0].reset(); // Limpia el formulario
            }
        });
    });

});
