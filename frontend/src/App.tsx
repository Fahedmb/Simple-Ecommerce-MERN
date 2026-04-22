import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CheckoutPage from './components/CheckoutPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <nav className="bg-blue-600 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="text-2xl font-bold tracking-wider">TechStore</Link>
              <div className="flex space-x-6">
                <Link to="/" className="hover:text-blue-200 transition-colors">Catalogue</Link>
                <Link to="/cart" className="hover:text-blue-200 transition-colors">Mon Panier</Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
          <p>&copy; 2026 TechStore - Projet Atelier Fullstack</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;