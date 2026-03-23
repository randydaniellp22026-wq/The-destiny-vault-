import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const API_URL = 'http://127.0.0.1:3000';

const darkSwal = {
  background: '#0a0a0a',
  color: '#fff',
  confirmButtonColor: '#eab308'
};

export const useLoginLogic = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validaciones de frontend
    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Por favor, completa todos los campos.');
      setLoading(false);
      return;
    }

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(formData.email)) {
      setError('Ingresa un formato de correo válido.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/users?email=${encodeURIComponent(formData.email)}&password=${encodeURIComponent(formData.password)}`
      );

      if (!response.ok) throw new Error('Error al conectar con el servidor.');

      const users = await response.json();

      if (users.length > 0) {
        const user = users[0];
        // Guardamos la sesión completa incluyendo el ID, favoritos y foto para persistencia
        localStorage.setItem('user', JSON.stringify({ 
          id: user.id, 
          nombre: user.nombre, 
          email: user.email,
          rol: user.rol || 'Usuario',
          telefono: user.telefono || '',
          ubicacion: user.ubicacion || 'Costa Rica',
          favorites: user.favorites || [],
          image: user.image || ''
        }));
        
        Swal.fire({
          ...darkSwal,
          icon: 'success',
          title: '¡Bienvenido!',
          text: `Sesión iniciada como ${user.nombre}`
        }).then(() => {
          window.location.href = '/reseñas';
        });
      } else {
        throw new Error('Credenciales incorrectas. Verifica tu correo y contraseña.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fillTestCredentials = () => {
    setFormData({
      email: 'admin@thedestinyvault.com',
      password: 'admin'
    });
  };

  return { formData, loading, error, handleChange, handleSubmit, fillTestCredentials };
};
