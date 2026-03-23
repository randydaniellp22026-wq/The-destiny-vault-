import { useState } from 'react';
import Swal from 'sweetalert2';

const API_URL = 'http://127.0.0.1:3000';

const darkSwal = {
  background: '#0a0a0a',
  color: '#fff',
  confirmButtonColor: '#eab308'
};

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
      Swal.fire({ ...darkSwal, icon: 'error', title: 'Campos incompletos', text: 'Todos los campos son obligatorios.' });
      return false;
    }

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
      Swal.fire({ ...darkSwal, icon: 'error', title: 'Correo inválido', text: 'Ingresa un correo válido con @.' });
      return false;
    }

    // Permitimos números, espacios, guiones y el signo + para teléfonos
    const regexTelefono = /^[0-9\s\-+]+$/;
    if (!regexTelefono.test(telefono)) {
      Swal.fire({ ...darkSwal, icon: 'error', title: 'Teléfono inválido', text: 'El teléfono solo debe contener números, espacios o los signos + y -.' });
      return false;
    }

    if (password.length < 8) {
      Swal.fire({ ...darkSwal, icon: 'error', title: 'Contraseña débil', text: 'La contraseña debe tener mínimo 8 caracteres.' });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      // Check if email already exists (json-server returns matching items)
      const resCheck = await fetch(`${API_URL}/users?email=${encodeURIComponent(formData.correo)}`);
      const existingUsers = await resCheck.json();

      if (existingUsers.length > 0) {
        Swal.fire({ 
          ...darkSwal, 
          icon: 'warning', 
          title: 'Correo ya registrado', 
          text: 'Este correo ya tiene una cuenta asociada. Inicia sesión para continuar.' 
        });
        return;
      }

      // POST new user to JSON Server
      const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.correo.trim(),
          correo: formData.correo.trim(),
          telefono: formData.telefono.trim(),
          password: formData.password,
          rol: 'Cliente',
          ubicacion: 'Costa Rica',
          createdAt: new Date().toISOString(),
          favorites: []
        })
      });

      if (!res.ok) throw new Error('Error al guardar el usuario en la base de datos.');

      Swal.fire({
        ...darkSwal,
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Tu cuenta ha sido creada con éxito. Ya puedes iniciar sesión.',
        confirmButtonText: 'Ir a Iniciar Sesión'
      }).then(() => {
        window.location.href = '/login';
      });

      setFormData({ nombre: '', correo: '', telefono: '', password: '' });

    } catch (err) {
      console.error("Error en registro:", err);
      Swal.fire({ 
        ...darkSwal, 
        icon: 'error', 
        title: 'Error de servidor', 
        text: 'No se pudo conectar con el servidor. Asegúrate de que json-server esté ejecutándose.' 
      });
    }
  };

  return { formData, handleChange, handleSubmit };
};
