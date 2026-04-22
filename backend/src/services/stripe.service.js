import Stripe from 'stripe';

export const createPaymentIntent = async (amount, currency = 'eur') => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  return await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency,
    automatic_payment_methods: { enabled: true }
  });
};