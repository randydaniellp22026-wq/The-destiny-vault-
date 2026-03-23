import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Car, 
  Users, 
  ClipboardList, 
  Star,
  Activity,
  ArrowUpRight
} from 'lucide-react';
import './Admin.css';

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [stats, setStats] = useState({
    vehicles: 0,
    users: 0,
    requests: 0,
    reviews: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const endpoints = [
          'http://localhost:5000/vehicles',
          'http://localhost:5000/users',
          'http://localhost:5000/requests',
          'http://localhost:5000/reviews'
        ];
        
        const [v, u, req, rev] = await Promise.all(
          endpoints.map(url => fetch(url).then(r => r.ok ? r.json() : []))
        );

        setStats({
          vehicles: v.length,
          users: u.length,
          requests: req.length,
          reviews: rev.length
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard-overview">
      <div className="admin-header">
        <h1 className="admin-title">Panel de Control <ShieldCheck size={36} className="admin-icon-title" /></h1>
        <p className="admin-subtitle">Bienvenido, {user.nombre}. Gestiona el inventario y usuarios de SAVS.</p>
      </div>
      
      <div className="dashboard-stats-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '1.5rem', 
        marginTop: '2rem' 
      }}>
        
        {/* Card: Vehículos */}
        <div className="stat-card" style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ background: 'rgba(234, 179, 8, 0.1)', padding: '10px', borderRadius: '10px', color: '#eab308' }}>
              <Car size={24} />
            </div>
            <ArrowUpRight size={16} style={{ color: '#4b5563' }} />
          </div>
          <h3 style={{ color: '#9ca3af', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>Inventario Total</h3>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: '700', color: '#fff' }}>{loading ? '...' : stats.vehicles}</span>
            <span style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: '600' }}>Unidades</span>
          </div>
        </div>

        {/* Card: Usuarios */}
        <div className="stat-card" style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '10px', borderRadius: '10px', color: '#3b82f6' }}>
              <Users size={24} />
            </div>
          </div>
          <h3 style={{ color: '#9ca3af', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>Usuarios Registrados</h3>
          <span style={{ fontSize: '2rem', fontWeight: '700', color: '#fff' }}>{loading ? '...' : stats.users}</span>
        </div>

        {/* Card: Solicitudes */}
        <div className="stat-card" style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '10px', borderRadius: '10px', color: '#10b981' }}>
              <ClipboardList size={24} />
            </div>
          </div>
          <h3 style={{ color: '#9ca3af', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>Solicitudes Pendientes</h3>
          <span style={{ fontSize: '2rem', fontWeight: '700', color: '#fff' }}>{loading ? '...' : stats.requests}</span>
        </div>

        {/* Card: Reseñas */}
        <div className="stat-card" style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ background: 'rgba(249, 115, 22, 0.1)', padding: '10px', borderRadius: '10px', color: '#f97316' }}>
              <Star size={24} />
            </div>
          </div>
          <h3 style={{ color: '#9ca3af', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>Opiniones</h3>
          <span style={{ fontSize: '2rem', fontWeight: '700', color: '#fff' }}>{loading ? '...' : stats.reviews}</span>
        </div>

        {/* Card: Estado del Sistema */}
        <div className="stat-card" style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '10px', borderRadius: '10px', color: '#10b981' }}>
              <Activity size={24} />
            </div>
          </div>
          <h3 style={{ color: '#9ca3af', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>Estado Servidor</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }}></div>
            <span style={{ color: '#10b981', fontWeight: '600', fontSize: '0.9rem' }}>En Línea</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
