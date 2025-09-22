"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function ActionNav() {
  const pathname = usePathname();
  const session = useSession();

  const menuLinks = [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Orders",
      href: "/orders",
    },
    {
      label: "Offers",
      href: "/offers",
    },
    {
      label: "Pizza",
      href: "/products",
    },
    {
      label: "Users",
      href: "/users",
    },
  ];

  if (session.status === "loading") {
    return <div className="text-center my-1">Loading...</div>;
  }
  return (
    <nav className="my-1">
      <ul className="flex items-center justify-center gap-3 flex-wrap">
        {menuLinks.map((link) => (
          <li
            key={link.href}
            className={`rounded-full p-1 px-4 ${
              pathname.includes(link.href)
                ? "bg-red-500 text-white"
                : "bg-gray-200"
            }`}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default ActionNav;
