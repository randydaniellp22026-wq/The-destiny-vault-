import { useState } from 'react';

export const useLoginLogic = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Consultar la API del json-server en el puerto 5000
      const response = await fetch(`http://localhost:5000/users?email=${formData.email}&password=${formData.password}`);
      
      if (!response.ok) {
        throw new Error('Error al conectar con el servidor.');
      }

      const users = await response.json();

      if (users.length > 0) {
        const user = users[0];
        console.log('Login successful:', user.nombre);
        alert(`Bienvenido, ${user.nombre}!`);
      } else {
        throw new Error('Credenciales incorrectas. Intente de nuevo.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
};
