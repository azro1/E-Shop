import { Router } from 'express';
import Product from '../models/Product.js';
import { authRequired, adminOnly } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res) => {
  const { q = '', page = 1, limit = 20 } = req.query;
  const where = q ? { title: { $regex: q, $options: 'i' }, active: true } : { active: true };
  const items = await Product.find(where).skip((page - 1) * limit).limit(Number(limit)).sort({ createdAt: -1 });
  const total = await Product.countDocuments(where);
  res.json({ items, total });
});

router.get('/:id', async (req, res) => {
  const item = await Product.findById(req.params.id);
  if (!item || !item.active) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

router.post('/', authRequired, adminOnly, async (req, res) => {
  const prod = await Product.create(req.body);
  res.status(201).json(prod);
});

router.put('/:id', authRequired, adminOnly, async (req, res) => {
  const prod = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(prod);
});

router.delete('/:id', authRequired, adminOnly, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;


