import { jest } from '@jest/globals';
import request from 'supertest';
import mongoose from 'mongoose';

jest.unstable_mockModule('../src/services/stripe.service.js', () => ({
  createPaymentIntent: jest.fn()
}));

const { createPaymentIntent } = await import('../src/services/stripe.service.js');
const { default: app } = await import('../src/server.js');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce_test');
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Checkout', () => {
  it('should create a payment intent and order', async () => {
    createPaymentIntent.mockResolvedValue({ client_secret: 'mock_secret', id: 'pi_123' });
    
    const res = await request(app)
      .post('/api/orders/checkout')
      .set('Authorization', 'Bearer mock-token')
      .send({
        items: [{ product: new mongoose.Types.ObjectId(), quantity: 1, priceAtPurchase: 100 }],
        totalAmount: 100
      });
      
    expect(res.statusCode).toBe(200);
    expect(res.body.clientSecret).toBe('mock_secret');
    expect(res.body.orderId).toBeDefined();
  });
});