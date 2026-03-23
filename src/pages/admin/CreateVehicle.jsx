import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ArrowLeft, CarFront, Tag, Settings, Fuel, Palette, FileText, Image as ImageIcon, Search } from 'lucide-react';
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
  steering: ''
};

const CreateVehicle = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormState);
  const [vehiculos, setVehiculos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVehicles = vehiculos.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        // Ordenamos los creados más reciente primero usando el ID (normalmente numérico o timestamp si lo creamos)
        setVehiculos(data.reverse());
      }
    } catch (error) {
      console.error("Error fetching admin vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Validar price o year si quieres forzar numeros
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones
    const requiredFields = ['name', 'motor', 'type', 'year', 'price', 'mileage', 'summary', 'image'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        Swal.fire({
          ...darkSwal,
          icon: 'warning',
          title: 'Campo vacío',
          text: `Asegúrate de rellenar toda la información, incluyendo la imagen y el resumen.`
        });
        return;
      }
    }

    const priceNum = Number(formData.price);
    const yearNum = Number(formData.year);

    if (priceNum <= 0 || yearNum <= 0) {
      Swal.fire({
        ...darkSwal,
        icon: 'error',
        title: 'Valores inválidos',
        text: 'Precio y Año deben ser mayores a cero.'
      });
      return;
    }

    const cleanData = {
      ...formData,
      price: priceNum,
      year: yearNum
    };

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
          Swal.fire({ ...darkSwal, icon: 'success', title: '¡Actualizado!', text: 'Vehículo modificado en el catálogo.', timer: 1500, showConfirmButton: false });
          setIsEditing(false);
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
          Swal.fire({ ...darkSwal, icon: 'success', title: '¡Publicado!', text: 'Nuevo vehículo publicado en el catálogo.', timer: 1500, showConfirmButton: false });
        }
      }
      setFormData(initialFormState);
      if(document.getElementById('admin-image-upload')) {
          document.getElementById('admin-image-upload').value = '';
      }
    } catch (error) {
      Swal.fire({ ...darkSwal, icon: 'error', title: 'Error de servidor', text: 'No se pudo guardar la publicación.' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (vehiculo) => {
    setIsEditing(true);
    setFormData({
      ...vehiculo,
      price: String(vehiculo.price),
      year: String(vehiculo.year)
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const confirmDelete = (vehiculo) => {
    Swal.fire({
      ...darkSwal,
      icon: 'warning',
      title: 'Eliminar del catálogo',
      text: `¿Borrar definitivamente a ${vehiculo.name}?`,
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#e63946'
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
        setVehiculos(vehiculos.filter(v => v.id !== id));
        Swal.fire({ ...darkSwal, icon: 'success', title: 'Eliminado', timer: 1000, showConfirmButton: false });
      }
    } catch (error) {
      Swal.fire({ ...darkSwal, icon: 'error', title: 'Error', text: 'No se pudo eliminar de la base de datos.' });
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header" style={{ marginTop: '0.5rem', marginBottom: '2rem' }}>
        <h1 className="admin-title">Gestión de Catálogo SAVS</h1>
        <p className="admin-subtitle">Añade nuevos vehículos oficiales o edita la información y fotos del inventario existente.</p>
      </div>

      <div className="vender-auto-layout" style={{ gap: '3rem' }}>
        
        {/* Lado izquierdo: Editor / Formulario */}
        <div className="vender-auto-form-section" style={{ flex: '1.2' }}>
          <div className="form-card-glow" style={{ padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', color: '#fff' }}>
              {isEditing ? 'Modificando Vehículo' : 'Crear Nueva Publicación'}
            </h2>
            
            <form className="vender-auto-form" onSubmit={handleSubmit}>
              
              <div className="form-group">
                <label><CarFront size={14} style={{ display: 'inline', marginRight: '6px' }}/> Nombre del Automóvil</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Ej. Hyundai Tucson Limousine" />
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label><Settings size={14} style={{ display: 'inline', marginRight: '6px' }}/> Motor y Capacidad</label>
                  <input type="text" name="motor" value={formData.motor} onChange={handleInputChange} placeholder="Ej. 2000cc Diésel" />
                </div>
                <div className="form-group">
                  <label>Tipo de Carrocería</label>
                  <input type="text" name="type" value={formData.type} onChange={handleInputChange} placeholder="Ej. SUV 4x4" />
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label>Cilindraje</label>
                  <input type="text" name="engine_size" value={formData.engine_size} onChange={handleInputChange} placeholder="Ej. 2000cc" />
                </div>
                <div className="form-group">
                  <label>Puertas</label>
                  <input type="text" inputMode="numeric" name="doors" value={formData.doors} onChange={handleInputChange} placeholder="Ej. 5" />
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label>Tracción</label>
                  <input type="text" name="drive" value={formData.drive} onChange={handleInputChange} placeholder="Ej. 4x4 o FWD" />
                </div>
                <div className="form-group">
                  <label>Pasajeros</label>
                  <input type="text" inputMode="numeric" name="passengers" value={formData.passengers} onChange={handleInputChange} placeholder="Ej. 5" />
                </div>
              </div>

              <div className="form-group">
                <label>Dirección</label>
                <input type="text" name="steering" value={formData.steering} onChange={handleInputChange} placeholder="Ej. Hidráulica / Eléctrica" />
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label>Año</label>
                  <input type="text" inputMode="numeric" name="year" value={formData.year} onChange={handleInputChange} placeholder="Ej. 2018" />
                </div>
                <div className="form-group">
                  <label>Precio (CRC)</label>
                  <input type="text" inputMode="numeric" name="price" value={formData.price} onChange={handleInputChange} placeholder="Ej. 13500000" />
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label>Transmisión</label>
                  <select name="transmission" value={formData.transmission} onChange={handleInputChange} className="admin-select">
                    <option value="Automática">Automática</option>
                    <option value="Manual">Manual</option>
                    <option value="Dual / Shiftronic">Dual / Shiftronic</option>
                  </select>
                </div>
                <div className="form-group">
                  <label><Fuel size={14} style={{ display: 'inline', marginRight: '6px' }}/> Combustible</label>
                  <select name="fuel" value={formData.fuel} onChange={handleInputChange} className="admin-select">
                    <option value="Diésel">Diésel</option>
                    <option value="Gasolina">Gasolina</option>
                    <option value="Eléctrico">Eléctrico</option>
                    <option value="Híbrido">Híbrido</option>
                  </select>
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label>Kilometraje (Libre)</label>
                  <input type="text" name="mileage" value={formData.mileage} onChange={handleInputChange} placeholder="Ej. 68,000 km o 0km (Importar)" />
                </div>
                <div className="form-group">
                  <label><Palette size={14} style={{ display: 'inline', marginRight: '6px' }}/> Color Exterior</label>
                  <input type="text" name="color" value={formData.color} onChange={handleInputChange} placeholder="Ej. Blanco Perla" />
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label><Tag size={14} style={{ display: 'inline', margin: '0 6px 0 0' }}/> Etiqueta Principal</label>
                  <input type="text" name="tag" value={formData.tag} onChange={handleInputChange} placeholder="Ej. Saliendo de Corea" />
                </div>
                <div className="form-group">
                  <label>Color Etiqueta</label>
                  <select name="tagColor" value={formData.tagColor} onChange={handleInputChange} className="admin-select">
                    <option value="#10b981">Verde (Stock/Disponible)</option>
                    <option value="#ef4444">Rojo (Oferta/Vendido)</option>
                    <option value="#3b82f6">Azul (En tránsito)</option>
                    <option value="#eab308">Dorado (Premium)</option>
                    <option value="#6b7280">Gris (Agotado)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label><FileText size={14} style={{ display: 'inline', margin: '0 6px 0 0' }}/> Resumen / Venta</label>
                <textarea 
                  name="summary" 
                  value={formData.summary} 
                  onChange={handleInputChange} 
                  placeholder="Escribe la reseña descriptiva del auto, por qué es único, qué incluye..." 
                  rows="5"
                  style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px', padding: '1rem', width: '100%', resize: 'vertical' }}
                />
              </div>

              <div className="form-group">
                <label><ImageIcon size={14} style={{ display: 'inline', margin: '0 6px 0 0' }}/> Imagen del Vehículo</label>
                <div className="file-upload-wrapper" style={{ border: '2px dashed rgba(234, 179, 8, 0.3)', borderRadius: '12px', padding: '1rem', textAlign: 'center' }}>
                  <input type="file" id="admin-image-upload" accept="image/*" onChange={handleImageChange} className="file-upload-input" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, opacity: 0, cursor: 'pointer' }} />
                  <div className="file-upload-custom" style={{ color: formData.image ? '#10b981' : '#eab308' }}>
                    {formData.image ? 'Imagen guardada correctamente. Haz clic si deseas reemplazarla.' : 'Sube una foto (.PNG o .JPG)'}
                  </div>
                </div>
                {formData.image && (
                  <div className="image-preview" style={{ marginTop: '1rem', borderRadius: '12px', overflow: 'hidden' }}>
                    <img src={formData.image} alt="Previsualización" style={{ width: '100%', height: 'auto', display: 'block' }} />
                  </div>
                )}
              </div>

              <div className="form-actions" style={{ marginTop: '2rem' }}>
                {isEditing && (
                  <button type="button" className="btn-cancel" onClick={() => { setIsEditing(false); setFormData(initialFormState); }}>
                    Cancelar Edición
                  </button>
                )}
                <button type="submit" className="btn-submit" disabled={loading} style={{ background: '#eab308', color: '#000', border: 'none', padding: '1rem 2rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', flex: 1 }}>
                  {loading ? 'Subiendo...' : (isEditing ? 'Guardar Cambios Oficiales' : '✅ Publicar en Catálogo')}
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Lado derecho: Catálogo */}
        <div className="vender-auto-list-section" style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '1rem' }}>Vehículos Publicados ({vehiculos.length})</h2>
          
          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            <input 
              type="text" 
              placeholder="Buscar vehículo..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', background: '#111', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff', borderRadius: '8px', fontSize: '0.95rem' }}
            />
          </div>

          {loading && vehiculos.length === 0 ? (
             <p style={{ color: '#9ca3af' }}>Cargando catálogo...</p>
          ) : filteredVehicles.length === 0 ? (
            <div className="empty-state" style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', padding: '3rem 2rem', borderRadius: '16px', textAlign: 'center' }}>
              <p style={{ color: '#9ca3af' }}>{vehiculos.length === 0 ? 'No hay vehículos publicados.' : 'No se encontraron resultados.'}</p>
            </div>
          ) : (
            <div className="vehiculos-list admin-scrollable-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '750px', overflowY: 'auto', paddingRight: '12px' }}>
              {filteredVehicles.map(vehiculo => (
                <div key={vehiculo.id} className="vehiculo-card" style={{ background: '#111', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', overflow: 'hidden' }}>
                  
                  <div className="vehiculo-card-image" style={{ width: '140px', background: '#000', flexShrink: 0 }}>
                    <img src={vehiculo.image} alt={vehiculo.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {vehiculo.tag && (
                      <span style={{ position: 'absolute', top: '8px', left: '8px', background: vehiculo.tagColor || '#10b981', color: '#fff', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>
                        {vehiculo.tag}
                      </span>
                    )}
                  </div>
                  
                  <div className="vehiculo-card-content" style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ margin: '0 0 0.2rem 0', fontSize: '1rem', color: '#fff' }}>{vehiculo.name}</h3>
                    <p style={{ color: '#eab308', margin: '0 0 0.5rem 0', fontSize: '0.9rem', fontWeight: 'bold' }}>₡{Number(vehiculo.price).toLocaleString()}</p>
                    
                    <small style={{ color: '#9ca3af', marginBottom: 'auto' }}>{vehiculo.year} • {vehiculo.type}</small>
                    
                    <div className="vehiculo-actions" style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                      <button className="btn-edit" onClick={() => handleEdit(vehiculo)} style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', flex: 1, fontSize: '0.85rem' }}>Editar</button>
                      <button className="btn-delete" onClick={() => confirmDelete(vehiculo)} style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', flex: 1, fontSize: '0.85rem' }}>Eliminar</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default CreateVehicle;
