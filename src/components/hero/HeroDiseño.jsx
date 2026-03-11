import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Tu Próximo Destino Empieza Aquí</h1>
          <p className="hero-subtitle">
            Obtén financiamiento inmediato para los modelos 2024. Calidad garantizada y aprobación en 24 horas.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-large">Ver Inventario</button>
            <button className="btn btn-secondary btn-large">Simular Crédito</button>
          </div>
        </div>

        {/* Sliders bottom right */}
        <div className="hero-slider-indicators">
          <button className="slider-dot active" aria-label="Slide 1"></button>
          <button className="slider-dot" aria-label="Slide 2"></button>
          <button className="slider-dot" aria-label="Slide 3"></button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
