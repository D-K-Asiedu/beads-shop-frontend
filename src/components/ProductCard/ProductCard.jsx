import React from 'react';
import Button from '../Button/Button';
import './ProductCard.css';

const ProductCard = ({ image, title, price, onAddToCart }) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-card__image" />
      <div className="product-card__content">
        <h3 className="product-card__title">{title}</h3>
        <p className="product-card__price">${price}</p>
        <Button 
          onClick={onAddToCart}
          variant="primary"
          className="product-card__button"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
