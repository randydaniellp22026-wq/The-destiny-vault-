import React, { useEffect } from 'react';
import { ArrowLeft, ChevronRight, Zap, Shield, Sparkles, Navigation } from 'lucide-react';
import './VehicleDetails.css';

const VehicleDetails = ({ vehicle, onNavigate }) => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!vehicle) return null;

  return (
    <div className="vehicle-details-page">
      {/* 1. Header / Hero Section */}
      <section 
        className="details-hero"
        style={{ backgroundImage: `url(${vehicle.image})` }}
      >
        <div className="details-hero-overlay"></div>
        <div className="container details-hero-content">
          <button 
            className="back-btn" 
            onClick={() => onNavigate('home')}
            aria-label="Volver al inicio"
          >
            <ArrowLeft size={20} />
            Volver
          </button>
          
          <div className="hero-text-content">
            <span className="hero-tag">{vehicle.tag || 'NUEVO INGRESO'}</span>
            <h1 className="hero-title">{vehicle.name}</h1>
            <p className="hero-subtitle">La redefinición absoluta del rendimiento y la elegancia. Diseñado para quienes exigen más que solo conducir.</p>
            
            <div className="hero-stats-row">
              <div className="hero-stat">
                <span className="stat-label">Año</span>
                <span className="stat-value">{vehicle.year}</span>
              </div>
              <div className="stat-divider"></div>
              <div className="hero-stat">
                <span className="stat-label">Precio</span>
                <span className="stat-value">${vehicle.price.toLocaleString()}</span>
              </div>
              <div className="stat-divider"></div>
              <div className="hero-stat">
                <span className="stat-label">Cuota desde</span>
                <span className="stat-value">${Math.round(vehicle.price * 0.015).toLocaleString()}/mes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Especificaciones Técnicas */}
      <section className="specs-section container wrapper-padding">
        <h2 className="section-heading">Ingeniería que Inspira</h2>
        
        <div className="specs-cards-grid">
          <div className="spec-card">
            <div className="spec-icon-wrapper"><Zap size={24} /></div>
            <h3 className="spec-title">Motorización</h3>
            <p className="spec-data">{vehicle.motor}</p>
            <p className="spec-desc">Poder inmediato y respuesta aerodinámica superior.</p>
          </div>
          
          <div className="spec-card">
            <div className="spec-icon-wrapper"><Navigation size={24} /></div>
            <h3 className="spec-title">Dinámica de Conducción</h3>
            <p className="spec-data">0-100 km/h en 4.2s</p>
            <p className="spec-desc">Precisión absoluta en cada curva.</p>
          </div>

          <div className="spec-card">
            <div className="spec-icon-wrapper"><Sparkles size={24} /></div>
            <h3 className="spec-title">Historial de Unidad</h3>
            <p className="spec-data">{vehicle.mileage}</p>
            <p className="spec-desc">Revisado y certificado por nuestros expertos bajo estándares premium.</p>
          </div>

          <div className="spec-card">
            <div className="spec-icon-wrapper"><Shield size={24} /></div>
            <h3 className="spec-title">Transmisión</h3>
            <p className="spec-data">Automática de 8 vel.</p>
            <p className="spec-desc">Cambios imperceptibles para un confort inigualable.</p>
          </div>
        </div>
      </section>

      {/* 3. Equipamiento Destacado */}
      <section className="features-section">
        <div className="container wrapper-padding">
          <h2 className="section-heading centered">Confort y Tecnología de Vanguardia</h2>
          
          <div className="feature-block">
            <div className="feature-image">
              <img src="https://images.unsplash.com/photo-1606016259837-e070d65b6e4e?auto=format&fit=crop&q=80&w=1000" alt="Interior lujoso" />
            </div>
            <div className="feature-text">
              <h3>Una cabina diseñada en torno a usted.</h3>
              <ul className="feature-list">
                <li><ChevronRight size={18} className="list-icon" /> Asientos deportivos en cuero premium.</li>
                <li><ChevronRight size={18} className="list-icon" /> Iluminación ambiental configurable.</li>
                <li><ChevronRight size={18} className="list-icon" /> Sistema acústico de alta fidelidad Envolvente.</li>
              </ul>
            </div>
          </div>

          <div className="feature-block reverse">
            <div className="feature-image">
              <img src="https://images.unsplash.com/photo-1628126139942-1e96a2de69ab?auto=format&fit=crop&q=80&w=1000" alt="Tecnología automotriz" />
            </div>
            <div className="feature-text">
              <h3>Seguridad intuitiva.</h3>
              <ul className="feature-list">
                <li><ChevronRight size={18} className="list-icon" /> Sistema de frenado autónomo de emergencia.</li>
                <li><ChevronRight size={18} className="list-icon" /> Sensores 360° y cámara de retroceso HD.</li>
                <li><ChevronRight size={18} className="list-icon" /> Asistente de mantenimiento de carril adaptativo.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Llamado a la Acción Final */}
      <section className="cta-section">
        <div className="container cta-content">
          <h2 className="cta-title">Dé el Siguiente Paso</h2>
          <p className="cta-subtitle">Nuestros asesores premium están listos para guiarle a través del proceso de financiamiento o coordinar una visita exclusiva.</p>
          
          <div className="cta-buttons">
            <button className="btn btn-primary btn-lg">Agendar un Test Drive VIP</button>
            <button className="btn btn-outline btn-lg">Solicitar Cotización Formal &rarr;</button>
          </div>
          
          <p className="cta-disclaimer">Aprobación de financiamiento sujeta a análisis crediticio. Garantía extendida disponible.</p>
        </div>
      </section>
    </div>
  );
};

export default VehicleDetails;
