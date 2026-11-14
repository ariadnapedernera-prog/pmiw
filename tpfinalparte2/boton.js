class Boton {
  constructor(x, y, ancho, alto, texto, pantalla, destino) {
//Guardamos las características del botón
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.texto = texto;

//Guardamos dónde aparece y a dónde nos lleva
    this.pantalla = pantalla;
    this.destino = destino;
  }

//Dibujamos el botón en la pantalla correspondiente
  dibujar(estado) {
    if (this.pantalla === estado) {
      fill(230);
      rect(this.x, this.y, this.ancho, this.alto, 10);

      fill(0);
      textAlign(CENTER, CENTER);
      textSize(16);

      text(
        this.texto,
        this.x + this.ancho / 2,
        this.y + this.alto / 2
      );
    }
  }
  
//Comprobamos si el mouse está dentro del botón
  presionado(mx, my, estado) {
    if (this.pantalla === estado && mx > this.x && mx < this.x + this.ancho && my > this.y && my < this.y + this.alto) {
      return true;
    }

    return false;
  }
}
