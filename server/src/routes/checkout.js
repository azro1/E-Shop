import { Router } from 'express';
import { stripe } from '../config/stripe.js';
import Cart from '../models/Cart.js';
import Order from '../models/Order.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();

router.post('/create-session', authRequired, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  if (!cart || cart.items.length === 0) return res.status(400).json({ error: 'Cart empty' });

  const line_items = cart.items.map(i => ({
    quantity: i.quantity,
    price_data: {
      currency: i.product.currency || 'usd',
      product_data: { name: i.product.title, images: i.product.image ? [i.product.image] : [] },
      unit_amount: i.product.price
    }
  }));

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items,
    success_url: `${process.env.FRONTEND_URL}/checkout?success=true`,
    cancel_url: `${process.env.FRONTEND_URL}/checkout?canceled=true`,
    customer_email: req.user.email,
    metadata: { userId: String(req.user._id) }
  });

  const order = await Order.create({
    user: req.user._id,
    items: cart.items.map(i => ({
      product: i.product._id,
      title: i.product.title,
      price: i.product.price,
      quantity: i.quantity
    })),
    amountTotal: cart.subtotal,
    currency: 'usd',
    status: 'pending',
    stripeSessionId: session.id
  });

  res.json({ url: session.url, sessionId: session.id, orderId: order._id });
});

export default router;


