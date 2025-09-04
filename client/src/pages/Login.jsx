import React, { useState } from 'react';
import { useNavigate, useOutletContext, useLocation, Link } from 'react-router-dom';
import { login } from '../api.js';

export default function Login() {
  const { setUser, setToast } = useOutletContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();
  const location = useLocation();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const u = await login(email, password);
      setUser(u);
      setToast({
        message: `Welcome back, ${u.name}!`,
        type: 'success'
      });
      // Auto-dismiss toast after 3 seconds
      setTimeout(() => setToast(null), 3000);
      // Navigate immediately - toast will show on the new page
      const from = location.state?.from?.pathname || '/';
      nav(from, { replace: true });
    } catch (e) { 
      setError(e.message);
    }
  };

  return (
    <form onSubmit={onSubmit} className="auth">
      <h2>Log in</h2>
      {error && <div className="error">{error}</div>}
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" />
      <button>Log in</button>
      <div className="auth-link">
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </form>
  );
}


