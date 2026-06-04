/* ===================================================================
   PARTICLE CONSTELLATION + GALAXY + TECH DEVICE STARS
   Canvas-based particle system with cursor gravity and floating
   SVG tech icons (monitor, keyboard, chip, mouse, cable) as stars.
   =================================================================== */

(function () {
  'use strict';

  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // --- Config ---
  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  const isTablet = window.matchMedia('(max-width: 1023px)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion || isMobile) {
    canvas.style.display = 'none';
    return;
  }

  const PARTICLE_COUNT = isTablet ? 30 : 65;
  const TECH_ICON_COUNT = isTablet ? 5 : 10;
  const CONNECTION_DIST = 120;
  const CURSOR_RADIUS = 200;
  const STIFFNESS = 0.003;
  const DAMPING = 0.92;
  const AZURE = { r: 91, g: 156, b: 246 };

  let mouse = { x: -1000, y: -1000 };
  let particles = [];
  let techIcons = [];
  let W, H;

  // --- Tech Device SVG Paths (small icons as "constellation stars") ---
  const techShapes = [
    // Monitor
    function (ctx, x, y, size, opacity) {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = `rgba(${AZURE.r},${AZURE.g},${AZURE.b},${opacity})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(-size / 2, -size / 2.5, size, size * 0.65, 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, size * 0.15);
      ctx.lineTo(0, size * 0.35);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-size * 0.25, size * 0.35);
      ctx.lineTo(size * 0.25, size * 0.35);
      ctx.stroke();
      ctx.restore();
    },
    // Keyboard
    function (ctx, x, y, size, opacity) {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = `rgba(${AZURE.r},${AZURE.g},${AZURE.b},${opacity})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(-size / 2, -size / 4, size, size * 0.5, 2);
      ctx.stroke();
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 4; c++) {
          ctx.fillStyle = `rgba(${AZURE.r},${AZURE.g},${AZURE.b},${opacity * 0.4})`;
          ctx.fillRect(-size * 0.38 + c * size * 0.22, -size * 0.12 + r * size * 0.14, size * 0.14, size * 0.08);
        }
      }
      ctx.restore();
    },
    // CPU Chip
    function (ctx, x, y, size, opacity) {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = `rgba(${AZURE.r},${AZURE.g},${AZURE.b},${opacity})`;
      ctx.lineWidth = 1;
      const half = size * 0.35;
      ctx.strokeRect(-half, -half, half * 2, half * 2);
      ctx.strokeRect(-half * 0.6, -half * 0.6, half * 1.2, half * 1.2);
      for (let i = -1; i <= 1; i++) {
        ctx.beginPath();
        ctx.moveTo(i * half * 0.5, -half);
        ctx.lineTo(i * half * 0.5, -half - size * 0.12);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(i * half * 0.5, half);
        ctx.lineTo(i * half * 0.5, half + size * 0.12);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-half, i * half * 0.5);
        ctx.lineTo(-half - size * 0.12, i * half * 0.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(half, i * half * 0.5);
        ctx.lineTo(half + size * 0.12, i * half * 0.5);
        ctx.stroke();
      }
      ctx.restore();
    },
    // Mouse
    function (ctx, x, y, size, opacity) {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = `rgba(${AZURE.r},${AZURE.g},${AZURE.b},${opacity})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.25, size * 0.4, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.4);
      ctx.lineTo(0, -size * 0.1);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-size * 0.25, -size * 0.05);
      ctx.lineTo(size * 0.25, -size * 0.05);
      ctx.stroke();
      ctx.restore();
    },
    // Cable/USB
    function (ctx, x, y, size, opacity) {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = `rgba(${AZURE.r},${AZURE.g},${AZURE.b},${opacity})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(-size * 0.12, -size * 0.3, size * 0.24, size * 0.25, 1);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.05);
      ctx.bezierCurveTo(size * 0.2, size * 0.1, -size * 0.2, size * 0.25, 0, size * 0.4);
      ctx.stroke();
      ctx.restore();
    },
    // Code brackets < >
    function (ctx, x, y, size, opacity) {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = `rgba(${AZURE.r},${AZURE.g},${AZURE.b},${opacity})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(-size * 0.15, -size * 0.25);
      ctx.lineTo(-size * 0.35, 0);
      ctx.lineTo(-size * 0.15, size * 0.25);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(size * 0.15, -size * 0.25);
      ctx.lineTo(size * 0.35, 0);
      ctx.lineTo(size * 0.15, size * 0.25);
      ctx.stroke();
      ctx.restore();
    }
  ];

  // --- Resize ---
  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // --- Create particles ---
  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      baseX: 0,
      baseY: 0,
      vx: 0,
      vy: 0,
      radius: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.3 + 0.15,
      twinkle: Math.random() < 0.1,
      twinkleSpeed: Math.random() * 0.02 + 0.01,
      twinklePhase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.15,
      driftY: (Math.random() - 0.5) * 0.1,
    };
  }

  function createTechIcon(index) {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: 0,
      vy: 0,
      size: Math.random() * 12 + 16,
      opacity: Math.random() * 0.15 + 0.08,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.003,
      driftX: (Math.random() - 0.5) * 0.12,
      driftY: (Math.random() - 0.5) * 0.08,
      shapeIndex: index % techShapes.length,
    };
  }

  // Initialize
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = createParticle();
    p.baseX = p.x;
    p.baseY = p.y;
    particles.push(p);
  }
  for (let i = 0; i < TECH_ICON_COUNT; i++) {
    techIcons.push(createTechIcon(i));
  }

  // --- Mouse tracking ---
  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  document.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  // --- Animation loop ---
  let frameCount = 0;

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, W, H);
    frameCount++;

    // -- Draw connection lines --
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * 0.12;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${AZURE.r},${AZURE.g},${AZURE.b},${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // -- Update & draw particles --
    for (const p of particles) {
      // Cursor gravity
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < CURSOR_RADIUS && dist > 0) {
        const force = (CURSOR_RADIUS - dist) / CURSOR_RADIUS;
        p.vx += dx * STIFFNESS * force;
        p.vy += dy * STIFFNESS * force;
      }

      // Return to base drift
      p.vx += p.driftX * 0.01;
      p.vy += p.driftY * 0.01;

      // Damping
      p.vx *= DAMPING;
      p.vy *= DAMPING;

      // Move
      p.x += p.vx + p.driftX;
      p.y += p.vy + p.driftY;

      // Wrap around
      if (p.x < -20) p.x = W + 20;
      if (p.x > W + 20) p.x = -20;
      if (p.y < -20) p.y = H + 20;
      if (p.y > H + 20) p.y = -20;

      // Twinkle
      let opacity = p.opacity;
      if (p.twinkle) {
        opacity = p.opacity + Math.sin(frameCount * p.twinkleSpeed + p.twinklePhase) * 0.25;
        opacity = Math.max(0.05, Math.min(0.7, opacity));
      }

      // Draw
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${AZURE.r},${AZURE.g},${AZURE.b},${opacity})`;
      ctx.fill();
    }

    // -- Update & draw tech icons --
    for (const icon of techIcons) {
      // Cursor influence (lighter)
      const dx = mouse.x - icon.x;
      const dy = mouse.y - icon.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < CURSOR_RADIUS * 1.2 && dist > 0) {
        const force = (CURSOR_RADIUS * 1.2 - dist) / (CURSOR_RADIUS * 1.2);
        icon.vx += dx * STIFFNESS * 0.3 * force;
        icon.vy += dy * STIFFNESS * 0.3 * force;
      }

      icon.vx *= 0.95;
      icon.vy *= 0.95;

      icon.x += icon.vx + icon.driftX;
      icon.y += icon.vy + icon.driftY;
      icon.rotation += icon.rotationSpeed;

      // Wrap
      if (icon.x < -40) icon.x = W + 40;
      if (icon.x > W + 40) icon.x = -40;
      if (icon.y < -40) icon.y = H + 40;
      if (icon.y > H + 40) icon.y = -40;

      // Draw with rotation
      ctx.save();
      ctx.translate(icon.x, icon.y);
      ctx.rotate(icon.rotation);
      ctx.translate(-icon.x, -icon.y);
      techShapes[icon.shapeIndex](ctx, icon.x, icon.y, icon.size, icon.opacity);
      ctx.restore();
    }
  }

  animate();
})();
