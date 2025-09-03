import express from 'express';
import { stripe } from '../config/stripe.js';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';

const router = express.Router();

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
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


