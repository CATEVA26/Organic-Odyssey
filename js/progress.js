    // Función para actualizar la barra de progreso
    function updateProgressBar() {
        const progressBar = document.getElementById('progress');
        let progress = parseFloat(localStorage.getItem('progress')) || 0;

        // Incrementa el progreso
        progress += 33.33; // Incremento de 33.33% por pregunta
        if (progress > 100) progress = 100; // Evitar que pase del 100%

        // Actualiza la barra de progreso visualmente
        progressBar.style.width = progress + '%';

        // Guarda el progreso en localStorage
        localStorage.setItem('progress', progress);
    }

    // Resetea el progreso al iniciar el juego
    function resetProgress() {
        localStorage.removeItem('progress'); // Limpia el progreso de localStorage
        const progressBar = document.getElementById('progress');
        progressBar.style.width = '0%'; // Resetea visualmente la barra
    }