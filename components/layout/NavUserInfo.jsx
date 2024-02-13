"use client";
import { useProfile } from "@/context/ProfileProvider";
import { Person, PersonOutline } from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function NavUserInfo() {
  const { data } = useProfile();
  const { status } = useSession();
  if (status === "unauthenticated") {
    return (
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
    );
  }
  return (
    <>
      <Link href="/profile">
        {data.image ? (
          <Image
            src={data?.image}
            width={40}
            height={40}
            className="rounded-full bg-gray-400 object-cover"
          />
        ) : (
          <Person />
        )}
      </Link>
      <button
        className="bg-red-500 rounded-md p-1 text-white"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </>
  );
}
