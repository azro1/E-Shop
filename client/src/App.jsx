import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { me, logout } from './api.js';
import Nav from './components/Nav.jsx';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
  
  const onLogout = async () => { 
    await logout(); 
    setUser(null); 
  };
  
  // Don't render anything while checking auth status
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  return (
    <>
      <Nav user={user} onLogout={onLogout} />
      <main className={`container ${location.pathname === '/' ? 'homepage-container' : ''}`}>
        <Outlet context={{ user, setUser, loading }} />
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


