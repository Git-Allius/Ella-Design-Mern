import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  category: String, // shirt, mug, tumbler
  price: Number,
  image: String,
  customizationOptions: Object
});

export default mongoose.model('Product', productSchema);