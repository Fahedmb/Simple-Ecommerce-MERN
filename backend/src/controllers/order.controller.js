import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { createPaymentIntent } from '../services/stripe.service.js';
import Stripe from 'stripe';

export const checkout = async (req, res) => {
  const { items, totalAmount } = req.body;
  const paymentIntent = await createPaymentIntent(totalAmount);
  
  const order = new Order({
    user: req.user.id,
    items,
    totalAmount,
    stripePaymentIntentId: paymentIntent.id
  });
  
  await order.save();
  res.json({ clientSecret: paymentIntent.client_secret, orderId: order._id });
};

export const stripeWebhook = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers['stripe-signature'];
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    
    const order = await Order.findOneAndUpdate(
      { stripePaymentIntentId: paymentIntent.id },
      { status: 'paid' },
      { new: true }
    );

    if (order) {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity }
        });
      }
    }
  }
  
  res.json({ received: true });
};