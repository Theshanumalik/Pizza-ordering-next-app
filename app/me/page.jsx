"use client";
import { Edit } from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Me() {
  const { data } = useSession();
  return (
    <div className="p-3 flex flex-col items-center h-full w-full">
      <h3 className="text-lg my-4">
        Logged in as <b className="capitalize">{data?.user.name}</b>
      </h3>
      <Image
        src={data?.user.image}
        width={200}
        height={200}
        className="object-cover rounded-full"
      />
      <div className="flex gap-1">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="bg-red-500 text-white mt-4 px-6 rounded py-3"
        >
          Logout
        </button>
        <button className="border border-red-500 mt-4 px-6 rounded py-3 flex items-center justify-center gap-1">
          <Edit /> Update Address
        </button>
      </div>
    </div>
  );
}
