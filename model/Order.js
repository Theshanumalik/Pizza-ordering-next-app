import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  products: [
    {
      productId: { type: mongoose.Types.ObjectId, ref: "pizzas" },
      name: { type: String },
      price: { type: Number, required: [true, "Product Price must be given!"] },
      quantity: { type: Number, required: true },
      selectedSize: { type: String },
    },
  ],
  amount: { type: Number, required: true },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["paid", "unpaid"],
    default: "unpaid",
  },
  shippingStatus: {
    type: String,
    enum: ["shipped", "dispatched", "failed"],
    default: "dispatched",
  },
  shippingAddress: {
    city: String,
    streetAddress: String,
    phoneNumber: Number,
  },
});

const Order = mongoose.models.orders || mongoose.model("orders", orderSchema);

module.exports = Order;
