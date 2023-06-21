"use strict";
const palabras = ["MANZANA", "BANANA", "ELEFANTE", "casa", "PERRO"];

//Seleccionar una palabra al azar de la lista
let palabra = palabras[Math.floor(Math.random()*palabras.length)];

// Variables de juego
let letrasAdivinadas = [];
let intentos = 6;


// Elementos HTML 
const palabraHtml = document.getElementById("palabra");
const letrasBtn = document.querySelectorAll("#letras button");


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

//////////////////////////////////////////////



function verificarLetra(letra) {
    letra = letra.toUpperCase();// No se porque no me funciona con minusculas :'(

    if (letrasAdivinadas.includes(letra)) {
        return;
    }

    if (palabra.includes(letra)) {
        letrasAdivinadas.push(letra);
    } else {
        intentos--;
    }

    mostrarPalabra();

    if (intentos === 0) {
        console.log("¡Has perdido! La palabra era: " + palabra);
    } else if (!palabraHtml.textContent.includes("_")) {
        console.log("¡Has ganado! La palabra es: " + palabra);
    }
}

mostrarPalabra();

letrasBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        const letra = btn.textContent;
        verificarLetra(letra);
    });
});
