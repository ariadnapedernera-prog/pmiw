class Juego {
  constructor() {
//Título de la pantalla
    this.titulos = ["El Enfrentamiento"];

//Instrucciones del juego
    this.instrucciones = ["Escapa del marido y trata de derrotarlo.", "Usa las flechas para mover al amante.", "El marido te perseguirá automaticamente.", "Tenes 30 segundos para ganar."];

  }

//Dibujamos la pantalla inicial y los resultados
  dibujarPantalla(estado) {
    if (estado === "inicio") {
      fill(0, 0, 0, 190);
      rect(0, 0, 800, 400);

      textAlign(CENTER, CENTER);
      fill(255);

      textSize(32);
      text(this.titulos[0], 400, 75);

      textSize(18);

//Recorremos el arreglo de instrucciones
      for (let i = 0; i < this.instrucciones.length; i++) {
        text(this.instrucciones[i], 400, 135 + i * 30);
      }
    }

//Mostramos la imagen correspondiente al resultado
    if (estado === "gana") {
      this.dibujarResultado(imagenGana);
    }

    if (estado === "pierde") {
      this.dibujarResultado(imagenPierde);
    }

    if (estado === "empate") {
      this.dibujarResultado(imagenEmpate);
    }
  }

//Método que dibuja las imágenes de los resultados
  dibujarResultado(imagenResultado) {
    imageMode(CORNER);
    image(imagenResultado, 0, 0, 800, 400);
  }

//Mostramos las vidas de los personajes
  dibujarVida(vidaAmante, vidaMarido) {
    textAlign(LEFT, CENTER);
    textSize(18);
    fill(255);

    text("AMANTE: " + vidaAmante, 25, 25);
    text("MARIDO: " + vidaMarido, 650, 25);
  }

//Mostramos el tiempo restante
  dibujarTiempo(tiempo) {
    textAlign(CENTER, CENTER);
    textSize(24);
    fill(255);

    text("TIEMPO: " + tiempo, 400, 25);
  }
}
