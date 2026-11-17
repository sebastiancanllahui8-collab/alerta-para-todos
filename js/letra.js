// ==========================================================================
// HU-025: Aumentar / Disminuir tamaño de letra desde la alerta
// Archivo: js/letra.js
// ==========================================================================

// Configuración de límites y pasos
const TAMANO_MINIMO = 100; // Porcentaje mínimo (100 %)
const TAMANO_MAXIMO = 150; // Porcentaje máximo (150 %)
const PASO = 10;           // Incremento/decremento por cada clic (10 %)
const CLAVE_STORAGE = 'tamanoLetraPreferido'; // Clave para guardar en localStorage

// 1. SELECCIÓN DE ELEMENTOS DEL DOM
const contenedorControles = document.getElementById('controles-letra');
const botonDisminuir = document.getElementById('letra-menos');
const botonAumentar = document.getElementById('letra-mas');
const botonRestablecer = document.getElementById('letra-reset');
const textoEstado = document.getElementById('letra-estado');

// Estado inicial del tamaño (se recupera de localStorage o inicia en 100 %)
// ADAPTACIÓN 1: si el navegador no permite localStorage o el valor guardado no es válido,
// se empieza en 100 % (el código de Gemini fallaba en ese caso).
let tamanoActual = TAMANO_MINIMO;
try {
    const guardado = parseInt(localStorage.getItem(CLAVE_STORAGE), 10);
    if (guardado >= TAMANO_MINIMO && guardado <= TAMANO_MAXIMO) { tamanoActual = guardado; }
} catch (error) { /* sin almacenamiento: se queda en 100 % */ }

/**
 * Función que actualiza la interfaz visual y el tamaño de letra global
 */
function actualizarTamanoLetra() {
    // A) Aplicar el tamaño de fuente al elemento HTML raíz para escalar toda la página
    document.documentElement.style.fontSize = `${tamanoActual}%`;

    // B) Actualizar el texto descriptivo del estado para el usuario y lectores de pantalla
    if (textoEstado) {
        textoEstado.textContent = `Tamaño actual: ${tamanoActual} %`;
    }

    // C) Activar o desactivar botones según los límites establecidos (Criterio 2)
    if (botonDisminuir) {
        botonDisminuir.disabled = (tamanoActual <= TAMANO_MINIMO);
    }
    if (botonAumentar) {
        botonAumentar.disabled = (tamanoActual >= TAMANO_MAXIMO);
    }

    // D) Guardar la preferencia en la memoria del navegador (Criterio 5)
    // ADAPTACIÓN 2: guardar dentro de try por si el navegador bloquea localStorage.
    try { localStorage.setItem(CLAVE_STORAGE, tamanoActual); } catch (error) { /* se ignora */ }
}

// 2. INICIALIZACIÓN Y EVENTOS DEL DOM
document.addEventListener('DOMContentLoaded', () => {
    // Revelar la barra de controles que estaba oculta con el atributo `hidden` en el HTML
    if (contenedorControles) {
        contenedorControles.removeAttribute('hidden');
    }

    // Aplicar la configuración guardada o la por defecto al cargar la página
    actualizarTamanoLetra();

    // Evento Clic: Aumentar letra (A+)
    if (botonAumentar) {
        botonAumentar.addEventListener('click', () => {
            if (tamanoActual < TAMANO_MAXIMO) {
                tamanoActual += PASO;
                actualizarTamanoLetra();
            }
        });
    }

    // Evento Clic: Disminuir letra (A−)
    if (botonDisminuir) {
        botonDisminuir.addEventListener('click', () => {
            if (tamanoActual > TAMANO_MINIMO) {
                tamanoActual -= PASO;
                actualizarTamanoLetra();
            }
        });
    }

    // Evento Clic: Restablecer tamaño
    if (botonRestablecer) {
        botonRestablecer.addEventListener('click', () => {
            tamanoActual = TAMANO_MINIMO;
            actualizarTamanoLetra();
        });
    }
});