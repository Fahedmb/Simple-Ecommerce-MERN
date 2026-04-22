import React, { useEffect, useState } from 'react';
import { getProducts, addToCart } from '../api/products';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getProducts().then((res) => setProducts(res.data)).catch(console.error);
  }, []);

  const handleAddToCart = async (id: string) => {
    try {
      await addToCart(id, 1);
      alert('Produit ajouté au panier avec succès !');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Notre Catalogue</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-lg">Image du produit</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{p.name}</h3>
              <p className="text-gray-600 mb-4">{p.category}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">{p.price} €</span>
                <button 
                  onClick={() => handleAddToCart(p._id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;