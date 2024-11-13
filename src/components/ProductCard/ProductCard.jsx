import React, { useState } from 'react';
import Button from '../Button/Button';
import './ProductCard.css';

const ProductCard = ({ image, title, price, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-card__image-container">
        <img src={image} alt={title} className="product-card__image" />
        <div className={`product-card__overlay ${isHovered ? 'visible' : ''}`}>
          <Button 
            onClick={onAddToCart}
            variant="primary"
            className="product-card__button"
          >
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="product-card__content">
        <h3 className="product-card__title">{title}</h3>
        <p className="product-card__price">${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;