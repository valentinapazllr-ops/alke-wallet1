// assets/js/index.js

$(document).ready(function () {
    $('#loginForm').on('submit', function (e) {
        e.preventDefault();

        const email = $('#email').val().trim();
        const password = $('#password').val().trim();
        const btn = $(this).find('button[type="submit"]');

        // Simple Validation
        if (!email || !password) {
            alert('⚠️ Por favor completa todos los campos.');
            return;
        }

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('⚠️ Por favor ingresa un correo electrónico válido.');
            return;
        }

        // Simulate Loading
        const originalText = btn.html();
        btn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm"></span> Ingresando...');

        setTimeout(() => {
            // Mock Login (Accept any valid email format for demo purposes)
            // Or specific: if (email === "admin@wallet.com" && password === "1234")

            // For better UX in this demo, let's allow access
            // Reset button
            btn.prop('disabled', false).html(originalText);

            // Redirect
            window.location.href = "menu.html";
        }, 1500);
    });
});
