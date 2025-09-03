import React, { useEffect, useState } from 'react';
import { getCart, updateCartItem, removeCartItem } from '../api.js';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [cart, setCart] = useState(null);
  const refresh = async () => setCart(await getCart());
  useEffect(() => { refresh(); }, []);
  if (!cart) return <p>Please log in to view your cart.</p>;

  const setQty = async (pid, q) => { await updateCartItem(pid, q); refresh(); };
  const remove = async (pid) => { await removeCartItem(pid); refresh(); };

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h2>Your Cart</h2>
      </div>
      
      {cart.items.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty. Start shopping to add items!</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.items.map(i => (
              <div key={i.product._id} className="cart-item">
                <div className="cart-item-info">
                  <div className="cart-item-details">
                    <h3>{i.product.title}</h3>
                    <div className="cart-item-price">${(i.product.price/100).toFixed(2)}</div>
                  </div>
                </div>
                <div className="cart-item-controls">
                  <input 
                    type="number" 
                    min="1" 
                    value={i.quantity} 
                    onChange={e => setQty(i.product._id, Number(e.target.value))}
                    className="cart-quantity-input"
                  />
                  <button 
                    onClick={() => remove(i.product._id)}
                    className="cart-remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="cart-subtotal">
              <span>Subtotal:</span>
              <span>${(cart.subtotal/100).toFixed(2)}</span>
            </div>
            <Link className="cart-checkout-btn" to="/checkout">
              Go to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}


