import React from 'react';
import './Brands.css';

const Brands = () => {
  // URLs estáticas con fondos transparentes para poder aplicar el filtro monocromático
  // Para los logos más fieles a tu imagen de referencia, puedes sustituir estos enlaces
  // por tus propios archivos locales importándolos en la parte superior.
  const brands = [
    {
      id: 1,
      name: 'Hyundai',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Hyundai_Motor_Company_logo.svg'
    },
    {
      id: 2,
      name: 'Toyota',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg'
    },
    {
      id: 3,
      name: 'Land Rover',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/4/4a/Landrover_logo_2024.svg'
    },
    {
      id: 4,
      name: 'Nissan',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Nissan_2020_logo.svg'
    }
  ];

  return (
    <section className="brands-section">
      <div className="brands-container">
        <h2 className="sr-only">Nuestros Aliados</h2>
        <ul className="brands-list">
          {brands.map((brand) => (
            <li key={brand.id} className="brand-item">
              <img 
                src={brand.logoUrl} 
                alt={`${brand.name} logo`} 
                className="brand-logo" 
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Brands;
