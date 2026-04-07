/* =============================================
   E-uT SCRIPT.JS — Interactivity & Animations
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // =========================
  // 1. NAVBAR SCROLL EFFECT
  // =========================
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });

  // =========================
  // 2. SCROLL FADE-UP ANIMATIONS
  // =========================
  const fadeUps = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeUps.forEach(el => observer.observe(el));

  // =========================
  // 3. IMAGE SLIDER (GALLERY)
  // =========================
  const slider = document.getElementById('slider');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;
  let autoPlayInterval;

  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 4000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  prevBtn.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
    stopAutoPlay();
    startAutoPlay();
  });

  nextBtn.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
    stopAutoPlay();
    startAutoPlay();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.dataset.index));
      stopAutoPlay();
      startAutoPlay();
    });
  });

  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToSlide(currentIndex + 1);
      else goToSlide(currentIndex - 1);
      stopAutoPlay();
      startAutoPlay();
    }
  }, { passive: true });

  startAutoPlay();

  // =========================
  // 4. PROGRAM TABS
  // =========================
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.program-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(`tab-${target}`);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // =========================
  // 5. FAQ ACCORDION
  // =========================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');

    question.addEventListener('click', () => {
      const isOpen = question.getAttribute('aria-expanded') === 'true';

      // Close all
      faqItems.forEach(fi => {
        fi.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        fi.querySelector('.faq-a').classList.remove('open');
      });

      // Open clicked (if was closed)
      if (!isOpen) {
        question.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
      }
    });
  });

  // =========================
  // 6. SMOOTH SCROLL for all anchor links
  // =========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 70;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // =========================
  // 7. ACTIVE NAV LINK HIGHLIGHT
  // =========================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.style.color = '#fff';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => sectionObserver.observe(section));

});
