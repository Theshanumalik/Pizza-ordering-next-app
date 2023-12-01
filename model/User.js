import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      lowercase: true,
      maxLength: [20, "name can't exceeds 20 characters!"],
    },
    image: { type: String, trim: true },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      validate: {
        validator: function (v) {
          if (v === null) return true;
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
      },
      sparse: true,
    },
    password: {
      type: String,
      select: false,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
      select: false,
    },
    verication: {
      token: { type: String, select: false },
      expiry: { type: Date, select: false },
    },
    reset: {
      token: { type: String, select: false },
      expiry: { type: Date, select: false },
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.index(
  { email: 1 },
  { unique: true, partialFilterExpression: { email: { $type: "string" } } }
);
userSchema.index(
  { googleId: 1 },
  { unique: true, partialFilterExpression: { googleID: { $type: "string" } } }
);

const User = mongoose.models.users || mongoose.model("users", userSchema);

module.exports = User;
