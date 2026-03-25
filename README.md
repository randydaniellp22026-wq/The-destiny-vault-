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
- **`Navbar/`**: Barra de navegación inteligente con búsqueda global y gestión de sesión.
- **`CreditSimulator/`**: Herramienta interactiva para cálculos financieros.
- **`admin/`**: Sidebar, layouts y tablas específicas para la gestión.
- **`CatalogoDeVehiculos/`**: Componentes reutilizables para mostrar tarjetas de vehículos y filtros.

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
- Carrusel infinito de marcas asociadas.
- Secciones de "Bestias del asfalto", "Poco Kilometraje" y más, filtradas automáticamente por lógica de negocio en el frontend.

### 🔍 Inventario Inteligente
- Sistema de búsqueda por texto.
- Filtros por tipo de vehículo (SUV, Sedán, Pick-up, etc.), marca y rango de precios.

### 👤 Área de Usuario
- Registro y login con validaciones de formato.
- Perfil personal donde el usuario puede ver sus favoritos y editar su dirección exacta con dropdowns de provincias de Costa Rica.

### ⚙️ Panel Administrativo (Portal SAVS)
- **Dashboard**: Gráficos de barra que muestran la distribución de vehículos por tipo.
- **Gestión**: CRUD (Crear, Leer, Actualizar, Borrar) de vehículos, revisión de reviews pendientes y control de solicitudes de contacto.

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
