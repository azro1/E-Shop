import { Router } from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();

const recalc = async (cart) => {
  await cart.populate('items.product');
  cart.subtotal = cart.items.reduce((sum, it) => sum + it.product.price * it.quantity, 0);
  return cart.save();
};

router.use(authRequired);

router.get('/', async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  if (!cart) cart = await Cart.create({ user: req.user._id, items: [], subtotal: 0 });
  res.json(cart);
});

router.post('/', async (req, res) => {
  const { productId, quantity = 1 } = req.body || {};
  const product = await Product.findById(productId);
  if (!product || !product.active) return res.status(404).json({ error: 'Product not found' });

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) cart = await Cart.create({ user: req.user._id, items: [], subtotal: 0 });

  const idx = cart.items.findIndex(i => i.product.toString() === productId);
  if (idx >= 0) cart.items[idx].quantity += quantity;
  else cart.items.push({ product: productId, quantity });

  await recalc(cart);
  res.json(await Cart.findById(cart._id).populate('items.product'));
});

router.put('/:productId', async (req, res) => {
  const { quantity } = req.body || {};
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ error: 'Cart not found' });
  const idx = cart.items.findIndex(i => i.product.toString() === req.params.productId);
  if (idx < 0) return res.status(404).json({ error: 'Item not in cart' });
  cart.items[idx].quantity = Math.max(1, Number(quantity || 1));
  await recalc(cart);
  res.json(await Cart.findById(cart._id).populate('items.product'));
});

router.delete('/:productId', async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ error: 'Cart not found' });
  cart.items = cart.items.filter(i => i.product.toString() !== req.params.productId);
  await recalc(cart);
  res.json(await Cart.findById(cart._id).populate('items.product'));
});

export default router;


