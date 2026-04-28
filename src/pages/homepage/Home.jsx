import React from 'react';
import Hero from '../../components/home/Hero';
import Brands from '../../components/home/Brands';
import Experience from '../../components/home/Experience';
import VehicleCatalog from '../../components/catalog/VehicleCatalog';
import PublicidadSAVS from '../../components/PublicidadSAVS/PublicidadSAVS';
import FacebookPromo from '../../components/FacebookPromo/FacebookPromo';
import { useHomeLogica } from './HomeLogica';

const Home = () => {
  const { motorCatalogo, kilometrajeCatalogo, tipoCatalogo, anioCatalogo } = useHomeLogica();

  return (
    <main className="home-main">
      <Hero />
      
      <Brands />
      
      <section className="section-spacing">
        <Experience />
      </section>
      
      <section className="section-spacing">
        <PublicidadSAVS />
      </section>

      <section className="section-spacing container">
        <FacebookPromo type="banner" />
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
          
          <div style={{ margin: '3rem 0' }}>
            <FacebookPromo type="banner" />
          </div>

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
