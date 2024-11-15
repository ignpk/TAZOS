
// ----------------- RESPLANDOR CARTA Y EFECTO 3D -----------------

document.addEventListener("DOMContentLoaded", function() { 
  const cartas = document.querySelectorAll(".carta");

  function aplicarEfectos(elemento) {
    const circleClasses = (elemento.getAttribute("data-circle") || "circle").split(/[\s,]+/);
    circleClasses.forEach(circleClass => {
      const circle = document.createElement("div");
      circle.classList.add(circleClass);
      elemento.appendChild(circle);
    });

    const fondoRainbow = elemento.querySelector(".fondo-rainbow");
    let lastPositionX = 0;
    let lastPositionY = 0;
    let accumulatedY1 = 0;
    let accumulatedY2 = 0;

    const moverLineas = (e) => {
      const isTouchEvent = e.type.includes("touch");
      const clientX = isTouchEvent ? e.touches[0].clientX : e.clientX;
      const clientY = isTouchEvent ? e.touches[0].clientY : e.clientY;

      const rect = elemento.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const xAxis = (centerX - clientX) / 10;
      const yAxis = -(centerY - clientY) / 10;

      elemento.style.transform = `perspective(2000px) rotateX(${yAxis}deg) rotateY(${xAxis}deg) scale(1.6)`;

      const circles = elemento.querySelectorAll("div[class^='circle']");
      circles.forEach(circle => {
        circle.style.left = `${clientX - rect.left}px`;
        circle.style.top = `${clientY - rect.top}px`;
      });

      const deltaX = clientX - lastPositionX;
      const deltaY = clientY - lastPositionY;
      lastPositionX = clientX;
      lastPositionY = clientY;

      const totalDelta = deltaX + deltaY;
      accumulatedY1 += totalDelta;
      accumulatedY2 -= totalDelta;

      const hueValue = (clientX + clientY) % 360;
      fondoRainbow.style.filter = `saturate(2) hue-rotate(${hueValue}deg)`;

      const effectContainers = elemento.querySelectorAll('.efectoholograficolineas');
      effectContainers.forEach((container, idx) => {
        const lines1 = container.querySelectorAll('.line-container:first-of-type .line');
        lines1.forEach((line, index) => {
          const offset = (index + 1) * (idx + 2);
          line.style.transform = `translateY(${accumulatedY1 / offset}px)`;
        });

        const lines2 = container.querySelectorAll('.line-container:last-of-type .line');
        lines2.forEach((line, index) => {
          const offset = (index + 1) * (idx + 2);
          line.style.transform = `translateY(${accumulatedY2 / offset}px)`;
        });
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
      elemento.style.boxShadow = "none";
      fondoRainbow.style.filter = "saturate(10)";
    };

    elemento.addEventListener("mouseenter", startInteraction);
    elemento.addEventListener("touchstart", startInteraction);
    elemento.addEventListener("mouseleave", stopInteraction);
    elemento.addEventListener("touchend", stopInteraction);
  }

  cartas.forEach(aplicarEfectos);
});


// ----------------- CARTEL INICIO -----------------

document.addEventListener("DOMContentLoaded", function() {
  const cartel = document.getElementById("cartel");

  document.addEventListener("click", (event) => {
    if (event.target !== cartel && !cartel.contains(event.target)) {
      cartel.style.display = "none";
    } else {
      cartel.style.display = "block";
    }
  });
});

// ----------------- ANGULO DE ROTACIÓN Y CARTA AL AZAR -----------------

document.addEventListener("DOMContentLoaded", function() {
  const elementosCarousel = document.querySelectorAll('.carousel-item');

  function mostrarCartas() {
    const anchoPantalla = window.innerWidth;
    const cantidadCartas = anchoPantalla < 900 ? 1 : 3; // Define cuántas cartas mostrar según la resolución
    const indicesAleatorios = [];

    // Selecciona índices aleatorios únicos según la cantidad de cartas a mostrar
    while (indicesAleatorios.length < cantidadCartas) {
      const indiceAleatorio = Math.floor(Math.random() * elementosCarousel.length);
      if (!indicesAleatorios.includes(indiceAleatorio)) {
        indicesAleatorios.push(indiceAleatorio);
      }
    }

    elementosCarousel.forEach((elemento, index) => {
      if (indicesAleatorios.includes(index)) {
        elemento.style.display = 'flex';
        elemento.style.transform = 'none';
      } else {
        elemento.style.display = 'none';
      }
    });
  }

  const boton = document.getElementById('nuevoBoton');
  boton.addEventListener('click', mostrarCartas);

  mostrarCartas(); // Muestra las cartas al cargar la página

  // Escucha el cambio de tamaño de la ventana y vuelve a ejecutar la función
  window.addEventListener('resize', mostrarCartas);
});

// ----------------- FONDO DIFUMINADO -----------------

document.addEventListener("DOMContentLoaded", function() {
  const overlay = document.getElementById('overlay');
  const boton = document.getElementById('nuevoBoton');

  boton.addEventListener('mouseover', () => {
    overlay.style.opacity = '1';
  });

  boton.addEventListener('mouseout', () => {
    overlay.style.opacity = '0';
  });
});

// ----------------- BOTÓN CAMBIO DE CARTA -----------------

document.addEventListener('DOMContentLoaded', function() {
  const miDiv = document.getElementById('nuevoBoton');

  miDiv.addEventListener('click', function() {
    this.classList.add('animar');
    this.addEventListener('animationend', function() {
      this.classList.remove('animar');
    });
  });
});
