import React from 'react';
import { Navigate, useOutletContext, useLocation } from 'react-router-dom';

// For auth pages (login/register) - redirect to home if already logged in
export function AuthGuard({ children }) {
  const { user, loading } = useOutletContext();
  
  // Don't redirect while still loading
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

// For protected pages (cart, checkout) - redirect to login if not authenticated
export function ProtectedRoute({ children }) {
  const { user, loading } = useOutletContext();
  const location = useLocation();
  
  // Don't redirect while still loading
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  if (!user) {
    // Save the intended destination to redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
}
