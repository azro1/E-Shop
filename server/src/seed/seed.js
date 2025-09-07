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
    image: 'https://images.unsplash.com/photo-1716952029045-feb119b58583?w=600&h=400&fit=crop&crop=center',
    price: 1999,
    productCategory: 'Clothing',
    demographic: 'Men',
    inventory: 50
  },
  {
    title: 'Ray-Ban Aviator Sunglasses',
    description: 'Classic Ray-Ban Aviator sunglasses with crystal green lenses and gold-tone frame. Features 100% UV protection and iconic aviator design. Perfect for style and sun protection.',
    image: 'https://images.unsplash.com/photo-1659506425360-f04a041e90df?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 12999,
    productCategory: 'Accessories',
    demographic: 'Unisex',
    inventory: 40
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
    image: 'https://images.unsplash.com/photo-1708456697489-423b34cf2650?w=600&h=400&fit=crop&crop=center',
    price: 8999,
    productCategory: 'Clothing',
    demographic: 'Women',
    inventory: 30
  },
  {
    title: 'Wireless Gaming Mouse',
    description: 'High-precision wireless gaming mouse with customizable RGB lighting. Features ergonomic design, programmable buttons, and ultra-fast response time for gaming and productivity.',
    image: 'https://images.unsplash.com/photo-1551515300-2d3b7bb80920?w=600&h=400&fit=crop&crop=center',
    price: 7999,
    productCategory: 'Accessories',
    demographic: 'Unisex',
    inventory: 50
  },
  {
    title: 'Natural Face Moisturizer',
    description: 'Hydrating face cream made with natural ingredients. Suitable for all skin types, provides long-lasting moisture and helps maintain healthy, glowing skin.',
    image: 'https://images.unsplash.com/photo-1687662008695-281f2c5d96bb?w=600&h=400&fit=crop&crop=center',
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
    image: 'https://images.unsplash.com/photo-1687457340782-1176f83e9ea5?w=600&h=400&fit=crop&crop=center',
    price: 5999,
    productCategory: 'Home & Garden',
    demographic: 'Unisex',
    inventory: 35
  },
  {
    title: 'Nike Running Shoes',
    description: 'Comfortable and lightweight running shoes with excellent cushioning. Perfect for daily runs, gym workouts, or casual wear. Available in multiple colors.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop&crop=center',
    price: 8999,
    productCategory: 'Footwear',
    demographic: 'Men',
    inventory: 40
  },
  {
    title: 'AirSpeed Grey Triumph Sneakers',
    description: 'Stylish and comfortable sneakers with a modern design. Features excellent cushioning and support for everyday wear and casual activities.',
    image: 'https://images.unsplash.com/photo-1705675804943-c6fb96258aa2?w=600&h=400&fit=crop&crop=center',
    price: 3999,
    productCategory: 'Footwear',
    demographic: 'Kids',
    inventory: 35
  },
  {
    title: 'Elegant Heels',
    description: 'Sophisticated high heels perfect for formal occasions. Made from premium materials with comfortable padding and secure fit. Available in black and nude.',
    image: 'https://images.unsplash.com/photo-1618274158630-bc47a614b3a5?w=600&h=400&fit=crop&crop=center',
    price: 12999,
    productCategory: 'Footwear',
    demographic: 'Women',
    inventory: 25
  },
  {
    title: 'Women\'s Sneakers',
    description: 'Durable and comfortable sneakers designed for active women. Lightweight construction with excellent grip and stylish design perfect for everyday wear.',
    image: 'https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?w=600&h=400&fit=crop&crop=center',
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


