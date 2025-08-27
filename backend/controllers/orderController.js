import Order from '../models/Order.js';

export const placeOrder = async (req, res) => {
  const newOrder = await Order.create(req.body);
  res.status(201).json(newOrder);
};

export const getOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId }).populate('items.productId');
  res.json(orders);
};