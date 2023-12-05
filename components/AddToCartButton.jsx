"use client";
import { AddShoppingCart } from "@mui/icons-material";
import { addItem } from "@/store/cartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

export default function AddToCartButton({ data }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(addItem(JSON.parse(data)));
    toast.success("Pizza added to the cart!");
  };
  return (
    <button
      className="bg-red-500 text-white absolute right-0 top-0 w-12 h-10 rounded-bl-2xl"
      onClick={handleClick}
    >
      <AddShoppingCart />
    </button>
  );
}
