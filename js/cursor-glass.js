/* ===================================================================
   LIQUID GLASS CURSOR — Apple-inspired Frosted Glass Lens
   A large ~200px circle follows the cursor, applying:
   - backdrop-filter: blur(20px) to frost everything behind it
   - brightness/contrast inversion so dark bg → light, light text → dark
   - No visible border — seamless blending into the page
   - Smooth lerp tracking for fluid movement
   =================================================================== */

(function () {
  'use strict';

  const overlay = document.getElementById('light-theme-overlay');
  const cursorDot = document.getElementById('cursor-dot');
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isTouch || reducedMotion) {
    if (overlay) overlay.style.display = 'none';
    if (cursorDot) cursorDot.style.display = 'none';
    return;
  }

  // --- Create the Liquid Glass lens element ---
  const glassLens = document.createElement('div');
  glassLens.id = 'glass-lens';
  glassLens.setAttribute('aria-hidden', 'true');
  document.body.appendChild(glassLens);

  // Remove the old overlay (no longer needed)
  if (overlay) overlay.style.display = 'none';

  // --- Config ---
  const GLASS_DIAMETER = 220; // px
  const LERP_SPEED = 0.10;

  // --- Cursor state ---
  let cx = -300, cy = -300;
  let tx = -300, ty = -300;
  let isVisible = false;
  let isHovering = false;

  // --- Mouse events ---
  document.addEventListener('mousemove', (e) => {
    tx = e.clientX;
    ty = e.clientY;
    if (!isVisible) {
      isVisible = true;
      glassLens.classList.add('active');
      cursorDot.style.opacity = '1';
    }
  });

  document.addEventListener('mouseleave', () => {
    tx = -400;
    ty = -400;
    isVisible = false;
    glassLens.classList.remove('active');
    cursorDot.style.opacity = '0';
  });

  // --- Interactive element hover (scale cursor dot) ---
  document.addEventListener('mouseover', (e) => {
    const el = e.target.closest('a, button, input, textarea, [data-tilt]');
    if (el) {
      isHovering = true;
      cursorDot.classList.add('hovering');
      glassLens.classList.add('hovering');
    }
  });

  document.addEventListener('mouseout', (e) => {
    const el = e.target.closest('a, button, input, textarea, [data-tilt]');
    if (el) {
      isHovering = false;
      cursorDot.classList.remove('hovering');
      glassLens.classList.remove('hovering');
    }
  });

  // --- Animation loop ---
  function tick() {
    requestAnimationFrame(tick);

    // Lerp
    cx += (tx - cx) * LERP_SPEED;
    cy += (ty - cy) * LERP_SPEED;

    // Position the glass lens (centered on cursor)
    const halfSize = GLASS_DIAMETER / 2;
    glassLens.style.transform = `translate(${cx - halfSize}px, ${cy - halfSize}px)`;

    // Position the cursor dot
    cursorDot.style.left = cx + 'px';
    cursorDot.style.top = cy + 'px';
  }

  tick();
})();
