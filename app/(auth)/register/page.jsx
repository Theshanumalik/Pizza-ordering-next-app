import Link from "next/link";
import React from "react";

export default function RegisterPage() {
  return (
    <>
      <h1 className="my-4 text-xl font-medium">Create new account</h1>
      <form className="flex flex-col gap-2 p-2">
        <label htmlFor="name" className="text-gray-700 text-sm">
          Enter name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="John Doe"
          className="border border-gray-500 rounded-md px-3 p-2 focus:border-red-500 outline-none"
        />
        <label htmlFor="email" className="text-gray-700 text-sm">
          Enter email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="john@example.com"
          className="border border-gray-500 rounded-md px-3 p-2 focus:border-red-500 outline-none"
        />
        <label htmlFor="password" className="text-gray-700 text-sm">
          Choose password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="border border-gray-500 rounded-md px-3 p-2 focus:border-red-500 outline-none"
        />
        <button className="bg-red-500 self-start p-2 px-6 text-white rounded-full mt-2 focus:bg-red-400 transition-colors">
          Register
        </button>
        <p className="text-sm">
          Already have an account?
          <Link href="/login" className="underline text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </>
  );
}
