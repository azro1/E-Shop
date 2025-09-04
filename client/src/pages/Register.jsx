import React, { useState } from 'react';
import { useNavigate, useOutletContext, useLocation, Link } from 'react-router-dom';
import { registerUser } from '../api.js';

export default function Register() {
  const { setUser, setToast } = useOutletContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const nav = useNavigate();
  const location = useLocation();

  const validateForm = () => {
    const errors = {};
    
    // Name validation
    if (!name.trim()) {
      errors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    // Email validation
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      const u = await registerUser(name.trim(), email.trim(), password);
      setUser(u);
      setToast({
        message: `Welcome to E-Shop, ${u.name}!`,
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

  const getValidationMessage = () => {
    if (Object.keys(validationErrors).length === 0) return '';
    
    // Check if all fields are empty (nothing entered)
    const allEmpty = !name.trim() && !email.trim() && !password;
    
    if (allEmpty) {
      return 'Missing credentials';
    }
    
    // For specific field errors, show the first one
    const firstError = Object.values(validationErrors)[0];
    return firstError || '';
  };

  return (
    <form onSubmit={onSubmit} className="auth">
      <h2>Register</h2>
      {(error || getValidationMessage()) && (
        <div className="error">
          {error || getValidationMessage()}
        </div>
      )}
      
      <div>
        <input 
          value={name} 
          onChange={e => {
            setName(e.target.value);
            if (validationErrors.name) {
              setValidationErrors(prev => ({ ...prev, name: '' }));
            }
          }} 
          placeholder="Name" 
        />
      </div>
      
      <div>
        <input 
          value={email} 
          onChange={e => {
            setEmail(e.target.value);
            if (validationErrors.email) {
              setValidationErrors(prev => ({ ...prev, email: '' }));
            }
          }} 
          placeholder="Email" 
        />
      </div>
      
      <div>
        <input 
          value={password} 
          onChange={e => {
            setPassword(e.target.value);
            if (validationErrors.password) {
              setValidationErrors(prev => ({ ...prev, password: '' }));
            }
          }} 
          type="password" 
          placeholder="Password" 
        />
      </div>
      
      <button>Create account</button>
      <div className="auth-link">
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </form>
  );
}