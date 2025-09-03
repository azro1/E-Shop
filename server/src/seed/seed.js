import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import bcrypt from 'bcryptjs';

await connectDB();

await User.deleteMany({});
await Product.deleteMany({});

const pwd = await bcrypt.hash('admin1234', 12);
const admin = await User.create({
  email: 'admin@example.com',
  passwordHash: pwd,
  name: 'Admin',
  isAdmin: true
});

const user = await User.create({
  email: 'user@example.com',
  passwordHash: await bcrypt.hash('user1234', 12),
  name: 'John Shopper'
});

const products = await Product.insertMany([
  {
    title: 'Classic Cotton Tee',
    description: 'Premium soft cotton t-shirt with a comfortable fit. Perfect for everyday wear, available in multiple colors. Made from 100% organic cotton for breathability and comfort.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=400&fit=crop&crop=center',
    price: 1999,
    productCategory: 'Clothing',
    demographic: 'Men',
    inventory: 50
  },
  {
    title: 'Cozy Pullover Hoodie',
    description: 'Warm and comfortable hoodie made from premium fleece material. Features a kangaroo pocket and adjustable drawstring hood. Perfect for cool weather and casual outings.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=400&fit=crop&crop=center',
    price: 4999,
    productCategory: 'Clothing',
    demographic: 'Men',
    inventory: 25
  },
  {
    title: 'Classic Baseball Cap',
    description: 'Timeless baseball cap design with embroidered logo. Made from durable cotton twill with an adjustable snapback closure. Perfect for sun protection and casual style.',
    image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&h=400&fit=crop&crop=center',
    price: 1499,
    productCategory: 'Accessories',
    demographic: 'Men',
    inventory: 100
  },
  {
    title: 'Elegant Summer Dress',
    description: 'Beautiful floral summer dress perfect for warm weather. Made from lightweight, breathable fabric with a flattering silhouette. Features adjustable straps and a flowing skirt.',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=400&fit=crop&crop=center',
    price: 8999,
    productCategory: 'Clothing',
    demographic: 'Women',
    inventory: 30
  },
  {
    title: 'Kids Adventure Backpack',
    description: 'Durable and colorful backpack designed specifically for children. Multiple compartments for organization, comfortable padded straps, and fun designs that kids love.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop&crop=center',
    price: 3499,
    productCategory: 'Accessories',
    demographic: 'Kids',
    inventory: 45
  },
  {
    title: 'Natural Face Moisturizer',
    description: 'Hydrating face cream made with natural ingredients. Suitable for all skin types, provides long-lasting moisture and helps maintain healthy, glowing skin.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=400&fit=crop&crop=center',
    price: 2499,
    productCategory: 'Skincare',
    demographic: 'Unisex',
    inventory: 75
  },
  {
    title: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation. Long battery life, comfortable fit, and crystal clear sound quality for music and calls.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop&crop=center',
    price: 12999,
    productCategory: 'Headphones',
    demographic: 'Unisex',
    inventory: 20
  },
  {
    title: 'Garden Tool Set',
    description: 'Complete set of essential gardening tools. Includes trowel, pruners, gloves, and more. Perfect for both beginners and experienced gardeners.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop&crop=center',
    price: 5999,
    productCategory: 'Home & Garden',
    demographic: 'Unisex',
    inventory: 35
  },
  {
    title: 'Classic Running Shoes',
    description: 'Comfortable and lightweight running shoes with excellent cushioning. Perfect for daily runs, gym workouts, or casual wear. Available in multiple colors.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop&crop=center',
    price: 8999,
    productCategory: 'Footwear',
    demographic: 'Men',
    inventory: 40
  },
  {
    title: 'Kids Running Shoes',
    description: 'Lightweight and comfortable running shoes designed specifically for kids. Features excellent cushioning and support for daily runs and active play.',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=400&fit=crop&crop=center',
    price: 3999,
    productCategory: 'Footwear',
    demographic: 'Kids',
    inventory: 35
  },
  {
    title: 'Elegant Heels',
    description: 'Sophisticated high heels perfect for formal occasions. Made from premium materials with comfortable padding and secure fit. Available in black and nude.',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=400&fit=crop&crop=center',
    price: 12999,
    productCategory: 'Footwear',
    demographic: 'Women',
    inventory: 25
  },
  {
    title: 'Women\'s Sneakers',
    description: 'Durable and comfortable sneakers designed for active women. Lightweight construction with excellent grip and stylish design perfect for everyday wear.',
    image: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=600&h=400&fit=crop&crop=center',
    price: 6999,
    productCategory: 'Footwear',
    demographic: 'Women',
    inventory: 30
  },
  {
    title: 'iPhone 15 Pro',
    description: 'Latest Apple iPhone with advanced camera system and A17 Pro chip. Features titanium design, ProRAW photography, and all-day battery life.',
    image: 'https://images.unsplash.com/photo-1695048065040-a0e3ec926785?w=600&h=400&fit=crop&crop=center',
    price: 99999,
    productCategory: 'Phones',
    demographic: 'Unisex',
    inventory: 15
  },
  {
    title: 'Sony WH-1000XM4',
    description: 'Industry-leading noise canceling wireless headphones. Features 30-hour battery life, quick charge, and exceptional sound quality with adaptive sound control.',
    image: 'https://images.unsplash.com/photo-1574494461754-de04dc403eec?w=600&h=400&fit=crop&crop=center',
    price: 34999,
    productCategory: 'Headphones',
    demographic: 'Unisex',
    inventory: 25
  },
  {
    title: 'MacBook Air M2',
    description: 'Lightweight laptop with M2 chip, perfect for everyday computing. Features all-day battery life, stunning Retina display, and powerful performance.',
    image: 'https://images.unsplash.com/photo-1649394233584-217c46cb9612?w=600&h=400&fit=crop&crop=center',
    price: 119999,
    productCategory: 'Laptops',
    demographic: 'Unisex',
    inventory: 25
  },
  {
    title: 'Samsung 55" 4K Smart TV',
    description: 'Crystal UHD 4K Smart TV with HDR and built-in streaming apps. Features stunning picture quality and seamless smart home integration.',
    image: 'https://images.unsplash.com/photo-1548392413-1890e1668dce?w=600&h=400&fit=crop&crop=center',
    price: 59999,
    productCategory: 'TVs',
    demographic: 'Unisex',
    inventory: 30
  },
  {
    title: 'Adidas Rivalry (Mens)',
    description: 'High-performance running shoes with responsive cushioning. Perfect for daily runs and athletic activities.',
    image: 'https://images.unsplash.com/photo-1706550633743-08b7732e4d4c?w=600&h=400&fit=crop&crop=center',
    price: 18000,
    productCategory: 'Footwear',
    demographic: 'Men',
    inventory: 80
  }
]);

console.log({ admin: admin.email, user: user.email, products: products.length });
process.exit(0);


