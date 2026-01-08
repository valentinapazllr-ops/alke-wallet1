// assets/js/recuperacióncontraseña.js

$(document).ready(function () {
    $('#recoveryForm').on('submit', function (e) {
        e.preventDefault();

        const email = $('#email').val().trim();
        const btn = $(this).find('button[type="submit"]');

        // Regex para validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            alert("⚠️ Por favor ingresa tu correo electrónico.");
            return;
        }

        if (!emailRegex.test(email)) {
            alert("⚠️ Por favor ingresa un correo electrónico válido.");
            return;
        }

        // Simular envío
        btn.prop('disabled', true).html('<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Enviando...');
        $('#progressBar').show();

        setTimeout(() => {
            $('#progressBar').hide();

            // Éxito simulado
            alert(`✅ ¡Listo! Hemos enviado un enlace de recuperación a: ${email}\n\nRevisa tu bandeja de entrada.`);

            // Resetear estado
            btn.prop('disabled', false).html('<i class="bi bi-send me-2"></i>Enviar Instrucciones');
            $('#email').val(''); // Limpiar campo

        }, 2000);
    });
});