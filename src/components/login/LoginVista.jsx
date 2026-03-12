import React from 'react';
import './login.css';
import { useLoginLogic } from './loginLogica';
import { LoginHeader } from './LoginHeader';
import { LoginForm } from './LoginForm';

export const LoginVista = () => {
  const { formData, loading, error, handleChange, handleSubmit } = useLoginLogic();

  return (
    <div className="login-page">
      {/* Left Column: Full Visual Section */}
      <section className="login-visual-section">
        <div className="hero-background"></div>
        <div className="hero-content">
          <span className="hero-badge">The Destiny Vault</span>
          <h1>Encuentra tu próximo destino</h1>
          <p>
            Plataforma líder en gestión de vehículos recuperados. 
            Accede a las mejores oportunidades de crédito con seguridad y transparencia.
          </p>
        </div>
      </section>

      {/* Right Column: Full Form Section */}
      <section className="login-form-section">
        <div className="form-container">
          <div className="form-header">
            <h2>Bienvenido</h2>
            <p>Ingresa tus credenciales para acceder a tu cuenta.</p>
          </div>
          
          <LoginForm 
            formData={formData}
            loading={loading}
            error={error}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />

          <div className="form-footer">
            ¿Aún no tienes cuenta? <a href="#registro">Crear una cuenta nueva</a>
          </div>

          <div className="legal-notice">
            Al continuar, aceptas nuestros <a href="#terminos">Términos de Servicio</a> y <a href="#privacidad">Acuerdos de Privacidad</a>.
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginVista;
