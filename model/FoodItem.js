import mongoose from "mongoose";

const extrasSchema = new mongoose.Schema({
  name: String,
  extraPrice: Number,
});

const foodItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Food name is required"],
    },
    description: {
      type: String,
      required: [true, "Food description is required"],
    },
    price: {
      type: Number,
      required: [true, "Food price is required"],
    },
    sizes: {
      type: [extrasSchema],
      required: [true, "Food sizes are required"],
    },
    addOns: {
      type: [extrasSchema],
    },
    image: {
      type: String,
      required: [true, "Food image is required"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: [true, "Food category is required"],
    },
  },
  { timestamps: true }
);

const FoodItem =
  mongoose.models.foodItems || mongoose.model("foodItems", foodItemSchema);

module.exports = FoodItem;
