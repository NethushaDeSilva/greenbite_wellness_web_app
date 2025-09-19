// Render recipe cards
function renderRecipes(filter = '', category = '') {
    const grid = document.querySelector('.recipe-grid');
    grid.innerHTML = '';
    recipes
        .filter(r => r.title.toLowerCase().includes(filter.toLowerCase()) && (!category || r.category === category))
        .forEach(r => {
            const card = document.createElement('div');
            card.classList.add('recipe-card');
            card.innerHTML = `
                <img src="assets/images/recipe${r.id}.png" alt="${r.title}" loading="lazy">
                <h3>${r.title}</h3>
                <p>${r.desc}</p>
            `;
            card.addEventListener('click', () => {
                document.getElementById('modal-title').textContent = r.title;
                document.getElementById('modal-desc').textContent = r.desc;
                document.getElementById('modal-ingredients').innerHTML = r.ingredients.map(i => `<li>${i}</li>`).join('');
                document.getElementById('modal-steps').innerHTML = r.steps.map(s => `<li>${s}</li>`).join('');
                document.getElementById('calories').textContent = `${r.nutrition.calories} kcal`;
                document.getElementById('protein').textContent = `${r.nutrition.protein}g`;
                document.getElementById('carbs').textContent = `${r.nutrition.carbs}g`;
                document.getElementById('fat').textContent = `${r.nutrition.fat}g`;
                document.getElementById('recipe-modal').style.display = 'block';
            });
            grid.appendChild(card);
        });
}   

// Event listeners for search and filter
document.getElementById('search').addEventListener('input', (e) => {
    renderRecipes(e.target.value, document.getElementById('category').value);
});
document.getElementById('category').addEventListener('change', (e) => {
    renderRecipes(document.getElementById('search').value, e.target.value);
});
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('recipe-modal').style.display = 'none';
});

// Initial render
renderRecipes();
