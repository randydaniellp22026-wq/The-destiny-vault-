import React from "react";
import { useRedireccionModeloAutoLogica } from "./RedireccionModeloAutoLogica";
import "./DiseñoRedireccion.css";

function RedireccionModeloAuto({ onNavigate }) {
  const { autos } = useRedireccionModeloAutoLogica();

  return (

<div className="pagina">

{/* HEADER */}

<header className="navbar">

<div className="logo" onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>🚗 GESTIONADORA</div>

<nav>
<a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Inicio</a>
<a href="#" onClick={(e) => { e.preventDefault(); onNavigate('inventory'); }}>Vehículos</a>
<a href="#">Cómo comprar</a>
<a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}>Contacto</a>
</nav>

<button className="loginBtn" onClick={() => onNavigate('login')}>Iniciar Sesión</button>

</header>


{/* TITULO */}

<section className="headerCatalogo">

<p className="subtitulo">CATÁLOGO EXCLUSIVO</p>

<h1>Vehículos disponibles</h1>

<p className="resultado">Resultados para: <b>Toyota 2020</b></p>

</section>


{/* CONTENIDO */}

<div className="contenido">

{/* FILTROS */}

<aside className="filtros">

<h3>Filtrar búsqueda</h3>

<select>
<option>Año</option>
</select>

<select>
<option>Marca</option>
</select>

<select>
<option>Modelo</option>
</select>

<input type="text" placeholder="Precio mínimo"/>

<input type="text" placeholder="Precio máximo"/>

<select>
<option>Transmisión</option>
</select>

<select>
<option>Tipo de combustible</option>
</select>

<button className="btnFiltro">Aplicar filtros</button>

</aside>


{/* AUTOS */}

<section className="autos">

{autos.map(auto => (

<div className="cardAuto" key={auto.id}>

<div className="imgContainer">

<span className="badge">NUEVO</span>

<img src={auto.img} alt="auto"/>

</div>

<div className="infoAuto">

<h3>{auto.marca} {auto.modelo}</h3>

<p className="año">{auto.año}</p>

<div className="datos">

<span>{auto.km}</span>

<span>{auto.transmision}</span>

</div>

<p className="estado">{auto.estado}</p>

<div className="precioRow">

<h2>{auto.precio}</h2>

<button className="btnDetalles">
Ver Detalles
</button>

</div>

</div>

</div>

))}

</section>

</div>


{/* FOOTER */}

<footer className="footer">

<div className="footerGrid">

<div>
<h3>🚗 GESTIONADORA</h3>
<p>
Líderes en financiamiento y gestión
de créditos automotrices en la región.
</p>
</div>

<div>
<h4>Enlaces Rápidos</h4>
<p>Calculadora de Crédito</p>
<p>Preguntas Frecuentes</p>
<p>Términos y Condiciones</p>
</div>

<div>
<h4>Soporte</h4>
<p>Centro de Ayuda</p>
<p>Contacto</p>
<p>Sucursales</p>
</div>

<div>
<h4>Newsletter</h4>
<input placeholder="Tu correo electrónico"/>
<button>Unirse</button>
</div>

</div>

<p className="copyright">
© 2026 Gestionadora de Créditos
</p>

</footer>

</div>
)

}

export default RedireccionModeloAuto