import Link from "next/link";
import React from "react";

export default function LoginPage() {
  return (
    <>
      <h1 className="my-4 text-xl font-medium">Welcome Back!</h1>
      <form className="flex flex-col gap-2 p-2">
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
        <button className="bg-red-500 p-2 px-6 text-white rounded-full mt-2 focus:bg-red-400 transition-colors">
          Login
        </button>
        <div className="flex items-center gap-3 my-2">
          <span className="flex-1 h-[1px] bg-slate-400"></span>
          OR
          <span className="flex-1 h-[1px] bg-slate-400"></span>
        </div>
        <button className="border border-red-500 p-2 px-6 rounded-full">
          Sign in with Google
        </button>
      </form>
    </>
  );
}
