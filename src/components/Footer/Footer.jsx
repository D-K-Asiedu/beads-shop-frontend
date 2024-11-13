import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          <div className="brand-section">
            <h2>BEAD SHOP</h2>
            <p className="tagline">Crafting beauty, one bead at a time</p>
            <div className="social-icons">
              <a to="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a to="#" aria-label="Pinterest"><i className="fab fa-pinterest"></i></a>
              <a to="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            </div>
          </div>
          
          <div className="footer-grid">
            <div className="footer-section">
              <h3>Explore</h3>
              <ul>
                <li><a to="/">Home</a></li>
                <li><a to="/products">Collections</a></li>
                <li><a to="/workshops">Workshops</a></li>
                <li><a to="/contact">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Customer Care</h3>
              <ul>
                <li><a to="/shipping">Shipping Info</a></li>
                <li><a to="/returns">Returns</a></li>
                <li><a to="/faq">FAQ</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Connect</h3>
              <p className="contact-info">hello@beadshop.com</p>
              <p className="contact-info">+1 (555) 123-4567</p>
              <p className="address">123 Artisan Street<br />Craft City, ST 12345</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2023 Bead Shop | All rights reserved</p>
        <div className="footer-links">
          <a to="/privacy">Privacy Policy</a>
          <a to="/terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;