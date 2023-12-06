"use client";
import { addItem } from "@/store/cartSlice";
import { AddShoppingCart } from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

export default function AddToCart({ product }) {
  product = JSON.parse(product);
  const dispatch = useDispatch();
  const [size, setSize] = useState(product?.sizes[0]);
  const handleClick = () => {
    dispatch(addItem({ ...product, selectedSize: size }));
    toast.success("Pizza added to the cart!");
  };
  return (
    <>
      <div className="flex items-center mt-5 flex-wrap gap-4">
        {product?.sizes.map((availableSize) => (
          <button
            key={availableSize}
            className={` border-red-500 p-2 rounded-md border uppercase ${
              availableSize === size ? "bg-red-500" : ""
            } ${availableSize === size ? "text-white" : "text-red-500"}`}
            onClick={() => setSize(availableSize)}
          >
            {availableSize}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-start mt-5 max-sm:flex-col max-sm:items-start gap-4">
        <button
          className="bg-red-500 px-6 py-3 rounded-full text-white flex items-center justify-center gap-2"
          onClick={handleClick}
        >
          Add to cart <AddShoppingCart />
        </button>
        <Link
          href="/cart"
          className="border border-red-500 px-6 py-3 rounded-full text-red-500 flex items-center justify-center gap-2"
        >
          Order now
        </Link>
      </div>
    </>
  );
}
