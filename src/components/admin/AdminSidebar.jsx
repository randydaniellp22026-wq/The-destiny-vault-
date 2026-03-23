import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users, 
  LayoutDashboard, 
  ClipboardList, 
  PlusCircle, 
  LogOut,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import './AdminSidebar.css';

const AdminSidebar = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isManager = user.rol === 'gerente';

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <div className="admin-logo">
          SAVS<span>Admin</span>
        </div>
      </div>

      <nav className="admin-nav">
        <div className="nav-section">
          <label>General</label>
          <NavLink to="/admin" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
            <ChevronRight size={14} className="arrow" />
          </NavLink>
          <NavLink to="/" className="nav-item view-site-link">
            <ExternalLink size={20} />
            <span>Ver Sitio Público</span>
          </NavLink>
        </div>

        <div className="nav-section">
          <label>Gestión</label>
          <NavLink to="/admin/users" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Users size={20} />
            <span>Usuarios</span>
            <ChevronRight size={14} className="arrow" />
          </NavLink>
          
          <NavLink to="/admin/requests" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <ClipboardList size={20} />
            <span>Solicitudes</span>
            <ChevronRight size={14} className="arrow" />
          </NavLink>
        </div>

        <div className="nav-section">
          <label>Inventario</label>
          <NavLink to="/admin/create-vehicle" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <PlusCircle size={20} />
            <span>Nuevo Auto</span>
            <ChevronRight size={14} className="arrow" />
          </NavLink>
        </div>
      </nav>

      <div className="admin-sidebar-footer">
        <div className="admin-user-info">
          <div className="user-avatar">
            {user.nombre?.charAt(0) || 'A'}
          </div>
          <div className="user-details">
            <span className="user-name">{user.nombre}</span>
            <span className="user-role">{isManager ? 'Gerente' : 'Administrador'}</span>
          </div>
        </div>
        <NavLink to="/" className="logout-link">
          <LogOut size={20} />
          <span>Salir</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default AdminSidebar;
