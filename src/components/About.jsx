import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  const skills = ['React', 'JavaScript', 'CSS', 'Framer Motion', 'Node.js', 'Git'];

  return (
    <section className="section about-section" id="about">
      <h2 className="section-title neon-text-cyan">About Me</h2>
      <div className="about-content">
        <motion.div 
          className="glass about-text"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <p>I am a passionate developer focusing on building interactive and stunning web applications. I love combining design and technology to create unique digital experiences.</p>
        </motion.div>
        <motion.div 
          className="skills-container"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          {skills.map((skill, index) => (
            <div key={index} className="glass skill-item neon-text-purple">
              {skill}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
