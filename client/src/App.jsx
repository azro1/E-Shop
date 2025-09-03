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
      <main className="container">
        <Outlet context={{ user, setUser, loading }} />
      </main>
    </>
  );
}


