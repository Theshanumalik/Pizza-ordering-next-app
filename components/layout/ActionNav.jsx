"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function ActionNav() {
  const pathname = usePathname();
  const session = useSession();

  if (session.status === "loading") {
    return <div className="text-center my-1">Loading...</div>;
  }
  return (
    <nav className="my-1">
      <ul className="flex items-center justify-center gap-3 flex-wrap">
        <li
          className={`rounded-full p-1 px-4 ${
            pathname.includes("/profile")
              ? "bg-red-500 text-white"
              : "bg-gray-200"
          }`}
        >
          <Link href={"/profile"}>Profile</Link>
        </li>
        <li
          className={`rounded-full p-1 px-4 ${
            pathname.includes("/orders")
              ? "bg-red-500 text-white"
              : "bg-gray-200"
          }`}
        >
          <Link href={"/orders"}>Orders</Link>
        </li>
        {session?.data?.user.role === "admin" && (
          <React.Fragment>
            <li
              className={`rounded-full p-1 px-4 ${
                pathname.includes("/products")
                  ? "bg-red-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              <Link href={"/products"}>Products</Link>
            </li>
            <li
              className={`rounded-full p-1 px-4 ${
                pathname.includes("/users")
                  ? "bg-red-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              <Link href={"/users"}>Users</Link>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
}

export default ActionNav;
