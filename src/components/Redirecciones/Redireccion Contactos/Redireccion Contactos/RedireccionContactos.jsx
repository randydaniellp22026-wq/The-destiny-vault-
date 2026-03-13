import React from "react";
import { useRedireccionContactosLogica } from "./RedireccionContactosLogica";
import "./DiseñoContacto.css";

function RedireccionContactos({ onNavigate }) {
  const { } = useRedireccionContactosLogica();

  return (
    <div className="paginaContacto">

      {/* HEADER */}

      <header className="navbarContacto">
        <div className="logo" onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>Gestionadora de Créditos</div>

        <nav>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Inicio</a>
          <a href="#">Servicios</a>
          <a href="#">Nosotros</a>
          <a className="activo" href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}>Contacto</a>
        </nav>

        <button className="btnAcceso" onClick={() => onNavigate('login')}>Acceso</button>
      </header>


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

        <div className="formulario">

          <h2>Envíanos un mensaje</h2>

          <label>Nombre Completo</label>
          <input type="text" placeholder="Ej. Juan Pérez" />

          <label>Correo Electrónico</label>
          <input type="email" placeholder="ejemplo@correo.com" />

          <label>Teléfono</label>
          <input type="text" placeholder="Ej. +52 (55) 1234-5678" />

          <label>Asunto</label>
          <select>
            <option>Asesoría de crédito</option>
          </select>

          <label>Mensaje</label>
          <textarea placeholder="Escribe tu mensaje aquí..."></textarea>

          <button className="btnEnviar">Enviar Mensaje</button>

        </div>


        {/* INFORMACION */}

        <div className="infoContacto">

          <div className="cardInfo">
            <h3>Teléfono</h3>
            <p>+52 (55) 1234-5678</p>
          </div>

          <div className="cardInfo">
            <h3>Correo</h3>
            <p>contacto@gestionadora.com</p>
          </div>

          <div className="cardDireccion">
            <h3>Dirección</h3>
            <p>
              San Jose, Costa Rica
            </p>
          </div>

          <div className="mapa">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
              alt="mapa"
            />
            <div className="mapaTexto">
              <p>NUESTRA UBICACIÓN</p>
              <h4>San Jose, Costa Rica</h4>
            </div>
          </div>

        </div>

      </div>


      {/* FOOTER */}

      <footer className="footerContacto">

        <div className="footerGrid">

          <div>
            <h3>Gestionadora de Créditos</h3>
            <p>
              Simplificamos el camino hacia tu nuevo vehículo
              con las mejores tasas del mercado.
            </p>
          </div>

          <div>
            <h4>Empresa</h4>
            <p>Sobre nosotros</p>
            <p>Nuestros servicios</p>
            <p>Blog</p>
          </div>

          <div>
            <h4>Soporte</h4>
            <p>Ayuda</p>
            <p>Términos</p>
            <p>Privacidad</p>
          </div>

        </div>

        <p className="copyright">
          © 2026 Gestionadora de Créditos
        </p>

      </footer>

    </div>
  );
}

export default RedireccionContactos;