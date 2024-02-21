import mongoose from "mongoose";

const extrasSchema = new mongoose.Schema({
  name: String,
  extraPrice: Number,
});

const pizzaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Pizza name is required"],
    },
    description: {
      type: String,
      required: [true, "Pizza description is required"],
    },
    price: {
      type: Number,
      required: [true, "Pizza price is required"],
    },
    sizes: {
      type: [extrasSchema],
      required: [true, "Pizza sizes are required"],
    },
    addOns: {
      type: [extrasSchema],
    },
    image: {
      type: String,
      required: [true, "Pizza image is required"],
    },
    category: {
      type: String,
      enum: ["regular", "veg", "non veg"],
      required: [true, "Pizza category is required"],
    },
  },
  { timestamps: true }
);

const Pizza = mongoose.models.pizzas || mongoose.model("pizzas", pizzaSchema);

module.exports = Pizza;
