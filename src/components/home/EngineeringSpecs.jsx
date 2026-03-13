import React from 'react';
import { useEngineeringSpecsLogica } from './EngineeringSpecsLogica';
import './EngineeringSpecs.css';

const EngineeringSpecs = () => {
  const { specs } = useEngineeringSpecsLogica();

  return (
    <section className="engineering-specs">
      <h2 className="section-title">Especificaciones de Ingeniería</h2>
      
      <div className="specs-grid">
        {specs.map((spec) => (
          <div key={spec.id} className="spec-card card-base">
            <div className="spec-icon-wrapper">
              {spec.icon}
            </div>
            <h3 className="spec-title">{spec.title}</h3>
            <p className="spec-description">{spec.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EngineeringSpecs;
