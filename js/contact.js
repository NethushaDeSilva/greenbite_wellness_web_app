document.addEventListener('DOMContentLoaded', () => {
    console.log('Contact page loaded. Initializing...');
    const contactForm = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');
    const historyList = document.getElementById('history-list');
    const submissionHistory = document.getElementById('submission-history');
    const faqQuestions = document.querySelectorAll('.faq-question');

    if (!contactForm || !feedback || !historyList || !submissionHistory || !faqQuestions) {
        console.error('Contact page elements not found:', { contactForm, feedback, historyList, submissionHistory, faqQuestions });
        alert('Error: Page components missing. Please refresh the page.');
        return;
    }

    function loadSubmissionHistory() {
        console.log('Skipping submission history rendering for public users.');
        // No UI updates, but localStorage can still be used for saving submissions
    }

    function toggleFAQ(e) {
        console.log('FAQ question clicked:', e.target.textContent);
        const button = e.target;
        const answerId = button.getAttribute('aria-controls');
        const answer = document.getElementById(answerId);
        if (!answer) {
            console.error('FAQ answer not found for ID:', answerId);
            return;
        }
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', !isExpanded);
        answer.classList.toggle('active');
        console.log(`FAQ ${answerId} ${isExpanded ? 'collapsed' : 'expanded'}`);
    }

    loadSubmissionHistory();

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Contact form submitted.');
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation
        let errors = [];
        if (!name) {
            errors.push('Name is required.');
        }
        if (!email) {
            errors.push('Email is required.');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push('Please enter a valid email address.');
        }
        if (!message) {
            errors.push('Message is required.');
        } else if (message.length < 10) {
            errors.push('Message must be at least 10 characters long.');
        }

        if (errors.length > 0) {
            console.warn('Form validation failed:', errors);
            feedback.textContent = errors.join(' ');
            feedback.classList.add('error');
            feedback.classList.remove('success');
            return;
        }

        // Save submission
        try {
            saveToLocal('contactSubmissions', { name, email, message, timestamp: new Date().toISOString() });
            console.log('Submission saved:', { name, email, message });
            feedback.textContent = 'Message sent successfully!';
            feedback.classList.add('success');
            feedback.classList.remove('error');
            contactForm.reset();
            loadSubmissionHistory();
        } catch (e) {
            console.error('Error saving submission:', e);
            feedback.textContent = 'Error saving submission. Please try again.';
            feedback.classList.add('error');
            feedback.classList.remove('success');
        }
    });

    faqQuestions.forEach(button => {
        button.addEventListener('click', toggleFAQ);
    });

    console.log('Initialization complete. Ready for use.');
});