/* ============================================================
   EIFEL-KURIER – nav.js
   Sticky-Nav, Hamburger-Menü, aktive Seite
   ============================================================ */

(function () {
  'use strict';

  const header      = document.querySelector('.site-header');
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const topbarEl    = document.querySelector('.topbar');

  /* Initiale Topbar-Höhe einmalig messen */
  const topbarHeight = topbarEl ? topbarEl.offsetHeight : 0;

  /* --- Header-Position dynamisch anpassen ------------------- */
  /* Wenn der Nutzer scrollt, folgt der Header der Topbar nach oben,
     sodass keine Lücke zwischen Header und Viewport-Rand entsteht. */
  function onScroll() {
    if (!header) return;
    const scrollY = window.scrollY;

    /* Header-Top: von topbarHeight auf 0 absinken lassen */
    const headerTop = Math.max(0, topbarHeight - scrollY);
    header.style.top = headerTop + 'px';

    /* Schatten erst zeigen wenn Header oben angekommen ist */
    if (scrollY > topbarHeight) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); /* Sofort beim Laden ausführen */

  /* --- Hamburger-Menü --------------------------------------- */
  function openMenu() {
    if (!hamburger) return;
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
      mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
    });
  }

  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

  const menuCloseBtn = document.querySelector('.mobile-menu-close');
  if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenu);

  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 900) closeMenu();
    onScroll(); /* Topbar-Höhe kann sich bei Resize ändern */
  });

  /* --- Aktive Seite markieren ------------------------------- */
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/index.html';
  document.querySelectorAll('.nav-menu a, .mobile-menu a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (!href) return;
    try {
      const url = new URL(href, window.location.href);
      const linkPath = url.pathname.replace(/\/$/, '') || '/index.html';
      if (linkPath === currentPath) link.classList.add('active');
    } catch (e) {}
  });

})();
