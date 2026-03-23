import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PerfilUsuarios.css';
import Swal from 'sweetalert2';

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
  Edit2,
  LogOut,
  Car,
  FileText,
  CheckCircle,
  XCircle,
  Send
} from 'lucide-react';

const darkSwal = {
  background: '#0a0a0a',
  color: '#fff',
  confirmButtonColor: '#eab308',
  cancelButtonColor: '#333'
};

function PerfilUsuarios() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [allVehicles, setAllVehicles] = useState([]); // Versión de catálogo completa

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
  const [userRequests, setUserRequests] = useState([]);

  const [userInfo, setUserInfo] = useState({
    id: null,
    name: '',
    role: 'Cliente',
    email: '',
    phone: '',
    location: '',
    image: ''
  });

  const handleLogout = () => {
    Swal.fire({
      ...darkSwal,
      icon: 'warning',
      title: '¿Cerrar Sesión?',
      text: 'Tendrás que ingresar tus credenciales de nuevo.',
      showCancelButton: true,
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar',
      background: '#141414',
      color: '#fff',
      confirmButtonColor: '#e63946'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('user');
        navigate('/login');
      }
    });
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      Swal.fire({
        ...darkSwal,
        icon: 'warning',
        title: 'Acceso Denegado',
        text: 'Por favor inicia sesión primero.',
        background: '#141414',
        color: '#fff',
        confirmButtonColor: '#f5b400'
      }).then(() => {
        navigate('/login');
      });
      return;
    }

    const loadData = async () => {
      const user = JSON.parse(savedUser);
      setUserInfo({
        id: user.id,
        name: user.nombre || 'Usuario',
        role: user.rol || 'Cliente Premium',
        email: user.email || '',
        phone: user.telefono || '+506 0000 0000',
        location: user.ubicacion || 'San José',
        preciseAddress: user.direccion_precisa || 'Sin dirección registrada',
        image: user.image || '',
        favorites: user.favorites || []
      });

      try {
        // Obtenemos todos los vehículos del servidor para filtrar los favoritos
        const res = await fetch('http://localhost:5000/vehicles');
        const allVehiclesFromDb = await res.json();
        setAllVehicles(allVehiclesFromDb); // Guardar lista maestra para agregar manual

        // Filtramos solo los que el usuario tiene en su array de favoritos
        // Usamos String() para asegurar compatibilidad si el ID es número o string en db.json
        const userFavoriteIds = (user.favorites || []).map(String);
        
        const filtered = allVehiclesFromDb
          .filter(v => userFavoriteIds.includes(String(v.id)))
          .map(v => ({
            id: v.id,
            name: v.name,
            image: v.image,
            year: v.year.toString(),
            specs: `${v.motor} • ${v.mileage}`,
            isFavorite: true,
            importStatus: 4
          }));
          
        setVehicles(filtered);
      } catch (err) {
        console.error("Error cargando favoritos:", err);
      }

      // Fetch user requests for the Peticiones tab
      try {
        if (user.email) {
          const reqRes = await fetch(`http://localhost:5000/requests?user_email=${encodeURIComponent(user.email)}`);
          const reqData = await reqRes.json();
          setUserRequests(reqData.sort((a,b) => new Date(b.date) - new Date(a.date)));
        }
      } catch (err) {
        console.error("Error fetching requests:", err);
      }
    };

    loadData();
  }, [navigate]);

  const handleEditProfile = () => {
    Swal.fire({
      ...darkSwal,
      title: 'Editar Perfil',
      html: `
        <div style="text-align: left; margin-bottom: 20px;">
          <div style="margin-bottom: 8px;"><label style="font-size: 14px; color: #a0a0a0;">Nombre Completo</label></div>
          <input id="swal-input-name" class="swal2-input" value="${userInfo.name}" style="margin: 0; width: 90%;">
        </div>
        <div style="text-align: left; margin-bottom: 20px;">
          <div style="margin-bottom: 8px;"><label style="font-size: 14px; color: #a0a0a0;">Teléfono</label></div>
          <input id="swal-input-phone" type="text" class="swal2-input" value="${userInfo.phone}" placeholder="Ej: +506 72617462" style="margin: 0; width: 90%;">
        </div>
        <div style="text-align: left; margin-bottom: 20px;">
          <div style="margin-bottom: 8px;"><label style="font-size: 14px; color: #a0a0a0;">Provincia (Costa Rica)</label></div>
          <select id="swal-input-location" class="swal2-input" style="margin: 0; width: 90%; color: #fff; background: #222;">
            <option value="San José" ${userInfo.location === 'San José' ? 'selected' : ''}>San José</option>
            <option value="Alajuela" ${userInfo.location === 'Alajuela' ? 'selected' : ''}>Alajuela</option>
            <option value="Cartago" ${userInfo.location === 'Cartago' ? 'selected' : ''}>Cartago</option>
            <option value="Heredia" ${userInfo.location === 'Heredia' ? 'selected' : ''}>Heredia</option>
            <option value="Guanacaste" ${userInfo.location === 'Guanacaste' ? 'selected' : ''}>Guanacaste</option>
            <option value="Puntarenas" ${userInfo.location === 'Puntarenas' ? 'selected' : ''}>Puntarenas</option>
            <option value="Limón" ${userInfo.location === 'Limón' ? 'selected' : ''}>Limón</option>
          </select>
        </div>
        <div style="text-align: left;">
          <div style="margin-bottom: 8px;"><label style="font-size: 14px; color: #a0a0a0;">Dirección Precisa</label></div>
          <input id="swal-input-address" class="swal2-input" placeholder="Ej: 125m oeste de..." value="${userInfo.preciseAddress === 'Sin dirección registrada' ? '' : userInfo.preciseAddress}" style="margin: 0; width: 90%;">
        </div>
      `,
      background: '#141414',
      color: '#fff',
      confirmButtonColor: '#f5b400',
      confirmButtonText: 'Guardar Cambios',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: () => {
        const name = document.getElementById('swal-input-name').value.trim();
        const phone = document.getElementById('swal-input-phone').value.trim();
        const location = document.getElementById('swal-input-location').value;
        const preciseAddress = document.getElementById('swal-input-address').value.trim();

        if (!name || !phone || !location) {
          Swal.showValidationMessage('Los campos destacados son obligatorios.');
          return false;
        }

        // Validación de nombre (mínimo 3 caracteres, solo letras y espacios)
        const regexName = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/;
        if (!regexName.test(name)) {
          Swal.showValidationMessage('El nombre debe tener al menos 3 caracteres y contener solo letras.');
          return false;
        }

        // Validación de teléfono (8 a 20 caracteres, permite +, números y espacios)
        const regexPhone = /^[0-9+\s\-()]{8,20}$/;
        if (!regexPhone.test(phone)) {
          Swal.showValidationMessage('Asegúrate de incluir el código de país con un espacio, ej: +506 72617462.');
          return false;
        }

        return { name, phone, location, preciseAddress };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Operación CRUD (Update) en el servidor
          const res = await fetch(`http://localhost:5000/users/${userInfo.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              nombre: result.value.name,
              telefono: result.value.phone,
              ubicacion: result.value.location,
              direccion_precisa: result.value.preciseAddress
            })
          });

          if (!res.ok) throw new Error('Error al actualizar el perfil en el servidor.');

          // Actualizamos estado local y sesión
          const updatedUser = { ...userInfo, ...result.value };
          setUserInfo(updatedUser);
          
          const sessionUser = JSON.parse(localStorage.getItem('user'));
          localStorage.setItem('user', JSON.stringify({
            ...sessionUser,
            nombre: result.value.name,
            telefono: result.value.phone,
            ubicacion: result.value.location,
            direccion_precisa: result.value.preciseAddress
          }));

          Swal.fire({
            ...darkSwal,
            icon: 'success',
            title: '¡Actualizado!',
            text: 'Tus datos han sido guardados permanentemente.',
            background: '#141414',
            color: '#fff',
            confirmButtonColor: '#f5b400'
          });
        } catch (err) {
          Swal.fire({ ...darkSwal, icon: 'error', title: 'Oops...', text: err.message });
        }
      }
    });
  };

  const handleEditAvatar = () => {
    Swal.fire({
      ...darkSwal,
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
        reader.onload = async (e) => {
          const newImage = e.target.result;
          setUserInfo({ ...userInfo, image: newImage });

          // Actualizar localStorage para que persista al recargar la página actual
          const sessionUser = JSON.parse(localStorage.getItem('user'));
          localStorage.setItem('user', JSON.stringify({ ...sessionUser, image: newImage }));

          // Actualizar servidor para que persista en futuros inicios de sesión
          try {
            await fetch(`http://localhost:5000/users/${userInfo.id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ image: newImage })
            });
          } catch (err) {
            console.error('Error guardando imagen en el backend', err);
          }

          Swal.fire({
            ...darkSwal,
            icon: 'success',
            title: '¡Foto Actualizada!',
            timer: 1500,
            showConfirmButton: false
          });
        };
        reader.readAsDataURL(result.value);
      }
    });
  };

  const toggleFavorite = async (vehicleId) => {
    const vidStr = String(vehicleId);
    const savedUser = localStorage.getItem('user');
    if (!savedUser) return;

    const user = JSON.parse(savedUser);
    let updatedFavorites = Array.isArray(user.favorites) ? user.favorites.map(String) : [];

    // Si ya está, lo quitamos. Si no, lo agregamos (aunque en el perfil normalmente solo quitamos)
    if (updatedFavorites.includes(vidStr)) {
      updatedFavorites = updatedFavorites.filter(id => id !== vidStr);
    } else {
      updatedFavorites.push(vidStr);
    }

    try {
      // Sincronizar con el servidor (CRUD - Update)
      const res = await fetch(`http://localhost:5000/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favorites: updatedFavorites })
      });

      if (!res.ok) throw new Error('Error al sincronizar favoritos.');

      // Actualizar sesión local
      user.favorites = updatedFavorites;
      localStorage.setItem('user', JSON.stringify(user));

      // Actualizar estado local para que desaparezca de la vista si estamos en modo "Favoritos"
      setVehicles(vehicles.map(v => 
        String(v.id) === vidStr ? { ...v, isFavorite: !v.isFavorite } : v
      ));

      // Si quitamos el favorito y estamos en la pestaña de favoritos, forzamos refresco ocultándolo
      if (!updatedFavorites.includes(vidStr)) {
         setVehicles(prev => prev.filter(v => String(v.id) !== vidStr));
      }

    } catch (err) {
      console.error(err);
      Swal.fire({ 
        ...darkSwal,
        icon: 'error', 
        title: 'Error', 
        text: 'No se pudo actualizar el favorito.' 
      });
    }
  };

  const handleAddVehicle = () => {
    // Filtrar los vehículos que el usuario ya tiene en la colección para no mostrarlos repitiendo
    const availableVehicles = (allVehicles || []).filter(
      dbCar => !vehicles.some(myCar => String(myCar.id) === String(dbCar.id))
    );

    if (availableVehicles.length === 0) {
      Swal.fire({
        ...darkSwal,
        icon: 'info',
        title: 'Colección Completa',
        text: 'Ya tienes todos los vehículos disponibles en el catálogo.'
      });
      return;
    }

    const inputOptions = {};
    availableVehicles.forEach(car => {
      inputOptions[car.id] = `${car.name} (${car.year}) - ₡${car.price.toLocaleString('es-CR')}`;
    });

    Swal.fire({
      ...darkSwal,
      title: 'Agregar Vehículo',
      text: 'Selecciona un vehículo del catálogo:',
      input: 'select',
      inputOptions: inputOptions,
      inputPlaceholder: 'Selecciona un vehículo...',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Seleccionar'
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedId = result.value;
        const selectedCarDb = availableVehicles.find(c => String(c.id) === String(selectedId));

        if (selectedCarDb) {
          // Guardamos en la base de datos para que persista
          const savedUser = localStorage.getItem('user');
          if (savedUser) {
            const user = JSON.parse(savedUser);
            const updatedFavorites = [...(user.favorites || []), String(selectedCarDb.id)];
            
            // Sincronizar servidor
            fetch(`http://localhost:5000/users/${user.id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ favorites: updatedFavorites })
            }).then(() => {
                // Actualizar sesión local
                user.favorites = updatedFavorites;
                localStorage.setItem('user', JSON.stringify(user));
                
                const newV = {
                  id: selectedCarDb.id,
                  name: selectedCarDb.name,
                  image: selectedCarDb.image,
                  year: selectedCarDb.year.toString(),
                  specs: `${selectedCarDb.motor} • ${selectedCarDb.mileage}`,
                  isFavorite: true,
                  importStatus: 1
                };
                setVehicles([...vehicles, newV]);

                Swal.fire({
                  ...darkSwal,
                  icon: 'success',
                  title: '¡Añadido!',
                  text: `El ${selectedCarDb.name} ha sido agregado a tu colección.`
                });
            }).catch(err => {
               console.error(err);
               Swal.fire({ ...darkSwal, icon: 'error', title: 'Error', text: 'No se pudo guardar en la base de datos.' });
            });
          }
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
          <li onClick={() => navigate('/')}>Inicio</li>
          <li onClick={() => navigate('/inventory')}>Vehículos</li>
          <li onClick={() => navigate('/contact')}>Servicios</li>
          <li className="active-link" onClick={() => setActiveTab('Dashboard')}>Perfil</li>
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
            <li className={activeTab === 'Peticiones' ? 'active' : ''} onClick={() => setActiveTab('Peticiones')}>
              <FileText size={20} />
              <span>Estado de Peticiones</span>
            </li>
            <li className={activeTab === 'Estado' ? 'active' : ''} onClick={() => setActiveTab('Estado')}>
              <Ship size={20} />
              <span>Estado de importación</span>
            </li>
            <li className={activeTab === 'Configuración' ? 'active' : ''} onClick={() => setActiveTab('Configuración')}>
              <Settings size={20} />
              <span>Configuración</span>
            </li>
            <li className={`sell-car-menu-item ${activeTab === 'Vender' ? 'active' : ''}`} onClick={() => navigate('/vender-auto')}>
              <Car size={20} />
              <span>Vender mi auto</span>
            </li>
            <li className="logout-menu-item" onClick={handleLogout}>
              <LogOut size={20} />
              <span>Cerrar Sesión</span>
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

                  <div className="status-details">
                    <div className="detail-item">
                      <span className="detail-label">Fecha Estimada</span>
                      <span className="detail-value">25 Abr 2026</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Ubicación</span>
                      <span className="detail-value">Puerto de Moín, Limón</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Vessel / Naviera</span>
                      <span className="detail-value">Maersk Line • V0924</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Estado</span>
                      <span className="detail-value">En trámite aduanal</span>
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
                          <img src={vehicle.image} alt={vehicle.name} referrerPolicy="no-referrer" />
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

              {/* Nuevas Peticiones Tab */}
              {activeTab === 'Peticiones' && (
                <section className="requests-user-section">
                  <h2>Estado de mis Peticiones</h2>
                  {userRequests.length === 0 ? (
                    <div style={{ background: '#111', padding: '2rem', borderRadius: '12px', color: '#9ca3af', textAlign: 'center' }}>
                      No tienes peticiones activas. Ve a la sección de contacto para enviar una.
                    </div>
                  ) : (
                    <div className="user-requests-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {userRequests.map(req => (
                        <div key={req.id} style={{ background: '#111', border: '1px solid rgba(234,179,8,0.2)', padding: '1.5rem', borderRadius: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#fff' }}>{req.subject}</h3>
                            <span style={{ 
                              padding: '4px 10px', 
                              borderRadius: '100px', 
                              fontSize: '0.8rem', 
                              fontWeight: '600',
                              backgroundColor: req.status === 'accepted' ? 'rgba(16,185,129,0.2)' : req.status === 'rejected' ? 'rgba(239,68,68,0.2)' : req.status === 'replied' ? 'rgba(59,130,246,0.2)' : 'rgba(234,179,8,0.2)',
                              color: req.status === 'accepted' ? '#10b981' : req.status === 'rejected' ? '#ef4444' : req.status === 'replied' ? '#3b82f6' : '#eab308'
                             }}>
                               {req.status === 'accepted' ? 'Aprobada' : req.status === 'rejected' ? 'Rechazada' : req.status === 'replied' ? 'Respondida' : 'En revisión'}
                            </span>
                          </div>
                          <p style={{ margin: 0, color: '#9ca3af', fontStyle: 'italic', fontSize: '0.9rem', marginBottom: '1rem' }}>"{req.message}"</p>
                          <small style={{ color: '#6b7280', display: 'block' }}>{new Date(req.date).toLocaleDateString()}</small>
                          
                          {req.reply && (
                            <div style={{ marginTop: '1rem', background: 'rgba(234, 179, 8, 0.05)', borderLeft: '3px solid #eab308', padding: '1rem', borderRadius: '0 8px 8px 0' }}>
                              <strong style={{ color: '#eab308', display: 'block', marginBottom: '0.3rem', fontSize: '0.85rem' }}>Respuesta del Administrador:</strong>
                              <p style={{ margin: 0, color: '#fff', fontSize: '0.95rem' }}>{req.reply}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* 8. Configuración */}
              {activeTab === 'Configuración' && (
                <section className="settings-section">
                  <h2>Ajustes de la Cuenta</h2>
                  <div className="settings-grid">
                    <div className="settings-card">
                      <h3>Seguridad</h3>
                      <button className="btn-settings" onClick={() => Swal.fire({ ...darkSwal, title: 'Cambiar Contraseña', input: 'password', inputPlaceholder: 'Nueva contraseña' })}>Cambiar Contraseña</button>
                      <button className="btn-settings outline" onClick={() => Swal.fire({ ...darkSwal, icon: 'info', title: 'Autenticación en 2 Pasos', text: 'Se enviará un código a tu teléfono' })}>Activar 2FA</button>
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
                      <button className="btn-danger" onClick={handleLogout}>Cerrar Sesión</button>
                      <button className="btn-danger outline" onClick={() => Swal.fire({ ...darkSwal, icon: 'error', title: '¿Eliminar cuenta?', text: 'Se borrarán de forma permanente todos tus datos, favoritos y autos.', showCancelButton: true, confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar', confirmButtonColor: '#e63946' })}>Eliminar Cuenta</button>
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
                  <div className="info-item">
                    <div className="icon-wrapper">
                      <MapPin className="info-icon" size={20} />
                    </div>
                    <div className="info-text">
                      <label>Dirección exacta</label>
                      <p>{userInfo.preciseAddress}</p>
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
