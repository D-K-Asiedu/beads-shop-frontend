import React from 'react';
import './Button.css';

const Button = ({ children, onClick, className = '', variant = 'primary' }) => {
  return (
    <button 
      className={`button ${variant} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
