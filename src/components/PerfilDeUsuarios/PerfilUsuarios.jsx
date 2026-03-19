import React, { useState } from 'react';
import './PerfilUsuarios.css';
import Swal from 'sweetalert2';
import dbData from '../../../db.json';
import {
  Bell,
  User,
  LayoutDashboard,
  Heart,
  Search,
  Ship,
  Settings,
  BadgeCheck,
  Check,
  Clock,
  MapPin,
  Mail,
  Phone,
  Plus,
  Edit2
} from 'lucide-react';

function PerfilUsuarios() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  
  const [userInfo, setUserInfo] = useState({
    name: 'Alejandro Silva',
    role: 'Cliente Premium',
    email: 'alejandro.silva@vip.com',
    phone: '+506 8888 8888',
    location: 'San Mateo, Alajuela',
    image: ''
  });

  const [vehicles, setVehicles] = useState([
    {
      id: 6,
      name: 'Hyundai Tucson TGDi',
      image: 'https://importadorasavs.com/wp-content/uploads/2025/03/Hyundai-Tucson-2019-Special-1.png',
      year: '2019',
      specs: '1600cc T Diésel • 50,000 km',
      isFavorite: true,
      importStatus: 3
    },
    {
      id: 9,
      name: 'Chevrolet Trax T',
      image: 'https://importadorasavs.com/wp-content/uploads/2025/03/Chevrolet-Trax-2021-1.png',
      year: '2021',
      specs: '1400cc T Gasolina • 35,000 km',
      isFavorite: false,
      importStatus: 4
    }
  ]);

  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);

  const handleEditProfile = () => {
    Swal.fire({
      title: 'Editar Perfil',
      html: `
        <div style="margin-bottom: 10px; text-align: left;"><label style="font-size: 14px; color: #a0a0a0;">Email</label></div>
        <input id="swal-input1" type="email" class="swal2-input" placeholder="Email" value="${userInfo.email}" style="margin: 0 0 20px 0; width: 80%;">
        <div style="margin-bottom: 10px; text-align: left;"><label style="font-size: 14px; color: #a0a0a0;">Teléfono</label></div>
        <input id="swal-input2" type="text" class="swal2-input" placeholder="Solo números (ej. 88888888)" value="${userInfo.phone}" style="margin: 0 0 20px 0; width: 80%;">
        <div style="margin-bottom: 10px; text-align: left;"><label style="font-size: 14px; color: #a0a0a0;">Ubicación</label></div>
        <input id="swal-input3" class="swal2-input" placeholder="Ubicación" value="${userInfo.location}" style="margin: 0; width: 80%;">
      `,
      background: '#141414',
      color: '#fff',
      confirmButtonColor: '#f5b400',
      confirmButtonText: 'Guardar Cambios',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        const email = document.getElementById('swal-input1').value.trim();
        const phone = document.getElementById('swal-input2').value.trim();
        const location = document.getElementById('swal-input3').value.trim();

        // Validación de campos vacíos
        if (!email || !phone || !location) {
          Swal.showValidationMessage('Todos los campos son obligatorios y no pueden estar vacíos.');
          return false;
        }

        // Validación de correo electrónico (debe contener @)
        if (!email.includes('@')) {
          Swal.showValidationMessage('Por favor ingresa un correo válido que contenga un "@".');
          return false;
        }

        // Validación de teléfono (solo números, espacios, y opcionalmente un signo + al inicio para ladas)
        const phoneRegex = /^\+?[0-9\s]+$/;
        if (!phoneRegex.test(phone)) {
          Swal.showValidationMessage('El campo de teléfono solo debe contener números y espacios.');
          return false;
        }

        return { email, phone, location };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        setUserInfo({ ...userInfo, ...result.value });
        Swal.fire({
          icon: 'success',
          title: '¡Guardado!',
          text: 'Tu perfil ha sido actualizado.',
          background: '#141414',
          color: '#fff',
          confirmButtonColor: '#f5b400'
        });
      }
    });
  };

  const handleEditAvatar = () => {
    Swal.fire({
      title: 'Actualizar foto de perfil',
      html: `
        <div style="text-align: left; margin-bottom: 15px;">
          <span style="font-size: 14px; color: #a0a0a0;">Selecciona una imagen de tus archivos, galería o cámara:</span>
        </div>
        <input type="file" id="avatar-upload" accept="image/*" class="custom-file-upload">
      `,
      showCancelButton: true,
      confirmButtonText: 'Subir Foto',
      cancelButtonText: 'Cancelar',
      background: '#141414',
      color: '#fff',
      confirmButtonColor: '#f5b400',
      preConfirm: () => {
        const file = document.getElementById('avatar-upload').files[0];
        if (!file) {
          Swal.showValidationMessage('Por favor, selecciona una imagen primero (Archivos o Cámara).');
          return false;
        }
        return file;
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUserInfo({ ...userInfo, image: e.target.result });
          Swal.fire({
            icon: 'success',
            title: '¡Foto Actualizada!',
            background: '#141414',
            color: '#fff',
            confirmButtonColor: '#f5b400',
            timer: 1500,
            showConfirmButton: false
          });
        };
        reader.readAsDataURL(result.value);
      }
    });
  };

  const toggleFavorite = (id) => {
    setVehicles(vehicles.map(v => 
      v.id === id ? { ...v, isFavorite: !v.isFavorite } : v
    ));
  };

  const handleAddVehicle = () => {
    // Filtrar los vehículos que el usuario ya tiene en la colección para no mostrarlos repitiendo
    const availableVehicles = (dbData.vehicles || []).filter(
      dbCar => !vehicles.some(myCar => myCar.id === dbCar.id)
    );

    if (availableVehicles.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Colección Completa',
        text: 'Ya tienes todos los vehículos disponibles en el catálogo.',
        background: '#141414',
        color: '#fff',
        confirmButtonColor: '#f5b400'
      });
      return;
    }

    const inputOptions = {};
    availableVehicles.forEach(car => {
      inputOptions[car.id] = `${car.name} (${car.year}) - ₡${car.price.toLocaleString('es-CR')}`;
    });

    Swal.fire({
      title: 'Agregar Vehículo',
      text: 'Selecciona un vehículo del catálogo:',
      input: 'select',
      inputOptions: inputOptions,
      inputPlaceholder: 'Selecciona un vehículo...',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Seleccionar',
      background: '#141414',
      color: '#fff',
      confirmButtonColor: '#f5b400',
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value !== '') {
            resolve();
          } else {
            resolve('Debes seleccionar un vehículo para agregarlo.');
          }
        });
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedId = parseInt(result.value);
        const selectedCarDb = availableVehicles.find(c => c.id === selectedId);

        if (selectedCarDb) {
          const newV = {
            id: selectedCarDb.id,
            name: selectedCarDb.name,
            image: selectedCarDb.image,
            year: selectedCarDb.year.toString(),
            specs: `${selectedCarDb.motor} • ${selectedCarDb.mileage}`,
            isFavorite: false,
            importStatus: 1
          };
          setVehicles([...vehicles, newV]);
          Swal.fire({
            icon: 'success',
            title: '¡Añadido!',
            text: `El ${selectedCarDb.name} ha sido agregado a tu colección.`,
            background: '#141414',
            color: '#fff',
            confirmButtonColor: '#f5b400'
          });
        }
      }
    });
  };

  const displayedVehicles = activeTab === 'Favoritos' 
    ? vehicles.filter(v => v.isFavorite) 
    : vehicles;

  return (
    <div className="perfil-container">
      {/* 1. Navbar superior */}
      <nav className="perfil-navbar">
        <div className="navbar-logo">
          <span className="logo-text">DESTINY<span className="gold">VAULT</span></span>
        </div>
        <ul className="navbar-links">
          <li>Inicio</li>
          <li>Vehículos</li>
          <li>Servicios</li>
          <li className="active-link">Perfil</li>
        </ul>
        <div className="navbar-icons">
          <button className="icon-btn"><Bell size={20} /></button>
          <button className="icon-btn active-icon"><User size={20} /></button>
        </div>
      </nav>

      <div className="perfil-body">
        {/* 2. Sidebar */}
        <aside className="perfil-sidebar">
          <div className="sidebar-profile">
            <div 
              className="profile-img-container" 
              onClick={handleEditAvatar}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', overflow: 'hidden' }}
              title="Clic para cambiar foto de perfil"
            >
              {userInfo.image ? (
                <img src={userInfo.image} alt={userInfo.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <User size={48} color="#a0a0a0" />
              )}
            </div>
            <h3>{userInfo.name}</h3>
            <span className="profile-role">{userInfo.role}</span>
          </div>
          <ul className="sidebar-menu">
            <li className={activeTab === 'Dashboard' ? 'active' : ''} onClick={() => setActiveTab('Dashboard')}>
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </li>
            <li className={activeTab === 'Favoritos' ? 'active' : ''} onClick={() => setActiveTab('Favoritos')}>
              <Heart size={20} fill={activeTab === 'Favoritos' ? '#f5b400' : 'none'} color={activeTab === 'Favoritos' ? '#f5b400' : 'currentColor'} />
              <span>Favoritos</span>
            </li>
            <li className={activeTab === 'Búsquedas' ? 'active' : ''} onClick={() => setActiveTab('Búsquedas')}>
              <Search size={20} />
              <span>Búsquedas recientes</span>
            </li>
            <li className={activeTab === 'Estado' ? 'active' : ''} onClick={() => setActiveTab('Estado')}>
              <Ship size={20} />
              <span>Estado de importación</span>
            </li>
            <li className={activeTab === 'Configuración' ? 'active' : ''} onClick={() => setActiveTab('Configuración')}>
              <Settings size={20} />
              <span>Configuración</span>
            </li>
          </ul>
        </aside>

        {/* 3. Sección principal */}
        <main className="perfil-main">
          <header className="main-header">
            <div className="header-info">
              <h1>
                {userInfo.name}
                <BadgeCheck className="verified-badge" size={28} />
              </h1>
              <p className="subtitle">{userInfo.role} • {userInfo.location}</p>
            </div>
          </header>

          <div className="content-grid">
            <div className="left-column">
              {/* 4. Estado / actividad */}
              {(activeTab === 'Dashboard' || activeTab === 'Estado') && (
                <section className="status-section">
                  <h2>Estado de Importación: {selectedVehicle?.name || 'Ninguno'}</h2>
                  <div className="progress-container">
                    <div className={`progress-step ${selectedVehicle?.importStatus >= 1 ? 'completed' : ''}`}>
                      <div className="step-icon"><Check size={16} /></div>
                      <span>Compra realizada</span>
                    </div>
                    <div className={`progress-line ${selectedVehicle?.importStatus > 1 ? 'completed' : (selectedVehicle?.importStatus === 1 ? 'active' : '')}`}></div>
                    
                    <div className={`progress-step ${selectedVehicle?.importStatus >= 2 ? (selectedVehicle?.importStatus === 2 ? 'active' : 'completed') : ''}`}>
                      <div className="step-icon"><Check size={16} /></div>
                      <span>En tránsito</span>
                    </div>
                    <div className={`progress-line ${selectedVehicle?.importStatus > 2 ? 'completed' : (selectedVehicle?.importStatus === 2 ? 'active' : '')}`}></div>
                    
                    <div className={`progress-step ${selectedVehicle?.importStatus >= 3 ? (selectedVehicle?.importStatus === 3 ? 'active' : 'completed') : ''}`}>
                      <div className="step-icon"><Clock size={16} /></div>
                      <span>En aduanas</span>
                    </div>
                    <div className={`progress-line ${selectedVehicle?.importStatus > 3 ? 'completed' : (selectedVehicle?.importStatus === 3 ? 'active' : '')}`}></div>
                    
                    <div className={`progress-step ${selectedVehicle?.importStatus >= 4 ? 'completed active' : ''}`}>
                      <div className="step-icon"><MapPin size={16} /></div>
                      <span>Entrega final</span>
                    </div>
                  </div>
                </section>
              )}

              {/* 6. Colección de vehículos & 7. Botón adicional */}
              {(activeTab === 'Dashboard' || activeTab === 'Favoritos') && (
                <section className="vehicles-section">
                  <h2>{activeTab === 'Favoritos' ? 'Mis Favoritos' : 'Mi Colección'}</h2>
                  <div className="vehicles-grid">
                    
                    {displayedVehicles.map((vehicle) => (
                      <div className="vehicle-card" key={vehicle.id} onClick={() => setSelectedVehicle(vehicle)} style={{ cursor: 'pointer' }}>
                        <div className="card-image">
                          <img src={vehicle.image} alt={vehicle.name} />
                          <button 
                            className="favorite-btn" 
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              toggleFavorite(vehicle.id); 
                            }}
                          >
                            <Heart size={20} fill={vehicle.isFavorite ? "#f5b400" : "rgba(0,0,0,0.5)"} color={vehicle.isFavorite ? "#f5b400" : "#fff"} />
                          </button>
                        </div>
                        <div className="card-info">
                          <h3>{vehicle.name}</h3>
                          <p className="year">{vehicle.year}</p>
                          <div className="specs">
                            <span>{vehicle.specs}</span>
                          </div>
                        </div>
                      </div>
                    ))}

                    {activeTab === 'Dashboard' && (
                      <div className="add-vehicle-card" onClick={handleAddVehicle}>
                        <div className="add-content">
                          <div className="add-icon">
                            <Plus size={36} />
                          </div>
                          <span>Agregar vehículo</span>
                        </div>
                      </div>
                    )}

                  </div>
                </section>
              )}

              {/* 8. Configuración */}
              {activeTab === 'Configuración' && (
                <section className="settings-section">
                  <h2>Ajustes de la Cuenta</h2>
                  <div className="settings-grid">
                    <div className="settings-card">
                      <h3>Seguridad</h3>
                      <button className="btn-settings" onClick={() => Swal.fire({ title: 'Cambiar Contraseña', input: 'password', inputPlaceholder: 'Nueva contraseña', background: '#141414', color: '#fff', confirmButtonColor: '#f5b400' })}>Cambiar Contraseña</button>
                      <button className="btn-settings outline" onClick={() => Swal.fire({ icon: 'info', title: 'Autenticación en 2 Pasos', text: 'Se enviará un código a tu teléfono', background: '#141414', color: '#fff', confirmButtonColor: '#f5b400' })}>Activar 2FA</button>
                    </div>
                    <div className="settings-card">
                      <h3>Preferencias</h3>
                      <div className="toggle-group">
                        <label className="toggle-label">
                          <input type="checkbox" defaultChecked className="toggle-checkbox" /> Notificaciones por Email
                        </label>
                        <label className="toggle-label">
                          <input type="checkbox" defaultChecked className="toggle-checkbox" /> Alertas SMS
                        </label>
                      </div>
                      <select className="settings-select" defaultValue="cr">
                        <option value="cr">Moneda: Colones (₡)</option>
                        <option value="us">Moneda: Dólares ($)</option>
                      </select>
                    </div>
                    <div className="settings-card danger-zone">
                      <h3 className="danger-text">Zona de Peligro</h3>
                      <p className="danger-desc">Estas acciones no se pueden deshacer.</p>
                      <button className="btn-danger" onClick={() => Swal.fire({ icon: 'warning', title: '¿Cerrar Sesión?', showCancelButton: true, confirmButtonText: 'Sí, salir', cancelButtonText: 'Cancelar', background: '#141414', color: '#fff', confirmButtonColor: '#e63946' })}>Cerrar Sesión</button>
                      <button className="btn-danger outline" onClick={() => Swal.fire({ icon: 'error', title: '¿Eliminar cuenta?', text: 'Se borrarán de forma permanente todos tus datos, favoritos y autos.', showCancelButton: true, confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar', background: '#141414', color: '#fff', confirmButtonColor: '#e63946' })}>Eliminar Cuenta</button>
                    </div>
                  </div>
                </section>
              )}
            </div>

            <div className="right-column">
              {/* 5. Información del usuario */}
              <section className="user-info-section">
                <h2>Información Personal</h2>
                <div className="info-list">
                  <div className="info-item">
                    <div className="icon-wrapper">
                      <Mail className="info-icon" size={20} />
                    </div>
                    <div className="info-text">
                      <label>Email</label>
                      <p>{userInfo.email}</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="icon-wrapper">
                      <Phone className="info-icon" size={20} />
                    </div>
                    <div className="info-text">
                      <label>Teléfono</label>
                      <p>{userInfo.phone}</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="icon-wrapper">
                      <MapPin className="info-icon" size={20} />
                    </div>
                    <div className="info-text">
                      <label>Ubicación</label>
                      <p>{userInfo.location}</p>
                    </div>
                  </div>
                </div>
                <button className="edit-profile-btn" onClick={handleEditProfile}>
                  <Edit2 size={18} />
                  <span>Editar perfil</span>
                </button>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PerfilUsuarios;
