/* ============================================================
   EIFEL-KURIER – nav.js
   Sticky-Nav, Hamburger-Menü, aktive Seite
   ============================================================ */

(function () {
  'use strict';

  const header   = document.querySelector('.site-header');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');

  /* --- Sticky-Shadow beim Scrollen -------------------------- */
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Hamburger-Menü --------------------------------------- */
  function openMenu() {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!hamburger) return;
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      if (mobileMenu.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMenu);
  }

  /* Menü-Close-Button im Slide-in */
  const menuCloseBtn = document.querySelector('.mobile-menu-close');
  if (menuCloseBtn) {
    menuCloseBtn.addEventListener('click', closeMenu);
  }

  /* Menü-Links schließen das Menü */
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ESC-Taste schließt Menü */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* Fensterbreite: Menü schließen wenn >= 900px */
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 900) closeMenu();
  });

  /* --- Aktive Seite markieren ------------------------------- */
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/index.html';
  const navLinks = document.querySelectorAll('.nav-menu a, .mobile-menu a');

  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (!href) return;

    /* Normalisiere href zu absolutem Pfad */
    const url = new URL(href, window.location.href);
    const linkPath = url.pathname.replace(/\/$/, '') || '/index.html';

    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });

})();
