/* ============================================================
   EIFEL-KURIER – hero.js
   Canvas-Partikel-Animation – deckt das gesamte Hero ab
   Motorsport-Vibe: schnelle Linien, grüne Akzente
   ============================================================ */

(function () {
  'use strict';

  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrame;

  const CONFIG = {
    count:       140,     /* Viele Partikel für vollflächige Abdeckung */
    speedMax:    1.2,
    sizeMin:     1,
    sizeMax:     2.5,
    opacityMin:  0.08,
    opacityMax:  0.45,    /* Deutlich sichtbarer */
    lineColor:   '106, 191, 75',
    dotColor:    '255, 255, 255',
    connectDist: 160,     /* Größerer Verbindungsradius */
    lineOpacity: 0.22,    /* Sichtbarere Linien */
  };

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width  = Math.max(rect.width,  window.innerWidth);
    canvas.height = Math.max(rect.height, window.innerHeight);
  }

  function createParticle() {
    /* Gleichmäßig über die gesamte Fläche verteilt */
    const angle = Math.random() * Math.PI * 2;
    const speed = CONFIG.speedMax * (0.3 + Math.random() * 0.7);
    return {
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height,
      vx:      Math.cos(angle) * speed,
      vy:      Math.sin(angle) * speed * 0.5,
      size:    CONFIG.sizeMin + Math.random() * (CONFIG.sizeMax - CONFIG.sizeMin),
      opacity: CONFIG.opacityMin + Math.random() * (CONFIG.opacityMax - CONFIG.opacityMin),
    };
  }

  function init() {
    particles = [];
    for (let i = 0; i < CONFIG.count; i++) {
      particles.push(createParticle());
    }
  }

  function drawParticle(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${CONFIG.dotColor}, ${p.opacity})`;
    ctx.fill();
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.connectDist) {
          const alpha = (1 - dist / CONFIG.connectDist) * CONFIG.lineOpacity;
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

  function updateParticle(p) {
    p.x += p.vx;
    p.y += p.vy;

    /* Bouncing an den Rändern – Partikel bleiben im Bild */
    if (p.x < 0)            { p.x = 0; p.vx *= -1; }
    if (p.x > canvas.width) { p.x = canvas.width; p.vx *= -1; }
    if (p.y < 0)            { p.y = 0; p.vy *= -1; }
    if (p.y > canvas.height){ p.y = canvas.height; p.vy *= -1; }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawConnections();
    particles.forEach(function (p) {
      updateParticle(p);
      drawParticle(p);
    });
    animFrame = requestAnimationFrame(animate);
  }

  /* Sicherstellen dass Canvas-Maße korrekt sind (auch nach Fonts/Layout) */
  function start() {
    resize();
    init();
    animate();
  }

  /* Warten bis das Layout stabil ist */
  if (document.readyState === 'complete') {
    start();
  } else {
    window.addEventListener('load', start);
  }

  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      cancelAnimationFrame(animFrame);
      start();
    }, 200);
  });

})();
