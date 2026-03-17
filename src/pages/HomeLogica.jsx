import dbData from '../../db.json';

export const useHomeLogica = () => {
  const motorCatalogo = dbData.vehicles.slice(0, 3);
  const kilometrajeCatalogo = dbData.vehicles.slice(3, 6);
  const tipoCatalogo = dbData.vehicles.slice(6, 9);
  const anioCatalogo = dbData.vehicles.slice(9, 12);

  return {
    motorCatalogo,
    kilometrajeCatalogo,
    tipoCatalogo,
    anioCatalogo
  };
};
