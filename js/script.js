'use strict';
const palabras = ['MANZANA', 'BANANA', 'ELEFANTE', 'casa', 'PERRO'];
const btnJugar = document.getElementById('jugar');
btnJugar.addEventListener('click', iniciar);

function iniciar(event) {
  //Seleccionar una palabra al azar de la lista
  let palabra = palabras[Math.floor(Math.random() * palabras.length)];

  // Variables de juego
  let letrasAdivinadas = [];
  let intentos = 6;
  let fallos = 0;

  // Elementos HTML
  const palabraHtml = document.getElementById('palabra');
  const letrasBtn = document.querySelectorAll('#letras button');

  // Función para mostrar la palabra oculta
  function mostrarPalabra() {
    let palabraOculta = '';
    for (let i = 0; i < palabra.length; i++) {
      if (letrasAdivinadas.includes(palabra[i])) {
        palabraOculta += palabra[i] + '';
      } else {
        palabraOculta += '_ ';
      }
    }
    palabraHtml.textContent = palabraOculta;
  }

  function mostrarImagenAhorcado() {
    const imagenAhorcado = document.querySelector('img');
    imagenAhorcado.setAttribute('src', `./imagenes/ahorcado0${fallos}.png`);
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
    } else {
      intentos--;
      fallos++;
      if (fallos <= 6) {
        mostrarImagenAhorcado();
        target.classList.add('teclaErronea');
      }
    }

    mostrarPalabra();

    if (intentos === 0) {
      console.log('¡Has perdido! La palabra era: ' + palabra);
    } else if (!palabraHtml.textContent.includes('_')) {
      console.log('¡Has ganado! La palabra es: ' + palabra);
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
