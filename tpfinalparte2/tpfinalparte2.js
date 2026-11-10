let fondo;
let imagenAmante;
let imagenMarido;

let principal;

function preload() {
  fondo = loadImage("data/salon.jpg");
  imagenAmante = loadImage("data/amante.png");
  imagenMarido = loadImage("data/marido.png");
}

function setup() {
  createCanvas(800, 400);

  principal = new Principal();
}

function draw() {
  image(fondo, 0, 0, width, height);

  principal.dibujar();
  principal.mover();
}
