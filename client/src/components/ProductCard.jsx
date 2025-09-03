import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createProductSlug } from '../utils/slugify.js';

export default function ProductCard({ p, onAdd, user }) {
  const productSlug = createProductSlug(p.title, p._id);
  const navigate = useNavigate();
  
  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    onAdd(p._id);
  };
  
  return (
    <div className="card">
      <Link to={`/product/${productSlug}`} className="card-image-link">
        <img src={p.image} alt={p.title} />
      </Link>
      <div className="card-content">
        <div className="card-category-tag">{p.productCategory}</div>
        <h3 className="card-title">
          <Link to={`/product/${productSlug}`}>{p.title}</Link>
        </h3>
        <p className="card-description">{p.description}</p>
        <p className="card-price">${(p.price/100).toFixed(2)}</p>
        <div className="card-actions">
          <Link to={`/product/${productSlug}`} className="btn btn-outline">View Details</Link>
          <button 
            onClick={handleAddToCart} 
            className="btn btn-primary"
          >
            <svg className="cart-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}


