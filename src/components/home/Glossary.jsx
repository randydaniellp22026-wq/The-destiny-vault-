import React from 'react';
import { useGlossaryLogica } from './GlossaryLogica';
import './Glossary.css';

const Glossary = () => {
  const { terms } = useGlossaryLogica();

  return (
    <aside className="technical-glossary card-base">
      <div className="glossary-header">
        <div className="glossary-icon">
          <BookOpen />
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
