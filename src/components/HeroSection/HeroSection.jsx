import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Welcome to Beads & Beyond</h1>
        <p>Discover our handcrafted collection of unique beads and jewelry</p>
        <a to="/shop" className="shop-now-btn">Shop Now</a>
      </div>
    </div>
  );
};

export default HeroSection;
