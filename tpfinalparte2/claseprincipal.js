class Principal {

  constructor() {
    this.amante = new Amante();
    this.marido = new Marido();
  }

  dibujar() {
    this.amante.dibujarAmante();
    this.marido.dibujarMarido();
  }

  mover() {
    this.amante.moverAmante();
    this.marido.moverMarido();
  }
}

class Amante {

  constructor() {
    this.posX = 150;
    this.posY = 280;
    this.vel = 4.5;
  }

  dibujarAmante() {
    imageMode(CENTER);
    image(imagenAmante, this.posX, this.posY, 125, 205);
    imageMode(CORNER);
  }

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

    this.posX = constrain(this.posX, 65, 735);
    this.posY = constrain(this.posY, 105, 295);
  }
}

class Marido {

  constructor() {
    this.posX = 650;
    this.posY = 280;
  }

  dibujarMarido() {
    imageMode(CENTER);
    image(imagenMarido, this.posX, this.posY, 125, 205);
    imageMode(CORNER);
  }

  moverMarido() {

    if (this.posX > principal.amante.posX + 170) {
      this.posX -= random(1.5, 2.5);
    }

    if (this.posX < principal.amante.posX + 170) {
      this.posX += random(1.5, 2.5);
    }

    if (this.posY > principal.amante.posY) {
      this.posY -= random(1, 1.5);
    }

    if (this.posY < principal.amante.posY) {
      this.posY += random(1, 1.5);
    }

    this.posX = constrain(this.posX, 65, 735);
    this.posY = constrain(this.posY, 105, 295);
  }
}
