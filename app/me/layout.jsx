import Link from "next/link";
import React from "react";

export default function MeLayout({ children }) {
  return (
    <div className="p-3 h-[calc(100vh-16vh)]">
      <div className="max-w-container mx-auto w-full h-full flex gap-2">
        <aside className="border-r border-gray-300">
          <ul className="flex flex-col gap-2">
            <li className="border-b border-gray-500 pl-3 pr-6 py-2 mr-1">
              <Link href="/me" className="text-gray-700 hover:text-gray-950">
                Profile
              </Link>
            </li>
            <li className="border-b border-gray-500 pl-3 pr-6 py-2 mr-1">
              <Link
                href="/me/orders"
                className="text-gray-700 hover:text-gray-950"
              >
                Orders
              </Link>
            </li>
            <li className="border-b border-gray-500 pl-3 pr-6 py-2 mr-1">
              <Link
                href="/me/address"
                className="text-gray-700 hover:text-gray-950"
              >
                Address
              </Link>
            </li>
          </ul>
        </aside>
        {children}
      </div>
    </div>
  );
}
