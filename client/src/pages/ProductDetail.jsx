import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useOutletContext } from 'react-router-dom';
import { getProduct, addToCart } from '../api.js';
import { extractIdFromSlug } from '../utils/slugify.js';

export default function ProductDetail() {
  const { user, setToast } = useOutletContext();
  const navigate = useNavigate();
  const { slug } = useParams();
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  
  useEffect(() => { 
    const productId = extractIdFromSlug(slug);
    getProduct(productId)
      .then(setP)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setAddingToCart(true);
    try {
      await addToCart(p._id, quantity);
      setToast({ 
        message: `${quantity} ${quantity === 1 ? 'item' : 'items'} added to cart!`, 
        type: 'success' 
      });
      setTimeout(() => setToast(null), 3000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      setToast({ 
        message: 'Failed to add item to cart. Please try again.', 
        type: 'error' 
      });
      setTimeout(() => setToast(null), 3000);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };

  if (loading) return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Loading product details...</p>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <h2>Product Not Found</h2>
      <p>{error}</p>
      <Link to="/products-list" className="btn btn-primary">Back to Products</Link>
    </div>
  );
  
  if (!p) return (
    <div className="error-container">
      <h2>Product Not Found</h2>
      <p>The product you're looking for doesn't exist.</p>
      <Link to="/products-list" className="btn btn-primary">Back to Products</Link>
    </div>
  );
  
  return (
    <div className="product-detail-container">
      {/* Breadcrumb Navigation */}
      <nav className="breadcrumb-nav">
        <div className="container">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/products-list" className="breadcrumb-link">Products</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{p.title}</span>
        </div>
      </nav>

      <div className="">
        <div className="product-detail">
          {/* Product Image Section */}
          <div className="product-image-section">
            <div className={`product-image-container ${isZoomed ? 'zoomed' : ''}`}>
              <img 
                src={p.image} 
                alt={p.title} 
                className={`product-image ${isZoomed ? 'zoomed' : ''}`}
                onClick={handleZoomToggle}
              />
              <div className="product-image-overlay">
                <button className="image-zoom-btn" onClick={handleZoomToggle}>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="zoom-icon">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="product-info-section">
            {/* Category Tag */}
            <div className="product-category-tag">
              {p.productCategory}
            </div>

            {/* Product Title */}
            <h1 className="product-title">{p.title}</h1>

            {/* Product Meta */}
            <div className="product-meta">
              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => {
                    const rating = 4.8; // This should come from product data
                    const starValue = i + 1;
                    const isFullStar = starValue <= Math.floor(rating);
                    const isPartialStar = starValue === Math.ceil(rating) && rating % 1 !== 0;
                    const fillPercentage = isPartialStar ? (rating % 1) * 100 : (isFullStar ? 100 : 0);
                    
                    return (
                      <div key={i} className="star-container">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#d1d5db" className="star star-outline">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                        <svg 
                          viewBox="0 0 24 24" 
                          fill="#fbbf24" 
                          className="star star-fill"
                          style={{ clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` }}
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                      </div>
                    );
                  })}
                </div>
                <span className="rating-text">4.8 (127 reviews)</span>
              </div>
              <div className="product-sku">SKU: {p._id.slice(-8)}</div>
            </div>

            {/* Product Price */}
            <div className="product-price-section">
              <span className="product-currency-symbol">£</span>
              <span className="product-price">{(p.price/100).toFixed(2)}</span>
            </div>

            {/* Product Description */}
            <div className="product-description-section">
              <h3>Description</h3>
              <p className="product-description">{p.description}</p>
            </div>

            {/* Product Details */}
            <div className="product-details">
              <div className="detail-item">
                <span className="detail-label">Category:</span>
                <span className="detail-value">{p.productCategory}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Demographic:</span>
                <span className="detail-value">{p.demographic}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Availability:</span>
                <span className={`detail-value ${p.inventory > 0 ? 'in-stock' : 'out-of-stock'}`}>
                  {p.inventory > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="quantity-section">
              <label htmlFor="quantity" className="quantity-label">Quantity:</label>
              <div className="quantity-selector">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="quantity-btn"
                  disabled={quantity <= 1}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 13H5v-2h14v2z"/>
                  </svg>
                </button>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  max={p.inventory}
                  className="quantity-input"
                />
                <button 
                  onClick={() => setQuantity(Math.min(p.inventory, quantity + 1))}
                  className="quantity-btn"
                  disabled={quantity >= p.inventory}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Product Actions */}
            <div className="product-actions">
              <button 
                onClick={handleAddToCart}
                disabled={p.inventory === 0 || addingToCart}
                className="btn btn-primary btn-large add-to-cart-btn"
              >
                {addingToCart ? (
                  <>
                    <div className="spinner-small"></div>
                    Adding to Cart...
                  </>
                ) : (
                  <>
                    <svg className="cart-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                    </svg>
                    Add to Cart
                  </>
                )}
              </button>
              
              <button className="btn btn-outline btn-large wishlist-btn">
                <svg viewBox="0 0 24 24" fill="currentColor" className="heart-icon">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                Add to Wishlist
              </button>
            </div>

            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="trust-badge">
                <svg viewBox="0 0 24 24" fill="currentColor" className="trust-icon">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                </svg>
                <span>Secure Checkout</span>
              </div>
              <div className="trust-badge">
                <svg viewBox="0 0 24 24" fill="currentColor" className="trust-icon">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>Free Returns</span>
              </div>
              <div className="trust-badge">
                <svg viewBox="0 0 24 24" fill="currentColor" className="trust-icon">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span>Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


