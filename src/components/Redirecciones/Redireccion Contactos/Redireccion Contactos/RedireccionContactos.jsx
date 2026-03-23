import React, { useState } from "react";
import { useRedireccionContactosLogica } from "./RedireccionContactosLogica";
import { Calculator, Clock } from 'lucide-react';
import { useNavigate, Link } from "react-router-dom";
import "./DiseñoContacto.css";

function RedireccionContactos() {
  const { formData, loading, handleChange, sendEmail } = useRedireccionContactosLogica();
  const navigate = useNavigate();
  const [activeMap, setActiveMap] = useState('heredia');

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
            placeholder="Ej. +506 72617462" 
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

          <div className="cardInfo">
            <h3>Horarios</h3>
            <p>Lunes a Sábado: 8:00 AM - 6:00 PM<br/>Domingos: CERRADO</p>
          </div>

          <div className="cardInfo wp-card-highlight">
            <h3>Chat Directo</h3>
            <a 
              href="https://api.whatsapp.com/send?phone=%2B50664769091&token=eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyNSJ9.eyJleHAiOjE3NzQwMjAzODQsInBob25lIjoiKzUwNjY0NzY5MDkxIiwiY29udGV4dCI6IkFmY04tRXNxR0QyMVpMbHkwdlhERFNndGlMamEyTzh1eW5oa3RWUkU2M0R1b2pWRDlVWGhDZE5HbDk2ZEJTN2tHbGdfcUpRellmVmhGUjFTREhRTVlzRnB1Y0VMZlRhZmVUTm5udVl3RHRFX1hGS0NRUUIxY2xPUWlBLUxBY25ZV05lQl9HT3N1UWhpLWl2LTFYRUhxMU1xcHciLCJzb3VyY2UiOiJGQl9QYWdlIiwiYXBwIjoiZmFjZWJvb2siLCJlbnRyeV9wb2ludCI6InBhZ2VfY3RhIn0.LgxgM9wEllIT7HL5PlDfvscTzkZOyLKfRnUvwDUQDvDUxFShoWWbHougyHjr0tFz3E38fX8e0bnTUpya-P0mXW&fbclid=IwY2xjawQo9ShleHRuA2FlbQIxMABicmlkETAxWW9KQlEwdFRtWjVsSmdhc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHm20Lw8hPwP0BkS0-kvrzhVm581fF10FntyC5-3LdNeVEap2xxg1AhF19mCe_aem_TYKjMTCG48V95ufM0NEiEA" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btnWP"
            >
              Contactar por WP
            </a>
          </div>

          <div className="cardDireccion">
            <h3>Dirección</h3>
            <p>Heredia: Edificio Boulevard Cariari, 2do Piso.<br/>Puntarenas: Sucursal Importadora SAVS, Chacarita.</p>
          </div>

          <div className="mapa-interactivo-container" style={{ marginTop: '2rem', padding: '1.5rem', background: '#111', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#eab308', fontSize: '1.3rem', letterSpacing: '0.5px' }}>Ubicación de nuestras Sucursales</h3>
            
            <div className="mapa-tabs" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => setActiveMap('heredia')}
                style={{
                  padding: '10px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s',
                  background: activeMap === 'heredia' ? '#eab308' : 'rgba(255,255,255,0.05)',
                  color: activeMap === 'heredia' ? '#000' : '#fff',
                  border: activeMap === 'heredia' ? 'none' : '1px solid rgba(255,255,255,0.2)',
                  fontSize: '0.95rem'
                }}
              >
                📍 Sede Heredia
              </button>
              <button 
                onClick={() => setActiveMap('puntarenas')}
                style={{
                  padding: '10px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s',
                  background: activeMap === 'puntarenas' ? '#eab308' : 'rgba(255,255,255,0.05)',
                  color: activeMap === 'puntarenas' ? '#000' : '#fff',
                  border: activeMap === 'puntarenas' ? 'none' : '1px solid rgba(255,255,255,0.2)',
                  fontSize: '0.95rem'
                }}
              >
                📍 Sede Puntarenas
              </button>
            </div>

            <div className="mapa-iframe-wrapper" style={{ width: '100%', height: '350px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
              {activeMap === 'heredia' ? (
                <iframe 
                  title="Mapa Heredia"
                  width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" 
                  src="https://maps.google.com/maps?q=9.9819859%2C-84.1593673&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  loading="lazy"
                  allowFullScreen
                />
              ) : (
                <iframe 
                  title="Mapa Puntarenas"
                  width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" 
                  src="https://maps.google.com/maps?q=9.9839446%2C-84.7644265&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  loading="lazy"
                  allowFullScreen
                />
              )}
            </div>
            
            <p style={{ textAlign: 'center', marginTop: '1.2rem', color: '#fff', fontSize: '0.95rem', background: 'rgba(234, 179, 8, 0.1)', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(234, 179, 8, 0.2)' }}>
              {activeMap === 'heredia' 
                ? ' Edificio Boulevard Cariari, 2do Piso, BeWorking, Heredia.' 
                : ' Sucursal Oficial Chacarita, Puntarenas.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RedireccionContactos;
