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

function startOrResumeTimer(duration) {
    console.log(`Start/Resume button clicked. ${isPaused ? 'Resuming' : 'Starting'} timer with duration: ${duration} minutes. Remaining time: ${timeLeft} seconds`);
    clearInterval(timerInterval);
    clearInterval(breathInterval);
    if (isPaused) {
        isPaused = false;
    } else {
        timeLeft = duration * 60;
    }
    isRunning = true;
    const timerDisplay = document.getElementById('timer-display');
    const breathCircle = document.getElementById('breath-circle');
    const breathText = document.getElementById('breath-text');
    const togglePauseBtn = document.getElementById('toggle-pause');
    const startBtn = document.getElementById('start-timer');
    if (!timerDisplay || !breathCircle || !breathText || !togglePauseBtn || !startBtn) {
        console.error('Timer elements not found:', { timerDisplay, breathCircle, breathText, togglePauseBtn, startBtn });
        alert('Error: Timer components missing. Please refresh the page.');
        return;
    }
    timerDisplay.textContent = formatTime(timeLeft);
    togglePauseBtn.textContent = 'Pause';
    togglePauseBtn.disabled = false;
    startBtn.disabled = true;
    let inhale = true;
    breathInterval = setInterval(() => {
        breathText.textContent = inhale ? 'Inhale...' : 'Exhale...';
        breathCircle.classList.add(inhale ? 'inhale' : 'exhale');
        breathCircle.classList.remove(inhale ? 'exhale' : 'inhale');
        console.log('Breathing text updated:', breathText.textContent, 'Circle class:', breathCircle.classList);
        inhale = !inhale;
    }, 2000); // 2s per phase, 4s full cycle
    timerInterval = setInterval(() => {
        timeLeft--;
        console.log(`Time left: ${timeLeft} seconds`);
        if (timeLeft < 0) {
            clearInterval(timerInterval);
            clearInterval(breathInterval);
            timerDisplay.textContent = 'Done!';
            breathCircle.classList.remove('inhale', 'exhale');
            breathText.textContent = 'Inhale...';
            isRunning = false;
            startBtn.disabled = false;
            togglePauseBtn.disabled = true;
            // Stop all sounds on completion
            ['rain-sound', 'ocean-sound'].forEach(soundId => {
                const audio = document.getElementById(`${soundId}-audio`);
                const button = document.getElementById(soundId);
                if (audio && !audio.paused) {
                    audio.pause();
                    button.classList.remove('active');
                    button.textContent = `${soundId.replace('-sound', '').replace(/^\w/, c => c.toUpperCase())} (Off)`;
                    console.log(`${soundId} paused on completion.`);
                }
            });
            try {
                saveToLocal('meditationSessions', { duration, timestamp: new Date().toISOString() });
                console.log('Session completed and saved.');
                loadHistory();
            } catch (e) {
                console.error('Error saving session:', e);
            }
            return;
        }
        timerDisplay.textContent = formatTime(timeLeft);
    }, 1000);
}

function togglePause() {
    console.log('Toggle Pause button clicked. Pausing timer.');
    clearInterval(timerInterval);
    clearInterval(breathInterval);
    isRunning = false;
    isPaused = true;
    const breathCircle = document.getElementById('breath-circle');
    const breathText = document.getElementById('breath-text');
    const togglePauseBtn = document.getElementById('toggle-pause');
    const startBtn = document.getElementById('start-timer');
    if (!breathCircle || !breathText || !togglePauseBtn || !startBtn) {
        console.error('Pause elements not found.');
        return;
    }
    breathCircle.classList.remove('inhale', 'exhale');
    breathText.textContent = 'Inhale...';
    togglePauseBtn.textContent = 'Resume';
    startBtn.disabled = true;
}

function resetTimer() {
    console.log('Reset button clicked. Resetting timer.');
    clearInterval(timerInterval);
    clearInterval(breathInterval);
    isRunning = false;
    isPaused = false;
    const duration = parseInt(document.getElementById('duration').value) || 5;
    timeLeft = duration * 60;
    const timerDisplay = document.getElementById('timer-display');
    const breathCircle = document.getElementById('breath-circle');
    const breathText = document.getElementById('breath-text');
    const startBtn = document.getElementById('start-timer');
    const togglePauseBtn = document.getElementById('toggle-pause');
    if (!timerDisplay || !breathCircle || !breathText || !startBtn || !togglePauseBtn) {
        console.error('Reset elements not found.');
        return;
    }
    timerDisplay.textContent = formatTime(timeLeft);
    breathCircle.classList.remove('inhale', 'exhale');
    breathText.textContent = 'Inhale...';
    startBtn.disabled = false;
    togglePauseBtn.textContent = 'Pause';
    togglePauseBtn.disabled = true;
    // Stop all sounds on reset
    ['rain-sound', 'ocean-sound'].forEach(soundId => {
        const audio = document.getElementById(`${soundId}-audio`);
        const button = document.getElementById(soundId);
        if (audio && !audio.paused) {
            audio.pause();
            button.classList.remove('active');
            button.textContent = `${soundId.replace('-sound', '').replace(/^\w/, c => c.toUpperCase())} (Off)`;
            console.log(`${soundId} paused on reset.`);
        }
    });
}