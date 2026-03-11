import React from 'react';
import { CarFront, Search, Bell, User } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo">
          <div className="logo-icon">
            <CarFront size={28} />
          </div>
          <span className="logo-text">Gestionadora de Créditos</span>
        </div>

        {/* Navigation Links */}
        <ul className="navbar-links">
          <li><a href="#" className="active">Inicio</a></li>
          <li><a href="#">Vehículos</a></li>
          <li><a href="#">Financiamiento</a></li>
          <li><a href="#">Contacto</a></li>
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
          <div className="avatar-container">
            <div className="avatar">
              <User size={20} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
