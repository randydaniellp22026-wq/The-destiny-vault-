import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-left">
          <h2 className="footer-brand">Gestionadora de Créditos</h2>
          <p className="footer-copy">© 2026 Todos los derechos reservados. Tu confianza, nuestro motor.</p>
        </div>
        
        <div className="footer-social">
          <a href="#" className="social-icon" aria-label="Facebook"><Facebook size={20} /></a>
          <a href="#" className="social-icon" aria-label="Twitter"><Twitter size={20} /></a>
          <a href="#" className="social-icon" aria-label="Instagram"><Instagram size={20} /></a>
          <a href="#" className="social-icon" aria-label="LinkedIn"><Linkedin size={20} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
