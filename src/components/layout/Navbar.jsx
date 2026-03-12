import React from 'react';
import { Car, Search, Bell, User } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ onNavigate, current }) => {
  return (
    <header className="navbar-container">
      <div className="container navbar-content">
        {/* Logo Section */}
        <div 
          className="navbar-brand" 
          onClick={() => onNavigate && onNavigate('home')}
          style={{ cursor: 'pointer' }}
        >
          <div className="brand-icon">
            <Car size={24} color="#ffffff" />
          </div>
          <span className="brand-name">Gestionadora de Créditos</span>
        </div>

        {/* Navigation Links */}
        <nav className="navbar-links">
          <a href="#inicio" className={`nav-link ${current === 'home' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('home'); }}>Inicio</a>
          <a href="#vehiculos" className={`nav-link ${current === 'inventory' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('inventory'); }}>Vehículos</a>
          <a href="#financiamiento" className="nav-link">Financiamiento</a>
          <a href="#contacto" className="nav-link">Contacto</a>
        </nav>

        {/* Right Actions */}
        <div className="navbar-actions">
          <div className="search-bar">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              placeholder="Buscar modelos, marcas..." 
              className="search-input"
            />
          </div>
          
          <button className="icon-btn" aria-label="Notificaciones">
            <Bell size={20} />
            <span className="notification-badge"></span>
          </button>
          
          <button className="avatar-btn" aria-label="Usuario">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
