"use client";
import React from "react";
import FoodItem from "./FoodItem";
import { useSelector } from "react-redux";
import Link from "next/link";
import Checkout from "./Checkout";
import toast from "react-hot-toast";

export default function page() {
  const state = useSelector((state) => state.cart);
  React.useEffect(() => {
    if (typeof window != undefined) {
      if (window?.location?.href?.includes("cancled=1")) {
        toast.error("Payment failed! 😔");
      }
    }
  }, []);
  if (state.length === 0)
    return (
      <section className="p-3 h-[50vh]">
        <div className="max-w-container mx-auto flex items-center justify-center flex-col h-full">
          <p className="text-4xl my-4 text-gray-400">Your Cart is Empty</p>
          <Link
            href="/menu"
            className="text-red-500 border border-red-500 p-3 rounded-md"
          >
            Show Menu
          </Link>
        </div>
      </section>
    );

  return (
    <section className="p-3">
      <div className="max-w-container mx-auto">
        <h1 className="text-lg uppercase font-semibold text-gray-700 mb-3">
          Cart Items
        </h1>
        <div className="flex justify-between gap-5 max-md:flex-col">
          <div style={{ flex: 6 }}>
            {state.map((item) => (
              <FoodItem data={item} key={item?._id} />
            ))}
          </div>
          <div style={{ flex: 4 }}>
            <Checkout />
          </div>
        </div>
      </div>
    </section>
  );
}
