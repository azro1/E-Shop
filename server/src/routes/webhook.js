import express from 'express';
import { stripe } from '../config/stripe.js';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';

const router = express.Router();

router.post('/', express.raw({ type: 'application/json' }), async (req, res) => {
  console.log('Webhook received!', req.method, req.url);
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    console.log('Webhook event type:', event.type);
  } catch (err) {
    console.log('Webhook error:', err.message);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const order = await Order.findOne({ stripeSessionId: session.id });
    if (order) {
      order.status = 'paid';
      order.paymentIntentId = session.payment_intent;
      await order.save();
      await Cart.findOneAndUpdate({ user: order.user }, { items: [], subtotal: 0 });
    }
  }

  res.json({ received: true });
});

export default router;


