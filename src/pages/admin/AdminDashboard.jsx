import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, PlusCircle, ClipboardList } from 'lucide-react';
import './Admin.css';

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="admin-dashboard-overview">
      <div className="admin-header">
        <h1 className="admin-title">Panel de Control <ShieldCheck size={36} className="admin-icon-title" /></h1>
        <p className="admin-subtitle">Bienvenido, {user.nombre}. Gestiona el inventario y usuarios de SAVS.</p>
      </div>
      
      <div className="dashboard-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
        <div className="stat-card" style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h3 style={{ color: '#9ca3af', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '1rem' }}>Estado del Sistema</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#10b981' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></div>
            <span style={{ fontWeight: '600' }}>Operativo</span>
          </div>
        </div>
        
        <div className="stat-card" style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h3 style={{ color: '#9ca3af', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '1rem' }}>Tu Rol</h3>
          <span style={{ color: '#eab308', fontWeight: '700', fontSize: '1.2rem' }}>{user.rol?.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
