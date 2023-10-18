"use client";

import { AddShoppingCart } from "@mui/icons-material";
import { addItem } from "@/store/cartSlice";
import { useDispatch } from "react-redux";

export default function AddToCartButton({ data }) {
  const dispatch = useDispatch();
  return (
    <button
      className="bg-red-500 text-white absolute right-0 top-0 w-12 h-10 rounded-bl-2xl"
      onClick={() => dispatch(addItem(JSON.parse(data)))}
    >
      <AddShoppingCart />
    </button>
  );
}
