// Reusable save to localStorage
function saveToLocal(key, value) {
    let data = JSON.parse(localStorage.getItem(key)) || [];
    data.push(value);
    localStorage.setItem(key, JSON.stringify(data));
}

// Hamburger menu toggle
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('nav-active');
});

// Newsletter subscription
document.getElementById('newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value;
    if (/^\S+@\S+\.\S+$/.test(email) {
        saveToLocal('subscribers', email);
        alert('Subscribed successfully!');
    } else {
        alert('Please enter a valid email.');   
    }
    e.target.reset();
});

