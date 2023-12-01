"use client";
import { addItem } from "@/store/cartSlice";
import { AddShoppingCart } from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function AddToCart({ product }) {
  product = JSON.parse(product);
  const dispatch = useDispatch();
  const [size, setSize] = useState("");
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
        <Link
          href="/cart"
          className="bg-red-500 px-6 py-2 rounded-full text-white flex items-center justify-center gap-2"
        >
          Order now
        </Link>
        <button
          className="bg-red-500 px-6 py-2 rounded-full text-white flex items-center justify-center gap-2"
          onClick={() => {
            dispatch(addItem({ ...product, selectedSize: size }));
          }}
        >
          Add to cart <AddShoppingCart />
        </button>
      </div>
    </>
  );
}
