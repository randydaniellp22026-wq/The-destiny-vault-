import React from 'react';
import VehicleCard from './VehicleCard';
import Filters from './Filters';
import './VehicleCatalog.css';

const VehicleCatalog = () => {
  const vehicles = [
    {
      id: 1,
      name: 'BMW Serie 3 M-Sport',
      type: 'Sedán',
      year: '2024',
      fuel: 'Híbrido',
      mileage: '1,200 km',
      transmission: 'Automática',
      color: 'Gris Brooklyn',
      price: 45900,
      tag: 'Nuevo',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 2,
      name: 'Jeep Wrangler Rubicon',
      type: 'SUV',
      year: '2023',
      fuel: 'Gasolina',
      mileage: '15,400 km',
      transmission: 'Automática 4x4',
      color: 'Rojo Firecracker',
      price: 38200,
      tag: 'Recomendado',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 3,
      name: 'Audi Q3 Sportback',
      type: 'Crossover',
      year: '2024',
      fuel: 'Híbrido',
      mileage: '8,500 km',
      transmission: 'S tronic',
      color: 'Azul Navarra',
      price: 52000,
      tag: 'Oferta',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0b3e?auto=format&fit=crop&q=80&w=1000'
    }
  ];

  return (
    <section className="vehicle-catalog-section" id="vehiculos">
      <div className="catalog-header">
        <h2 className="section-title">Catálogo de Vehículos</h2>
        <div className="catalog-actions">
          <p className="results-text">Mostrando 3 de 124 vehículos</p>
        </div>
      </div>

      <div className="catalog-grid">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>

      <Filters />
    </section>
  );
};

export default VehicleCatalog;
