import React from 'react';
import { Heart } from 'lucide-react';
import { useVehicleCardLogica } from './VehicleCardLogica';
import './VehicleCard.css';

const VehicleCard = ({ vehicle, onNavigate }) => {
  const { isFavorite, getTagClass, toggleFavorite } = useVehicleCardLogica();

  return (
    <div className="vehicle-card card-base">
      <div className="card-image-wrapper">
        <img src={vehicle.image} alt={vehicle.name} className="card-image" />
        <div className={`card-tag ${getTagClass(vehicle.tag)}`}>
          {vehicle.tag}
        </div>
        <button 
          className="favorite-btn" 
          onClick={toggleFavorite}
          aria-label="Agregar a favoritos"
        >
          <Heart 
            size={20} 
            className={isFavorite ? 'heart-icon active' : 'heart-icon'} 
            fill={isFavorite ? '#ef4444' : 'none'}
            color={isFavorite ? '#ef4444' : 'white'}
          />
        </button>
      </div>

      <div className="card-content">
        <div className="card-header">
          <h3 className="vehicle-name">{vehicle.name}</h3>
        </div>

        <div className="vehicle-specs-grid">
          <div className="spec-item">
            <span className="spec-label">Motor</span>
            <span className="spec-value">{vehicle.motor}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Kilometraje</span>
            <span className="spec-value">{vehicle.mileage}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Tipo</span>
            <span className="spec-value">{vehicle.type}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Año modelo</span>
            <span className="spec-value">{vehicle.year}</span>
          </div>
        </div>

        <div className="card-footer">
          <div className="vehicle-price">${vehicle.price.toLocaleString()}</div>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => onNavigate && onNavigate('details', vehicle)}
          >
            Detalles
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
