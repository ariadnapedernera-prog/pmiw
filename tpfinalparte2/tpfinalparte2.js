//Link al video: https://youtu.be/44jW7Dj1hro
//Ariadna Pedernera y Morena Ruiz

let fondo;
let imagenAmante;
let imagenMarido;
let imagenGana;
let imagenPierde;
let imagenEmpate;

let sonidoInicio;
let sonidoAtaque;
let sonidoGana;
let sonidoPierde;

let principal;

function preload() {
  fondo = loadImage("data/salon.jpg");
  imagenAmante = loadImage("data/amante.png");
  imagenMarido = loadImage("data/marido.png");
  imagenGana = loadImage("data/ganar.png");
  imagenPierde = loadImage("data/perder.png");
  imagenEmpate = loadImage("data/empate.png");

  sonidoInicio = loadSound("data/inicio.mp3");
  sonidoAtaque = loadSound("data/ataque.mp3");
  sonidoGana = loadSound("data/gana.mp3");
  sonidoPierde = loadSound("data/pierde.mp3");
}

//Creamos el canvas y el objeto principal
function setup() {
  createCanvas(800, 400);
  principal = new Principal();
}

//Dibujamos y actualizamos el juego
function draw() {
  principal.dibujar();
  principal.mover();
}

//Detectamos los clics del mouse
function mousePressed() {
  principal.mousePresionado();
}

//Detectamos las teclas presionadas
function keyPressed() {
  principal.teclaPresionada();
}

//Controlamos que los personajes no se salgan de la pantalla
function limitarPosicion(personaje) {
  if (personaje.posX < 65) {
    personaje.posX = 65;
  }

  if (personaje.posX > 735) {
    personaje.posX = 735;
  }

  if (personaje.posY < 110) {
    personaje.posY = 110;
  }

  if (personaje.posY > 295) {
    personaje.posY = 295;
  }
}
