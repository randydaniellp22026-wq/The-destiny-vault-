import React, { useState, useEffect } from "react";
import { useRedireccionContactosLogica } from "./RedireccionContactosLogica";
import { Clock, MapPin, Phone, Mail, Send, Car } from 'lucide-react';
import { useLocation } from "react-router-dom";
import "./DiseñoContacto.css";

const RedireccionContactos = () => {
  const { formData, loading, handleChange, sendEmail, setFormData } = useRedireccionContactosLogica();
  const [settings, setSettings] = useState(null);
  const [activeMap, setActiveMap] = useState('heredia');
  const location = useLocation();
  const initialVehicle = location.state?.vehicle;

  useEffect(() => {
    // Carga de configuración dinámica
    fetch('http://localhost:5000/settings')
      .then(res => res.ok ? res.json() : null)
      .then(data => setSettings(data))
      .catch(err => console.error("Error fetching settings:", err));

    // Lógica para pre-seleccionar asunto (Test Drive)
    const params = new URLSearchParams(location.search);
    const subjectParam = params.get('subject');
    if (subjectParam) {
      setFormData(prev => ({ ...prev, subject: subjectParam }));
    } else if (initialVehicle) {
      setFormData(prev => ({ ...prev, subject: 'Cotización de vehículo' }));
    }
  }, [location.search, setFormData, initialVehicle]);

  const branchHeredia = settings?.branches?.find(b => b.id === 'heredia') || {
    name: "Sede Heredia",
    location: "Boulevard Cariari, frente a EPA",
    phone: "+506 8888-8888",
    schedule: "L-S: 8am - 6pm",
    map_embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.5855260026214!2d-84.16194218520268!3d9.98198589286378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0fb060411b931%3A0xeab308c10b981!2sBoulevard+Cariari!5e0!3m2!1ses!2scr!4v1711200000000"
  };

  const branchPuntarenas = settings?.branches?.find(b => b.id === 'puntarenas') || {
    name: "Sede Puntarenas",
    location: "Chacarita, Puntarenas",
    phone: "+506 7777-7777",
    schedule: "L-V: 9am - 5pm",
    map_embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.2225!2d-84.7666!3d9.9850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa01bd!2sPuntarenas!5e0!3m2!1ses!2scr!4v1711200000000"
  };

  return (
    <div className="paginaContacto">
      <div style={{ paddingTop: '100px' }}></div>

      <header className="headerContacto">
        <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>Contacta con Importadora SAVS</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '800px' }}>Expertos en importación directa. Tu próximo vehículo de alta gama está a un mensaje de distancia.</p>
      </header>

      <section className="contenidoContacto" style={{ gap: '20px', paddingBottom: '100px', flexWrap: 'nowrap' }}>
        {/* Lado Izquierdo: Formulario */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {initialVehicle && (
            <div style={{ 
              background: '#000', 
              padding: '20px', 
              borderRadius: '12px', 
              border: '1px solid rgba(234, 179, 8, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              animation: 'fadeIn 0.5s ease'
            }}>
              <div style={{ background: '#eab308', padding: '10px', borderRadius: '8px' }}>
                <Car color="#000" size={24} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#eab308', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '1px' }}>Unidad de Interés</p>
                <p style={{ margin: 0, fontSize: '1.2rem', color: '#fff', fontWeight: 700 }}>{initialVehicle.name}</p>
              </div>
            </div>
          )}

          <form className="formulario" onSubmit={sendEmail} style={{ width: '100%', padding: '40px', boxSizing: 'border-box' }}>
            <h2 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '2rem', fontFamily: 'Outfit, sans-serif', fontWeight: 700 }}>
              <Mail style={{ verticalAlign: 'middle', marginRight: '15px' }} color="#eab308" size={32} />
              Redactar Consulta
            </h2>
            
            <input 
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              placeholder="Nombre y Apellidos" 
              required 
              style={{ padding: '16px', fontSize: '1rem', borderRadius: '8px' }}
            />
            
            <input 
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
              type="email" 
              placeholder="Correo Electrónico" 
              required 
              style={{ padding: '16px', fontSize: '1rem', borderRadius: '8px' }}
            />

            <input 
              name="user_phone"
              value={formData.user_phone}
              onChange={handleChange}
              type="tel" 
              placeholder="Número de Teléfono (+506...)" 
              required 
              style={{ padding: '16px', fontSize: '1rem', borderRadius: '8px' }}
            />

            <select 
              name="subject"
              value={formData.subject || ""}
              onChange={handleChange}
              required
              style={{ padding: '16px', fontSize: '1rem', borderRadius: '8px' }}
            >
              <option value="" disabled>Motivo del Contacto</option>
              <option value="Consulta General">Consulta General</option>
              <option value="Test Drive">Programar Test Drive</option>
              <option value="Asesoría de crédito">Asesoría de Crédito</option>
              <option value="Servicio Post-Venta">Servicio Post-Venta</option>
            </select>

            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe detalladamente tu consulta..." 
              required
              style={{ padding: '16px', fontSize: '1rem', height: '180px', borderRadius: '8px' }}
            />

            <button type="submit" className="btnEnviar" disabled={loading} style={{ padding: '18px', fontSize: '1.1rem', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              {loading ? 'Transmitiendo...' : <><Send size={22} /> Enviar Mensaje</>}
            </button>
          </form>
        </div>

        {/* Lado Derecho: Info y Sedes (Expandido) */}
        <div className="infoContacto" style={{ flex: '1.5' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div 
              className={`cardDireccion ${activeMap === 'heredia' ? 'wp-card-highlight' : ''}`}
              onClick={() => setActiveMap('heredia')}
              style={{ cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', padding: '25px' }}
            >
              <h3 style={{ margin: 0, color: '#fff', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.2rem', fontWeight: 700 }}>
                <MapPin size={24} color="#eab308" /> {branchHeredia.name}
              </h3>
              <p style={{ margin: '15px 0', color: '#9ca3af', fontSize: '1rem', lineHeight: '1.5' }}>{branchHeredia.location}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#eab308', fontSize: '0.9rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={14} /> {branchHeredia.phone}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={14} /> {branchHeredia.schedule}</span>
              </div>
            </div>

            <div 
              className={`cardDireccion ${activeMap === 'puntarenas' ? 'wp-card-highlight' : ''}`}
              onClick={() => setActiveMap('puntarenas')}
              style={{ cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', padding: '25px' }}
            >
              <h3 style={{ margin: 0, color: '#fff', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.2rem', fontWeight: 700 }}>
                <MapPin size={24} color="#eab308" /> {branchPuntarenas.name}
              </h3>
              <p style={{ margin: '15px 0', color: '#9ca3af', fontSize: '1rem', lineHeight: '1.5' }}>{branchPuntarenas.location}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#eab308', fontSize: '0.9rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={14} /> {branchPuntarenas.phone}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={14} /> {branchPuntarenas.schedule}</span>
              </div>
            </div>
          </div>

          {/* Mapa Visual */}
          <div className="mapa" style={{ height: '495px', boxShadow: '0 20px 50px rgba(0,0,0,0.7)', border: '1px solid rgba(234, 179, 8, 0.35)', borderRadius: '15px' }}>
             <iframe 
                title="Mapa savs interactivo"
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                src={activeMap === 'heredia' ? branchHeredia.map_embed : branchPuntarenas.map_embed}
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
          </div>
        </div>
      </section>
    </div>
  );
};

export default RedireccionContactos;
