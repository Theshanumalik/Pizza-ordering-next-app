"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function ActionNav() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <nav className="my-1">
      <ul className="flex items-center justify-center gap-3">
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
      </ul>
    </nav>
  );
}

export default ActionNav;
