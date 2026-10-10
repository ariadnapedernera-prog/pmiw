//https://youtu.be/-Ct9GKZ5gts
//Morena Ruiz y Ariadna Pedernera

//Guarda las imagenes, los textos y los botones
let imagenes = [];
let textos = [];
let botones = [];

//Guarda los sonidos
let sonidoFondo;
let sonidoBoton;
let sonando = false;
let sonidoActivado = false;

//Indica la pantalla actual y la posicion de los creditos
let pantallaActual = 1;
let posicionCreditos = -100;

//Carga las imagenes, los textos y los sonidos
function preload() {
  cargarImagenes();
  textos = loadStrings("textos.txt");

  sonidoFondo = loadSound("data/sonidoFondo.mp3");
  sonidoBoton = loadSound("data/sonidoClick.mp3");
}

//Carga todas las imagenes
function cargarImagenes() {
  for (let i = 1; i <= 18; i++) {
    imagenes[i - 1] = loadImage("data/pantalla" + i + ".jpg");
  }
}

//Tamaño de pantalla y botones
function setup() {
  createCanvas(800, 450);
  textAlign(CENTER, CENTER);
  configurarBotones();

  sonidoFondo.setVolume(0.3);
  sonidoBoton.setVolume(0.5);
}

//Muestra la pantalla actual
function draw() {
  background(20);
  pantalla(pantallaActual);

  if (pantallaActual !== 1) {
    detenerSuspenso();
  }
}

//Muestra la imagen, el texto y los botones de cada pantalla
function pantalla(numero) {
  image(imagenes[numero - 1], 0, 0, width, height);

  if (numero === 1) {
    botonTexto("Comenzar", 310, 350, 180, 48);

    if (sonidoActivado) {
      botonTexto("Sonido: activado", 320, 305, 160, 30);
    } 
    else {
      botonTexto("Sonido: desactivado", 320, 305, 160, 30);
    }
  } 
   else if (numero === 18) {
    dibujarCreditos();
  } 
   else {
    dibujarTexto(numero);
    dibujarBotones(numero);
  }
}

//Muestra el texto de cada pantalla
function dibujarTexto(numero) {
  if (numero === 11) {
    fill(0, 155);
    noStroke();
    rect(30, 195, 740, 120, 12);

    textSize(16);
    fill(255);
    text(textos[numero - 2], 55, 215, 690, 100);
  } else {
    fondoTexto(155, 85);

    textSize(16);
    fill(255);
    text(textos[numero - 2], 55, 280, 690, 65);
  }
}

//Dibuja el fondo oscuro del texto
function fondoTexto(opacidad, alto) {
  fill(0, 190);
  noStroke();
  rect(30, 270, 740, alto, 12);
}

//Muestra los botones de la pantalla actual 
function dibujarBotones(numero) {
  for (let i = 0; i < botones[numero].length; i++) {
    let botonActual = botones[numero][i];

    if (botonActual[0] === "derecha") {
      dibujarFlecha(botonActual[2], botonActual[3], botonActual[4], botonActual[5], "derecha" );
    } 
     else if (botonActual[0] === "izquierda") {
      dibujarFlecha(botonActual[2], botonActual[3], botonActual[4], botonActual[5], "izquierda" );
    } 
     else {
      botonTexto( botonActual[0], botonActual[2], botonActual[3], botonActual[4], botonActual[5] );
    }
  }
}

//Dibuja las flechas para avanzar o retroceder
function dibujarFlecha(x, y, ancho, alto, direccion) {
  fill(0, 180);
  stroke(255);
  strokeWeight(2);
  ellipse(x + ancho / 2, y + alto / 2, ancho, alto);

  fill(255);
  noStroke();

  if (direccion === "derecha") {
    triangle(x + 15, y + 10, x + 15, y + 40, x + 38, y + 25);
  } 
   else {
    triangle(x + 35, y + 10, x + 35, y + 40, x + 12, y + 25);
  }
}

//Dibuja los botones con texto
function botonTexto(texto, x, y, ancho, alto) {
  rectMode(CORNER);
  fill(40, 190);
  stroke(255);
  strokeWeight(1.5);
  rect(x, y, ancho, alto, 8);

  fill(255);
  noStroke();
  textSize(16);
  text(texto, x + ancho / 2, y + alto / 2);
}

//Muestra los creditos con una animacion
function dibujarCreditos() {
  if (posicionCreditos < 115) {
    posicionCreditos += 2;
  }

  fill(0, 190);
  noStroke();
  rect(30, 85, 740, 250, 12);

  fill(255);
  textSize(22);
  text("Créditos", 400, posicionCreditos);

  textSize(16);
  text("Continuidad de los parques", 400, posicionCreditos + 40);
  text("Obra original: Julio Cortázar", 400, posicionCreditos + 75);
  text("Realizado por: Ariadna Pedernera y Morena Ruiz", 400, posicionCreditos + 110 );

  botonTexto("Volver al inicio", 310, 365, 180, 45);
}

//Va mostrando los botones de todas las pantallas
function configurarBotones() {
  for (let i = 1; i <= 18; i++) {
    botones[i] = [];
  }

  agregar(1, "Comenzar", 2, 310, 350, 180, 48);

  agregarFlechasDerecha();
  agregarFlechasIzquierda();
  agregarBotonesTexto();

  agregar(11, "Volver al inicio", 1, 210, 365, 170, 42);
  agregar(14, "Volver al inicio", 1, 210, 365, 170, 42);
  agregar(17, "Volver al inicio", 1, 210, 365, 170, 42);
  agregar(18, "Volver al inicio", 1, 310, 365, 180, 45);
}

//Guarda los datos de cada boton
function agregar(pantalla, texto, destino, x, y, ancho, alto) {
  let posicion = botones[pantalla].length;

  botones[pantalla][posicion] = [texto, destino, x, y, ancho, alto];
}

//Flechas derechas
function agregarFlechasDerecha() {
  let flechas = [[2, 3], [3, 4], [5, 7], [6, 8], [7, 9], [8, 9], [10, 12], [13, 14], [15, 16]];

  for (let i = 0; i < flechas.length; i++) {
    agregar(flechas[i][0], "derecha", flechas[i][1], 700, 365, 50, 50);
  }
}

//Flechas izquierdas
function agregarFlechasIzquierda() {
  let flechas = [[5, 4], [6, 4], [10, 9], [11, 9], [13, 12], [14, 16], [15, 12], [17, 16]];

  for (let i = 0; i < flechas.length; i++) {
    agregar(flechas[i][0], "izquierda", flechas[i][1], 50, 365, 50, 50);
  }
}

//Botones con sus destinos y posiciones
function agregarBotonesTexto() {
  let botonesTexto = [
    [4, "Seguir leyendo", 5, 420, 365, 170, 42],
    [4, "Detener la lectura", 6, 210, 365, 170, 42],
    [9, "Seguir al hombre", 10, 420, 365, 170, 42],
    [9, "Volver al lector", 11, 210, 365, 170, 42],
    [11, "Ver créditos", 18, 420, 365, 170, 42],
    [12, "Entrar al salón", 13, 420, 365, 170, 42],
    [12, "Detenerse", 15, 210, 365, 170, 42],
    [14, "Ver créditos", 18, 420, 365, 170, 42],
    [16, "Completar el plan", 14, 420, 365, 170, 42],
    [16, "Huir de la casa", 17, 210, 365, 170, 42],
    [17, "Ver créditos", 18, 420, 365, 170, 42]
  ];

  //Agrega cada boton a su pantalla
  for (let i = 0; i < botonesTexto.length; i++) {
    agregar(botonesTexto[i][0], botonesTexto[i][1], botonesTexto[i][2], botonesTexto[i][3], botonesTexto[i][4], botonesTexto[i][5], botonesTexto[i][6]);
  }
}

//Musica de fondo
function detenerSuspenso() {
  if (sonando) {
    sonidoFondo.stop();
    sonando = false;
  }
}

//Reproduce el sonido de los botones
function reproducirSonidos() {
  sonidoBoton.play();
}

//Comprueba si el mouse esta dentro de un boton
function activar(x, y, an, alt) {
  let apretando = mouseX > x && mouseX < x + an && mouseY > y && mouseY < y + alt;

  return apretando;
}

//Detecta cuando se hace click
function mousePressed() {
  if (pantallaActual === 1) {
    if (activar(320, 305, 160, 30)) {
      sonidoActivado = !sonidoActivado;

      if (sonidoActivado) {
        sonidoFondo.loop();
        sonando = true;
      } else {
        detenerSuspenso();
      }
    } else if (activar(310, 350, 180, 48)) {
      detenerSuspenso();
      sonidoActivado = false;
      reproducirSonidos();
      cambiarPantalla(2);
    }
  } else {
    for (let i = 0; i < botones[pantallaActual].length; i++) {
      let botonActual = botones[pantallaActual][i];

      if (activar(botonActual[2], botonActual[3], botonActual[4], botonActual[5])) {
        reproducirSonidos();
        cambiarPantalla(botonActual[1]);
        break;
      }
    }
  }
}

//Cambia de pantalla
function cambiarPantalla(destino) {
  if (destino === 18 || destino === 1) {
    posicionCreditos = -100;
  }

  pantallaActual = destino;
}
