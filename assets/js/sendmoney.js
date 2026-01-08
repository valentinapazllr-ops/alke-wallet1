// assets/js/sendmoney.js

$(document).ready(function () {
    let saldo = parseFloat(localStorage.getItem('saldo')) || 1250000;
    let contactoSeleccionado = null;

    // Formatear moneda
    const formatearMoneda = (valor) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);

    // Inicializar UI
    $('#saldoDisponible').text(formatearMoneda(saldo));

    // 1. SELECCIONAR CONTACTO
    $('#contactList').on('click', '.contact-item', function () {
        $('.contact-item').removeClass('active');
        $(this).addClass('active');

        contactoSeleccionado = $(this).find('.name').text();
        console.log("Contacto seleccionado:", contactoSeleccionado); // Debug
    });

    // 2. FILTRAR CONTACTOS (Búsqueda en tiempo real)
    $('#searchContact').on('input', function () {
        const term = $(this).val().toLowerCase();

        $('.contact-item').each(function () {
            const text = $(this).text().toLowerCase();
            $(this).toggle(text.includes(term));
        });
    });

    // 3. AGREGAR NUEVO CONTACTO
    $('#formNuevoContacto').on('submit', function (e) {
        e.preventDefault();

        const nombre = $('#nombre').val();
        const banco = $('#banco').val();

        // Simular iniciales
        const iniciales = nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        const colorClass = ['bg-primary', 'bg-success', 'bg-warning', 'bg-info'][Math.floor(Math.random() * 4)];

        const nuevoHtml = `
            <li class="list-group-item contact-item" data-name="${nombre}">
                <div class="d-flex align-items-center">
                  <div class="avatar me-3 ${colorClass} text-white rounded-circle d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">${iniciales}</div>
                  <div>
                    <h6 class="mb-0 name">${nombre}</h6>
                    <small class="text-muted d-block">Banco: ${banco}</small>
                  </div>
                </div>
            </li>
        `;

        $('#contactList').append(nuevoHtml);
        $('#modalContacto').modal('hide');
        this.reset();
    });

    // 4. ENVIAR DINERO
    $('#btnEnviarDinero').on('click', function () {
        const btn = $(this);
        const monto = parseFloat($('#montoEnviar').val());

        // Validaciones
        if (!contactoSeleccionado) {
            alert("⚠️ Selecciona un contacto de la lista primero.");
            return;
        }

        if (isNaN(monto) || monto <= 0) {
            alert("⚠️ Ingresa un monto válido.");
            return;
        }

        if (monto > saldo) {
            alert("⚠️ Saldo insuficiente.");
            return;
        }

        // Proceso de envío
        btn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm"></span> Enviando...');

        setTimeout(() => {
            saldo -= monto;
            localStorage.setItem('saldo', saldo);

            // Registrar movimiento
            const historial = JSON.parse(localStorage.getItem('historialMovimientos')) || [];
            historial.unshift({
                descripcion: `Envío a ${contactoSeleccionado}`,
                monto: -monto,
                tipo: "egreso",
                fecha: new Date().toLocaleDateString()
            });
            localStorage.setItem('historialMovimientos', JSON.stringify(historial));

            alert(`✅ ¡Transferencia Exitosa! Enviaste ${formatearMoneda(monto)} a ${contactoSeleccionado}`);
            window.location.href = "menu.html";

        }, 1500);
    });
});
