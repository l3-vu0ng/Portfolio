import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

/* ── Particle Wave Canvas ── */
const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];
    const PARTICLE_COUNT = 1800;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles in a wave grid
    const init = () => {
      particles = [];
      const cols = 90;
      const rows = Math.ceil(PARTICLE_COUNT / cols);
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          particles.push({
            baseX: (j / cols) * canvas.width * 1.2 - canvas.width * 0.1,
            baseY: canvas.height * 0.3 + i * 4,
            x: 0,
            y: 0,
            size: Math.random() * 1.2 + 0.3,
          });
        }
      }
    };
    init();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.003;

      for (const p of particles) {
        const wave = Math.sin(p.baseX * 0.005 + time * 2) * 60
                   + Math.sin(p.baseX * 0.01 + time * 1.5) * 30
                   + Math.cos(p.baseY * 0.02 + time) * 20;
        p.x = p.baseX;
        p.y = p.baseY + wave;

        const alpha = Math.max(0.05, 0.3 - Math.abs(wave) * 0.003);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero__canvas" />;
};

/* ── Stagger Animation Variants ── */
const lineVariants = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 1.2,
      delay: 0.3 + i * 0.15,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 1.0 + i * 0.15, ease: 'easeOut' },
  }),
};

/* ── Hero Component ── */
const Hero = () => {
  return (
    <section className="hero" id="hero">
      <ParticleCanvas />

      <div className="hero__content">
        <div className="hero__titles">
          <div className="hero__title-line">
            <motion.h1
              className="hero__title"
              custom={0}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
            >
              CREATIVE
            </motion.h1>
          </div>
          <div className="hero__title-line">
            <motion.h1
              className="hero__title hero__title--outline"
              custom={1}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
            >
              DEVELOPER
            </motion.h1>
          </div>
        </div>

        <div className="hero__bottom">
          <motion.div
            className="hero__tagline"
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <span className="mono" style={{ color: 'var(--text-muted)' }}>
              // SCALABLE WEB SOLUTIONS.
            </span>
          </motion.div>

          <motion.div
            className="hero__bio"
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <p className="hero__name mono">
              Le Vuong / <span style={{ color: 'var(--text-muted)' }}>Software Engineer</span>
            </p>
            <p className="hero__desc">
              Full-stack developer driven by a passion for building
              efficient, scalable applications. Expertise in web development,
              with a focus on performance and clean architecture.
            </p>
          </motion.div>
        </div>

        <motion.a
          href="#projects"
          className="hero__cta mono"
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          EXPLORE MY WORK <span className="hero__cta-arrow">↓</span>
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
