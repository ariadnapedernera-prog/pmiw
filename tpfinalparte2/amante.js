class Amante {
  constructor() {
//Posición, velocidad y vidas iniciales
    this.posX = 150;
    this.posY = 280;
    this.vel = 4;
    this.vida = 5;
  }

//Dibujamos al amante
  dibujarAmante() {
    imageMode(CENTER);
    image(imagenAmante, this.posX, this.posY, 125, 205);
    imageMode(CORNER);
  }

//Movemos al amante con las flechas del teclado
  moverAmante() {
    if (keyIsDown(LEFT_ARROW)) {
      this.posX -= this.vel;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.posX += this.vel;
    }

    if (keyIsDown(UP_ARROW)) {
      this.posY -= this.vel;
    }

    if (keyIsDown(DOWN_ARROW)) {
      this.posY += this.vel;
    }

//Aplicamos los límites de movimiento
    limitarPosicion(this);
  }
}
