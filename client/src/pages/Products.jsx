import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listProducts, addToCart } from '../api.js';
import ProductCard from '../components/ProductCard.jsx';

export default function Products() {
  const [data, setData] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => { 
    listProducts()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  const goToProducts = () => {
    navigate('/products-list');
  };

  const goToRegister = () => {
    navigate('/register');
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <div className="homepage-header">
        <h1>Welcome to E-Shop</h1>
        <p>Discover amazing products at great prices. Shop with confidence and enjoy fast, secure delivery.</p>
        <div className="homepage-cta-buttons">
          <button onClick={goToProducts} className="btn btn-primary btn-large">
            Shop Now
            <svg className="arrow-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </button>
          <button onClick={goToRegister} className="btn btn-outline btn-large">
            Join Today
          </button>
        </div>
      </div>
      
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon wide-selection">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
          <h3>Wide Selection</h3>
          <p>Browse thousands of products across multiple categories to find exactly what you need</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon quality-products">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <h3>Quality Products</h3>
          <p>All our products are carefully selected and verified to ensure the highest quality standards</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon customer-support">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 1z"/>
            </svg>
          </div>
          <h3>Customer Support</h3>
          <p>Our dedicated support team is here to help you with any questions or concerns</p>
        </div>
      </div>
      
      <div className="cta-card">
        <h2>Ready to Start Shopping?</h2>
        <p>Join thousands of satisfied customers and discover your new favorite products today.</p>
        <button onClick={goToProducts} className="btn btn-primary btn-large">
          Browse Products
          <svg className="arrow-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </svg>
        </button>
      </div>
    </>
  );
}


