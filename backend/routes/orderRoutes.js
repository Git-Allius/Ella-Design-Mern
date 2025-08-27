import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// POST /api/orders
router.post('/', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      address,
      zip,
      city,
      state,
      phone,
      items,
      totalAmount,
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !address || !zip || !city || !state || !phone || !items || !totalAmount) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const order = new Order({
      firstName,
      lastName,
      email,
      address,
      zip,
      city,
      state,
      phone,
      items,
      totalAmount,
    });

    await order.save();

    res.status(201).json({ message: 'Order saved successfully!', order });
  } catch (error) {
    console.error('Order submission error:', error);
    res.status(500).json({ message: 'Failed to save order', error: error.message });
  }
});

export default router;