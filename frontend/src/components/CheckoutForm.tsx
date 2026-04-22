import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface CheckoutFormProps {
  clientSecret: string;
  orderId: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ clientSecret, orderId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement }
    });

    if (error) {
      setErrorMessage(error.message || 'Une erreur est survenue.');
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      alert(`Paiement réussi ! Commande numéro : ${orderId}`);
      window.location.href = '/';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border border-gray-300 rounded-md bg-gray-50">
        <CardElement options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': { color: '#aab7c4' },
            },
            invalid: { color: '#9e2146' },
          },
        }}/>
      </div>
      
      {errorMessage && <div className="text-red-600 text-sm">{errorMessage}</div>}
      
      <button 
        type="submit" 
        disabled={!stripe || isProcessing}
        className={`w-full py-3 px-4 rounded text-white font-semibold text-lg transition-colors
          ${isProcessing || !stripe ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {isProcessing ? 'Traitement en cours...' : 'Confirmer le paiement'}
      </button>
    </form>
  );
};

export default CheckoutForm;