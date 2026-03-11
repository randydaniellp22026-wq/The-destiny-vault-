import React from 'react';
import { Engine, Zap, Cog, Leaf } from 'lucide-react';
import './EngineeringSpecs.css';

const EngineeringSpecs = () => {
  const specs = [
    {
      id: 1,
      icon: <Engine size={32} />,
      title: "Motor Híbrido V6",
      description: "Eficiencia térmica de última generación con 350HP."
    },
    {
      id: 2,
      icon: <Zap size={32} />,
      title: "Torque Instantáneo",
      description: "Asistencia eléctrica para una aceleración suave de 0 a 100."
    },
    {
      id: 3,
      icon: <Cog size={32} />,
      title: "Transmisión Adaptativa",
      description: "8 velocidades con IA para optimizar el consumo de combustible."
    },
    {
      id: 4,
      icon: <Leaf size={32} />,
      title: "Bajas Emisiones",
      description: "Certificación Euro 6 para un impacto ambiental reducido."
    }
  ];

  return (
    <section className="engineering-specs">
      <h2 className="section-title">Especificaciones de Ingeniería</h2>
      <div className="specs-grid">
        {specs.map((spec) => (
          <div key={spec.id} className="card spec-card">
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
