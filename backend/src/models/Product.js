import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: String, enum: ['PC', 'Tablette', 'Fourniture'], required: true },
  stock: { type: Number, default: 0 },
  imageUrl: String
});

export default mongoose.model('Product', productSchema);