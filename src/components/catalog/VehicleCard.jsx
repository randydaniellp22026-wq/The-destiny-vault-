import React, { useState } from 'react';
import { Heart, Activity, Settings2, Palette } from 'lucide-react';
import './VehicleCard.css';

const VehicleCard = ({ vehicle }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Return a style class for the tag depending on its value
  const getTagClass = (tag) => {
    switch(tag) {
      case 'Nuevo': return 'tag-new';
      case 'Recomendado': return 'tag-recommended';
      case 'Oferta': return 'tag-offer';
      default: return 'tag-default';
    }
  };

  return (
    <div className="vehicle-card card-base">
      <div className="card-image-wrapper">
        <img src={vehicle.image} alt={vehicle.name} className="card-image" />
        <div className={`card-tag ${getTagClass(vehicle.tag)}`}>
          {vehicle.tag}
        </div>
        <button 
          className="favorite-btn" 
          onClick={() => setIsFavorite(!isFavorite)}
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
          <p className="vehicle-subtitle">{vehicle.type} • {vehicle.year} • {vehicle.fuel}</p>
        </div>

        <div className="vehicle-features">
          <div className="feature">
            <Activity size={16} />
            <span>{vehicle.mileage}</span>
          </div>
          <div className="feature">
            <Settings2 size={16} />
            <span>{vehicle.transmission}</span>
          </div>
          <div className="feature">
            <Palette size={16} />
            <span>{vehicle.color}</span>
          </div>
        </div>

        <div className="card-footer">
          <div className="vehicle-price">${vehicle.price.toLocaleString()}</div>
          <button className="btn btn-primary btn-sm">Detalles</button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
