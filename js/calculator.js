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

    