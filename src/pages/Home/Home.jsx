import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Button from '../../components/Button/Button';
import ProductCard from '../../components/ProductCard/ProductCard';
import HeroSection from '../../components/HeroSection/HeroSection';
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs';
import AboutHero from '../../components/AboutHero/AboutHero';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  const handleAddToCart = (productId) => {
    console.log(`Added product ${productId} to cart`);
  };

  return (
    <div className="home">
      <HeroSection />
      <div className='home-main'>
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
          <AboutHero />
          <WhyChooseUs />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;