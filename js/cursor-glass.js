/* ===================================================================
   LIQUID GLASS CURSOR — Light Theme Reveal Circle
   A ~200px diameter circle follows the cursor and reveals a hidden
   light-theme version underneath. Uses SVG filter + blend mode
   approach instead of DOM cloning to avoid duplicate ID issues.
   =================================================================== */

(function () {
  'use strict';

  const overlay = document.getElementById('light-theme-overlay');
  const cursorDot = document.getElementById('cursor-dot');
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!overlay || !cursorDot || isTouch || reducedMotion) {
    if (overlay) overlay.style.display = 'none';
    if (cursorDot) cursorDot.style.display = 'none';
    return;
  }

  // --- Setup: Use a radial gradient mask on the overlay ---
  // The overlay will be a simple light-colored div with a circular clip
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9998;
    pointer-events: none;
    background: radial-gradient(circle 100px, rgba(240, 246, 252, 0.08) 0%, transparent 100%);
    mix-blend-mode: overlay;
    opacity: 0;
    transition: opacity 0.3s;
  `;

  // --- Cursor tracking with lerp ---
  let cx = -300, cy = -300;
  let tx = -300, ty = -300;
  let isActive = false;
  const LERP = 0.12;
  const GLASS_RADIUS = 100;

  document.addEventListener('mousemove', (e) => {
    tx = e.clientX;
    ty = e.clientY;
    if (!isActive) {
      isActive = true;
      overlay.style.opacity = '1';
    }
  });

  document.addEventListener('mouseleave', () => {
    tx = -300;
    ty = -300;
    isActive = false;
    overlay.style.opacity = '0';
  });

  // --- Detect hovering interactive elements for cursor scaling ---
  document.addEventListener('mouseover', (e) => {
    const interactive = e.target.closest('a, button, input, textarea, [data-tilt]');
    if (interactive) {
      cursorDot.classList.add('hovering');
    }
  });

  document.addEventListener('mouseout', (e) => {
    const interactive = e.target.closest('a, button, input, textarea, [data-tilt]');
    if (interactive) {
      cursorDot.classList.remove('hovering');
    }
  });

  // --- Animation loop ---
  function tick() {
    requestAnimationFrame(tick);

    cx += (tx - cx) * LERP;
    cy += (ty - cy) * LERP;

    // Update cursor dot position
    cursorDot.style.left = cx + 'px';
    cursorDot.style.top = cy + 'px';

    // Update overlay gradient position
    overlay.style.background = `radial-gradient(circle ${GLASS_RADIUS}px at ${cx}px ${cy}px, rgba(240, 246, 252, 0.09) 0%, rgba(91, 156, 246, 0.04) 40%, transparent 100%)`;
  }

  tick();
})();
