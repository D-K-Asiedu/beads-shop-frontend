import React from 'react';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const features = [
    {
      icon: 'fas fa-truck-fast',
      title: 'Free Shipping',
      description: 'On orders over $50',
      animation: 'slide-right'
    },
    {
      icon: 'fas fa-gem',
      title: 'Quality Products',
      description: 'Handpicked selection',
      animation: 'slide-up'
    },
    {
      icon: 'fas fa-headset',
      title: '24/7 Support',
      description: 'Always here to help',
      animation: 'slide-left'
    }
  ];

  return (
    <div className="why-choose-us">
      <h2>Why Choose Us</h2>
      <div className="features">
        {features.map((feature, index) => (
          <div key={index} className={`feature ${feature.animation}`}>
            <div className="icon-wrapper">
              <i className={feature.icon}></i>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
