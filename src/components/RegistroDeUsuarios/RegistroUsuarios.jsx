import React from 'react';
import './DiseñoRegistro.css';
import { useRegistroUsuariosLogica } from './RegistroUsuariosLogica';
import { useNavigate } from 'react-router-dom';

function RegistroUsuarios() {
  const { formData, handleChange, handleSubmit } = useRegistroUsuariosLogica();
  const navigate = useNavigate();

  return (
    <div className="contenedorRegistro">
      {/* Left: Image side */}
      <div className="ladoImagen">
        <div className="overlay">
          <h1>
            Únete a <span className="gold-accent">The Destiny Vault</span>
          </h1>
          <p>
            Crea tu cuenta y accede a nuestro catálogo exclusivo de vehículos de lujo con financiamiento personalizado.
          </p>
        </div>
      </div>

      {/* Right: Form side */}
      <div className="ladoFormulario">
        <form className="formRegistro" onSubmit={handleSubmit}>
          <h2>Crear Cuenta</h2>
          <p className="subtitle">Completa tus datos para registrarte</p>

          <label htmlFor="nombre">Nombre completo</label>
          <input
            id="nombre"
            type="text"
            name="nombre"
            placeholder="Ej: Juan Pérez"
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          <label htmlFor="correo">Correo electrónico</label>
          <input
            id="correo"
            type="email"
            name="correo"
            placeholder="nombre@ejemplo.com"
            value={formData.correo}
            onChange={handleChange}
            required
          />

          <label htmlFor="telefono">Teléfono</label>
          <input
            id="telefono"
            type="tel"
            name="telefono"
            placeholder="Ej: 50412345678"
            value={formData.telefono}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Mínimo 8 caracteres"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Crear Cuenta</button>

          <p className="loginText">
            ¿Ya tienes cuenta?{' '}
            <span onClick={() => navigate('/login')}>Iniciar sesión</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegistroUsuarios;
