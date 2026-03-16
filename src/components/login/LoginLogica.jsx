import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000';

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

    try {
      const response = await fetch(
        `${API_URL}/users?email=${encodeURIComponent(formData.email)}&password=${encodeURIComponent(formData.password)}`
      );

      if (!response.ok) throw new Error('Error al conectar con el servidor.');

      const users = await response.json();

      if (users.length > 0) {
        const user = users[0];
        // Save session to localStorage
        localStorage.setItem('user', JSON.stringify({ id: user.id, nombre: user.nombre, email: user.email }));
        // Redirect home
        navigate('/');
      } else {
        throw new Error('Credenciales incorrectas. Verifica tu correo y contraseña.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { formData, loading, error, handleChange, handleSubmit };
};
