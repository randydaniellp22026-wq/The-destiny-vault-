import React, { useState } from 'react';
import { Search, Bell, User, Calculator } from 'lucide-react';
import savsLogo from '../../img/image copy 4.png';
import { useNavbarLogica } from './Navbarlogica';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import VehicleSelectionModal from '../VehicleSelection/VehicleSelectionModal';
import './Navbar.css';

const NavbarDiseño = () => {
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const { user, isLoggedIn, handleUserClick, searchQuery, setSearchQuery, handleSearch } = useNavbarLogica();
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
              style={{display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: 'inherit', fontSize: 'inherit', fontFamily: 'inherit', cursor: 'pointer', padding: 0}}
            >
              <Calculator size={18} /> Calcular Financiamiento
            </button>
          </li>
          <li><Link to="/contact" className={current === '/contact' ? 'active' : ''}>Contacto</Link></li>
        </ul>

        {/* Right Section */}
        <div className="navbar-actions">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Buscar modelos, marcas..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
          
          <div 
            className={`session-manager ${isLoggedIn ? 'logged-in' : ''}`}
            onClick={handleUserClick}
          >
            <span className="session-label">
              {isLoggedIn ? `Perfil: ${user.nombre}` : 'Iniciar Sesión'}
            </span>
            <div className="avatar-wrapper">
              <User size={20} />
            </div>
          </div>
        </div>
      </div>
    </nav>
      <VehicleSelectionModal 
        isOpen={isVehicleModalOpen} 
        onClose={() => setIsVehicleModalOpen(false)} 
      />
    </>
  );
};

export default NavbarDiseño;
