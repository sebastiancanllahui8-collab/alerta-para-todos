/* menu.js — Menú responsive con botón hamburguesa (Semana 11).
   Qué hace:  abre y cierra la navegación en pantallas pequeñas.
   Elementos del DOM que selecciona:
     #boton-menu  (botón hamburguesa)   #navegacion (el <nav>)
     #texto-menu  (palabra «Menú»/«Cerrar»)   .desplegable (el <details> «Probar»)
   Eventos que escucha:
     click en el botón, click en un enlace del menú, tecla Escape,
     y resize (cuando la ventana vuelve a ser grande).
   Atributos y estados que modifica:
     aria-expanded y aria-label del botón, la clase "abierto" del <nav>,
     el texto del botón y el atributo "open" del <details>. */
(function () {
  'use strict';

  var boton = document.getElementById('boton-menu');
  var nav = document.getElementById('navegacion');
  var texto = document.getElementById('texto-menu');
  var desplegable = document.querySelector('.desplegable');
  if (!boton || !nav) { return; }          // si falta algo, no hace nada

  // Aviso a CSS de que JavaScript funciona: solo entonces se ve la hamburguesa.
  document.documentElement.classList.add('js');

  var pantallaPequena = window.matchMedia('(max-width: 900px)');

  function cerrar(devolverFoco) {
    nav.classList.remove('abierto');
    boton.setAttribute('aria-expanded', 'false');
    boton.setAttribute('aria-label', 'Abrir menú');
    texto.textContent = 'Menú';
    if (desplegable) { desplegable.removeAttribute('open'); }
    if (devolverFoco) { boton.focus(); }
  }

  function abrir() {
    nav.classList.add('abierto');
    boton.setAttribute('aria-expanded', 'true');
    boton.setAttribute('aria-label', 'Cerrar menú');
    texto.textContent = 'Cerrar';
  }

  // Clic, toque, Enter y espacio: un <button> ya los convierte en "click".
  boton.addEventListener('click', function () {
    if (nav.classList.contains('abierto')) { cerrar(false); } else { abrir(); }
  });

  // Al elegir un enlace en el celular, el menú se cierra para ver la sección.
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a') && pantallaPequena.matches) { cerrar(false); }
  });

  // Escape cierra primero el submenú y luego la navegación.
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') { return; }
    if (desplegable && desplegable.open) {
      desplegable.removeAttribute('open');
      desplegable.querySelector('summary').focus();
    } else if (nav.classList.contains('abierto')) {
      cerrar(true);
    }
  });

  // Si la pantalla vuelve a ser grande, se deja todo en su estado normal.
  window.addEventListener('resize', function () {
    if (!pantallaPequena.matches) { cerrar(false); }
  });
})();
