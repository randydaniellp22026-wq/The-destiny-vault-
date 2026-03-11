import React, { useState } from 'react';
import { Heart, Gauge, Settings, Droplet } from 'lucide-react';
import './VehicleCatalog.css';

const VehicleCatalog = () => {
  const [activeYear, setActiveYear] = useState('2024');

  const vehicles = [
    {
      id: 1,
      tag: "Nuevo",
      tagColor: "#10b981", // Emerald
      name: "BMW Serie 3 M-Sport",
      type: "Sedán",
      year: 2024,
      fuel: "Híbrido",
      mileage: "1,200 km",
      transmission: "Automática",
      color: "Gris Nardo",
      price: "$45,900",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      tag: "Oferta",
      tagColor: "#ef4444", // Red
      name: "Jeep Wrangler Rubicon",
      type: "SUV",
      year: 2023,
      fuel: "Gasolina",
      mileage: "18,500 km",
      transmission: "Manual",
      color: "Verde Militar",
      price: "$38,200",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      tag: "Recomendado",
      tagColor: "#3b82f6", // Blue
      name: "Audi Q3 Sportback",
      type: "SUV",
      year: 2024,
      fuel: "Gasolina",
      mileage: "0 km",
      transmission: "Automática",
      color: "Azul Navarra",
      price: "$52,000",
      image: "https://images.unsplash.com/photo-1606152421802-db97b91bdd45?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section className="vehicle-catalog">
      <div className="catalog-header">
        <h2 className="section-title">Catálogo de Vehículos</h2>
      </div>

      <div className="catalog-grid">
        {vehicles.map((car) => (
          <div key={car.id} className="card vehicle-card">
            <div className="vehicle-image-container">
              <img src={car.image} alt={car.name} className="vehicle-image" />
              <div 
                className="vehicle-tag"
                style={{ backgroundColor: car.tagColor }}
              >
                {car.tag}
              </div>
              <button className="favorite-btn" aria-label="Añadir a favoritos">
                <Heart size={20} />
              </button>
            </div>
            
            <div className="vehicle-info">
              <h3 className="vehicle-name">{car.name}</h3>
              <p className="vehicle-meta">{car.type} • {car.year} • {car.fuel}</p>
              
              <div className="vehicle-specs-grid">
                <div className="spec-item">
                  <Gauge size={16} className="spec-icon" />
                  <span>{car.mileage}</span>
                </div>
                <div className="spec-item">
                  <Settings size={16} className="spec-icon" />
                  <span>{car.transmission}</span>
                </div>
                <div className="spec-item">
                  <Droplet size={16} className="spec-icon" />
                  <span>{car.color}</span>
                </div>
              </div>

              <div className="vehicle-footer">
                <span className="vehicle-price">{car.price}</span>
                <button className="btn btn-primary btn-details">Detalles</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filtros debajo del catálogo */}
      <div className="catalog-filters">
        <div className="card filter-panel">
          <h3 className="filter-title">Rangos de Kilometraje</h3>
          <ul className="filter-list">
            <li>
              <span className="filter-label">Nuevo / Re-estrene</span>
              <span className="filter-count">(0 - 5,000 km)</span>
            </li>
            <li>
              <span className="filter-label">Semi-nuevos A</span>
              <span className="filter-count">(5,001 - 25,000 km)</span>
            </li>
            <li>
              <span className="filter-label">Semi-nuevos B</span>
              <span className="filter-count">(25,001 - 60,000 km)</span>
            </li>
          </ul>
        </div>

        <div className="card filter-panel">
          <h3 className="filter-title">Años de Producción</h3>
          <div className="year-filters">
            {['2024', '2023', '2022', '< 2021'].map((year) => (
              <button 
                key={year}
                className={`year-btn ${activeYear === year ? 'active' : ''}`}
                onClick={() => setActiveYear(year)}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleCatalog;
