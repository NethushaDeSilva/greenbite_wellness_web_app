// Calculate BMR (Mifflin-St Jeor Equation)
function calculateBMR(weight, height, age, gender) {
    if (gender === 'male') {
        return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        return 10 * weight + 6.25 * height - 5 * age - 161;
    }
}

// Calculate TDEE
function calculateTDEE(bmr, activityLevel) {
    return bmr * activityLevel;
}

// Save to localStorage
function saveToLocal(key, value) {
    let data = JSON.parse(localStorage.getItem(key)) || [];
    if (!Array.isArray(data)) data = [data];
    data.push(value);
    localStorage.setItem(key, JSON.stringify(data));
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Calorie Calculator page loaded. Initializing...');
    const calorieForm = document.getElementById('calorie-form');
    const results = document.getElementById('results');
    const bmrSpan = document.getElementById('bmr');
    const tdeeSpan = document.getElementById('tdee');
    const bmrBar = document.getElementById('bmr-bar');
    const tdeeBar = document.getElementById('tdee-bar');
    const carbsBar = document.getElementById('carbs-bar');
    const proteinBar = document.getElementById('protein-bar');
    const fatBar = document.getElementById('fat-bar');

    if (!calorieForm || !results || !bmrSpan || !tdeeSpan || !bmrBar || !tdeeBar || !carbsBar || !proteinBar || !fatBar) {
        console.error('Calorie Calculator elements not found:', { calorieForm, results, bmrSpan, tdeeSpan, bmrBar, tdeeBar, carbsBar, proteinBar, fatBar });
        alert('Error: Page components missing. Please refresh the page.');
        return;
    }

    calorieForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Calorie form submitted.');
        const age = parseInt(document.getElementById('age').value);
        const gender = document.getElementById('gender').value;
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        const activity = parseFloat(document.getElementById('activity').value);

        // Validation
        if (isNaN(age) || isNaN(weight) || isNaN(height) || !gender || !activity) {
            console.warn('Form validation failed: Invalid or missing values.');
            alert('Please fill all fields with valid values.');
            results.style.display = 'none';
            return;
        }

        // Calculate BMR and TDEE
        const bmr = calculateBMR(weight, height, age, gender);
        const tdee = calculateTDEE(bmr, activity);
        console.log('Calculated BMR:', bmr, 'TDEE:', tdee);

        // Calculate Macronutrients
        const carbsGrams = Math.round((tdee * 0.50) / 4);
        const proteinGrams = Math.round((tdee * 0.20) / 4);
        const fatGrams = Math.round((tdee * 0.30) / 9);
        console.log('Calculated Macros:', { carbsGrams, proteinGrams, fatGrams });

        // Display results
        bmrSpan.textContent = Math.round(bmr);
        tdeeSpan.textContent = Math.round(tdee);
        const bmrPercent = (bmr / 3000) * 100;
        const tdeePercent = (tdee / 3000) * 100;
        bmrBar.style.width = `${bmrPercent}%`;
        tdeeBar.style.width = `${tdeePercent}%`;
        carbsBar.style.width = '50%';
        carbsBar.textContent = `${carbsGrams} g`;
        proteinBar.style.width = '20%';
        proteinBar.textContent = `${proteinGrams} g`;
        fatBar.style.width = '30%';
        fatBar.textContent = `${fatGrams} g`;
        results.style.display = 'block';

        // Save to localStorage
        try {
            saveToLocal('calorieData', { age, gender, weight, height, activity, bmr, tdee, carbsGrams, proteinGrams, fatGrams, timestamp: new Date().toISOString() });
            console.log('Calculation saved:', { age, gender, weight, height, activity, bmr, tdee, carbsGrams, proteinGrams, fatGrams });
        } catch (e) {
            console.error('Error saving calculation:', e);
        }

        e.target.reset();
    });

    console.log('Initialization complete. Ready for use.');
});