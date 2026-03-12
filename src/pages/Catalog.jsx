import React from 'react';
import VehicleCatalog from '../components/CatalogoDeVehiculos/VehicleCatalog';
import './Catalog.css';

const Catalog = ({ onNavigate }) => {
  return (
    <div className="catalog-page">
      <div className="container">
        <VehicleCatalog onNavigate={onNavigate} showFilters={true} />
      </div>
    </div>
  );
};

export default Catalog;
