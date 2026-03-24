import React from 'react';
import VehicleCatalog from '../../components/CatalogoDeVehiculos/VehicleCatalog';
import './Catalog.css';

const Catalog = () => {
  return (
    <div className="catalog-page">
      <div className="container">
        <VehicleCatalog showFilters={true} />
      </div>
    </div>
  );
};

export default Catalog;
