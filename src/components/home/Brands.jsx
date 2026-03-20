import React from 'react';
import './Brands.css';

// Importación de logos locales
import nissanLogo from '../../img/25571-7-nissan-transparent_64x64.ico';
import genesisLogo from '../../img/Genesis_Logo_PNG(1).png';
import landRoverLogo from '../../img/NicePng_land-rover-logo-png_1391393.png';
import mazdaLogo from '../../img/NicePng_mazda-logo-png_1337697.png';
import kiaLogo from '../../img/kia-512.png';
import mitsubishiLogo from '../../img/mitsubishi-512.png';
import bmwLogo from '../../img/bmw-512.png';
import chevroletLogo from '../../img/chevrolet-4-logo-black-and-white.png';
import lexusLogo from '../../img/lexus-512.png';
import hondaLogo from '../../img/pngwing.com.png';

const Brands = () => {
  // URLs estáticas con fondos transparentes para poder aplicar el filtro monocromático
  // Para los logos más fieles a tu imagen de referencia, puedes sustituir estos enlaces
  // por tus propios archivos locales importándolos en la parte superior.
  const brands = [
    { id: 1, name: 'Hyundai', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Hyundai_Motor_Company_logo.svg' },
    { id: 2, name: 'Toyota', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg' },
    { id: 3, name: 'Land Rover', logoUrl: landRoverLogo },
    { id: 4, name: 'Nissan', logoUrl: nissanLogo },
    { id: 5, name: 'Honda', logoUrl: hondaLogo },
    { id: 6, name: 'Kia', logoUrl: kiaLogo },
    { id: 7, name: 'Chevrolet', logoUrl: chevroletLogo },
    { id: 8, name: 'Mitsubishi', logoUrl: mitsubishiLogo },
    { id: 9, name: 'Mazda', logoUrl: mazdaLogo },
    { id: 10, name: 'Genesis', logoUrl: genesisLogo },
    { id: 11, name: 'Lexus', logoUrl: lexusLogo },
    { id: 12, name: 'BMW', logoUrl: bmwLogo }
  ];

  return (
    <section className="brands-section">
      <div className="brands-container">
        <h2 className="sr-only">Nuestros Aliados</h2>
        <div className="brands-wrapper">
          <ul className="brands-list">
            {brands.map((brand) => (
              <li key={`${brand.id}-1`} className={`brand-item brand-${brand.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <img src={brand.logoUrl} alt={`${brand.name} logo`} className="brand-logo" />
              </li>
            ))}
            {/* Duplicate for infinite loop */}
            {brands.map((brand) => (
              <li key={`${brand.id}-2`} className={`brand-item brand-${brand.name.toLowerCase().replace(/\s+/g, '-')}`}>
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
