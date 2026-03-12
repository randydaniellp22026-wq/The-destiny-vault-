import React from 'react';
import { BookOpen } from 'lucide-react';
import './Glossary.css';

const Glossary = () => {
  const terms = [
    {
      term: 'Cilindrada',
      definition: 'Volumen total de aire en los cilindros del motor.'
    },
    {
      term: 'Turbocompresor',
      definition: 'Sistema de inducción forzada que aumenta la potencia.'
    },
    {
      term: 'DOHC',
      definition: 'Doble árbol de levas a la cabeza para mejor control.'
    }
  ];

  return (
    <aside className="technical-glossary card-base">
      <div className="glossary-header">
        <div className="glossary-icon">
          <BookOpen size={20} />
        </div>
        <h3 className="glossary-title">Glosario Técnico</h3>
      </div>
      
      <div className="glossary-list">
        {terms.map((item, index) => (
          <div key={index} className="glossary-item">
            <h4 className="glossary-term">{item.term}</h4>
            <p className="glossary-definition">{item.definition}</p>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Glossary;
