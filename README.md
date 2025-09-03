# E-commerce App (Express + MongoDB + React + Stripe)

## Stack
- Backend: Node.js, Express, MongoDB (Mongoose), JWT auth, Stripe Checkout
- Frontend: React (Vite)

## Project Structure

```
E-Shop/
  server/
    .env.example
    package.json
    src/
      index.js
      config/
        db.js
        stripe.js
      middleware/
        auth.js
      models/
        User.js
        Product.js
        Cart.js
        Order.js
      routes/
        auth.js
        products.js
        cart.js
        checkout.js
        webhook.js
      seed/
        seed.js
  client/
    .env.example
    package.json
    index.html
    src/
      main.jsx
      App.jsx
      api.js
      components/
        Nav.jsx
        ProductCard.jsx
      pages/
        Login.jsx
        Register.jsx
        Products.jsx
        ProductDetail.jsx
        Cart.jsx
        Checkout.jsx
      styles.css
```

## Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Stripe account for test keys

## Setup

1) Backend

```bash
cd server
copy .env.example .env    # or cp on macOS/Linux
# Edit .env and set your values
npm install
npm run seed
npm run dev
```

2) Frontend

```bash
cd client
copy .env.example .env    # or cp on macOS/Linux
npm install
npm run dev
```

Frontend runs on http://localhost:5173 and backend on http://localhost:5000 by default.

## Environment Variables

server/.env

```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/shopdb
JWT_SECRET=replace-with-32-64-char-random-string
COOKIE_NAME=token
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000

# Stripe
STRIPE_SECRET_KEY=sk_test_replace_me
STRIPE_WEBHOOK_SECRET=whsec_replace_me
```

client/.env

```
VITE_API_BASE=http://localhost:5000
```

## Stripe Webhook (local)

```bash
stripe listen --forward-to localhost:5000/api/stripe/webhook
```

Copy the `whsec_...` from the CLI into `STRIPE_WEBHOOK_SECRET`.

## Notes
- Use test cards like 4242 4242 4242 4242 for test mode
- Set cookies to `secure: true` behind HTTPS in production
- Replace JWT secret before going live

