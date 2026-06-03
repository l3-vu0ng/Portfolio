import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Navbar.css';

const navItems = [
  { num: '01', label: 'HOME', href: '#hero' },
  { num: '02', label: 'ABOUT', href: '#about' },
  { num: '03', label: 'PROJECTS', href: '#projects' },
  { num: '04', label: 'CONTACT', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <a href="#hero" className="navbar__logo">LV.DEV</a>
      <div className="navbar__links">
        {navItems.map((item) => (
          <a key={item.num} href={item.href} className="navbar__link mono">
            <span className="navbar__link-num">{item.num}/</span>
            {item.label}
          </a>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
