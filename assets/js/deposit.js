// assets/js/deposit.js

$(document).ready(function () {
    // 1. Cargar saldo actual
    let saldo = parseFloat(localStorage.getItem('saldo')) || 1250000;

    // Función para formatear moneda
    const formatearMoneda = (valor) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);
    };

    // Mostrar saldo inicial
    $('#currentBalance').text(formatearMoneda(saldo));

    // 2. Manejo del formulario
    $('#depositForm').on('submit', function (e) {
        e.preventDefault();

        const inputAmount = $('#depositAmount');
        const monto = parseFloat(inputAmount.val());

        // Validaciones
        if (isNaN(monto) || monto <= 0) {
            alert("Por favor, ingresa un monto válido mayor a cero.");
            inputAmount.focus();
            return;
        }

        // Simular tiempo de proceso
        const btnSubmit = $(this).find('button[type="submit"]');
        const originalText = btnSubmit.html();

        btnSubmit.prop('disabled', true).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...');

        setTimeout(() => {
            // Actualizar Saldo
            saldo += monto;
            localStorage.setItem('saldo', saldo);

            // Registrar movimiento
            const historial = JSON.parse(localStorage.getItem('historialMovimientos')) || [];
            historial.unshift({
                descripcion: "Depósito",
                monto: monto,
                tipo: "ingreso",
                fecha: new Date().toLocaleDateString()
            });
            localStorage.setItem('historialMovimientos', JSON.stringify(historial));

            // Actualizar UI
            $('#currentBalance').text(formatearMoneda(saldo));
            alert(`¡Depósito exitoso! Has agregado ${formatearMoneda(monto)} a tu cuenta.`);

            // Redirigir
            window.location.href = "menu.html";

        }, 1500);
    });

    // 3. Botón Limpiar
    $('#btnLimpiar').on('click', function () {
        $('#depositAmount').val('').focus();
    });
});
