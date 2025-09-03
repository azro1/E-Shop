import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Products from './pages/Products.jsx';
import ProductsList from './pages/ProductsList.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import { AuthGuard, ProtectedRoute } from './components/ProtectedRoute.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Products />} />
        <Route path="/products-list" element={<ProductsList />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/login" element={<AuthGuard><Login /></AuthGuard>} />
        <Route path="/register" element={<AuthGuard><Register /></AuthGuard>} />
      </Route>
    </Routes>
  </BrowserRouter>
);


