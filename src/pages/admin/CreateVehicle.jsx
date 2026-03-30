import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { 
  ArrowLeft, 
  CarFront, 
  Tag, 
  Settings, 
  Fuel, 
  Palette, 
  FileText, 
  Image as ImageIcon, 
  Search,
  Trash2,
  Edit,
  Plus,
  RefreshCcw,
  CheckCircle,
  XCircle
} from 'lucide-react';
import './Admin.css';

const darkSwal = {
  background: '#141414',
  color: '#fff',
  confirmButtonColor: '#eab308',
  cancelButtonColor: '#333'
};

const API_URL = 'http://localhost:5000/vehicles';

const initialFormState = {
  id: '',
  name: '',
  motor: '',
  type: '',
  year: '',
  mileage: '',
  price: '',
  tag: 'Disponible',
  tagColor: '#10b981',
  transmission: 'Automática',
  fuel: 'Gasolina',
  color: '',
  image: '',
  summary: '',
  engine_size: '',
  doors: '',
  drive: '',
  passengers: '',
  steering: '',
  detailImages: []
};

const CreateVehicle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState(initialFormState);
  const [vehiculos, setVehiculos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [detailImagesDraft, setDetailImagesDraft] = useState([]);

  const filteredVehicles = vehiculos.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    // Manejar parámetro de edición desde el dashboard
    const params = new URLSearchParams(location.search);
    const editId = params.get('edit');
    if (editId && vehiculos.length > 0) {
      const v = vehiculos.find(car => car.id === editId);
      if (v) handleEdit(v);
    }
  }, [location.search, vehiculos]);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setVehiculos(data.slice().reverse());
      }
    } catch (error) {
      console.error("Error fetching admin vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price' || name === 'year') {
      const cleanValue = value.replace(/[^0-9]/g, '');
      setFormData({ ...formData, [name]: cleanValue });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({ ...formData, image: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDetailImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const readers = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (ev) => resolve(ev.target.result);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then(results => {
      setDetailImagesDraft(prev => [...prev, ...results]);
    });
    // Reset input so same files can be re-added if needed
    e.target.value = '';
  };

  const removeDetailImage = (index) => {
    setDetailImagesDraft(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ['name', 'motor', 'type', 'year', 'price', 'mileage', 'summary', 'image'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        Swal.fire({
          ...darkSwal,
          icon: 'warning',
          title: 'Campo incompleto',
          text: `El campo ${field} es obligatorio.`
        });
        return;
      }
    }
    // Merge detailImages draft into formData
    const mergedDetailImages = detailImagesDraft.length > 0 ? detailImagesDraft : (formData.detailImages || []);

    const priceNum = Number(formData.price);
    const yearNum = Number(formData.year);

    const cleanData = { ...formData, price: priceNum, year: yearNum, detailImages: mergedDetailImages };

    setLoading(true);
    try {
      if (isEditing) {
        const response = await fetch(`${API_URL}/${cleanData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cleanData)
        });
        if (response.ok) {
          const updated = await response.json();
          setVehiculos(vehiculos.map(v => v.id === updated.id ? updated : v));
          Swal.fire({ ...darkSwal, icon: 'success', title: '¡Actualizado!', timer: 1500, showConfirmButton: false });
          setIsEditing(false);
          setFormData(initialFormState);
          setDetailImagesDraft([]);
        }
      } else {
        const payload = { ...cleanData, id: String(Date.now()) };
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (response.ok) {
          const newCar = await response.json();
          setVehiculos([newCar, ...vehiculos]);
          Swal.fire({ ...darkSwal, icon: 'success', title: '¡Publicado!', timer: 1500, showConfirmButton: false });
          setFormData(initialFormState);
          setDetailImagesDraft([]);
        }
      }
    } catch (error) {
      Swal.fire({ ...darkSwal, icon: 'error', title: 'Error', text: 'No se pudo guardar.' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (vehiculo) => {
    setIsEditing(true);
    setFormData({
      ...vehiculo,
      price: String(vehiculo.price),
      year: String(vehiculo.year),
      detailImages: vehiculo.detailImages || []
    });
    setDetailImagesDraft(vehiculo.detailImages || []);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const confirmDelete = (vehiculo) => {
    Swal.fire({
      ...darkSwal,
      icon: 'warning',
      title: '¿Eliminar vehículo?',
      text: `Esta acción borrará definitivamente el ${vehiculo.name} del catálogo.`,
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ef4444'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(vehiculo.id);
      }
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setVehiculos(prev => prev.filter(v => v.id !== id));
        Swal.fire({ ...darkSwal, icon: 'success', title: 'Eliminado', timer: 1000, showConfirmButton: false });
      }
    } catch (error) {
      Swal.fire({ ...darkSwal, icon: 'error', title: 'Error al eliminar' });
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="admin-title">Gestión de Inventario SAVS</h1>
            <p className="admin-subtitle">Administra el catálogo de vehículos: añade, edita o elimina unidades.</p>
          </div>
          <button 
            onClick={() => { setIsEditing(false); setFormData(initialFormState); }}
            style={{ 
              background: 'rgba(234, 179, 8, 0.1)', 
              color: '#eab308', 
              border: '1px solid rgba(234, 179, 8, 0.2)', 
              padding: '0.8rem 1.5rem', 
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <Plus size={18} /> Nuevo Registro
          </button>
        </div>
      </div>

      <div className="vender-auto-layout" style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start' }}>
        
        {/* Lado izquierdo: Editor */}
        <div className="vender-auto-form-section" style={{ flex: '1.4' }}>
          <div className="form-card-glow" style={{ padding: '2.2rem', background: 'rgba(20,20,20,0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '1.8rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              {isEditing ? <Edit size={22} style={{ color: '#3b82f6' }} /> : <Plus size={22} style={{ color: '#eab308' }} />}
              {isEditing ? 'Editando Especificaciones' : 'Detalles del Nuevo Vehículo'}
            </h2>
            
            <form className="vender-auto-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label><CarFront size={14} /> Marca y Modelo</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Hyundai Tucson..." />
              </div>

              <div className="form-group-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label><Settings size={14} /> Motor / Cilindrada</label>
                  <input type="text" name="motor" value={formData.motor} onChange={handleInputChange} placeholder="2000cc" />
                </div>
                <div className="form-group">
                  <label>Estilo</label>
                  <input type="text" name="type" value={formData.type} onChange={handleInputChange} placeholder="SUV, Sedán..." />
                </div>
              </div>

              <div className="form-group-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Año</label>
                  <input type="text" inputMode="numeric" name="year" value={formData.year} onChange={handleInputChange} placeholder="2024" />
                </div>
                <div className="form-group">
                  <label>Precio Final (CRC)</label>
                  <input type="text" inputMode="numeric" name="price" value={formData.price} onChange={handleInputChange} placeholder="Ej: 15000000" />
                </div>
              </div>

              <div className="form-group-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Transmisión</label>
                  <select name="transmission" value={formData.transmission} onChange={handleInputChange} className="admin-select" style={{ width: '100%', padding: '0.8rem', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '8px' }}>
                    <option value="Automática">Automática</option>
                    <option value="Manual">Manual</option>
                    <option value="Dual">Dual</option>
                  </select>
                </div>
                <div className="form-group">
                  <label><Fuel size={14} /> Combustible</label>
                  <select name="fuel" value={formData.fuel} onChange={handleInputChange} className="admin-select" style={{ width: '100%', padding: '0.8rem', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '8px' }}>
                    <option value="Diésel">Diésel</option>
                    <option value="Gasolina">Gasolina</option>
                    <option value="Eléctrico">Eléctrico</option>
                    <option value="Híbrido">Híbrido</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label><FileText size={14} /> Descripción de Venta</label>
                <textarea 
                  name="summary" 
                  value={formData.summary} 
                  onChange={handleInputChange} 
                  rows="4"
                  style={{ width: '100%', padding: '1rem', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '8px', resize: 'vertical' }}
                />
              </div>

              <div className="form-group">
                <label><ImageIcon size={14} /> Fotografía Principal</label>
                <div style={{ position: 'relative', border: '2px dashed #333', borderRadius: '15px', padding: '2rem', textAlign: 'center' }}>
                  <input type="file" accept="image/*" onChange={handleImageChange} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                  {formData.image ? (
                    <img src={formData.image} alt="Upload" style={{ maxHeight: '150px', borderRadius: '10px' }} />
                  ) : (
                    <div style={{ color: '#6b7280' }}>
                      <ImageIcon size={32} style={{ marginBottom: '10px', opacity: 0.5 }} />
                      <p>Arrastra o selecciona una imagen</p>
                    </div>
                  )}
                </div>
              </div>

              {/* ── Galería de Detalles del Vehículo ── */}
              <div className="form-group" style={{ marginTop: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.8rem' }}>
                  <ImageIcon size={14} />
                  Galería de Detalles
                  <span style={{ color: '#6b7280', fontWeight: 400, fontSize: '0.8rem' }}>(opcional — se muestran en el carrusel de la página de detalles)</span>
                </label>

                {/* Zona de carga de múltiples imágenes */}
                <label
                  htmlFor="detail-images-input"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    border: '2px dashed rgba(234,179,8,0.35)',
                    borderRadius: '15px',
                    padding: '1.8rem',
                    cursor: 'pointer',
                    background: 'rgba(234,179,8,0.04)',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(234,179,8,0.09)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(234,179,8,0.04)'}
                >
                  <ImageIcon size={28} style={{ color: '#eab308', opacity: 0.7 }} />
                  <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Seleccionar imágenes de detalle</span>
                  <span style={{ color: '#6b7280', fontSize: '0.78rem' }}>JPG, PNG, WEBP — puedes seleccionar varias a la vez</span>
                  <input
                    id="detail-images-input"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleDetailImagesChange}
                    style={{ display: 'none' }}
                  />
                </label>

                {/* Vista previa de imágenes cargadas */}
                {detailImagesDraft.length > 0 && (
                  <div style={{ marginTop: '1.2rem' }}>
                    <p style={{ color: '#9ca3af', fontSize: '0.82rem', marginBottom: '0.8rem' }}>
                      {detailImagesDraft.length} imagen{detailImagesDraft.length !== 1 ? 'es' : ''} añadida{detailImagesDraft.length !== 1 ? 's' : ''} — haz clic en la ✕ para eliminar
                    </p>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                      gap: '0.8rem'
                    }}>
                      {detailImagesDraft.map((src, idx) => (
                        <div
                          key={idx}
                          style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', aspectRatio: '4/3' }}
                        >
                          <img
                            src={src}
                            alt={`Detalle ${idx + 1}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />
                          <button
                            type="button"
                            onClick={() => removeDetailImage(idx)}
                            title="Eliminar imagen"
                            style={{
                              position: 'absolute',
                              top: '4px',
                              right: '4px',
                              background: 'rgba(239,68,68,0.85)',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '50%',
                              width: '22px',
                              height: '22px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '13px',
                              cursor: 'pointer',
                              lineHeight: 1
                            }}
                          >
                            ✕
                          </button>
                          <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: 'rgba(0,0,0,0.55)',
                            color: '#9ca3af',
                            fontSize: '0.68rem',
                            textAlign: 'center',
                            padding: '2px 0'
                          }}>
                            #{idx + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button type="submit" disabled={loading} style={{ 
                width: '100%', 
                marginTop: '1.5rem',
                background: isEditing ? '#3b82f6' : '#eab308', 
                color: isEditing ? '#fff' : '#000', 
                padding: '1.1rem', 
                borderRadius: '12px', 
                fontWeight: 'bold', 
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                {loading ? 'Procesando...' : (isEditing ? <><CheckCircle size={20}/> Guardar Cambios</> : <><Plus size={20}/> Publicar Vehículo</>)}
              </button>
            </form>
          </div>
        </div>

        {/* Lado derecho: Lista */}
        <div className="vender-auto-list-section" style={{ flex: '1' }}>
          <div style={{ marginBottom: '1.5rem' }}>
             <h2 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '1rem' }}>Inventario Actual ({vehiculos.length})</h2>
             <div style={{ position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#4b5563' }} />
                <input 
                  type="text" 
                  placeholder="Filtrar por nombre..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid #222', borderRadius: '12px', color: '#fff' }}
                />
             </div>
          </div>

          <div className="admin-scrollable-list" style={{ display: 'grid', gap: '1rem', maxHeight: '800px', overflowY: 'auto', paddingRight: '8px' }}>
            {filteredVehicles.map(v => (
              <div key={v.id} style={{ 
                background: 'rgba(255,255,255,0.02)', 
                borderRadius: '16px', 
                border: '1px solid rgba(255,255,255,0.05)',
                padding: '1rem',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center'
              }}>
                <img src={v.image} alt="" style={{ width: '80px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ color: '#fff', fontSize: '0.95rem', margin: 0 }}>{v.name}</h4>
                  <p style={{ color: '#eab308', fontSize: '0.85rem', margin: '2px 0' }}>₡{Number(v.price).toLocaleString()}</p>
                  <small style={{ color: '#4b5563' }}>{v.year} • {v.fuel}</small>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button onClick={() => handleEdit(v)} style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}><Edit size={16}/></button>
                  <button onClick={() => confirmDelete(v)} style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}><Trash2 size={16}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateVehicle;
