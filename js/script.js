"use strict";

const listaPalabras = ["manzana", "banana", "elefante", "casa", "perro"];

let palabra = listaPalabras[Math.floor(Math.random() * listaPalabras.length)];

let letrasAdivinadas = [""];
let intentosRestantes = 6;
// Elementos HTML
const palabraHtml = document.getElementById("palabra");
// Función para mostrar la palabra oculta
function mostrarPalabra() {
  let palabraOculta = "";
  for (let i = 0; i < palabra.length; i++) {
    if (letrasAdivinadas.includes(palabra[i])) {
      palabraOculta += palabra[i] + " ";
    } else {
      palabraOculta += "_ ";
    }
  }
  palabraHtml.textContent = palabraOculta;
}
//evento de escucha a cada botón para capturar el clic del jugador y procesar la letra
const botonesLetra = document.querySelectorAll(".letra");

botonesLetra.forEach((boton) => {
  boton.addEventListener("click", () => {
    const letra = boton.textContent;
    boton.disabled = true; //desactivar el boton usado
    letrasAdivinadas.push(letra);
    mostrarPalabra();
    verificarJuego();
  });
});
