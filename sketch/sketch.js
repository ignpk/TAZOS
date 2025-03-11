document.addEventListener("DOMContentLoaded", function () {
  const cartas = document.querySelectorAll(".carta");

  function aplicarEfectos(elemento) {
    // Agregar círculos según las clases especificadas en "data-circle"
    const circleClasses = (elemento.getAttribute("data-circle") || "circle").split(/[\s,]+/);
    circleClasses.forEach(circleClass => {
      const circle = document.createElement("div");
      circle.classList.add(circleClass);
      elemento.appendChild(circle);
    });

    // Referencias a elementos específicos dentro de cada carta
    const fondoRainbow = elemento.querySelector(".fondo-rainbow");
    const medio = elemento.querySelector(".medio");
    const arriba = elemento.querySelector(".arriba");
    const sombra = elemento.querySelector(".sombra");


    const moverLineas = (e) => {
      const isTouchEvent = e.type.includes("touch");
      const clientX = isTouchEvent ? e.touches[0].clientX : e.clientX;
      const clientY = isTouchEvent ? e.touches[0].clientY : e.clientY;

      const rect = elemento.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const xAxis = (centerX - clientX) / 10;
      const yAxis = -(centerY - clientY) / 10;

      elemento.style.transform = `perspective(800px) rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;

        // 🔹 **Aplicar sombra dinámica**
  const shadowX = (clientX - rect.left - rect.width / 2) / 8;
  const shadowY = (clientY - rect.top - rect.height / 2) / 8;
  elemento.style.boxShadow = `${shadowX}px ${shadowY}px 5px rgba(0, 0, 0, 0.3)`;


      // Calcular el porcentaje de desplazamiento en el eje X para opacidades
      if (medio && arriba && sombra) {
        const offsetY = clientY - rect.top;
        const porcentajeY = offsetY / rect.height;

      if (porcentajeY < 0.33) {
          arriba.style.opacity = 1 - (porcentajeY * 3);
          medio.style.opacity = (porcentajeY - 0) * 3;
          sombra.style.opacity = 0;
        } else if (porcentajeY < 0.5) {
          arriba.style.opacity = 0;
          medio.style.opacity = 2 - Math.abs(0.5 - porcentajeY) * 3;
          sombra.style.opacity = 0;
        } else {
          arriba.style.opacity = 0;
          medio.style.opacity = 1 - Math.abs(0.5 - porcentajeY) * 3;
          sombra.style.opacity = (porcentajeY - 0.5) * 3;
        }
      }

      // Mover círculos
      const circles = elemento.querySelectorAll("div[class^='circle']");
      circles.forEach(circle => {
        circle.style.left = `${clientX - rect.left}px`;
        circle.style.top = `${clientY - rect.top}px`;
      });


    };

    const startInteraction = () => {
      elemento.addEventListener("mousemove", moverLineas);
      elemento.addEventListener("touchmove", moverLineas);
    };

    const stopInteraction = () => {
      elemento.removeEventListener("mousemove", moverLineas);
      elemento.removeEventListener("touchmove", moverLineas);
      elemento.style.transform = "rotateY(0deg) rotateX(0deg)";
      if (fondoRainbow) fondoRainbow.style.filter = "saturate(10)";
    };

    elemento.addEventListener("mouseenter", startInteraction);
    elemento.addEventListener("touchstart", startInteraction);
    elemento.addEventListener("mouseleave", stopInteraction);
    elemento.addEventListener("touchend", stopInteraction);
  }

  cartas.forEach(aplicarEfectos);

  // Función para gestionar el cartel inicial
  const cartel = document.getElementById("cartel");
  if (cartel) {
    document.addEventListener("click", (event) => {
      if (event.target !== cartel && !cartel.contains(event.target)) {
        cartel.style.display = "none";
      } else {
        cartel.style.display = "block";
      }
    });
  }

  // Función para mostrar cartas aleatorias según el ancho de la pantalla
  const carouselItems = document.querySelectorAll('.carousel-item');
  const tarjetas = document.querySelectorAll('.carousel-item .tarjeta');
  const animaciones = ['animacion1', 'animacion2', 'animacion3'];

  function mostrarCartas() {
    const anchoPantalla = window.innerWidth;
    const cantidadCartas = anchoPantalla < 900 ? 1 : 3;
    const indicesAleatorios = [];

    while (indicesAleatorios.length < cantidadCartas) {
      const indiceAleatorio = Math.floor(Math.random() * tarjetas.length);
      if (!indicesAleatorios.includes(indiceAleatorio)) {
        indicesAleatorios.push(indiceAleatorio);
      }
    }

    tarjetas.forEach((tarjeta, index) => {
      const parent = tarjeta.closest('.carousel-item');
      tarjeta.classList.remove(...animaciones);
      parent.style.display = 'none';

      if (indicesAleatorios.includes(index)) {
        parent.style.display = 'flex';
        tarjeta.style.transform = 'none';
        const animacion = animaciones[indicesAleatorios.indexOf(index) % animaciones.length];
        tarjeta.classList.add(animacion);
      }
    });
  }

  const boton = document.getElementById('nuevoBoton');
  if (boton) {
    boton.addEventListener('click', mostrarCartas);
    boton.addEventListener('mouseover', () => {
      const overlay = document.getElementById('overlay');
      if (overlay) overlay.style.opacity = '1';
    });

    boton.addEventListener('mouseout', () => {
      const overlay = document.getElementById('overlay');
      if (overlay) overlay.style.opacity = '0';
    });

    boton.addEventListener('click', function () {
      this.classList.add('animar');
      this.addEventListener('animationend', function () {
        this.classList.remove('animar');
      });
    });
  }

  mostrarCartas();
  window.addEventListener('resize', mostrarCartas);
});
