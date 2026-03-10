import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EngineeringSpecs from './components/EngineeringSpecs';
import TechnicalGlossary from './components/TechnicalGlossary';
import VehicleCatalog from './components/VehicleCatalog';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      
      <main>
        <Hero />
        
        <div className="container content-container">
          <div className="specs-glossary-layout">
            <div className="main-column">
              <EngineeringSpecs />
            </div>
            <div className="sidebar-column">
              <TechnicalGlossary />
            </div>
          </div>
          
          <VehicleCatalog />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
