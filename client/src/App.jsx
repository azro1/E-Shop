import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { me, logout } from './api.js';
import Nav from './components/Nav.jsx';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const location = useLocation();
  
  useEffect(() => { 
    me()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);
  
  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  // Clear toast when route changes (except for auth success toasts)
  useEffect(() => {
    // Don't clear success toasts immediately - let them show during navigation
    if (toast && toast.type === 'error') {
      setToast(null);
    }
  }, [location.pathname]);
  
  const onLogout = async () => { 
    try {
      await logout(); 
      setUser(null);
      setToast({
        message: 'Successfully logged out',
        type: 'success'
      });
      setTimeout(() => setToast(null), 3000);
    } catch (error) {
      setToast({
        message: 'Failed to logout',
        type: 'error'
      });
      setTimeout(() => setToast(null), 3000);
    }
  };
  
  // Don't render anything while checking auth status
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  return (
    <>
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          <div className="toast-content">
            <svg className="toast-icon" viewBox="0 0 24 24" fill="currentColor">
              {toast.type === 'success' ? (
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              ) : (
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              )}
            </svg>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
      
      <Nav user={user} onLogout={onLogout} />
      <main className={`container ${location.pathname === '/' ? 'homepage-container' : ''}`}>
        <Outlet context={{ user, setUser, loading, setToast }} />
      </main>
      {(location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/cart') && (
        <footer className="homepage-footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4 className="footer-brand">
                <svg className="footer-logo" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7L12 12L22 7L12 2ZM2 17L12 22L22 17M2 12L12 17L22 12"/>
                </svg>
                E-Shop
              </h4>
              <p>Your trusted online shopping destination.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="/products-list">Products</a></li>
                <li><a href="/cart">Cart</a></li>
                <li><a href="/login">Login</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>Email: support@e-shop.com</p>
              <p>Phone: (555) 123-4567</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} E-Shop. All rights reserved.</p>
          </div>
        </footer>
      )}
    </>
  );
}


