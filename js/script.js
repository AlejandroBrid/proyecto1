'use strict';

const palabras = [
  'banana',
  'elefante',
  'casa',
  'perro',
  'leon',
  'perro',
  'gato',
  'jirafa',
  'leon',
  'tigre',
  'mono',
  'cebra',
  'tortuga',
  'cocodrilo',
  'pinguino',
  'oso',
  'ballena',
  'delfin',
  'loro',
  'canguro',
  'camello',
  'ardilla',
  'castor',
  'camaleon',
  'raton',
  'hamster',
  'gallina',
  'pato',
  'vaca',
  'oveja',
  'caballo',
  'cerdo',
  'conejo',
  'oveja',
  'tiburon',
  'abeja',
  'mariposa',
  'arana',
  'mosquito',
  'gusano',
  'mosca',
  'rana',
  'lagarto',
  'cocodrilo',
  'gaviota',
  'aguila',
  'pajaro',
  'tucan',
  'colibri',
  'sapo',
  'manzana',
  'platano',
  'naranja',
  'sandia',
  'uva',
  'fresa',
  'melon',
  'pina',
  'mango',
  'limon',
  'cereza',
  'papaya',
  'kiwi',
  'pera',
  'frambuesa',
  'mandarina',
  'granada',
  'ciruela',
  'arandano',
  'melocoton',
  'coco',
  'guayaba',
  'higo',
  'membrillo',
  'pomelo',
  'maracuya',
  'nectarina',
  'morera',
  'durazno',
  'patilla',
  'carambola',
  'chirimoya',
  'mora',
  'tamarindo',
  'calabaza',
  'patata',
  'zanahoria',
  'pepino',
  'calabacin',
  'berenjena',
  'tomate',
  'pimiento',
  'cebolla',
  'lechuga',
  'brocoli',
  'espinaca',
];

const btnJugar = document.getElementById('jugar');
const popup = document.getElementById('popup');
const popupMensaje = document.getElementById('popupMensaje');
const popupClose = document.getElementById('popupClose');

btnJugar.addEventListener('click', iniciar);

function mostrarPopup(mensaje, ganador = false) {
  popupMensaje.textContent = mensaje;
  if (ganador) {
    popup.classList.add('popupGanador');
  } else {
    popup.class;
  }
  popup.style.display = 'flex';
}

function cerrarPopup() {
  popup.style.display = 'none';
}

function iniciar(event) {
  btnJugar.disabled = true;
  document.querySelector('h2').style.display = 'block';
  //Seleccionar una palabra al azar de la lista
  let palabra = palabras[Math.floor(Math.random() * palabras.length)];

  // Variables de juego
  let letrasAdivinadas = [];
  let intentos = 6;
  let fallos = 0;

  // Elementos HTML
  const palabraHtml = document.getElementById('palabra');
  const letrasBtn = document.querySelectorAll('#letras button');
  const intentosRestantes = document.getElementById('vidas');

  // Función para mostrar la palabra oculta
  function mostrarPalabra() {
    let palabraOculta = '';
    for (let i = 0; i < palabra.length; i++) {
      if (letrasAdivinadas.includes(palabra[i])) {
        palabraOculta += palabra[i] + '';
      } else {
        palabraOculta += ' _ ';
      }
    }
    palabraHtml.textContent = palabraOculta;
  }

  function mostrarImagenAhorcado() {
    const imagenAhorcado = document.querySelector('img');
    imagenAhorcado.setAttribute('src', `./imagenes/ahorcado0${fallos}.png`);
  }

  function deshabilitarBotonesLetras() {
    letrasBtn.forEach((btn) => {
      btn.disabled = true;
    });
  }

  function verificarLetra(target) {
    const letra = target.textContent.toUpperCase();
    // transformo la palabra en uppercase
    palabra = palabra.toUpperCase();

    if (letrasAdivinadas.includes(letra)) {
      return;
    }

    if (palabra.includes(letra)) {
      letrasAdivinadas.push(letra);
      target.classList.add('teclaCorrecta');
    } else {
      intentos--;
      fallos++;
      intentosRestantes.innerHTML = intentos;
      if (fallos <= 6) {
        mostrarImagenAhorcado();
        target.classList.add('teclaErronea');
      }
    }

    mostrarPalabra();

    if (intentos === 0) {
      mostrarPopup('¡Has perdido! La palabra era: ' + palabra);
      deshabilitarBotonesLetras();
    } else if (!palabraHtml.textContent.includes('_')) {
      mostrarPopup('¡Has ganado! La palabra es: ' + palabra, true);
      deshabilitarBotonesLetras();
    }
  }

  mostrarPalabra();

  letrasBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const target = e.target;
      verificarLetra(target);
    });
  });
}
