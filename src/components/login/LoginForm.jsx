import React from 'react';

export const LoginForm = ({ formData, loading, error, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="premium-form">
      <div className="form-group">
        <label htmlFor="email">Correo Electrónico</label>
        <div className="input-wrapper">
          <input
            type="email"
            id="email"
            name="email"
            className="premium-input"
            placeholder="nombre@ejemplo.com"
            value={formData.email}
            onChange={onChange}
            disabled={loading}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="password">Contraseña</label>
        <div className="input-wrapper">
          <input
            type="password"
            id="password"
            name="password"
            className="premium-input"
            placeholder="••••••••"
            value={formData.password}
            onChange={onChange}
            disabled={loading}
            required
          />
        </div>
      </div>

      <button 
        type="submit" 
        className="login-submit-btn" 
        disabled={loading}
      >
        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </button>

      {error && (
        <div className="error-bubble">
          <span>⚠️ {error}</span>
        </div>
      )}
    </form>
  );
};

export default LoginForm;
