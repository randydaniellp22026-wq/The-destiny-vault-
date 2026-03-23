import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { 
  ShieldCheck, 
  Car, 
  Users, 
  ClipboardList, 
  Star,
  Activity,
  ArrowUpRight,
  RefreshCw,
  TrendingUp,
  PieChart as PieIcon,
  BarChart as BarIcon,
  Search,
  Trash2,
  Edit,
  CarFront
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  Legend
} from 'recharts';
import './Admin.css';

const COLORS = ['#eab308', '#3b82f6', '#10b981', '#ef4444', '#a855f7', '#6366f1'];

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [stats, setStats] = useState({
    vehicles: 0,
    users: 0,
    requests: 0,
    reviews: 0,
    tradeIn: 0
  });
  const [dataSets, setDataSets] = useState({
    fuelData: [],
    transData: [],
    yearData: [],
    reqData: [],
    tradeInData: []
  });
  const [tradeInList, setTradeInList] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);
  const [loading, setLoading] = useState(true);

  const deleteVehicle = async (id, name) => {
    const result = await Swal.fire({
      title: '¿Eliminar vehículo?',
      text: `¿Estás seguro de borrar "${name}" de forma permanente?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#333',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
      background: '#141414',
      color: '#fff'
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:5000/vehicles/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setVehicleList(prev => prev.filter(v => v.id !== id));
          fetchStats(); // Update counters and charts
          Swal.fire({
            title: '¡Eliminado!',
            icon: 'success',
            background: '#141414',
            color: '#fff',
            timer: 1500,
            showConfirmButton: false
          });
        }
      } catch (error) {
        console.error("Error deleting vehicle:", error);
      }
    }
  };

  const updateTradeInStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/sale_requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: newStatus })
      });
      if (res.ok) {
        setTradeInList(prev => prev.map(item => item.id === id ? { ...item, estado: newStatus } : item));
        // Actualizar el gráfico
        fetchStats(); 
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const fetchStats = async () => {
      setLoading(true);
      try {
        const endpoints = [
          'http://localhost:5000/vehicles',
          'http://localhost:5000/users',
          'http://localhost:5000/requests',
          'http://localhost:5000/reviews',
          'http://localhost:5000/sale_requests'
        ];
        
        const [v, u, req, rev, sreq, sets] = await Promise.all(
          [...endpoints, 'http://localhost:5000/settings'].map(url => fetch(url).then(r => r.ok ? r.json() : []))
        );

        setStats({
          vehicles: v.length,
          users: u.length,
          requests: req.length,
          reviews: rev.length,
          tradeIn: sreq.length,
          serverStatus: sets?.server_status || {}
        });

        // Procesar datos para gráficas
        
        // 1. Combustible
        const fuelMap = v.reduce((acc, curr) => {
          const type = curr.fuel || 'No especificado';
          acc[type] = (acc[type] || 0) + 1;
          return acc;
        }, {});
        const fuelData = Object.keys(fuelMap).map(name => ({ name, value: fuelMap[name] }));

        // 2. Transmisión
        const transMap = v.reduce((acc, curr) => {
          const type = curr.transmission || 'No especificado';
          acc[type] = (acc[type] || 0) + 1;
          return acc;
        }, {});
        const transData = Object.keys(transMap).map(name => ({ name, value: transMap[name] }));

        // 3. Vehículos por Año
        const yearMap = v.reduce((acc, curr) => {
          const year = curr.year || 'N/D';
          acc[year] = (acc[year] || 0) + 1;
          return acc;
        }, {});
        const yearData = Object.keys(yearMap).sort().map(year => ({ year, cantidad: yearMap[year] }));

        // 4. Solicitudes por Estado
        const reqMap = req.reduce((acc, curr) => {
          const statusMap = {
             'pending': 'Pendiente',
             'accepted': 'Aprobada',
             'rejected': 'Rechazada',
             'replied': 'Respondida'
          };
          const status = statusMap[curr.status] || curr.status || 'Pendiente';
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});
        const reqData = Object.keys(reqMap).map(name => ({ name, value: reqMap[name] }));

        // 5. Trade-in por Estado
        const tradeInMap = sreq.reduce((acc, curr) => {
          const status = curr.estado || 'En revisión';
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});
        const tradeInData = Object.keys(tradeInMap).map(name => ({ name, value: tradeInMap[name] }));

        setDataSets({ fuelData, transData, yearData, reqData, tradeInData });

        // Guardar lista completa para gestión
        setTradeInList(sreq.sort((a, b) => (b.id - a.id)));
        setVehicleList(v.slice().sort((a, b) => (b.id - a.id)));

      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
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

        {/* Card: Trade-in */}
        <div className="stat-card" style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '10px', borderRadius: '10px', color: '#a855f7' }}>
              <RefreshCw size={24} />
            </div>
          </div>
          <h3 style={{ color: '#9ca3af', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>Trade-in (Auto Pago)</h3>
          <span style={{ fontSize: '2rem', fontWeight: '700', color: '#fff' }}>{loading ? '...' : stats.tradeIn}</span>
        </div>
      </div>

      {!loading && (
        <div className="dashboard-charts-container" style={{ marginTop: '3rem' }}>
          <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <TrendingUp size={24} style={{ color: '#eab308' }} /> Análisis de Inventario y Solicitudes
          </h2>

          <div className="charts-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: '2rem' 
          }}>
            
            {/* Gráfico 1: Distribución de Combustible */}
            <div className="chart-card" style={{ background: 'rgba(15,15,15,0.7)', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ color: '#9ca3af', fontSize: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <PieIcon size={18} /> Tipos de Combustible
              </h3>
              <div style={{ height: '300px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dataSets.fuelData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {dataSets.fuelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#000', border: '1px solid #333', color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gráfico 2: Solicitudes por Estado */}
            <div className="chart-card" style={{ background: 'rgba(15,15,15,0.7)', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ color: '#9ca3af', fontSize: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <BarIcon size={18} /> Gestión de Solicitudes
              </h3>
              <div style={{ height: '300px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataSets.reqData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ background: '#000', border: '1px solid #333', color: '#fff' }} />
                    <Bar dataKey="value" name="Cantidad" radius={[4, 4, 0, 0]}>
                      {dataSets.reqData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gráfico 3: Inventario por Año */}
            <div className="chart-card" style={{ background: 'rgba(15,15,15,0.7)', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ color: '#9ca3af', fontSize: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <TrendingUp size={18} /> Tendencia de Inventario (Año)
              </h3>
              <div style={{ height: '300px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dataSets.yearData}>
                    <defs>
                      <linearGradient id="colorYear" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="year" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip contentStyle={{ background: '#000', border: '1px solid #333', color: '#fff' }} />
                    <Area type="monotone" dataKey="cantidad" stroke="#eab308" strokeWidth={3} fillOpacity={1} fill="url(#colorYear)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gráfico 4: Transmisión */}
            <div className="chart-card" style={{ background: 'rgba(15,15,15,0.7)', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ color: '#9ca3af', fontSize: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <PieIcon size={18} /> Tipos de Transmisión
              </h3>
              <div style={{ height: '300px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dataSets.transData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {dataSets.transData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[(index + 3) % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#000', border: '1px solid #333', color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gráfico 5: Estadísticas Detalladas de Trade-in (Ancho Completo) */}
            <div className="chart-card tradein-full-chart" style={{ 
              background: 'linear-gradient(135deg, rgba(20,20,20,0.8) 0%, rgba(10,10,10,0.9) 100%)', 
              padding: '2.5rem', 
              borderRadius: '24px', 
              border: '1px solid rgba(234, 179, 8, 0.1)',
              gridColumn: '1 / -1',
              marginTop: '1rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                  <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                    <RefreshCw size={22} style={{ color: '#a855f7' }} /> Estado de Solicitudes Trade-in (Autos en Pago)
                  </h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Distribución de los vehículos enviados por clientes para ser usados como crédito.</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ display: 'block', color: '#a855f7', fontSize: '1.8rem', fontWeight: 'bold' }}>{stats.tradeIn}</span>
                  <span style={{ color: '#4b5563', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Recibidas</span>
                </div>
              </div>

              <div style={{ height: '350px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataSets.tradeInData} layout="vertical" margin={{ left: 40, right: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" horizontal={true} vertical={false} />
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      stroke="#fff" 
                      fontSize={13} 
                      width={120}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      cursor={{fill: 'rgba(255,255,255,0.03)'}} 
                      contentStyle={{ background: '#000', border: '1px solid #333', borderRadius: '12px' }}
                    />
                    <Bar dataKey="value" name="Solicitudes" barSize={40} radius={[0, 20, 20, 0]}>
                      {dataSets.tradeInData.map((entry, index) => {
                        // Colores específicos por estado
                        const colors = {
                          'Aprobado': '#10b981',
                          'Rechazado': '#ef4444',
                          'En revisión': '#eab308'
                        };
                        return <Cell key={`cell-${index}`} fill={colors[entry.name] || '#6b7280'} />;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gestión Directa de Trade-ins */}
      <div className="tradein-management-section" style={{ marginTop: '3rem' }}>
        <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <RefreshCw size={24} style={{ color: '#a855f7' }} /> Gestión de Solicitudes Trade-in
        </h2>
        
        <div className="tradein-list" style={{ display: 'grid', gap: '1rem' }}>
          {tradeInList.length === 0 ? (
            <p style={{ color: '#4b5563' }}>No hay solicitudes de trade-in pendientes.</p>
          ) : (
            tradeInList.slice(0, 5).map(item => (
              <div key={item.id} style={{ 
                background: 'rgba(255,255,255,0.02)', 
                padding: '1.5rem', 
                borderRadius: '16px', 
                border: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <img src={item.imagen} alt={item.marca} style={{ width: '80px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ color: '#fff', margin: 0 }}>{item.marca} {item.modelo} ({item.anio})</h4>
                    <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: '4px 0' }}>Precio pretendido: <span style={{ color: '#eab308' }}>₡{parseInt(item.precio).toLocaleString()}</span></p>
                    <span style={{ 
                      fontSize: '0.7rem', 
                      padding: '2px 8px', 
                      borderRadius: '4px', 
                      background: item.estado === 'Aprobado' ? 'rgba(16,185,129,0.1)' : item.estado === 'Rechazado' ? 'rgba(239,68,68,0.1)' : 'rgba(234,179,8,0.1)',
                      color: item.estado === 'Aprobado' ? '#10b981' : item.estado === 'Rechazado' ? '#ef4444' : '#eab308'
                    }}>
                      {item.estado || 'En revisión'}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => updateTradeInStatus(item.id, 'Aprobado')}
                    style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <ShieldCheck size={16} /> Aprobar
                  </button>
                  <button 
                    onClick={() => updateTradeInStatus(item.id, 'En revisión')}
                    style={{ background: '#333', color: '#eab308', border: '1px solid #eab308', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    En revisión
                  </button>
                  <button 
                    onClick={() => updateTradeInStatus(item.id, 'Rechazado')}
                    style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    Rechazar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Gestión Directa de Inventario */}
      <div className="inventory-management-section" style={{ marginTop: '3rem' }}>
        <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <CarFront size={24} style={{ color: '#eab308' }} /> Gestión de Inventario Reciente
        </h2>
        
        <div className="inventory-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {vehicleList.slice(0, 4).map(v => (
            <div key={v.id} style={{ 
              background: 'rgba(255,255,255,0.02)', 
              borderRadius: '20px', 
              border: '1px solid rgba(255,255,255,0.05)',
              overflow: 'hidden',
              transition: 'transform 0.3s ease'
            }}>
              <div style={{ height: '160px', position: 'relative' }}>
                <img src={v.image} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '10px', right: '10px', background: v.tagColor || '#10b981', color: '#fff', fontSize: '0.7rem', padding: '4px 10px', borderRadius: '20px', fontWeight: 'bold' }}>
                  {v.tag}
                </div>
              </div>
              <div style={{ padding: '1.2rem' }}>
                <h4 style={{ color: '#fff', margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{v.name}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ color: '#eab308', fontWeight: '700', fontSize: '1rem' }}>₡{(v.price || 0).toLocaleString()}</span>
                  <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>{v.year}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <button 
                    onClick={() => window.location.href = `/admin/create-vehicle?edit=${v.id}`}
                    style={{ flex: 1, background: 'rgba(59,130,246,0.1)', color: '#3b82f6', border: 'none', padding: '8px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                  >
                    <Edit size={16} /> Editar
                  </button>
                  <button 
                    onClick={() => deleteVehicle(v.id, v.name)}
                    style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'none', padding: '8px 12px', borderRadius: '10px', cursor: 'pointer' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {vehicleList.length === 0 && <p style={{ color: '#4b5563' }}>Cargando inventario...</p>}
        </div>
      </div>

      {/* Recuadro de Estado Servidor en Grande al final */}
      <div className="server-status-footer" style={{ 
        marginTop: '4rem', 
        padding: '3rem', 
        background: 'linear-gradient(180deg, rgba(20,20,20,0) 0%, rgba(16, 185, 129, 0.05) 100%)',
        borderRadius: '30px',
        border: '1px solid rgba(16, 185, 129, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <div style={{ 
          background: 'rgba(16, 185, 129, 0.1)', 
          padding: '20px', 
          borderRadius: '24px', 
          color: '#10b981',
          marginBottom: '1.5rem',
          boxShadow: '0 10px 30px rgba(16, 185, 129, 0.2)'
        }}>
          <Activity size={48} />
        </div>
        <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '0.5rem', letterSpacing: '2px' }}>{stats.serverStatus?.title || 'ESTADO DEL SERVIDOR'}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            borderRadius: '50%', 
            background: stats.serverStatus?.is_online ? '#10b981' : '#ef4444', 
            boxShadow: `0 0 15px ${stats.serverStatus?.is_online ? '#10b981' : '#ef4444'}`,
            animation: 'pulse 2s infinite'
          }}></div>
          <span style={{ color: stats.serverStatus?.is_online ? '#10b981' : '#ef4444', fontWeight: '700', fontSize: '1.2rem' }}>
            {stats.serverStatus?.status_text || 'SISTEMA EN LÍNEA'}
          </span>
        </div>
        <p style={{ color: '#4b5563', marginTop: '1rem', fontSize: '0.9rem' }}>{stats.serverStatus?.region_text || 'Todos los servicios están funcionando correctamente.'}</p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}} />
    </div>
  );
};

export default AdminDashboard;
