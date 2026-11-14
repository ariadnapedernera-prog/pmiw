class Creditos {
  constructor() {
//Arreglo con los textos de los créditos
    this.textos = ["CRÉDITOS", "Basado en Continuidad de los parques", "Autor: Julio Cortázar", "Ariadna Pedernera y Morena Ruiz"];
  }

//Mostramos los créditos cuando estamos en esa pantalla
  dibujar(estado) {
    if (estado === "creditos") {
      fill(0, 0, 0, 190);
      rect(0, 0, 800, 400);

      textAlign(CENTER, CENTER);
      fill(255);

//Recorremos el arreglo para mostrar los textos
      for (let i = 0; i < this.textos.length; i++) {
        if (i === 0) {
          textSize(32);
        } else {
          textSize(18);
        }

        text(this.textos[i], 400, 65 + i * 38);
      }
    }
  }
}
