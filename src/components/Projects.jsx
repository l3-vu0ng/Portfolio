import React from 'react';
import { motion } from 'framer-motion';
import './Projects.css';

const Projects = () => {
  return (
    <section className="projects-editorial">
      <div className="portfolio-tag">
        <span className="tag">&#9654; PORTFOLIO</span>
      </div>

      <div className="project-highlight">
        <div className="highlight-content">
          <span className="tag">SIMON SPARKS</span>
          <h2 className="editorial-heading">Boundless Art: 3D Discovery</h2>
          <p className="editorial-text">
            Neque egestas congue quisque egestas diam acu cursus euismod lacinia quis
            risus vulputate odio enim Gravida sociis natoque penatibus odales neque
            malesuada bibendum arcu sodales blandit turpis cursus.
          </p>
          <button className="read-more-btn tag">READ MORE &rarr;</button>
        </div>
      </div>

      <div className="project-unbound">
        <div className="unbound-image-wrapper">
          <img src="/spheres_3d.png" alt="3D Spheres Art" className="unbound-image" />
          <span className="unbound-year tag">2 0 2 4</span>
        </div>
        <div className="unbound-text-wrapper">
          <div className="circle-badge"></div>
          <h2 className="editorial-heading unbound-heading">ART<br/>UNBOUND<br/>ODYSSEY</h2>
          <span className="tag">PERSONAL PROJECT</span>
        </div>
      </div>
    </section>
  );
};

export default Projects;
