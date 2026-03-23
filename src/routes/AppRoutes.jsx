import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import VehicleDetails from '../pages/VehicleDetails/VehicleDetails';
import RegistroUsuarios from '../components/RegistroDeUsuarios/RegistroUsuarios';
import LoginVista from '../components/login/LoginVista';
import RedireccionContactos from '../components/Redirecciones/Redireccion Contactos/Redireccion Contactos/RedireccionContactos';
import RedireccionModeloAuto from '../components/Redirecciones/RedireccionModeloAuto/RedireccionModeloAuto/RedireccionModeloAuto';
import CreditSimulator from '../components/CreditSimulator/CreditSimulator';
import PerfilUsuarios from '../components/PerfilDeUsuarios/PerfilUsuarios';
import ClienteVendeSuAuto from '../components/ApartadoParaQueElClienteVendaSuAuto/ClienteVendeSuAuto';
import Reseñas from '../components/TechnicalGlossary/ApartadoDeReseñas/Reseñas';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/inventory" element={<Catalog />} />
      <Route path="/details" element={<VehicleDetails />} />
      <Route path="/details/:id" element={<VehicleDetails />} />
      <Route path="/register" element={<RegistroUsuarios />} />
      <Route path="/login" element={<LoginVista />} />
      <Route path="/contact" element={<RedireccionContactos />} />
      <Route path="/modelAuto" element={<RedireccionModeloAuto />} />
      <Route path="/simulate-credit" element={<CreditSimulator />} />
      <Route path="/perfil" element={<PerfilUsuarios />} />
      <Route path="/vender-auto" element={<ClienteVendeSuAuto />} />
      <Route path="/reseñas" element={<Reseñas />} />
      <Route path="/reviews" element={<Reseñas />} />
    </Routes>
  );
};

export default AppRoutes;
