import React from "react";
import { useRedireccionContactosLogica } from "./RedireccionContactosLogica";
import { Calculator } from 'lucide-react';
import { useNavigate, Link } from "react-router-dom";
import "./DiseñoContacto.css";

function RedireccionContactos() {
  const { formData, loading, handleChange, sendEmail } = useRedireccionContactosLogica();
  const navigate = useNavigate();

  return (
    <div className="paginaContacto">
      {/* ESPACIADO PARA NAVBAR GLOBAL */}
      <div style={{ paddingTop: '100px' }}></div>

      {/* TITULO */}
      <section className="headerContacto">
        <h1>Página de Contacto</h1>
        <p>
          Estamos aquí para asesorarte en tu crédito automotriz.
          Nuestro equipo está listo para ayudarte a obtener el vehículo que deseas.
        </p>
      </section>

      {/* CONTENIDO */}
      <div className="contenidoContacto">
        {/* FORMULARIO */}
        <form className="formulario" onSubmit={sendEmail}>
          <h2>Envíanos un mensaje</h2>

          <label>Nombre Completo</label>
          <input 
            type="text" 
            name="user_name"
            placeholder="Ej. Juan Pérez" 
            value={formData.user_name}
            onChange={handleChange}
            required
          />

          <label>Correo Electrónico</label>
          <input 
            type="email" 
            name="user_email"
            placeholder="ejemplo@correo.com" 
            value={formData.user_email}
            onChange={handleChange}
            required
          />

          <label>Teléfono</label>
          <input 
            type="text" 
            name="user_phone"
            placeholder="Ej. +52 (55) 1234-5678" 
            value={formData.user_phone}
            onChange={handleChange}
          />

          <label>Asunto</label>
          <select 
            id="subject"
            name="subject"
            className="input"
            value={formData.subject}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un asunto</option>
            <option value="Cotización de vehículo">Cotización de vehículo</option>
            <option value="Agendar un Test Drive VIP">Agendar un Test Drive VIP</option>
            <option value="Asesoría de crédito">Asesoría de crédito</option>
            <option value="Consulta General">Consulta General</option>
            <option value="Servicios postventa">Servicios postventa</option>
            <option value="Otros">Otros</option>
          </select>

          <label>Mensaje</label>
          <textarea 
            name="message"
            placeholder="Escribe tu mensaje aquí..."
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button 
            type="submit" 
            className="btnEnviar" 
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar Mensaje'}
          </button>
        </form>

        {/* INFORMACION */}
        <div className="infoContacto">
          <div className="cardInfo">
            <h3>WhatsApp</h3>
            <p>+506 6476 9091</p>
          </div>

          <div className="cardInfo">
            <h3>Correo</h3>
            <p>importadoravehiculosavs@gmail.com</p>
          </div>

          <div className="cardInfo wp-card-highlight">
            <h3>Chat Directo</h3>
            <a 
              href="https://api.whatsapp.com/send?phone=%2B50664769091&token=eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyNSJ9.eyJleHAiOjE3NzQwMjAzODQsInBob25lIjoiKzUwNjY0NzY5MDkxIiwiY29udGV4dCI6IkFmY04tRXNxR0QyMVpMbHkwdlhERFNndGlMamEyTzh1eW5oa3RWUkU2M0R1b2pWRDlVWGhDZE5HbDk2ZEJTN2tHbGdfcUpRellmVmhGUjFTREhRTVlzRnB1Y0VMZlRhZmVUTm5udVl3RHRFX1hGS0NRUUIxY2xPUWlBLUxBY25ZV05lQl9HT3N1UWhpLWl2LTFYRUhxMU1xcHciLCJzb3VyY2UiOiJGQl9QYWdlIiwiYXBwIjoiZmFjZWJvb2siLCJlbnRyeV9wb2ludCI6InBhZ2VfY3RhIn0.LgxgM9wEllIT7HL5PlDfvscTzkZOyLKfRnUvwDUQDvDUxFShoWWbHougyHjr0tFz3E38fX8e0bnTUpya-P0mXW&fbclid=IwY2xjawQo9ShleHRuA2FlbQIxMABicmlkETAxWW9KQlEwdFRtWjVsSmdhc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHm20Lw8hPwP0BkS0-kvrzhVm581fF10FntyC5-3LdNeVEap4xxg1AhF19mCe_aem_TYKjMTCG48V95ufM0NEiEA" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btnWP"
            >
              Contactar por WP
            </a>
          </div>

          <div className="cardDireccion">
            <h3>Dirección</h3>
            <p>Puntarenas, Heredia</p>
          </div>

          <div className="mapa">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
              alt="mapa"
            />
            <div className="mapaTexto">
              <p>NUESTRA UBICACIÓN</p>
              <h4>Puntarenas, Heredia</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RedireccionContactos;