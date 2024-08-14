let templatesCache = {};

// Menu de pausa
document.addEventListener("DOMContentLoaded", function () {
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

    pauseButton.addEventListener('click', function () {
        pauseMenu.style.display = 'flex';
        document.querySelector('.pantalla-juego').style.filter = 'blur(5px)';
        document.querySelector('.pantalla-juego').style.pointerEvents = 'none';
    });

    resumeButton.addEventListener('click', function () {
        pauseMenu.style.display = 'none';
        document.querySelector('.pantalla-juego').style.filter = '';
        document.querySelector('.pantalla-juego').style.pointerEvents = '';
    });
    const timerElement = document.querySelector('.timer');

    let timerDuration = 3 * 60; // 10 minutos en segundos
    let timerInterval;

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    function startTimer() {
        timerInterval = setInterval(function () {
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

    pauseButton.addEventListener('click', function () {
        pauseMenu.style.display = 'flex';
        document.querySelector('.pantalla-juego').style.filter = 'blur(5px)';
        document.querySelector('.pantalla-juego').style.pointerEvents = 'none';
        stopTimer(); // Detener el temporizador al pausar
    });

    resumeButton.addEventListener('click', function () {
        pauseMenu.style.display = 'none';
        document.querySelector('.pantalla-juego').style.filter = '';
        document.querySelector('.pantalla-juego').style.pointerEvents = '';
        startTimer(); // Reanudar el temporizador al reanudar
    });

    // Iniciar el temporizador cuando la página cargue
    startTimer();
});


// Funcion para cambiar de pantalla
async function redirigir(pagina) {
    comprobarPregunta()
    window.location.href = pagina + '.html';
}

let idPreguntaActual = ""//viene en forma 'pregunta1-Tipo2'
let contadorRespuestasCorrectas = 0
let posibleRespuesta1
let posibleRespuesta2
let respuestasCorrectas
function comprobarPregunta() {
    //Primero buscar la pregunta cargada y buscar el template
    alert(idPreguntaActual)
    console.log("comprobandoRespuesta")
    const plantilla = templatesCache[idPreguntaActual];
    let preguntaEncontrada
    if (idPreguntaActual.includes("Tipo2", 0)) {
        preguntaEncontrada = preguntasTipo2.find(p => p.preguntaID === idPreguntaActual)
        const verificarRespuestaTipo2 = (preguntaEncontrada) => {
            let numPregunta = parseInt(String(preguntaEncontrada.preguntaID).charAt(8));
            compararRespuestasTipo2(numPregunta, preguntaEncontrada)
        }
        verificarRespuestaTipo2(preguntaEncontrada)
        alert(contadorRespuestasCorrectas)
    } else if (idPreguntaActual.includes("Tipo1", 0)) {
        preguntaEncontrada = preguntasTipo1.find(p => p.preguntaID === idPreguntaActual)
        const verificarRespuestaTipo1 = (preguntaEncontrada) => {
            let numPregunta = parseInt(String(preguntaEncontrada.preguntaID).charAt(8));
            compararRespuestasTipo1(numPregunta, preguntaEncontrada);
        }
        verificarRespuestaTipo1(preguntaEncontrada)
        alert(contadorRespuestasCorrectas)
    }
}

function compararRespuestasTipo2(numPregunta, preguntaEncontrada) {
    const respuestasCorrectas = {
        1: preguntaEncontrada.respuesta1,
        2: preguntaEncontrada.respuesta2
    };

    let todasCorrectas = true;

    // Recorrer cada posible respuesta en el arreglo posiblesRespuestas
    preguntaEncontrada.posiblesRespuestas.forEach((respuesta, index) => {
        const respuestaCorrecta = respuestasCorrectas[index + 1]; // Asegurarse de que la respuesta correcta esté definida

        if (respuestaCorrecta && !respuesta.every((valor, i) => valor === respuestaCorrecta[i])) {
            todasCorrectas = false;
        }
    });

    if (todasCorrectas) {
        contadorRespuestasCorrectas += 100;
        alert("La respuesta es correcta");
    } else {
        alert("La respuesta es incorrecta");
        // Aquí puedes manejar la lógica de quitar vidas o cualquier otra acción necesaria
    }
}


//VIDAS DEL JUGADOR
// Variable global para manejar las vidas del jugador
let vidas = 3;

function actualizarVidas() {
    const vidasElementos = document.querySelectorAll('.life-icon');
    for (let i = 0; i < vidasElementos.length; i++) {
        if (i < vidas) {
            vidasElementos[i].src = '/img/heart-full.png'; // Corazón lleno
        } else {
            vidasElementos[i].src = '/img/heart-empty.png'; // Corazón vacío
        }
    }
    sessionStorage.setItem('vidas', vidas.toString());
}

function verificarDerrota() {
    if (vidas <= 0) {
        alert('Has perdido todas tus vidas. Fin del juego.');
        window.location.href = 'respuestaCorrecta.html';
    }
}

function compararRespuestasTipo1(numPregunta, preguntaEncontrada) {
    alert("comparando..")
    switch (numPregunta) {
        case 1: //PROPANONA
            posibleRespuesta1 = document.querySelector('.formula-input.op1'); //O
            posibleRespuesta2 = document.querySelector('.formula-input.op2'); //CH
            posibleRespuesta1 = posibleRespuesta1.value.toUpperCase();
            posibleRespuesta2 = posibleRespuesta2.value.toUpperCase();
            respuestasCorrectas = preguntaEncontrada.respuestas;

            if (posibleRespuesta1 == respuetasCorrectas[0] && posibleRespuesta2 == respuetasCorrectas[1]) {
                contadorRespuestasCorrectas += contadorRespuestasCorrectas + 100;
                alert("La respuesta Es correcta");
            } else {
                alert("La respuesta Es incorrecta");
                vidas -= 1;
                actualizarVidas();
                if (vidas > 0) {
                    verificarDerrota();
                }
            } 

            break;
        case 2: //ETANOL
            posibleRespuesta1 = document.querySelector('.formula-input.op1'); //O
            posibleRespuesta2 = document.querySelector('.formula-input.op2'); //H
            posibleRespuesta1 = posibleRespuesta1.value.toUpperCase();
            posibleRespuesta2 = posibleRespuesta2.value.toUpperCase();
            respuestasCorrectas = preguntaEncontrada.respuestas;

            if (posibleRespuesta1 == respuestasCorrectas[0] && posibleRespuesta2 == respuestasCorrectas[1]) {
                contadorRespuestasCorrectas += contadorRespuestasCorrectas + 100;
                alert("La respuesta Es correcta");
            } else {
                alert("La respuesta Es incorrecta");
                vidas -= 1;
                actualizarVidas();
                if (vidas > 0) {
                    verificarDerrota();
                }
            } 

            break;
        case 3: //PENTANOL
            posibleRespuesta1 = document.querySelector('.formula-input.op1'); //O
            posibleRespuesta1 = posibleRespuesta1.value.toUpperCase();
            respuestasCorrectas = preguntaEncontrada.respuestas;

            if (posibleRespuesta1 == respuestasCorrectas[0]) {
                contadorRespuestasCorrectas += contadorRespuestasCorrectas + 100;
                alert("La respuesta Es correcta");
            } else {
                alert("La respuesta Es incorrecta");
                vidas -= 1;
                actualizarVidas();
                if (vidas > 0) {
                    verificarDerrota();
                }
            }   
            break;
    }
}

// Cargar templates con preguntas
async function cargarTemplates() {
    try {
        const randomParam = '?nocache=' + new Date().getTime();
        const response = await fetch('templates.html' + randomParam);
        const data = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');

        doc.querySelectorAll('template').forEach(template => {
            templatesCache[template.id] = template;
        });

        console.log('Templates cargados correctamente');
    } catch (error) {
        console.error('Error al cargar los templates:', error);
    }
}


// Funcion para cambiar el contenido de una pregunta
// Modificar los estilos de los cuadros de entrada
const preguntas = {
    'pregunta1-Tipo1': {
        op1: { width: '40px', height: '40px', top: '270px', left: '48.7%' },
        op2: { width: '70px', height: '40px', top: '405px', left: '53%' }
    },
    'pregunta2-Tipo1': {
        op1: { width: '30px', height: '30px', top: '320px', left: '53%' },
        op2: { width: '30px', height: '30px', top: '403px', left: '51.5%' }
    },
    'pregunta3-Tipo1': {
        op1: { width: '80px', height: '50px', top: '270px', left: '53%' },
        op2: { width: '30px', height: '30px', top: '403px', left: '51.5%' }
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
    idPreguntaActual = idPregunta
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
    {
        preguntaID: 'pregunta1-Tipo1',
        respuestas: ['O', 'CH']
    },
    {
        preguntaID: 'pregunta2-Tipo1',
        respuestas: ['O', 'H']
    },
    {
        preguntaID: 'pregunta3-Tipo1',
        respuestas: ['OH']
    },
];
function cargarPreguntaAleatoriaTipo1() {
    const indiceAleatorio = Math.floor(Math.random() * preguntasTipo1.length);
    const idPreguntaAleatoria = preguntasTipo1[indiceAleatorio].preguntaID;
    cargarPregunta(idPreguntaAleatoria);
}


// Tipo 2
const preguntasTipo2 = [
    {
        preguntaID: 'pregunta1-Tipo2',
        respuesta1: ['img-etanol', 'btn-etanol'],
        respuesta2: ['img-pentanol','btn-pentanol'], 
        posiblesRespuestas: []
    },
    {
        preguntaID: 'pregunta2-Tipo2',
        respuesta1: ['img-acetona', 'btn-acetona'],
        respuesta2: ['img-pentanol','btn-pentanol'], 
        posiblesRespuestas: []
    },
    {
        preguntaID: 'pregunta3-Tipo2',
        respuestas: ['Etanol', 'Acetona'],
        respuesta1: ['img-etanol', 'btn-etanol'],
        respuesta2: ['img-acetona','btn-acetona'], 
        posiblesRespuestas: []
    },

];
function cargarPreguntaAleatoriaTipo2() {
    const indiceAleatorio = Math.floor(Math.random() * preguntasTipo2.length);
    const idPreguntaAleatoria = preguntasTipo2[indiceAleatorio].preguntaID;
    cargarPregunta(idPreguntaAleatoria);
}
function dibujarLinea() {
    let firstElement = null;
    const elements = document.querySelectorAll('.element');
    const svgContainer = document.getElementById('line-container');
    let linesCount = 0;

    elements.forEach(element => {
        element.addEventListener('click', function () {
            const rect = element.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;

            if (!firstElement) {
                // Guardar el primer elemento seleccionado
                firstElement = { x, y, id: element.id, type: element.tagName.toLowerCase() };
            } else {
                // Verificar si los elementos son de diferente tipo
                if (firstElement.type !== element.tagName.toLowerCase()) {
                    if (linesCount < 2) {
                        // Crear una línea entre el primer y segundo elemento
                        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                        line.setAttribute("x1", firstElement.x);
                        line.setAttribute("y1", firstElement.y);
                        line.setAttribute("x2", x);
                        line.setAttribute("y2", y);
                        line.setAttribute("stroke", "#b3ea51");
                        line.setAttribute("stroke-width", "2");

                        // Añadir la línea al contenedor SVG
                        svgContainer.appendChild(line);
                        linesCount++;

                        let imgElement = firstElement.type === 'img' ? firstElement.id : element.id;
                        let btnElement = firstElement.type === 'button' ? firstElement.id : element.id;

                        // Actualizar posiblesRespuestas directamente en el objeto correspondiente
                        preguntasTipo2.forEach(pregunta => {
                            if (pregunta.preguntaID === idPreguntaActual) {
                                pregunta.posiblesRespuestas.push([imgElement, btnElement]);
                            }
                        });

                        // Imprimir mensaje con los elementos conectados
                        console.log(`Conexión establecida entre ${firstElement.id} y ${element.id}`);
                    } else {
                        // Si ya hay 2 líneas, eliminar la más antigua y agregar la nueva
                        svgContainer.removeChild(svgContainer.firstChild);

                        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                        line.setAttribute("x1", firstElement.x);
                        line.setAttribute("y1", firstElement.y);
                        line.setAttribute("x2", x);
                        line.setAttribute("y2", y);
                        line.setAttribute("stroke", "#b3ea51");
                        line.setAttribute("stroke-width", "2");

                        svgContainer.appendChild(line);

                        let imgElement = firstElement.type === 'img' ? firstElement.id : element.id;
                        let btnElement = firstElement.type === 'button' ? firstElement.id : element.id;

                        // Reemplazar la respuesta más antigua
                        preguntasTipo2.forEach(pregunta => {
                            if (pregunta.preguntaID === idPreguntaActual) {
                                pregunta.posiblesRespuestas.shift();
                                pregunta.posiblesRespuestas.push([imgElement, btnElement]);
                            }
                        });

                        // Imprimir mensaje con los elementos conectados
                        console.log(`Conexión establecida entre ${firstElement.id} y ${element.id}`);
                    }
                } else {
                    console.log("No se puede conectar elementos del mismo tipo");
                }

                // Reiniciar el primer elemento para futuras selecciones
                firstElement = null;
            }
        });
    });
}
