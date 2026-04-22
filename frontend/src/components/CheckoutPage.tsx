import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { checkout } from '../api/products';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || '');

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const [clientSecret, setClientSecret] = useState('');
  const [orderId, setOrderId] = useState('');
  
  const totalAmount = location.state?.total || 0;

  useEffect(() => {
    const items = location.state?.items || [];
    
    if (items.length > 0 && totalAmount > 0) {
      const formattedItems = items.map((item: any) => ({
        product: item.product._id,
        quantity: item.quantity,
        priceAtPurchase: item.product.price
      }));

      checkout(formattedItems, totalAmount)
        .then((res) => {
          setClientSecret(res.data.clientSecret);
          setOrderId(res.data.orderId);
        })
        .catch(console.error);
    }
  }, [location.state, totalAmount]);

  if (!clientSecret) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-gray-600">Initialisation du paiement sécurisé...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Paiement Sécurisé</h2>
      <div className="mb-6 text-center text-gray-600">
        <p>Montant total : <span className="font-bold text-xl text-gray-900">{totalAmount} €</span></p>
      </div>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm clientSecret={clientSecret} orderId={orderId} />
      </Elements>
    </div>
  );
};

export default CheckoutPage;