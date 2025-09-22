"use client";
import { EditOutlined, ShoppingCartTwoTone } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import PizzaModal from "./PizzaModal";

export default function SingleCardActions({ productInfo }) {
  const product = JSON.parse(productInfo);
  const [showPopUp, setShowPopUp] = useState(false);
  const session = useSession();
  return (
    <div className="flex gap-2">
      <button
        className="text-sm py-2 px-4 rounded-xl bg-red-500 text-white"
        onClick={() => setShowPopUp(true)}
      >
        <ShoppingCartTwoTone />
      </button>
      {showPopUp && (
        <PizzaModal onClose={() => setShowPopUp(false)} data={product} />
      )}
      {session?.data?.user?.role === "admin" && (
        <Link
          href={"/products/edit/" + product.slug}
          className="text-sm py-2 px-4 border rounded-xl border-gray-500"
        >
          <EditOutlined />
        </Link>
      )}
    </div>
  );
}
