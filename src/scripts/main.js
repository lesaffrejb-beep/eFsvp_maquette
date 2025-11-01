/**
 * ============================================
 * EfSVP - AWWWARDS-GRADE MAIN APP
 * Architecture modulaire ES6
 * ============================================
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SmoothScroll } from './modules/smoothScroll.js';
import { HeroManager } from './modules/hero.js';
import { AudioPlayerManager } from './modules/audioPlayer.js';
import { CursorManager } from './modules/cursor.js';
import { MagneticButtons } from './modules/magnetic.js';
import Swiper from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ============================================
// APP CLASS - Orchestration
// ============================================
class App {
  constructor() {
    this.modules = {};
    this.isMobile = window.innerWidth < 1024;

    this.init();
  }

  async init() {
    // 1. Preloader
    await this.handlePreloader();

    // 2. Core modules
    this.initCore();

    // 3. Section modules
    this.initSections();

    // 4. Start
    this.start();
  }

  async handlePreloader() {
    const preloader = document.getElementById('preloader');

    // Wait for page load
    await new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', resolve);
      }
    });

    // Min display time
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Hide preloader
    if (preloader) {
      preloader.classList.add('hidden');
      setTimeout(() => preloader.remove(), 500);
    }

    document.body.classList.add('loaded');
  }

  initCore() {
    // Smooth Scroll (Lenis)
    this.modules.smoothScroll = new SmoothScroll();
    window.lenis = this.modules.smoothScroll.lenis; // Global access

    // Custom Cursor (desktop only)
    if (!this.isMobile) {
      this.modules.cursor = new CursorManager();
    }

    // Magnetic Buttons
    if (!this.isMobile) {
      this.modules.magnetic = new MagneticButtons();
    }

    // Navigation
    this.initNavigation();

    // Scroll Reveal global
    this.initScrollReveal();
  }

  initSections() {
    // Hero
    this.modules.hero = new HeroManager();

    // Audio Players (WaveSurfer)
    this.modules.audioPlayers = new AudioPlayerManager();

    // Portfolio filters
    this.initPortfolioFilters();

    // Testimonials carousel
    this.initTestimonials();

    // FAQ Accordion
    this.initFAQ();

    // Contact Form
    this.initContactForm();

    // Stats Counter
    this.initStatsCounter();

    // Back to top
    this.initBackToTop();
  }

  start() {
    this.modules.hero?.start();
  }

  // ========== NAVIGATION ==========
  initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Show on scroll
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        nav?.classList.add('visible');
      } else {
        nav?.classList.remove('visible');
      }

      lastScroll = currentScroll;
    });

    // Mobile menu
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        document.body.style.overflow = isExpanded ? '' : 'hidden';
      });

      navMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          navToggle.setAttribute('aria-expanded', 'false');
          navMenu.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    }
  }

  // ========== SCROLL REVEAL ==========
  initScrollReveal() {
    gsap.utils.toArray('[data-scroll]').forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }

  // ========== PORTFOLIO FILTERS ==========
  initPortfolioFilters() {
    const filters = document.querySelectorAll('.portfolio__filter');
    const cards = document.querySelectorAll('.portfolio-card');

    if (filters.length === 0) return;

    filters.forEach((filter) => {
      filter.addEventListener('click', () => {
        const category = filter.getAttribute('data-filter');

        // Update active
        filters.forEach((f) => f.classList.remove('portfolio__filter--active'));
        filter.classList.add('portfolio__filter--active');

        // Filter cards
        cards.forEach((card) => {
          const cardCategory = card.getAttribute('data-category');

          if (category === 'all' || cardCategory === category) {
            gsap.to(card, {
              opacity: 1,
              scale: 1,
              duration: 0.3,
              ease: 'power2.out',
              onStart: () => {
                card.style.display = 'block';
              },
            });
          } else {
            gsap.to(card, {
              opacity: 0,
              scale: 0.95,
              duration: 0.3,
              ease: 'power2.in',
              onComplete: () => {
                card.style.display = 'none';
              },
            });
          }
        });
      });
    });
  }

  // ========== TESTIMONIALS ==========
  initTestimonials() {
    const carousel = document.querySelector('.testimonials__carousel');

    if (carousel) {
      new Swiper('.testimonials__carousel', {
        modules: [Pagination, Autoplay],
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 7000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        speed: 600,
      });
    }
  }

  // ========== FAQ ==========
  initFAQ() {
    const faqItems = document.querySelectorAll('.faq__item');

    faqItems.forEach((item) => {
      const question = item.querySelector('.faq__question');

      question?.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close others
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq__question')?.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current
        item.classList.toggle('active');
        question.setAttribute('aria-expanded', !isActive);
      });
    });
  }

  // ========== CONTACT FORM ==========
  initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const budgetRange = document.getElementById('budget');
    const budgetValue = document.querySelector('.form__range-value');
    const messageTextarea = document.getElementById('message');
    const counter = document.querySelector('.form__counter');

    // Budget slider
    if (budgetRange && budgetValue) {
      budgetRange.addEventListener('input', () => {
        const value = parseInt(budgetRange.value);
        budgetValue.textContent = `~${value.toLocaleString('fr-FR')}€`;
      });
    }

    // Textarea counter
    if (messageTextarea && counter) {
      messageTextarea.addEventListener('input', () => {
        const length = messageTextarea.value.length;
        counter.textContent = `${length}/500`;
      });
    }

    // Form submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn?.classList.add('loading');
      submitBtn.disabled = true;

      // Simulate submission
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      console.log('Form submitted:', data);

      // Show success modal
      const modal = document.getElementById('success-modal');
      if (modal) {
        document.getElementById('modal-name').textContent = data.nom || '';
        modal.classList.add('active');
      }

      // Reset
      form.reset();
      if (counter) counter.textContent = '0/500';
      if (budgetValue) budgetValue.textContent = '~10 000€';

      submitBtn?.classList.remove('loading');
      submitBtn.disabled = false;
    });
  }

  // ========== STATS COUNTER ==========
  initStatsCounter() {
    const statCards = document.querySelectorAll('[data-count]');

    statCards.forEach((stat) => {
      const target = parseInt(stat.getAttribute('data-count'));
      const duration = 2;

      gsap.to(stat, {
        innerHTML: target,
        duration: duration,
        ease: 'power1.out',
        snap: { innerHTML: 1 },
        scrollTrigger: {
          trigger: stat,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate: function () {
          const current = Math.round(this.targets()[0].innerHTML);
          stat.innerHTML = current + '+';
        },
      });
    });
  }

  // ========== BACK TO TOP ==========
  initBackToTop() {
    const backToTop = document.getElementById('back-to-top');

    if (backToTop) {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      });

      backToTop.addEventListener('click', () => {
        this.modules.smoothScroll.scrollTo(0, { duration: 2 });
      });
    }
  }
}

// ========== INIT APP ==========
document.addEventListener('DOMContentLoaded', () => {
  new App();
});

// ========== ACCESSIBILITY ==========
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.querySelector('.modal.active');
    if (modal) {
      modal.classList.remove('active');
    }

    const menu = document.querySelector('.nav__menu.active');
    if (menu) {
      document.getElementById('nav-toggle')?.setAttribute('aria-expanded', 'false');
      menu.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
});

console.log('🔥 EfSVP Premium Site - Loaded');
