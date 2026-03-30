import React, { useState, useEffect } from 'react';
import {
  Ship,
  Search,
  Edit3,
  Check,
  Clock,
  MapPin,
  User,
  Package,
  ArrowRight,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Mail,
  AlertCircle
} from 'lucide-react';
import Swal from 'sweetalert2';

const API_URL = 'http://localhost:5000/users';

const STAGES = [
  { step: 1, label: 'Compra Realizada',    icon: Check,   color: '#10b981', statusText: 'Compra procesada correctamente' },
  { step: 2, label: 'En Tránsito',         icon: Ship,    color: '#3b82f6', statusText: 'Vehículo en tránsito marítimo' },
  { step: 3, label: 'En Aduanas',          icon: Clock,   color: '#eab308', statusText: 'En trámite aduanal' },
  { step: 4, label: 'Entrega Final',       icon: MapPin,  color: '#a855f7', statusText: 'Listo para entrega al cliente' },
];

const stageBadge = (step) => {
  const s = STAGES.find(x => x.step === step);
  if (!s) return null;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      background: `${s.color}22`, color: s.color,
      border: `1px solid ${s.color}55`,
      padding: '4px 12px', borderRadius: '100px',
      fontSize: '0.78rem', fontWeight: 700
    }}>
      <s.icon size={13} /> {s.label}
    </span>
  );
};

const TrackingManagement = () => {
  const [users, setUsers]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [expanded, setExpanded] = useState(null);
  const [stageFilter, setStageFilter] = useState(0); // 0 = todos

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res  = await fetch(API_URL);
      const data = await res.json();
      // Solo clientes que tengan tracking definido
      setUsers(data.filter(u => u.rol === 'Cliente' || u.tracking));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  /* ─── Modal de edición ─── */
  const handleEditTracking = (user) => {
    const t = user.tracking || {};
    Swal.fire({
      title: `Tracking: ${user.nombre}`,
      html: `
        <div style="text-align:left; color:#fff; overflow:hidden;">
          <label style="display:block;margin-bottom:5px;font-size:0.8rem;color:#9ca3af;">Nombre del Vehículo</label>
          <input id="t-vehicle" class="swal2-input" value="${t.vehicleName || ''}"
            style="margin-top:0;margin-bottom:14px;width:100%;box-sizing:border-box;">

          <label style="display:block;margin-bottom:5px;font-size:0.8rem;color:#9ca3af;">Etapa de Importación</label>
          <select id="t-status" class="swal2-input"
            style="margin-top:0;margin-bottom:14px;width:100%;box-sizing:border-box;background:#222;color:#fff;">
            <option value="1" ${t.importStatus===1?'selected':''}>1. Compra Realizada</option>
            <option value="2" ${t.importStatus===2?'selected':''}>2. En Tránsito</option>
            <option value="3" ${t.importStatus===3?'selected':''}>3. En Aduanas</option>
            <option value="4" ${t.importStatus===4?'selected':''}>4. Entrega Final</option>
          </select>

          <label style="display:block;margin-bottom:5px;font-size:0.8rem;color:#9ca3af;">Fecha Estimada de Arribo</label>
          <input id="t-date" class="swal2-input" value="${t.estimatedDate || ''}"
            placeholder="Ej: 25 Abr 2026"
            style="margin-top:0;margin-bottom:14px;width:100%;box-sizing:border-box;">

          <label style="display:block;margin-bottom:5px;font-size:0.8rem;color:#9ca3af;">Ubicación Actual</label>
          <input id="t-location" class="swal2-input" value="${t.location || ''}"
            placeholder="Ej: Puerto de Moín, Limón"
            style="margin-top:0;margin-bottom:14px;width:100%;box-sizing:border-box;">

          <label style="display:block;margin-bottom:5px;font-size:0.8rem;color:#9ca3af;">Barco / Naviera</label>
          <input id="t-vessel" class="swal2-input" value="${t.vessel || ''}"
            placeholder="Ej: Maersk Line · V0924"
            style="margin-top:0;margin-bottom:14px;width:100%;box-sizing:border-box;">

          <label style="display:block;margin-bottom:5px;font-size:0.8rem;color:#9ca3af;">Descripción del Estado</label>
          <select id="t-text" class="swal2-input"
            style="margin-top:0;margin-bottom:4px;width:100%;box-sizing:border-box;background:#222;color:#fff;">
            <option value="Compra procesada correctamente"  ${t.statusText==='Compra procesada correctamente'?'selected':''}>Compra procesada correctamente</option>
            <option value="Vehículo en tránsito marítimo"  ${t.statusText==='Vehículo en tránsito marítimo'?'selected':''}>Vehículo en tránsito marítimo</option>
            <option value="En trámite aduanal"             ${t.statusText==='En trámite aduanal'?'selected':''}>En trámite aduanal</option>
            <option value="Listo para entrega al cliente"  ${t.statusText==='Listo para entrega al cliente'?'selected':''}>Listo para entrega al cliente</option>
          </select>
        </div>
      `,
      showCancelButton:   true,
      confirmButtonText:  'Guardar',
      cancelButtonText:   'Cancelar',
      confirmButtonColor: '#eab308',
      background: '#141414',
      color: '#fff',
      width: '540px',
      preConfirm: () => ({
        vehicleName:  document.getElementById('t-vehicle').value.trim(),
        importStatus: parseInt(document.getElementById('t-status').value),
        estimatedDate: document.getElementById('t-date').value.trim(),
        location:     document.getElementById('t-location').value.trim(),
        vessel:       document.getElementById('t-vessel').value.trim(),
        statusText:   document.getElementById('t-text').value,
      })
    }).then(async (result) => {
      if (!result.isConfirmed) return;
      try {
        const res = await fetch(`${API_URL}/${user.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tracking: result.value })
        });
        if (res.ok) {
          Swal.fire({
            icon: 'success',
            title: '¡Actualizado!',
            text: `El tracking de ${user.nombre} fue guardado correctamente.`,
            confirmButtonColor: '#eab308',
            background: '#141414',
            color: '#fff',
            timer: 2000,
            showConfirmButton: false
          });
          fetchUsers();
          setExpanded(null);
        } else throw new Error();
      } catch {
        Swal.fire('Error', 'No se pudo guardar en el servidor.', 'error');
      }
    });
  };

  /* ─── Filtrado ─── */
  const filtered = users.filter(u => {
    const matchSearch = (u.nombre || '').toLowerCase().includes(search.toLowerCase()) ||
                        (u.email  || '').toLowerCase().includes(search.toLowerCase());
    const matchStage  = stageFilter === 0 || (u.tracking?.importStatus === stageFilter);
    return matchSearch && matchStage;
  });

  const clientsWithTracking    = users.filter(u => u.tracking?.vehicleName).length;
  const clientsWithoutTracking = users.length - clientsWithTracking;

  /* ─── Mini progress bar ─── */
  const MiniProgress = ({ step }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px' }}>
      {STAGES.map((s, i) => (
        <React.Fragment key={s.step}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: step >= s.step ? s.color : 'rgba(255,255,255,0.08)',
            border: `2px solid ${step >= s.step ? s.color : 'rgba(255,255,255,0.15)'}`,
            transition: 'all 0.3s',
            flexShrink: 0,
          }}>
            <s.icon size={13} color={step >= s.step ? '#fff' : '#555'} />
          </div>
          {i < STAGES.length - 1 && (
            <div style={{
              flex: 1, height: 3, borderRadius: 4,
              background: step > s.step ? s.color : 'rgba(255,255,255,0.08)',
              transition: 'all 0.3s'
            }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div style={{ padding: '0 0 4rem', maxWidth: 1100, margin: '0 auto', color: '#fff' }}>

      {/* ── Header ── */}
      <header style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <div style={{ background: 'rgba(234,179,8,0.12)', padding: 12, borderRadius: 14 }}>
            <Ship size={28} color="#eab308" />
          </div>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.4rem', margin: 0 }}>
            Tracking de <span style={{ color: '#eab308' }}>Importaciones</span>
          </h1>
        </div>
        <p style={{ color: '#9ca3af', margin: 0, fontSize: '1rem' }}>
          Gestiona y actualiza el estado del proceso de importación de cada cliente.
        </p>
      </header>

      {/* ── KPIs ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total Clientes',       value: users.length,             icon: User,    color: '#3b82f6' },
          { label: 'Con Tracking Activo',  value: clientsWithTracking,      icon: Ship,    color: '#10b981' },
          { label: 'Sin Tracking Asignado',value: clientsWithoutTracking,   icon: AlertCircle, color: '#ef4444' },
          { label: 'En Aduanas',           value: users.filter(u=>u.tracking?.importStatus===3).length, icon: Clock, color: '#eab308' },
        ].map(k => (
          <div key={k.label} style={{
            background: 'linear-gradient(145deg,#161616,#0a0a0a)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 16, padding: '1.4rem 1.6rem',
            display: 'flex', alignItems: 'center', gap: '1rem'
          }}>
            <div style={{ background: `${k.color}18`, padding: 10, borderRadius: 12, flexShrink: 0 }}>
              <k.icon size={22} color={k.color} />
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, lineHeight: 1 }}>{k.value}</div>
              <div style={{ color: '#9ca3af', fontSize: '0.82rem', marginTop: 4 }}>{k.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Búsqueda + filtros ── */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.8rem', flexWrap: 'wrap' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: '#111', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 10, padding: '0.6rem 1rem', flex: 1, minWidth: 220
        }}>
          <Search size={18} color="#6b7280" />
          <input
            type="text"
            placeholder="Buscar cliente por nombre o email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', width: '100%', fontSize: '0.95rem' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          {[{ step: 0, label: 'Todos' }, ...STAGES.map(s => ({ step: s.step, label: s.label }))].map(f => (
            <button key={f.step} onClick={() => setStageFilter(f.step)} style={{
              padding: '0.5rem 1rem', borderRadius: 100, cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem',
              border: `1px solid ${stageFilter === f.step ? '#eab308' : 'rgba(255,255,255,0.15)'}`,
              background: stageFilter === f.step ? 'rgba(234,179,8,0.15)' : 'rgba(255,255,255,0.04)',
              color: stageFilter === f.step ? '#eab308' : '#9ca3af',
              transition: 'all 0.2s'
            }}>
              {f.label}
            </button>
          ))}
          <button onClick={fetchUsers} style={{
            padding: '0.5rem 1rem', borderRadius: 100, cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem',
            border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)', color: '#9ca3af',
            display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s'
          }}>
            <RefreshCw size={14} /> Actualizar
          </button>
        </div>
      </div>

      {/* ── Lista de clientes ── */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>
          <Ship size={40} style={{ marginBottom: 12, opacity: 0.4 }} />
          <p>Cargando clientes...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>
          <AlertCircle size={40} style={{ marginBottom: 12, opacity: 0.4 }} />
          <p>No se encontraron clientes con esos criterios.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filtered.map(user => {
            const t        = user.tracking || {};
            const hasTrack = !!t.vehicleName;
            const isOpen   = expanded === user.id;

            return (
              <div key={user.id} style={{
                background: 'linear-gradient(145deg,#121212,#0d0d0d)',
                border: `1px solid ${isOpen ? 'rgba(234,179,8,0.4)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 16,
                overflow: 'hidden',
                transition: 'border-color 0.3s',
                boxShadow: isOpen ? '0 8px 32px rgba(0,0,0,0.4)' : 'none'
              }}>

                {/* ── Fila principal ── */}
                <div
                  onClick={() => setExpanded(isOpen ? null : user.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    padding: '1.2rem 1.5rem', cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                >
                  {/* Avatar */}
                  <div style={{
                    width: 46, height: 46, borderRadius: '50%', flexShrink: 0,
                    background: 'rgba(234,179,8,0.12)',
                    border: '2px solid rgba(234,179,8,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden', fontSize: '1.2rem', fontWeight: 700, color: '#eab308'
                  }}>
                    {user.image
                      ? <img src={user.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : (user.nombre?.charAt(0) || 'U')}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: '#fff' }}>{user.nombre}</div>
                    <div style={{ color: '#6b7280', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                      <Mail size={12} /> {user.email}
                    </div>
                  </div>

                  {/* Vehículo */}
                  <div style={{ textAlign: 'center', minWidth: 160 }}>
                    {hasTrack ? (
                      <>
                        <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>
                          <Package size={13} style={{ marginRight: 5, color: '#eab308' }} />
                          {t.vehicleName}
                        </div>
                        <div style={{ marginTop: 6 }}>{stageBadge(t.importStatus)}</div>
                      </>
                    ) : (
                      <span style={{ color: '#4b5563', fontStyle: 'italic', fontSize: '0.85rem' }}>Sin tracking</span>
                    )}
                  </div>

                  {/* Chevron */}
                  <div style={{ color: '#6b7280', marginLeft: 8 }}>
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {/* ── Panel expandido ── */}
                {isOpen && (
                  <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.07)',
                    padding: '1.5rem 1.8rem',
                    background: 'rgba(0,0,0,0.3)',
                    animation: 'fadeIn 0.25s ease'
                  }}>
                    {hasTrack ? (
                      <>
                        {/* Progress */}
                        <div style={{ marginBottom: '1.5rem' }}>
                          <div style={{ color: '#9ca3af', fontSize: '0.8rem', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Progreso de importación
                          </div>
                          <MiniProgress step={t.importStatus || 0} />
                        </div>

                        {/* Detalles en grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                          {[
                            { label: 'Fecha Estimada',  value: t.estimatedDate || 'N/A' },
                            { label: 'Ubicación',       value: t.location || 'N/A' },
                            { label: 'Barco / Naviera', value: t.vessel || 'N/A' },
                            { label: 'Estado',          value: t.statusText || 'N/A' },
                          ].map(d => (
                            <div key={d.label} style={{
                              background: 'rgba(255,255,255,0.04)',
                              border: '1px solid rgba(255,255,255,0.07)',
                              borderRadius: 10, padding: '0.8rem 1rem'
                            }}>
                              <div style={{ color: '#6b7280', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
                                {d.label}
                              </div>
                              <div style={{ color: '#e5e7eb', fontWeight: 600, fontSize: '0.92rem' }}>{d.value}</div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div style={{ color: '#6b7280', marginBottom: '1.5rem', fontStyle: 'italic', fontSize: '0.9rem' }}>
                        Este cliente aún no tiene información de importación asignada.
                      </div>
                    )}

                    {/* Botón de editar */}
                    <button
                      onClick={() => handleEditTracking(user)}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        background: 'rgba(234,179,8,0.12)',
                        border: '1px solid rgba(234,179,8,0.4)',
                        color: '#eab308', padding: '0.65rem 1.4rem',
                        borderRadius: 10, cursor: 'pointer',
                        fontWeight: 700, fontSize: '0.9rem',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={e => { e.currentTarget.style.background = '#eab308'; e.currentTarget.style.color = '#000'; }}
                      onMouseOut={e => { e.currentTarget.style.background = 'rgba(234,179,8,0.12)'; e.currentTarget.style.color = '#eab308'; }}
                    >
                      <Edit3 size={16} />
                      {hasTrack ? 'Actualizar Tracking' : 'Asignar Tracking'}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TrackingManagement;
