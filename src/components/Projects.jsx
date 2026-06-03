import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Projects.css';

const Projects = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yImage = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section className="projects-editorial" ref={ref}>
      <div className="portfolio-tag">
        <span className="tag">&#9654; PORTFOLIO</span>
      </div>

      <div className="project-highlight">
        <div className="highlight-content">
          <span className="tag">E-COMMERCE PLATFORM</span>
          <h2 className="editorial-heading">NexShop: Next-gen Retail</h2>
          <p className="editorial-text">
            A high-performance e-commerce platform built with Next.js and Stripe. 
            Features include real-time inventory, complex cart state management, and 
            a blazing fast headless CMS architecture.
          </p>
          <button className="read-more-btn tag">VIEW SOURCE &rarr;</button>
        </div>
      </div>

      <div className="project-unbound">
        <div className="unbound-image-wrapper">
          <div className="image-overflow-hidden">
            <motion.img 
              src="/dev_monitor.png" 
              alt="Project Showcase" 
              className="unbound-image" 
              style={{ y: yImage, scale: 1.2 }}
            />
          </div>
          <span className="unbound-year tag">2 0 2 4</span>
        </div>
        <div className="unbound-text-wrapper">
          <div className="circle-badge"></div>
          <h2 className="editorial-heading unbound-heading">CYBER<br/>DEFENSE<br/>SYSTEM</h2>
          <span className="tag">OPEN SOURCE INITIATIVE</span>
        </div>
      </div>
    </section>
  );
};

export default Projects;
