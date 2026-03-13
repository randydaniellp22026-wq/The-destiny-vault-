import React from 'react';
import { ArrowRight, Calculator } from 'lucide-react';
import './Hero.css';

const Hero = ({ onNavigate }) => {
  const handleInventoryClick = () => {
    if (onNavigate) {
      onNavigate('inventory');
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      
      <div className="container hero-content">
        <div className="hero-text-content">
          <h1 className="hero-title">Tu Próximo Destino Empieza Aquí</h1>
          <p className="hero-subtitle">
            Obtén financiamiento inmediato para los modelos 2024. Calidad garantizada y aprobación en 24 horas.
          </p>
          
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={handleInventoryClick}>
              Ver Inventario
              <ArrowRight size={18} />
            </button>
            <button className="btn btn-secondary hero-btn-outline">
              <Calculator size={18} />
              Simular Crédito
            </button>
          </div>
        </div>

        {/* Slider Indicators */}
        <div className="hero-indicators">
          <div className="indicator active"></div>
          <div className="indicator"></div>
          <div className="indicator"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
