// assets/js/menu.js

$(document).ready(function () {
    console.log("Menú cargado. JQuery listo.");

    // Manejo de navegación con retraso para mostrar el overlay
    $('.nav-delay').on('click', function (e) {
        e.preventDefault(); // Evitar navegación inmediata

        const url = $(this).attr('href');
        const name = $(this).data('name');
        const overlay = $('#redirectOverlay');
        const screenNameSpan = $('#screenName');

        // Mostrar nombre y overlay
        screenNameSpan.text(name);
        overlay.removeClass('d-none').addClass('d-flex');

        // Esperar y redirigir
        setTimeout(() => {
            window.location.href = url;
        }, 1000); // 1 segundo de delay
    });
});