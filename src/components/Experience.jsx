import React from 'react';
import { motion } from 'framer-motion';
import './Experience.css';

const Experience = () => {
  const experiences = [
    { year: '2024 - Present', role: 'Senior Frontend Developer', company: 'TechNova' },
    { year: '2021 - 2024', role: 'Web Developer', company: 'Creative Studio' },
    { year: '2019 - 2021', role: 'Computer Science Degree', company: 'University of Tech' },
  ];

  return (
    <section className="section" id="experience">
      <h2 className="section-title neon-text-cyan">Experience & Education</h2>
      <div className="timeline">
        {experiences.map((exp, i) => (
          <motion.div 
            key={i} 
            className="timeline-item"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
          >
            <div className="timeline-dot glass"></div>
            <div className="timeline-content glass">
              <span className="neon-text-purple">{exp.year}</span>
              <h3>{exp.role}</h3>
              <p>{exp.company}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
