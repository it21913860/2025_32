import React from 'react';
import './Gauge.css';

function Gauge({ title, value, max, unit, color }) {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className="gauge-card">
      <div className="gauge-container">
        <div
          className="gauge-fill"
          style={{ background: color, height: `${percentage}%` }}
        ></div>
        <div className="gauge-cover">
          {value}{unit}
        </div>
      </div>
      <div className="gauge-title">{title}</div>
    </div>
  );
}

export default Gauge;