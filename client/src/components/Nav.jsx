import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Nav({ user, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav className="nav">
      <div className="container">
        <Link to="/" className="brand">
          <svg className="brand-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7L12 12L22 7L12 2ZM2 17L12 22L22 17M2 12L12 17L22 12"/>
          </svg>
          E-Shop
        </Link>
        
        <div className="spacer" />
        
        {/* Hamburger Menu Button */}
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        {/* Desktop Navigation */}
        <div className="nav-links desktop-nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          
          {user && (
            <Link to="/cart" className="nav-link cart-link">
              <svg className="nav-icon cart-icon-outline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 22a1 1 0 100-2 1 1 0 000 2zM20 22a1 1 0 100-2 1 1 0 000 2zM1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
              </svg>
            </Link>
          )}
          
          {user ? (
            <>
              <div className="user-menu">
                <span className="user-greeting">
                  Hi, {user.name}
                </span>
                <button onClick={onLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Log in
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile Navigation Overlay */}
        <div className={`mobile-nav-overlay ${isMenuOpen ? 'active' : ''}`}>
          <div className="mobile-nav-content">
            <Link to="/" className="mobile-nav-link" onClick={toggleMenu}>
              Home
            </Link>
            
            <Link to="/products-list" className="mobile-nav-link" onClick={toggleMenu}>
              Shop
            </Link>
            
            {user && (
              <Link to="/cart" className="mobile-nav-link" onClick={toggleMenu}>
                <svg className="nav-icon cart-icon-outline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 22a1 1 0 100-2 1 1 0 000 2zM20 22a1 1 0 100-2 1 1 0 000 2zM1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                </svg>
                Cart
              </Link>
            )}
            
            {user ? (
              <>
                <div className="mobile-user-info">
                  <span className="user-greeting">
                    Hi, {user.name}
                  </span>
                </div>
                <button onClick={() => { onLogout(); toggleMenu(); }} className="mobile-logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="mobile-nav-link" onClick={toggleMenu}>
                  Log in
                </Link>
                <Link to="/register" className="mobile-nav-link" onClick={toggleMenu}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}


