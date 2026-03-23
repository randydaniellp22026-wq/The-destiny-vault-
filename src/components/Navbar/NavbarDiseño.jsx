import React, { useState } from 'react';
import { Search, Bell, User, Calculator, LogOut, Menu, X } from 'lucide-react';
import savsLogo from '../../img/image copy 4.png';
import { useNavbarStatus } from '../../hooks/useNavbar';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import VehicleSelectionModal from '../VehicleSelection/VehicleSelectionModal';
import './Navbar.css';

const NavbarDiseño = () => {
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const { 
    user, 
    isLoggedIn, 
    handleUserClick, 
    handleLogout, 
    searchQuery, 
    setSearchQuery, 
    onSearchSubmit,
    isMenuOpen,
    toggleMenu,
    closeMenu
  } = useNavbarStatus();
  const navigate = useNavigate();
  const location = useLocation();
  const current = location.pathname;

  return (
    <>
    <nav className="navbar">
      <div className="container navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className="logo-icon-savs">
            <img src={savsLogo} alt="SAVS" className="savs-logo-img" />
          </div>
          <span className="logo-text">Importadora SAVS</span>
        </div>

        {/* Navigation Links */}
        <ul className="navbar-links">
          <li><Link to="/" className={current === '/' ? 'active' : ''}>Inicio</Link></li>
          <li><Link to="/inventory" className={current === '/inventory' ? 'active' : ''}>Vehículos</Link></li>
          <li>
            <button 
              onClick={() => setIsVehicleModalOpen(true)}
              className={current === '/simulate-credit' ? 'active' : ''} 
            >
              Calcular Financiamiento
            </button>
          </li>
          <li><Link to="/contact" className={current === '/contact' ? 'active' : ''}>Contacto</Link></li>
          {(user?.rol === 'admin' || user?.rol === 'gerente') && (
            <li><Link to="/admin" onClick={(e) => { e.preventDefault(); window.location.href = '/admin'; }} className={current.startsWith('/admin') ? 'active' : ''} style={{ color: '#eab308' }}>Gestión SAVS</Link></li>
          )}
        </ul>

        {/* Right Section */}
        <div className="navbar-actions">
          <div className="search-bar">
            {/* Search inputs and buttons */}
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Buscar modelos, marcas..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit(e)}
            />
          </div>
          
          <div 
            className={`session-manager ${isLoggedIn ? 'logged-in' : ''}`}
            onClick={handleUserClick}
          >
            <div className="avatar-wrapper">
              <User size={20} />
            </div>
            <span className="session-label">
              {isLoggedIn ? `Perfil: ${user.nombre}` : 'Iniciar Sesión'}
            </span>
            {isLoggedIn && (
              <button 
                className="logout-button" 
                onClick={handleLogout}
                title="Cerrar Sesión"
              >
                <LogOut size={18} />
              </button>
            )}
          </div>

          {/* Hamburger Menu Toggle */}
          <button className="hamburger-btn" onClick={toggleMenu} aria-label="Abrir Menú">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu-drawer ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <ul className="mobile-links">
            <li onClick={closeMenu}><Link to="/" className={current === '/' ? 'active' : ''}>Inicio</Link></li>
            <li onClick={closeMenu}><Link to="/inventory" className={current === '/inventory' ? 'active' : ''}>Vehículos</Link></li>
            <li>
              <button 
                onClick={() => {
                  setIsVehicleModalOpen(true);
                  closeMenu();
                }}
                className={current === '/simulate-credit' ? 'active' : ''} 
              >
                Calcular Financiamiento
              </button>
            </li>
            <li onClick={closeMenu}><Link to="/contact" className={current === '/contact' ? 'active' : ''}>Contacto</Link></li>
          {(user?.rol === 'admin' || user?.rol === 'gerente') && (
            <li><Link to="/admin" onClick={(e) => { e.preventDefault(); window.location.href = '/admin'; }} className={current.startsWith('/admin') ? 'active' : ''} style={{ color: '#eab308' }}>Gestión SAVS</Link></li>
          )}
          </ul>
          
          <div className="mobile-footer">
            <img src={savsLogo} alt="SAVS" className="mobile-menu-logo" />
            <p>© 2024 Importadora SAVS. Todo los derechos reservados.</p>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isMenuOpen && <div className="mobile-menu-overlay" onClick={closeMenu}></div>}
    </nav>
      <VehicleSelectionModal 
        isOpen={isVehicleModalOpen} 
        onClose={() => setIsVehicleModalOpen(false)} 
      />
    </>
  );
};

export default NavbarDiseño;
