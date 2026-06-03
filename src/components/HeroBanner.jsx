import React from 'react';
import { motion } from 'framer-motion';
import './HeroBanner.css';

const HeroBanner = () => {
  return (
    <section className="section hero-section" id="home">
      <div className="hero-content">
        <motion.div 
          className="avatar-container"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          <img src="/assets/avatar-2d.png" alt="2D Developer Avatar" className="avatar" />
          
          {/* Floating elements */}
          <motion.div className="floating-item item-keyboard" animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>⌨️</motion.div>
          <motion.div className="floating-item item-mouse" animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1 }}>🖱️</motion.div>
          <motion.div className="floating-item item-monitor" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}>💻</motion.div>
          <motion.div className="floating-item item-code" animate={{ y: [0, -25, 0] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.2 }}>&lt;/&gt;</motion.div>
        </motion.div>
        
        <motion.div 
          className="hero-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="neon-text-cyan">Hi, I'm a Developer</h1>
          <p className="neon-text-purple subtitle">Building digital experiences</p>
          <a href="#about" className="btn-primary explore-btn">Explore My World</a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;
