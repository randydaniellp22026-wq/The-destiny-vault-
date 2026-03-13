import React from 'react';
import './login.css';
import { useLoginLogic } from './loginLogica';
import { LoginHeader } from './LoginHeader';
import { LoginForm } from './LoginForm';

export const LoginVista = ({ onNavigate }) => {
  const { formData, loading, error, handleChange, handleSubmit } = useLoginLogic();

  return (
    <div className="login-page">
      {/* ... code above ... */}
      <section className="login-form-section">
        <div className="form-container">
          {/* ... header and form ... */}
          
          <LoginForm 
            formData={formData}
            loading={loading}
            error={error}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />

          <div className="form-footer">
            ¿Aún no tienes cuenta? <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('register'); }}>Crear una cuenta nueva</a>
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
