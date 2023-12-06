import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Pizza name is required"],
    },
    slug: {
      type: String,
      unique: true,
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
      type: [String],
      required: [true, "Pizza sizes are required"],
    },
    image: {
      type: String,
      required: [true, "Pizza image is required"],
    },
    category: {
      type: String,
      enum: ["regular", "veg", "non-veg"],
      required: [true, "Pizza category is required"],
    },
  },
  { timestamps: true }
);

pizzaSchema.pre("save", function (next) {
  this.slug = this.name.toLowerCase().split(" ").join("-");
  next();
});
const Pizza = mongoose.models.pizzas || mongoose.model("pizzas", pizzaSchema);

module.exports = Pizza;
