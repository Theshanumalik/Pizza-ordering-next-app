import { Person, PersonOutline, Search } from "@mui/icons-material";
import Link from "next/link";
import React from "react";
import CartIcon from "./CartIcon";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/route";

async function Navbar() {
  const session = await getServerSession(authOptions);
  return (
    <header className="p-3 h-[10vh]">
      <div className="max-w-container mx-auto w-full h-full flex items-center justify-between gap-5">
        <div style={{ flex: 3 }}>
          <Link href="/" className="text-xl">
            Foody
          </Link>
        </div>
        <nav style={{ flex: 6 }} className="max-md:hidden">
          <ul className="flex gap-4">
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
          <Link href="#">
            <Search />
          </Link>
          <CartIcon />
          {session?.user ? (
            <Link href="/me">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  width={40}
                  height={40}
                  className="rounded-full bg-gray-400 object-cover"
                />
              ) : (
                <Person />
              )}
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-red-500 text-white px-6 py-2 rounded-full max-md:hidden transition-colors hover:bg-red-600"
              >
                Sign Up
              </Link>
              <Link href="/login" className="hidden max-md:block">
                <PersonOutline />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
