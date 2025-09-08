import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createCheckout, getCart } from '../api.js';

export default function Checkout() {
  const [msg, setMsg] = useState('');
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => { 
    getCart()
      .then(setCart)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const pay = async () => {
    try {
      const { url } = await createCheckout();
      window.location.href = url;
    } catch (e) {
      setMsg(e.message);
    }
  };

  const params = new URLSearchParams(window.location.search);
  const success = params.get('success') === 'true';
  const canceled = params.get('canceled') === 'true';

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h2>Secure Checkout</h2>
        <p>Complete your purchase securely with Stripe</p>
      </div>
      
      <div className="checkout-content">
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          
          {success && (
            <div className="checkout-message success">
              <svg viewBox="0 0 24 24" fill="currentColor" className="checkout-message-icon">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Payment successful! You'll receive an email receipt from Stripe.
            </div>
          )}
          {canceled && (
            <div className="checkout-message error">
              <svg viewBox="0 0 24 24" fill="currentColor" className="checkout-message-icon">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/>
              </svg>
              Payment canceled. You can try again or continue shopping.
            </div>
          )}
          {msg && (
            <div className="checkout-message error">
              <svg viewBox="0 0 24 24" fill="currentColor" className="checkout-message-icon">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/>
              </svg>
              {msg}
            </div>
          )}
          
          {loading ? (
            <div className="checkout-loading">
              <div className="spinner"></div>
              <p>Loading your cart...</p>
            </div>
          ) : cart && cart.items.length > 0 ? (
            <>
              <div className="checkout-order-items">
                {cart.items.map(item => (
                  <div key={item.product._id} className="checkout-order-item">
                    <div className="checkout-item-image">
                      <img src={item.product.image} alt={item.product.title} />
                    </div>
                    <div className="checkout-item-details">
                      <span className="checkout-item-name">{item.product.title}</span>
                      <span className="checkout-item-quantity">Qty: {item.quantity}</span>
                    </div>
                    <span className="checkout-item-price">£{(item.product.price/100).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="checkout-total">
                <span>Total</span>
                <span>£{(cart.subtotal/100).toFixed(2)}</span>
              </div>
              
              <button className="checkout-pay-btn" onClick={pay}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="checkout-pay-icon">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                </svg>
                Pay with Stripe
              </button>
              
              <div className="checkout-security">
                <svg className="checkout-security-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.1 16,12.7V16.2C16,16.8 15.4,17.3 14.8,17.3H9.2C8.6,17.3 8,16.8 8,16.2V12.6C8,12.1 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/>
                </svg>
                <div className="checkout-security-text">
                  <strong>Secure payment powered by Stripe</strong>
                  <span>Your payment information is encrypted and secure</span>
                </div>
              </div>
              
              <div className="checkout-features">
                <div className="checkout-feature">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="checkout-feature-icon">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span>Premium Quality Guarantee</span>
                </div>
                <div className="checkout-feature">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="checkout-feature-icon">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span>Free Returns & Exchanges</span>
                </div>
                <div className="checkout-feature">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="checkout-feature-icon">
                    <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                  </svg>
                  <span>Fast & Reliable Shipping</span>
                </div>
              </div>
            </>
          ) : (
            <div className="checkout-empty">
              <svg viewBox="0 0 24 24" fill="currentColor" className="checkout-empty-icon">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
              <h3>Your cart is empty</h3>
              <p>Add some items to your cart to continue with checkout.</p>
              <Link to="/products-list" className="btn btn-primary">Continue Shopping</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


