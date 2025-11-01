/* ============================================
   EN FRANÇAIS S'IL VOUS PLAÎT
   Main JavaScript - Animations & Interactions
   ============================================ */

(function() {
    'use strict';

    /* ============================================
       SMOOTH SCROLL NAVIGATION
       ============================================ */
    const smoothScroll = () => {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetSection = document.querySelector(targetId);
                if (!targetSection) return;

                // Fermer le menu mobile si ouvert
                const navMenu = document.getElementById('nav-menu');
                if (navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                }

                // Scroll vers la section
                const headerHeight = document.querySelector('.header').offsetHeight || 0;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Mettre à jour le lien actif
                updateActiveLink(this);
            });
        });
    };

    /* ============================================
       UPDATE ACTIVE NAVIGATION LINK
       ============================================ */
    const updateActiveLink = (activeLink) => {
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    };

    /* ============================================
       STICKY HEADER ON SCROLL
       ============================================ */
    const stickyHeader = () => {
        const header = document.getElementById('header');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    };

    /* ============================================
       MOBILE NAVIGATION TOGGLE
       ============================================ */
    const mobileNav = () => {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (!navToggle || !navMenu) return;

        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });

        // Fermer le menu si clic en dehors
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('show');
            }
        });
    };

    /* ============================================
       SCROLL ANIMATIONS (INTERSECTION OBSERVER)
       ============================================ */
    const scrollAnimations = () => {
        const animatedElements = document.querySelectorAll('[data-animate]');

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    // Optionnel : ne plus observer après animation
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(element => observer.observe(element));
    };

    /* ============================================
       FAQ ACCORDION
       ============================================ */
    const faqAccordion = () => {
        const faqQuestions = document.querySelectorAll('.faq__question');

        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const isExpanded = question.getAttribute('aria-expanded') === 'true';
                const answer = question.nextElementSibling;

                // Fermer tous les autres items
                faqQuestions.forEach(q => {
                    if (q !== question) {
                        q.setAttribute('aria-expanded', 'false');
                        const a = q.nextElementSibling;
                        a.style.maxHeight = null;
                    }
                });

                // Toggle l'item courant
                if (isExpanded) {
                    question.setAttribute('aria-expanded', 'false');
                    answer.style.maxHeight = null;
                } else {
                    question.setAttribute('aria-expanded', 'true');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        });
    };

    /* ============================================
       FORM VALIDATION
       ============================================ */
    const formValidation = () => {
        const form = document.getElementById('contact-form');

        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validation basique
            const nom = document.getElementById('nom').value.trim();
            const email = document.getElementById('email').value.trim();
            const typeProjet = document.getElementById('type-projet').value;
            const message = document.getElementById('message').value.trim();

            // Vérifications
            if (!nom || !email || !typeProjet || !message) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }

            // Validation email basique
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Veuillez entrer une adresse email valide.');
                return;
            }

            // Si tout est OK
            alert('Merci pour votre message ! Nous vous recontacterons très bientôt.');
            form.reset();

            // ICI : Intégrer avec un service d'envoi d'email (FormSpree, EmailJS, etc.)
            // Exemple avec FormSpree :
            // fetch('https://formspree.io/f/YOUR_FORM_ID', {
            //     method: 'POST',
            //     body: new FormData(form),
            //     headers: { 'Accept': 'application/json' }
            // });
        });
    };

    /* ============================================
       ACTIVE SECTION TRACKING (SCROLL SPY)
       ============================================ */
    const scrollSpy = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav__link');

        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY + 200;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    };

    /* ============================================
       PERFORMANCE: DEBOUNCE UTILITY
       ============================================ */
    const debounce = (func, wait = 20) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    /* ============================================
       ACCESSIBILITY: KEYBOARD NAVIGATION
       ============================================ */
    const keyboardNav = () => {
        // Navigation au clavier pour le menu mobile
        const navToggle = document.getElementById('nav-toggle');

        if (navToggle) {
            navToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navToggle.click();
                }
            });
        }

        // Escape pour fermer le menu mobile
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const navMenu = document.getElementById('nav-menu');
                if (navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                }
            }
        });
    };

    /* ============================================
       PREVENT ORPHAN WORDS (TYPOGRAPHY)
       ============================================ */
    const preventOrphans = () => {
        const headings = document.querySelectorAll('h1, h2, h3, .hero__tagline');

        headings.forEach(heading => {
            const text = heading.innerHTML;
            const words = text.trim().split(' ');

            if (words.length > 2) {
                const lastTwoWords = words.slice(-2).join('&nbsp;');
                const firstWords = words.slice(0, -2).join(' ');
                heading.innerHTML = firstWords + ' ' + lastTwoWords;
            }
        });
    };

    /* ============================================
       INITIALIZE ALL FUNCTIONS
       ============================================ */
    const init = () => {
        // Attendre que le DOM soit chargé
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // Initialiser toutes les fonctionnalités
        smoothScroll();
        stickyHeader();
        mobileNav();
        scrollAnimations();
        faqAccordion();
        formValidation();
        scrollSpy();
        keyboardNav();
        preventOrphans();

        console.log('EfSVP Website initialized successfully! 🎨✨');
    };

    // Lancer l'initialisation
    init();

})();
