document.addEventListener("DOMContentLoaded", function() {
    const pauseButton = document.querySelector('.control-icon[alt="Pausa"]');
    const pauseMenu = document.createElement('div');
    pauseMenu.classList.add('pause-menu');
    pauseMenu.innerHTML = `
        <div class="pause-content">
            <h2>Pausa</h2>
            <button class="pause-btn resume-btn">Reanudar</button>
            <button class="pause-btn levels-btn">Niveles</button>
            <button class="pause-btn exit-btn">Salir</button>
        </div>
    `;
    document.body.appendChild(pauseMenu);

    const resumeButton = document.querySelector('.resume-btn');

    pauseButton.addEventListener('click', function() {
        pauseMenu.style.display = 'flex';
        document.querySelector('.pantalla-juego').style.filter = 'blur(5px)';
        document.querySelector('.pantalla-juego').style.pointerEvents = 'none';
    });

    resumeButton.addEventListener('click', function() {
        pauseMenu.style.display = 'none';
        document.querySelector('.pantalla-juego').style.filter = '';
        document.querySelector('.pantalla-juego').style.pointerEvents = '';
    });
});
