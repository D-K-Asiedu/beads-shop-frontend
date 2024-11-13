import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Button from '../components/Button/Button';
import ProductCard from '../components/ProductCard/ProductCard';
import HeroSection from '../components/HeroSection/HeroSection';
import WhyChooseUs from '../components/WhyChooseUs/WhyChooseUs';

const Home = () => {
  const handleAddToCart = (productId) => {
    console.log(`Added product ${productId} to cart`);
  };

  return (
    <div className="home">
      <HeroSection />

      <div className='home-main'>

      <WhyChooseUs />

        <div className="featured-products">
          <h2>Best Sellers</h2>
          <div className="product-grid">
            {[1, 2, 3, 4].map((item) => (
              <ProductCard
                key={item}
                image={`/images/product.jpg`}
                title={`Beautiful Bead Set ${item}`}
                price={29.99}
                onAddToCart={() => handleAddToCart(item)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
