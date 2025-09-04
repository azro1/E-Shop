import React, { useEffect, useState } from 'react';
import { getCart, updateCartItem, removeCartItem } from '../api.js';
import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

export default function Cart() {
  const { user, setToast } = useOutletContext();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const refresh = async () => {
    setLoading(true);
    const cartData = await getCart();
    setCart(cartData);
    setLoading(false);
  };
  
  useEffect(() => { refresh(); }, []);
  
  if (loading) return <div className="loading">Loading cart...</div>;
  if (!user) return <p>Please log in to view your cart.</p>;
  if (!cart) return <div className="loading">Loading cart...</div>;

  const setQty = async (pid, q) => { await updateCartItem(pid, q); refresh(); };
  
  const remove = async (pid) => { 
    try {
      // Find the product name before removing
      const product = cart.items.find(item => item.product._id === pid);
      await removeCartItem(pid); 
      refresh();
      
      // Show success toast
      setToast({
        message: `${product?.product.title || 'Item'} removed from cart`,
        type: 'success'
      });
      setTimeout(() => setToast(null), 3000);
    } catch (error) {
      setToast({
        message: 'Failed to remove item from cart',
        type: 'error'
      });
      setTimeout(() => setToast(null), 3000);
    }
  };

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
                    <div className="cart-item-price">£{(i.product.price/100).toFixed(2)}</div>
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
              <span>£{(cart.subtotal/100).toFixed(2)}</span>
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


