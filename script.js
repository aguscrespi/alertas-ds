/**
 * This is a non-functional demo script for GitHub Pages.
 * It simulates the behavior of the real application without a backend.
 */
document.addEventListener("DOMContentLoaded", initializeApp);

function initializeApp() {
    const select = document.getElementById('oossSheetSelect');
    
    // Enable/disable buttons based on selection
    select.addEventListener('change', function() {
        const actionButtons = document.querySelectorAll('.action-button');
        actionButtons.forEach(btn => btn.disabled = !select.value);
    });

    // Simulate fetching sheet names
    setTimeout(() => {
        const fakeSheetNames = ["Julio 2025", "Agosto 2025", "PRUEBAJULIO"];
        select.innerHTML = '<option value="">-- Seleccionar una hoja --</option>';
        fakeSheetNames.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            select.appendChild(option);
        });
    }, 500); // Simulate network delay
}

function setActionButtonsState(disabled) {
    document.querySelectorAll('.action-button').forEach(btn => btn.disabled = disabled);
    document.querySelector('.btn-warning').disabled = disabled; // Also disable summary button
}

function llamarAlerta(alertType) {
    const loader = document.getElementById('loaderAlertas');
    const resultadoDiv = document.getElementById('resultadoAlertas');
    const selectedSheet = document.getElementById('oossSheetSelect').value;

    if (!selectedSheet) {
        mostrarModalSimple('Atención', 'Por favor, seleccioná una hoja de la lista.');
        return;
    }

    loader.classList.remove('hidden');
    resultadoDiv.innerHTML = '';
    setActionButtonsState(true);

    // Simulate a server call
    setTimeout(() => {
        loader.classList.add('hidden');
        setActionButtonsState(false);
        const alertName = alertType === 'cotizar' ? 'Alertas para Cotizar' : 'Alertas de Pacientes Pendientes';
        const emoji = alertType === 'cotizar' ? '🚨' : '📋';
        
        resultadoDiv.innerHTML = `
            <div class="alert alert-success">
                <h4>${emoji} Resumen de Notificaciones Enviadas (${alertName})</h4>
                <ul>
                    <li>Se enviaron <b>2</b> alertas a <b>operador.uno@ejemplo.com</b>.</li>
                    <li>Se enviaron <b>1</b> alertas a <b>operador.dos@ejemplo.com</b>.</li>
                </ul>
            </div>`;
    }, 1500);
}

function llamarReinicio(alertType) {
    const selectedSheet = document.getElementById('oossSheetSelect').value;
    if (!selectedSheet) {
        mostrarModalSimple('Atención', 'Por favor, seleccioná una hoja para poder reiniciar.');
        return;
    }
    
    const alertTypeName = alertType === 'cotizar' ? 'Alertas para Cotizar' : 'Alertas de Pacientes Pendientes';
    mostrarModalSimple('Acción Simulada', `Esto reiniciaría las notificaciones de tipo "${alertTypeName}" para la hoja "${selectedSheet}".`);
}

function llamarResumenDiario() {
    const loader = document.getElementById('loaderAlertas');
    const resultadoDiv = document.getElementById('resultadoAlertas');

    loader.classList.remove('hidden');
    resultadoDiv.innerHTML = '';
    setActionButtonsState(true);

    // Simulate a server call
    setTimeout(() => {
        loader.classList.add('hidden');
        setActionButtonsState(false);
        resultadoDiv.innerHTML = `
            <div class="alert alert-success">
                <h4>🗓️ Resumen Diario</h4>
                <p>Proceso completado. Se enviaron 3 correos de resumen.</p>
            </div>`;
    }, 2000);
}

function mostrarModalSimple(titulo, mensaje) {
    document.getElementById('simpleAlertModalLabel').textContent = titulo;
    document.getElementById('simpleAlertModalBody').innerHTML = `<p>${mensaje}</p><div class="text-right"><button type="button" class="btn btn-secondary mt-3" data-dismiss="modal">Cerrar</button></div>`;
    $('#simpleAlertModal').modal('show');
}
