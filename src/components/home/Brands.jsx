import React from 'react';
import './Brands.css';

const Brands = () => {
  // URLs estáticas con fondos transparentes para poder aplicar el filtro monocromático
  // Para los logos más fieles a tu imagen de referencia, puedes sustituir estos enlaces
  // por tus propios archivos locales importándolos en la parte superior.
  const brands = [
    { id: 1, name: 'Hyundai', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Hyundai_Motor_Company_logo.svg' },
    { id: 2, name: 'Toyota', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg' },
    { id: 3, name: 'Land Rover', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/4/4a/Landrover_logo_2024.svg' },
    { id: 4, name: 'Nissan', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Nissan_2020_logo.svg' },
    { id: 5, name: 'Honda', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg' },
    { id: 6, name: 'Kia', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/KIA_logo_2.svg' },
    { id: 7, name: 'Chevrolet', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Chevrolet_Logo_2024.svg' },
    { id: 8, name: 'Mitsubishi', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Mitsubishi-logo.svg' },
    { id: 9, name: 'Mazda', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Mazda_Logo_2024.svg' },
    { id: 10, name: 'Genesis', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Genesis_Motor_logo.svg' },
    { id: 11, name: 'Lexus', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Lexus_logo.svg' },
    { id: 12, name: 'BMW', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg' }
  ];

  return (
    <section className="brands-section">
      <div className="brands-container">
        <h2 className="sr-only">Nuestros Aliados</h2>
        <div className="brands-wrapper">
          <ul className="brands-list">
            {brands.map((brand) => (
              <li key={`${brand.id}-1`} className="brand-item">
                <img src={brand.logoUrl} alt={`${brand.name} logo`} className="brand-logo" />
              </li>
            ))}
            {/* Duplicate for infinite loop */}
            {brands.map((brand) => (
              <li key={`${brand.id}-2`} className="brand-item">
                <img src={brand.logoUrl} alt={`${brand.name} logo`} className="brand-logo" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Brands;
