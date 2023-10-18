"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function notfound() {
  const router = useRouter();
  return (
    <div className="text-center py-5">
      <h3 className="text-4xl text-gray-300">
        Requested Page Is Either Not <br /> Available Or went Somewhere Else.
      </h3>
      <div className="flex items-center gap-3 justify-center mt-4">
        <Link
          href="/menu"
          className="text-red-500 border border-red-500 p-2 rounded-md"
        >
          Show Menu
        </Link>
        <button
          className="text-red-500 border border-red-500 p-2 rounded-md"
          onClick={() => router.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
