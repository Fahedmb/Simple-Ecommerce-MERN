import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

// Reads from the current working directory (backend/.env)
dotenv.config();

const seedProducts = [
  { name: "PC Gamer ASUS ROG", description: "RTX 4070, 32GB RAM, 1TB NVMe", price: 1800, category: "PC", stock: 5 },
  { name: "MacBook Pro 14\"", description: "Puce M3 Pro, 18GB RAM", price: 2400, category: "PC", stock: 3 },
  { name: "iPad Air 5", description: "Écran Liquid Retina, 256GB", price: 750, category: "Tablette", stock: 12 },
  { name: "Clavier Mécanique Keychron", description: "Switches Gateron Brown", price: 110, category: "Fourniture", stock: 20 },
  { name: "Souris Logitech MX Master 3S", description: "Souris ergonomique sans fil", price: 100, category: "Fourniture", stock: 15 }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connecté à MongoDB Atlas.');
    
    // Clear the existing products to avoid duplicates
    await Product.deleteMany({});
    console.log('Anciens produits supprimés.');

    // Insert the new products
    await Product.insertMany(seedProducts);
    console.log('Nouveaux produits ajoutés avec succès !');

    process.exit(0);
  } catch (error) {
    console.error('Erreur lors du seeding:', error);
    process.exit(1);
  }
};

seedDB();