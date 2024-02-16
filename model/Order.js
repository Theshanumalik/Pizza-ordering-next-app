import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        item: { type: mongoose.Types.ObjectId, ref: "pizzas" },
        quantity: { type: Number, required: true },
        selectedSize: { type: String },
        selectedAddOns: [
          { type: mongoose.Types.ObjectId, ref: "pizzas.addOns" },
        ],
      },
    ],
    amount: { type: Number, required: true },
    user: {
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
      enum: ["deliverd", "dispatched", "failed"],
      default: "dispatched",
    },
    shippingAddress: {
      city: String,
      streetAddress: String,
      phoneNumber: Number,
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.orders || mongoose.model("orders", orderSchema);

module.exports = Order;
