/* ============================================================
   EIFEL-KURIER – cookie-consent.js
   DSGVO-Cookie-Banner: Einwilligung, Einstellungen, Speicherung
   ============================================================ */

(function () {
  'use strict';

  const STORAGE_KEY = 'ekCookieConsent';
  const legalPrefix = /\/pages\//.test(window.location.pathname) ? '' : 'pages/';

  function getConsent() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function saveConsent(partial) {
    const data = {
      necessary: true,
      statistics: !!partial.statistics,
      marketing: !!partial.marketing,
      timestamp: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
    document.dispatchEvent(new CustomEvent('cookieConsentChanged', { detail: data }));
    return data;
  }

  /* --- Markup einfügen --------------------------------------- */
  const bannerHTML = `
    <div class="cookie-banner" id="cookieBanner" role="dialog" aria-live="polite" aria-label="Cookie-Hinweis">
      <div class="container cookie-banner-inner">
        <div class="cookie-banner-text">
          <h3>Wir respektieren Ihre Privatsphäre</h3>
          <p>
            Wir verwenden Cookies, um unsere Website zuverlässig zu betreiben und ihre Nutzung zu analysieren.
            Sie entscheiden, welche Kategorien Sie zulassen. Mehr dazu in unserer
            <a href="${legalPrefix}datenschutz.html">Datenschutzerklärung</a>.
          </p>
        </div>
        <div class="cookie-banner-actions">
          <button type="button" class="btn btn-outline-dark" id="cookieOpenSettings">Einstellungen</button>
          <button type="button" class="btn btn-outline-dark" id="cookieRejectAll">Nur notwendige</button>
          <button type="button" class="btn btn-primary" id="cookieAcceptAll">Alle akzeptieren</button>
        </div>
      </div>
    </div>

    <div class="cookie-modal-overlay" id="cookieModalOverlay" role="dialog" aria-modal="true" aria-labelledby="cookieModalTitle">
      <div class="cookie-modal">
        <div class="cookie-modal-header">
          <h3 id="cookieModalTitle">Cookie-Einstellungen</h3>
          <button type="button" class="cookie-modal-close" id="cookieModalClose" aria-label="Schließen">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <p class="cookie-modal-intro">
          Hier können Sie festlegen, welche Cookie-Kategorien Sie zulassen möchten. Notwendige Cookies
          sind für den Betrieb der Website erforderlich und können nicht deaktiviert werden. Weitere
          Informationen finden Sie in unserer <a href="${legalPrefix}datenschutz.html">Datenschutzerklärung</a>.
        </p>

        <div class="cookie-category">
          <div class="cookie-category-text">
            <h4>Notwendige Cookies</h4>
            <p>Erforderlich für die Grundfunktionen der Website, z. B. Navigation und Formulare.</p>
          </div>
          <span class="cookie-category-locked">Immer aktiv</span>
        </div>

        <div class="cookie-category">
          <div class="cookie-category-text">
            <h4>Statistik</h4>
            <p>Hilft uns zu verstehen, wie Besucher mit der Website interagieren, um sie zu verbessern.</p>
          </div>
          <label class="cookie-switch">
            <input type="checkbox" id="cookieToggleStatistics">
            <span class="cookie-switch-track"></span>
          </label>
        </div>

        <div class="cookie-category">
          <div class="cookie-category-text">
            <h4>Marketing</h4>
            <p>Ermöglicht personalisierte Inhalte und die Messung der Wirksamkeit von Kampagnen.</p>
          </div>
          <label class="cookie-switch">
            <input type="checkbox" id="cookieToggleMarketing">
            <span class="cookie-switch-track"></span>
          </label>
        </div>

        <div class="cookie-modal-footer">
          <button type="button" class="btn btn-outline-dark" id="cookieRejectAllModal">Nur notwendige</button>
          <button type="button" class="btn btn-outline-dark" id="cookieSaveSettings">Auswahl speichern</button>
          <button type="button" class="btn btn-primary" id="cookieAcceptAllModal">Alle akzeptieren</button>
        </div>
      </div>
    </div>

    <button type="button" class="cookie-fab" id="cookieFab" aria-label="Cookie-Einstellungen öffnen" title="Cookie-Einstellungen">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/>
        <circle cx="8.5" cy="10.5" r="1.2" fill="currentColor" stroke="none"/>
        <circle cx="13" cy="8" r="1.2" fill="currentColor" stroke="none"/>
        <circle cx="15" cy="14" r="1.2" fill="currentColor" stroke="none"/>
        <circle cx="9.5" cy="15" r="1.2" fill="currentColor" stroke="none"/>
      </svg>
    </button>
  `;

  document.addEventListener('DOMContentLoaded', function () {
    document.body.insertAdjacentHTML('beforeend', bannerHTML);

    const banner = document.getElementById('cookieBanner');
    const overlay = document.getElementById('cookieModalOverlay');
    const fab = document.getElementById('cookieFab');
    const toggleStatistics = document.getElementById('cookieToggleStatistics');
    const toggleMarketing = document.getElementById('cookieToggleMarketing');

    function showBanner() {
      requestAnimationFrame(function () {
        banner.classList.add('visible');
      });
    }

    function hideBanner() {
      banner.classList.remove('visible');
    }

    function fillModal(consent) {
      toggleStatistics.checked = !!(consent && consent.statistics);
      toggleMarketing.checked = !!(consent && consent.marketing);
    }

    function openModal() {
      fillModal(getConsent());
      overlay.classList.add('visible');
    }

    function closeModal() {
      overlay.classList.remove('visible');
    }

    function updateFab() {
      fab.classList.toggle('visible', !banner.classList.contains('visible'));
    }

    /* --- Initialer Zustand ------------------------------------ */
    const existingConsent = getConsent();
    if (!existingConsent) {
      showBanner();
    }
    updateFab();

    /* --- Banner-Aktionen ---------------------------------------- */
    document.getElementById('cookieAcceptAll').addEventListener('click', function () {
      saveConsent({ statistics: true, marketing: true });
      hideBanner();
      updateFab();
    });

    document.getElementById('cookieRejectAll').addEventListener('click', function () {
      saveConsent({ statistics: false, marketing: false });
      hideBanner();
      updateFab();
    });

    document.getElementById('cookieOpenSettings').addEventListener('click', openModal);

    /* --- Modal-Aktionen ------------------------------------------ */
    document.getElementById('cookieAcceptAllModal').addEventListener('click', function () {
      saveConsent({ statistics: true, marketing: true });
      closeModal();
      hideBanner();
      updateFab();
    });

    document.getElementById('cookieRejectAllModal').addEventListener('click', function () {
      saveConsent({ statistics: false, marketing: false });
      closeModal();
      hideBanner();
      updateFab();
    });

    document.getElementById('cookieSaveSettings').addEventListener('click', function () {
      saveConsent({
        statistics: toggleStatistics.checked,
        marketing: toggleMarketing.checked,
      });
      closeModal();
      hideBanner();
      updateFab();
    });

    document.getElementById('cookieModalClose').addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('visible')) closeModal();
    });

    /* --- Wiederöffnen: schwebender Button & Footer-Link ---------- */
    fab.addEventListener('click', openModal);

    document.querySelectorAll('.cookie-settings-link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        openModal();
      });
    });
  });
})();
