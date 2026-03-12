import React, { useState } from 'react';
import './App.css';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import VehicleDetails from './pages/VehicleDetails/VehicleDetails';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleNavigate = (page, vehicleContext = null) => {
    setCurrentPage(page);
    setSelectedVehicle(vehicleContext);
    window.scrollTo(0, 0); // Reset scroll position when jumping pages
  };

  return (
    <div className="app-container">
      <Navbar onNavigate={handleNavigate} />
      
      {currentPage === 'home' && (
        <Home onNavigate={handleNavigate} />
      )}

      {currentPage === 'details' && selectedVehicle && (
        <VehicleDetails vehicle={selectedVehicle} onNavigate={handleNavigate} />
      )}

      <Footer />
    </div>
  );
}
export default App;
