import { useState, useEffect } from 'react';

/**
 * Hook para gestionar los favoritos de un vehículo específico.
 * @param {string|number} vehicleId 
 */
export const useVehicleFavorites = (vehicleId) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(vehicleId));
  }, [vehicleId]);

  const toggleFavorite = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favorites.includes(vehicleId)) {
      favorites = favorites.filter(id => id !== vehicleId);
      setIsFavorite(false);
    } else {
      favorites.push(vehicleId);
      setIsFavorite(true);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  return { isFavorite, toggleFavorite };
};
