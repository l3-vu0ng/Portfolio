import React from 'react';
import './FeatureGrid.css';

const FeatureGrid = () => {
  const features = [
    { num: '01', title: 'FRONTEND', icon: '</>' },
    { num: '02', title: 'BACKEND', icon: '{;}' },
    { num: '03', title: 'SYSTEM', icon: '[_]', active: true },
    { num: '04', title: 'UI/UX', icon: '⧉' },
  ];

  return (
    <section className="feature-grid-section">
      {features.map((f, i) => (
        <div key={i} className={`feature-card ${f.active ? 'active-card' : ''}`}>
          <div className="card-top">
            <div className="card-icon">{f.icon}</div>
          </div>
          <div className="card-bottom">
            <h3 className="card-title tag">{f.title}</h3>
            <span className="card-num tag">{f.num}</span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FeatureGrid;
