import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Car, 
  Ship, 
  FileText, 
  DollarSign, 
  Calculator, 
  ArrowRight,
  ChevronRight,
  Info,
  CreditCard
} from 'lucide-react';
import { useCreditSimulatorLogica } from './CreditSimulatorLogica';
import './CreditSimulator.css';

// Pre-load images outside the component for performance and to avoid re-renders
const localImages = import.meta.glob('../../carros/*.{jpg,jpeg,png,webp,avif}', { eager: true, import: 'default' });

const CreditSimulator = () => {
  const {
    vehicles,
    selectedVehicle,
    loading,
    shipping,
    insurance,
    downPaymentPerc,
    termMonths,
    calculations,
    handleVehicleSelect,
    setTermMonths
  } = useCreditSimulatorLogica();

  const location = useLocation();

  useEffect(() => {
    const passedVehicle = location.state?.selectedVehicle;
    // When vehicles are fully loaded and a passed vehicle exists, auto-select it.
    if (passedVehicle && vehicles.length > 0) {
      handleVehicleSelect(passedVehicle.id);
      
      // We clear the location state via history replace to prevent re-triggering on future internal navigations
      window.history.replaceState({}, document.title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicles.length, location.state?.selectedVehicle]);

  // Helper for CRC display
  const formatCRC = (val) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(val);
  const formatUSD = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  if (loading) return <div className="loading-container"><div className="loader"></div><span>Cargando vehículos...</span></div>;

  return (
    <div className="simulator-page">
      <div className="container">
        <header className="simulator-header">
          <div className="header-badge">
            <Calculator size={16} />
            <span>Simulador de Crédito "Llave en Mano"</span>
          </div>
          <h1>Importa tu vehículo desde Corea</h1>
          <p>La calculadora automática de SAVS para importaciones.</p>
        </header>

        <div className="simulator-body">
          <div className="main-layout">
            <section className="form-card card-base">
              <div className="step-section">
                <div className="section-intro">
                  <div className="icon-box"><Car /></div>
                  <h3>Paso 1: ¿Cuál auto te gusta?</h3>
                </div>

                <div className="input-group full">
                  <label>Vehículo del Catálogo</label>
                  <div className="input-wrapper">
                    <select 
                      className="simulator-select" 
                      onChange={(e) => handleVehicleSelect(e.target.value)}
                      value={selectedVehicle?.id || ""}
                    >
                      <option value="">Selecciona un vehículo...</option>
                      {vehicles.slice().sort((a,b) => a.name.localeCompare(b.name)).map(v => (
                        <option key={v.id} value={v.id}>
                          {v.name} ({v.year}) - {formatCRC(v.price)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {selectedVehicle && (
                  <div className="vehicle-mini-preview">
                    <img src={localImages[selectedVehicle.image] || selectedVehicle.image} alt={selectedVehicle.name} />
                    <div className="v-info">
                      <h4>{selectedVehicle.name}</h4>
                      <p>{selectedVehicle.motor} • {selectedVehicle.transmission}</p>
                      <p>Vía Marítima desde Corea</p>
                    </div>
                  </div>
                )}

                <div className="divider" />

                <div className="section-intro">
                  <div className="icon-box"><Ship /></div>
                  <h3>Paso 2: Datos de Importación (Automático)</h3>
                </div>

                <div className="input-row">
                  <div className="input-group">
                    <label>Flete Marítimo (Pusan - Moín)</label>
                    <div className="input-wrapper disabled">
                      <span className="prefix">$</span>
                      <input 
                        type="number" 
                        value={shipping} 
                        readOnly
                        disabled
                      />
                    </div>
                    <small>Calculado según el tamaño del auto.</small>
                  </div>
                  <div className="input-group">
                    <label>Seguro de Carga</label>
                    <div className="input-wrapper disabled">
                      <span className="prefix">$</span>
                      <input 
                        type="number" 
                        value={insurance} 
                        readOnly
                        disabled
                      />
                    </div>
                    <small>1.5% del valor FOB automático.</small>
                  </div>
                </div>

                <div className="divider" />

                <div className="section-intro">
                  <div className="icon-box"><CreditCard /></div>
                  <h3>Paso 3: Financiamiento Bancario</h3>
                </div>

                <div className="input-row">
                  <div className="input-group">
                    <label>Prima (%)</label>
                    <div className="input-wrapper disabled">
                      <input 
                        type="number" 
                        value={downPaymentPerc} 
                        readOnly
                        disabled
                      />
                      <span className="suffix">%</span>
                    </div>
                    <small>Prima mínima fija del 20%.</small>
                  </div>
                  <div className="input-group">
                    <label>Plazo (Meses)</label>
                    <div className="term-container">
                      <select 
                        className="simulator-select" 
                        value={termMonths} 
                        onChange={(e) => setTermMonths(parseInt(e.target.value))}
                      >
                        {[12, 24, 36, 48, 60, 72, 84, 96].map(m => (
                          <option key={m} value={m}>{m} meses</option>
                        ))}
                      </select>
                      <span className="term-years-badge">
                        {Math.floor(termMonths / 12)} {termMonths / 12 === 1 ? 'Año' : 'Años'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-footer">
                <button className="btn btn-primary full-btn" onClick={() => window.print()}>Exportar Cotización como PDF <ArrowRight /></button>
              </div>
            </section>

            <aside className="totals-sidebar">
              <div className="totals-card card-base">
                <h4 className="card-title">Resumen SAVS</h4>
                
                <div className="line-item">
                  <span>Precio FOB Corea</span>
                  <strong>{formatCRC(calculations.priceFob)}</strong>
                </div>
                <div className="line-item">
                  <span>Transporte Pusan - Costa Rica</span>
                  <strong>{formatUSD(shipping + insurance)}</strong>
                </div>
                <div className="line-item highlight">
                  <span>Subtotal CIF Aduanas</span>
                  <strong>{formatUSD(calculations.cifValue)}</strong>
                </div>

                <div className="divider" />
                
                <div className="line-item tax">
                  <span>Total Impuestos Hacienda</span>
                  <strong>{formatUSD(calculations.totalTaxes)}</strong>
                </div>
                <div className="line-item">
                  <span>Nacionalización (Legal)</span>
                  <strong>$800.00</strong>
                </div>

                <div className="grand-total">
                  <p>Inversión Total Llave en Mano</p>
                  <div className="amount">
                    <strong>{formatCRC(calculations.totalCostCRC)}</strong>
                  </div>
                </div>

                <div className="loan-preview">
                  <div className="loan-header">
                    <Calculator size={18} />
                    <span>Calculadora de Cuota</span>
                  </div>
                  <div className="monthly-payment">
                    <p>Cuota Mensual Estimada</p>
                    <h3>{formatCRC(calculations.monthlyPayment)}</h3>
                  </div>
                </div>
              </div>

              <div className="helper-box">
                <Info size={16} />
                <p>Las tasas de impuestos son estimadas según la ley vigente para autos de menos de 10 años.</p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditSimulator;
