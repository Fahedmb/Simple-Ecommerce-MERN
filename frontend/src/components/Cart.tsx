import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart } from '../api/products';

const Cart: React.FC = () => {
  const [cart, setCart] = useState<any>({ items: [] });
  const navigate = useNavigate();

  useEffect(() => {
    getCart().then((res) => setCart(res.data)).catch(console.error);
  }, []);

  const calculateTotal = () => {
    return cart.items.reduce((total: number, item: any) => total + (item.product.price * item.quantity), 0);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Mon Panier</h2>
      
      {cart.items.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-500 text-lg">Votre panier est actuellement vide.</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {cart.items.map((item: any) => (
              <li key={item.product._id} className="p-6 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-gray-800">{item.product.name}</span>
                  <span className="text-gray-500">Quantité: {item.quantity}</span>
                </div>
                <span className="text-xl font-bold text-gray-900">{item.product.price * item.quantity} €</span>
              </li>
            ))}
          </ul>
          <div className="bg-gray-50 p-6 flex flex-col items-end border-t border-gray-200">
            <div className="text-xl mb-4 text-gray-800">
              Total à payer : <span className="font-bold text-2xl text-blue-600">{calculateTotal()} €</span>
            </div>
            <button 
              onClick={() => navigate('/checkout', { state: { items: cart.items, total: calculateTotal() } })}
              className="bg-green-600 text-white px-8 py-3 rounded font-semibold hover:bg-green-700 transition-colors"
            >
              Procéder au paiement
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;