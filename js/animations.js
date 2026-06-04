/* ===================================================================
   GSAP SCROLL ANIMATIONS + HERO CHOREOGRAPHY
   ScrollTrigger-powered reveals, parallax, timeline draw,
   3D card tilt, and cinematic hero entrance sequence.
   =================================================================== */

(function () {
  'use strict';

  function waitForGSAP(cb) {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      cb();
    } else {
      setTimeout(() => waitForGSAP(cb), 100);
    }
  }

  waitForGSAP(function () {
    gsap.registerPlugin(ScrollTrigger);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      document.querySelector('.nav').classList.add('visible');
      document.getElementById('hero-name').textContent = 'VO LE VUONG';
      return;
    }

    // ── Set initial hidden state for all .reveal elements ──
    gsap.set('.reveal', { opacity: 0, y: 30 });

    // ──────────────────────────────────────────
    // HERO ENTRANCE CHOREOGRAPHY
    // ──────────────────────────────────────────
    const heroTL = gsap.timeline({ delay: 0.2 });

    // Glass orbs scale in
    heroTL.from('.glass-orb', {
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.5)',
      stagger: 0.1,
    }, 0.3);

    // Label "SOFTWARE ENGINEER"
    heroTL.fromTo('#hero-label',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      0.5
    );

    // Slogan
    heroTL.fromTo('#hero-slogan',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      1.4
    );

    // CTA buttons
    heroTL.fromTo('#hero-ctas',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.4)' },
      1.8
    );

    // Photo
    heroTL.fromTo('#hero-photo-frame',
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.2)' },
      1.0
    );

    // Nav
    heroTL.add(() => {
      document.querySelector('.nav').classList.add('visible');
    }, 2.4);

    heroTL.fromTo('.nav',
      { y: -72 },
      { y: 0, duration: 0.4, ease: 'power2.out' },
      2.4
    );

    // ──────────────────────────────────────────
    // SCROLL PROGRESS BAR
    // ──────────────────────────────────────────
    gsap.to('#scroll-progress', {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });

    // ──────────────────────────────────────────
    // SECTION REVEAL ANIMATIONS (.reveal elements)
    // ──────────────────────────────────────────
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => {
      // Calculate stagger delay for grouped items
      let staggerDelay = 0;
      const parent = el.parentNode;
      if (parent && parent.classList.contains('skills-grid') ||
          parent && parent.classList.contains('projects-grid') ||
          parent && parent.classList.contains('social-links') ||
          parent && parent.classList.contains('about-grid')) {
        const siblings = Array.from(parent.querySelectorAll('.reveal'));
        staggerDelay = siblings.indexOf(el) * 0.12;
      }

      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        delay: staggerDelay,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    });

    // ──────────────────────────────────────────
    // SECTION TITLE CLIP-PATH REVEAL
    // ──────────────────────────────────────────
    document.querySelectorAll('.section-title').forEach(title => {
      gsap.fromTo(title, {
        clipPath: 'inset(0 100% 0 0)',
        opacity: 0,
        y: 20,
      }, {
        clipPath: 'inset(0 0% 0 0)',
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    });

    // ──────────────────────────────────────────
    // SKILL TAGS STAGGER
    // ──────────────────────────────────────────
    document.querySelectorAll('.skill-tags').forEach(container => {
      gsap.fromTo(container.querySelectorAll('.skill-tag'),
        { opacity: 0, scale: 0.8, y: 10 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 0.4,
          ease: 'back.out(1.5)',
          stagger: 0.06,
          scrollTrigger: {
            trigger: container,
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    });

    // ──────────────────────────────────────────
    // PROJECT CARDS CASCADE
    // ──────────────────────────────────────────
    gsap.fromTo('.project-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      }
    );

    // ──────────────────────────────────────────
    // EXPERIENCE TIMELINE SELF-DRAW
    // ──────────────────────────────────────────
    const timelineFill = document.getElementById('timeline-fill');
    if (timelineFill) {
      gsap.to(timelineFill, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline',
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 1,
        },
      });

      document.querySelectorAll('.timeline-node').forEach(node => {
        ScrollTrigger.create({
          trigger: node,
          start: 'top 70%',
          once: true,
          onEnter: () => node.classList.add('active'),
        });
      });
    }

    // ──────────────────────────────────────────
    // TIMELINE ENTRIES STAGGER
    // ──────────────────────────────────────────
    gsap.fromTo('.timeline-entry',
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.timeline',
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      }
    );

    // ──────────────────────────────────────────
    // CONTACT SECTION SLIDE IN
    // ──────────────────────────────────────────
    gsap.fromTo('.social-links',
      { opacity: 0, x: -40 },
      {
        opacity: 1, x: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      }
    );

    // ──────────────────────────────────────────
    // PARALLAX GLASS ORBS ON SCROLL
    // ──────────────────────────────────────────
    document.querySelectorAll('.glass-orb').forEach((orb, i) => {
      const speed = 0.15 + i * 0.05;
      gsap.to(orb, {
        y: () => -window.innerHeight * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    // ──────────────────────────────────────────
    // 3D CARD TILT (Cursor-following)
    // ──────────────────────────────────────────
    document.querySelectorAll('[data-tilt]').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          duration: 0.4,
          ease: 'power2.out',
          transformPerspective: 1000,
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)',
        });
      });
    });

    // ──────────────────────────────────────────
    // NAV SCROLL STATE
    // ──────────────────────────────────────────
    const nav = document.querySelector('.nav');
    ScrollTrigger.create({
      start: 'top -100',
      onUpdate: (self) => {
        nav.classList.toggle('scrolled', self.progress > 0);
      },
    });

    // ──────────────────────────────────────────
    // ACTIVE NAV LINK TRACKING
    // ──────────────────────────────────────────
    ['about', 'skills', 'projects', 'experience', 'contact'].forEach(id => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top 40%',
        end: 'bottom 40%',
        onEnter: () => setActiveNav(id),
        onEnterBack: () => setActiveNav(id),
      });
    });

    function setActiveNav(id) {
      document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('data-section') === id);
      });
    }
  });
})();
