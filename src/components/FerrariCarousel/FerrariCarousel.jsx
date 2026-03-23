import React, { useState, useEffect, useMemo } from 'react';
import './FerrariCarousel.css';
import { ChevronRight, ChevronLeft, Pause, Play } from 'lucide-react';

// Cargar todas las imágenes de la carpeta Hyundai Tucson IX20 dinámicamente
const hyundaiImagesRaw = import.meta.glob('../../img/Hyundai Tucson IX20/*.{jpg,jpeg,png,webp,avif}', { eager: true, import: 'default' });
const hyundaiImages = Object.values(hyundaiImagesRaw);

const VehicleCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Mapeamos las imágenes para construir el arreglo de SLIDES
  const slides = useMemo(() => {
    return hyundaiImages.map((imgUrl, index) => ({
      image: imgUrl,
      title: index === 0 ? 'Hyundai Tucson IX20' : 'Diseño Excepcional',
      subtitle: index === 0 ? 'NUEVO INGRESO' : `VISTA ${index + 1}`,
      text: index === 0 
        ? 'Explora cada detalle de este increíble SUV. Rendimiento, confort y tecnología avanzada.'
        : 'Cada ángulo está pensado para brindarte la mejor experiencia de conducción premium.'
    }));
  }, []);

  useEffect(() => {
    let interval;
    if (isPlaying && slides.length > 0) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsPlaying(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsPlaying(false);
  };

  if (slides.length === 0) return null;

  return (
    <div className="fc-carousel-container">
      {/* Background borroso adaptativo al slide activo */}
      <div 
        className="fc-slide-bg-blur" 
        style={{ backgroundImage: `url("${slides[currentSlide].image}")` }} 
      />
      <div className="fc-slide-overlay-dark" />

      {/* Grid de imágenes (Slide Activo, Previo, Siguiente) */}
      <div className="fc-slides-track">
        {slides.map((slide, index) => {
          const diff = (index - currentSlide + slides.length) % slides.length;
          let positionClass = 'fc-slide-hidden';
          
          if (diff === 0) positionClass = 'fc-slide-active';
          else if (diff === 1) positionClass = 'fc-slide-next';
          else if (diff === slides.length - 1) positionClass = 'fc-slide-prev';
          else if (diff === 2) positionClass = 'fc-slide-hidden-right';
          else if (diff === slides.length - 2) positionClass = 'fc-slide-hidden-left';

          return (
            <div 
              key={index} 
              className={`fc-slide-item ${positionClass}`}
              onClick={() => {
                if (diff === 1) nextSlide();
                if (diff === slides.length - 1) prevSlide();
              }}
            >
              <img src={slide.image} alt={`Vista ${index + 1}`} className="fc-slide-image-contain" />
            </div>
          );
        })}
      </div>

      <div className="fc-slide-overlay" />
      
      {/* Contenido de texto dinámico renderizado arriba */}
      <div className="fc-slide-content" key={currentSlide}>
        <h4 className="fc-subtitle">{slides[currentSlide].subtitle}</h4>
        <h2 className="fc-title">{slides[currentSlide].title}</h2>
        <p className="fc-text">{slides[currentSlide].text}</p>
      </div>

      <div className="fc-controls">
        <button className="fc-nav-btn fc-nav-prev" onClick={prevSlide} aria-label="Anterior Slide">
          <ChevronLeft className="fc-icon" />
        </button>
        <button className="fc-nav-btn fc-nav-next" onClick={nextSlide} aria-label="Siguiente Slide">
          <ChevronRight className="fc-icon" />
        </button>
      </div>

      <div className="fc-indicators-wrapper">
        <div className="fc-indicators" style={{ flexWrap: 'wrap', justifyContent: 'center', maxWidth: '60vw' }}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`fc-dot ${index === currentSlide ? 'fc-dot-active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
        <button 
          className="fc-play-pause-btn" 
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? 'Pausar Autoplay' : 'Empezar Autoplay'}
        >
          {isPlaying ? <Pause size={16} strokeWidth={2.5} /> : <Play size={16} strokeWidth={2.5} />}
        </button>
      </div>
    </div>
  );
};

export default VehicleCarousel;
