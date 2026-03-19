import { useState, useEffect } from 'react';

const API_URL = 'http://127.0.0.1:5000';

export const useHomeLogica = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/vehicles`)
      .then(res => res.json())
      .then(data => setVehicles(data || []))
      .catch(err => console.error("Error loading home vehicles:", err));
  }, []);

  const motorCatalogo = vehicles.slice(0, 3);
  const kilometrajeCatalogo = vehicles.slice(3, 6);
  const tipoCatalogo = vehicles.slice(6, 9);
  const anioCatalogo = vehicles.slice(9, 12);

  return {
    motorCatalogo,
    kilometrajeCatalogo,
    tipoCatalogo,
    anioCatalogo
  };
};
