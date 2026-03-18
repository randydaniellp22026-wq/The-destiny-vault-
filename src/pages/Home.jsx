import React from 'react';
import Hero from '../components/home/Hero';
import Brands from '../components/home/Brands';
import VehicleCatalog from '../components/catalog/VehicleCatalog';
import PublicidadSAVS from '../components/PublicidadSAVS/PublicidadSAVS';
import { useHomeLogica } from './HomeLogica';

const Home = () => {
  const { motorCatalogo, kilometrajeCatalogo, tipoCatalogo, anioCatalogo } = useHomeLogica();

  return (
    <main className="home-main">
      <Hero />
      <Brands />
      
      <section className="section-spacing">
        <PublicidadSAVS />
      </section>

      <div className="home-divider" />
      
      <div className="container">
        <section className="catalogs-container">
          <VehicleCatalog 
            title="1. Bestias del asfalto" 
            vehicles={motorCatalogo} 
          />
          
          <VehicleCatalog 
            title="2. Poco Kilometraje" 
            vehicles={kilometrajeCatalogo} 
          />

          <VehicleCatalog 
            title="3. Cómodos y familiares" 
            vehicles={tipoCatalogo} 
          />

          <VehicleCatalog 
            title="4. Re-estrenos" 
            vehicles={anioCatalogo} 
          />
        </section>
      </div>
    </main>
  );
};

export default Home;
