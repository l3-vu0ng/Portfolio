import React from 'react';
import HeroBanner from './components/HeroBanner';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';

function App() {
  return (
    <div className="app-container">
      <HeroBanner />
      <About />
      <Projects />
      <Experience />
      <Contact />
    </div>
  );
}

export default App;
