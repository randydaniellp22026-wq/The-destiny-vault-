import React from 'react';
import { Settings, Zap, Compass, Leaf } from 'lucide-react';

export const useEngineeringSpecsLogica = () => {
  const specs = [
    {
      id: 1,
      icon: <Settings className="spec-icon" size={28} />,
      title: 'Motor Híbrido V6',
      description: 'Eficiencia térmica de última generación con 350HP.'
    },
    {
      id: 2,
      icon: <Zap className="spec-icon" size={28} />,
      title: 'Torque Instantáneo',
      description: 'Asistencia eléctrica para una aceleración suave de 0 a 100.'
    },
    {
      id: 3,
      icon: <Compass className="spec-icon" size={28} />,
      title: 'Transmisión Adaptativa',
      description: '8 velocidades con IA para optimizar el consumo de combustible.'
    },
    {
      id: 4,
      icon: <Leaf className="spec-icon" size={28} />,
      title: 'Bajas Emisiones',
      description: 'Certificación Euro 6 para un impacto ambiental reducido.'
    }
  ];

  return {
    specs
  };
};
