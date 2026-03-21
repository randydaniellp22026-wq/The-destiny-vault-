import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useCatalogoLogica = (initialVehicles) => {
  const location = useLocation();
  const [expandedSection, setExpandedSection] = useState('technical');
  const [activeFilters, setActiveFilters] = useState({
    transmission: [], fuelType: [], drivetrain: [], consumption: '', displacement: '',
    make: '', model: '', bodyType: [], doors: '', seats: '', color: '',
    minPrice: '', maxPrice: '', sellerType: [], financing: false,
    vehicleStatus: [], location: '', conditionRating: [], accidentHistory: false, singleOwner: false
  });

  const [vehicles, setVehicles] = useState(initialVehicles || []);
  const [loading, setLoading] = useState(!initialVehicles);

  // Obtener query de búsqueda de la URL
  const queryParams = new URLSearchParams(location.search);
  const searchQueryParam = queryParams.get('search') || '';

  useEffect(() => {
    if (!initialVehicles) {
      setLoading(true);
      fetch('http://localhost:5000/vehicles')
        .then(res => res.json())
        .then(data => {
          setVehicles(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching vehicles:", err);
          setLoading(false);
        });
    }
  }, [initialVehicles]);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter(car => {
      // Filtro de búsqueda global (Navbar)
      if (searchQueryParam) {
        const query = searchQueryParam.toLowerCase();
        const matchesName = car.name.toLowerCase().includes(query);
        const matchesType = car.type.toLowerCase().includes(query);
        const matchesMake = car.make?.toLowerCase().includes(query);
        if (!matchesName && !matchesType && !matchesMake) return false;
      }

      // Filtros específicos del catálogo
      if (activeFilters.transmission.length > 0 && !activeFilters.transmission.includes(car.transmission)) return false;
      if (activeFilters.fuelType.length > 0 && !activeFilters.fuelType.includes(car.fuel)) return false;
      if (activeFilters.minPrice && car.price < parseInt(activeFilters.minPrice)) return false;
      if (activeFilters.maxPrice && car.price > parseInt(activeFilters.maxPrice)) return false;
      if (activeFilters.make && !car.name.toLowerCase().includes(activeFilters.make.toLowerCase())) return false;
      if (activeFilters.bodyType.length > 0 && !activeFilters.bodyType.includes(car.type)) return false;
      
      return true;
    });
  }, [activeFilters, vehicles, searchQueryParam]);

  const toggleSection = (section) => setExpandedSection(expandedSection === section ? null : section);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setActiveFilters(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const toggleMultiSelect = (category, value) => {
    setActiveFilters(prev => {
      const updatedList = prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value];
      return { ...prev, [category]: updatedList };
    });
  };

  const resetFilters = () => setActiveFilters({
    transmission: [], fuelType: [], drivetrain: [], consumption: '', displacement: '',
    make: '', model: '', bodyType: [], doors: '', seats: '', color: '',
    minPrice: '', maxPrice: '', sellerType: [], financing: false,
    vehicleStatus: [], location: '', conditionRating: [], accidentHistory: false, singleOwner: false
  });

  return {
    expandedSection,
    activeFilters,
    loading,
    filteredVehicles,
    toggleSection,
    handleInputChange,
    toggleMultiSelect,
    resetFilters,
    searchQueryParam
  };
};
