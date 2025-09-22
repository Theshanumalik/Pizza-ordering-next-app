"use client";
import { useFetch } from "@/hooks/useFetch";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import { AddRounded, CurrencyRupee, Delete, Edit } from "@mui/icons-material";
import OrderTableSkeleton from "@/components/skeletons/OrderTableSkeleton";

export default function ProductsPage() {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const products = useFetch("/api/product");

  React.useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push(`/login?callbackUrl=${pathname}`);
    }
    if (
      session.status === "authenticated" &&
      session.data?.user.role !== "admin"
    ) {
      router.push(`/login?callbackUrl=${pathname}`);
    }
  }, [session.status, session.data]);
  if (products.loading) {
    return <OrderTableSkeleton />;
  }
  return (
    <div className="overflow-scroll h-full __scroll-hidden">
      <div className="my-4">
        <Link
          href="/products/add"
          className="border border-gray-400 rounded-md gap-2 p-3 text-center flex justify-center items-center"
        >
          <AddRounded /> Add new item
        </Link>
      </div>
      <table className="max-w-container w-full mx-auto my-6 rounded-md overflow-hidden">
        <thead>
          <tr className="bg-red-500 text-white text-left">
            <th className="py-2 px-4 font-normal">ProductId</th>
            <th className="py-2 px-4 font-normal">Name</th>
            <th className="py-2 px-4 font-normal">Price</th>
            <th className="py-2 px-4 font-normal">Category</th>
            <th className="py-2 px-4 font-normal">Created at</th>
            <th className="py-2 px-4 font-normal">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.data?.map((product) => (
            <tr
              className="bg-gray-100 hover:bg-gray-300 cursor-default"
              key={product._id}
            >
              <td className="py-2 px-4">{product._id}</td>
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4 flex items-center justify-center">
                <CurrencyRupee />
                {product.price}
              </td>
              <td className="py-2 px-4">{product.category}</td>
              <td className="py-2 px-4">
                {new Date(product.createdAt).toLocaleString()}
              </td>
              <td className="py-2 px-4">
                <Link
                  href={"/products/edit/" + product.slug}
                  className="hover:text-gray-600"
                >
                  <Edit />
                </Link>
                <button className="hover:text-red-500">
                  <Delete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
