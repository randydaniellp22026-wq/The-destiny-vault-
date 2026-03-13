import React from 'react';
import { CarFront, Search, Bell, User } from 'lucide-react';
import { useNavbarLogica } from './Navbarlogica';
import './Navbar.css';

const NavbarDiseño = ({ onNavigate, current }) => {
  const { } = useNavbarLogica();

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo" onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>
          <div className="logo-icon">
            <CarFront size={28} />
          </div>
          <span className="logo-text">Gestionadora de Créditos</span>
        </div>

        {/* Navigation Links */}
        <ul className="navbar-links">
          <li><a href="#" className={current === 'home' ? 'active' : ''} onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Inicio</a></li>
          <li><a href="#" className={current === 'inventory' ? 'active' : ''} onClick={(e) => { e.preventDefault(); onNavigate('inventory'); }}>Vehículos</a></li>
          <li><a href="#" className={current === 'modelAuto' ? 'active' : ''} onClick={(e) => { e.preventDefault(); onNavigate('modelAuto'); }}>Modelos</a></li>
          <li><a href="#" className={current === 'contact' ? 'active' : ''} onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}>Contacto</a></li>
        </ul>

        {/* Right Section */}
        <div className="navbar-actions">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Buscar modelos, marcas..." 
              className="search-input"
            />
          </div>
          <button className="icon-btn notification-btn" aria-label="Notificaciones">
            <Bell size={20} />
            <span className="notification-dot"></span>
          </button>
          <div className="avatar-container" onClick={() => onNavigate('login')} style={{ cursor: 'pointer' }}>
            <div className="avatar">
              <User size={20} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDiseño;
