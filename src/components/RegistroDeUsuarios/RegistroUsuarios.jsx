import React from 'react';
import './DiseñoRegistro.css';
import { useRegistroUsuariosLogica } from './RegistroUsuariosLogica';

function RegistroUsuarios({ onNavigate }) {
  const { formData, handleChange, handleSubmit } = useRegistroUsuariosLogica();

  return (
    <div className="contenedorRegistro">
      {/* ... code above ... */}
      <div className="ladoFormulario">
        <form className="formRegistro" onSubmit={handleSubmit}>
          {/* ... inputs ... */}
          <button type="submit">
            Crear Cuenta
          </button>
          <p className="loginText">
            ¿Ya tienes cuenta? <span onClick={() => onNavigate('login')} style={{ cursor: 'pointer' }}>Iniciar sesión</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegistroUsuarios;