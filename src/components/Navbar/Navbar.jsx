import React, { useState, useEffect } from 'react';
// import { a } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-left">
        <a to="/" className="nav-logo">BEADS & BEYOND</a>
      </div>
      
      <div className={`nav-center ${isOpen ? 'active' : ''}`}>
        <a to="/" onClick={toggleMenu}>Home</a>
        <a to="/shop" onClick={toggleMenu}>Shop</a>
        <a to="/collections" onClick={toggleMenu}>Collections</a>
        <a to="/about" onClick={toggleMenu}>About</a>
        <a to="/contact" onClick={toggleMenu}>Contact</a>
      </div>
      
      <div className="nav-right">
        <div className="nav-icons">
          <a to="/search" className="icon-link">
            <i className="fas fa-search"></i>
          </a>
          <a to="/account" className="icon-link">
            <i className="fas fa-user"></i>
          </a>
          <a to="/cart" className="icon-link">
            <i className="fas fa-shopping-bag"></i>
          </a>
        </div>
      </div>

      <div className="mobile-toggle" onClick={toggleMenu}>
        <span className={`bar ${isOpen ? 'active' : ''}`}></span>
        <span className={`bar ${isOpen ? 'active' : ''}`}></span>
        <span className={`bar ${isOpen ? 'active' : ''}`}></span>
      </div>
    </nav>
  );
};

export default Navbar;