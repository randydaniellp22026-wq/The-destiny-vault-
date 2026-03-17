import React from 'react';
import { Search, Bell, User, Calculator } from 'lucide-react';
import savsLogo from '../../img/image copy 4.png';
import { useNavbarLogica } from './Navbarlogica';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './Navbar.css';

const NavbarDiseño = () => {
  const { } = useNavbarLogica();
  const navigate = useNavigate();
  const location = useLocation();
  const current = location.pathname;

  return (
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
            <Link to="/simulate-credit" className={current === '/simulate-credit' ? 'active' : ''} style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
              <Calculator size={18} /> Simular Crédito
            </Link>
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
            />
          </div>
          <button className="icon-btn notification-btn" aria-label="Notificaciones">
            <Bell size={20} />
            <span className="notification-dot"></span>
          </button>
          <div className="avatar-container" onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>
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
