import React from 'react';
import './App.css';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Page Components
import Hero from './components/home/Hero';
import EngineeringSpecs from './components/home/EngineeringSpecs';
import Glossary from './components/home/Glossary';
import VehicleCatalog from './components/catalog/VehicleCatalog';

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
              <Glossary />
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
