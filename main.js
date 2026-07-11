document.addEventListener('DOMContentLoaded', function () {
    // Theme Toggle
    var themeToggle = document.getElementById('themeToggle');
    var html = document.documentElement;

    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeToggle) {
            var icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
            }
        }
    }

    setTheme(localStorage.getItem('theme') || 'dark');

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            var current = html.getAttribute('data-theme') || 'dark';
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    // Scroll Animations
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-animate').forEach(function (el) {
        observer.observe(el);
    });

    // Mobile Menu
    var overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function closeMenu() {
        var nav = document.querySelector('nav');
        var btn = document.querySelector('.mobile-menu-toggle');
        if (nav) nav.classList.remove('mobile-active');
        if (btn) btn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        overlay.classList.remove('active');
    }

    var createMobileMenu = function () {
        var header = document.querySelector('header');
        var nav = document.querySelector('nav');
        var existing = document.querySelector('.mobile-menu-toggle');

        if (window.innerWidth <= 768) {
            if (!existing) {
                var btn = document.createElement('button');
                btn.className = 'mobile-menu-toggle';
                btn.innerHTML = '<i class="fa-solid fa-bars"></i>';
                btn.setAttribute('aria-label', 'Toggle menu');
                header.insertBefore(btn, header.querySelector('.header-actions'));

                btn.addEventListener('click', function () {
                    var isOpen = nav.classList.contains('mobile-active');
                    if (isOpen) {
                        closeMenu();
                    } else {
                        nav.classList.add('mobile-active');
                        overlay.classList.add('active');
                        btn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                    }
                });
            }
        } else {
            if (existing) existing.remove();
            closeMenu();
        }
    };

    createMobileMenu();
    window.addEventListener('resize', function () {
        createMobileMenu();
        if (window.innerWidth > 768) closeMenu();
    });

    overlay.addEventListener('click', closeMenu);

    document.querySelectorAll('nav a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    // Active Nav
    var currentPath = window.location.pathname;
    document.querySelectorAll('nav a').forEach(function (link) {
        if (link.getAttribute('href') === currentPath.split('/').pop()) {
            link.classList.add('active-nav');
        } else {
            link.classList.remove('active-nav');
        }
    });

    // Image Modal
    var images = document.querySelectorAll('.screenshots img');
    var modal = document.getElementById('imageModal');
    var modalImg = document.getElementById('modalImage');
    var closeBtn = document.querySelector('.close');
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    var imageCounter = document.getElementById('imageCounter');
    var currentImageIndex = 0;
    var imageArray = Array.from(images);

    function closeModal() {
        if (modal) modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    function updateCounter() {
        if (imageCounter) {
            imageCounter.textContent = (currentImageIndex + 1) + ' / ' + imageArray.length;
        }
    }

    images.forEach(function (img, i) {
        img.addEventListener('click', function () {
            modal.style.display = 'flex';
            modalImg.src = this.src;
            currentImageIndex = i;
            updateCounter();
            document.body.style.overflow = 'hidden';
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            currentImageIndex = (currentImageIndex + 1) % imageArray.length;
            modalImg.src = imageArray[currentImageIndex].src;
            updateCounter();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            currentImageIndex = (currentImageIndex - 1 + imageArray.length) % imageArray.length;
            modalImg.src = imageArray[currentImageIndex].src;
            updateCounter();
        });
    }

    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener('keydown', function (e) {
        if (modal && modal.style.display === 'flex') {
            if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
            else if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
            else if (e.key === 'Escape') closeModal();
        }
    });

    // Swipe support for image modal on touch devices
    var touchStartX = 0;
    if (modal) {
        modal.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        modal.addEventListener('touchend', function (e) {
            var diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                if (diff > 0 && nextBtn) nextBtn.click();
                else if (diff < 0 && prevBtn) prevBtn.click();
            }
        }, { passive: true });
    }
});
