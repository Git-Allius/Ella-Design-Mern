import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const addProduct = async (req, res) => {
  const newProduct = await Product.create(req.body);
  res.status(201).json(newProduct);
};