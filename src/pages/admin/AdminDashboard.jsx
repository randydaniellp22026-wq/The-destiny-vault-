import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, PlusCircle, ClipboardList } from 'lucide-react';
import './Admin.css';

const AdminDashboard = () => {
  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">Panel de Control <ShieldCheck size={36} className="admin-icon-title" /></h1>
        <p className="admin-subtitle">Bienvenido al sistema de administración exclusivo de SAVS.</p>
      </div>
      
      <div className="admin-cards">
        <Link to="/admin/requests" className="admin-card">
          <ClipboardList size={48} className="admin-icon" />
          <h3>Revisión de Solicitudes</h3>
          <p>Gestiona las solicitudes de los clientes que desean vender su auto.</p>
        </Link>
        
        <Link to="/admin/create-vehicle" className="admin-card">
          <PlusCircle size={48} className="admin-icon" />
          <h3>Publicar Nuevo Auto</h3>
          <p>Añade un nuevo vehículo oficial al inventario para que aparezca en el catálogo.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
