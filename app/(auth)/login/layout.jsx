import Image from "next/image";
import React from "react";

export default function layout({ children }) {
  return (
    <section className="p-3 h-[83vh]">
      <div className="max-w-container w-full mx-auto flex justify-center h-full">
        <div className="w-full md:w-1/2 lg:w-2/3 flex bg-white shadow-lg rounded-md overflow-hidden">
          <div className="flex-1 bg-gray-500 max-sm:hidden">
            <Image
              src="/food.jpg"
              quality={80}
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 p-3">{children}</div>
        </div>
      </div>
    </section>
  );
}
