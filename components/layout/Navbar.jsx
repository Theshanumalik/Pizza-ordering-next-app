import { Search } from "@mui/icons-material";
import Link from "next/link";
import React from "react";
import CartIcon from "./CartIcon";
import NavUserInfo from "./NavUserInfo";

async function Navbar() {
  return (
    <header className="p-3 h-[10vh]">
      <div className="max-w-container mx-auto w-full h-full flex items-center justify-between gap-5">
        <div style={{ flex: 3 }}>
          <Link href="/" className="text-xl">
            Foody
          </Link>
        </div>
        <nav style={{ flex: 6 }} className="max-md:hidden">
          <ul className="flex gap-4 justify-center">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/menu">Menu</Link>
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
          <Link href="/menu">
            <Search />
          </Link>
          <CartIcon />
          <NavUserInfo />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
