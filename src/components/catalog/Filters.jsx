import React, { useState } from 'react';
import './Filters.css';

const Filters = () => {
  const [activeYear, setActiveYear] = useState('2024');

  const years = ['2024', '2023', '2022', '< 2021'];
  
  const mileageRanges = [
    { label: 'Nuevo / Re-estrene (0 - 5,000 km)', count: 24 },
    { label: 'Semi-nuevos A (5,001 - 25,000 km)', count: 56 },
    { label: 'Semi-nuevos B (25,001 - 60,000 km)', count: 31 }
  ];

  return (
    <div className="filters-container">
      <div className="filters-grid">
        
        {/* Mileage Filters */}
        <div className="filter-group">
          <h4 className="filter-title">Rangos de Kilometraje</h4>
          <div className="mileage-options">
            {mileageRanges.map((range, index) => (
              <label key={index} className="checkbox-label">
                <input type="checkbox" className="custom-checkbox" />
                <span className="checkbox-text">{range.label}</span>
                <span className="count-badge">{range.count}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Year Filters */}
        <div className="filter-group year-group border-left">
          <h4 className="filter-title">Años de Producción</h4>
          <div className="year-options">
            {years.map((year) => (
              <button 
                key={year}
                className={`year-btn ${activeYear === year ? 'active' : ''}`}
                onClick={() => setActiveYear(year)}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Filters;
