import React, { useState, useEffect } from 'react';
import { 
  Search, 
  UserPlus, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  UserCheck, 
  ShieldAlert,
  Mail,
  Phone,
  MapPin,
  Shield
} from 'lucide-react';
import Swal from 'sweetalert2';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const isGerente = currentUser.rol === 'gerente';

  const API_URL = 'http://localhost:5000/users';

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditUser = (user) => {
    Swal.fire({
      title: 'Editar Usuario',
      html: `
        <div class="swal-edit-form">
          <input id="swal-name" class="swal2-input" placeholder="Nombre" value="${user.nombre}">
          <input id="swal-email" class="swal2-input" placeholder="Email" value="${user.email}">
          <input id="swal-phone" class="swal2-input" placeholder="Teléfono" value="${user.telefono || ''}">
          <input id="swal-location" class="swal2-input" placeholder="Ubicación" value="${user.ubicacion || ''}">
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      confirmButtonColor: '#eab308',
      background: '#141414',
      color: '#fff',
      preConfirm: () => {
        return {
          nombre: document.getElementById('swal-name').value,
          email: document.getElementById('swal-email').value,
          telefono: document.getElementById('swal-phone').value,
          ubicacion: document.getElementById('swal-location').value,
        }
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${API_URL}/${user.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(result.value)
          });
          if (res.ok) {
            Swal.fire('Actualizado', 'El usuario ha sido modificado con éxito.', 'success');
            fetchUsers();
          }
        } catch (error) {
          Swal.fire('Error', 'No se pudo actualizar el usuario.', 'error');
        }
      }
    });
  };

  const handleDeleteUser = (user) => {
    if (user.id === currentUser.id) {
       return Swal.fire('Acción Prohibida', 'No puedes eliminar tu propia cuenta desde aquí.', 'error');
    }
    
    if (user.rol === 'gerente' && currentUser.rol !== 'gerente') {
       return Swal.fire('Acceso Denegado', 'No tienes permisos para eliminar a un Gerente.', 'warning');
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará permanentemente al usuario ${user.nombre}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#333',
      confirmButtonText: 'Sí, eliminar',
      background: '#141414',
      color: '#fff'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${API_URL}/${user.id}`, { method: 'DELETE' });
          if (res.ok) {
            Swal.fire('Eliminado', 'El usuario ha sido removido.', 'success');
            fetchUsers();
          }
        } catch (error) {
          Swal.fire('Error', 'Ocurrió un fallo al intentar eliminar.', 'error');
        }
      }
    });
  };

  const handleToggleAdmin = async (user) => {
    if (!isGerente) return;
    
    const newRole = user.rol === 'admin' ? 'Cliente' : 'admin';
    const actionText = newRole === 'admin' ? 'ascender a Administrador' : 'quitar el rol de Administrador';

    Swal.fire({
      title: 'Cambiar Rango',
      text: `¿Deseas ${actionText} a ${user.nombre}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#eab308',
      confirmButtonText: 'Sí, aplicar',
      background: '#141414',
      color: '#fff'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${API_URL}/${user.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rol: newRole })
          });
          if (res.ok) {
            Swal.fire('Éxito', 'Rol actualizado correctamente.', 'success');
            fetchUsers();
          }
        } catch (error) {
          Swal.fire('Error', 'No se pudo cambiar el rol.', 'error');
        }
      }
    });
  };

  const filteredUsers = users.filter(u => 
    u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-mgmt-container">
      <header className="mgmt-header">
        <div>
          <h1>Gestión de Usuarios</h1>
          <p>Administra las cuentas y roles del sistema.</p>
        </div>
      </header>

      <div className="mgmt-actions">
        <div className="search-bar">
          <Search size={20} />
          <input 
            type="text" 
            placeholder="Buscar por nombre o email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Contacto</th>
              <th>Ubicación</th>
              <th>Rol / Rango</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '3rem' }}>Cargando usuarios...</td></tr>
            ) : filteredUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="user-cell">
                    <div className="user-avatar-small">
                      {user.image ? <img src={user.image} alt="" /> : user.nombre.charAt(0)}
                    </div>
                    <div className="user-info">
                      <span className="user-name">{user.nombre}</span>
                      <span className="user-id">ID: {user.id}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="contact-cell">
                    <div className="contact-item"><Mail size={14} /> {user.email}</div>
                    <div className="contact-item"><Phone size={14} /> {user.telefono || 'Sin tel.'}</div>
                  </div>
                </td>
                <td>
                  <div className="location-cell">
                    <MapPin size={14} /> {user.ubicacion || 'Costa Rica'}
                  </div>
                </td>
                <td>
                  <span className={`role-badge ${user.rol?.toLowerCase()}`}>
                    {user.rol === 'admin' ? <Shield size={14} /> : user.rol === 'gerente' ? <ShieldAlert size={14} /> : <UserCheck size={14} />}
                    {user.rol}
                  </span>
                </td>
                <td>
                  <div className="actions-cell">
                    <button className="action-btn" onClick={() => handleEditUser(user)} title="Editar"><Edit3 size={18} /></button>
                    
                    {isGerente && user.id !== currentUser.id && user.rol !== 'gerente' && (
                      <button 
                        className={`action-btn ${user.rol === 'admin' ? 'demote' : 'promote'}`} 
                        onClick={() => handleToggleAdmin(user)}
                        title={user.rol === 'admin' ? "Quitar Admin" : "Hacer Admin"}
                      >
                        <UserPlus size={18} />
                      </button>
                    )}

                    <button className="action-btn delete" onClick={() => handleDeleteUser(user)} title="Eliminar"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
