/* ===================================================================
   MINIMALIST GALAXY BACKGROUND (NON-INTERACTIVE)
   A deep-space particle system with twinkling stars of varying sizes
   and purely geometric, line-art tech icons floating weightlessly.
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

  const PARTICLE_COUNT = isTablet ? 60 : 150; // Increased count for a denser starfield
  const TECH_ICON_COUNT = isTablet ? 6 : 12;

  let particles = [];
  let techIcons = [];
  let W, H;

  // --- Minimalist Tech Device SVG Paths ---
  // Abstract, metaphorical minimalism. Giant thin wireframes.
  const techShapes = [
    // Abstract Monitor
    function (ctx, x, y, size, opacity) {
      ctx.save(); ctx.translate(x, y); ctx.globalAlpha = opacity;
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`; ctx.lineWidth = 1.5;
      
      // Floating screen frame
      ctx.beginPath();
      ctx.rect(-size / 2, -size * 0.3, size, size * 0.6);
      ctx.stroke();
      
      // Minimalist disconnected stand
      ctx.beginPath();
      ctx.moveTo(-size * 0.15, size * 0.45);
      ctx.lineTo(size * 0.15, size * 0.45);
      ctx.stroke();
      
      ctx.restore();
    },
    // Abstract Keyboard
    function (ctx, x, y, size, opacity) {
      ctx.save(); ctx.translate(x, y); ctx.globalAlpha = opacity;
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`; ctx.lineWidth = 1.5;
      
      // Chassis
      ctx.beginPath();
      ctx.rect(-size * 0.6, -size * 0.2, size * 1.2, size * 0.4);
      ctx.stroke();
      
      // Metaphorical keys (just a few geometric lines)
      ctx.beginPath(); ctx.moveTo(-size * 0.4, size * 0.05); ctx.lineTo(-size * 0.1, size * 0.05); ctx.stroke(); // Spacebar
      ctx.beginPath(); ctx.moveTo(size * 0.2, -size * 0.05); ctx.lineTo(size * 0.4, -size * 0.05); ctx.stroke(); // Right keys
      ctx.beginPath(); ctx.moveTo(-size * 0.4, -size * 0.05); ctx.lineTo(-size * 0.3, -size * 0.05); ctx.stroke(); // Left key
      
      ctx.restore();
    },
    // Abstract Mouse
    function (ctx, x, y, size, opacity) {
      ctx.save(); ctx.translate(x, y); ctx.globalAlpha = opacity;
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`; ctx.lineWidth = 1.5;
      
      // Sleek pill shape
      ctx.beginPath();
      ctx.roundRect(-size * 0.25, -size * 0.4, size * 0.5, size * 0.8, size * 0.25);
      ctx.stroke();
      
      // Infinite scroll line
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.4);
      ctx.lineTo(0, size * 0.1);
      ctx.stroke();
      
      ctx.restore();
    },
    // Abstract Chip/Grid
    function (ctx, x, y, size, opacity) {
      ctx.save(); ctx.translate(x, y); ctx.globalAlpha = opacity;
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`; ctx.lineWidth = 1.5;
      
      const half = size * 0.3;
      // Core
      ctx.strokeRect(-half, -half, half * 2, half * 2);
      
      // Floating data lines
      ctx.beginPath(); ctx.moveTo(-half * 1.5, -half * 0.5); ctx.lineTo(-half, -half * 0.5); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-half * 1.5, half * 0.5); ctx.lineTo(-half, half * 0.5); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(half, -half * 0.5); ctx.lineTo(half * 1.5, -half * 0.5); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(half, half * 0.5); ctx.lineTo(half * 1.5, half * 0.5); ctx.stroke();
      
      ctx.beginPath(); ctx.moveTo(-half * 0.5, -half * 1.5); ctx.lineTo(-half * 0.5, -half); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(half * 0.5, -half * 1.5); ctx.lineTo(half * 0.5, -half); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-half * 0.5, half); ctx.lineTo(-half * 0.5, half * 1.5); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(half * 0.5, half); ctx.lineTo(half * 0.5, half * 1.5); ctx.stroke();
      
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
    // Generate varying sizes to create depth (small distant stars vs large close ones)
    // Most stars are tiny (0.3 - 1.0), but a few are larger (up to 2.5)
    let radius = Math.random() < 0.85 ? (Math.random() * 0.7 + 0.3) : (Math.random() * 1.5 + 1.0);
    
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      radius: radius,
      opacity: Math.random() * 0.4 + 0.1,
      twinkle: Math.random() < 0.2, // 20% of stars twinkle
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.2, // Ultra-slow organic drift
      driftY: (Math.random() - 0.5) * 0.2,
    };
  }

  function createTechIcon(index) {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      size: Math.random() * 150 + 100, // Giant scale: 100px to 250px
      opacity: Math.random() * 0.08 + 0.04, // Very subtle, ghostly presence
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.005, // Smooth rotation
      driftX: (Math.random() - 0.5) * 0.6, // More noticeable drifting speed
      driftY: (Math.random() - 0.5) * 0.6,
      shapeIndex: index % techShapes.length,
    };
  }

  // Initialize
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(createParticle());
  }
  for (let i = 0; i < TECH_ICON_COUNT; i++) {
    techIcons.push(createTechIcon(i));
  }

  // --- Animation loop ---
  let frameCount = 0;

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, W, H);
    frameCount++;

    // -- Update & draw particles (Stars) --
    for (const p of particles) {
      // Move gently
      p.x += p.driftX;
      p.y += p.driftY;

      // Wrap around screen edges seamlessly
      if (p.x < -20) p.x = W + 20;
      if (p.x > W + 20) p.x = -20;
      if (p.y < -20) p.y = H + 20;
      if (p.y > H + 20) p.y = -20;

      // Twinkle effect
      let currentOpacity = p.opacity;
      if (p.twinkle) {
        currentOpacity = p.opacity + Math.sin(frameCount * p.twinkleSpeed + p.twinklePhase) * 0.3;
        currentOpacity = Math.max(0.05, Math.min(0.8, currentOpacity));
      }

      // Draw star
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
      ctx.fill();
    }

    // -- Update & draw tech icons (Floating Space Debris) --
    for (const icon of techIcons) {
      // Move gently
      icon.x += icon.driftX;
      icon.y += icon.driftY;
      icon.rotation += icon.rotationSpeed;

      // Wrap around screen edges
      if (icon.x < -40) icon.x = W + 40;
      if (icon.x > W + 40) icon.x = -40;
      if (icon.y < -40) icon.y = H + 40;
      if (icon.y > H + 40) icon.y = -40;

      // Draw minimalist icon with rotation
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
