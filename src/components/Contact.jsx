import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <footer className="footer-editorial">
      <div className="footer-top">
        <span className="tag">&#9654; LIVE EVENTS</span>
      </div>

      <div className="footer-center">
        <h2 className="footer-heading">Organizing a conference?</h2>
        <button className="contact-btn tag">CONTACTS &rarr;</button>
      </div>

      <div className="footer-bottom">
        <div className="social-links">
          <div className="social-icon">Bē</div>
          <div className="social-icon">D</div>
        </div>
        <div className="logo-placeholder">SS</div>
        <div className="footer-nav">
          <a href="#">About</a> / <a href="#">Work</a> / <a href="#">Shop</a> / <a href="#">Contacts</a>
        </div>
      </div>
      <div className="footer-copyright tag">
        2024 COPYRIGHT | SIMON SPARKS | ALL RIGHTS RESERVED
      </div>
    </footer>
  );
};

export default Contact;
