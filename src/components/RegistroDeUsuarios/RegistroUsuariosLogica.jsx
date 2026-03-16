import { useState } from 'react';
import Swal from 'sweetalert2';

const API_URL = 'http://localhost:5000';

export const useRegistroUsuariosLogica = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validarFormulario = () => {
    const { nombre, correo, telefono, password } = formData;

    if (!nombre.trim() || !correo.trim() || !telefono.trim() || !password.trim()) {
      Swal.fire({ icon: 'error', title: 'Campos incompletos', text: 'Todos los campos son obligatorios.' });
      return false;
    }

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
      Swal.fire({ icon: 'error', title: 'Correo inválido', text: 'Ingresa un correo válido con @.' });
      return false;
    }

    const regexTelefono = /^[0-9]+$/;
    if (!regexTelefono.test(telefono)) {
      Swal.fire({ icon: 'error', title: 'Teléfono inválido', text: 'El teléfono solo debe contener números.' });
      return false;
    }

    if (password.length < 8) {
      Swal.fire({ icon: 'error', title: 'Contraseña débil', text: 'La contraseña debe tener mínimo 8 caracteres.' });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      // Check if email already exists
      const checkRes = await fetch(`${API_URL}/users?correo=${formData.correo}`);
      const existingUsers = await checkRes.json();

      if (existingUsers.length > 0) {
        Swal.fire({ icon: 'warning', title: 'Correo ya registrado', text: 'Este correo ya tiene una cuenta. Inicia sesión.' });
        return;
      }

      // POST new user to JSON Server
      const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.correo,  // stored as "email" for login compatibility
          correo: formData.correo,
          telefono: formData.telefono,
          password: formData.password,
          createdAt: new Date().toISOString()
        })
      });

      if (!res.ok) throw new Error('Error al guardar el usuario.');

      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Tu cuenta ha sido creada. Ya puedes iniciar sesión.',
        confirmButtonColor: '#eab308',
        confirmButtonText: 'Iniciar sesión'
      }).then(() => {
        window.location.href = '/login';
      });

      setFormData({ nombre: '', correo: '', telefono: '', password: '' });

    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error del servidor', text: err.message });
    }
  };

  return { formData, handleChange, handleSubmit };
};
