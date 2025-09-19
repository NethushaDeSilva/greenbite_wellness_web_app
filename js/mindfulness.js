let timerInterval;
let breathInterval;
let timeLeft = 0;
let isRunning = false;
let isPaused = false;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function toggleSound(soundId) {
    console.log(`${soundId} button clicked. Toggling sound.`);
    const sound = document.getElementById(soundId);
    const audio = document.getElementById(`${soundId}-audio`);
    if (!button || !audio) {
        console.error(`Sound elements not found for ${soundId}:`, { button, audio });
        alert(`Error: ${soundId.replace('-sound', '')} sound not available. Check file path.`);
        return;
    }
    if (audio.paused) { 
        audio.play().then(() => {
            button.classList.add('active');
            button.textContent = `${soundId.replace('-sound', '').replace(/^\w/, c => c.toUpperCase())} (On)`;
            console.log(`${soundId} started playing.`);
        }).catch(e => {
            console.error(`Error playing ${soundId}:`, e);
            alert(`Failed to play ${soundId.replace('-sound', '')} sound. Try again.`);
        });
    } else {
        audio.pause();
        button.classList.remove('active');
        button.textContent = `${soundId.replace('-sound', '').replace(/^\w/, c => c.toUpperCase())} (Off)`;
        console.log(`${soundId} paused.`);
    }
}


        