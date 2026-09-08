// ===== Mobile Navigation Toggle =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Typing Effect =====
const typingText = document.getElementById('typing-text');
const words = ['Web Developer', 'UI/UX Designer', 'Problem Solver', 'Creative Thinker'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        charIndex--;
        typingText.textContent = currentWord.substring(0, charIndex);
    } else {
        charIndex++;
        typingText.textContent = currentWord.substring(0, charIndex);
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000); // Pause at complete word
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }
    
    const typingSpeed = isDeleting ? 100 : 200;
    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect
typeEffect();

// ===== Skill Bars Animation =====
const skillProgress = document.querySelectorAll('.skill-progress');

function animateSkills() {
    skillProgress.forEach(progress => {
        const progressValue = progress.getAttribute('data-progress');
        const rect = progress.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
            progress.style.width = progressValue;
        }
    });
}

// Trigger skill animation on scroll
window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// ===== Smooth Scroll for Navigation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===== Scroll Animation for Sections =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ===== Contact Form Handler (Hidden iFrame) =====
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Do NOT prevent default – let the form submit to the iframe
        
        // Show success message after a short delay
        setTimeout(() => {
            alert('✅ Thank you! Your message has been sent.');
            contactForm.reset();
        }, 1000);
        
        // Optionally disable button briefly to prevent double submits
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        setTimeout(() => {
            submitButton.disabled = false;
        }, 3000);
    });
}

// ===== Scroll Progress Bar =====
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollProgress + '%';
    });
};

createScrollProgress();

// ===== Parallax Effect on Hero =====
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.scrollY;
    
    if (scrolled < window.innerHeight) {
        hero.style.backgroundPosition = `50% ${scrolled * 0.5}px`;
    }
});

// ===== Infinite Reviews Slider Duplication =====
function duplicateReviews() {
    const track = document.querySelector('.reviews-track');
    if (!track) return;
    
    const cards = Array.from(track.children);
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });
}

// Run after DOM is ready
document.addEventListener('DOMContentLoaded', duplicateReviews);

// ===== Theme Management =====
const themeToggle = document.getElementById('theme-toggle');
const themeDropdown = document.getElementById('theme-dropdown');
const themeOptions = document.querySelectorAll('.theme-option');

// Function to apply a theme
function applyTheme(theme) {
    // Remove all theme classes
    document.body.classList.remove('dark-theme', 'blue-theme', 'green-theme', 'purple-theme');

    if (theme === 'system') {
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-theme');
        }
        localStorage.setItem('theme', 'system');
    } else if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    } else if (theme === 'blue') {
        document.body.classList.add('blue-theme');
        localStorage.setItem('theme', 'blue');
    } else if (theme === 'green') {
        document.body.classList.add('green-theme');
        localStorage.setItem('theme', 'green');
    } else if (theme === 'purple') {
        document.body.classList.add('purple-theme');
        localStorage.setItem('theme', 'purple');
    } else {
        // light theme
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme or system preference on page load
const savedTheme = localStorage.getItem('theme') || 'system';
applyTheme(savedTheme);

// Toggle dropdown
themeToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    themeDropdown.classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!themeToggle.contains(e.target) && !themeDropdown.contains(e.target)) {
        themeDropdown.classList.remove('active');
    }
});

// Handle theme selection
themeOptions.forEach(option => {
    option.addEventListener('click', () => {
        const theme = option.getAttribute('data-theme');
        applyTheme(theme);
        themeDropdown.classList.remove('active');
    });
});

// Listen for system preference changes (if theme is set to 'system')
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem('theme') === 'system') {
        if (e.matches) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }
});

console.log('Portfolio website loaded successfully!');