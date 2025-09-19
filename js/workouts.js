const workouts = {
    'arms': {
        'none': [
            "Push-ups: 3 sets of 12 reps",
            "Tricep Dips (chair): 3 sets of 10 reps",
            "Arm Circles: 3 sets of 30 seconds",
            "Plank to Push-up: 3 sets of 10 reps",
            "Handstand Hold: 3 sets of 20 seconds"
        ],
        'dumbbells': [
            "Bicep Curls: 3 sets of 12 reps",
            "Tricep Extensions: 3 sets of 10 reps",
            "Shoulder Press: 3 sets of 12 reps",
            "Hammer Curls: 3 sets of 10 reps",
            "Lateral Raises: 3 sets of 12 reps"
        ],
        'resistance-band': [
            "Band Bicep Curls: 3 sets of 15 reps",
            "Band Tricep Pushdowns: 3 sets of 12 reps",
            "Band Pull-Aparts: 3 sets of 15 reps",
            "Band Overhead Press: 3 sets of 12 reps",
            "Band Front Raises: 3 sets of 12 reps"
        ]
    },
    'legs': {
        'none': [
            "Squats: 3 sets of 15 reps",
            "Lunges: 3 sets of 12 reps per leg",
            "Calf Raises: 3 sets of 20 reps",
            "Glute Bridges: 3 sets of 15 reps",
            "Wall Sit: 3 sets of 30 seconds"
        ],
        'dumbbells': [
            "Goblet Squats: 3 sets of 12 reps",
            "Dumbbell Lunges: 3 sets of 10 reps per leg",
            "Deadlifts: 3 sets of 12 reps",
            "Step-ups: 3 sets of 10 reps per leg",
            "Calf Raises with Dumbbells: 3 sets of 15 reps"
        ],
        'resistance-band': [
            "Band Squats: 3 sets of 15 reps",
            "Band Side Steps: 3 sets of 12 reps per side",
            "Band Kickbacks: 3 sets of 15 reps per leg",
            "Band Leg Press: 3 sets of 12 reps",
            "Band Calf Raises: 3 sets of 20 reps"
        ]
    },
    'full-body': {
        'none': [
            "Burpees: 3 sets of 10 reps",
            "Mountain Climbers: 3 sets of 20 reps",
            "Plank: 3 sets of 30 seconds",
            "Jumping Jacks: 3 sets of 30 seconds",
            "Bodyweight Squat to Push-up: 3 sets of 10 reps"
        ],
        'dumbbells': [
            "Dumbbell Thrusters: 3 sets of 12 reps",
            "Renegade Rows: 3 sets of 10 reps per side",
            "Dumbbell Deadlift to Press: 3 sets of 12 reps",
            "Dumbbell Clean and Press: 3 sets of 10 reps",
            "Dumbbell Snatch: 3 sets of 8 reps per side"
        ],
        'resistance-band': [
            "Band Thrusters: 3 sets of 12 reps",
            "Band Rows: 3 sets of 15 reps",
            "Band Squat to Press: 3 sets of 12 reps",
            "Band Chest Press: 3 sets of 12 reps",
            "Band Deadlifts: 3 sets of 15 reps"
        ]
    }
};

let timerInterval;
let timeLeft = 30; // 30 seconds for exercise/rest

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 30;
    const timerDisplay = document.getElementById('timer-display');
    timerDisplay.textContent = `00:${timeLeft.toString().padStart(2, '0')}`;
    timerDisplay.classList.add('timer-pulse');
    timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = 'Done!';
            timerDisplay.classList.remove('timer-pulse');
            return;
        }
        timerDisplay.textContent = `00:${timeLeft.toString().padStart(2, '0')}`;
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 30;
    const timerDisplay = document.getElementById('timer-display');
    timerDisplay.textContent = `00:${timeLeft.toString().padStart(2, '0')}`;
    timerDisplay.classList.remove('timer-pulse');
}

document.getElementById('workout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const bodyPart = document.getElementById('body-part').value;
    const equipment = document.getElementById('equipment').value;
    if (!bodyPart || !equipment) {
        alert('Please select both body part and equipment.');
        return;
    }
    const workoutList = document.getElementById('workout-list');
    const selectedWorkouts = workouts[bodyPart][equipment];
    workoutList.innerHTML = selectedWorkouts.map(w => `<li>${w}</li>`).join('');
    document.getElementById('workout-result').style.display = 'block';
    saveToLocal('workoutPrefs', { bodyPart, equipment, timestamp: new Date().toISOString() });
    resetTimer();
});

document.getElementById('start-timer').addEventListener('click', startTimer);
document.getElementById('reset-timer').addEventListener('click', resetTimer);