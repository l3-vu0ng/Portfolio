import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './HeroBanner.css';

const HeroBanner = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const monitorY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const keyboardY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const mouseY = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  // Stagger Text Animation
  const title = "LE VUONG".split("");
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.5 }
    }
  };
  const letterVars = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 12, stiffness: 100 } }
  };

  return (
    <section className="hero-editorial" ref={ref}>
      <div className="hero-top-nav">
        <span className="tag">ABOUT</span>
        <span className="tag">WORK</span>
        <div className="logo-placeholder">LV</div>
        <span className="tag">SHOP</span>
        <span className="tag">CONTACTS</span>
      </div>
      
      <div className="hero-center">
        <span className="tag hero-tag-left">01 &rarr;</span>
        
        <div className="hero-image-wrapper">
          <motion.img 
            src="/dev_monitor.png" 
            alt="3D Monitor" 
            className="hero-3d-art monitor"
            style={{ y: monitorY }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <motion.img 
            src="/dev_keyboard.png" 
            alt="3D Keyboard" 
            className="hero-3d-art keyboard"
            style={{ y: keyboardY }}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.2 }}
          />
          <motion.img 
            src="/dev_mouse.png" 
            alt="3D Mouse" 
            className="hero-3d-art mouse"
            style={{ y: mouseY }}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.4 }}
          />
        </div>

        <motion.div className="hero-title-container" style={{ y: textY }}>
          <span className="tag title-tag-top">S O F T W A R E</span>
          <motion.h1 className="hero-title" variants={containerVars} initial="hidden" animate="show">
            {title.map((char, index) => (
              <motion.span key={index} variants={letterVars} style={{ display: 'inline-block' }}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
          <span className="tag title-tag-bottom">E N G I N E E R I N G</span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;
