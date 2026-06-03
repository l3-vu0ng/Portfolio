import React from 'react';
import HeroBanner from './components/HeroBanner';
import FeatureGrid from './components/FeatureGrid';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="app-container">
      <HeroBanner />
      <FeatureGrid />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
