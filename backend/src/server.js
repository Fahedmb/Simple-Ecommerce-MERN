import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { getProducts } from './controllers/product.controller.js';
import { getCart, addToCart } from './controllers/cart.controller.js';
import { checkout, stripeWebhook } from './controllers/order.controller.js';

dotenv.config();

const app = express();

app.post('/api/orders/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

app.use(express.json());
app.use(cors());

const mockAuth = (req, res, next) => {
  req.user = { id: '507f1f77bcf86cd799439011' };
  next();
};

app.get('/api/products', getProducts);
app.get('/api/cart', mockAuth, getCart);
app.post('/api/cart', mockAuth, addToCart);
app.post('/api/orders/checkout', mockAuth, checkout);

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      app.listen(process.env.PORT || 5000, () => {
        console.log('Server running on port 5000');
      });
    });
}

export default app;