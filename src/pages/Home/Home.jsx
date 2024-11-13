import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Home.css';

const products = [
  {
    id: 1,
    title: "Crystal Beaded Necklace",
    price: 29.99,
    image: "/images/crystal-necklace.jpg"
  },
  {
    id: 2,
    title: "Wooden Bead Bracelet",
    price: 19.99,
    image: "/images/wooden-bracelet.jpg"
  },
  {
    id: 3,
    title: "Glass Bead Set",
    price: 34.99,
    image: "/images/glass-beads.jpg"
  }
];

const Home = () => {
  const handleAddToCart = (productId) => {
    // Cart logic will be implemented here
    console.log(`Added product ${productId} to cart`);
  };

  return (
    <div className="home">
      <h1 className="home__title">Our Collection</h1>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            onAddToCart={() => handleAddToCart(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
