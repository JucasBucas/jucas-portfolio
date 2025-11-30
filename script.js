
const loadingScreen = document.getElementById('loadingScreen');

window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1500);
});

const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'dark';

document.documentElement.setAttribute('data-theme', currentTheme);

themeToggle.textContent = currentTheme === 'dark' ? '🌓' : '🌒';

themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '🌓' : '🌒';
});

const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
});

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('open');
    });
});

document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const projectCards = document.querySelectorAll('.project-card');

let currentImageIndex = 0;
const images = [];
const captions = [];

projectCards.forEach((card, index) => {
    const img = card.querySelector('img');
    const title = card.querySelector('h3').textContent;
    const description = card.querySelector('p').textContent;
    
    images.push(img.src);
    captions.push(`${title} - ${description}`);
    
    card.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox();
    });
});

function openLightbox() {
    lightbox.classList.add('active');
    updateLightboxImage();
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function updateLightboxImage() {
    lightboxImg.src = images[currentImageIndex];
    lightboxCaption.textContent = captions[currentImageIndex];
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateLightboxImage();
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateLightboxImage();
}

lightboxClose.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showPrevImage);
nextBtn.addEventListener('click', showNextImage);

document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    }
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

const typewriterElement = document.getElementById('typewriter');
const text = typewriterElement.textContent;
typewriterElement.textContent = '';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        typewriterElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

setTimeout(typeWriter, 1800);

const experienceSlider = document.getElementById('experienceSlider');
const sliderDots = document.querySelectorAll('.slider-dot');
let currentExperience = 0;

function updateExperienceSlider() {
    experienceSlider.scrollTo({
        left: currentExperience * (experienceSlider.scrollWidth / 3),
        behavior: 'smooth'
    });
    
    sliderDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentExperience);
    });
}

sliderDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentExperience = index;
        updateExperienceSlider();
    });
});

setInterval(() => {
    currentExperience = (currentExperience + 1) % 3;
    updateExperienceSlider();
}, 5000);

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const submitSpinner = document.getElementById('submitSpinner');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    let isValid = true;
    
    if (!name) {
        document.getElementById('name').parentElement.classList.add('error');
        isValid = false;
    } else {
        document.getElementById('name').parentElement.classList.remove('error');
    }
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('email').parentElement.classList.add('error');
        isValid = false;
    } else {
        document.getElementById('email').parentElement.classList.remove('error');
    }
    
    if (!message) {
        document.getElementById('message').parentElement.classList.add('error');
        isValid = false;
    } else {
        document.getElementById('message').parentElement.classList.remove('error');
    }
    
    if (isValid) {
        submitText.textContent = 'Sending...';
        submitSpinner.style.display = 'inline-block';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            formSuccess.classList.add('show');
            
            contactForm.reset();
            
            submitText.textContent = 'Send Message';
            submitSpinner.style.display = 'none';
            submitBtn.disabled = false;
            
            setTimeout(() => {
                formSuccess.classList.remove('show');
            }, 5000);
        }, 2000);
    }
});

if ('loading' in HTMLImageElement.prototype) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
        img.classList.add('loading');
        img.onload = () => img.classList.add('loaded');
    });
} else {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const lazyLoad = () => {
        lazyImages.forEach(img => {
            if (img.getBoundingClientRect().top < window.innerHeight + 100) {
                img.src = img.dataset.src || img.src;
                img.classList.add('loading');
                img.onload = () => img.classList.add('loaded');
            }
        });
    };
    
    lazyLoad();
    
    window.addEventListener('scroll', lazyLoad);
    window.addEventListener('resize', lazyLoad);
}
