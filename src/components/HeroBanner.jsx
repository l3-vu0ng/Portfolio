import React from 'react';
import { motion } from 'framer-motion';
import './HeroBanner.css';

const HeroBanner = () => {
  return (
    <section className="hero-editorial">
      <div className="hero-top-nav">
        <span className="tag">ABOUT</span>
        <span className="tag">WORK</span>
        <div className="logo-placeholder">SS</div>
        <span className="tag">SHOP</span>
        <span className="tag">CONTACTS</span>
      </div>
      
      <div className="hero-center">
        <span className="tag hero-tag-left">01 &rarr;</span>
        
        <motion.div 
          className="hero-image-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img src="/hero_torus.png" alt="3D Generative Torus" className="hero-3d-art" />
        </motion.div>

        <div className="hero-title-container">
          <span className="tag title-tag-top">I L L U S T R A T I O N</span>
          <h1 className="hero-title">SIMON SPARKS</h1>
          <span className="tag title-tag-bottom">G E N E R A T I V E   D E S I G N</span>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
