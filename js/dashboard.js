$(function () {
    $.get("../api/check_session.php", function (resp) {
        if (!resp.logged) {
            // No hay sesión, volver al login
            window.location.href = "../views/auth.php";
        } else {
            // Ya logeado -> seguir cargando la vista
        }
    }, "json");
});

$(document).ready(function() {
    // Manejo del envío del formulario de inicio de sesión
    $('#logout-btn').click(function (event) {
        event.preventDefault();
        LogoutUser();
    });

    $('#homelab-btn').click(function (event) {
        event.preventDefault();
        window.location.href = "../views/auth.php";
    });

});

function LogoutUser() {
    $.ajax({
        url: '../api/logout.php',
        method: 'POST',
        success: function (response) {
            if (response.success === true) {
                console.log(response.message);
                window.location.href = "../views/auth.php";
            } else if (response.success === false) {
                console.log(response.message);
                alert(response.message);
            }
        },
        error: function(xhr, status, error) {
            console.log(status + ": " + error);
            alert(error);
        }
    });
}

// Image rotator for background
$(document).ready(function() {
    const images = [
        '../assets/icons/1.jpg',
        '../assets/icons/2.jpg',
        '../assets/icons/3.jpg',
        '../assets/icons/4.jpg'
    ];
    let currentIndex = 0;

    function changeBackground() {
        $('body').css('background-image', 'url("' + images[currentIndex] + '")');
        currentIndex = (currentIndex + 1) % images.length;
    }

    // Initial background
    changeBackground();

    // Change background every 5 seconds
    setInterval(changeBackground, 5000);
});