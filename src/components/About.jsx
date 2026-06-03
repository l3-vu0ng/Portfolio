import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './About.css';

const services = [
  { icon: '⟨/⟩', title: 'Web Development' },
  { icon: '📱', title: 'App Development' },
  { icon: '⚙️', title: 'System Design' },
];

const stats = [
  { value: 120, suffix: '+', label: 'Completed Projects' },
  { value: 95, suffix: '%', label: 'Client Satisfaction' },
  { value: 10, suffix: '+', label: 'Years Experience' },
];

/* Animated counter */
const Counter = ({ target, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = Math.ceil(target / 60);
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setCount(current);
    }, 25);
    return () => clearInterval(interval);
  }, [inView, target]);

  return (
    <span ref={ref} className="stat__value">
      {count}<span className="stat__suffix">{suffix}</span>
    </span>
  );
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const About = () => {
  return (
    <section className="about" id="about">
      <div className="about__grid">
        {/* Left: Services */}
        <div className="about__services">
          {services.map((s, i) => (
            <motion.div
              key={i}
              className="service-card"
              custom={i}
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="service-card__icon">{s.icon}</span>
              <span className="service-card__title">{s.title}</span>
            </motion.div>
          ))}
        </div>

        {/* Right: About text + Stats */}
        <div className="about__content">
          <motion.h2
            className="about__heading"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            About me
          </motion.h2>
          <motion.p
            className="about__text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            I started my software journey from curiosity and passion. Through years of building,
            I&apos;ve learned to love the process of creating from scratch. This has led me to software
            development as it fulfills my love for learning, problem-solving, and building things
            that matter.
          </motion.p>

          <div className="about__stats">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                className="stat"
                custom={i}
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Counter target={s.value} suffix={s.suffix} />
                <span className="stat__label">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
