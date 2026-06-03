import React from 'react';
import HeroBanner from './components/HeroBanner';
import FeatureGrid from './components/FeatureGrid';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="app-container">
      <HeroBanner />
      <FeatureGrid />
      <About />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
