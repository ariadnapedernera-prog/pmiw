let fondo;
let personaFrames = [];
let gatoFrames = [];

//Estados de la animacion
let pantallaInicio = 0;
let animacion = 1;
let pantallaFinal = 2;
let estadoAnimacion= pantallaInicio;

//Estados de los personajes
let personaCaminando = 0;
let personaTermino = 1;
let estadoPersona = personaTermino;
let gatoEsperando = 0;
let gatoCorriendo = 1;
let gatoTermino = 2;
let estadoGato = gatoEsperando;

//Posiciones y velocidades
let personaX = 50;
let gatoX = 850;
let velocidadPersona = 2;
let velocidadGato = 5;

//Tiempo entre cada cambio de sprite
let velocidadPersonaFrames = 200;
let velocidadGatoFrames = 80;

//Guarda el momento que cambio el ultimo sprite 
let framePersona = 0;
let frameGato = 0;

//Controla el cambio de los sprites
let ultimoCambioPersona = 0;
let ultimoCambioGato = 0;

function preload() {
//Cargo las imagenes
fondo = loadImage("data/fondo.JPG");
let nombresPersona = ["persona5.PNG", "persona1.PNG", "persona2.PNG", "persona3.PNG", "persona4.PNG"];
  
for (let i = 0; i < nombresPersona.length; i++) {
personaFrames[i] = loadImage("data/" + nombresPersona[i]);
}

let nombresGato = ["gato6.PNG", "gato7.PNG", "gato8.PNG", "gato9.PNG"];

for (let i = 0; i < nombresGato.length; i++) {
gatoFrames[i] = loadImage("data/" + nombresGato[i]);
}
}

function setup() {
createCanvas(800, 600);
reiniciar();
}

function draw() {
image(fondo, 0, 0, width, height);

//Segun el estado muestra una pantlla diferente
if (estadoAnimacion == pantallaInicio) {
dibujarPantallaInicio();
} 
else if (estadoAnimacion == animacion) {
dibujarAnimacion();
}
else if (estadoAnimacion == pantallaFinal) {
dibujarAnimacion();
dibujarPantallaFinal();
}
}

//Movimiento y animacion de los personajes
function dibujarAnimacion() {

if (estadoPersona == personaCaminando) {
personaX += velocidadPersona;

if (millis() - ultimoCambioPersona > velocidadPersonaFrames) {
framePersona = actualizarFrame(
framePersona,personaFrames.length);
ultimoCambioPersona = millis();
}

dibujarPersonaje(personaFrames, framePersona, personaX, 300, 250);

if (personaX > 800) {
estadoPersona = personaTermino;
}

} 
else if (estadoPersona == personaTermino) {

dibujarPersonaje(personaFrames, framePersona, personaX, 300, 250);
}

if (estadoGato == gatoEsperando && personaX > 250) {
estadoGato = gatoCorriendo;
}
if (estadoGato == gatoCorriendo) {
gatoX -= velocidadGato;

if (millis() - ultimoCambioGato > velocidadGatoFrames) {
frameGato = actualizarFrame(frameGato, gatoFrames.length);
ultimoCambioGato = millis();
}
dibujarPersonaje(gatoFrames, frameGato, gatoX, 450, 120);

if (gatoX < -150) {
estadoGato = gatoTermino;
}

} 
else if (estadoGato == gatoTermino) {
dibujarPersonaje(gatoFrames, frameGato, gatoX, 450, 120);
}

//Cuando los dos personajes terminan pasa a la pantalla final
if (estadoPersona == personaTermino && estadoGato == gatoTermino) {
estadoAnimacion = pantallaFinal;
}
}

function dibujarPantallaInicio() {
fill(0, 0, 0, 150);
rect(0, 0, width, height);
textAlign(CENTER, CENTER);
fill(255, 140, 0);
textSize(45);
text("UN LINDO PASEO", width / 2, 200);
textSize(25);
text("Presioná el botón para comenzar", width / 2, 270);

//boton inicio
fill(0, 100, 255);
rect(300, 350, 200, 70, 15);
fill(255, 140, 0);
textSize(30);
text("INICIAR", width / 2, 385);
}

function dibujarPantallaFinal() {
fill(0, 0, 0, 170);
rect(0, 0, width, height);
textAlign(CENTER, CENTER);
fill(255, 140, 0);
textSize(30);
text("ESPERO QUE HAYAS DISFRUTADO EL PASEO", width / 2, 220);

//Boton para volver a empezar
fill(0, 100, 255);
rect(300, 350, 200, 70, 15);
fill(255, 140, 0);
textSize(30);
text("REINICIAR", width / 2, 385);
}

function mousePressed() {
//Si estoy en el inicio presiono el boton de iniciar 
if (estadoAnimacion == pantallaInicio && mouseX > 300 && mouseX < 500 && mouseY > 350 && mouseY < 420) {
iniciarAnimacion();
}

//Si estoy al final apreto el boton y vuelvo al inicio
if (estadoAnimacion == pantallaFinal && mouseX > 300 && mouseX < 500 && mouseY > 350 && mouseY < 420) {
reiniciar();
}
}

function iniciarAnimacion() {
//vuelvo a establecer las posiciones y sprites para comenzar
personaX = 50;
gatoX = 850;
framePersona = 0;
frameGato = 0;

estadoPersona = personaCaminando;
estadoGato = gatoEsperando;

ultimoCambioPersona = millis();
ultimoCambioGato = millis();
estadoAnimacion = animacion;
}

function reiniciar() {
//Vuelvo todos los valores a su estado inicial
personaX = 50;
gatoX = 850;
framePersona = 0;
frameGato = 0;

estadoPersona = personaTermino;
estadoGato = gatoEsperando;

estadoAnimacion = pantallaInicio;
}

//Cambia al sprite que sigue y vuelve al primero cuando llega al final
function actualizarFrame(frameActual, cantidadFrames) {
frameActual++;

if (frameActual >= cantidadFrames) {
frameActual = 0;
}
return frameActual;
}

//Dibuja el sprite manteniendo la proporcion original de la imagen
function dibujarPersonaje(
frames, numeroFrame, x, y, altura) {
let imagen = frames[numeroFrame];
let ancho = obtenerAncho(imagen, altura);
image(imagen, x, y, ancho, altura);
}

//Calcula el ancho necesariopara mantener la proporcion
function obtenerAncho(imagen, altura) {
return imagen.width * altura / imagen.height;
}
