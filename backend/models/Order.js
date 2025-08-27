import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    zip: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    phone: { type: String, required: true },
    items: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;