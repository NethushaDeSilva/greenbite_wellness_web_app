document.getElementById('calc-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);
    const activity = parseFloat(document.getElementById('activity').value);

    if (age < 1 || height < 1 || weight < 1) {
        alert('Invalid input');
        return;
    }

    const bmr = gender === 'male'
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    const tdee = bmr * activity;
    const carbs = (tdee * 0.5) / 4;
    const protein = (tdee * 0.2) / 4;
    const fat = (tdee * 0.3) / 9;

    document.getElementById('bmr').textContent = Math.round(bmr);
    document.getElementById('tdee').textContent = Math.round(tdee);
    document.getElementById('carbs').textContent = Math.round(carbs);
    document.getElementById('protein').textContent = Math.round(protein);
    document.getElementById('fat').textContent = Math.round(fat);
    document.getElementById('carbs-bar').value = 50;
    document.getElementById('protein-bar').value = 20;
    document.getElementById('fat-bar').value = 30;
    document.getElementById('results').style.display = 'block';
});