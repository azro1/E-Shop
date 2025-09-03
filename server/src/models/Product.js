import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  price: { type: Number, required: true },
  currency: { type: String, default: 'usd' },
  productCategory: { 
    type: String, 
    required: true, 
    enum: ['Footwear', 'Clothing', 'Accessories', 'Electronics', 'Phones', 'Laptops', 'Headphones', 'TVs', 'Home & Garden', 'Furniture', 'Kitchen', 'Garden', 'Sports & Outdoors', 'Fitness', 'Outdoor', 'Camping', 'Health & Beauty', 'Skincare', 'Makeup', 'Haircare', 'Fragrances']
  },
  demographic: { 
    type: String, 
    required: true, 
    enum: ['Men', 'Women', 'Kids', 'Unisex']
  },
  active: { type: Boolean, default: true },
  inventory: { type: Number, default: 100 }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);


