import React from 'react';
import Hero from '../components/home/Hero';
import EngineeringSpecs from '../components/home/EngineeringSpecs';
import Glossary from '../components/home/Glossary';
import VehicleCatalog from '../components/catalog/VehicleCatalog';
import { useHomeLogica } from './HomeLogica';

const Home = ({ onNavigate }) => {
  const { motorCatalogo, kilometrajeCatalogo, tipoCatalogo, anioCatalogo } = useHomeLogica();

  return (
    <main>
      <Hero onNavigate={onNavigate} />
      
      <div className="container content-container">
        <div className="specs-glossary-layout">
          <div className="main-column">
            <EngineeringSpecs />
          </div>
          <div className="sidebar-column">
            <Glossary />
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', marginTop: '2rem' }}>
          <VehicleCatalog 
            title="1. Bestias del asfalto" 
            vehicles={motorCatalogo} 
            onNavigate={onNavigate}
          />
          
          <VehicleCatalog 
            title="2. Poco Kilometraje" 
            vehicles={kilometrajeCatalogo} 
            onNavigate={onNavigate}
          />

          <VehicleCatalog 
            title="3. Comodos y familiares" 
            vehicles={tipoCatalogo} 
            onNavigate={onNavigate}
          />

          <VehicleCatalog 
            title="4. Re-estrenos" 
            vehicles={anioCatalogo} 
            onNavigate={onNavigate}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
