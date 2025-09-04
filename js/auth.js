// Inicialización de variables y eventos para el manejo de autenticación
const container = document.querySelector(".container");
const registerBtn = document.querySelector(".logIn");
const loginBtn = document.querySelector(".goRight");

// Control de animaciones de la UI (si las tienes en tu CSS)
if (registerBtn && container) {
    registerBtn.addEventListener("click", () => {
        container.classList.add("active");
    });
}
if (loginBtn && container) {
    loginBtn.addEventListener("click", () => {
        container.classList.remove("active");
    });
}

// Verificar sesión activa al cargar la página
$(function () {
    $.get("../api/check_session.php", function (resp) {
        if (resp.logged) {
            window.location.href = "../views/dashboard.php";
        }
    }, "json");
});

$(document).ready(function() {
    // Manejo del formulario de login
    $('#form-login').submit(function (event) {
        event.preventDefault();

        // Obtener valores de login
        var username = $.trim($('#username-login').val());
        var password = $.trim($('#password-login').val());

        if (!username || !password) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        // Petición AJAX para login
        $.ajax({
            url: '/PROYECTO-SURVIVAL-/api/auth_user.php',
            method: 'POST',
            data: { username: username, password: password },
            dataType: 'json',
            success: function (resp) {
                if (resp.status === "success") {
                    window.location.href = "../views/dashboard.php";
                } else {
                    alert(resp.message || "Credenciales inválidas.");
                }
            },
            error: function(xhr, status, error) {
                console.log("Error AJAX login:", error),
                alert("Ocurrió un error en el inicio de sesión.");
            }
        });
    });

    // Manejo del formulario de registro
    $('#form-signup').submit(function (event) {
        event.preventDefault();

        // Obtener valores de registro
        var username = $.trim($('#username-signup').val());
        var email = $.trim($('#email-signup').val());
        var password = $.trim($('#password-signup').val());

        if (!username || !email || !password) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        // Petición AJAX para registro
        $.ajax({
            url: '/PROYECTO-SURVIVAL-/api/reg_user.php',
            method: 'POST',
            data: { username: username, email: email, password: password },
            dataType: 'json',
            success: function (resp) {
                if (resp.status === "success") {
                    window.location.href = "../views/dashboard.php";
                } else {
                    alert(resp.message || "No se pudo registrar el usuario.");
                }
            },
            error: function(xhr, status, error) {
                console.log("Error AJAX registro:", error),
                alert("Ocurrió un error durante el registro.");
            }
        });
    });
});
