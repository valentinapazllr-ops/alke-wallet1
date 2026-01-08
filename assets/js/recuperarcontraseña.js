document.addEventListener('DOMContentLoaded', () => {
    const recoveryForm = document.getElementById('recoveryForm');
    const emailInput = document.getElementById('email');
    const btnSubmit = document.getElementById('btnSubmit');

    recoveryForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se recargue

        const email = emailInput.value.trim();

        // Validación básica
        if (email === "") {
            alert("Por favor, ingresa tu correo electrónico.");
            return;
        }

        // Simulación de envío
        btnSubmit.disabled = true;
        btnSubmit.innerText = "Enviando...";

        setTimeout(() => {
            // Cambiar el contenido para dar feedback al usuario
            const container = document.querySelector('.recovery-container');
            container.innerHTML = `
                <div style="padding: 20px;">
                    <h2 style="color: #198754;">¡Correo Enviado!</h2>
                    <p class="description">
                        Hemos enviado un enlace a <strong>${email}</strong>. 
                        Revisa tu bandeja de entrada o carpeta de spam.
                    </p>
                    <a href="index.html" class="btn" style="
                        display: inline-block;
                        margin-top: 10px;
                        padding: 10px 20px;
                        background-color: #0d6efd;
                        color: white;
                        text-decoration: none;
                        border-radius: 8px;
                        font-weight: 600;
                    ">Volver al Login</a>
                </div>
            `;
        }, 1500); // Simulamos una espera de 1.5 segundos
    });
});