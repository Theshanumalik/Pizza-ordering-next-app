import {
  Person,
  PersonOutline,
  Search,
  ShoppingCartTwoTone,
} from "@mui/icons-material";
import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <header className="p-3">
      <div className="max-w-container mx-auto w-full h-[10vh] flex items-center justify-between gap-5">
        <div style={{ flex: 3 }}>
          <span className="text-xl">Foody</span>
        </div>
        <nav style={{ flex: 6 }} className="max-md:hidden">
          <ul className="flex gap-4">
            <li>
              <Link href="#" className="text-red-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="#">Menu</Link>
            </li>
            <li>
              <Link href="#">About</Link>
            </li>
            <li>
              <Link href="#">Contact Us</Link>
            </li>
          </ul>
        </nav>
        <div
          className="flex gap-3 items-center justify-end"
          style={{ flex: 3 }}
        >
          <Link href="#">
            <Search />
          </Link>
          <Link href="#">
            <ShoppingCartTwoTone />
          </Link>
          <Link
            href="#"
            className="bg-red-600 text-white px-6 py-2 rounded-full max-md:hidden"
          >
            Sign Up
          </Link>
          <Link href="#" className="hidden max-md:block">
            <PersonOutline />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
