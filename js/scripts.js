let templatesCache = {}; 

document.addEventListener("DOMContentLoaded", function() {
    const pauseButton = document.querySelector('.control-icon[alt="Pausa"]');
    const pauseMenu = document.createElement('div');
    pauseMenu.classList.add('pause-menu');
    pauseMenu.innerHTML = `
        <div class="pause-content">
            <h2>Pausa</h2>
            <button class="pause-btn resume-btn">Reanudar</button>
            <button class="pause-btn levels-btn" onclick="redirigir('niveles')">Niveles</button>
            <button class="pause-btn exit-btn" onclick="redirigir('index')">Salir</button>
        </div>
    `;
    document.body.appendChild(pauseMenu);

    const resumeButton = document.querySelector('.resume-btn');
    const timerElement = document.querySelector('.timer');

    let timerDuration = 3 * 60; // 10 minutos en segundos
    let timerInterval;

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    function startTimer() {
        timerInterval = setInterval(function() {
            if (timerDuration <= 0) {
                clearInterval(timerInterval);
                // Puedes agregar lógica adicional cuando el tiempo se agote
                return;
            }
            timerDuration--;
            timerElement.textContent = formatTime(timerDuration);
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    pauseButton.addEventListener('click', function() {
        pauseMenu.style.display = 'flex';
        document.querySelector('.pantalla-juego').style.filter = 'blur(5px)';
        document.querySelector('.pantalla-juego').style.pointerEvents = 'none';
        stopTimer(); // Detener el temporizador al pausar
    });

    resumeButton.addEventListener('click', function() {
        pauseMenu.style.display = 'none';
        document.querySelector('.pantalla-juego').style.filter = '';
        document.querySelector('.pantalla-juego').style.pointerEvents = '';
        startTimer(); // Reanudar el temporizador al reanudar
    });

    // Iniciar el temporizador cuando la página cargue
    startTimer();
});


function redirigir(pagina) {
    window.location.href = `/${pagina}.html`;
}

// Funcion para cambiar de pantalla
function redirigir(pagina) {
    window.location.href = pagina + '.html';
}


// Cargar templates con preguntas
function cargarTemplates() {
    fetch('templates.html')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');

            // Cachear los templates
            doc.querySelectorAll('template').forEach(template => {
                templatesCache[template.id] = template;
            });
        })
        .catch(error => console.error('Error al cargar los templates:', error));
}


// Funcion para cambiar el contenido de una pregunta
// Modificar los estilos de los cuadros de entrada
const preguntas = {
    'pregunta1-Tipo1': {
        op1: { width: '40px', height: '40px', top: '270px', left: '48.7%' }, 
        op2: { width: '70px', height: '40px', top: '405px', left: '53%' }
    },
    'pregunta2-Tipo1':{
        op1: { width: '30px', height: '30px', top: '320px', left:'53%'},
        op2: { width: '30px', height: '30px', top: '403px', left:'51.5%'}
    },
    'pregunta3-Tipo1':{
        op1: { width: '80px', height: '50px', top: '270px', left:'53%'},
        op2: { width: '30px', height: '30px', top: '403px', left:'51.5%'}
    },
};
function aplicarEstilosPregunta(idPregunta) {
    const estilos = preguntas[idPregunta];
    if (estilos) {
        const op1 = document.querySelector('.formula-input.op1');
        const op2 = document.querySelector('.formula-input.op2');

        if (op1 && op2) {
            Object.assign(op1.style, estilos.op1);
            Object.assign(op2.style, estilos.op2);
        }
    }
}

// Función para cambiar el contenido de una pregunta
function cargarPregunta(idPregunta) {
    const contenedorJuego = document.querySelector('.game-content');
        
    // Asegúrate de que el template existe antes de intentar clonar su contenido
    const plantilla = templatesCache[idPregunta];
    console.log(plantilla);
    if (plantilla) {
        const contenido = plantilla.content.cloneNode(true);
        contenedorJuego.innerHTML = '';
        contenedorJuego.appendChild(contenido);
        
        aplicarEstilosPregunta(idPregunta);
    } else {
        console.error(`El template con ID ${idPregunta} no se encontró.`);
    }
}


// Funcion para cargar las preguntas aleatoreamente
// Tipo 1
const preguntasTipo1 = [
    'pregunta1-Tipo1',
    'pregunta2-Tipo1',
    'pregunta3-Tipo1',
];
function cargarPreguntaAleatoriaTipo1() {
    const indiceAleatorio = Math.floor(Math.random() * preguntasTipo1.length);
    const idPreguntaAleatoria = preguntasTipo1[indiceAleatorio];
    cargarPregunta(idPreguntaAleatoria);
}


// Tipo 2
const preguntasTipo2 = [
    'pregunta1-Tipo2',
    'pregunta2-Tipo2',
    'pregunta3-Tipo2',
];
function cargarPreguntaAleatoriaTipo2() {
    const indiceAleatorio = Math.floor(Math.random() * preguntasTipo2.length);
    const idPreguntaAleatoria = preguntasTipo2[indiceAleatorio];
    cargarPregunta(idPreguntaAleatoria);
}




