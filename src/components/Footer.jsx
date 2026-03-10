import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-left">
          <h2 className="footer-brand">The Destiny Vault</h2>
          <p className="footer-copy">© 2024 The Destiny Vault. Todos los derechos reservados. Tu confianza, nuestro motor.</p>
        </div>
        
       
      </div>
    </footer>
  );
};

export default Footer;
