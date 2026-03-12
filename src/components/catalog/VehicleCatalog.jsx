import React from 'react';
import VehicleCard from './VehicleCard';
import Filters from './Filters';
import './VehicleCatalog.css';

const VehicleCatalog = ({ title, vehicles, showFilters = false, onNavigate }) => {
  return (
    <section className="vehicle-catalog-section">
      <div className="catalog-header">
        <h2 className="section-title">{title}</h2>
        <div className="catalog-actions">
          <p className="results-text">Mostrando {vehicles.length} vehículos</p>
        </div>
      </div>

      <div className="catalog-grid">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} onNavigate={onNavigate} />
        ))}
      </div>

      {showFilters && <Filters />}
    </section>
  );
};

export default VehicleCatalog;
