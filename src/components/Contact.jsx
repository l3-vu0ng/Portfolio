import React from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  return (
    <section className="section" id="contact">
      <h2 className="section-title neon-text-purple">Get In Touch</h2>
      <motion.div 
        className="glass contact-container"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p>Currently open for new opportunities and interesting projects.</p>
        <div className="contact-links">
          <a href="mailto:hello@example.com" className="btn-primary">Email Me</a>
          <a href="https://github.com/l3-vu0ng" target="_blank" rel="noreferrer" className="btn-primary">GitHub</a>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
