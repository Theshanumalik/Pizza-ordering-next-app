import Image from "next/image";
import React from "react";
import AddToCartButton from "./AddToCartButton";
import Link from "next/link";

export default function SingleCard({ data }) {
  return (
    <div className="max-[478px]:w-full max-sm:w-[48%] py-5 px-6 w-72 bg-white flex flex-col justify-center items-center rounded-3xl relative shadow-md overflow-hidden max-md:aspect-square">
      <Image
        src={data.imageUrl}
        width={100}
        height={100}
        className="max-[588px]:w-32 max-[588px]:h-32 w-40 h-40 rounded-full object-cover max-[478px]:w-40 max-[478px]:h-40"
        alt="menu item"
      />
      <h4 className="max-[588px]:text-base text-center text-lg my-3 uppercase font-medium">
        <Link href={`/product/${data.slug}`}>{data.name}</Link>
      </h4>
      <span className="text-xl mb-4">{data.price}$</span>
      <AddToCartButton data={JSON.stringify(data)} />
    </div>
  );
}
