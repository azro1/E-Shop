import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    title: String,
    price: Number,
    quantity: Number
  }],
  amountTotal: Number,
  currency: { type: String, default: 'usd' },
  status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  stripeSessionId: String,
  paymentIntentId: String
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);


