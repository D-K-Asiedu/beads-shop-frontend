import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Artisan Jewelry",
      subtitle: "2024 Collection",
      description: "Elevate your style with handcrafted pieces",
      image: "/images/slide1.jpg",
    },
    {
      title: "Luxury Beads",
      subtitle: "Limited Edition",
      description: "Where elegance meets craftsmanship",
      image: "/images/slide2.jpg",
    },
    {
      title: "Bespoke Designs",
      subtitle: "Exclusive Pieces",
      description: "Your vision, our creation",
      image: "/images/slide3.jpg",
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-section">
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="overlay"></div>
          <div className="hero-content">
            <div className="slide-number">0{index + 1}</div>
            <h2 className="subtitle">{slide.subtitle}</h2>
            <h1>{slide.title}</h1>
            <p>{slide.description}</p>
            <a to="/shop" className="shop-now-btn">
              Explore Collection
              <span className="btn-line"></span>
            </a>
          </div>
        </div>
      ))}
      <div className="progress-bar">
        <div 
          className="progress" 
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default HeroSection;