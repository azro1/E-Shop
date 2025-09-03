import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authRequired = async (req, res, next) => {
  try {
    const cookieName = process.env.COOKIE_NAME || 'token';
    const token = req.cookies[cookieName];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.uid).select('-passwordHash');
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

export const adminOnly = (req, res, next) => {
  if (!req.user?.isAdmin) return res.status(403).json({ error: 'Forbidden' });
  next();
};


