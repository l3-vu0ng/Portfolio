import React from 'react';
import { motion } from 'framer-motion';
import './Projects.css';

const Projects = () => {
  const projectList = [
    { title: 'Cyber UI Library', desc: 'A futuristic UI component library built with React.' },
    { title: 'Neon Dashboard', desc: 'Analytics dashboard leveraging glassmorphism and modern charts.' },
    { title: 'AI Portfolio', desc: 'This interactive 2D portfolio website.' }
  ];

  return (
    <section className="section" id="projects">
      <h2 className="section-title neon-text-purple">Projects</h2>
      <div className="projects-grid">
        {projectList.map((proj, i) => (
          <motion.div 
            key={i} 
            className="glass project-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
          >
            <h3 className="neon-text-cyan">{proj.title}</h3>
            <p>{proj.desc}</p>
            <a href="#" className="project-link">View Details</a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
