import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  return (
    <section className="about-editorial">
      <div className="portfolio-tag">
        <span className="tag">&#9654; ABOUT ME</span>
      </div>
      <div className="about-content">
        <motion.h2 
          className="editorial-heading"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Bridging the gap between design and engineering.
        </motion.h2>
        <motion.p 
          className="editorial-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          I am a Software Engineer who specializes in building exceptional digital experiences. 
          Currently, I'm focused on building accessible, human-centered products utilizing 
          modern frameworks and deep systemic architectures.
        </motion.p>
      </div>
    </section>
  );
};

export default About;
