import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import './AboutHero.css';

const AboutHero = () => {
  return (
    <div className="about-hero">
      <div className="about-hero-content">
        <h2>Our Story</h2>
        <p>Crafting beauty with every bead, creating memories with every piece</p>
        <a to="/about">
          <Button>Discover More</Button>
        </a>
      </div>
    </div>
  );
};

export default AboutHero;
