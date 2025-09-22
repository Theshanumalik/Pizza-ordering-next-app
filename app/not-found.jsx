"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function notfound() {
  const router = useRouter();
  return (
    <div className="text-center py-5 h-[calc(100vh-16vh)] flex items-center flex-col">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h3 className="text-4xl text-gray-300">404 Page Not Found</h3>
        <div className="flex items-center gap-3 justify-center mt-6">
          <Link
            href="/menu"
            className="text-red-500 border border-red-500 p-3 rounded-md"
          >
            Show Menu
          </Link>
          <button
            className="text-red-500 border border-red-500 p-3 rounded-md"
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
