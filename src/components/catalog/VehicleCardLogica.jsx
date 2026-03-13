import { useState } from 'react';

export const useVehicleCardLogica = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const getTagClass = (tag) => {
    switch(tag) {
      case 'Nuevo': return 'tag-new';
      case 'Recomendado': return 'tag-recommended';
      case 'Oferta': return 'tag-offer';
      default: return 'tag-default';
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
  };

  return {
    isFavorite,
    getTagClass,
    toggleFavorite
  };
};
