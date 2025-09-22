import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: [true, "Category name must be unique!"],
    },
    image: {
      type: String,
      required: [true, "Category image is required"],
    },
    description: {
      type: String,
    },
    foods: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodItems",
      },
    ],
  },
  { timestamps: true }
);

const Category =
  mongoose.models.categories || mongoose.model("categories", categorySchema);

export default Category;
