document.addEventListener('DOMContentLoaded', function () {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    const getThemeIcon = theme => theme === 'dark' ? '☀️' : '🌙';
    const setTheme = theme => {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeToggle) {
            themeToggle.textContent = getThemeIcon(theme);
            themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
        }
    };

    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }

    // Smooth Scrolling for Navigation Links
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

    // Enhanced Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add different animations based on element type
                if (entry.target.classList.contains('hero')) {
                    entry.target.classList.add('animate__animated', 'animate__fadeIn');
                } else if (entry.target.classList.contains('feature')) {
                    entry.target.classList.add('animate__animated', 'animate__fadeInLeft');
                } else {
                    entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });

    // Mobile Menu Toggle
    const createMobileMenu = () => {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        const existingToggle = document.querySelector('.mobile-menu-toggle');

        if (window.innerWidth <= 768) {
            if (!existingToggle) {
                const mobileToggle = document.createElement('button');
                mobileToggle.className = 'mobile-menu-toggle';
                mobileToggle.innerHTML = '☰';
                mobileToggle.setAttribute('aria-label', 'Toggle mobile menu');

                header.appendChild(mobileToggle);

                mobileToggle.addEventListener('click', () => {
                    const isActive = nav.classList.toggle('mobile-active');
                    mobileToggle.innerHTML = isActive ? '✕' : '☰';
                });
            }
        } else {
            if (existingToggle) {
                existingToggle.remove();
            }
            nav.classList.remove('mobile-active');
        }
    };

    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            const nav = document.querySelector('nav');
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            if (nav && nav.classList.contains('mobile-active')) {
                nav.classList.remove('mobile-active');
                if (mobileToggle) mobileToggle.innerHTML = '☰';
            }
        });
    });

    // Active Navigation Highlighting
    const highlightActiveNav = () => {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('nav a');

        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (linkPath === currentPath.split('/').pop()) {
                link.classList.add('active-nav');
            } else {
                link.classList.remove('active-nav');
            }
        });
    };

    highlightActiveNav();

    // Particles Initialization
    initParticles();

    // Form Validation Enhancement
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateField(input);
            });

            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            });
        });
    });

    // Loading State Management
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Image Modal Functionality
    const images = document.querySelectorAll('.screenshots img');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const imageCounter = document.getElementById('imageCounter');
    
    let currentImageIndex = 0;
    const imageArray = Array.from(images);

    // Open modal on image click
    images.forEach((img, index) => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            currentImageIndex = index;
            updateImageCounter();
            document.body.style.overflow = 'hidden';
        });
        
        img.style.cursor = 'pointer';
    });

    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Navigate to next image
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % imageArray.length;
            modalImg.src = imageArray[currentImageIndex].src;
            updateImageCounter();
        });
    }

    // Navigate to previous image
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + imageArray.length) % imageArray.length;
            modalImg.src = imageArray[currentImageIndex].src;
            updateImageCounter();
        });
    }

    // Update image counter display
    function updateImageCounter() {
        if (imageCounter) {
            imageCounter.textContent = `${currentImageIndex + 1} / ${imageArray.length}`;
        }
    }

    // Close modal when clicking outside the image
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Keyboard Navigation for Modal
    document.addEventListener('keydown', (e) => {
        if (modal && modal.style.display === 'block') {
            if (e.key === 'ArrowRight') {
                if (nextBtn) nextBtn.click();
            } else if (e.key === 'ArrowLeft') {
                if (prevBtn) prevBtn.click();
            } else if (e.key === 'Escape') {
                closeModal();
            }
        }
    });

    // Keyboard Navigation Support (for other modals)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any open modals
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                }
            });
        }
    });
});

// Particle Initialization Function
function initParticles() {
    if (typeof tsParticles !== 'undefined' && document.getElementById('particles')) {
        tsParticles.load("particles", {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#00aaff" },
                shape: { type: "circle" },
                opacity: { value: 0.3, random: true },
                size: { value: 3, random: 2 },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#00aaff",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "bounce",
                    bounce: true
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                },
                modes: {
                    repulse: { distance: 200, duration: 0.4 },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }
}

// Field Validation Function
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error styling
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Validation rules
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    } else if (field.type === 'text' && field.id === 'from_name' && value.length < 2) {
        isValid = false;
        errorMessage = 'Name must be at least 2 characters';
    }

    // Show error if invalid
    if (!isValid) {
        field.classList.add('error');
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = errorMessage;
        field.parentNode.appendChild(errorElement);
    }

    return isValid;
}

// Email Validation Helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
