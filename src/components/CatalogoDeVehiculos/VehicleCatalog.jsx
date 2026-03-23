import React from 'react';
import { 
  Heart, 
  Gauge, 
  Settings, 
  Droplet, 
  ChevronDown, 
  ChevronUp, 
  Car, 
  DollarSign, 
  Filter 
} from 'lucide-react';
import { useVehicleFavorites } from '../../hooks/useVehicleFavorites';
import { useCatalogoLogica } from './catalogoLogica';
import { useNavigate } from 'react-router-dom';
import './VehicleCatalog.css';

const localImages = import.meta.glob('../../carros/*.{jpg,jpeg,png,webp,avif}', { eager: true, import: 'default' });

const FavoriteButton = ({ vehicleId }) => {
  const { isFavorite, toggleFavorite } = useVehicleFavorites(vehicleId);
  return (
    <button 
      className={`favorite-btn ${isFavorite ? 'active' : ''}`} 
      aria-label="Añadir a favoritos"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(e);
      }}
    >
      <Heart 
        size={20} 
        fill={isFavorite ? '#eab308' : 'none'} 
        color={isFavorite ? '#eab308' : 'white'} 
      />
    </button>
  );
};

const VehicleCatalog = ({ title, vehicles: initialVehicles, showFilters = false }) => {
  const {
    expandedSection,
    activeFilters,
    loading,
    filteredVehicles,
    toggleSection,
    handleInputChange,
    toggleMultiSelect,
    resetFilters
  } = useCatalogoLogica(initialVehicles);
  const navigate = useNavigate();

  const FilterSection = ({ id, title, icon: Icon, children }) => (
    <div className={`filter-section ${expandedSection === id ? 'expanded' : ''}`}>
      <button className="section-header" onClick={() => toggleSection(id)}>
        <div className="section-title-wrapper">
          <Icon size={18} className="section-icon" />
          <span className="section-title">{title}</span>
        </div>
        {expandedSection === id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      <div className="section-content">
        {children}
      </div>
    </div>
  );

  if (loading) return <div className="loading-container"><div className="loader"></div><span>Cargando catálogo...</span></div>;

  return (
    <section className={`vehicle-catalog ${showFilters ? 'with-sidebar' : 'catalog-section'}`}>
      <div className="catalog-header">
        <h2 className="section-title">{title || "Catálogo Premium"}</h2>
        {showFilters && <p className="results-text">Mostrando {filteredVehicles.length} vehículos</p>}
      </div>

      <div className="catalog-layout">
        {showFilters && (
          <aside className="catalog-sidebar card-base">
            <div className="filters-header">
              <Filter size={20} />
              <h3>Filtros Especializados</h3>
            </div>

          <FilterSection id="technical" title="Técnicos" icon={Settings}>
            <div className="filter-group">
              <label>Transmisión</label>
              <div className="button-grid">
                {['Manual', 'Automática', 'CVT'].map(t => (
                  <button key={t} className={`toggle-btn ${activeFilters.transmission.includes(t) ? 'active' : ''}`} onClick={() => toggleMultiSelect('transmission', t)}>{t}</button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <label>Combustible</label>
              <div className="button-grid">
                {['Gasolina', 'Diésel', 'Híbrido', 'Eléctrico'].map(f => (
                  <button key={f} className={`toggle-btn ${activeFilters.fuelType.includes(f) ? 'active' : ''}`} onClick={() => toggleMultiSelect('fuelType', f)}>{f}</button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <label>Tracción</label>
              <div className="button-grid">
                {['4x4', 'AWD', 'Delantera', 'Trasera'].map(d => (
                  <button key={d} className={`toggle-btn ${activeFilters.drivetrain.includes(d) ? 'active' : ''}`} onClick={() => toggleMultiSelect('drivetrain', d)}>{d}</button>
                ))}
              </div>
            </div>
          </FilterSection>

          <FilterSection id="vehicle" title="Vehículo" icon={Car}>
            <div className="filter-row">
              <div className="filter-group half"><label>Marca</label><input type="text" name="make" placeholder="BMW" value={activeFilters.make} onChange={handleInputChange} /></div>
              <div className="filter-group half"><label>Modelo</label><input type="text" name="model" placeholder="M4" value={activeFilters.model} onChange={handleInputChange} /></div>
            </div>
            <div className="filter-group">
              <label>Body Type</label>
              <div className="button-grid">
                {['Sedan', 'SUV', 'Hatchback', 'Pickup', 'Coupé'].map(b => (
                  <button key={b} className={`toggle-btn ${activeFilters.bodyType.includes(b) ? 'active' : ''}`} onClick={() => toggleMultiSelect('bodyType', b)}>{b}</button>
                ))}
              </div>
            </div>
          </FilterSection>

          <FilterSection id="purchase" title="Compra" icon={DollarSign}>
            <div className="filter-group">
              <label>Rango de Precio</label>
              <div className="filter-row">
                <input type="number" name="minPrice" placeholder="Mín" value={activeFilters.minPrice} onChange={handleInputChange} />
                <input type="number" name="maxPrice" placeholder="Máx" value={activeFilters.maxPrice} onChange={handleInputChange} />
              </div>
            </div>
            <div className="checkbox-grid">
              <label className="checkbox-item"><input type="checkbox" name="financing" checked={activeFilters.financing} onChange={handleInputChange} /><span>Financiamiento</span></label>
              <label className="checkbox-item"><input type="checkbox" name="accidentHistory" checked={activeFilters.accidentHistory} onChange={handleInputChange} /><span>Sin Accidentes</span></label>
              <label className="checkbox-item"><input type="checkbox" name="singleOwner" checked={activeFilters.singleOwner} onChange={handleInputChange} /><span>Único Dueño</span></label>
            </div>
          </FilterSection>

          <button className="btn btn-secondary reset-btn" onClick={resetFilters}>Limpiar Filtros</button>
          </aside>
        )}

        <main className={`catalog-main ${!showFilters ? 'full-width' : ''}`}>
          {filteredVehicles.length > 0 ? (
            <div className="catalog-grid">
              {filteredVehicles.map((car) => {
                const imageSrc = localImages[car.image] || car.image;
                return (
                <div key={car.id} className="card vehicle-card">
                  <div className="vehicle-image-container">
                    <img src={imageSrc} alt={car.name} className="vehicle-image" referrerPolicy="no-referrer" />
                    <div className="vehicle-tag" style={{ backgroundColor: car.tagColor }}>{car.tag}</div>
                    <FavoriteButton vehicleId={car.id} />
                  </div>
                  <div className="vehicle-info">
                    <h3 className="vehicle-name">{car.type} - {car.name}</h3>
                    <p className="vehicle-meta">{car.type} • {car.year} • {car.fuel}</p>
                    <div className="vehicle-specs-grid">
                      <div className="spec-item"><Gauge size={16} className="spec-icon" /><span>{car.mileage}</span></div>
                      <div className="spec-item"><Settings size={16} className="spec-icon" /><span>{car.transmission}</span></div>
                      <div className="spec-item"><Droplet size={16} className="spec-icon" /><span>{car.color}</span></div>
                    </div>
                    <div className="vehicle-footer">
                      <span className="vehicle-price">₡{car.price.toLocaleString('es-CR')}</span>
                      <button className="btn btn-primary btn-details" onClick={() => navigate(`/details/${car.id || 'default'}`, { state: { vehicle: car } })}>Detalles</button>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          ) : (
            <div className="no-results card-base">
              <h3>No se encontraron vehículos</h3>
              <p>Intenta ajustar los filtros para encontrar tu vehículo ideal.</p>
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

export default VehicleCatalog;
