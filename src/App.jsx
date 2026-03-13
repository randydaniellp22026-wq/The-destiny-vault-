import React, { useState } from 'react';
import './App.css';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages & Components
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import VehicleDetails from './pages/VehicleDetails/VehicleDetails';
import RegistroUsuarios from './components/RegistroDeUsuarios/RegistroUsuarios';
import LoginVista from './components/login/LoginVista';
import RedireccionContactos from './components/Redirecciones/Redireccion Contactos/Redireccion Contactos/RedireccionContactos';
import RedireccionModeloAuto from './components/Redirecciones/RedireccionModeloAuto/RedireccionModeloAuto/RedireccionModeloAuto';

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
      <Navbar onNavigate={handleNavigate} current={currentPage} />
      
      {currentPage === 'home' && (
        <Home onNavigate={handleNavigate} />
      )}

      {currentPage === 'inventory' && (
        <Catalog onNavigate={handleNavigate} />
      )}

      {currentPage === 'details' && selectedVehicle && (
        <VehicleDetails vehicle={selectedVehicle} onNavigate={handleNavigate} />
      )}

      {currentPage === 'register' && (
        <RegistroUsuarios onNavigate={handleNavigate} />
      )}

      {currentPage === 'login' && (
        <LoginVista onNavigate={handleNavigate} />
      )}

      {currentPage === 'contact' && (
        <RedireccionContactos onNavigate={handleNavigate} />
      )}

      {currentPage === 'modelAuto' && (
        <RedireccionModeloAuto onNavigate={handleNavigate} />
      )}

      <Footer />
    </div>
  );
}
export default App;
