// assets/js/transaccion.js

$(function () {
    const movimientos = [
        { desc: 'Compra en línea', monto: '50.00', tipo: 'gasto' },
        { desc: 'Depósito', monto: '100.00', tipo: 'ingreso' },
        // ... resto de datos
    ];

    const $lista = $('#listaMovimientos');
    $lista.empty();

    movimientos.forEach(mov => {
        const badgeClass = mov.tipo === 'ingreso' ? 'bg-success' : 'bg-danger';
        $lista.append(`
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div><i class="bi bi-cart text-warning me-2"></i>${mov.desc}</div>
        <span class="badge ${badgeClass} rounded-pill">$${mov.monto}</span>
      </li>
    `);
    });
});

// Limpiar lista de carga
listaMovimientos.empty();

if (movimientos.length === 0) {
    listaMovimientos.append('<li class="list-group-item text-center">No hay movimientos recientes.</li>');
    return;
}

// Renderizar movimientos
movimientos.forEach(mov => {
    const claseMonto = mov.tipo === 'ingreso' || mov.monto > 0 ? 'monto-positivo' : 'monto-negativo';
    const signo = mov.tipo === 'ingreso' || mov.monto > 0 ? '+' : '';

    // Formateo de moneda estilo chileno
    const montoFormateado = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(mov.monto);

    const html = `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <div class="text-description">${mov.descripcion}</div>
                    ${mov.fecha ? `<small class="text-date">${mov.fecha}</small>` : ''}
                </div>
                <span class="${claseMonto}">${signo}${montoFormateado}</span>
            </li>
        `;

    listaMovimientos.append(html);
});




