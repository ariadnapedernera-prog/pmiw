class Principal {
  constructor() {

//Creamos los objetos de las otras clases
    this.amante = new Amante();
    this.marido = new Marido();

    this.juego = new Juego();
    this.creditos = new Creditos();

//Estado inicial
    this.estado = "inicio";
    this.choque = false;

//Control del sonido
    this.sonidoActivado = false;

//Control del tiempo
    this.tiempoInicio = 0;
    this.tiempoRestante = 30;

//Creamos el arreglo de botones
    this.botones = [
      new Boton(300, 320, 200, 55, "COMENZAR", "inicio", "jugando"),
      new Boton(300, 255, 200, 50, "ACTIVAR SONIDO", "inicio", "sonido"),

//Botón de créditos de victoria
      new Boton(300, 285, 200, 55, "CREDITOS", "gana", "creditos"),

//Botones de derrota
      new Boton(300, 255, 200, 55, "VOLVER A INTENTAR", "pierde", "jugando"),
      new Boton(300, 320, 200, 55, "CREDITOS", "pierde", "creditos"),

//Botones de empate
      new Boton(300, 255, 200, 55, "VOLVER A INTENTAR", "empate", "jugando"),
      new Boton(300, 320, 200, 55, "CREDITOS", "empate", "creditos"),

//Botón para volver desde los créditos
      new Boton(300, 300, 200, 55, "VOLVER", "creditos", "inicio")
    ];
  }

//Dibujamos los elementos según la pantalla actual
  dibujar() {
    image(fondo, 0, 0, 800, 400);

    if (this.estado === "jugando") {

//Dibujamos los personajes
      this.amante.dibujarAmante();
      this.marido.dibujarMarido();

//Mostramos las vidas y el tiempo
      this.juego.dibujarVida(
        this.amante.vida,
        this.marido.vida
      );

      this.juego.dibujarTiempo(this.tiempoRestante);
    } 
    
    else {

//Dibujamos la pantalla correspondiente
      this.juego.dibujarPantalla(this.estado);
      this.creditos.dibujar(this.estado);
    }

//Actualizamos el texto del botón de sonido
    if (this.sonidoActivado === true) {
      this.botones[1].texto = "DESACTIVAR SONIDO";
    } 
    
    else {
      this.botones[1].texto = "ACTIVAR SONIDO";
    }

//Recorremos el arreglo y dibujamos los botones
    for (let i = 0; i < this.botones.length; i++) {
      this.botones[i].dibujar(this.estado);
    }
  }

//Controlamos el movimiento y los choques entre personajes
  mover() {
    if (this.estado === "jugando") {

//Calculamos la distancia antes de mover al amante
      let distanciaInicial = dist(this.amante.posX, this.amante.posY, this.marido.posX, this.marido.posY);

//Movemos al amante
      this.amante.moverAmante();

//Calculamos nuevamente la distancia
      let distanciaAmante = dist(this.amante.posX, this.amante.posY, this.marido.posX, this.marido.posY);

//Si se separan, permitimos que vuelva a producirse un choque
      if (distanciaAmante > 115) {
        this.choque = false;
      }

//Si el amante provoca el choque, el marido pierde una vida
      if (this.choque === false && distanciaInicial >= 100 && distanciaAmante < 100) {
        this.marido.vida--;

        if (this.sonidoActivado === true) {
          sonidoAtaque.play();
        }

        this.choque = true;
      }

//El marido persigue al amante
      this.marido.moverMarido(this.amante);

//Calculamos la distancia después del movimiento del marido
      let distanciaFinal = dist(this.amante.posX, this.amante.posY, this.marido.posX, this.marido.posY);

//Si el marido provoca el choque, el amante pierde una vida
      if (this.choque === false && distanciaAmante >= 100 && distanciaFinal < 100) {
        this.amante.vida--;

        if (this.sonidoActivado === true) {
          sonidoAtaque.play();
        }

        this.choque = true;
      }

//Si vuelven a separarse, se permite otro choque
      if (distanciaFinal > 115) {
        this.choque = false;
      }

//Actualizamos el tiempo y comprobamos el resultado
      this.actualizarTiempo();
      this.comprobarResultado();
    }
  }

//Calculamos el tiempo restante de la partida
  actualizarTiempo() {
    this.tiempoRestante = 30 - floor((millis() - this.tiempoInicio) / 1000);

//Evitamos que el tiempo sea negativo
    if (this.tiempoRestante < 0) {
      this.tiempoRestante = 0;
    }
  }

//Comprobamos si el juego terminó
  comprobarResultado() {

//Si el marido se queda sin vidas, gana el amante
    if (this.marido.vida <= 0) {
      this.marido.vida = 0;
      this.estado = "gana";

      this.reproducirSonidoResultado(sonidoGana);

//Si el amante se queda sin vidas, pierde
    } else if (this.amante.vida <= 0) {
      this.amante.vida = 0;
      this.estado = "pierde";

      this.reproducirSonidoResultado(sonidoPierde);

//Si se termina el tiempo, comparamos las vidas
    } 
    
    else if (this.tiempoRestante <= 0) {

      if (this.amante.vida > this.marido.vida) {
        this.estado = "gana";

        this.reproducirSonidoResultado(sonidoGana);

      } 
      
      else if (this.marido.vida > this.amante.vida) {
        this.estado = "pierde";

        this.reproducirSonidoResultado(sonidoPierde);

//Si tienen la misma cantidad de vidas, hay empate
      } 
      
      else {
        this.detenerSonidos();
        this.estado = "empate";
      }
    }
  }

//Detenemos todos los sonidos
  detenerSonidos() {
    sonidoInicio.stop();
    sonidoAtaque.stop();
    sonidoGana.stop();
    sonidoPierde.stop();
  }

//Reproducimos el sonido del resultado si está activado
  reproducirSonidoResultado(sonido) {
    this.detenerSonidos();

    if (this.sonidoActivado === true) {
      sonido.play();
    }
  }

//Detectamos qué botón fue presionado
  mousePresionado() {
    for (let i = 0; i < this.botones.length; i++) {

//Comprobamos si el clic corresponde a un botón de la pantalla actual
      if (this.botones[i].presionado(mouseX, mouseY, this.estado)) {

//Activamos o desactivamos los sonidos
        if (this.botones[i].destino === "sonido") {

          this.sonidoActivado = !this.sonidoActivado;

          if (this.sonidoActivado === true) {
            sonidoInicio.loop();
          }
          
          else {
            this.detenerSonidos();
          }

//Si el botón lleva al juego, reiniciamos la partida
        }
        
        else if (this.botones[i].destino === "jugando") {
          this.reiniciar();

//Si el botón lleva a los créditos, cambiamos de pantalla
        }
        
        else if (this.botones[i].destino === "creditos") {
          this.estado = "creditos";

//Si el botón lleva al inicio, cambiamos de pantalla
        } else if (this.botones[i].destino === "inicio") {
          this.estado = "inicio";

          if (this.sonidoActivado === true) {
            sonidoInicio.loop();
          }
        }

//Terminamos de revisar los botones después del clic
        return;
      }
    }
  }

//Detectamos la tecla R para volver a intentar
  teclaPresionada() {
    if (this.estado === "gana" || this.estado === "pierde" || this.estado === "empate") {
      if (key === "r" || key === "R") {
        this.reiniciar();
      }
    }
  }

//Reiniciamos los personajes y los valores de la partida
  reiniciar() {

//Detenemos los sonidos anteriores
    this.detenerSonidos();

//Creamos nuevamente los personajes
    this.amante = new Amante();
    this.marido = new Marido();

//Reiniciamos las variables
    this.choque = false;
    this.tiempoRestante = 30;
    this.tiempoInicio = millis();

//Volvemos a la pantalla del juego
    this.estado = "jugando";
  }
}
