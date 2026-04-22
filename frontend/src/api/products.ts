import axios from 'axios';

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api' });

export const getProducts = () => api.get('/products');
export const getCart = () => api.get('/cart');
export const addToCart = (productId: string, quantity: number) => api.post('/cart', { productId, quantity });
export const checkout = (items: any[], totalAmount: number) => api.post('/orders/checkout', { items, totalAmount });