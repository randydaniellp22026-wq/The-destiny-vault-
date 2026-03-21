import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './DiseñoClienteVendeSuAuto.css';

const darkSwal = {
  background: '#141414',
  color: '#fff',
  confirmButtonColor: '#f5b400'
};

const API_URL = 'http://127.0.0.1:5000/sale_requests';

const initialFormState = {
  id: null,
  marca: '',
  modelo: '',
  anio: '',
  precio: '',
  kilometraje: '',
  descripcion: '',
  imagen: null,
  estado: 'Pendiente',
  userId: null
};

const ClienteVendeSuAuto = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormState);
  const [vehiculos, setVehiculos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Cargar datos del usuario y sus solicitudes
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      Swal.fire({
        ...darkSwal,
        icon: 'warning',
        title: 'Acceso Denegado',
        text: 'Por favor inicia sesión para poder vender tu auto.',
      }).then(() => {
        navigate('/login');
      });
      return;
    }
    
    const user = JSON.parse(savedUser);
    setUserId(user.id);
    fetchUserVehicles(user.id);
  }, [navigate]);

  const fetchUserVehicles = async (uid) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?userId=${uid}`);
      if (response.ok) {
        const data = await response.json();
        // Asegurarnos de que los datos numéricos lleguen como números
        const formattedData = data.map(v => ({
          ...v,
          precio: Number(v.precio),
          kilometraje: Number(v.kilometraje),
          anio: Number(v.anio)
        }));
        setVehiculos(formattedData);
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // 1. Bloqueo total de cualquier signo menos "-" en todos los campos
    const valueWithoutMinuses = value.replace(/-/g, '');

    // 2. Para campos numéricos, forzar solo dígitos positivos
    if (name === 'precio' || name === 'kilometraje' || name === 'anio') {
      const cleanValue = valueWithoutMinuses.replace(/\D/g, '');
      // Evitar ceros a la izquierda innecesarios
      const finalValue = cleanValue === "" ? "" : parseInt(cleanValue, 10).toString();
      setFormData({
        ...formData,
        [name]: finalValue
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: valueWithoutMinuses
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({
          ...formData,
          imagen: event.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones de espacios en blanco, valores vacíos y signos menos
    const camposTexto = ['marca', 'modelo', 'descripcion'];
    for (const campo of camposTexto) {
      const valor = formData[campo] ? formData[campo].toString() : "";
      if (valor.trim().length === 0) {
        Swal.fire({
          ...darkSwal,
          icon: 'error',
          title: 'Campo inválido',
          text: `El campo ${campo} no puede estar vacío.`
        });
        return;
      }
      if (valor.includes('-')) {
        Swal.fire({
          ...darkSwal,
          icon: 'error',
          title: 'Carácter no permitido',
          text: `El signo menos (-) no está permitido en el campo ${campo}.`
        });
        return;
      }
    }

    // Validaciones de números (no negativos)
    const precioNum = Number(formData.precio);
    const kmNum = Number(formData.kilometraje);
    const anioNum = Number(formData.anio);

    if (precioNum <= 0 || kmNum < 0 || anioNum <= 0) {
      Swal.fire({
        ...darkSwal,
        icon: 'error',
        title: 'Valores inválidos',
        text: 'Los valores de precio, kilometraje y año deben ser válidos y no negativos.'
      });
      return;
    }

    if (!formData.imagen) {
      Swal.fire({
        ...darkSwal,
        icon: 'warning',
        title: 'Falta imagen',
        text: 'Por favor, selecciona al menos una imagen de tu vehículo.'
      });
      return;
    }

    // Limpiar datos antes de enviar
    const cleanData = {
      ...formData,
      marca: formData.marca.trim(),
      modelo: formData.modelo.trim(),
      descripcion: formData.descripcion.trim(),
      precio: precioNum,
      kilometraje: kmNum,
      anio: anioNum,
      userId
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
          Swal.fire({
            icon: 'success',
            title: '¡Actualizado!',
            text: 'Tu solicitud ha sido modificada con éxito.',
            background: '#141414',
            color: '#fff',
            confirmButtonColor: '#f5b400'
          });
          setIsEditing(false);
        }
      } else {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...cleanData, id: String(Date.now()), estado: 'Pendiente' })
        });
        
        if (response.ok) {
          const newRequest = await response.json();
          setVehiculos([newRequest, ...vehiculos]);
          Swal.fire({
            icon: 'success',
            title: '¡Enviado!',
            text: 'Tu solicitud ha sido registrada correctamente.',
            background: '#141414',
            color: '#fff',
            confirmButtonColor: '#f5b400'
          });
        }
      }
      setFormData(initialFormState);
      if(document.getElementById('imagen-upload')) {
          document.getElementById('imagen-upload').value = '';
      }
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo conectar con el servidor.', background: '#141414', color: '#fff' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (vehiculo) => {
    setIsEditing(true);
    setFormData(vehiculo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const confirmDelete = (vehiculo) => {
    Swal.fire({
      ...darkSwal,
      icon: 'warning',
      title: '¿Estás seguro?',
      text: `Se eliminará la solicitud de venta para: ${vehiculo.marca} ${vehiculo.modelo}. Esta acción no se puede deshacer.`,
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
        Swal.fire({
          ...darkSwal,
          icon: 'success',
          title: 'Eliminado',
          timer: 1500,
          showConfirmButton: false
        });
      }
    } catch (error) {
      Swal.fire({ ...darkSwal, icon: 'error', title: 'Error', text: 'No se pudo eliminar.' });
    }
  };

  const getStatusColor = (estado) => {
    switch (estado) {
      case 'Pendiente': return 'status-pendiente';
      case 'En revisión': return 'status-revision';
      case 'Aprobado': return 'status-aprobado';
      case 'Rechazado': return 'status-rechazado';
      default: return 'status-pendiente';
    }
  };

  return (
    <div className="vender-auto-container">
      <div className="vender-auto-header">
        <h1>Vender mi auto</h1>
        <p>Gestiona las solicitudes de venta de tus vehículos a nuestra plataforma.</p>
      </div>

      <div className="vender-auto-layout">
        {/* Panel Izquierdo: Formulario */}
        <div className="vender-auto-form-section">
          <div className="form-card-glow">
            <h2>{isEditing ? 'Editar Solicitud' : 'Nueva Solicitud de Venta'}</h2>
            <form className="vender-auto-form" onSubmit={handleSubmit}>
              
              <div className="form-group-row">
                <div className="form-group">
                  <label>Marca</label>
                  <input type="text" name="marca" value={formData.marca} onChange={handleInputChange} required placeholder="Ej. BMW" />
                </div>
                <div className="form-group">
                  <label>Modelo</label>
                  <input type="text" name="modelo" value={formData.modelo} onChange={handleInputChange} required placeholder="Ej. M4 Competition" />
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label>Año</label>
                  <input 
                    type="text" 
                    inputMode="numeric"
                    name="anio" 
                    value={formData.anio} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Ej. 2023" 
                  />
                </div>
                <div className="form-group">
                  <label>Kilometraje</label>
                  <input 
                    type="text" 
                    inputMode="numeric"
                    name="kilometraje" 
                    value={formData.kilometraje} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Ej. 15000" 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Precio esperado (CRC)</label>
                <input 
                  type="text" 
                  inputMode="numeric"
                  name="precio" 
                  value={formData.precio} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="Ej. 15000000" 
                />
              </div>

              <div className="form-group">
                <label>Descripción y Estado del Vehículo</label>
                <textarea name="descripcion" value={formData.descripcion} onChange={handleInputChange} required placeholder="Detalla las condiciones generales, historial de servicios..." rows="4"></textarea>
              </div>

              <div className="form-group">
                <label>Imágenes del vehículo</label>
                <div className="file-upload-wrapper">
                  <input type="file" id="imagen-upload" accept="image/*" onChange={handleImageChange} className="file-upload-input" />
                  <div className="file-upload-custom">
                    {formData.imagen ? 'Imagen cargada con éxito' : 'Selecciona una imagen'}
                  </div>
                </div>
                {formData.imagen && (
                  <div className="image-preview">
                    <img src={formData.imagen} alt="Vista previa" />
                  </div>
                )}
              </div>

              <div className="form-actions">
                {isEditing && (
                  <button type="button" className="btn-cancel" onClick={() => { setIsEditing(false); setFormData(initialFormState); }}>
                    Cancelar
                  </button>
                )}
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Procesando...' : (isEditing ? 'Guardar Cambios' : 'Enviar solicitud')}
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Panel Derecho: Lista de Autos */}
        <div className="vender-auto-list-section">
          <h2>Mis Solicitudes ({vehiculos.length})</h2>
          
          {loading && vehiculos.length === 0 ? (
             <div className="loading-req">Cargando solicitudes...</div>
          ) : vehiculos.length === 0 ? (
            <div className="empty-state">
              <p>No tienes vehículos registrados para la venta.</p>
              <span>Completa el formulario para enviar tu primera solicitud.</span>
            </div>
          ) : (
            <div className="vehiculos-list">
              {vehiculos.map(vehiculo => (
                <div key={vehiculo.id} className="vehiculo-card">
                  <div className="vehiculo-card-image">
                    {vehiculo.imagen ? (
                      <img src={vehiculo.imagen} alt={`${vehiculo.marca} ${vehiculo.modelo}`} />
                    ) : (
                      <div className="no-image">Sin imagen</div>
                    )}
                    <span className={`status-badge ${getStatusColor(vehiculo.estado)}`}>
                      {vehiculo.estado}
                    </span>
                  </div>
                  
                  <div className="vehiculo-card-content">
                    <h3>{vehiculo.marca} {vehiculo.modelo} <span>{vehiculo.anio}</span></h3>
                    <p className="vehiculo-price">₡{Number(vehiculo.precio).toLocaleString()}</p>
                    
                    <div className="vehiculo-details">
                      <span><strong>KM:</strong> {Number(vehiculo.kilometraje).toLocaleString()}</span>
                    </div>
                    
                    <p className="vehiculo-desc">{vehiculo.descripcion}</p>
                    
                    <div className="vehiculo-actions">
                      <button className="btn-edit" onClick={() => handleEdit(vehiculo)}>Editar</button>
                      <button className="btn-delete" onClick={() => confirmDelete(vehiculo)}>Eliminar</button>
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

export default ClienteVendeSuAuto;
