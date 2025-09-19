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

// Home: Hero quote rotator
const quotes = [
    'Eat well, live well!',
    'Move your body, feel alive!',
    'Mindfulness every day!',
    'Healthy habits, happy life!',
    'Nourish your soul!'
];
let quoteIndex = 0;
function rotateQuote() {
    const quoteEl = document.getElementById('hero-quote');
    if (quoteEl) {
        quoteEl.style.opacity = 0;
        setTimeout(() => {
            quoteEl.textContent = quotes[quoteIndex];
            quoteEl.style.opacity = 1;
            quoteIndex = (quoteIndex + 1) % quotes.length;
        }, 500);
    }
}
setInterval(rotateQuote, 5000);

// Home: Daily tip
const tips = [
    'Drink 8 glasses of water daily.',
    'Eat 5 servings of vegetables.',
    'Sleep 7-8 hours for recovery.',
    'Walk 10,000 steps daily.',
    'Practice 5 minutes of mindfulness.'
];
const tipEl = document.getElementById('daily-tip');
if (tipEl) {
    const today = new Date().getDay();
    tipEl.textContent = tips[today % tips.length];
}

// Scroll reveal for elements with .reveal class
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));