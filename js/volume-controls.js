const audio = document.getElementById('background-sound');
const volumeSlider = document.getElementById('volume-slider');

// Establece el volumen en función del valor proporcionado, asegurándose de que esté entre 0 y 1
function changeVolume(amount) {
    // Si el amount es 0, se ajusta el volumen a 0 para silenciar
    if (amount === 0) {
        audio.volume = 0;
    } else {
        // Ajusta el volumen sumando la cantidad proporcionada al volumen actual
        audio.volume = Math.max(0, Math.min(1, audio.volume + amount));
    }
    volumeSlider.value = audio.volume;
}

// Establece el volumen en el valor especificado
function setVolume(value) {
    audio.volume = value;
    volumeSlider.value = value;
}
