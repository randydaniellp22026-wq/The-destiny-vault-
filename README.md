# Importadora SAVS - The Destiny Vault 🚗💨

## 📝 Descripción General
**Importadora SAVS (The Destiny Vault)** es una plataforma web moderna y robusta diseñada para la gestión y visualización de un catálogo de vehículos de importación, específicamente desde Corea y otros mercados hacia Costa Rica. La aplicación ofrece una experiencia de usuario premium, permitiendo a los clientes explorar inventarios, calcular financiamientos, y gestionar sus perfiles, mientras proporciona a los administradores herramientas completas para la gestión del negocio.

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 19 & Vite**: Motor principal para una interfaz rápida y reactiva.
- **React Router Dom 7**: Gestión de navegación y rutas protegidas.
- **Lucide React**: Biblioteca de iconos vectoriales para una estética moderna.
- **Vanilla CSS**: Sistema de estilos personalizado basado en variables de CSS para temas y diseño responsivo.
- **SweetAlert2**: Notificaciones y alertas interactivas estéticas.
- **Recharts**: Visualización de datos estadísticos en el panel administrativo.
- **EmailJS**: Integración para el envío de correos electrónicos desde formularios de contacto.
- **Motion (Framer Motion)**: Biblioteca de animaciones avanzadas para transiciones, efectos como `ShimmerText` y micro-animaciones fluidas.

### Backend (Simulado)
- **JSON Server**: API REST falsa que corre sobre un archivo `db.json`, permitiendo persistencia de datos durante el desarrollo.

---

## 📁 Estructura del Proyecto (Arquitectura Técnica)

### 1. `src/routes`: Distribución de Navegación
La lógica de rutas reside en `AppRoutes.jsx`. Utiliza componentes de protección como `AdminRoute.jsx` para restringir el acceso al panel administrativo basado en el rol del usuario (`admin` o `gerente`).

### 2. `src/pages`: Vistas Principales
Las páginas se han organizado de forma modular:
- **`homepage/`**: Contiene `Home.jsx` y `HomeLogica.jsx`. Gestiona la landing page, secciones de experiencia, marcas y destacados del catálogo.
- **`catalogpage/`**: Contiene `Catalog.jsx`. Implementa el inventario completo con filtros avanzados.
- **`VehicleDetails/`**: Vista detallada de cada auto, galería de imágenes y especificaciones técnicas.
- **`admin/`**: Versión completa del Dashboard administrativo, gestión de usuarios, solicitudes y creación de vehículos.

### 3. `src/components`: Componentes Modulares
El sistema se divide en más de 15 categorías de componentes, incluyendo:
- **`layout/` & `footer/`**: Estructura global.
- **`Navbar/`**: Barra de navegación inteligente con búsqueda global, animaciones y gestión de sesión.
- **`CreditSimulator/`**: Herramienta interactiva para cálculos financieros.
- **`admin/`**: Sidebar, layouts y tablas específicas para la gestión.
- **`CatalogoDeVehiculos/`**: Componentes reutilizables para mostrar tarjetas de vehículos y filtros.
- **`Chatbot/`**: Asistente virtual flotante para soporte automatizado integrado con WhatsApp.

### 4. `src/hooks`: Lógica Compartida
- `useNavbar.js`: Controla el estado del buscador, apertura de menús y autenticación.
- `useVehicleFavorites.js`: Gestiona la persistencia de los favoritos de cada usuario en el servidor.

---

## 📊 Modelo de Datos (db.json)
El sistema gestiona cinco colecciones principales:
- **`vehicles`**: Datos técnicos, precios, etiquetas de disponibilidad e imágenes.
- **`users`**: Perfiles con roles, credenciales, favoritos y datos de ubicación.
- **`requests`**: Solicitudes de contacto y cotizaciones.
- **`reviews`**: Comentarios verificados de clientes con calificación.
- **`settings`**: Configuración global del sitio (sedes, teléfonos, logos de marcas).

---

## 🚀 Funcionalidades Clave

### 🏠 Inicio Dinámico
- Carrusel infinito de marcas asociadas con efectos fluidos.
- Secciones de "Bestias del asfalto", "Poco Kilometraje" y más, filtradas automáticamente por lógica de negocio en el frontend.

### 🔍 Inventario Inteligente y Dinámico
- Vista detallada de vehículos (`VehicleDetails`) **100% dinámica**: especificaciones técnicas, rendimiento, galerías e íconos de características provenientes directamente de la base de datos (eliminación total de datos fijos/hardcodeados).
- Filtros avanzados por tipo de vehículo (SUV, Sedán, Pick-up, etc.), marca y rango de precios.

### 👤 Área de Usuario y Perfil
- Registro y login seguro adaptado al diseño de la marca.
- Perfil personal donde el cliente puede gestionar favoritos, ver su información de contacto y añadir su ubicación exacta usando selectores de provincias de Costa Rica.

### 🚢 Seguimiento de Importaciones (Tracking)
- Panel en tiempo real para clientes mostrando la etapa de importación de su vehículo.
- **4 etapas definidas**: Compra Realizada, En Tránsito, En Aduanas y Entrega Final.
- Barra de progreso visual y notificaciones de fecha estimada, barco/naviera y ubicación actual.

### 🤖 Asistente Virtual (Chatbot)
- Bot conversacional integrado directamente en la interfaz.
- Respuestas automáticas guiadas para métodos de pago, vehículos como parte de pago (trade-in) y búsqueda por marcas.
- Derivación fluida a WhatsApp de ventas con mensaje personalizado para atención humana directa.

### ⚙️ Panel Administrativo Robusto (Portal SAVS)
- **Seguimiento (Tracking Admin)**: Nueva interfaz dedicada para que gerentes y admins actualicen los estados de importación de todos los clientes de manera centralizada.
- **Gestión Total**: CRUD de vehículos, revisión de reviews pendientes, administración de roles de usuarios y control de solicitudes de contacto.

---

## 🛡️ Estabilidad y Validaciones Estrictas

Para evitar errores humanos y asegurar la integridad de los datos en la base de datos:
- **Validación Global de Inputs**: Todos los formularios están blindados a nivel global (DOM) interceptando eventos de tipeo y pegado (`keydown`/`paste`).
- **Control Numérico Perfecto**: Las calculadoras financieras y los precios no permiten números negativos, letras ni símbolos matemáticos de notación (`e`, `E`, `+`).
- **Protección de Caracteres**: Bloqueo estricto del símbolo guion (`-`) en todos los campos textuales y numéricos, permitiéndose **únicamente** en los números de teléfono.

---

## 🔧 Instalación y Ejecución

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Levantar el servidor de datos (Backend)**:
   ```bash
   npx json-server --watch db.json --port 5000
   ```

3. **Ejecutar la aplicación (Frontend)**:
   ```bash
   npm run dev
   ```

---

## 📱 Diseño Responsivo
La aplicación utiliza un sistema de `Navbar` híbrido que se transforma en un "Drawer" (menú lateral) en dispositivos móviles, asegurando que la navegación y el simulador de crédito sean accesibles en cualquier pantalla.

---
**Desarrollado para Importadora SAVS - Calidad y Confianza en cada kilómetro.**
