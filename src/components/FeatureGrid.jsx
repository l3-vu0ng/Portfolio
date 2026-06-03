import React from 'react';
import './FeatureGrid.css';

const FeatureGrid = () => {
  const features = [
    { num: '01', title: 'STUDIO 74', icon: 'Z-' },
    { num: '02', title: 'GLOSTER', icon: 'g' },
    { num: '03', title: 'LINEA VOL.1', icon: null, img: '/fluid_3d.png', active: true },
    { num: '04', title: 'CUBE 2.0', icon: '⧉' },
  ];

  return (
    <section className="feature-grid-section">
      {features.map((f, i) => (
        <div key={i} className={`feature-card ${f.active ? 'active-card' : ''}`}>
          <div className="card-top">
            {f.img ? <img src={f.img} alt={f.title} className="card-img" /> : <div className="card-icon">{f.icon}</div>}
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
