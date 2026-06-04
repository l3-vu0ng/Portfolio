/* ===================================================================
   ANTIGRAVITY SWARM CURSOR
   A localized particle swarm that follows the cursor and forms an 
   organic, wobbly ring (amoeba-like) around it.
   =================================================================== */

(function () {
  'use strict';

  // Create canvas element
  const canvas = document.createElement('canvas');
  canvas.id = 'swarm-cursor';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  // Configuration
  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion || isMobile) {
    canvas.style.display = 'none';
    return;
  }

  const PARTICLE_COUNT = 120; // Number of particles forming the swarm
  const BASE_RADIUS = 40;     // Base radius of the ring
  const WOBBLE_AMP = 12;      // Amplitude of the jagged/wobbly edge (reduced for smoothness)
  const DAMPING = 0.88;       // Friction (increased slightly for softer stops)
  const STIFFNESS = 0.035;    // Spring stiffness towards target (reduced for slower tracking)

  let W, H;
  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let currentPos = { x: mouse.x, y: mouse.y };
  
  // Smooth mouse tracking
  let isHovering = false;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Track hover state over clickable elements to change swarm behavior
  let hoverType = 'none'; // 'none', 'text', 'rect'
  let hoveredEl = null;

  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    const rectEl = e.target.closest('a, button, input, textarea, [data-tilt], .project-card, .glass-card, .liquid-glass, .gpa-badge');
    if (rectEl) {
      hoveredEl = rectEl;
      hoverType = 'rect';
    } else {
      hoveredEl = null;
      hoverType = 'none';
    }
  });

  // Initialize Particles
  let particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // Distribute evenly in a circle
    const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
    // Add some random noise offset for each particle
    const noiseOffset = Math.random() * 100;
    const size = Math.random() * 1.5 + 0.5;
    
    particles.push({
      x: mouse.x,
      y: mouse.y,
      vx: 0,
      vy: 0,
      angle: angle,
      noiseOffset: noiseOffset,
      size: size,
      baseSize: size
    });
  }

  let time = 0;
  let dotSize = 6; // Initial size of the central cursor dot

  function animate() {
    requestAnimationFrame(animate);
    
    // Clear canvas
    ctx.clearRect(0, 0, W, H);
    
    time += 0.05;

    // Smooth current position towards mouse (slower)
    currentPos.x += (mouse.x - currentPos.x) * 0.12;
    currentPos.y += (mouse.y - currentPos.y) * 0.12;

    // Draw main Liquid Glass dot
    const targetDotSize = hoverType === 'none' ? 6 : 0;
    dotSize += (targetDotSize - dotSize) * 0.15;

    if (dotSize > 0.1) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'; // Solid soft white dot
      ctx.beginPath();
      ctx.arc(currentPos.x, currentPos.y, dotSize, 0, Math.PI * 2);
      ctx.fill();
    }

    // Set particle color
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'; // Glowing white particles when dispersed

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Calculate target position for this particle
      // Slower wobble
      const wobble = Math.sin(p.angle * 3 + time * 0.6) * (WOBBLE_AMP * 0.5) + 
                     Math.sin(p.angle * 7 - time * 0.8) * (WOBBLE_AMP * 0.5);
                     
      let targetX, targetY;

      if (hoverType === 'rect' && hoveredEl) {
        const rect = hoveredEl.getBoundingClientRect();
        
        // Safety check if user scrolled away without moving mouse
        if (mouse.x < rect.left || mouse.x > rect.right || mouse.y < rect.top || mouse.y > rect.bottom) {
          hoveredEl = null;
          hoverType = 'none';
        } else {
          // Orbit around the bounding box
          const pad = 12; // Extra padding so it runs outside the element
          const left = rect.left - pad;
          const top = rect.top - pad;
          const right = rect.right + pad;
          const bottom = rect.bottom + pad;
          
          const w = right - left;
          const h = bottom - top;
          const perimeter = 2 * w + 2 * h;

          // Map particle angle (0 to 2PI) to a normalized offset (0 to 1)
          const normalizedOffset = p.angle / (Math.PI * 2);
          
          // Add time to make them run around the perimeter (much slower)
          let t = (normalizedOffset + time * 0.035) % 1;
          if (t < 0) t += 1;

          const dist = t * perimeter;

          if (dist < w) {
            targetX = left + dist;
            targetY = top;
          } else if (dist < w + h) {
            targetX = right;
            targetY = top + (dist - w);
          } else if (dist < 2 * w + h) {
            targetX = right - (dist - w - h);
            targetY = bottom;
          } else {
            targetX = left;
            targetY = bottom - (dist - 2 * w - h);
          }

          // Add a tiny wobble to the perimeter tracking (slower)
          targetX += Math.sin(time * 2 + p.noiseOffset) * 2;
          targetY += Math.cos(time * 2 + p.noiseOffset) * 2;
        }
      }

      // If not hovering a rect (or fallback if scrolled away)
      if (hoverType !== 'rect' || !hoveredEl) {
        if (hoverType === 'none') {
          // Collapse to center
          targetX = currentPos.x;
          targetY = currentPos.y;
        }
      }

      // Spring physics towards target
      p.vx += (targetX - p.x) * STIFFNESS;
      p.vy += (targetY - p.y) * STIFFNESS;

      // Damping
      p.vx *= DAMPING;
      p.vy *= DAMPING;

      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Calculate target size (shrink to 0 when collapsed)
      let targetParticleSize = 0;
      if (hoverType !== 'none') {
        const pulse = Math.sin(time * 1.5 + p.noiseOffset) * 0.5;
        targetParticleSize = Math.max(0.1, p.baseSize + pulse) * 1.8;
      }
      
      // Interpolate current size for smooth appear/disappear
      if (p.currentSize === undefined) p.currentSize = 0;
      p.currentSize += (targetParticleSize - p.currentSize) * 0.15;

      // Draw particle if it's large enough
      if (p.currentSize > 0.1) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.currentSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  animate();
})();
