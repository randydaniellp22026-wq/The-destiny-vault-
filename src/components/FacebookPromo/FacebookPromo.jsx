import React from 'react';
import './FacebookPromo.css';
import fbPromoImg from '../../img/fb_promo.png';

const FacebookPromo = ({ type = 'horizontal', className = '' }) => {
  const handlePromoClick = () => {
    window.open('https://www.facebook.com/importadorasavs', '_blank');
  };

  if (type === 'card') {
    return (
      <div className={`card vehicle-card fb-promo-card ${className}`} onClick={handlePromoClick}>
        <div className="fb-promo-content">
          <img src={fbPromoImg} alt="Promoción en Facebook" className="fb-promo-bg" />
          <div className="fb-promo-overlay">
            <h3 className="fb-promo-title">Ofertas Flash</h3>
            <p className="fb-promo-desc">
              Descubre carros en liquidación cada semana en nuestro Facebook.
            </p>
            <button className="btn btn-primary fb-promo-btn">
              Ver Promociones
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'vertical') {
    return (
      <div className={`fb-promo-vertical ${className}`} onClick={handlePromoClick}>
        <div className="fb-promo-img-top">
          <img src={fbPromoImg} alt="Promoción en Facebook" />
        </div>
        <div className="fb-promo-text-bottom">
          <span className="fb-badge">🔥 OFERTA DE LA SEMANA</span>
          <h2>¿Buscas el mejor trato?</h2>
          <p>Llévate vehículos seleccionados a precios irrepetibles.</p>
          <button className="btn btn-primary fb-promo-btn" style={{ backgroundColor: '#1877F2', borderColor: '#1877F2', color: '#fff' }}>
            Ir a Facebook →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`fb-promo-banner fb-promo-horizontal ${className}`} onClick={handlePromoClick}>
      <div className="fb-promo-banner-inner">
        <div className="fb-promo-text">
          <span className="fb-badge">🔥 OFERTA DE LA SEMANA</span>
          <h2>¿Buscas el mejor trato?</h2>
          <p>Llévate vehículos seleccionados a precios irrepetibles. Solo en nuestras redes.</p>
          <button className="btn btn-outline fb-promo-btn" style={{ backgroundColor: 'transparent' }}>
            Ir a Facebook →
          </button>
        </div>
        <div className="fb-promo-img-wrapper">
          <img src={fbPromoImg} alt="Promoción en Facebook" />
        </div>
      </div>
    </div>
  );
};

export default FacebookPromo;
