import React, { useEffect, useState } from 'react';
import { createCheckout, getCart } from '../api.js';

export default function Checkout() {
  const [msg, setMsg] = useState('');
  const [cart, setCart] = useState(null);
  useEffect(() => { getCart().then(setCart).catch(()=>{}); }, []);

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
        <h2>Checkout</h2>
      </div>
      
      <div className="checkout-main">
        {/* Shipping Information */}
        <div className="checkout-section">
          <h3>
            <svg className="checkout-section-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
            </svg>
            Shipping Information
          </h3>
          <div className="checkout-form">
            <div className="checkout-form-row">
              <div className="checkout-form-group">
                <label className="checkout-label">First Name</label>
                <input type="text" className="checkout-input" placeholder="Enter your first name" />
              </div>
              <div className="checkout-form-group">
                <label className="checkout-label">Last Name</label>
                <input type="text" className="checkout-input" placeholder="Enter your last name" />
              </div>
            </div>
            <div className="checkout-form-group">
              <label className="checkout-label">Email Address</label>
              <input type="email" className="checkout-input" placeholder="Enter your email address" />
            </div>
            <div className="checkout-form-group">
              <label className="checkout-label">Address</label>
              <input type="text" className="checkout-input" placeholder="Enter your street address" />
            </div>
            <div className="checkout-form-row">
              <div className="checkout-form-group">
                <label className="checkout-label">City</label>
                <input type="text" className="checkout-input" placeholder="Enter your city" />
              </div>
              <div className="checkout-form-group">
                <label className="checkout-label">Postal Code</label>
                <input type="text" className="checkout-input" placeholder="Enter postal code" />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="checkout-section">
          <h3>
            <svg className="checkout-section-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
            </svg>
            Payment Information
          </h3>
          <div className="checkout-form">
            <div className="checkout-form-group">
              <label className="checkout-label">Card Number</label>
              <input type="text" className="checkout-input" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="checkout-form-row">
              <div className="checkout-form-group">
                <label className="checkout-label">Expiry Date</label>
                <input type="text" className="checkout-input" placeholder="MM/YY" />
              </div>
              <div className="checkout-form-group">
                <label className="checkout-label">CVV</label>
                <input type="text" className="checkout-input" placeholder="123" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="checkout-sidebar">
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          
          {success && (
            <div className="checkout-message success">
              Payment successful! You'll receive an email receipt from Stripe.
            </div>
          )}
          {canceled && (
            <div className="checkout-message error">
              Payment canceled.
            </div>
          )}
          {msg && (
            <div className="checkout-message error">
              {msg}
            </div>
          )}
          
          {cart && (
            <>
              <div className="checkout-order-items">
                {cart.items.map(item => (
                  <div key={item.product._id} className="checkout-order-item">
                    <span className="checkout-item-name">{item.product.title}</span>
                    <span className="checkout-item-price">${(item.product.price/100).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="checkout-total">
                <span>Total</span>
                <span>${(cart.subtotal/100).toFixed(2)}</span>
              </div>
              
              <button className="checkout-pay-btn" onClick={pay}>
                Pay with Stripe
              </button>
              
              <div className="checkout-security">
                <svg className="checkout-security-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.1 16,12.7V16.2C16,16.8 15.4,17.3 14.8,17.3H9.2C8.6,17.3 8,16.8 8,16.2V12.6C8,12.1 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/>
                </svg>
                Secure payment powered by Stripe
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


