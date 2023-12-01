"use client";
import React from "react";
import FoodItem from "./FoodItem";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function page() {
  const state = useSelector((state) => state.cart);
  const [total, setTotal] = React.useState(0);
  const shipping = 100;
  React.useEffect(() => {
    let total = 0;
    state.forEach((item) => {
      total += item.price * item.qty;
    });
    setTotal(total);
  }, [state]);
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
        <h1 className="text-xl mb-3">Cart Items</h1>
        <div className="flex justify-between gap-5 max-md:flex-col">
          <div style={{ flex: 6 }}>
            {state.map((item) => (
              <FoodItem data={item} key={item?._id} />
            ))}
          </div>
          <div style={{ flex: 4 }}>
            <div className="p-4 rounded-md bg-white shadow-md">
              <h2 className="my-2 font-semibold">CHECKOUT</h2>
              <ul>
                <li className="flex justify-between items-center mb-2">
                  <b className="font-normal text-gray-700">SUBTOTAL</b>
                  <span className="text-gray-900">${total}</span>
                </li>
                <li className="flex justify-between items-center mb-2">
                  <b className="font-normal text-gray-700">SHIPPING CHARGE</b>
                  <span className="text-gray-900">${shipping}</span>
                </li>
                <li className="flex justify-between items-center mb-2 pt-2 border-t border-gray-400">
                  <b className="font-normal text-gray-700">TOTAL AMOUNT</b>
                  <span className="text-gray-900">${total + shipping}</span>
                </li>
              </ul>
              <button className="bg-red-500 text-white block w-full p-3 rounded-md uppercase mt-2 hover:bg-red-600 transition-colors">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
