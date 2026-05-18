/* ============================================================
   EIFEL-KURIER – animations.js
   Intersection Observer, Counter-Effekte, Hero-Einblendung
   ============================================================ */

(function () {
  'use strict';

  /* --- Prefers-reduced-motion prüfen ----------------------- */
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Hero-Content einblenden ----------------------------- */
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    if (reducedMotion) {
      heroContent.classList.add('loaded');
    } else {
      requestAnimationFrame(function () {
        setTimeout(function () {
          heroContent.classList.add('loaded');
        }, 80);
      });
    }
  }

  /* --- Intersection Observer Optionen ---------------------- */
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12,
  };

  /* --- Allgemeiner Reveal-Observer ------------------------- */
  if (!reducedMotion) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(function (el) {
      revealObserver.observe(el);
    });

    /* --- Stagger-Karten (erscheinen versetzt) -------------- */
    const staggerObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          /* Alle Geschwister innerhalb desselben Containers sichtbar machen */
          const parent = entry.target.closest('.cards-grid, .values-grid, .service-detail-grid, .getraenke-features, .stats-grid, .gallery-grid, .motorsport-gallery');
          if (parent) {
            parent.querySelectorAll('.stagger-item').forEach(function (item) {
              item.classList.add('visible');
            });
          } else {
            entry.target.classList.add('visible');
          }
          staggerObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.stagger-item').forEach(function (el) {
      staggerObserver.observe(el);
    });
  } else {
    /* Ohne Animation alle sofort sichtbar */
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-item').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* --- Counter-Animation ------------------------------------ */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();
    const suffix = el.dataset.suffix || '';

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      /* Ease-out-Kurve */
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        if (!reducedMotion) {
          animateCounter(entry.target);
        } else {
          const target = entry.target.dataset.target;
          const suffix = entry.target.dataset.suffix || '';
          entry.target.textContent = target + suffix;
        }
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-target]').forEach(function (el) {
    counterObserver.observe(el);
  });

  /* --- Kontaktformular-Feedback ----------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      /* Einfache Client-Validierung */
      const required = contactForm.querySelectorAll('[required]');
      let valid = true;

      required.forEach(function (field) {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#e55';
          field.focus();
        }
      });

      if (!valid) return;

      /* Formular ausblenden, Erfolgsmeldung zeigen */
      contactForm.style.display = 'none';
      if (formSuccess) {
        formSuccess.style.display = 'block';
      }

      /* Reales Submit (mailto) – optional */
      const data = new FormData(contactForm);
      const params = new URLSearchParams(data).toString();
      console.log('Formular-Daten:', params);
    });
  }

  /* --- Nav-Shadow beim Scrollen (Verstärkung) --------------- */
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    let ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          if (window.scrollY > 10) {
            siteHeader.classList.add('scrolled');
          } else {
            siteHeader.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

})();
