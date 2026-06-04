/* ===================================================================
   MAIN — Typewriter, Navigation, Form, Initialization
   =================================================================== */

(function () {
  'use strict';

  // ──────────────────────────────────────────
  // TYPEWRITER EFFECT
  // ──────────────────────────────────────────
  const heroNameEl = document.getElementById('hero-name');
  const fullName = 'VO LE VUONG';
  let charIndex = 0;

  function typeWriter() {
    if (!heroNameEl) return;

    // Start after 600ms (matches hero choreography T+600ms)
    setTimeout(function startTyping() {
      if (charIndex <= fullName.length) {
        heroNameEl.innerHTML = fullName.substring(0, charIndex) + '<span class="typewriter-cursor"></span>';
        charIndex++;
        setTimeout(startTyping, 80);
      } else {
        // Remove cursor after 2 seconds
        setTimeout(() => {
          const cursor = heroNameEl.querySelector('.typewriter-cursor');
          if (cursor) {
            cursor.style.animation = 'none';
            cursor.style.opacity = '0';
            cursor.style.transition = 'opacity 0.5s';
          }
        }, 2000);
      }
    }, 600);
  }

  // ──────────────────────────────────────────
  // MOBILE NAVIGATION
  // ──────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');

  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open');
    mobileOverlay.classList.toggle('open');
    hamburger.classList.toggle('open');
    document.body.style.overflow = isOpen ? '' : 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  // Close mobile menu on link click
  document.querySelectorAll('[data-mobile-link]').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // ──────────────────────────────────────────
  // SMOOTH SCROLL (nav links)
  // ──────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = document.querySelector('.nav')?.offsetHeight || 72;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ──────────────────────────────────────────
  // CONTACT FORM VALIDATION
  // ──────────────────────────────────────────
  const form = document.getElementById('contact-form');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      // Name
      const name = document.getElementById('name');
      const nameGroup = name.closest('.form-group');
      if (!name.value.trim()) {
        nameGroup.classList.add('error');
        isValid = false;
      } else {
        nameGroup.classList.remove('error');
      }

      // Email
      const email = document.getElementById('email');
      const emailGroup = email.closest('.form-group');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        emailGroup.classList.add('error');
        isValid = false;
      } else {
        emailGroup.classList.remove('error');
      }

      // Message
      const message = document.getElementById('message');
      const messageGroup = message.closest('.form-group');
      if (!message.value.trim()) {
        messageGroup.classList.add('error');
        isValid = false;
      } else {
        messageGroup.classList.remove('error');
      }

      if (isValid) {
        // Show success state
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Message Sent!
        `;
        submitBtn.style.background = '#3FB950';
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
          form.reset();
        }, 3000);
      }
    });

    // Remove error on input
    form.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', () => {
        input.closest('.form-group').classList.remove('error');
      });
    });
  }

  // ──────────────────────────────────────────
  // INITIALIZATION
  // ──────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    typeWriter();
  });

  // If DOM already loaded
  if (document.readyState !== 'loading') {
    typeWriter();
  }
})();
