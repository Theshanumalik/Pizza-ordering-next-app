import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    expiry: {
      type: Date,
      required: [true, "Expire Date Must Be Provided!"],
    },
    couponCode: {
      type: String,
      unique: [true, "Coupen code must be unique!"],
      index: true,
    },
    description: {
      type: String,
      required: [true, "Description must be provided!"],
    },
    deduction: {
      type: Number,
      required: [true, "Deduction amount Must be provided!"],
    },
    minOrderAmount: {
      type: Number,
      default: 0,
    },
    deductionInPercentage: {
      type: Boolean,
      default: false,
    },
    maxUseCount: {
      type: Number,
      required: [true, "Maximum use count of coupen must be provided!"],
    },
    useCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Offer = mongoose.models.offers || mongoose.model("offers", offerSchema);

module.exports = Offer;
