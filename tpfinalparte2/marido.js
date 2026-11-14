class Marido {
  constructor() {
//Posición y vidas iniciales
    this.posX = 650;
    this.posY = 280;
    this.vida = 5;
  }

//Dibujamos al marido
  dibujarMarido() {
    imageMode(CENTER);
    image(imagenMarido, this.posX, this.posY, 125, 205);
    imageMode(CORNER);
  }

//El marido persigue automáticamente al amante
  moverMarido(amante) {

//Calculamos la distancia entre los personajes
    let distancia = dist(this.posX, this.posY, amante.posX, amante.posY);

//Si están separados, el marido se acerca
    if (distancia > 100) {

//Movimiento horizontal
      if (this.posX > amante.posX) {
        this.posX -= random(1.5, 2.5);
      }

      if (this.posX < amante.posX) {
        this.posX += random(1.5, 2.5);
      }

//Movimiento vertical
      if (this.posY > amante.posY) {
        this.posY -= random(1, 1.5);
      }

      if (this.posY < amante.posY) {
        this.posY += random(1, 1.5);
      }
    }

//Aplicamos los límites de movimiento
    limitarPosicion(this);
  }
}
