import Image from "next/image";
import React from "react";

export default function layout({ children }) {
  return (
    <section className="p-3 h-[83vh]">
      <div className="max-w-md w-full mx-auto flex justify-center h-full">
        <div className="w-full border flex bg-white shadow-lg rounded-md overflow-hidden">
          <div className="flex-1 p-3">{children}</div>
        </div>
      </div>
    </section>
  );
}
