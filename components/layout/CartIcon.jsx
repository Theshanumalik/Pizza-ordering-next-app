"use client";
import { ShoppingCartTwoTone } from "@mui/icons-material";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function CartIcon() {
  const state = useSelector((state) => state.cart);
  console.log(state);
  return (
    <Link href="/cart" className="relative">
      <ShoppingCartTwoTone />
      <span className="absolute -right-2 -top-2 bg-red-600 text-white rounded-full h-5 w-5 text-sm flex items-center justify-center">
        {state.length}
      </span>
    </Link>
  );
}
