import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  const handleInventoryClick = () => {
    navigate('/inventory');
  };

  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
