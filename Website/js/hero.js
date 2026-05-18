/* ============================================================
   EIFEL-KURIER – hero.js
   Canvas-Partikel-Animation im Hero (Motorsport-Vibe)
   Subtile Linien, die Geschwindigkeit und Bewegung andeuten
   ============================================================ */

(function () {
  'use strict';

  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  /* Keine Animation bei prefers-reduced-motion */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrame;

  /* Partikel-Konfiguration */
  const CONFIG = {
    count:       60,
    speedMin:    0.4,
    speedMax:    1.8,
    sizeMin:     1,
    sizeMax:     3,
    opacityMin:  0.05,
    opacityMax:  0.25,
    lineColor:   '106, 191, 75',   /* Hellgrün */
    dotColor:    '255, 255, 255',
    connectDist: 140,
  };

  /* Canvas-Größe anpassen */
  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  /* Partikel erstellen */
  function createParticle() {
    return {
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height,
      vx:      (Math.random() - 0.5) * CONFIG.speedMax + CONFIG.speedMin,
      vy:      (Math.random() - 0.3) * CONFIG.speedMax * 0.5,
      size:    CONFIG.sizeMin + Math.random() * (CONFIG.sizeMax - CONFIG.sizeMin),
      opacity: CONFIG.opacityMin + Math.random() * (CONFIG.opacityMax - CONFIG.opacityMin),
    };
  }

  /* Partikel initialisieren */
  function init() {
    particles = [];
    for (let i = 0; i < CONFIG.count; i++) {
      particles.push(createParticle());
    }
  }

  /* Einzelnen Partikel zeichnen */
  function drawParticle(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${CONFIG.dotColor}, ${p.opacity})`;
    ctx.fill();
  }

  /* Verbindungslinien zwischen nahen Partikeln */
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.connectDist) {
          const alpha = (1 - dist / CONFIG.connectDist) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${CONFIG.lineColor}, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  /* Partikel bewegen und Grenzen prüfen */
  function updateParticle(p) {
    p.x += p.vx;
    p.y += p.vy;

    /* Rechte Seite: Partikel von links neu starten (Fahrtrichtung) */
    if (p.x > canvas.width + 10) {
      p.x = -10;
      p.y = Math.random() * canvas.height;
    } else if (p.x < -10) {
      p.x = canvas.width + 10;
    }

    if (p.y > canvas.height + 10) {
      p.y = -10;
    } else if (p.y < -10) {
      p.y = canvas.height + 10;
    }
  }

  /* Haupt-Animations-Schleife */
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawConnections();

    particles.forEach(function (p) {
      updateParticle(p);
      drawParticle(p);
    });

    animFrame = requestAnimationFrame(animate);
  }

  /* Initialisieren */
  resize();
  init();
  animate();

  /* Fenstergröße: neu initialisieren */
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      cancelAnimationFrame(animFrame);
      resize();
      init();
      animate();
    }, 200);
  });

  /* Canvas-Element-Größe */
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    const resizeObserver = new ResizeObserver(function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        cancelAnimationFrame(animFrame);
        resize();
        init();
        animate();
      }, 200);
    });
    resizeObserver.observe(heroSection);
  }

})();
