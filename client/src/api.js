const base = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

const req = async (path, opts={}) => {
  const res = await fetch(`${base}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(opts.headers||{}) },
    ...opts
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Request failed');
  return res.json();
};

export const me = () => req('/api/auth/me');
export const login = (email, password) => req('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
export const registerUser = (name, email, password) => req('/api/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) });
export const logout = () => req('/api/auth/logout', { method: 'POST' });

export const listProducts = (q='') => req(`/api/products?q=${encodeURIComponent(q)}`);
export const getProduct = (id) => req(`/api/products/${id}`);

export const getCart = () => req('/api/cart');
export const addToCart = (productId, quantity=1) => req('/api/cart', { method: 'POST', body: JSON.stringify({ productId, quantity }) });
export const updateCartItem = (productId, quantity) => req(`/api/cart/${productId}`, { method: 'PUT', body: JSON.stringify({ quantity }) });
export const removeCartItem = (productId) => req(`/api/cart/${productId}`, { method: 'DELETE' });

export const createCheckout = () => req('/api/checkout/create-session', { method: 'POST' });


