import Image from "next/image";
import React from "react";

export default function SingleCard({ data }) {
  return (
    <div className="max-sm:w-full w-max py-5 px-6 bg-white flex flex-col justify-center items-center rounded-xl shadow-md">
      <Image
        src={data.imageUrl}
        width={100}
        height={100}
        className="w-40 h-40 rounded-full object-cover"
      />
      <h4 className="text-2xl my-3">{data.name}</h4>
      <span className="text-xl mb-4">{data.price}$</span>
      <button className="bg-red-500 text-white w-full py-2 rounded-full flex gap-1 justify-center items-center active:scale-95  hover:bg-red-600 transition-all">
        Add to Cart
      </button>
    </div>
  );
}
